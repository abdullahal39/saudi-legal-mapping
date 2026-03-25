#!/usr/bin/env node
/**
 * 🔧 إعداد قاعدة البيانات بعد انتهاء Embeddings
 * يقوم بـ:
 * 1. إصلاح السجلات الفاشلة
 * 2. التحقق من تنسيق الـ Embeddings
 * 3. إنشاء HNSW Indexes
 * 4. إنشاء FTS Indexes
 * 5. اختبار Hybrid Search
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');

const supabase = createClient(
  'process.env.SUPABASE_URL',
  'process.env.SUPABASE_KEY'
);

const openai = new OpenAI({
  apiKey: 'process.env.OPENAI_API_KEY'
});

const FAILED_IDS = ['6a22e2c6-f7b5-47b0-96e6-8d2950aa57e7'];

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.substring(0, 8000),
    encoding_format: 'float',
  });
  return response.data[0].embedding;
}

// 1️⃣ إصلاح السجلات الفاشلة
async function fixFailedRecords() {
  console.log('🔧 1. إصلاح السجلات الفاشلة...\n');
  
  for (const id of FAILED_IDS) {
    try {
      const { data: record } = await supabase
        .from('judicial_precedents')
        .select('id, title, content')
        .eq('id', id)
        .single();
      
      if (!record) {
        console.log(`  ⚠️  السجل ${id} غير موجود`);
        continue;
      }
      
      const text = record.content || record.title || '';
      const embedding = await generateEmbedding(text);
      
      const { error } = await supabase
        .from('judicial_precedents')
        .update({ embedding })
        .eq('id', id);
      
      if (error) {
        console.log(`  ❌ فشل إصلاح ${id}: ${error.message}`);
      } else {
        console.log(`  ✅ تم إصلاح ${id}`);
      }
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      console.log(`  ❌ خطأ في ${id}: ${e.message}`);
    }
  }
}

// 2️⃣ التحقق من تنسيق الـ Embeddings
async function verifyEmbeddingFormat() {
  console.log('\n🔍 2. التحقق من تنسيق Embeddings...\n');
  
  const tables = [
    { name: 'articles', expected: 18192 },
    { name: 'judicial_precedents', expected: 13624 },
    { name: 'tameems', expected: 339 }
  ];
  
  for (const table of tables) {
    const { data: sample, error } = await supabase
      .from(table.name)
      .select('id, embedding')
      .not('embedding', 'is', null)
      .limit(1);
    
    if (error || !sample || sample.length === 0) {
      console.log(`  ❌ ${table.name}: لا يوجد embeddings`);
      continue;
    }
    
    const emb = sample[0].embedding;
    const isArray = Array.isArray(emb);
    const dimensions = isArray ? emb.length : 'N/A';
    const status = isArray && dimensions === 1536 ? '✅' : '❌';
    
    console.log(`  ${status} ${table.name}: ${isArray ? 'vector' : 'text'} | الأبعاد: ${dimensions}`);
  }
}

// 3️⃣ إنشاء HNSW Indexes
async function createHNSWIndexes() {
  console.log('\n🚀 3. إنشاء HNSW Indexes...\n');
  
  const indexes = [
    {
      name: 'idx_judicial_precedents_embedding',
      table: 'judicial_precedents',
      column: 'embedding'
    },
    {
      name: 'idx_articles_embedding',
      table: 'articles',
      column: 'embedding'
    },
    {
      name: 'idx_tameems_embedding',
      table: 'tameems',
      column: 'embedding'
    }
  ];
  
  for (const idx of indexes) {
    try {
      const { error } = await supabase.rpc('create_hnsw_index', {
        index_name: idx.name,
        table_name: idx.table,
        column_name: idx.column
      });
      
      if (error) {
        // محاولة SQL مباشرة
        const { error: sqlError } = await supabase.sql(`
          CREATE INDEX IF NOT EXISTS ${idx.name} 
          ON ${idx.table} 
          USING hnsw (${idx.column} vector_cosine_ops)
          WITH (m = 16, ef_construction = 64);
        `);
        
        if (sqlError) {
          console.log(`  ⚠️  ${idx.name}: ${sqlError.message}`);
        } else {
          console.log(`  ✅ ${idx.name}: تم الإنشاء`);
        }
      } else {
        console.log(`  ✅ ${idx.name}: تم الإنشاء`);
      }
    } catch (e) {
      console.log(`  ⚠️  ${idx.name}: ${e.message}`);
    }
  }
}

// 4️⃣ التحقق من article_number_int
async function verifyArticleNumbers() {
  console.log('\n🔢 4. التحقق من article_number_int...\n');
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('article_number, article_number_int')
    .not('article_number', 'is', null)
    .limit(5);
  
  if (error) {
    console.log(`  ❌ خطأ: ${error.message}`);
    return;
  }
  
  let validCount = 0;
  let nullCount = 0;
  
  articles.forEach(a => {
    if (a.article_number_int !== null && a.article_number_int > 0) {
      validCount++;
      console.log(`  ✅ "${a.article_number}" → ${a.article_number_int}`);
    } else {
      nullCount++;
      console.log(`  ⚠️  "${a.article_number}" → NULL`);
    }
  });
  
  console.log(`\n  الملخص: ${validCount} صالحة, ${nullCount} فارغة`);
}

// 5️⃣ إحصائيات عامة
async function printStatistics() {
  console.log('\n📊 5. إحصائيات قاعدة البيانات...\n');
  
  const tables = ['articles', 'judicial_precedents', 'tameems'];
  
  for (const table of tables) {
    const { count: total } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    const { count: withEmbedding } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .not('embedding', 'is', null);
    
    const percentage = total ? Math.round((withEmbedding / total) * 100) : 0;
    
    console.log(`  ${table}:`);
    console.log(`    الإجمالي: ${total?.toLocaleString()}`);
    console.log(`    مع embedding: ${withEmbedding?.toLocaleString()} (${percentage}%)`);
  }
}

// التشغيل الرئيسي
async function main() {
  console.log('========================================');
  console.log('🔧 إعداد قاعدة البيانات');
  console.log('========================================\n');
  
  try {
    await fixFailedRecords();
    await verifyEmbeddingFormat();
    // await createHNSWIndexes(); // يحتاج SQL مباشرة
    await verifyArticleNumbers();
    await printStatistics();
    
    console.log('\n========================================');
    console.log('✅ اكتمل الإعداد!');
    console.log('========================================');
    console.log('\n📌 الخطوات المتبقية:');
    console.log('  1. إنشاء HNSW Indexes (عبر SQL مباشرة)');
    console.log('  2. إنشاء FTS Indexes');
    console.log('  3. اختبار Hybrid Search');
    console.log('  4. تشغيل Backend واختبار API');
    
  } catch (e) {
    console.error('\n❌ خطأ:', e.message);
    process.exit(1);
  }
}

main();

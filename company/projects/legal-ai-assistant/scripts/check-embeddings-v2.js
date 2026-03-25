#!/usr/bin/env node
/**
 * 🔍 التحقق من نوع عمود Embedding (RPC method)
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

async function checkEmbeddings() {
  console.log('🔍 التحقق من الـ Embeddings...\n');
  
  // محاولة استعلام vector search
  const tables = ['articles', 'judicial_precedents', 'tameems'];
  
  for (const table of tables) {
    console.log(`📋 جدول: ${table}`);
    
    // 1. التحقق من وجود بيانات
    const { data: sample, error: sampleError } = await supabase
      .from(table)
      .select('id, embedding')
      .not('embedding', 'is', null)
      .limit(1)
      .single();
    
    if (sampleError || !sample) {
      console.log('  ⚠️  لا توجد بيانات\n');
      continue;
    }
    
    // 2. التحقق من نوع البيانات
    const emb = sample.embedding;
    
    if (typeof emb === 'string') {
      console.log('  ❌ النوع: text (string)');
      console.log('  ⚠️  يحتاج تحويل إلى vector!\n');
    } else if (Array.isArray(emb)) {
      console.log(`  ✅ النوع: array | الأبعاد: ${emb.length}`);
      
      // محاولة vector search
      try {
        const { data, error } = await supabase.rpc('match_' + table, {
          query_embedding: emb,
          match_threshold: 0.5,
          match_count: 3
        });
        
        if (error) {
          console.log(`  ⚠️  RPC غير موجود: ${error.message}\n`);
        } else {
          console.log(`  ✅ Vector Search يعمل!\n`);
        }
      } catch (e) {
        console.log(`  ⚠️  لا يوجد RPC function\n`);
      }
    } else {
      console.log(`  ❓ نوع غير معروف: ${typeof emb}\n`);
    }
  }
}

async function main() {
  console.log('========================================');
  console.log('🔍 فحص Embeddings');
  console.log('========================================\n');
  
  await checkEmbeddings();
  
  console.log('\n📌 الخلاصة:');
  console.log('  إذا كانت النتيجة "text" → يجب تحويل العمود إلى vector');
  console.log('  يتم ذلك عبر SQL مباشرة في Supabase Dashboard');
}

main();

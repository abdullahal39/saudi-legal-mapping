#!/usr/bin/env node
/**
 * 🧪 Hybrid Search Blind Test
 * اختبار حيادي غير منحاز — لا يعتمد على أسئلة المنافس
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

// المعايير
const TEST_CONFIG = {
  samplesPerTable: 50,
  totalQueries: 10,
  topK: 5,
  vectorWeight: 0.7,
  ftsWeight: 0.3
};

// المواد الحرجة للـ Materiality Check
const CRITICAL_ARTICLES = ['53', '82', '155'];

async function getRandomSamples(table, count) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .not('embedding_vec', 'is', null)
    .limit(count);
  
  if (error) {
    console.error(`❌ Error fetching from ${table}:`, error.message);
    return [];
  }
  
  // Shuffle and take random
  return data.sort(() => Math.random() - 0.5).slice(0, count);
}

function generateQueryFromText(record, table) {
  // استخراج جملة من النص كـ query
  let content = '';
  
  if (table === 'articles') {
    content = record.content || '';
  } else if (table === 'judicial_precedents') {
    content = record.content || '';
  } else if (table === 'tameems') {
    content = record.content || '';
  }
  
  const sentences = content
    .split(/[.؟!]/)
    .map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 150);
  
  if (sentences.length === 0) return null;
  
  // اختيار جملة عشوائية
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  
  // تحويلها لسؤال بسيط (إزالة إشارات محددة)
  const query = sentence
    .replace(/المادة\s*\(?\d+\)?/g, '')
    .replace(/نظام\s+\w+/g, '')
    .trim();
  
  return query.length > 30 ? query : null;
}

async function runBlindTest() {
  console.log('🧪 Hybrid Search Blind Test');
  console.log('============================\n');
  console.log(`Configuration:`);
  console.log(`  Samples per table: ${TEST_CONFIG.samplesPerTable}`);
  console.log(`  Total queries: ${TEST_CONFIG.totalQueries}`);
  console.log(`  Top-K: ${TEST_CONFIG.topK}`);
  console.log(`  Vector weight: ${TEST_CONFIG.vectorWeight}`);
  console.log(`  FTS weight: ${TEST_CONFIG.ftsWeight}`);
  console.log(`  Critical articles: ${CRITICAL_ARTICLES.join(', ')}`);
  console.log('');
  
  // جلب العينات
  console.log('📊 Fetching random samples...');
  const articles = await getRandomSamples('articles', TEST_CONFIG.samplesPerTable);
  const precedents = await getRandomSamples('judicial_precedents', 20);
  const tameems = await getRandomSamples('tameems', 10);
  
  console.log(`  Articles: ${articles.length}`);
  console.log(`  Precedents: ${precedents.length}`);
  console.log(`  Tameems: ${tameems.length}`);
  console.log('');
  
  // توليد queries
  console.log('🎯 Generating test queries...');
  const allRecords = [
    ...articles.map(r => ({ ...r, table: 'articles' })),
    ...precedents.map(r => ({ ...r, table: 'judicial_precedents' })),
    ...tameems.map(r => ({ ...r, table: 'tameems' }))
  ];
  
  const queries = [];
  let attempts = 0;
  
  while (queries.length < TEST_CONFIG.totalQueries && attempts < 50) {
    const record = allRecords[Math.floor(Math.random() * allRecords.length)];
    const query = generateQueryFromText(record, record.table);
    
    if (query && !queries.find(q => q.query === query)) {
      queries.push({
        id: queries.length + 1,
        query,
        sourceRecord: {
          id: record.id,
          table: record.table,
          title: record.title || record.subject || `Article ${record.article_number}`,
          article_number: record.article_number || null
        },
        expectedSource: record.table,
        expectedArticle: record.article_number || null
      });
    }
    attempts++;
  }
  
  console.log(`  Generated ${queries.length} unique queries`);
  console.log('');
  
  // عرض الـ queries
  console.log('📝 Test Queries (Blind Generated):');
  console.log('-----------------------------------');
  queries.forEach((q, i) => {
    console.log(`\n${i + 1}. ${q.query.substring(0, 100)}${q.query.length > 100 ? '...' : ''}`);
    console.log(`   Source Table: ${q.expectedSource}`);
    if (q.expectedArticle) {
      console.log(`   Source Article: ${q.expectedArticle}`);
      if (CRITICAL_ARTICLES.some(ca => q.expectedArticle?.includes(ca))) {
        console.log(`   ⚠️ CRITICAL ARTICLE — Materiality Check Required`);
      }
    }
  });
  console.log('');
  
  // ملاحظات
  console.log('📋 Notes:');
  console.log('  • Queries generated randomly from actual content');
  console.log('  • No reference to competitor\'s questions');
  console.log('  • Materiality check: Articles 53, 82, 155 flagged');
  console.log('');
  
  // تحضير نتائج الاختبار
  const testConfig = {
    timestamp: new Date().toISOString(),
    config: TEST_CONFIG,
    criticalArticles: CRITICAL_ARTICLES,
    queries: queries.map(q => ({
      id: q.id,
      query: q.query,
      expectedSource: q.expectedSource,
      expectedArticle: q.expectedArticle,
      isCritical: CRITICAL_ARTICLES.some(ca => q.expectedArticle?.includes(ca))
    })),
    sampleStats: {
      articles: articles.length,
      precedents: precedents.length,
      tameems: tameems.length,
      total: allRecords.length
    }
  };
  
  fs.writeFileSync('blind-test-config.json', JSON.stringify(testConfig, null, 2));
  console.log('✅ Test configuration saved to: blind-test-config.json');
  console.log('');
  console.log('🎯 Next Steps:');
  console.log('  1. Review generated queries for quality');
  console.log('  2. Run Hybrid Search with OpenAI embeddings');
  console.log('  3. Measure metrics:');
  console.log('     • Recall@5: Is correct answer in top 5?');
  console.log('     • Precision: % of relevant results');
  console.log('     • Coverage: Are all aspects covered?');
  console.log('     • Materiality: Critical articles (53/82/155) in results?');
  console.log('  4. Document raw results without comparison');
}

runBlindTest().catch(console.error);

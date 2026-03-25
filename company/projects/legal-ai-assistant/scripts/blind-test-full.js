#!/usr/bin/env node
/**
 * 🧪 Hybrid Search Blind Test — النسخة الكاملة
 * اختبار حيادي يشمل:
 * 1. Queries عشوائية من النصوص
 * 2. Queries مخصصة للمواد الحرجة (Materiality Check)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

// المعايير
const TEST_CONFIG = {
  randomQueries: 10,
  materialityQueries: 5,  // للمواد الحرجة
  topK: 5,
  vectorWeight: 0.7,
  ftsWeight: 0.3
};

// المواد الحرجة للـ Materiality Check
const CRITICAL_ARTICLES = ['53', '82', '155'];

// Queries مصممة خصيصاً للمواد الحرجة
const MATERIALITY_QUERIES = [
  {
    id: 'M1',
    query: 'ما هي حقوق العامل في فترة التجربة؟',
    expectedArticles: ['53', '54'],
    category: 'employment',
    critical: true,
    note: 'Q1: فصل الموظفة في فترة التجربة'
  },
  {
    id: 'M2',
    query: 'هل يجوز فصل العامل بسبب المرض؟',
    expectedArticles: ['82', '117'],
    category: 'employment',
    critical: true,
    note: 'Q1: حماية العامل من الفصل بسبب المرض'
  },
  {
    id: 'M3',
    query: 'ما هي حماية المرأة العاملة أثناء الحمل؟',
    expectedArticles: ['155'],
    category: 'employment',
    critical: true,
    note: 'Q1: المادة 155 — حماية خاصة'
  },
  {
    id: 'M4',
    query: 'كيف يتم إنهاء عقد العمل غير المحدد المدة؟',
    expectedArticles: ['74', '75', '77'],
    category: 'employment',
    critical: true,
    note: 'Q5: إرادة أحد الطرفين'
  },
  {
    id: 'M5',
    query: 'ما هي مدد الإجازة المرضية للعامل؟',
    expectedArticles: ['117', '82'],
    category: 'employment',
    critical: true,
    note: 'Q1: المادة 117 — مدد الإجازة'
  }
];

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
  
  return data.sort(() => Math.random() - 0.5).slice(0, count);
}

function generateQueryFromText(record, table) {
  let content = record.content || '';
  
  const sentences = content
    .split(/[.؟!]/)
    .map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 150);
  
  if (sentences.length === 0) return null;
  
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  
  const query = sentence
    .replace(/المادة\s*\(?\d+\)?/g, '')
    .replace(/نظام\s+\w+/g, '')
    .trim();
  
  return query.length > 30 ? query : null;
}

async function runBlindTest() {
  console.log('🧪 Hybrid Search Blind Test — Full Version');
  console.log('==========================================\n');
  console.log(`Configuration:`);
  console.log(`  Random queries: ${TEST_CONFIG.randomQueries}`);
  console.log(`  Materiality queries: ${TEST_CONFIG.materialityQueries}`);
  console.log(`  Top-K: ${TEST_CONFIG.topK}`);
  console.log(`  Vector weight: ${TEST_CONFIG.vectorWeight}`);
  console.log(`  FTS weight: ${TEST_CONFIG.ftsWeight}`);
  console.log(`  Critical articles: ${CRITICAL_ARTICLES.join(', ')}`);
  console.log('');
  
  // ========== الجزء 1: Queries عشوائية ==========
  console.log('📊 Part 1: Generating Random Queries');
  console.log('--------------------------------------');
  
  const articles = await getRandomSamples('articles', 50);
  const precedents = await getRandomSamples('judicial_precedents', 20);
  const tameems = await getRandomSamples('tameems', 10);
  
  console.log(`  Samples: ${articles.length} articles, ${precedents.length} precedents, ${tameems.length} tameems`);
  
  const allRecords = [
    ...articles.map(r => ({ ...r, table: 'articles' })),
    ...precedents.map(r => ({ ...r, table: 'judicial_precedents' })),
    ...tameems.map(r => ({ ...r, table: 'tameems' }))
  ];
  
  const randomQueries = [];
  let attempts = 0;
  
  while (randomQueries.length < TEST_CONFIG.randomQueries && attempts < 50) {
    const record = allRecords[Math.floor(Math.random() * allRecords.length)];
    const query = generateQueryFromText(record, record.table);
    
    if (query && !randomQueries.find(q => q.query === query)) {
      randomQueries.push({
        id: `R${randomQueries.length + 1}`,
        type: 'random',
        query,
        sourceTable: record.table,
        sourceId: record.id,
        expectedArticle: record.article_number || null,
        isCritical: false
      });
    }
    attempts++;
  }
  
  console.log(`  Generated: ${randomQueries.length} random queries`);
  console.log('');
  
  // ========== الجزء 2: Materiality Queries ==========
  console.log('🎯 Part 2: Materiality Check Queries');
  console.log('--------------------------------------');
  console.log(`  Loaded: ${MATERIALITY_QUERIES.length} critical queries`);
  
  MATERIALITY_QUERIES.forEach(q => {
    console.log(`  ${q.id}: ${q.query}`);
    console.log(`     Expected: ${q.expectedArticles.join(', ')} — ${q.note}`);
  });
  console.log('');
  
  // ========== عرض كل الـ Queries ==========
  console.log('📝 Complete Test Suite:');
  console.log('======================');
  
  console.log('\n--- Random Queries (Blind) ---');
  randomQueries.forEach((q, i) => {
    console.log(`\n${q.id}. ${q.query.substring(0, 100)}${q.query.length > 100 ? '...' : ''}`);
    console.log(`   Source: ${q.sourceTable}${q.expectedArticle ? ` (Article ${q.expectedArticle})` : ''}`);
  });
  
  console.log('\n--- Materiality Check Queries ---');
  MATERIALITY_QUERIES.forEach(q => {
    console.log(`\n${q.id}. ${q.query}`);
    console.log(`   Expected Articles: ${q.expectedArticles.join(', ')}`);
    console.log(`   Category: ${q.category}`);
    console.log(`   Note: ${q.note}`);
    console.log(`   ⚠️ CRITICAL — Materiality Check Required`);
  });
  
  console.log('\n');
  
  // ========== حفظ الاختبار ==========
  const testConfig = {
    timestamp: new Date().toISOString(),
    config: TEST_CONFIG,
    criticalArticles: CRITICAL_ARTICLES,
    randomQueries,
    materialityQueries: MATERIALITY_QUERIES,
    sampleStats: {
      articles: articles.length,
      precedents: precedents.length,
      tameems: tameems.length
    },
    totalQueries: randomQueries.length + MATERIALITY_QUERIES.length
  };
  
  fs.writeFileSync('blind-test-full.json', JSON.stringify(testConfig, null, 2));
  
  console.log('✅ Test suite saved to: blind-test-full.json');
  console.log('');
  console.log('📊 Test Summary:');
  console.log(`  Total queries: ${testConfig.totalQueries}`);
  console.log(`  Random (blind): ${randomQueries.length}`);
  console.log(`  Materiality check: ${MATERIALITY_QUERIES.length}`);
  console.log(`  Critical articles covered: ${CRITICAL_ARTICLES.join(', ')}`);
  console.log('');
  console.log('🎯 Next Steps:');
  console.log('  1. Run Hybrid Search with OpenAI embeddings');
  console.log('  2. For Random Queries: Measure Recall@5, Precision');
  console.log('  3. For Materiality Queries:');
  console.log('     • Are critical articles (53/82/155) in Top 5?');
  console.log('     • If not → Materiality Check FAIL');
  console.log('  4. Document raw results without comparison');
  console.log('  5. Decide: LLM-NER needed?');
}

runBlindTest().catch(console.error);

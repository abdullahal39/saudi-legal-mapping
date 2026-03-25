#!/usr/bin/env node
/**
 * 🤖 RAG-Based Legal Assistant
 * يجمع بين: Vector Search + LLM Context + Full Text Search
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

/**
 * RAG Search: Vector + FTS + LLM Re-ranking
 */
async function ragSearch(query, options = {}) {
  const { table = 'articles', limit = 5 } = options;
  
  console.log(`\n🔍 RAG Query: "${query}"`);
  console.log('─'.repeat(60));
  
  // Step 1: Get embedding for query (mock for now)
  const queryEmbedding = Array(1536).fill(0).map(() => Math.random() * 0.1);
  
  // Step 2: Vector Search (Semantic Similarity)
  console.log('   📊 Vector Search (Semantic)...');
  const { data: vectorResults, error: vecError } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.5,
    match_count: 10,
    table_name: table
  });
  
  if (vecError) {
    console.log(`   ❌ Vector error: ${vecError.message}`);
  }
  
  // Step 3: Full Text Search (Keyword matching)
  console.log('   🔤 Full Text Search...');
  const keywords = query.split(/\s+/).filter(w => w.length > 2).join(' & ');
  const { data: ftsResults } = await supabase
    .from(table)
    .select('id, article_number, title, content')
    .textSearch('search_terms', keywords, { type: 'websearch' })
    .limit(10);
  
  // Step 4: Combine and deduplicate
  const combined = new Map();
  
  (vectorResults || []).forEach((r, i) => {
    combined.set(r.id, { ...r, vecRank: i, ftsRank: null });
  });
  
  (ftsResults || []).forEach((r, i) => {
    if (combined.has(r.id)) {
      combined.get(r.id).ftsRank = i;
    } else {
      combined.set(r.id, { ...r, vecRank: null, ftsRank: i });
    }
  });
  
  // Step 5: Re-rank (Hybrid score)
  const ranked = Array.from(combined.values())
    .map(r => ({
      ...r,
      score: (r.vecRank !== null ? 1/(r.vecRank + 1) : 0) * 0.5 +
             (r.ftsRank !== null ? 1/(r.ftsRank + 1) : 0) * 0.5
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  console.log(`   ✅ Found ${ranked.length} results`);
  
  // Step 6: In production, send to LLM for final answer generation
  // const answer = await generateAnswer(query, ranked);
  
  return ranked;
}

/**
 * Test RAG on competitor questions
 */
async function testRAG() {
  console.log('🧪 RAG-Based Search Test');
  console.log('========================\n');
  
  const tests = [
    'هل يحق فصل الموظفة اثناء الاجازة المرضية وخلال فترة التجربة',
    'اذا كانت خدمة مندية او عمالة منزليه ماهو الجواب',
    'القاعدة الرابعة عشرة نظام المعاملات الممدنية',
    'هل يجوز الرجعو في الخطبة',
    'ما هي دية القتل العمد وشبه العمد والخطا'
  ];
  
  for (let i = 0; i < tests.length; i++) {
    const results = await ragSearch(tests[i]);
    
    console.log(`\n   📄 Top Results:`);
    results.slice(0, 3).forEach((r, j) => {
      console.log(`      ${j+1}. ${r.article_number} - ${r.title?.substring(0, 50)}...`);
    });
    
    console.log('');
  }
}

testRAG().catch(console.error);

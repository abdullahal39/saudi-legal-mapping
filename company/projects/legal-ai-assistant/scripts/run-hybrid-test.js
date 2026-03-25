#!/usr/bin/env node
/**
 * 🚀 Hybrid Search Test Execution
 * تشغيل الاختبار الكامل مع القياس
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

// Load test config
const testConfig = JSON.parse(fs.readFileSync('blind-test-full.json', 'utf8'));

// Mock embedding function (would use OpenAI in production)
async function getQueryEmbedding(query) {
  // In production: call OpenAI embeddings API
  // For now, return mock embedding
  return Array(1536).fill(0).map(() => Math.random() * 0.1 - 0.05);
}

async function vectorSearch(queryEmbedding, table, limit = 5) {
  const { data, error } = await supabase
    .rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: limit,
      table_name: table,
    });
  
  if (error) {
    console.error(`Vector search error on ${table}:`, error.message);
    return [];
  }
  
  return data.map((r, i) => ({
    ...r,
    search_type: 'vector',
    rank: i + 1,
    score: r.similarity || 0
  }));
}

async function ftsSearch(query, table, limit = 5) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .textSearch('search_terms', query, { type: 'plain' })
    .limit(limit);
  
  if (error) {
    console.error(`FTS search error on ${table}:`, error.message);
    return [];
  }
  
  return (data || []).map((r, i) => ({
    ...r,
    search_type: 'fts',
    rank: i + 1,
    score: 1 / (i + 1) // Simple scoring
  }));
}

async function hybridSearch(query, queryEmbedding, options = {}) {
  const {
    tables = ['articles', 'judicial_precedents', 'tameems'],
    limit = 5,
    vectorWeight = 0.7,
    ftsWeight = 0.3,
    k = 60 // RRF constant
  } = options;
  
  const allResults = [];
  
  for (const table of tables) {
    // Get vector results
    const vectorResults = await vectorSearch(queryEmbedding, table, limit * 2);
    
    // Get FTS results
    const ftsResults = await ftsSearch(query, table, limit * 2);
    
    // Combine with RRF
    const combined = new Map();
    
    vectorResults.forEach(r => {
      combined.set(r.id, {
        ...r,
        vector_rank: r.rank,
        fts_rank: Infinity,
        score: vectorWeight / (k + r.rank)
      });
    });
    
    ftsResults.forEach(r => {
      if (combined.has(r.id)) {
        const existing = combined.get(r.id);
        existing.fts_rank = r.rank;
        existing.score += ftsWeight / (k + r.rank);
      } else {
        combined.set(r.id, {
          ...r,
          vector_rank: Infinity,
          fts_rank: r.rank,
          score: ftsWeight / (k + r.rank)
        });
      }
    });
    
    allResults.push(...Array.from(combined.values()));
  }
  
  // Sort by score and take top K
  return allResults
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

async function runTest() {
  console.log('🚀 Hybrid Search Test Execution');
  console.log('================================\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    randomQueries: [],
    materialityQueries: [],
    summary: {
      totalQueries: testConfig.totalQueries,
      materialityPass: 0,
      materialityFail: 0,
      avgRecall: 0
    }
  };
  
  // Test Random Queries
  console.log('📊 Testing Random Queries...');
  console.log('-----------------------------');
  
  for (const query of testConfig.randomQueries) {
    process.stdout.write(`  ${query.id}: "${query.query.substring(0, 50)}..." `);
    
    const embedding = await getQueryEmbedding(query.query);
    const searchResults = await hybridSearch(query.query, embedding, {
      limit: testConfig.config.topK
    });
    
    // Check if source is in results (Recall)
    const found = searchResults.some(r => 
      r.id === query.sourceId || 
      r.article_number === query.expectedArticle
    );
    
    results.randomQueries.push({
      ...query,
      found,
      resultsCount: searchResults.length,
      topResult: searchResults[0]?.title || 'N/A'
    });
    
    process.stdout.write(found ? '✅\n' : '❌\n');
  }
  
  console.log('');
  
  // Test Materiality Queries
  console.log('🎯 Testing Materiality Queries...');
  console.log('---------------------------------');
  
  for (const query of testConfig.materialityQueries) {
    process.stdout.write(`  ${query.id}: "${query.query}" `);
    
    const embedding = await getQueryEmbedding(query.query);
    const searchResults = await hybridSearch(query.query, embedding, {
      limit: testConfig.config.topK,
      tables: ['articles'] // Focus on articles for materiality
    });
    
    // Check if critical articles are in results
    const foundArticles = [];
    const missingArticles = [];
    
    for (const article of query.expectedArticles) {
      const found = searchResults.some(r => 
        r.article_number?.includes(article) ||
        r.title?.includes(article)
      );
      
      if (found) {
        foundArticles.push(article);
      } else {
        missingArticles.push(article);
      }
    }
    
    const pass = foundArticles.length > 0;
    
    if (pass) {
      results.summary.materialityPass++;
    } else {
      results.summary.materialityFail++;
    }
    
    results.materialityQueries.push({
      ...query,
      pass,
      foundArticles,
      missingArticles,
      resultsCount: searchResults.length
    });
    
    process.stdout.write(pass ? '✅\n' : '❌ FAIL\n');
    if (missingArticles.length > 0) {
      console.log(`     Missing: ${missingArticles.join(', ')}`);
    }
  }
  
  console.log('');
  
  // Summary
  console.log('📈 Results Summary:');
  console.log('==================');
  console.log(`  Total Queries: ${results.summary.totalQueries}`);
  console.log(`  Random — Found in Top 5: ${results.randomQueries.filter(q => q.found).length}/${results.randomQueries.length}`);
  console.log(`  Materiality — PASS: ${results.summary.materialityPass}/${testConfig.materialityQueries.length}`);
  console.log(`  Materiality — FAIL: ${results.summary.materialityFail}/${testConfig.materialityQueries.length}`);
  
  // Verdict
  console.log('');
  console.log('🏆 Verdict:');
  if (results.summary.materialityPass >= 4) {
    console.log('  ✅ Hybrid Search is SUFFICIENT');
    console.log('  ➜ Proceed to LLM-NER PoC');
  } else if (results.summary.materialityPass >= 3) {
    console.log('  ⚠️  Hybrid Search is ACCEPTABLE but needs improvement');
    console.log('  ➜ Add Materiality Check layer');
  } else {
    console.log('  ❌ Hybrid Search INSUFFICIENT');
    console.log('  ➜ Priority: NER + Materiality Check');
  }
  
  // Save results
  fs.writeFileSync('hybrid-test-results.json', JSON.stringify(results, null, 2));
  console.log('');
  console.log('✅ Results saved to: hybrid-test-results.json');
}

runTest().catch(console.error);

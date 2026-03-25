#!/usr/bin/env node
/**
 * 🔍 فحص شامل تفصيلي لقاعدة البيانات
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function inspectTable(tableName) {
  console.log(`\n📋 ${tableName}`);
  console.log('='.repeat(60));
  
  // Get sample record
  const { data: sample, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1)
    .single();
  
  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return;
  }
  
  // Check each relevant column
  console.log('\n  📊 Column Details:');
  
  // embedding_vec
  if ('embedding_vec' in sample) {
    const vec = sample.embedding_vec;
    let status = '❌';
    let details = '';
    
    if (Array.isArray(vec)) {
      status = '✅';
      details = `Array[${vec.length}]`;
    } else if (typeof vec === 'string') {
      // Check if it looks like a vector string
      if (vec.startsWith('[') && vec.includes(',')) {
        status = '⚠️';
        details = 'String (should be Array)';
      } else {
        status = '❌';
        details = 'Invalid format';
      }
    } else if (vec === null) {
      status = '⚠️';
      details = 'NULL';
    }
    
    const { count: withVec } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('embedding_vec', 'is', null);
    
    console.log(`    ${status} embedding_vec: ${details} — ${withVec} records`);
  }
  
  // search_terms
  if ('search_terms' in sample) {
    const st = sample.search_terms;
    let status = '❌';
    let details = '';
    
    if (st === null) {
      status = '⚠️';
      details = 'NULL';
    } else if (typeof st === 'string' && st.includes(':')) {
      // Looks like tsvector string
      status = '⚠️';
      details = 'String format (may need checking)';
    } else if (typeof st === 'object') {
      status = '✅';
      details = 'Object/Array (tsvector)';
    } else {
      status = '?';
      details = `Type: ${typeof st}`;
    }
    
    const { count: withSt } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('search_terms', 'is', null);
    
    console.log(`    ${status} search_terms: ${details} — ${withSt} records`);
  }
  
  // Check critical articles for 'articles' table
  if (tableName === 'articles') {
    console.log('\n  🎯 Critical Articles Check:');
    const critical = ['53', '82', '155'];
    
    for (const num of critical) {
      const { data, error } = await supabase
        .from(tableName)
        .select('article_number, title, embedding_vec')
        .eq('article_number_int', parseInt(num))
        .maybeSingle();
      
      if (data) {
        const hasVec = data.embedding_vec !== null;
        const vecType = Array.isArray(data.embedding_vec) ? 'Array' : typeof data.embedding_vec;
        console.log(`    ${hasVec ? '✅' : '❌'} Article ${num}: ${data.title?.substring(0, 40)}... [vec: ${hasVec ? vecType : 'NULL'}]`);
      } else {
        console.log(`    ❌ Article ${num}: NOT FOUND`);
      }
    }
  }
  
  // Check total
  const { count: total } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });
  console.log(`\n  📈 Total records: ${total?.toLocaleString()}`);
}

async function checkFunction() {
  console.log('\n🔧 Function Check:');
  console.log('='.repeat(60));
  
  try {
    // Try to call the function
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: Array(1536).fill(0),
      match_threshold: 0.0,
      match_count: 1,
      table_name: 'articles'
    });
    
    if (error) {
      console.log(`  ❌ match_documents: ${error.message}`);
    } else {
      console.log(`  ✅ match_documents: Working (returned ${data?.length || 0} rows)`);
    }
  } catch (e) {
    console.log(`  ❌ match_documents: ${e.message}`);
  }
}

async function checkIndexes() {
  console.log('\n📑 Indexes Check:');
  console.log('='.repeat(60));
  console.log('  (via RPC - cannot query pg_indexes directly)');
  console.log('  Indexes should exist: idx_articles_fts, idx_judicial_precedents_fts, idx_tameems_fts');
}

async function main() {
  console.log('🔍 Comprehensive Database Inspection');
  console.log('====================================');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('');
  console.log('Legend: ✅ = OK | ⚠️ = Warning | ❌ = Error');
  
  for (const table of TABLES) {
    await inspectTable(table);
  }
  
  await checkFunction();
  await checkIndexes();
  
  console.log('\n====================================');
  console.log('🔍 Inspection Complete');
}

main().catch(console.error);

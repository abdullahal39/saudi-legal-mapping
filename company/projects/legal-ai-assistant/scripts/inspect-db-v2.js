#!/usr/bin/env node
/**
 * 🔍 فحص شامل لقاعدة البيانات (Alternative)
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function inspectTable(tableName) {
  console.log(`\n📋 ${tableName}:`);
  console.log('-'.repeat(60));
  
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
  
  // Show all columns
  console.log('  Columns:');
  Object.keys(sample).sort().forEach(key => {
    const value = sample[key];
    let type = typeof value;
    let indicator = '';
    
    if (key.includes('embedding')) indicator = ' 📦';
    if (key.includes('vec')) indicator = ' 📦';
    if (key.includes('search')) indicator = ' 🔍';
    if (key.includes('backup')) indicator = ' 💾';
    
    console.log(`    • ${key}: ${type}${indicator}`);
  });
  
  // Check specific columns status
  console.log('\n  Data Status:');
  
  // embedding_vec
  if ('embedding_vec' in sample) {
    const { count: withVec } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('embedding_vec', 'is', null);
    const { count: total } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    console.log(`    • embedding_vec: ${withVec?.toLocaleString()}/${total?.toLocaleString()} (${((withVec/total)*100).toFixed(1)}%)`);
  }
  
  // embedding (old)
  if ('embedding' in sample) {
    const { count: withOld } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('embedding', 'is', null);
    console.log(`    • embedding (old): ${withOld?.toLocaleString()} records`);
  }
  
  // embedding_backup
  if ('embedding_backup' in sample) {
    const { count: withBackup } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('embedding_backup', 'is', null);
    console.log(`    • embedding_backup: ${withBackup?.toLocaleString()} records 💾`);
  }
  
  // search_terms
  if ('search_terms' in sample) {
    const { count: withSearch } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })
      .not('search_terms', 'is', null);
    const { count: total } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    console.log(`    • search_terms: ${withSearch?.toLocaleString()}/${total?.toLocaleString()} 🔍`);
    
    // Show sample value
    if (sample.search_terms) {
      const preview = String(sample.search_terms).substring(0, 100);
      console.log(`      Sample: ${preview}...`);
    }
  }
  
  // search_terms backup
  if ('search_terms_backup' in sample || 'search_terms_text_backup' in sample) {
    const backupCol = 'search_terms_backup' in sample ? 'search_terms_backup' : 'search_terms_text_backup';
    console.log(`    • ${backupCol}: exists 💾`);
  }
}

async function main() {
  console.log('🔍 Database Inspection Report');
  console.log('==============================');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('');
  console.log('Legend: 📦 = embedding | 🔍 = search | 💾 = backup');
  
  for (const table of TABLES) {
    await inspectTable(table);
  }
  
  console.log('\n==============================');
  console.log('🔍 Inspection Complete');
}

main().catch(console.error);

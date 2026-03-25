#!/usr/bin/env node
/**
 * 🔍 فحص شامل لقاعدة البيانات
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
  
  // Get all columns
  const { data: columns, error: colError } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, is_nullable')
    .eq('table_name', tableName)
    .order('ordinal_position');
  
  if (colError) {
    console.log(`  ❌ Error: ${colError.message}`);
    return;
  }
  
  // Filter relevant columns
  const relevantCols = columns.filter(c => 
    c.column_name.includes('embedding') ||
    c.column_name.includes('search') ||
    c.column_name.includes('backup') ||
    c.column_name.includes('vec')
  );
  
  if (relevantCols.length === 0) {
    console.log('  ⚠️ No embedding/search/backup columns found');
  } else {
    relevantCols.forEach(c => {
      console.log(`  • ${c.column_name}: ${c.data_type} ${c.is_nullable === 'YES' ? '(nullable)' : '(not null)'}`);
    });
  }
  
  // Get sample record to check data
  const { data: sample, error: sampleError } = await supabase
    .from(tableName)
    .select('*')
    .limit(1)
    .single();
  
  if (!sampleError && sample) {
    console.log('\n  📊 Data Status:');
    
    // Check embedding_vec
    if ('embedding_vec' in sample) {
      const { count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .not('embedding_vec', 'is', null);
      console.log(`    • embedding_vec: ${count} records with data`);
    }
    
    // Check search_terms
    if ('search_terms' in sample) {
      const { count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .not('search_terms', 'is', null);
      console.log(`    • search_terms: ${count} records with data`);
    }
    
    // Check backup columns
    const backupCols = Object.keys(sample).filter(k => k.includes('backup'));
    backupCols.forEach(col => {
      console.log(`    • ${col}: exists (backup)`);
    });
  }
  
  // Get total count
  const { count: total } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });
  console.log(`\n  📈 Total records: ${total?.toLocaleString()}`);
}

async function main() {
  console.log('🔍 Database Inspection Report');
  console.log('==============================');
  console.log(`Time: ${new Date().toISOString()}`);
  
  for (const table of TABLES) {
    await inspectTable(table);
  }
  
  console.log('\n==============================');
  console.log('🔍 Inspection Complete');
}

main().catch(console.error);

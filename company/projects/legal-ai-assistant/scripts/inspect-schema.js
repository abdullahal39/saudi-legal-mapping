#!/usr/bin/env node
/**
 * 🔍 فحص هيكل الجداول
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function inspectTable(tableName) {
  console.log(`\n📋 ${tableName}:`);
  console.log('-'.repeat(50));
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);
  
  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return;
  }
  
  if (!data || data.length === 0) {
    console.log('  ⚠️ No records found');
    return;
  }
  
  const record = data[0];
  console.log('  Columns:');
  Object.keys(record).forEach(key => {
    const value = record[key];
    const type = Array.isArray(value) ? 'array' : typeof value;
    const preview = value !== null && typeof value === 'string' 
      ? value.substring(0, 30) + (value.length > 30 ? '...' : '')
      : value;
    console.log(`    - ${key}: ${type}${preview !== null ? ` = ${preview}` : ''}`);
  });
}

async function main() {
  console.log('🔍 Table Schema Inspection');
  console.log('============================');
  
  for (const table of TABLES) {
    await inspectTable(table);
  }
}

main().catch(console.error);

#!/usr/bin/env node
/**
 * 🔧 SQL Setup for Hybrid Search
 * تنفيذ إعدادات الـ Hybrid Search عبر Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const SQL_FILE = './setup-hybrid-search.sql';

async function executeSQL() {
  console.log('🔧 Setting up Hybrid Search Infrastructure...');
  console.log('==============================================\n');
  
  // Read SQL file
  const sql = fs.readFileSync(SQL_FILE, 'utf8');
  
  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`Found ${statements.length} SQL statements to execute\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    const shortDesc = statement.substring(0, 60).replace(/\s+/g, ' ');
    
    process.stdout.write(`[${i + 1}/${statements.length}] ${shortDesc}... `);
    
    try {
      // Try to execute via RPC
      const { error } = await supabase.rpc('execute_sql', { 
        sql: statement + ';' 
      });
      
      if (error) {
        // If RPC fails, just log the SQL for manual execution
        console.log('⚠️  (requires manual execution)');
        errorCount++;
      } else {
        console.log('✅');
        successCount++;
      }
    } catch (e) {
      console.log('⚠️  (requires manual execution)');
      errorCount++;
    }
  }
  
  console.log('\n==============================================');
  console.log('📊 Summary:');
  console.log(`  Successful: ${successCount}`);
  console.log(`  Need manual execution: ${errorCount}`);
  console.log('');
  
  if (errorCount > 0) {
    console.log('⚠️  Some statements require manual execution.');
    console.log('📋 SQL file location: setup-hybrid-search.sql');
    console.log('');
    console.log('To execute manually:');
    console.log('  1. Open Supabase Dashboard');
    console.log('  2. Go to SQL Editor');
    console.log('  3. Copy and paste the contents of setup-hybrid-search.sql');
    console.log('  4. Run the SQL');
    
    // Also display the SQL for copy-paste
    console.log('\n📝 SQL Content (for copy-paste):');
    console.log('==============================================\n');
    console.log(sql);
  } else {
    console.log('✅ All SQL statements executed successfully!');
    console.log('🚀 Hybrid Search is ready to use.');
  }
}

// Alternative: Test if match_documents function exists
async function checkSetup() {
  console.log('🔍 Checking current setup...\n');
  
  // Check match_documents function
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: Array(1536).fill(0),
      match_threshold: 0.5,
      match_count: 1,
      table_name: 'articles'
    });
    
    if (error) {
      console.log(`❌ match_documents function: ${error.message}`);
    } else {
      console.log('✅ match_documents function exists');
    }
  } catch (e) {
    console.log(`❌ match_documents function: ${e.message}`);
  }
  
  // Check search_terms columns
  const tables = ['articles', 'judicial_precedents', 'tameems'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('search_terms')
        .limit(1);
      
      if (error && error.message.includes('column')) {
        console.log(`❌ ${table}.search_terms: column does not exist`);
      } else {
        console.log(`✅ ${table}.search_terms: exists`);
      }
    } catch (e) {
      console.log(`❌ ${table}.search_terms: ${e.message}`);
    }
  }
}

// Main
const command = process.argv[2];

if (command === 'check') {
  checkSetup();
} else {
  executeSQL();
}

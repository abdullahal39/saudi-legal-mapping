#!/usr/bin/env node
/**
 * ✅ Quick Test — Check if match_documents works
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

async function testFunction() {
  console.log('🧪 Testing match_documents function...\n');
  
  // Test with zero vector
  const zeroVector = Array(1536).fill(0);
  
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: zeroVector,
      match_threshold: 0.0,
      match_count: 3,
      table_name: 'articles'
    });
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
      return false;
    }
    
    console.log('✅ match_documents function works!');
    console.log(`   Found ${data?.length || 0} results`);
    
    if (data && data.length > 0) {
      console.log('\n📄 Sample result:');
      console.log(`   ID: ${data[0].id}`);
      console.log(`   Content preview: ${data[0].content?.substring(0, 100)}...`);
      console.log(`   Similarity: ${data[0].similarity}`);
    }
    
    return true;
  } catch (e) {
    console.log(`❌ Exception: ${e.message}`);
    return false;
  }
}

testFunction();

/**
 * Script: Fix Embedding Format for Judicial Precedents
 * 
 * Problem: Embeddings are stored as text "[0.1,0.2,...]" 
 * Solution: Convert to proper pgvector vector(1536) format
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dfbgqjhxcuwtofmwuxts.supabase.co';
const SUPABASE_SERVICE_KEY = 'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Parse embedding string to array
function parseEmbeddingString(embeddingStr) {
  if (!embeddingStr) return null;
  if (Array.isArray(embeddingStr)) return embeddingStr;
  
  try {
    // Remove brackets and split by comma
    const cleaned = embeddingStr.replace(/^\[|\]$/g, '');
    return cleaned.split(',').map(parseFloat);
  } catch (e) {
    console.error('Failed to parse:', embeddingStr.substring(0, 50));
    return null;
  }
}

// Check current schema
async function checkEmbeddingFormat() {
  console.log('🔍 Checking embedding format...\n');
  
  const { data, error } = await supabase
    .from('judicial_precedents')
    .select('id, embedding')
    .limit(3);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  for (const record of data) {
    console.log(`Record ${record.id}:`);
    console.log(`  Type: ${typeof record.embedding}`);
    console.log(`  Is Array: ${Array.isArray(record.embedding)}`);
    if (typeof record.embedding === 'string') {
      console.log(`  Length: ${record.embedding.length} chars`);
      console.log(`  Preview: ${record.embedding.substring(0, 50)}...`);
    }
    console.log('');
  }
}

// Main function to check status
async function main() {
  await checkEmbeddingFormat();
  
  // Check if pgvector extension is available
  console.log('\n🔍 Checking pgvector extension...');
  const { data, error } = await supabase.rpc('check_pgvector');
  
  if (error) {
    console.log('⚠️  Cannot check pgvector directly. Will try SQL.');
    
    // Alternative: Try to create a test query
    const { error: testError } = await supabase
      .from('judicial_precedents')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('❌ Database error:', testError.message);
    } else {
      console.log('✅ Database connection OK');
    }
  } else {
    console.log('✅ pgvector status:', data);
  }
}

main().catch(console.error);

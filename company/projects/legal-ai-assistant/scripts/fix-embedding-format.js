/**
 * Script: Convert String Embeddings to pgvector Format
 * 
 * Converts embeddings stored as "[0.1,0.2,...]" strings
 * to proper pgvector vector(1536) format
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
    // Parse the JSON array string
    return JSON.parse(embeddingStr);
  } catch (e) {
    console.error('Failed to parse:', embeddingStr.substring(0, 50));
    return null;
  }
}

// Process batch and update
async function fixEmbeddingsBatch(batchSize = 500) {
  console.log('🔧 Starting embedding format fix...\n');
  
  // Get total count
  const { count, error: countError } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('❌ Error getting count:', countError.message);
    return;
  }
  
  console.log(`📊 Total records to process: ${count}`);
  console.log(`⚙️  Batch size: ${batchSize}\n`);
  
  let processed = 0;
  let fixed = 0;
  let failed = 0;
  const startTime = Date.now();
  
  // Process in batches using range
  let hasMore = true;
  let lastId = null;
  
  while (hasMore) {
    // Build query
    let query = supabase
      .from('judicial_precedents')
      .select('id, embedding')
      .limit(batchSize);
    
    if (lastId) {
      query = query.gt('id', lastId);
    }
    
    const { data: records, error } = await query.order('id');
    
    if (error) {
      console.error('❌ Error fetching batch:', error.message);
      break;
    }
    
    if (!records || records.length === 0) {
      hasMore = false;
      break;
    }
    
    // Update lastId for next iteration
    lastId = records[records.length - 1].id;
    
    // Process each record
    const updates = [];
    for (const record of records) {
      if (typeof record.embedding === 'string') {
        const parsed = parseEmbeddingString(record.embedding);
        if (parsed && parsed.length === 1536) {
          updates.push({
            id: record.id,
            embedding: parsed // This should now be stored as vector
          });
        } else {
          failed++;
          if (parsed) {
            console.log(`⚠️  Record ${record.id}: Expected 1536 dims, got ${parsed?.length}`);
          }
        }
      }
    }
    
    // Update batch
    if (updates.length > 0) {
      // We need to use raw SQL to update vector columns properly
      for (const update of updates) {
        const { error: updateError } = await supabase.rpc('update_embedding', {
          record_id: update.id,
          new_embedding: update.embedding
        });
        
        if (updateError) {
          // Fallback: Try direct update
          const { error: directError } = await supabase
            .from('judicial_precedents')
            .update({ embedding: update.embedding })
            .eq('id', update.id);
          
          if (directError) {
            console.error(`❌ Failed to update ${update.id}:`, directError.message);
            failed++;
          } else {
            fixed++;
          }
        } else {
          fixed++;
        }
      }
    }
    
    processed += records.length;
    
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = processed / elapsed;
    
    console.log(`🔄 Batch: ${processed}/${count} (${((processed/count)*100).toFixed(1)}%) | Fixed: ${fixed} | Failed: ${failed} | Rate: ${rate.toFixed(1)}/s`);
  }
  
  const totalTime = (Date.now() - startTime) / 1000;
  console.log('\n📊 Summary:');
  console.log(`   Total processed: ${processed}`);
  console.log(`   Fixed: ${fixed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Time: ${Math.ceil(totalTime)} seconds`);
  console.log(`   Rate: ${(processed / totalTime).toFixed(2)} records/second`);
}

// Alternative: Create SQL migration
function generateSQLMigration() {
  console.log(`
-- SQL Migration to fix embedding format
-- Run this in Supabase SQL Editor

-- 1. Add temporary column with correct type
ALTER TABLE judicial_precedents 
ADD COLUMN IF NOT EXISTS embedding_vector vector(1536);

-- 2. Convert string embeddings to vectors (this might need a function)
-- Note: Supabase doesn't support direct casting from string to vector
-- You'll need to use the scripts or a custom function

-- 3. After conversion, drop old column and rename
-- ALTER TABLE judicial_precedents DROP COLUMN embedding;
-- ALTER TABLE judicial_precedents RENAME COLUMN embedding_vector TO embedding;

-- 4. Create HNSW index for fast similarity search
CREATE INDEX IF NOT EXISTS idx_judicial_precedents_embedding 
ON judicial_precedents 
USING hnsw (embedding_vector vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
`);
}

// Main
const command = process.argv[2];

if (command === 'sql') {
  generateSQLMigration();
} else {
  fixEmbeddingsBatch(parseInt(process.argv[2]) || 500)
    .catch(console.error);
}

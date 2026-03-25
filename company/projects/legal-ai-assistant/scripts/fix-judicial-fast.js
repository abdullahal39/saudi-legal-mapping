#!/usr/bin/env node
/**
 * 🔧 إصلاح judicial_precedents embeddings - Batch converter
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const BATCH_SIZE = 300;
const DELAY_MS = 500;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRemainingCount() {
  const { count, error } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true })
    .is('embedding_vec', null);
  
  if (error) {
    console.error('❌ Error getting count:', error.message);
    return null;
  }
  return count;
}

async function convertBatch() {
  // Get batch of records
  const { data: records, error: fetchError } = await supabase
    .from('judicial_precedents')
    .select('id, embedding')
    .is('embedding_vec', null)
    .limit(BATCH_SIZE);
  
  if (fetchError) {
    console.error('❌ Fetch error:', fetchError.message);
    return 0;
  }
  
  if (!records || records.length === 0) {
    return 0;
  }
  
  // Convert each record
  let successCount = 0;
  for (const record of records) {
    try {
      // Parse embedding from text to array
      let embeddingArray;
      if (typeof record.embedding === 'string') {
        embeddingArray = JSON.parse(record.embedding);
      } else if (Array.isArray(record.embedding)) {
        embeddingArray = record.embedding;
      } else {
        console.log(`  ⚠️  Skipping ${record.id} - invalid format`);
        continue;
      }
      
      // Update record
      const { error: updateError } = await supabase
        .from('judicial_precedents')
        .update({ embedding_vec: embeddingArray })
        .eq('id', record.id);
      
      if (updateError) {
        console.error(`  ❌ Failed ${record.id}:`, updateError.message);
      } else {
        successCount++;
      }
      
      // Small delay between updates
      await sleep(50);
      
    } catch (e) {
      console.error(`  ❌ Error ${record.id}:`, e.message);
    }
  }
  
  return successCount;
}

async function main() {
  console.log('========================================');
  console.log('🔧 Converting judicial_precedents embeddings');
  console.log(`📊 Batch size: ${BATCH_SIZE}, Delay: ${DELAY_MS}ms`);
  console.log('========================================\n');
  
  const startTime = Date.now();
  let totalProcessed = 0;
  let batchCount = 0;
  
  // Get initial count
  let remaining = await getRemainingCount();
  if (remaining === null) {
    console.error('❌ Cannot proceed - failed to get count');
    process.exit(1);
  }
  
  console.log(`📋 Initial remaining: ${remaining.toLocaleString()} records\n`);
  
  while (remaining > 0) {
    batchCount++;
    const batchStart = Date.now();
    
    const processed = await convertBatch();
    totalProcessed += processed;
    
    const batchTime = ((Date.now() - batchStart) / 1000).toFixed(1);
    console.log(`✅ Batch ${batchCount}: ${processed} records (${batchTime}s)`);
    
    // Check remaining
    remaining = await getRemainingCount();
    if (remaining === null) break;
    
    const percent = ((totalProcessed / (totalProcessed + remaining)) * 100).toFixed(1);
    console.log(`   Remaining: ${remaining.toLocaleString()} (${percent}%)\n`);
    
    // Delay before next batch
    if (remaining > 0) {
      await sleep(DELAY_MS);
    }
  }
  
  const totalTime = ((Date.now() - startTime) / 60 / 1000).toFixed(1);
  console.log('========================================');
  console.log('✅ Conversion complete!');
  console.log(`📊 Total processed: ${totalProcessed.toLocaleString()}`);
  console.log(`⏱️  Total time: ${totalTime} minutes`);
  console.log('========================================');
}

main().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

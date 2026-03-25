#!/usr/bin/env node
/**
 * 🔧 judicial_precedents converter - Auto-scaling batch size
 * يبدأ بـ 500 ويزيد تلقائياً: 500 → 800 → 900 → 1000
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const BATCH_SIZES = [500, 800, 900, 1000];
let currentSizeIndex = 0;
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

async function convertBatch(batchSize) {
  const { data: records, error: fetchError } = await supabase
    .from('judicial_precedents')
    .select('id, embedding')
    .is('embedding_vec', null)
    .limit(batchSize);
  
  if (fetchError) {
    console.error('❌ Fetch error:', fetchError.message);
    return -1; // Error
  }
  
  if (!records || records.length === 0) {
    return 0; // Done
  }
  
  let successCount = 0;
  for (const record of records) {
    try {
      let embeddingArray;
      if (typeof record.embedding === 'string') {
        embeddingArray = JSON.parse(record.embedding);
      } else if (Array.isArray(record.embedding)) {
        embeddingArray = record.embedding;
      } else {
        continue;
      }
      
      const { error: updateError } = await supabase
        .from('judicial_precedents')
        .update({ embedding_vec: embeddingArray })
        .eq('id', record.id);
      
      if (!updateError) {
        successCount++;
      }
      
      await sleep(30);
    } catch (e) {
      // Skip error
    }
  }
  
  return successCount;
}

async function main() {
  console.log('========================================');
  console.log('🔧 Auto-scaling judicial_precedents converter');
  console.log('📈 Batch sizes: 500 → 800 → 900 → 1000');
  console.log('========================================\n');
  
  const startTime = Date.now();
  let totalProcessed = 0;
  let batchCount = 0;
  
  let remaining = await getRemainingCount();
  if (remaining === null) {
    console.error('❌ Cannot proceed');
    process.exit(1);
  }
  
  console.log(`📋 Initial remaining: ${remaining.toLocaleString()} records\n`);
  
  while (remaining > 0 && currentSizeIndex < BATCH_SIZES.length) {
    const batchSize = BATCH_SIZES[currentSizeIndex];
    batchCount++;
    
    console.log(`🚀 Trying batch size: ${batchSize}`);
    const batchStart = Date.now();
    
    const processed = await convertBatch(batchSize);
    
    if (processed === -1) {
      console.log(`❌ Failed with batch size ${batchSize}`);
      break;
    }
    
    if (processed === 0) {
      console.log('✅ All records processed!');
      break;
    }
    
    totalProcessed += processed;
    const batchTime = ((Date.now() - batchStart) / 1000).toFixed(1);
    
    console.log(`✅ Batch ${batchCount}: ${processed} records (${batchTime}s)`);
    
    // Check if we should increase batch size
    const timePerRecord = parseFloat(batchTime) / processed;
    
    if (timePerRecord < 0.5 && currentSizeIndex < BATCH_SIZES.length - 1) {
      currentSizeIndex++;
      console.log(`📈 Increasing batch size to: ${BATCH_SIZES[currentSizeIndex]}`);
    }
    
    remaining = await getRemainingCount();
    if (remaining === null) break;
    
    const percent = ((totalProcessed / (totalProcessed + remaining)) * 100).toFixed(1);
    console.log(`   Remaining: ${remaining.toLocaleString()} (${percent}%)\n`);
    
    if (remaining > 0) {
      await sleep(DELAY_MS);
    }
  }
  
  const totalTime = ((Date.now() - startTime) / 60 / 1000).toFixed(1);
  console.log('========================================');
  console.log('✅ Conversion complete!');
  console.log(`📊 Total processed: ${totalProcessed.toLocaleString()}`);
  console.log(`⏱️  Total time: ${totalTime} minutes`);
  console.log(`📈 Final batch size: ${BATCH_SIZES[currentSizeIndex]}`);
  console.log('========================================');
}

main().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

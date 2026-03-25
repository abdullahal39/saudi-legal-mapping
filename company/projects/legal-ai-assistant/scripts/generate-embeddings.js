/**
 * Script: Generate Embeddings for Judicial Precedents
 * 
 * Purpose: Generate embeddings for 13,624 judicial precedents
 * that are currently missing embeddings in the database.
 * 
 * Usage: node generate-embeddings.js [batch_size] [start_index]
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');

// Configuration
const SUPABASE_URL = 'process.env.SUPABASE_URL';
const SUPABASE_KEY = 'process.env.SUPABASE_KEY';
const OPENAI_API_KEY = 'process.env.OPENAI_API_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Arabic normalization function
function normalizeArabic(text) {
  if (!text) return '';
  return text
    // Normalize alef variants
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize alef maksura
    .replace(/ى/g, 'ي')
    // Normalize teh marbuta
    .replace(/ة/g, 'ه')
    // Remove tashkeel
    .replace(/[ًٌٍَُِّْ]/g, '')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate embedding for a single text
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('❌ Error generating embedding:', error.message);
    throw error;
  }
}

// Process batch of records
async function processBatch(records) {
  const updates = [];
  
  for (const record of records) {
    const content = record.content || record.title || '';
    const normalizedContent = normalizeArabic(content);
    
    try {
      const embedding = await generateEmbedding(normalizedContent);
      
      updates.push({
        id: record.id,
        embedding: embedding,
        content_normalized: normalizedContent,
      });
      
      // Rate limiting - small delay
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Failed to process record ${record.id}:`, error.message);
    }
  }
  
  return updates;
}

// Update records in database
async function updateRecords(updates) {
  if (updates.length === 0) return;
  
  const { error } = await supabase
    .from('judicial_precedents')
    .upsert(updates, { onConflict: 'id' });
  
  if (error) {
    console.error('❌ Error updating records:', error.message);
    throw error;
  }
  
  console.log(`✅ Updated ${updates.length} records`);
}

// Main function
async function generateEmbeddings(batchSize = 100, startIndex = 0) {
  console.log('🔍 Fetching judicial precedents without embeddings...\n');
  
  // Get count of records without embeddings
  const { count, error: countError } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true })
    .is('embedding', null);
  
  if (countError) {
    console.error('❌ Error fetching count:', countError.message);
    return;
  }
  
  console.log(`📊 Found ${count} records without embeddings`);
  console.log(`⚙️  Batch size: ${batchSize}`);
  console.log(`⏱️  Estimated time: ${Math.ceil((count * 1.5) / 60)} minutes\n`);
  
  let processed = 0;
  let failed = 0;
  const startTime = Date.now();
  
  while (true) {
    // Fetch batch
    const { data: records, error } = await supabase
      .from('judicial_precedents')
      .select('id, title, content')
      .is('embedding', null)
      .range(startIndex + processed, startIndex + processed + batchSize - 1);
    
    if (error) {
      console.error('❌ Error fetching records:', error.message);
      break;
    }
    
    if (!records || records.length === 0) {
      console.log('\n✅ All records processed!');
      break;
    }
    
    console.log(`🔄 Processing batch ${Math.floor(processed / batchSize) + 1} (${records.length} records)...`);
    
    try {
      const updates = await processBatch(records);
      await updateRecords(updates);
      processed += records.length;
      
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = processed / elapsed;
      const remaining = count - processed;
      const eta = remaining / rate;
      
      console.log(`   Progress: ${processed}/${count} (${((processed/count)*100).toFixed(1)}%)`);
      console.log(`   ETA: ${Math.ceil(eta / 60)} minutes\n`);
    } catch (error) {
      console.error('❌ Batch failed:', error.message);
      failed += records.length;
    }
  }
  
  const totalTime = (Date.now() - startTime) / 1000;
  console.log('\n📊 Summary:');
  console.log(`   Total processed: ${processed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Time: ${Math.ceil(totalTime / 60)} minutes`);
  console.log(`   Rate: ${(processed / totalTime).toFixed(2)} records/second`);
}

// Run if called directly
if (require.main === module) {
  const batchSize = parseInt(process.argv[2]) || 100;
  const startIndex = parseInt(process.argv[3]) || 0;
  
  generateEmbeddings(batchSize, startIndex)
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { generateEmbeddings, normalizeArabic, generateEmbedding };

/**
 * Script: Regenerate Embeddings for Judicial Precedents
 * 
 * Properly generates embeddings as vector(1536) format
 * NOT as text strings
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');

const SUPABASE_URL = 'process.env.SUPABASE_URL';
const SUPABASE_SERVICE_KEY = 'process.env.SUPABASE_KEY';
const OPENAI_API_KEY = 'process.env.OPENAI_API_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Arabic normalization
function normalizeArabic(text) {
  if (!text) return '';
  return text
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate embedding using OpenAI
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.substring(0, 8000), // Limit to 8k chars
    encoding_format: 'float',
  });
  return response.data[0].embedding;
}

// Main processing function
async function regenerateEmbeddings(batchSize = 50) {
  console.log('🚀 Starting embedding regeneration...\n');
  
  // Get total count
  const { count, error: countError } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('❌ Error:', countError.message);
    return;
  }
  
  console.log(`📊 Total records: ${count}`);
  console.log(`⚙️  Batch size: ${batchSize}`);
  console.log(`💰 Estimated cost: $${((count / 1000000) * 0.02).toFixed(4)}\n`);
  
  let processed = 0;
  let successful = 0;
  let failed = 0;
  const startTime = Date.now();
  const failedIds = [];
  
  // Process all records
  let lastId = null;
  
  while (processed < count) {
    // Fetch batch
    let query = supabase
      .from('judicial_precedents')
      .select('id, title, content')
      .order('id')
      .limit(batchSize);
    
    if (lastId) {
      query = query.gt('id', lastId);
    }
    
    const { data: records, error } = await query;
    
    if (error) {
      console.error('❌ Fetch error:', error.message);
      break;
    }
    
    if (!records || records.length === 0) break;
    
    lastId = records[records.length - 1].id;
    
    // Process each record
    for (const record of records) {
      try {
        const content = record.content || record.title || '';
        const normalizedContent = normalizeArabic(content);
        
        // Generate new embedding
        const embedding = await generateEmbedding(normalizedContent);
        
        // Update record - let Supabase handle the vector type
        // Note: content_normalized has constraints, updating embedding only
        const { error: updateError } = await supabase
          .from('judicial_precedents')
          .update({
            embedding: embedding
          })
          .eq('id', record.id);
        
        if (updateError) {
          console.error(`❌ Update failed for ${record.id}:`, updateError.message);
          failed++;
          failedIds.push(record.id);
        } else {
          successful++;
        }
        
        // Rate limiting
        await new Promise(r => setTimeout(r, 200));
        
      } catch (e) {
        console.error(`❌ Processing failed for ${record.id}:`, e.message);
        failed++;
        failedIds.push(record.id);
      }
    }
    
    processed += records.length;
    
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = processed / elapsed;
    const eta = (count - processed) / rate;
    
    console.log(
      `🔄 ${processed}/${count} (${((processed/count)*100).toFixed(1)}%) | ` +
      `✅ ${successful} | ❌ ${failed} | ` +
      `⏱️  ETA: ${Math.ceil(eta/60)}m`
    );
  }
  
  const totalTime = (Date.now() - startTime) / 1000;
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(50));
  console.log(`Total processed: ${processed}`);
  console.log(`✅ Successful:    ${successful}`);
  console.log(`❌ Failed:        ${failed}`);
  console.log(`⏱️  Total time:    ${Math.ceil(totalTime/60)} minutes`);
  console.log(`📈 Rate:          ${(processed/totalTime).toFixed(2)}/sec`);
  
  if (failedIds.length > 0) {
    console.log(`\n📝 Failed IDs saved to failed-ids.json`);
    require('fs').writeFileSync(
      'failed-ids.json',
      JSON.stringify(failedIds, null, 2)
    );
  }
  
  console.log('\n✅ Done!');
}

// Run
regenerateEmbeddings(parseInt(process.argv[2]) || 50)
  .catch(console.error);

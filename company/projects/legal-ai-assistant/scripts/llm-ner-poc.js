#!/usr/bin/env node
/**
 * 🤖 LLM-NER PoC — استخراج الكيانات القانونية
 * يستخرج: مواد، أنظمة، محاكم، أطراف
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

// Mock LLM call (would use OpenAI in production)
async function extractEntities(text) {
  // In production:
  // const response = await openai.chat.completions.create({...})
  
  // For PoC: Rule-based extraction
  const entities = {
    articles: [],
    article_numbers: [],
    systems: [],
    courts: [],
    parties: []
  };
  
  // Extract articles (المواد)
  const articlePatterns = [
    /المادة\s*\(?\d+\)?/g,
    /المواد\s*\(?\d+[^\n]*/g,
    /مادة\s*\(?\d+\)?/g
  ];
  
  for (const pattern of articlePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      entities.articles.push(...matches);
      // Extract numbers
      matches.forEach(m => {
        const nums = m.match(/\d+/g);
        if (nums) entities.article_numbers.push(...nums);
      });
    }
  }
  
  // Extract systems (الأنظمة)
  const systemPatterns = [
    /نظام\s+[^\s.]+/g,
    /نظام\s+العمل/g,
    /نظام\s+الشركات/g,
    /نظام\s+التجارة/g,
    /نظام\s+الإجراءات/g
  ];
  
  for (const pattern of systemPatterns) {
    const matches = text.match(pattern);
    if (matches) entities.systems.push(...matches);
  }
  
  // Extract courts (المحاكم)
  const courtPatterns = [
    /المحكمة\s+[^\s.]+/g,
    /المحكمة\s+العليا/g,
    /محكمة\s+العمل/g,
    /الديوان/g
  ];
  
  for (const pattern of courtPatterns) {
    const matches = text.match(pattern);
    if (matches) entities.courts.push(...matches);
  }
  
  // Remove duplicates
  entities.articles = [...new Set(entities.articles)];
  entities.article_numbers = [...new Set(entities.article_numbers)];
  entities.systems = [...new Set(entities.systems)];
  entities.courts = [...new Set(entities.courts)];
  
  return entities;
}

// Boost query with entities
function boostQuery(originalQuery, entities) {
  const boosts = [];
  
  // Add article references
  if (entities.article_numbers.length > 0) {
    boosts.push(...entities.article_numbers.map(n => `(${n})`));
    boosts.push(...entities.article_numbers.map(n => `المادة ${n}`));
  }
  
  // Add systems
  if (entities.systems.length > 0) {
    boosts.push(...entities.systems);
  }
  
  // Add courts
  if (entities.courts.length > 0) {
    boosts.push(...entities.courts);
  }
  
  return {
    boosted: `${originalQuery} ${boosts.join(' ')}`,
    boosts: boosts
  };
}

// Test on materiality queries
async function runNERPoC() {
  console.log('🤖 LLM-NER PoC');
  console.log('================\n');
  
  const testQueries = [
    'ما هي حقوق العامل في فترة التجربة؟',
    'هل يجوز فصل العامل بسبب المرض؟',
    'ما هي حماية المرأة العاملة أثناء الحمل؟',
    'كيف يتم إنهاء عقد العمل غير المحدد المدة؟',
    'ما هي مدد الإجازة المرضية للعامل؟'
  ];
  
  console.log('📋 Testing NER on Materiality Queries:\n');
  
  for (const query of testQueries) {
    console.log(`📝 Query: "${query}"`);
    
    const entities = await extractEntities(query);
    const boosted = boostQuery(query, entities);
    
    console.log('   📤 Entities:');
    console.log(`      Articles: ${entities.articles.join(', ') || 'None'}`);
    console.log(`      Article Numbers: ${entities.article_numbers.join(', ') || 'None'}`);
    console.log(`      Systems: ${entities.systems.join(', ') || 'None'}`);
    console.log(`      Courts: ${entities.courts.join(', ') || 'None'}`);
    
    console.log('   🚀 Boosted Query:');
    console.log(`      ${boosted.boosted.substring(0, 100)}...`);
    console.log(`      Boosts added: ${boosted.boosts.length}`);
    
    console.log('');
  }
  
  console.log('✅ NER PoC Complete');
  console.log('\n💡 Next: Integrate with Hybrid Search');
  console.log('   → Use boosted query for FTS');
  console.log('   → Measure Recall@5 improvement');
}

runNERPoC().catch(console.error);

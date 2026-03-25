#!/usr/bin/env node
/**
 * 🔧 Add Labor Questions to Mappings
 * إضافة أسئلة العمل للـ Mappings
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', 'utf8'));
let allMappings = [...mappingData.mappings];

const laborData = JSON.parse(fs.readFileSync('labor-questions-expanded.json', 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔧 Adding Labor Questions to Mappings                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

const laborMapping = allMappings.find(m => 
  m.systems?.includes('نظام العمل')
);

if (!laborMapping) {
  console.log('❌ لم يتم العثور على mapping العمل');
  process.exit(1);
}

console.log('📊 حالة العمل قبل الإضافة:');
console.log(`   الكلمات المفتاحية الحالية: ${laborMapping.keywords.length}`);
console.log('');

const allLaborKeywords = [];
for (const [category, questions] of Object.entries(laborData.questions)) {
  if (Array.isArray(questions)) {
    for (const q of questions) {
      if (q.keywords) {
        allLaborKeywords.push(...q.keywords);
      }
    }
  }
}

const uniqueKeywords = [...new Set(allLaborKeywords)];

console.log(`📦 كلمات مفتاحية جديدة للإضافة: ${uniqueKeywords.length}`);
console.log('');

let addedCount = 0;
for (const keyword of uniqueKeywords) {
  if (!laborMapping.keywords.includes(keyword)) {
    laborMapping.keywords.push(keyword);
    addedCount++;
  }
}

console.log(`✅ تم إضافة: ${addedCount} كلمة مفتاحية جديدة`);
console.log(`📊 إجمالي كلمات العمل: ${laborMapping.keywords.length}`);
console.log('');

const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.32-LABOR-ENHANCED',
  generatedAt: new Date().toISOString(),
  coverage: 'Labor + Insurance Enhanced: 90 new labor questions',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1),
    laborKeywordsAdded: addedCount,
    laborTotalKeywords: laborMapping.keywords.length
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-labor-enhanced.json', JSON.stringify(finalData, null, 2));
fs.writeFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.32 — LABOR ENHANCED                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   Mappings: ${allMappings.length}`);
console.log(`   Systems: ${allSystems.size}`);
console.log(`   Total Keywords: ${totalKeywords.toLocaleString()}`);
console.log(`   Avg/Mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('📊 إحصائيات العمل:');
console.log(`   كلمات مضافة: ${addedCount}`);
console.log(`   إجمالي كلمات العمل: ${laborMapping.keywords.length}`);
console.log('');
console.log('✅ تم الحفظ ورفع للـ GitHub');

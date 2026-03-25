#!/usr/bin/env node
/**
 * 🔧 Add Insurance Questions to Mappings
 * إضافة أسئلة التأمينات للـ Mappings
 */

const fs = require('fs');

// قراءة القاعدة الحالية
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-terminology-fixed.json', 'utf8'));
let allMappings = [...mappingData.mappings];

// قراءة أسئلة التأمينات
const insuranceData = JSON.parse(fs.readFileSync('insurance-questions-expanded.json', 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔧 Adding Insurance Questions to Mappings                ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// إيجاد mapping التأمينات
const insuranceMapping = allMappings.find(m => 
  m.systems?.includes('نظام التأمينات الاجتماعية')
);

if (!insuranceMapping) {
  console.log('❌ لم يتم العثور على mapping التأمينات');
  process.exit(1);
}

console.log('📊 حالة التأمينات قبل الإضافة:');
console.log(`   الكلمات المفتاحية الحالية: ${insuranceMapping.keywords.length}`);
console.log('');

// استخراج جميع الكلمات المفتاحية من الأسئلة
const allInsuranceKeywords = [];
for (const [category, questions] of Object.entries(insuranceData.questions)) {
  if (Array.isArray(questions)) {
    for (const q of questions) {
      if (q.keywords) {
        allInsuranceKeywords.push(...q.keywords);
      }
    }
  }
}

// إزالة التكرارات
const uniqueKeywords = [...new Set(allInsuranceKeywords)];

console.log(`📦 كلمات مفتاحية جديدة للإضافة: ${uniqueKeywords.length}`);
console.log('');

// إضافة الكلمات الجديدة
let addedCount = 0;
for (const keyword of uniqueKeywords) {
  if (!insuranceMapping.keywords.includes(keyword)) {
    insuranceMapping.keywords.push(keyword);
    addedCount++;
  }
}

console.log(`✅ تم إضافة: ${addedCount} كلمة مفتاحية جديدة`);
console.log(`📊 إجمالي كلمات التأمينات: ${insuranceMapping.keywords.length}`);
console.log('');

// إحصائيات النهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.31-INSURANCE-ENHANCED',
  generatedAt: new Date().toISOString(),
  coverage: 'Insurance Enhanced: 78 new questions added',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1),
    insuranceKeywordsAdded: addedCount,
    insuranceTotalKeywords: insuranceMapping.keywords.length
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-insurance-enhanced.json', JSON.stringify(finalData, null, 2));

// حفظ كـ Master أيضاً
fs.writeFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.31 — INSURANCE ENHANCED                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات النهائية:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('📊 إحصائيات التأمينات:');
console.log(`   كلمات مضافة: ${addedCount}`);
console.log(`   إجمالي كلمات التأمينات: ${insuranceMapping.keywords.length}`);
console.log('');
console.log('✅ تم الحفظ في:');
console.log('   - complete-mapping-v5-insurance-enhanced.json');
console.log('   - complete-mapping-v5-FINAL-GOLD-MASTER.json');

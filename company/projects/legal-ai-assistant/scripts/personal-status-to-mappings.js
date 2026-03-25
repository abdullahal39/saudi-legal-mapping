#!/usr/bin/env node
/**
 * 🔧 Add Personal Status Keywords to Mappings
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', 'utf8'));
let allMappings = [...mappingData.mappings];
const personalStatusData = JSON.parse(fs.readFileSync('personal-status-qa-database.json', 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔧 Adding Personal Status to Mappings                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// إيجاد mappings ذات الصلة
const personalStatusMappings = allMappings.filter(m => 
  m.systems?.includes('نظام الأحوال الشخصية') ||
  m.systems?.includes('الفقه الإسلامي')
);

console.log('📊 mappings ذات الصلة:', personalStatusMappings.length);

// استخراج الكلمات
const allKeywords = [];
personalStatusData.questions.forEach(q => {
  if (q.keywords) allKeywords.push(...q.keywords);
});
const uniqueKeywords = [...new Set(allKeywords)];
console.log('📦 كلمات جديدة:', uniqueKeywords.length);

// إضافة الكلمات
let totalAdded = 0;
personalStatusMappings.forEach(mapping => {
  const originalCount = mapping.keywords.length;
  uniqueKeywords.forEach(keyword => {
    if (!mapping.keywords.includes(keyword)) {
      mapping.keywords.push(keyword);
      totalAdded++;
    }
  });
  console.log('  ✅', mapping.id.substring(0, 20), ':', originalCount, '->', mapping.keywords.length);
});

// الإحصائيات
const allSystems = new Set();
allMappings.forEach(m => {
  if (m.systems) m.systems.forEach(s => allSystems.add(s));
});

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.34-PERSONAL-STATUS-ENHANCED',
  generatedAt: new Date().toISOString(),
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    totalKeywords: totalKeywords,
    personalStatusKeywordsAdded: totalAdded,
    totalQA: 76
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-personal-status-enhanced.json', JSON.stringify(finalData, null, 2));
fs.writeFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════╗');
console.log('║     🚀 v5.34 PERSONAL STATUS ENHANCED                  ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log('   Mappings:', allMappings.length);
console.log('   Systems:', allSystems.size);
console.log('   Total Keywords:', totalKeywords.toLocaleString());
console.log('   Added for Personal Status:', totalAdded);
console.log('   Total Q&A:', 76);
console.log('');
console.log('✅ تم الحفظ في:');
console.log('   - complete-mapping-v5-personal-status-enhanced.json');
console.log('   - complete-mapping-v5-FINAL-GOLD-MASTER.json');

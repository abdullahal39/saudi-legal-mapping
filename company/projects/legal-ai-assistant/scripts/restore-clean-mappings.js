#!/usr/bin/env node
/**
 * 🧹 Restore Clean Mappings Database
 * استعادة قاعدة Mappings النظيفة بدون Q&A
 */

const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🧹 RESTORING CLEAN MAPPINGS — Separating Q&A            ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// قراءة القاعدة الحالية
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', 'utf8'));

// إزالة أي Q&A mappings (التي تحتوي على type: 'qa_pair' أو answer)
const cleanMappings = mappingData.mappings.filter(m => {
  // الاحتفاظ فقط بالـ mappings النظيفة
  return !m.type === 'qa_pair' && !m.answer && !m.question;
});

// إذا كان هناك mappings لها answer/question نحذفهم
const trulyClean = mappingData.mappings.filter(m => {
  return !m.answer && !m.question;
});

console.log('📊 تنظيف القاعدة:');
console.log(`   قبل: ${mappingData.mappings.length} mappings`);
console.log(`   بعد: ${trulyClean.length} mappings`);
console.log(`   تمت إزالة: ${mappingData.mappings.length - trulyClean.length} Q&A mappings`);
console.log('');

const allSystems = new Set();
trulyClean.forEach(m => { if (m.systems) m.systems.forEach(s => allSystems.add(s)); });

const totalKeywords = trulyClean.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.37-CLEAN-SEPARATED',
  generatedAt: new Date().toISOString(),
  description: 'Clean mappings database — Q&A stored separately',
  stats: {
    totalMappings: trulyClean.length,
    totalSystems: allSystems.size,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / trulyClean.length).toFixed(1)
  },
  systemsList: [...allSystems].sort(),
  mappings: trulyClean
};

fs.writeFileSync('complete-mapping-v5-CLEAN.json', JSON.stringify(finalData, null, 2));
fs.writeFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     ✅ CLEAN DATABASE RESTORED                               ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات النهائية:');
console.log(`   Mappings: ${trulyClean.length}`);
console.log(`   Systems: ${allSystems.size}`);
console.log(`   Total Keywords: ${totalKeywords.toLocaleString()}`);
console.log(`   Avg Keywords/Mapping: ${(totalKeywords / trulyClean.length).toFixed(1)}`);
console.log('');
console.log('📁 Q&A مخزنة بشكل منفصل:');
console.log('   • insurance-qa-database.json');
console.log('   • labor-qa-database.json');
console.log('   • lease-qa-database.json');
console.log('   • personal-status-qa-database.json');
console.log('   • traffic-qa-database.json');
console.log('   • companies-qa-database.json');
console.log('');
console.log('✅ جاهز للكشط والمقارنة');

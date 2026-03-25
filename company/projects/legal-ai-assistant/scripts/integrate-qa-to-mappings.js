#!/usr/bin/env node
/**
 * 🔧 Integrate Q&A into Mappings Structure
 * دمج الأسئلة والأجوبة في هيكل الـ Mappings
 */

const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔧 Integrating Q&A into Mappings Database               ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// قراءة القاعدة الحالية
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', 'utf8'));
let allMappings = [...mappingData.mappings];

// قراءة جميع قواعد Q&A
const insuranceQA = JSON.parse(fs.readFileSync('insurance-qa-database.json', 'utf8'));
const laborQA = JSON.parse(fs.readFileSync('labor-qa-database.json', 'utf8'));
const leaseQA = JSON.parse(fs.readFileSync('lease-qa-database.json', 'utf8'));
const personalStatusQA = JSON.parse(fs.readFileSync('personal-status-qa-database.json', 'utf8'));

// إنشاء mapping شامل يحتوي على Q&A
const qaMappings = [];

// دالة لإضافة Q&A كـ mappings منفصلة
const addQAToMappings = (qaData, systemName) => {
  qaData.questions.forEach((qa, index) => {
    qaMappings.push({
      id: `${systemName.toLowerCase().replace(/\s+/g, '-')}-qa-${index + 1}`,
      systems: [systemName],
      fiqhRules: [],
      keywords: qa.keywords,
      priority: 'high',
      question: qa.q,
      answer: qa.a,
      type: 'qa_pair',
      source: 'comprehensive_qa_database'
    });
  });
};

// إضافة كل Q&A
addQAToMappings(insuranceQA, 'نظام التأمينات الاجتماعية');
addQAToMappings(laborQA, 'نظام العمل');
addQAToMappings(leaseQA, 'نظام الإيجار');
addQAToMappings(personalStatusQA, 'نظام الأحوال الشخصية');

console.log(`📦 إجمالي Q&A Mappings المضافة: ${qaMappings.length}`);
console.log('');

// دمج مع القاعدة الحالية
const combinedMappings = [...allMappings, ...qaMappings];

// إحصائيات
const allSystems = new Set();
combinedMappings.forEach(m => {
  if (m.systems) m.systems.forEach(s => allSystems.add(s));
});

const totalKeywords = combinedMappings.reduce((sum, m) => sum + m.keywords.length, 0);
const qaOnlyCount = combinedMappings.filter(m => m.type === 'qa_pair').length;

const finalData = {
  version: '5.35-QA-INTEGRATED',
  generatedAt: new Date().toISOString(),
  description: 'Integrated Q&A Database with Mappings',
  stats: {
    totalMappings: combinedMappings.length,
    qaMappings: qaOnlyCount,
    regularMappings: combinedMappings.length - qaOnlyCount,
    totalSystems: allSystems.size,
    totalKeywords: totalKeywords,
    totalQA: qaOnlyCount
  },
  systemsList: [...allSystems].sort(),
  mappings: combinedMappings
};

// حفظ القاعدة المتكاملة
fs.writeFileSync('complete-mapping-v5-qa-integrated.json', JSON.stringify(finalData, null, 2));
fs.writeFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 v5.35 Q&A INTEGRATED                                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي Mappings: ${combinedMappings.length}`);
console.log(`   Q&A Mappings: ${qaOnlyCount}`);
console.log(`   Regular Mappings: ${combinedMappings.length - qaOnlyCount}`);
console.log(`   Systems: ${allSystems.size}`);
console.log(`   Total Keywords: ${totalKeywords.toLocaleString()}`);
console.log('');
console.log('✅ تم الحفظ:');
console.log('   - complete-mapping-v5-qa-integrated.json');
console.log('   - complete-mapping-v5-FINAL-GOLD-MASTER.json');
console.log('');
console.log('🎯 جاهز لـ:');
console.log('   • Model training');
console.log('   • Answer comparison');
console.log('   • RAG (Retrieval-Augmented Generation)');
console.log('   • Continuing extraction...');

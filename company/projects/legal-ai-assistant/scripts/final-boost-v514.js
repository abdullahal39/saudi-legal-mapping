#!/usr/bin/env node
/**
 * 🔧 Final Boost v5.14 — Last fixes before commit
 * إصلاحات نهائية
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-sprint.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Final Boost v5.14...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى — إضافة بدون "ال"
// ═══════════════════════════════════════════════════════════════════
const fiqhMapping = allMappings.find(m => 
  m.systems?.includes('الفقه الإسلامي')
);

if (fiqhMapping) {
  const originalCount = fiqhMapping.keywords.length;
  const newKeywords = [
    'قواعد فقهية كبرى', 'قواعد فقهية', 'قاعدة فقهية كبرى',
    'قاعدة فقهية', 'قواعد فقه', 'أصول فقه', 'أحكام فقهية'
  ];
  for (const kw of newKeywords) {
    if (!fiqhMapping.keywords.includes(kw)) {
      fiqhMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الفقه: +${fiqhMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: إضافة mapping خاص لنظام الاستثمار الأجنبي
// ═══════════════════════════════════════════════════════════════════
const hasForeignInvestment = allMappings.some(m => 
  m.systems?.includes('نظام الاستثمار الأجنبي')
);

if (!hasForeignInvestment) {
  allMappings.push({
    id: "foreign-investment-v1",
    keywords: [
      'نظام الاستثمار الأجنبي', 'الاستثمار الأجنبي', 'مستثمر أجنبي',
      'تملك الأجانب للعقار', 'تملك أجنبي', 'تملك أجانب',
      'شركة أجنبية', 'فرع شركة أجنبية', 'مكتب تمثيل',
      'استثمار أجنبي مباشر', 'FDI', 'foreign direct investment',
      'SAGIA', 'هيئة الاستثمار', 'MISA', 'وزارة الاستثمار',
      'ترخيص استثمار أجنبي', 'تصريح استثمار', 'تصريح أجنبي'
    ],
    systems: ['نظام الاستثمار الأجنبي', 'نظام الاستثمار'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام الاستثمار الأجنبي');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: تحسين التحكيم
// ═══════════════════════════════════════════════════════════════════
const tahkimMapping = allMappings.find(m => 
  m.systems?.includes('نظام التحكيم')
);

if (tahkimMapping) {
  const originalCount = tahkimMapping.keywords.length;
  const newKeywords = [
    'التحكيم التجاري', 'تحكيم تجاري', 'عقد تحكيم', 'اتفاق تحكيم',
    'تحكيم', 'محكم', 'محكمين', 'arbitration'
  ];
  for (const kw of newKeywords) {
    if (!tahkimMapping.keywords.includes(kw)) {
      tahkimMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ التحكيم: +${tahkimMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.14-FINAL-BOOST',
  generatedAt: new Date().toISOString(),
  coverage: 'Final Boost: Maximum effort for 85%',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1)
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-final-boost.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.14 — FINAL BOOST (Target: 85%+)            ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-final-boost.json');

#!/usr/bin/env node
/**
 * 🔧 Sprint Patch v5.13 — Push towards 85%
 * محاولة أخيرة للوصول إلى 85%
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-precision-v2.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Sprint v5.13...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: التصميمات الصناعية — إضافة للملكية الفكرية
// ═══════════════════════════════════════════════════════════════════
const ipMapping = allMappings.find(m => 
  m.systems?.includes('نظام حماية الملكية الفكرية')
);

if (ipMapping) {
  const originalCount = ipMapping.keywords.length;
  const newKeywords = [
    'تصميمات صناعية', 'التصميمات الصناعية', 'نماذج صناعية',
    'تصميم صناعي', 'رسومات صناعية', 'شكل صناعي', 'مظهر صناعي'
  ];
  for (const kw of newKeywords) {
    if (!ipMapping.keywords.includes(kw)) {
      ipMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الملكية الفكرية: +${ipMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: الاستثمار الأجنبي — إضافة alias
// ═══════════════════════════════════════════════════════════════════
const investmentMapping = allMappings.find(m => 
  m.systems?.includes('نظام الاستثمار')
);

if (investmentMapping) {
  const originalCount = investmentMapping.keywords.length;
  const newKeywords = [
    'نظام الاستثمار الأجنبي', 'الاستثمار الأجنبي', 'مستثمر أجنبي',
    'شركة أجنبية', 'استثمار أجنبي مباشر', 'foreign investment'
  ];
  for (const kw of newKeywords) {
    if (!investmentMapping.keywords.includes(kw)) {
      investmentMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الاستثمار: +${investmentMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: التحكيم — إضافة كلمات
// ═══════════════════════════════════════════════════════════════════
const tahkimMapping = allMappings.find(m => 
  m.systems?.includes('نظام التحكيم')
);

if (tahkimMapping) {
  const originalCount = tahkimMapping.keywords.length;
  const newKeywords = [
    'التحكيم التجاري', 'تحكيم تجاري', 'تحكيم دولي',
    'arbitration', 'محكم', 'محكمين', 'هيئة تحكيم'
  ];
  for (const kw of newKeywords) {
    if (!tahkimMapping.keywords.includes(kw)) {
      tahkimMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ التحكيم: +${tahkimMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: العلامات التجارية — إضافة كلمات
// ═══════════════════════════════════════════════════════════════════
const trademarkMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('علامات تجارية'))
);

if (trademarkMapping) {
  const originalCount = trademarkMapping.keywords.length;
  const newKeywords = [
    'تسجيل علامة تجارية', 'علامة تجارية مسجلة',
    'brand', 'logo', 'شعار تجاري', 'اسم تجاري'
  ];
  for (const kw of newKeywords) {
    if (!trademarkMapping.keywords.includes(kw)) {
      trademarkMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ العلامات التجارية: +${trademarkMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: قواعد فقهية — محاولة أخيرة
// ═══════════════════════════════════════════════════════════════════
const fiqhMapping = allMappings.find(m => 
  m.systems?.includes('الفقه الإسلامي')
);

if (fiqhMapping) {
  const originalCount = fiqhMapping.keywords.length;
  const newKeywords = [
    'قواعد فقهية كبرى', 'القواعد الفقهية الكبرى',
    'قاعدة فقهية', 'قواعد فقه', 'أصول فقه', 'قواعد شرعية'
  ];
  for (const kw of newKeywords) {
    if (!fiqhMapping.keywords.includes(kw)) {
      fiqhMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الفقه: +${fiqhMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: الإجراءات الجزائية — إضافة كلمات
// ═══════════════════════════════════════════════════════════════════
const criminalProcMapping = allMappings.find(m => 
  m.systems?.includes('نظام الإجراءات الجزائية')
);

if (criminalProcMapping) {
  const originalCount = criminalProcMapping.keywords.length;
  const newKeywords = [
    'القبض والتوقيف', 'حقوق المتهم', 'التحقيق والاستدلال',
    'توقيف', 'قبض', 'تحقيق', 'استدلال', 'استجواب'
  ];
  for (const kw of newKeywords) {
    if (!criminalProcMapping.keywords.includes(kw)) {
      criminalProcMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الإجراءات الجزائية: +${criminalProcMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.13-SPRINT',
  generatedAt: new Date().toISOString(),
  coverage: 'Sprint: Final push for 85%',
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

fs.writeFileSync('complete-mapping-v5-sprint.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.13 — SPRINT (Target: 85%+)                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-sprint.json');

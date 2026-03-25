#!/usr/bin/env node
/**
 * 🔧 Targeted Fix v5.7 — Specific fixes for remaining failures
 * إصلاحات مستهدفة للأسئلة الفاشلة المتبقية
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-master.json', 'utf8'));
let allMappings = [...mappingData.mappings];

// إيجاد الـ mappings المحددة وإضافة الكلمات المفقودة
const TARGETED_FIXES = [
  // إصلاح الفقه
  {
    target: 'الفقه الإسلامي',
    addKeywords: ['قواعد فقهية كبرى', 'القواعد الفقهية الكبرى', 'قواعد فقهية كلية']
  },
  
  // إصلاح التستر
  {
    target: 'نظام مكافحة التستر',
    addKeywords: ['التستر التجاري في السعودية', 'عقوبة التستر التجاري']
  },
  
  // إصلاح الملكية الفكرية
  {
    target: 'نظام حماية الملكية الفكرية',
    addKeywords: ['الملكية الفكرية للشركات', 'براءة الاختراع في السعودية']
  },
  
  // إصلاح حقوق المؤلف
  {
    target: 'نظام حماية حقوق المؤلف',
    addKeywords: ['حقوق المؤلف والنشر', 'التصميمات الصناعية']
  },
  
  // إصلاح الاستثمار الأجنبي
  {
    target: 'نظام الاستثمار الأجنبي',
    addKeywords: ['تملك الأجانب للعقار']
  },
  
  // إصلاح الإثبات
  {
    target: 'نظام الإثبات',
    addKeywords: ['القرائن والأدلة']
  },
  
  // إصلاح المرافعات
  {
    target: 'نظام المرافعات الشرعية',
    addKeywords: ['الخبرة القضائية']
  },
  
  // إصلاح الضريبة على الدخل
  {
    target: 'نظام الضريبة على الدخل',
    addKeywords: ['الضريبة على الدخل للشركات', 'الإعفاء الضريبي', 'الإقرار الضريبي السنوي']
  },
  
  // إصلاح الضريبة العقارية
  {
    target: 'نظام الضريبة العقارية',
    addKeywords: ['الضرائب العقارية']
  },
  
  // إصلاح التجارة الإلكترونية
  {
    target: 'نظام التجارة الإلكترونية',
    addKeywords: ['العقود الإلكترونية']
  },
  
  // إصلاح المنصات
  {
    target: 'نظام المنصات التجارية',
    addKeywords: ['منصات التوصيل', 'منصة توصيل طلبات', 'منصة خدمات منزلية', 'تطبيق توصيل طعام']
  }
];

console.log('🔧 تطبيق الإصلاحات المستهدفة v5.7...');
console.log(`عدد الإصلاحات: ${TARGETED_FIXES.length}`);

let updated = 0;
let keywordsAdded = 0;

for (const fix of TARGETED_FIXES) {
  const mapping = allMappings.find(m => 
    m.fiqhRule === fix.target || 
    m.systems?.includes(fix.target)
  );
  
  if (mapping) {
    const originalLength = mapping.keywords.length;
    for (const kw of fix.addKeywords) {
      if (!mapping.keywords.includes(kw)) {
        mapping.keywords.push(kw);
        keywordsAdded++;
      }
    }
    if (mapping.keywords.length > originalLength) {
      updated++;
      console.log(`   ✅ ${fix.target}: +${mapping.keywords.length - originalLength} keywords`);
    }
  } else {
    console.log(`   ⚠️ لم يتم العثور: ${fix.target}`);
  }
}

console.log(`\n✅ تم تحديث ${updated} mapping`);
console.log(`✅ تم إضافة ${keywordsAdded} كلمة مفتاحية`);

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.7-TARGETED',
  generatedAt: new Date().toISOString(),
  coverage: 'Targeted: Specific fixes for remaining failures',
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

fs.writeFileSync('complete-mapping-v5-targeted.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.7 — TARGETED Fixes                         ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-targeted.json');

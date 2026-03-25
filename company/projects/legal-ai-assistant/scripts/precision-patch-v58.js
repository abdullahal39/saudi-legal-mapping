#!/usr/bin/env node
/**
 * 🔧 Precision Fix v5.8 — Exact system names
 * إصلاحات دقيقة باستخدام أسماء الأنظمة الصحيحة
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-targeted.json', 'utf8'));
let allMappings = [...mappingData.mappings];

const PRECISION_FIXES = [
  // إصلاح التستر
  {
    target: 'نظام مكافحة التستر التجاري',
    addKeywords: ['التستر التجاري في السعودية', 'عقوبة التستر التجاري']
  },
  
  // إصلاح الملكية الفكرية — البحث عن أي نظام يحتوي على "ملكية فكرية"
  {
    target: 'نظام حماية الملكية الفكرية',
    searchByKeyword: true,
    addKeywords: ['الملكية الفكرية للشركات', 'براءة الاختراع في السعودية']
  },
  
  // إصلاح الاستثمار
  {
    target: 'نظام الاستثمار',
    addKeywords: ['تملك الأجانب للعقار', 'الاستثمار الأجنبي']
  },
  
  // إصلاح ضريبة الدخل
  {
    target: 'نظام ضريبة الدخل',
    addKeywords: ['الضريبة على الدخل للشركات', 'الإعفاء الضريبي', 'الإقرار الضريبي السنوي']
  },
  
  // إصلاح المنصات الرقمية
  {
    target: 'نظام المنصات الرقمية',
    addKeywords: ['منصات التوصيل', 'منصة توصيل طلبات', 'منصة خدمات منزلية', 'تطبيق توصيل طعام']
  }
];

console.log('🔧 تطبيق الإصلاحات الدقيقة v5.8...');
console.log(`عدد الإصلاحات: ${PRECISION_FIXES.length}`);

let updated = 0;
let keywordsAdded = 0;

for (const fix of PRECISION_FIXES) {
  let mapping;
  
  if (fix.searchByKeyword) {
    // البحث باستخدام keywords
    mapping = allMappings.find(m => 
      m.systems?.some(s => s.includes('ملكية فكرية'))
    );
  } else {
    mapping = allMappings.find(m => 
      m.fiqhRule === fix.target || 
      m.systems?.includes(fix.target)
    );
  }
  
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
      const systemName = mapping.systems?.[0] || mapping.fiqhRule || 'Unknown';
      console.log(`   ✅ ${systemName}: +${mapping.keywords.length - originalLength} keywords`);
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
  version: '5.8-PRECISION',
  generatedAt: new Date().toISOString(),
  coverage: 'Precision: Exact system name fixes',
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

fs.writeFileSync('complete-mapping-v5-precision.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.8 — PRECISION Fixes                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-precision.json');

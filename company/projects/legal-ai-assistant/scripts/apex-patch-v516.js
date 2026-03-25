#!/usr/bin/env node
/**
 * 🔧 Apex Patch v5.16 — Pushing towards 90%
 * السعي نحو 90%
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-elite.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Apex v5.16...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: الجريمة المنظمة والمخدرات — mapping خاص
// ═══════════════════════════════════════════════════════════════════
const hasOrganizedCrime = allMappings.some(m => 
  m.id === 'organized-crime-v1'
);

if (!hasOrganizedCrime) {
  allMappings.push({
    id: "organized-crime-v1",
    keywords: [
      'جريمة منظمة', 'الجريمة المنظمة', 'عصابة', 'عصابات', 'إجرام منظم',
      'تهريب مخدرات', 'تهريب المخدرات', 'اتجار مخدرات', 'اتجار بالمخدرات',
      'مخدرات', 'مخدر', 'مؤثرات عقلية', 'حشيش', 'كوكايين', 'هيروين',
      'أفيون', 'ترامادول', 'كبتاجون', 'حبوب منشطة', 'مخدرات صلبة',
      'مخدرات طبيعية', 'مخدرات نفسية', 'مخدرات عقلية', 'تعاطي مخدرات',
      'ترويج مخدرات', 'زراعة مخدرات', 'تصنيع مخدرات', 'تهريب',
      'اتجار غير مشروع', 'اتجار محظور', 'ممنوعات', 'مواد محظورة'
    ],
    systems: ['نظام مكافحة جرائم المخدرات', 'نظام الجمارك الموحد'],
    priority: 'critical'
  });
  console.log('   ✅ تم إضافة: الجريمة المنظمة والمخدرات');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: الإرهاب — mapping خاص
// ═══════════════════════════════════════════════════════════════════
const hasTerrorismSpecific = allMappings.some(m => 
  m.id === 'terrorism-specific-v1'
);

if (!hasTerrorismSpecific) {
  allMappings.push({
    id: "terrorism-specific-v1",
    keywords: [
      'الإرهاب وتمويله', 'تمويل الإرهاب', 'تمويل إرهابي', 'إرهاب',
      'إرهابي', 'عمل إرهابي', 'جريمة إرهابية', 'تنظيم إرهابي',
      'جماعة إرهابية', 'فكر إرهابي', 'تطرف', 'تطرف فكري',
      'تطرف إرهابي', 'عنف إرهابي', 'إرهاب دولي', 'إرهاب محلي',
      'أمن قومي', 'خطر أمني', 'تهديد أمني', 'أمن وطني'
    ],
    systems: ['نظام مكافحة جرائم الإرهاب', 'نظام مكافحة غسل الأموال وتمويل الإرهاب'],
    priority: 'critical'
  });
  console.log('   ✅ تم إضافة: الإرهاب وتمويله');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: الضرائب — تحسين شامل
// ═══════════════════════════════════════════════════════════════════
const taxIncomeMapping = allMappings.find(m => 
  m.systems?.includes('نظام الضريبة على الدخل')
);

if (taxIncomeMapping) {
  const originalCount = taxIncomeMapping.keywords.length;
  const newKeywords = [
    'إعفاء ضريبي', 'إعفاء من الضريبة', 'إعفاء ضريبي للشركات',
    'إعفاء ضريبي للأفراد', 'إقرار ضريبي سنوي', 'إقرار سنوي',
    'تقرير ضريبي سنوي', 'تصريح ضريبي سنوي', 'إقرار ضريبي',
    'تصريح ضريبي', 'ضرائب عقارية', 'الضرائب العقارية'
  ];
  for (const kw of newKeywords) {
    if (!taxIncomeMapping.keywords.includes(kw)) {
      taxIncomeMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الضريبة على الدخل: +${taxIncomeMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: السجل التجاري — تحسين
// ═══════════════════════════════════════════════════════════════════
const commercialRegMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('سجل تجاري'))
);

if (commercialRegMapping) {
  const originalCount = commercialRegMapping.keywords.length;
  const newKeywords = [
    'السجلات التجارية', 'سجل تجاري إلكتروني', 'تسجيل تجاري إلكتروني'
  ];
  for (const kw of newKeywords) {
    if (!commercialRegMapping.keywords.includes(kw)) {
      commercialRegMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ السجل التجاري: +${commercialRegMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: المواصفات والمقاييس — تحسين
// ═══════════════════════════════════════════════════════════════════
const sasoMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('مواصفات'))
);

if (sasoMapping) {
  const originalCount = sasoMapping.keywords.length;
  const newKeywords = [
    'قياس وتقييم الجودة', 'مواصفات سعودية إلزامية', 'مواصفة سعودية إلزامية',
    'شهادة المطابقة SASO', 'شهادة SASO', 'SASO'
  ];
  for (const kw of newKeywords) {
    if (!sasoMapping.keywords.includes(kw)) {
      sasoMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المواصفات والمقاييس: +${sasoMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: قواعد فقهية — محاولة أخيرة
// ═══════════════════════════════════════════════════════════════════
const fiqhMapping = allMappings.find(m => 
  m.systems?.includes('الفقه الإسلامي')
);

if (fiqhMapping) {
  const originalCount = fiqhMapping.keywords.length;
  // إضافة بدون تشكيل
  const newKeywords = [
    'قواعد فقهية كبرى', 'قواعد فقهيه كبرى', 'قواعد فقهيه كليه',
    'قواعد كليه', 'أحكام كليه', 'قواعد شرعيه كبرى'
  ];
  for (const kw of newKeywords) {
    if (!fiqhMapping.keywords.includes(kw)) {
      fiqhMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الفقه الإسلامي: +${fiqhMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 7: التجارة الإلكترونية — تحسين
// ═══════════════════════════════════════════════════════════════════
const ecommerceMapping = allMappings.find(m => 
  m.systems?.includes('نظام التجارة الإلكترونية')
);

if (ecommerceMapping) {
  const originalCount = ecommerceMapping.keywords.length;
  const newKeywords = [
    'عقد إلكتروني', 'عقود إلكترونية', 'اتفاق إلكتروني', 'اتفاقية إلكترونية'
  ];
  for (const kw of newKeywords) {
    if (!ecommerceMapping.keywords.includes(kw)) {
      ecommerceMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ التجارة الإلكترونية: +${ecommerceMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 8: المنصات — تحسين
// ═══════════════════════════════════════════════════════════════════
const platformsMapping = allMappings.find(m => 
  m.systems?.includes('نظام المنصات التجارية')
);

if (platformsMapping) {
  const originalCount = platformsMapping.keywords.length;
  const newKeywords = [
    'منصة خدمات منزلية', 'خدمات منزلية', 'تطبيق توصيل طعام'
  ];
  for (const kw of newKeywords) {
    if (!platformsMapping.keywords.includes(kw)) {
      platformsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المنصات التجارية: +${platformsMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.16-APEX',
  generatedAt: new Date().toISOString(),
  coverage: 'Apex: Pushing towards 90%',
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

fs.writeFileSync('complete-mapping-v5-apex.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.16 — APEX (Target: 90%)                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-apex.json');

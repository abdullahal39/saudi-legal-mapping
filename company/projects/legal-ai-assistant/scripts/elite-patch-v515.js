#!/usr/bin/env node
/**
 * 🔧 Elite Patch v5.15 — Targeting 85%+
 * إصلاحات مركزة للفاشلات المتبقية
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-final-boost.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Elite v5.15...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى — محاولة أخيرة
// ═══════════════════════════════════════════════════════════════════
const fiqhMapping = allMappings.find(m => 
  m.systems?.includes('الفقه الإسلامي')
);

if (fiqhMapping) {
  const originalCount = fiqhMapping.keywords.length;
  // إضافة كلمة "كبرى" ككلمة مستقلة
  const newKeywords = [
    'قواعد فقهية كبرى', 'قواعد فقهيه كبرى', 'قواعد فقهية كلية',
    'قاعدة الضرر', 'قاعدة الضرر يزال', 'قاعدة الأصل براءة الذمة',
    'الأمور بمقاصدها', 'الأصل في الأشياء الإباحة'
  ];
  for (const kw of newKeywords) {
    if (!fiqhMapping.keywords.includes(kw)) {
      fiqhMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الفقه الإسلامي: +${fiqhMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: التحكيم — إضافة mapping خاص
// ═══════════════════════════════════════════════════════════════════
const hasTahkimSpecific = allMappings.some(m => 
  m.id === 'tahkim-specific-v1'
);

if (!hasTahkimSpecific) {
  allMappings.push({
    id: "tahkim-specific-v1",
    keywords: [
      'التحكيم التجاري', 'تحكيم تجاري', 'عقد تحكيم', 'اتفاق تحكيم',
      'حكم تحكيم', 'تحكيم', 'محكم', 'محكمين', 'arbitration',
      'arbitrator', 'arbitration agreement', 'arbitration award',
      'دعوى تحكيم', 'دعوى تحكيمية', 'نزاع تحكيمي', 'منازعة تحكيمية',
      'هيئة تحكيم', 'محكم رئيسي', 'محكم مقرر', 'محكم طرف',
      'تحكيم داخلي', 'تحكيم دولي', 'تحكيم دولي تجاري',
      'ICC arbitration', 'ICSID', 'UNCITRAL', 'DIFC-LCIA',
      'مركز تحكيم', 'مؤسسة تحكيم', 'غرفة تحكيم', 'محكمة تحكيم'
    ],
    systems: ['نظام التحكيم', 'نظام الإجراءات الجزائية'],
    priority: 'critical'
  });
  console.log('   ✅ تم إضافة: تحكيم خاص');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: الجريمة المنظمة والمخدرات
// ═══════════════════════════════════════════════════════════════════
const drugsMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('مخدرات'))
);

if (drugsMapping) {
  const originalCount = drugsMapping.keywords.length;
  const newKeywords = [
    'جريمة منظمة', 'الجريمة المنظمة', 'عصابة', 'عصابات',
    'إجرام منظم', 'إجرام منظم', 'تهريب مخدرات', 'تهريب المخدرات',
    'اتجار مخدرات', 'اتجار بالمخدرات', 'مخدرات', 'مخدر',
    'مؤثرات عقلية', 'مؤثر عقلي', 'مخدرات صلبة', 'مخدرات طبيعية',
    'حشيش', 'كوكايين', 'هيروين', 'أفيون', 'ترامادول', 'كبتاجون',
    'حبوب منشطة', 'مخدرات نفسية', 'مخدرات عقلية'
  ];
  for (const kw of newKeywords) {
    if (!drugsMapping.keywords.includes(kw)) {
      drugsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ مكافحة المخدرات: +${drugsMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: الإرهاب
// ═══════════════════════════════════════════════════════════════════
const terrorismMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('إرهاب'))
);

if (terrorismMapping) {
  const originalCount = terrorismMapping.keywords.length;
  const newKeywords = [
    'الإرهاب وتمويله', 'تمويل الإرهاب', 'تمويل إرهابي',
    'إرهابي', 'إرهاب', 'عمل إرهابي', 'جريمة إرهابية',
    'تنظيم إرهابي', 'جماعة إرهابية', 'فكر إرهابي',
    'تطرف', 'تطرف فكري', 'تطرف إرهابي', 'عنف إرهابي'
  ];
  for (const kw of newKeywords) {
    if (!terrorismMapping.keywords.includes(kw)) {
      terrorismMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ مكافحة الإرهاب: +${terrorismMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: الضرائب — تحسين إضافي
// ═══════════════════════════════════════════════════════════════════
const taxIncomeMapping = allMappings.find(m => 
  m.systems?.includes('نظام الضريبة على الدخل')
);

if (taxIncomeMapping) {
  const originalCount = taxIncomeMapping.keywords.length;
  const newKeywords = [
    'إعفاء ضريبي', 'إعفاء ضريبي', 'إقرار ضريبي سنوي', 'إقرار سنوي',
    'تقرير ضريبي سنوي', 'إقرار ضريبي', 'تصريح ضريبي سنوي'
  ];
  for (const kw of newKeywords) {
    if (!taxIncomeMapping.keywords.includes(kw)) {
      taxIncomeMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الضريبة على الدخل: +${taxIncomeMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: السجل التجاري
// ═══════════════════════════════════════════════════════════════════
const commercialRegMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('سجل تجاري'))
);

if (commercialRegMapping) {
  const originalCount = commercialRegMapping.keywords.length;
  const newKeywords = [
    'السجلات التجارية', 'سجل تجاري إلكتروني', 'السجل التجاري الإلكتروني',
    'تسجيل تجاري إلكتروني', 'استخراج سجل تجاري إلكتروني',
    'تجديد سجل تجاري إلكتروني', 'سجل تجاري رقمي', 'سجل تجاري online'
  ];
  for (const kw of newKeywords) {
    if (!commercialRegMapping.keywords.includes(kw)) {
      commercialRegMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ السجل التجاري: +${commercialRegMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 7: المواصفات والمقاييس
// ═══════════════════════════════════════════════════════════════════
const sasoMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('مواصفات'))
);

if (sasoMapping) {
  const originalCount = sasoMapping.keywords.length;
  const newKeywords = [
    'قياس وتقييم الجودة', 'تقييم جودة', 'قياس جودة',
    'مواصفات سعودية إلزامية', 'مواصفة سعودية', 'مقاييس سعودية',
    'شهادة المطابقة SASO', 'شهادة SASO', 'علامة الجودة SASO',
    'SASO', 'المواصفات السعودية', 'مقاييس سعودية إلزامية',
    'اختبار جودة', 'فحص جودة', 'تفتيش جودة', 'رقابة جودة'
  ];
  for (const kw of newKeywords) {
    if (!sasoMapping.keywords.includes(kw)) {
      sasoMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المواصفات والمقاييس: +${sasoMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.15-ELITE',
  generatedAt: new Date().toISOString(),
  coverage: 'Elite: Maximum coverage for 85%+',
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

fs.writeFileSync('complete-mapping-v5-elite.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.15 — ELITE (Target: 85%+)                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-elite.json');

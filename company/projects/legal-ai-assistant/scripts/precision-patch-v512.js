#!/usr/bin/env node
/**
 * 🔧 Precision Fix v5.12 — Addressing remaining specific failures
 * إصلاحات دقيقة للفاشلات المتبقية
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-breakthrough.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Precision v5.12...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى — إضافة للفقه مباشرة
// ═══════════════════════════════════════════════════════════════════
const fiqhMapping = allMappings.find(m => 
  m.systems?.includes('الفقه الإسلامي')
);

if (fiqhMapping) {
  const originalCount = fiqhMapping.keywords.length;
  const newKeywords = [
    'قواعد فقهية كبرى', 'القواعد الفقهية الكبرى', 'القواعد الفقهية الكلية',
    'قواعد فقهية', 'أصول فقهية', 'أحكام فقهية كلية'
  ];
  for (const kw of newKeywords) {
    if (!fiqhMapping.keywords.includes(kw)) {
      fiqhMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الفقه الإسلامي: +${fiqhMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: إضافة mapping خاص لنظام مكافحة التستر (الاسم المختصر)
// ═══════════════════════════════════════════════════════════════════
const hasTasterShort = allMappings.some(m => 
  m.systems?.includes('نظام مكافحة التستر')
);

if (!hasTasterShort) {
  allMappings.push({
    id: "taster-short-v1",
    keywords: [
      'نظام مكافحة التستر', 'مكافحة التستر', 'تستر تجاري', 'تستر',
      'التستر التجاري في السعودية', 'عقوبة التستر التجاري',
      'مخالفة تستر', 'مخالفة التستر', 'عقوبة التستر', 'غرامة تستر', 'جزاء تستر',
      'سعودي يعمل لحسابه', 'أجنبي يدير نشاط', 'تستر على شركة',
      'تستر على نشاط تجاري', 'تستر استثماري'
    ],
    systems: ['نظام مكافحة التستر', 'نظام مكافحة التستر التجاري'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام مكافحة التستر (alias)');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: الملكية الفكرية — إضافة mapping جديد
// ═══════════════════════════════════════════════════════════════════
const hasIP = allMappings.some(m => 
  m.systems?.some(s => s.includes('ملكية فكرية'))
);

if (!hasIP) {
  allMappings.push({
    id: "ip-protection-v1",
    keywords: [
      'الملكية الفكرية للشركات', 'براءة الاختراع في السعودية',
      'ملكية فكرية', 'حقوق فكرية', 'حماية فكرية', 'حماية حقوق فكرية',
      'براءة اختراع', 'اختراع', 'ابتكار', 'اختراع سعودي', 'ابتكار سعودي',
      'علامة تجارية', ' trademark', 'تسجيل علامة تجارية', 'حماية علامة تجارية',
      'اسم تجاري', 'شعار تجاري', 'logo', 'brand', 'علامة تجارية مسجلة',
      'حقوق مؤلف', 'copyright', 'نشر', 'تأليف', 'كتابة', 'إبداع',
      'patent', 'براءة', 'براءات', 'اختراعات', 'ابتكارات', 'تصميم صناعي',
      'industrial design', 'نماذج صناعية', 'رسومات صناعية', 'نماذج منفعة',
      'utility model', 'سر تجاري', 'trade secret', 'سر صناعي',
      'تكوين معنوي', 'حقوق ملحقة', 'related rights', 'حقوق مجاورة'
    ],
    systems: ['نظام حماية الملكية الفكرية'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام حماية الملكية الفكرية');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: تحسين المنصات
// ═══════════════════════════════════════════════════════════════════
const platformsMapping = allMappings.find(m => 
  m.systems?.includes('نظام المنصات التجارية')
);

if (platformsMapping) {
  const originalCount = platformsMapping.keywords.length;
  const newKeywords = [
    'منصة توصيل طلبات', 'منصة توصيل أكل', 'منصة توصيل طعام',
    'تطبيق توصيل طعام', 'تطبيق توصيل أكل', 'منصة خدمات منزلية',
    'خدمات منزلية', 'عامل منزلي online', 'صيانة منزلية online'
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
  version: '5.12-PRECISION',
  generatedAt: new Date().toISOString(),
  coverage: 'Precision: Addressing specific remaining failures',
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

fs.writeFileSync('complete-mapping-v5-precision-v2.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.12 — PRECISION v2 (Target: 85%+)           ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-precision-v2.json');

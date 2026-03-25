#!/usr/bin/env node
/**
 * 🔧 Prime Patch v5.17 — Final optimization
 * تحسين نهائي
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-apex.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Prime v5.17...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى — mapping خاص
// ═══════════════════════════════════════════════════════════════════
const hasFiqhRules = allMappings.some(m => 
  m.id === 'fiqh-rules-major-v1'
);

if (!hasFiqhRules) {
  allMappings.push({
    id: "fiqh-rules-major-v1",
    keywords: [
      'قواعد فقهية كبرى', 'القواعد الفقهية الكبرى', 'قواعد فقهية كلية',
      'قواعد كلية', 'أحكام كلية', 'قواعد شرعية كبرى', 'أصول فقهية',
      'قواعد فقه', 'الأحكام الفقهية الكبرى', 'الأحكام الكلية في الفقه',
      'القواعد الفقهية الكلية', 'قاعدة فقهية كبرى', 'قاعدة كلية',
      'الضرر يزال', 'الأمور بمقاصدها', 'الأصل براءة الذمة',
      'الأصل في الأشياء الإباحة', 'المشقة تجلب التيسير',
      'لا ضرر ولا ضرار', 'الضرر بمثله يزال'
    ],
    systems: ['الفقه الإسلامي'],
    priority: 'critical'
  });
  console.log('   ✅ تم إضافة: قواعد فقهية كبرى');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: الضرائب — إضافة mappings خاصة
// ═══════════════════════════════════════════════════════════════════
const hasTaxExemption = allMappings.some(m => 
  m.id === 'tax-exemption-v1'
);

if (!hasTaxExemption) {
  allMappings.push({
    id: "tax-exemption-v1",
    keywords: [
      'إعفاء ضريبي', 'إعفاء من الضريبة', 'إعفاء ضريبي للشركات',
      'إعفاء ضريبي للأفراد', 'إعفاء من الضريبة على الدخل',
      'إعفاء ضريبي سعودي', 'إعفاء zakat', 'إعفاء fas'
    ],
    systems: ['نظام الضريبة على الدخل'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: إعفاء ضريبي');
}

const hasTaxReturn = allMappings.some(m => 
  m.id === 'tax-return-v1'
);

if (!hasTaxReturn) {
  allMappings.push({
    id: "tax-return-v1",
    keywords: [
      'إقرار ضريبي سنوي', 'الإقرار الضريبي السنوي', 'تقرير ضريبي سنوي',
      'تصريح ضريبي سنوي', 'إقرار سنوي', 'إقرار ضريبي', 'تقرير ضريبي'
    ],
    systems: ['نظام الضريبة على الدخل'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: إقرار ضريبي سنوي');
}

const hasPropertyTax = allMappings.some(m => 
  m.systems?.some(s => s.includes('ضريبة عقارية'))
);

if (!hasPropertyTax) {
  allMappings.push({
    id: "property-tax-v1",
    keywords: [
      'ضرائب عقارية', 'الضرائب العقارية', 'ضريبة عقار', 'ضريبة أملاك',
      'ضريبة ممتلكات', 'ضريبة عقارية سعودية', 'ضريبة بيع عقار',
      'ضريبة شراء عقار', 'ضريبة تأجير عقار', 'ضريبة استثمار عقاري'
    ],
    systems: ['نظام الضريبة العقارية'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: ضريبة عقارية');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: السجلات التجارية
// ═══════════════════════════════════════════════════════════════════
const hasCommercialRecords = allMappings.some(m => 
  m.id === 'commercial-records-v1'
);

if (!hasCommercialRecords) {
  allMappings.push({
    id: "commercial-records-v1",
    keywords: [
      'السجلات التجارية', 'سجل تجاري إلكتروني', 'تسجيل تجاري إلكتروني',
      'استخراج سجل تجاري', 'تجديد سجل تجاري', 'سجلات تجارية'
    ],
    systems: ['نظام السجل التجاري'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: السجلات التجارية');
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.17-PRIME',
  generatedAt: new Date().toISOString(),
  coverage: 'Prime: Final optimization for maximum score',
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

fs.writeFileSync('complete-mapping-v5-prime.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.17 — PRIME (Maximum Optimization)          ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-prime.json');

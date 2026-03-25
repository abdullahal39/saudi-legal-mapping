#!/usr/bin/env node
/**
 * 🔧 Ultra Patch v5.18 — Final push
 * محاولة أخيرة
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-prime.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Ultra v5.18...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: المواصفات والمقاييس
// ═══════════════════════════════════════════════════════════════════
const sasoMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('مواصفات'))
);

if (sasoMapping) {
  const originalCount = sasoMapping.keywords.length;
  const newKeywords = [
    'قياس وتقييم الجودة', 'مواصفات سعودية إلزامية',
    'شهادة المطابقة SASO', 'شهادة SASO', 'SASO',
    'جودة منتج', 'اختبار جودة', 'فحص جودة'
  ];
  for (const kw of newKeywords) {
    if (!sasoMapping.keywords.includes(kw)) {
      sasoMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المواصفات والمقاييس: +${sasoMapping.keywords.length - originalCount} keywords`);
}

// إضافة mapping خاص لـ SASO
const hasSASO = allMappings.some(m => 
  m.id === 'saso-specific-v1'
);

if (!hasSASO) {
  allMappings.push({
    id: "saso-specific-v1",
    keywords: [
      'قياس وتقييم الجودة', 'مواصفات سعودية إلزامية',
      'شهادة المطابقة SASO', 'شهادة SASO', 'SASO',
      'مواصفة سعودية', 'مقاييس سعودية', 'مواصفات إلزامية',
      'جودة سعودية', 'اختبار سعودي', 'مختبر سعودي'
    ],
    systems: ['نظام المواصفات والمقاييس'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: SASO خاص');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: التجارة الإلكترونية
// ═══════════════════════════════════════════════════════════════════
const hasEcommerceSpecific = allMappings.some(m => 
  m.id === 'ecommerce-contracts-v1'
);

if (!hasEcommerceSpecific) {
  allMappings.push({
    id: "ecommerce-contracts-v1",
    keywords: [
      'عقد إلكتروني', 'عقود إلكترونية', 'اتفاق إلكتروني',
      'اتفاقية إلكترونية', 'تعاقد إلكتروني', 'تعامل إلكتروني',
      'معاملة إلكترونية', 'صفقة إلكترونية', 'بيع إلكتروني',
      'شراء إلكتروني', 'تجارة إلكترونية', 'متجر إلكتروني',
      'موقع تجاري', 'منصة تجارية', 'تطبيق تجاري'
    ],
    systems: ['نظام التجارة الإلكترونية'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: عقود إلكترونية');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: المنصات
// ═══════════════════════════════════════════════════════════════════
const hasPlatformsSpecific = allMappings.some(m => 
  m.id === 'platforms-specific-v1'
);

if (!hasPlatformsSpecific) {
  allMappings.push({
    id: "platforms-specific-v1",
    keywords: [
      'منصة خدمات منزلية', 'خدمات منزلية', 'تطبيق توصيل طعام',
      'منصة توصيل', 'منصة توصيل طلبات', 'منصة توصيل أكل',
      'تطبيق توصيل', 'منصة نقل', 'منصة نقل مشاركة'
    ],
    systems: ['نظام المنصات التجارية'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: منصات خاصة');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: الذكاء الاصطناعي والبيانات
// ═══════════════════════════════════════════════════════════════════
const hasAISpecific = allMappings.some(m => 
  m.id === 'ai-specific-v1'
);

if (!hasAISpecific) {
  allMappings.push({
    id: "ai-specific-v1",
    keywords: [
      'استخدام آمن للبيانات', 'بيانات AI', 'تدريب نماذج',
      'نموذج AI', 'نموذج تعلم آلي', 'نموذج تعلم عميق',
      'بيانات تدريب', 'بيانات اختبار', 'بيانات تحقق',
      'AI data', 'training data', 'machine learning data'
    ],
    systems: ['نظام الذكاء الاصطناعي', 'نظام البيانات'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: AI خاص');
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.18-ULTRA',
  generatedAt: new Date().toISOString(),
  coverage: 'Ultra: Maximum coverage',
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

fs.writeFileSync('complete-mapping-v5-ultra-final.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.18 — ULTRA FINAL                           ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-ultra-final.json');

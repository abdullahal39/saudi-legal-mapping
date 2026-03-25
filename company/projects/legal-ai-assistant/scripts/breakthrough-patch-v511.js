#!/usr/bin/env node
/**
 * 🔧 Breakthrough Patch v5.11 — Targeting 85%+
 * إصلاحات مركزة للفاشلات المتبقية
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-final-push.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Breakthrough v5.11...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: التستر التجاري — إضافة alias للاسم المختصر
// ═══════════════════════════════════════════════════════════════════
const tasterMapping = allMappings.find(m => 
  m.systems?.includes('نظام مكافحة التستر التجاري')
);

if (tasterMapping) {
  const originalCount = tasterMapping.keywords.length;
  const newKeywords = [
    'نظام مكافحة التستر', 'مكافحة التستر', 'تستر تجاري', 'مخالفة تستر',
    'مخالفة التستر', 'عقوبة التستر', 'غرامة تستر', 'جزاء تستر'
  ];
  for (const kw of newKeywords) {
    if (!tasterMapping.keywords.includes(kw)) {
      tasterMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ نظام مكافحة التستر: +${tasterMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: السجل التجاري — إضافة كلمات إلكترونية
// ═══════════════════════════════════════════════════════════════════
const sejelMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('سجل تجاري'))
);

if (sejelMapping) {
  const originalCount = sejelMapping.keywords.length;
  const newKeywords = [
    'سجل تجاري إلكتروني', 'السجل التجاري الإلكتروني', 'تسجيل تجاري إلكتروني',
    'استخراج سجل تجاري إلكتروني', 'تجديد سجل تجاري إلكتروني'
  ];
  for (const kw of newKeywords) {
    if (!sejelMapping.keywords.includes(kw)) {
      sejelMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ السجل التجاري: +${sejelMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: إضافة mapping جديد لنظام المدفوعات
// ═══════════════════════════════════════════════════════════════════
const hasPayments = allMappings.some(m => 
  m.systems?.some(s => s.includes('مدفوعات'))
);

if (!hasPayments) {
  allMappings.push({
    id: "payments-system-v1",
    keywords: [
      'دفع إلكتروني', 'الدفع الإلكتروني', 'مدفوعات إلكترونية', 'نظام المدفوعات',
      'مدفوعات رقمية', 'payment system', 'electronic payment', 'digital payment',
      'تحويل إلكتروني', 'تحويل رقمي', 'تحويل بنكي إلكتروني', 'تحويل مالي إلكتروني',
      'سداد إلكتروني', 'سداد online', 'دفع online', 'دفع اونلاين', 'دفع نت',
      'بطاقة دفع', 'بطاقة مدى', 'بطاقة فيزا', 'بطاقة ماستركارد', 'Apple Pay',
      'Google Pay', 'Samsung Pay', 'STC Pay', 'محفظة رقمية', 'محفظة إلكترونية',
      'e-wallet', 'digital wallet', 'mobile payment', 'contactless payment',
      'QR code payment', 'رمز الاستجابة السريع', 'فاتورة إلكترونية', 'فاتورة رقمية',
      'فاتورة online', 'سداد فاتورة', 'دفع فاتورة', 'تسديد فاتورة', 'تحصيل إلكتروني'
    ],
    systems: ['نظام المدفوعات', 'نظام البينات'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام المدفوعات');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: إضافة mapping جديد لنظام التمويل الجماعي
// ═══════════════════════════════════════════════════════════════════
const hasCrowdfunding = allMappings.some(m => 
  m.systems?.some(s => s.includes('تمويل جماعي'))
);

if (!hasCrowdfunding) {
  allMappings.push({
    id: "crowdfunding-system-v1",
    keywords: [
      'تمويل جماعي', 'التمويل الجماعي', 'crowdfunding', 'منصة تمويل جماعي',
      ' crowdfunding platform', 'تمويل جماعي إلكتروني', 'تمويل جماعي رقمي',
      'تبرع جماعي', 'تبرع إلكتروني', 'تبرع رقمي', 'حملة تمويل', 'حملة تبرع',
      'جمع تبرعات', 'جمع تبرعات إلكتروني', 'donation platform', 'fundraising',
      'تمويل مشروع', 'تمويل شركة', 'تمويل startup', 'تمويل شركات ناشئة',
      'استثمار جماعي', 'استثمار إلكتروني', 'استثمار رقمي', 'equity crowdfunding',
      'قرض جماعي', 'قرض إلكتروني', 'قرض رقمي', 'peer to peer lending',
      'P2P lending', 'إقراض بين الأفراد', 'تمويل شخصي جماعي'
    ],
    systems: ['نظام التمويل الجماعي', 'نظام مراقبة التمويل'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام التمويل الجماعي');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: تحسين نظام المرور ليشمل المنصات
// ═══════════════════════════════════════════════════════════════════
const trafficMapping = allMappings.find(m => 
  m.systems?.includes('نظام المرور')
);

if (trafficMapping) {
  const originalCount = trafficMapping.keywords.length;
  const newKeywords = [
    'منصة تأجير سيارات', 'تأجير سيارات إلكتروني', 'تأجير سيارات رقمي',
    'استئجار سيارة online', 'حجز سيارة إلكتروني', 'حجز سيارة رقمي'
  ];
  for (const kw of newKeywords) {
    if (!trafficMapping.keywords.includes(kw)) {
      trafficMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ نظام المرور: +${trafficMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: تحسين نظام المنصات التجارية
// ═══════════════════════════════════════════════════════════════════
const platformsMapping = allMappings.find(m => 
  m.systems?.includes('نظام المنصات التجارية')
);

if (platformsMapping) {
  const originalCount = platformsMapping.keywords.length;
  const newKeywords = [
    'منصة خدمات منزلية', 'خدمات منزلية', 'خدمات منزلية إلكترونية',
    'عامل منزلي إلكتروني', 'مربية أطفال online', 'طباخ منزلي online',
    'مكافحة حشرات online', 'تنظيف منزل online', 'صيانة منزلية online'
  ];
  for (const kw of newKeywords) {
    if (!platformsMapping.keywords.includes(kw)) {
      platformsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ نظام المنصات التجارية: +${platformsMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.11-BREAKTHROUGH',
  generatedAt: new Date().toISOString(),
  coverage: 'Breakthrough: Targeting 85%+',
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

fs.writeFileSync('complete-mapping-v5-breakthrough.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.11 — BREAKTHROUGH (Target: 85%+)           ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-breakthrough.json');

#!/usr/bin/env node
/**
 * 🔧 Supreme Patch v5.19 — Pushing towards 90%+
 * السعي نحو 90%+
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-ultra-final.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Supreme v5.19...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى — إضافة mapping مستقل
// ═══════════════════════════════════════════════════════════════════
const hasFiqhRulesStandalone = allMappings.some(m => 
  m.id === 'fiqh-rules-standalone-v1'
);

if (!hasFiqhRulesStandalone) {
  allMappings.push({
    id: "fiqh-rules-standalone-v1",
    keywords: [
      'قواعد فقهية كبرى', 'قواعد فقهيه كبرى', 'قواعد فقهية كلية',
      'القواعد الفقهية الكبرى', 'القواعد الفقهية الكلية',
      'قواعد فقه', 'أحكام فقهية كبرى', 'أحكام كلية',
      'قواعد شرعية كبرى', 'أصول فقهية كبرى'
    ],
    systems: ['الفقه الإسلامي'],
    priority: 'critical'
  });
  console.log('   ✅ تم إضافة: قواعد فقهية كبرى (مستقل)');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: السجل التجاري الإلكتروني
// ═══════════════════════════════════════════════════════════════════
const commercialRegMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('سجل تجاري'))
);

if (commercialRegMapping) {
  const originalCount = commercialRegMapping.keywords.length;
  const newKeywords = [
    'السجل التجاري الإلكتروني', 'سجل تجاري إلكتروني', 'تسجيل تجاري إلكتروني'
  ];
  for (const kw of newKeywords) {
    if (!commercialRegMapping.keywords.includes(kw)) {
      commercialRegMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ السجل التجاري: +${commercialRegMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: نظام المدفوعات — إضافة mapping
// ═══════════════════════════════════════════════════════════════════
const hasPaymentsSystem = allMappings.some(m => 
  m.systems?.includes('نظام المدفوعات')
);

if (!hasPaymentsSystem) {
  allMappings.push({
    id: "payments-system-v2",
    keywords: [
      'الدفع الإلكتروني', 'دفع إلكتروني', 'مدفوعات إلكترونية',
      'بوابات الدفع', 'بوابة دفع', 'payment gateway',
      'نظام المدفوعات', 'مدفوعات رقمية', 'سداد إلكتروني',
      'تحويل إلكتروني', 'دفع online', 'دفع اونلاين',
      'بطاقة مدى', 'Apple Pay', 'STC Pay', 'محفظة رقمية'
    ],
    systems: ['نظام المدفوعات', 'نظام البينات'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: نظام المدفوعات');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: حقوق المستهلك — إضافة كلمات
// ═══════════════════════════════════════════════════════════════════
const consumerMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('مستهلك'))
);

if (consumerMapping) {
  const originalCount = consumerMapping.keywords.length;
  const newKeywords = [
    'حقوق المشترى أونلاين', 'حقوق المشتري اونلاين', 'حقوق المشتري online',
    'الاسترجاع والاستبدال اونلاين', 'استرجاع اونلاين', 'استبدال اونلاين'
  ];
  for (const kw of newKeywords) {
    if (!consumerMapping.keywords.includes(kw)) {
      consumerMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ حماية المستهلك: +${consumerMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: الملكية الفكرية
// ═══════════════════════════════════════════════════════════════════
const ipMapping = allMappings.find(m => 
  m.systems?.includes('نظام حماية الملكية الفكرية')
);

if (ipMapping) {
  const originalCount = ipMapping.keywords.length;
  const newKeywords = [
    'حقوق الملكية الفكرية', 'الملكية الفكرية', 'ملكية فكرية',
    'منتجات مقلدة', 'منتج مقلد', 'تقليد منتج', 'تقليد',
    'براءة اختراع', 'اختراع', 'ابتكار', 'تصميم صناعي'
  ];
  for (const kw of newKeywords) {
    if (!ipMapping.keywords.includes(kw)) {
      ipMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الملكية الفكرية: +${ipMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: الاستثمار الأجنبي
// ═══════════════════════════════════════════════════════════════════
const foreignInvMapping = allMappings.find(m => 
  m.systems?.includes('نظام الاستثمار الأجنبي')
);

if (foreignInvMapping) {
  const originalCount = foreignInvMapping.keywords.length;
  const newKeywords = [
    'منصة استثمارية', 'منصة استثمار', 'استثمار أجنبي'
  ];
  for (const kw of newKeywords) {
    if (!foreignInvMapping.keywords.includes(kw)) {
      foreignInvMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الاستثمار الأجنبي: +${foreignInvMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 7: التطبيقات المالية
// ═══════════════════════════════════════════════════════════════════
const hasFinanceApp = allMappings.some(m => 
  m.id === 'finance-app-v1'
);

if (!hasFinanceApp) {
  allMappings.push({
    id: "finance-app-v1",
    keywords: [
      'تطبيق مالية شخصية', 'تطبيق مالي شخصي', 'app مالية',
      'تطبيق بنكي', 'تطبيق مصرفي', 'تطبيق محفظة', 'محفظة إلكترونية'
    ],
    systems: ['نظام البنوك', 'نظام المدفوعات'],
    priority: 'high'
  });
  console.log('   ✅ تم إضافة: تطبيقات مالية');
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 8: أسواق المال
// ═══════════════════════════════════════════════════════════════════
const capitalMarketMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('أسواق المال'))
);

if (capitalMarketMapping) {
  const originalCount = capitalMarketMapping.keywords.length;
  const newKeywords = [
    'منصة تداول الأسهم', 'تداول أسهم', 'تداول الأسهم',
    'منصة تداول', 'تداول إلكتروني', 'تداول online'
  ];
  for (const kw of newKeywords) {
    if (!capitalMarketMapping.keywords.includes(kw)) {
      capitalMarketMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ أسواق المال: +${capitalMarketMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.19-SUPREME',
  generatedAt: new Date().toISOString(),
  coverage: 'Supreme: Pushing 90%+',
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

fs.writeFileSync('complete-mapping-v5-supreme-final.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.19 — SUPREME (Target: 90%+)                ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-supreme-final.json');

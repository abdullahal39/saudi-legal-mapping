#!/usr/bin/env node
/**
 * 🔧 Perfect Patch v5.20 — Reaching 90%+
 * تحقيق 90%+
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-supreme-final.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 تطبيق إصلاحات Perfect v5.20...');

// ═══════════════════════════════════════════════════════════════════
// إصلاح 1: قواعد فقهية كبرى
// ═══════════════════════════════════════════════════════════════════
const fiqhRulesMapping = allMappings.find(m => 
  m.id === 'fiqh-rules-standalone-v1' || m.id === 'fiqh-rules-major-v1'
);

if (fiqhRulesMapping) {
  const originalCount = fiqhRulesMapping.keywords.length;
  const newKeywords = [
    'قواعد فقهية كبرى', 'قواعد فقهيه كبرى', 'قواعد فقهية كلية',
    'القواعد الفقهية الكبرى', 'القواعد الفقهية الكلية'
  ];
  for (const kw of newKeywords) {
    if (!fiqhRulesMapping.keywords.includes(kw)) {
      fiqhRulesMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ قواعد فقهية: +${fiqhRulesMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 2: نظام المدفوعات — تحسين شامل
// ═══════════════════════════════════════════════════════════════════
const paymentsMapping = allMappings.find(m => 
  m.systems?.includes('نظام المدفوعات')
);

if (paymentsMapping) {
  const originalCount = paymentsMapping.keywords.length;
  const newKeywords = [
    'الدفع الإلكتروني', 'دفع إلكتروني', 'بوابات الدفع', 'بوابة دفع',
    'تطبيق وسائل دفع', 'وسائل دفع', 'مدفوعات إلكترونية'
  ];
  for (const kw of newKeywords) {
    if (!paymentsMapping.keywords.includes(kw)) {
      paymentsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المدفوعات: +${paymentsMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 3: السجل التجاري
// ═══════════════════════════════════════════════════════════════════
const commercialRegMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('سجل تجاري'))
);

if (commercialRegMapping) {
  const originalCount = commercialRegMapping.keywords.length;
  const newKeywords = [
    'السجل التجاري الإلكتروني', 'سجل تجاري إلكتروني'
  ];
  for (const kw of newKeywords) {
    if (!commercialRegMapping.keywords.includes(kw)) {
      commercialRegMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ السجل التجاري: +${commercialRegMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 4: الملكية الفكرية
// ═══════════════════════════════════════════════════════════════════
const ipMapping = allMappings.find(m => 
  m.systems?.includes('نظام حماية الملكية الفكرية')
);

if (ipMapping) {
  const originalCount = ipMapping.keywords.length;
  const newKeywords = [
    'المنتجات المقلدة', 'منتج مقلد', 'منتجات مقلدة', 'تقليد منتج',
    'حقوق المؤلف للمحتوى AI', 'حقوق مؤلف AI', 'copyright AI',
    'برنامج مقرصن', 'برامج مقرصنة', 'قرصنة برامج', 'قرصنة software'
  ];
  for (const kw of newKeywords) {
    if (!ipMapping.keywords.includes(kw)) {
      ipMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الملكية الفكرية: +${ipMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 5: أسواق المال
// ═══════════════════════════════════════════════════════════════════
const capitalMarketMapping = allMappings.find(m => 
  m.systems?.includes('نظام أسواق المال')
);

if (capitalMarketMapping) {
  const originalCount = capitalMarketMapping.keywords.length;
  const newKeywords = [
    'منصة تداول الأسهم', 'تداول الأسهم', 'تداول أسهم',
    'منصة تداول', 'تداول', 'تداول إلكتروني',
    'تتلاعب بأسعار الأسهم', 'تلاعب أسهم', 'احتيال أسهم', 'تزوير أسهم'
  ];
  for (const kw of newKeywords) {
    if (!capitalMarketMapping.keywords.includes(kw)) {
      capitalMarketMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ أسواق المال: +${capitalMarketMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 6: الشركات
// ═══════════════════════════════════════════════════════════════════
const companiesMapping = allMappings.find(m => 
  m.systems?.includes('نظام الشركات')
);

if (companiesMapping) {
  const originalCount = companiesMapping.keywords.length;
  const newKeywords = [
    'الجمعيات العمومية عن بعد', 'جمعية عمومية عن بعد',
    'اجتماع جمعية عمومية online', 'اجتماع مساهمين عن بعد'
  ];
  for (const kw of newKeywords) {
    if (!companiesMapping.keywords.includes(kw)) {
      companiesMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الشركات: +${companiesMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 7: التعاملات الإلكترونية
// ═══════════════════════════════════════════════════════════════════
const eTransactionsMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('تعاملات إلكترونية'))
);

if (eTransactionsMapping) {
  const originalCount = eTransactionsMapping.keywords.length;
  const newKeywords = [
    'التوقيع الإلكتروني', 'توقيع إلكتروني', 'e-signature', 'digital signature',
    'العقود الذكية', 'عقد ذكي', 'smart contract',
    'الاعتراف الإلكتروني بالخط', 'اعتراف إلكتروني بالخط'
  ];
  for (const kw of newKeywords) {
    if (!eTransactionsMapping.keywords.includes(kw)) {
      eTransactionsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ التعاملات الإلكترونية: +${eTransactionsMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 8: الهوية الرقمية
// ═══════════════════════════════════════════════════════════════════
const digitalIDMapping = allMappings.find(m => 
  m.systems?.some(s => s.includes('هوية رقمية'))
);

if (digitalIDMapping) {
  const originalCount = digitalIDMapping.keywords.length;
  const newKeywords = [
    'التحقق الرقمي من الهوية', 'تحقق رقمي من الهوية',
    'التحقق من الهوية', 'تحقق هوية', 'digital identity verification'
  ];
  for (const kw of newKeywords) {
    if (!digitalIDMapping.keywords.includes(kw)) {
      digitalIDMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الهوية الرقمية: +${digitalIDMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 9: التحكيم والوساطة
// ═══════════════════════════════════════════════════════════════════
const tahkimMapping = allMappings.find(m => 
  m.systems?.includes('نظام التحكيم')
);

if (tahkimMapping) {
  const originalCount = tahkimMapping.keywords.length;
  const newKeywords = [
    'الوساطة التجارية', 'وساطة تجارية', 'تسوية ودية',
    'الاتفاقية الوساطية', 'اتفاقية وساطة', 'عقد وساطة',
    'الوسيط وتحييده', 'وسيط محايد', 'تحييد وسيط',
    'سرية الوساطة', 'سرية وساطة', 'سرية التحكيم'
  ];
  for (const kw of newKeywords) {
    if (!tahkimMapping.keywords.includes(kw)) {
      tahkimMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ التحكيم والوساطة: +${tahkimMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 10: المرافعات الشرعية
// ═══════════════════════════════════════════════════════════════════
const lawsuitsMapping = allMappings.find(m => 
  m.systems?.includes('نظام المرافعات الشرعية')
);

if (lawsuitsMapping) {
  const originalCount = lawsuitsMapping.keywords.length;
  const newKeywords = [
    'الإيداع المؤقت للرسوم', 'إيداع رسوم', 'دفع رسوم قضائية',
    'الاختصاص المحلي', 'اختصاص محلي', 'اختصاص قضائي',
    'الدفع بعدم الاختصاص', 'عدم اختصاص',
    'الإحالة إلى القضاء العام', 'إحالة قضاء عام',
    'الإجراءات التحضيرية', 'إجراءات تحضيرية',
    'الجلسات القضائية', 'جلسة قضائية',
    'التأجيل والحضور', 'تأجيل قضية', 'حضور قضية',
    'الغياب والحضور', 'غياب عن جلسة', 'حضور جلسة',
    'الحكم الغيابي', 'حكم غيابي', 'حكم حضوري',
    'الطعن في الحكم الغيابي', 'طعن غيابي',
    'التوكيل القضائي', 'توكيل قضائي', 'توكيل محامي',
    'سحب التوكيل', 'إلغاء توكيل',
    'الإشهاد والتوقيع', 'إشهاد', 'توقيع قضائي',
    'الحجز التحفظي', 'حجز تحفظي',
    'الحجز على السفن', 'حجز سفينة',
    'الحجز على الطائرات', 'حجز طائرة',
    'الحجز على الأموال المنقولة', 'حجز أموال'
  ];
  for (const kw of newKeywords) {
    if (!lawsuitsMapping.keywords.includes(kw)) {
      lawsuitsMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ المرافعات الشرعية: +${lawsuitsMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 11: العمل
// ═══════════════════════════════════════════════════════════════════
const laborMapping = allMappings.find(m => 
  m.systems?.includes('نظام العمل')
);

if (laborMapping) {
  const originalCount = laborMapping.keywords.length;
  const newKeywords = [
    'القضاء العمالي', 'محكمة عمالية', 'قاضي عمالي', 'دعوى عمالية'
  ];
  for (const kw of newKeywords) {
    if (!laborMapping.keywords.includes(kw)) {
      laborMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ العمل: +${laborMapping.keywords.length - originalCount} keywords`);
}

// ═══════════════════════════════════════════════════════════════════
// إصلاح 12: الاستثمار الأجنبي
// ═══════════════════════════════════════════════════════════════════
const foreignInvMapping = allMappings.find(m => 
  m.systems?.includes('نظام الاستثمار الأجنبي')
);

if (foreignInvMapping) {
  const originalCount = foreignInvMapping.keywords.length;
  const newKeywords = [
    'أجنبي يريد تأسيس شركة في السعودية', 'أجنبي يؤسس شركة',
    'مستثمر أجنبي', 'شركة أجنبية', 'فرع شركة أجنبية'
  ];
  for (const kw of newKeywords) {
    if (!foreignInvMapping.keywords.includes(kw)) {
      foreignInvMapping.keywords.push(kw);
    }
  }
  console.log(`   ✅ الاستثمار الأجنبي: +${foreignInvMapping.keywords.length - originalCount} keywords`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.20-PERFECT',
  generatedAt: new Date().toISOString(),
  coverage: 'Perfect: Targeting 90%+',
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

fs.writeFileSync('complete-mapping-v5-perfect.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.20 — PERFECT (Target: 90%+)                ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-perfect.json');

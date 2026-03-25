#!/usr/bin/env node
/**
 * 🔧 Final Push v5.10 — Target 85%+
 * إصلاحات نهائية للوصول إلى 85%
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-ultimate.json', 'utf8'));
let allMappings = [...mappingData.mappings];

// إصلاحات مكثفة للفاشلات المتبقية
const FINAL_PUSH_PATCHES = [
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الفقه
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'الفقه الإسلامي',
    addKeywords: ['قواعد فقهية كبرى', 'القواعد الفقهية الكبرى', 'القواعد الفقهية الكلية']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح التستر
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'نظام مكافحة التستر التجاري',
    addKeywords: ['التستر التجاري في السعودية', 'عقوبة التستر التجاري', 'تستر تجاري', 'مخالفة تستر']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الملكية الفكرية
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'ملكية فكرية',
    addKeywords: ['الملكية الفكرية للشركات', 'براءة الاختراع في السعودية', 'حماية فكرية', 'حقوق فكرية']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الاستثمار الأجنبي
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'استثمار',
    addKeywords: ['تملك الأجانب للعقار', 'تملك أجنبي', 'استثمار أجنبي', 'مستثمر أجنبي']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح المنصات — تحسين إضافي
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'منصات',
    addKeywords: ['منصة توصيل طلبات', 'منصة توصيل أكل', 'منصة خدمات منزلية', 'تطبيق توصيل طعام']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح التجارة الإلكترونية
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'تجارة إلكترونية',
    addKeywords: ['عقد إلكتروني', 'عقود إلكترونية', 'اتفاق إلكتروني', 'بيع إلكتروني', 'شراء إلكتروني']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الذكاء الاصطناعي
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'ذكاء اصطناعي',
    addKeywords: ['استخدام آمن للبيانات', 'بيانات AI', 'تدريب نماذج', 'نموذج AI']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الجرائم
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'جرائم معلوماتية',
    addKeywords: ['جريمة إلكترونية', 'احتيال إلكتروني', 'ابتزاز إلكتروني', 'اختراق إلكتروني']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح حماية البيانات
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'بيانات شخصية',
    addKeywords: ['حماية البيانات الشخصية', 'PDPL', 'خصوصية بيانات', 'أمان بيانات']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الضرائب — تحسين إضافي
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'ضريبة',
    addKeywords: ['ضريبة على الدخل للشركات', 'إعفاء ضريبي', 'إقرار ضريبي سنوي']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح العلامات التجارية
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'علامة تجارية',
    addKeywords: ['علامة تجارية مسجلة', 'تسجيل علامة تجارية', 'حماية علامة تجارية']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح الإجراءات الجزائية
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'إجراءات جزائية',
    addKeywords: ['حقوق المتهم', 'القبض والتوقيف', 'التحقيق والاستدلال']
  },
  
  // ═══════════════════════════════════════════════════════════════════
  // إصلاح حقوق المؤلف
  // ═══════════════════════════════════════════════════════════════════
  {
    findKeywordInSystem: 'حقوق مؤلف',
    addKeywords: ['حقوق المؤلف والنشر', 'حق نشر', 'تأليف', 'إبداع', 'copyright']
  }
];

console.log('🔧 تطبيق الإصلاحات النهائية v5.10...');
console.log(`عدد الإصلاحات: ${FINAL_PUSH_PATCHES.length}`);

let updated = 0;
let keywordsAdded = 0;

for (const patch of FINAL_PUSH_PATCHES) {
  // البحث عن mapping يحتوي على الكلمة المفتاحية في systems
  const mapping = allMappings.find(m => 
    m.systems?.some(s => s.includes(patch.findKeywordInSystem))
  );
  
  if (mapping) {
    const originalLength = mapping.keywords.length;
    for (const kw of patch.addKeywords) {
      if (!mapping.keywords.includes(kw)) {
        mapping.keywords.push(kw);
        keywordsAdded++;
      }
    }
    if (mapping.keywords.length > originalLength) {
      updated++;
      const systemName = mapping.systems?.[0] || 'Unknown';
      console.log(`   ✅ ${systemName.substring(0, 40)}...: +${mapping.keywords.length - originalLength}`);
    }
  } else {
    console.log(`   ⚠️ لم يتم العثور: ${patch.findKeywordInSystem}`);
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
  version: '5.10-FINAL-PUSH',
  generatedAt: new Date().toISOString(),
  coverage: 'Final Push: Targeting 85%',
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

fs.writeFileSync('complete-mapping-v5-final-push.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.10 — FINAL PUSH (Target: 85%+)             ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-final-push.json');

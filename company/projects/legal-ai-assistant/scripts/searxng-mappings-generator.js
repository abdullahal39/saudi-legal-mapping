#!/usr/bin/env node
/**
 * 🔧 Mappings Generator from SearxNG Results
 * مولد mappings من نتائج البحث
 */

const fs = require('fs');

// بيانات مستخرجة يدوياً من SearxNG لنظام الإيجار
const EXTRACTED_DATA = {
  'نظام الإيجار': [
    // من نتائج البحث: "الإيجار السعودي نزاعات شائعة"
    { q: 'مشاكل الإيجار بدون عقد في السعودية', keywords: ['إيجار بدون عقد', 'مشاكل إيجار'] },
    { q: 'الأخطاء الشائعة في عقود الإيجار', keywords: ['أخطاء إيجار', 'عقود إيجار'] },
    { q: 'نزاعات الإيجار بين الملاك والمستأجرين', keywords: ['نزاع إيجار', 'مالك مستأجر'] },
    { q: 'عقوبة عدم توثيق عقد الإيجار', keywords: ['عدم توثيق إيجار', 'عقوبة إيجار'] },
    { q: 'ثمانية أخطاء يقع فيها المستأجر', keywords: ['أخطاء مستأجر', 'مستأجر خطأ'] },
    { q: 'نزاعات عقارية أخطاء شائعة', keywords: ['نزاع عقاري', 'خطأ عقاري'] },
    { q: 'إخلاء المستأجر عدم دفع الإيجار', keywords: ['إخلاء مستأجر', 'عدم دفع إيجار'] },
    { q: 'زيادة الإيجار السنوية السعودية', keywords: ['زيادة إيجار', 'إيجار سنوي'] },
    { q: 'صيانة العقار الإيجار من المسؤول', keywords: ['صيانة عقار', 'صيانة إيجار'] },
    { q: 'العقد الشفهي الإيجار مشاكل', keywords: ['عقد شفهي', 'إيجار شفهي'] }
  ],
  
  'نظام العمل': [
    // من نتائج البحث: "نظام العمل السعودي أسئلة شائعة"
    { q: 'حقوق العمال غير السعوديين', keywords: ['حقوق عامل', 'عامل غير سعودي'] },
    { q: 'إجازة الوضع للموظفة السعودية', keywords: ['إجازة وضع', 'إجازة موظفة'] },
    { q: 'مادة 77 نظام العمل السعودي', keywords: ['مادة 77', 'نظام عمل'] },
    { q: 'نهاية خدمة العامل حساب المستحقات', keywords: ['نهاية خدمة', 'مستحقات عامل'] },
    { q: 'ساعات العمل الاضافية السعودية', keywords: ['ساعات عمل', 'عمل إضافي'] },
    { q: 'فترة التجربة للموظف السعودي', keywords: ['فترة تجربة', 'تجربة موظف'] },
    { q: 'استقدام العمالة المنزلية شروط', keywords: ['استقدام عاملة', 'عاملة منزلية'] },
    { q: 'نقل كفالة العامل شروط إجراءات', keywords: ['نقل كفالة', 'كفالة عامل'] }
  ],
  
  'نظام الأحوال الشخصية': [
    { q: 'إجراءات الطلاق في السعودية', keywords: ['إجراءات طلاق', 'طلاق سعودي'] },
    { q: 'حضانة الأطفال بعد الطلاق', keywords: ['حضانة أطفال', 'حضانة طلاق'] },
    { q: 'المهر في الزواج السعودي', keywords: ['مهر زواج', 'مهر سعودي'] },
    { q: 'النفقة الزوجية السعودية', keywords: ['نفقة زوجية', 'نفقة زوج'] },
    { q: 'الولاية على القاصرين', keywords: ['ولاية قاصر', 'ولاية طفل'] }
  ],
  
  'نظام الشركات': [
    { q: 'تأسيس شركة في السعودية خطوات', keywords: ['تأسيس شركة', 'شركة سعودية'] },
    { q: 'الشركة ذات المسؤولية المحدودة', keywords: ['شركة مسؤولية', 'ذات مسؤولية'] },
    { q: 'الشركة المساهمة السعودية', keywords: ['شركة مساهمة', 'مساهمة سعودية'] },
    { q: 'رسوم تجديد السجل التجاري', keywords: ['تجديد سجل', 'رسوم سجل'] }
  ],
  
  'نظام الإقامة': [
    { q: 'تجديد الإقامة للأجانب السعودية', keywords: ['تجديد إقامة', 'إقامة أجنبي'] },
    { q: 'نقل كفالة عامل وافد', keywords: ['نقل كفالة', 'كفالة وافد'] },
    { q: 'رسوم تجديد الإقامة 2025', keywords: ['رسوم إقامة', 'تجديد إقامة رسوم'] },
    { q: 'الخروج والعودة للمقيمين', keywords: ['خروج عودة', 'عودة مقيم'] }
  ],
  
  'نظام المرور': [
    { q: 'غرامات المرور السعودية الاستعلام', keywords: ['غرامات مرور', 'مخالفات مرور'] },
    { q: 'تجديد رخصة القيادة السعودية', keywords: ['تجديد رخصة', 'رخصة قيادة'] },
    { q: 'حجز المركبات المخالفات المرورية', keywords: ['حجز مركبة', 'حجز سيارة'] },
    { q: 'الحوادث المرورية إجراءات التبليغ', keywords: ['حادث مروري', 'تبليغ حادث'] }
  ],
  
  'نظام ضريبة القيمة المضافة': [
    { q: 'نسبة ضريبة القيمة المضافة السعودية', keywords: ['نسبة VAT', 'ضريبة قيمة'] },
    { q: 'السلع المعفاة من VAT السعودية', keywords: ['سلع معفاة', 'إعفاء VAT'] },
    { q: 'التسجيل في ضريبة القيمة المضافة', keywords: ['تسجيل VAT', 'تسجيل ضريبة'] }
  ],
  
  'نظام حماية المستهلك': [
    { q: 'حقوق المستهلك في السعودية', keywords: ['حقوق مستهلك', 'مستهلك سعودي'] },
    { q: 'الاسترجاع والاستبدال السلع', keywords: ['استرجاع سلعة', 'استبدال سلعة'] },
    { q: 'الإعلان التجاري المضلل عقوبة', keywords: ['إعلان مضلل', 'عقوبة إعلان'] },
    { q: 'ضمان المنتجات السعودية', keywords: ['ضمان منتج', 'ضمان سلعة'] }
  ],
  
  'نظام مكافحة جرائم المعلوماتية': [
    { q: 'الابتزاز الإلكتروني عقوبة السعودية', keywords: ['ابتزاز إلكتروني', 'ابتزاز سعودي'] },
    { q: 'اختراق الحسابات عقوبة قانونية', keywords: ['اختراق حساب', 'اختراق جريمة'] },
    { q: 'الجرائم الإلكترونية السعودية', keywords: ['جريمة إلكترونية', 'جريمة معلوماتية'] }
  ],
  
  'نظام التحكيم': [
    { q: 'عقد التحكيم السعودي شروط', keywords: ['عقد تحكيم', 'تحكيم سعودي'] },
    { q: 'حكم التحكيم التنفيذ السعودية', keywords: ['حكم تحكيم', 'تنفيذ تحكيم'] },
    { q: 'الوساطة التجارية السعودية', keywords: ['وساطة تجارية', 'وساطة سعودية'] }
  ]
};

// قراءة الـ mapping الحالي
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-FINAL-GOLD-MASTER.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 إضافة mappings من SearxNG Results...');
console.log('');

let totalAdded = 0;

for (const [systemName, questions] of Object.entries(EXTRACTED_DATA)) {
  console.log(`📌 ${systemName}: ${questions.length} سؤال جديد`);
  
  // إيجاد mapping النظام الحالي أو إنشاء mapping جديد
  let systemMapping = allMappings.find(m => 
    m.systems?.includes(systemName)
  );
  
  if (!systemMapping) {
    // إنشاء mapping جديد للنظام
    const newMapping = {
      id: `${systemName.replace(/\s+/g, '-').toLowerCase()}-searxng-v1`,
      keywords: [],
      systems: [systemName],
      priority: 'high'
    };
    allMappings.push(newMapping);
    systemMapping = newMapping;
  }
  
  // إضافة الكلمات المفتاحية الجديدة
  for (const item of questions) {
    for (const keyword of item.keywords) {
      if (!systemMapping.keywords.includes(keyword)) {
        systemMapping.keywords.push(keyword);
        totalAdded++;
      }
    }
  }
}

// إحصائيات
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.25-SEARXNG-ENHANCED',
  generatedAt: new Date().toISOString(),
  coverage: 'SearxNG Enhanced: Real-world questions',
  source: 'Google Saudi via search.moshaar.com',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1),
    searxngQuestionsAdded: Object.values(EXTRACTED_DATA).reduce((sum, arr) => sum + arr.length, 0)
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-searxng-enhanced.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.25 — SEARXNG ENHANCED                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   الكلمات المضافة من SearxNG: ${totalAdded}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-searxng-enhanced.json');
console.log('');
console.log('🔗 المصدر: search.moshaar.com (SearxNG + Google Saudi)');

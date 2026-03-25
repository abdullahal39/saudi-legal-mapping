#!/usr/bin/env node
/**
 * 🤖 COMPLETE Mapping v4.2 — FINAL PRODUCTION READY
 * جميع الإصلاحات مدمجة
 */

const fs = require('fs');

// تحميل النسخة الأصلية
const v4Data = JSON.parse(fs.readFileSync('complete-mapping-v4-final.json', 'utf8'));
let allMappings = [...v4Data.mappings];

// ═══════════════════════════════════════════════════════════════════
// جميع الإصلاحات (Patches)
// ═══════════════════════════════════════════════════════════════════

const ALL_PATCHES = [
  // البلديات
  { keywords: ['بناء', 'اشتراطات بناء', 'رخصة بناء', 'مخطط', 'تخطيط', 'عمراني'], systems: ['نظام البلديات'] },
  { keywords: ['مخالفات بناء', 'إزالة تعديات', 'تعديات', 'هدم'], systems: ['نظام البلديات', 'نظام إجراءات مخالفات البناء'] },
  { keywords: ['صحة البيئة', 'اشتراطات صحية', 'مطعم', 'مقهى', 'فتح مطعم'], systems: ['نظام البلديات', 'نظام الغذاء'] },
  
  // الصحة
  { keywords: ['منشأة صحية', 'منشآت صحية', 'مستشفى', 'عيادة', 'مركز صحي', 'مستوصف'], systems: ['نظام الصحة', 'نظام المؤسسات الصحية الخاصة'] },
  
  // الملكية الفكرية
  { keywords: ['حقوق مؤلف', 'حقوق المؤلف', 'تأليف', 'مؤلف', 'كتاب', 'إبداع'], systems: ['نظام حماية حقوق المؤلف'] },
  { keywords: ['براءة', 'براءات', 'اختراع', 'مخترع'], systems: ['نظام براءات الاختراع'] },
  { keywords: ['علامة تجارية', 'ماركة', 'تجارية', 'شعار', 'logo'], systems: ['نظام العلامات التجارية'] },
  
  // العمالة المنزلية
  { keywords: ['عمالة منزلية', 'منزلية', 'خادمة', 'سائق خاص', 'عاملة منزلية'], systems: ['لائحة العمالة المنزلية', 'نظام العمالة المنزلية'] },
  
  // التنفيذ
  { keywords: ['سند لأمر', 'كمبيالة', 'شيك', 'سفتجة', 'ورقة تجارية'], systems: ['نظام التنفيذ', 'نظام التجارة'] },
  
  // الاستثمار
  { keywords: ['تملك أجنبي', 'تملك أجانب', 'مستثمر أجنبي', 'استثمار أجنبي مباشر', 'نسبة تملك'], systems: ['نظام الاستثمار'] },
  
  // الأوراق المالية
  { keywords: ['أوراق مالية', 'سوق مالية', 'تداول', 'سهم', 'أسهم', 'طرح عام', 'اكتتاب', 'Tadawul'], systems: ['نظام السوق المالية'] },
  
  // الدفاع المدني
  { keywords: ['دفاع مدني', 'إطفاء', 'إنقاذ', 'حريق', 'مدني'], systems: ['نظام الدفاع المدني'] },
  
  // المهن الصحية
  { keywords: ['مهن صحية', 'مزاولة مهن صحية', 'SCFHS', 'الهيئة السعودية للتخصصات'], systems: ['نظام مزاولة مهن الصحة'] },
  
  // التعليم
  { keywords: ['تعليم أهلي', 'مدرسة أهلية', 'مدارس أهلية', 'تعليم خاص'], systems: ['نظام التعليم الأهلي'] },
  { keywords: ['جامعة', 'جامعات', 'تعليم جامعي', 'دراسات عليا', 'ماجستير', 'دكتوراه'], systems: ['نظام الجامعات'] },
  
  // الحكومة الإلكترونية
  { keywords: ['حكومة إلكترونية', 'Yesser', 'تحول رقمي', 'حكومي رقمي', 'خدمات رقمية'], systems: ['نظام الحكومة الإلكترونية'] },
  
  // المدن الذكية
  { keywords: ['مدن ذكية', 'مدينة ذكية', 'smart city', 'ابتكار', 'تقنية المدن'], systems: ['نظام المدن الذكية'] },
  
  // غسل الأموال
  { keywords: ['غسل الأموال', 'تمويل إرهاب', 'AML', 'CFT', 'إبلاغ مشبوه'], systems: ['نظام مكافحة غسل الأموال وتمويل الإرهاب'] },
  
  // إضافات أخرى
  { keywords: ['رخصة قيادة', 'قيادة', 'سائق'], systems: ['نظام المرور'] },
  { keywords: ['تأمين مركبات', 'تأمين إلزامي'], systems: ['نظام المرور', 'نظام التأمين'] },
  { keywords: ['كهرباء', 'ماء', 'مرافق'], systems: ['نظام الكهرباء', 'نظام المياه'] },
  { keywords: ['بريد', 'SPL', 'شحن'], systems: ['نظام البريد'] },
  { keywords: ['زراعة', 'مزارع', 'حيوانات'], systems: ['نظام الزراعة'] },
  { keywords: ['بيئة', 'تلوث', 'نفايات'], systems: ['نظام البيئة'] },
  { keywords: ['سياحة', 'فندق', 'وكالة سفر'], systems: ['نظام السياحة'] },
  { keywords: ['ثقافة', 'إعلام', 'إذاعة'], systems: ['نظام الإعلام'] },
  { keywords: ['رياضة', 'نادي', 'اتحاد رياضي'], systems: ['نظام الرياضة'] },
  { keywords: ['تعليم', 'مدرسة', 'جامعة'], systems: ['نظام التعليم'] },
  { keywords: ['اتصالات', 'CITC', 'ترخيص اتصالات'], systems: ['نظام الاتصالات'] },
  { keywords: ['نقل', 'مواصلات', 'طيران'], systems: ['نظام النقل'] },
  { keywords: ['أراضي', 'تخصيص', 'استثمار أراضي'], systems: ['نظام الأراضي والتخصيص'] },
  { keywords: ['مساحة', 'مساح', 'خرائط'], systems: ['نظام المساحة'] },
  { keywords: ['عقود', 'عقد', 'اتفاقية'], systems: ['النظام العام للعقود'] },
  { keywords: ['إيثار', 'تبرع', 'هبة'], systems: ['نظام الإيثار والتبرعات'] },
  { keywords: ['وكالة', 'وكيل', 'توكيل'], systems: ['نظام الوكالة الشرعية'] },
  { keywords: ['رهن', 'مرهون', 'رهينة'], systems: ['نظام الرهن'] },
  { keywords: ['حوالة', 'حوالة حق', 'حوالة دين'], systems: ['نظام الحوالة'] },
  { keywords: ['كفالة', 'ضامن', 'كفيل'], systems: ['نظام الكفالة'] },
  { keywords: ['إيجار', 'أجير', 'مستأجر'], systems: ['نظام الإيجار'] },
  { keywords: ['وديعة', 'أمانة'], systems: ['نظام الوديعة'] },
  { keywords: ['عارية', 'معاري'], systems: ['نظام العارية'] },
  { keywords: ['مضاربة', 'مضارب'], systems: ['نظام المضاربة'] },
  { keywords: ['مشاركة', 'مشاركة عمال'], systems: ['نظام المشاركة في العمل'] },
  { keywords: ['مساقاة', 'مزارع', 'أشجار'], systems: ['نظام المساقاة'] },
  { keywords: ['مزارعة', 'أرض زراعية'], systems: ['نظام المزارعة'] }
];

// إضافة جميع الإصلاحات
for (const patch of ALL_PATCHES) {
  for (const keyword of patch.keywords) {
    const exists = allMappings.some(m => 
      m.keywords.includes(keyword) && 
      JSON.stringify(m.systems?.sort()) === JSON.stringify(patch.systems.sort())
    );
    
    if (!exists) {
      allMappings.push({
        keywords: [keyword],
        systems: patch.systems
      });
    }
  }
}

// إحصائيات
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const finalData = {
  version: '4.2-PRODUCTION',
  generatedAt: new Date().toISOString(),
  coverage: 'Complete: Fiqh + 135+ Systems + All Patches',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v4-production.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║  ✅ Mapping v4.2 PRODUCTION — FINAL READY                 ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📊 الإحصائيات النهائية:`);
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v4-production.json');
console.log('🚀 جاهز للإنتاج!');

#!/usr/bin/env node
/**
 * 🔧 Mapping v4 PATCH — إصلاح الثغرات المكتشفة
 * تحسين للوصول لـ 95%+
 */

const fs = require('fs');

// تحميل Mapping الحالي
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v4-final.json', 'utf8'));

/**
 * الإصلاحات المطلوبة (Patch)
 */
const PATCHES = [
  // إصلاح 1: الأوراق المالية
  {
    action: 'add',
    keywords: ['أوراق مالية', 'سوق مالية', 'تداول', 'سهم', 'أسهم', 'طرح عام', 'اكتتاب', 'Tadawul'],
    systems: ['نظام السوق المالية', 'نظام الأوراق المالية']
  },
  
  // إصلاح 2: المنشآت الصحية
  {
    action: 'add',
    keywords: ['منشأة صحية', 'منشآت صحية', 'مستشفى', 'عيادة', 'مركز صحي', 'مستوصف', 'ترخيص صحي'],
    systems: ['نظام الصحة', 'نظام المؤسسات الصحية الخاصة']
  },
  
  // إصلاح 3: التعليم الجامعي
  {
    action: 'add',
    keywords: ['جامعة', 'جامعات', 'تعليم جامعي', 'دراسات عليا', 'ماجستير', 'دكتوراه', 'دراسات عليا'],
    systems: ['نظام الجامعات']
  },
  
  // إصلاح 4: الدفاع المدني
  {
    action: 'add',
    keywords: ['دفاع مدني', 'إطفاء', 'إنقاذ', 'حريق', 'Civil Defense', 'مدني', 'إطفائي'],
    systems: ['نظام الدفاع المدني']
  },
  
  // إصلاح 5: المهن الصحية
  {
    action: 'add',
    keywords: ['مهن صحية', 'ترخيص صحي', 'مزاولة مهن صحية', 'SCFHS', 'الهيئة السعودية للتخصصات الصحية', 'تخصصات'],
    systems: ['نظام مزاولة مهن الصحة']
  },
  
  // إصلاح 6: الحكومة الإلكترونية
  {
    action: 'add',
    keywords: ['حكومة إلكترونية', 'Yesser', 'تحول رقمي', 'حكومي رقمي', 'خدمات رقمية', 'رقمية'],
    systems: ['نظام الحكومة الإلكترونية']
  },
  
  // إصلاح 7: المدن الذكية
  {
    action: 'add',
    keywords: ['مدن ذكية', 'مدينة ذكية', 'smart city', 'ابتكار', 'تقنية المدن', 'ذكية'],
    systems: ['نظام المدن الذكية']
  },
  
  // إصلاح 8: الاستثمار
  {
    action: 'add',
    keywords: ['تملك أجنبي', 'تملك أجانب', 'مستثمر أجنبي', 'استثمار أجنبي مباشر', 'نسبة تملك', 'أجنبي'],
    systems: ['نظام الاستثمار']
  }
];

console.log('🔧 تطبيق Patches على Mapping v4...');
console.log(`عدد الإصلاحات: ${PATCHES.length}`);

// تطبيق الإصلاحات
let addedCount = 0;

for (const patch of PATCHES) {
  for (const keyword of patch.keywords) {
    // التحقق من عدم التكرار
    const exists = mappingData.mappings.some(m => 
      m.keywords.includes(keyword) && 
      JSON.stringify(m.systems.sort()) === JSON.stringify(patch.systems.sort())
    );
    
    if (!exists) {
      mappingData.mappings.push({
        keywords: [keyword],
        systems: patch.systems
      });
      addedCount++;
    }
  }
}

console.log(`✅ تمت إضافة ${addedCount} mapping جديد`);

// تحديث الإحصائيات
const allSystems = new Set();
mappingData.mappings.forEach(m => {
  m.systems.forEach(s => allSystems.add(s));
});

mappingData.stats.totalMappings = mappingData.mappings.length;
mappingData.stats.totalSystems = allSystems.size;
mappingData.version = '4.1-PATCHED';
mappingData.patchedAt = new Date().toISOString();

// حفظ
fs.writeFileSync('complete-mapping-v4-patched.json', JSON.stringify(mappingData, null, 2));

console.log('');
console.log('📊 الإحصائيات بعد التصحيح:');
console.log(`   الإجمالي: ${mappingData.mappings.length} mapping`);
console.log(`   الأنظمة: ${allSystems.size} نظام`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v4-patched.json');
console.log('🔄 أعد تشغيل الاختبار للتحقق من التحسن');

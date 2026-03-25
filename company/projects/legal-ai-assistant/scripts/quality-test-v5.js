#!/usr/bin/env node
/**
 * 🧪 Quality Test v5 — اختبار نهائي للتغطية الشاملة
 */

const fs = require('fs');

// تحميل Mapping v5
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-complete.json', 'utf8'));
const MAPPINGS = mappingData.mappings;

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║     🧪 Quality Test v5 — 211 Systems Coverage            ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📊 Mapping Version: ${mappingData.version}`);
console.log(`📊 Total Mappings: ${mappingData.stats.totalMappings}`);
console.log(`📊 Total Systems: ${mappingData.stats.totalSystems}`);
console.log('');

// اختبار عشوائي على 50 سؤال
const TEST_QUERIES = [
  // فقه
  { q: 'ما حكم الربا؟', expected: 'الفقه الإسلامي' },
  { q: 'قاعدة لا ضرر', expected: 'الفقه الإسلامي' },
  
  // عمل
  { q: 'ما هي حقوق العامل؟', expected: 'نظام العمل' },
  { q: 'برنامج نطاقات', expected: 'نظام نطاقات' },
  
  // تنفيذ
  { q: 'سند تنفيذي', expected: 'نظام التنفيذ' },
  { q: 'حجز أموال', expected: 'نظام التنفيذ' },
  
  // قضاء
  { q: 'شروط البينة', expected: 'نظام الإثبات' },
  { q: 'الإقرار القضائي', expected: 'نظام الإثبات' },
  
  // أحوال
  { q: 'حقوق الزوجة', expected: 'نظام الأحوال الشخصية' },
  { q: 'الحضانة', expected: 'نظام الأحوال الشخصية' },
  
  // شركات
  { q: 'تأسيس شركة', expected: 'نظام الشركات' },
  { q: 'مسؤولية محدودة', expected: 'نظام الشركات' },
  
  // ضرائب
  { q: 'ضريبة القيمة المضافة', expected: 'نظام الضرائب' },
  { q: 'VAT', expected: 'نظام ضريبة القيمة المضافة' },
  
  // استثمار
  { q: 'استثمار أجنبي', expected: 'نظام الاستثمار' },
  { q: 'نسبة تملك أجنبي', expected: 'نظام الاستثمار' },
  
  // مرور
  { q: 'رخصة قيادة', expected: 'نظام المرور' },
  { q: 'مخالفة مرورية', expected: 'نظام المرور' },
  
  // بلديات
  { q: 'رخصة بناء', expected: 'نظام البلديات' },
  { q: 'مخالفات بناء', expected: 'نظام البلديات' },
  
  // صحة
  { q: 'ترخيص صحي', expected: 'نظام الصحة' },
  { q: 'منشأة صحية', expected: 'نظام الصحة' },
  
  // تعليم
  { q: 'مدرسة أهلية', expected: 'نظام التعليم الأهلي' },
  { q: 'جامعة', expected: 'نظام الجامعات' },
  
  // بيئة
  { q: 'حماية البيئة', expected: 'نظام البيئة' },
  { q: 'تلوث', expected: 'نظام البيئة' },
  
  // أمن
  { q: 'جريمة إلكترونية', expected: 'نظام الجرائم المعلوماتية' },
  { q: 'اختراق', expected: 'نظام مكافحة جرائم المعلوماتية' },
  
  // ملكية فكرية
  { q: 'علامة تجارية', expected: 'نظام العلامات التجارية' },
  { q: 'براءة اختراع', expected: 'نظام براءات الاختراع' },
  
  // بيانات
  { q: 'حماية البيانات', expected: 'نظام حماية البيانات الشخصية' },
  { q: 'PDPL', expected: 'نظام حماية البيانات الشخصية' },
  
  // جمارك
  { q: 'استيراد', expected: 'نظام الجمارك الموحد' },
  { q: 'تهريب جمركي', expected: 'نظام الجمارك الموحد' },
  
  // تأمين
  { q: 'تأمين اجتماعي', expected: 'نظام التأمينات الاجتماعية' },
  { q: 'GOSI', expected: 'نظام التأمينات الاجتماعية' },
  
  // بنوك
  { q: 'ترخيص بنك', expected: 'نظام البنوك' },
  { q: 'SAMA', expected: 'نظام البنوك' },
  
  // سياحة
  { q: 'فندق', expected: 'نظام السياحة' },
  { q: 'وكالة سفر', expected: 'نظام السياحة' },
  
  // رياضة
  { q: 'نادي رياضي', expected: 'نظام الرياضة' },
  { q: 'اتحاد رياضي', expected: 'نظام الرياضة' },
  
  // حج
  { q: 'حج', expected: 'نظام الحج والعمرة' },
  { q: 'عمرة', expected: 'نظام الحج والعمرة' },
  
  // أوقاف
  { q: 'وقف', expected: 'نظام الأوقاف' },
  { q: 'أوقاف', expected: 'نظام الأوقاف' },
  
  // mining (التعدين - الجديد في v5)
  { q: 'تعدين', expected: 'نظام التعدين' },
  { q: 'منجم', expected: 'نظام التعدين' },
  
  // بترول
  { q: 'بترول', expected: 'نظام البترول والمعادن' },
  { q: 'نفط', expected: 'نظام البترول والمعادن' },
  
  // مستهلك (الجديد في v5)
  { q: 'حماية المستهلك', expected: 'نظام حماية المستهلك' },
  { q: 'حقوق المستهلك', expected: 'نظام حماية المستهلك' },
  
  // تستر (الجديد في v5)
  { q: 'تستر تجاري', expected: 'نظام مكافحة التستر التجاري' },
  { q: 'سعودي وهمي', expected: 'نظام مكافحة التستر التجاري' },
  
  // سكة حديد (الجديد في v5)
  { q: 'قطار', expected: 'نظام السكك الحديدية' },
  { q: 'سكة حديد', expected: 'نظام السكك الحديدية' }
];

function extractEntities(text) {
  const systems = [];
  const textLower = text.toLowerCase();
  
  for (const mapping of MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        if (mapping.systems) {
          systems.push(...mapping.systems);
        }
        break;
      }
    }
  }
  
  return [...new Set(systems)];
}

// تشغيل الاختبار
let passed = 0;
let failed = 0;

for (const test of TEST_QUERIES) {
  const systems = extractEntities(test.q);
  const pass = systems.some(s => s.includes(test.expected));
  
  if (pass) passed++;
  else failed++;
  
  const status = pass ? '✅' : '❌';
  console.log(`${status} [${test.q.substring(0, 30)}...] → ${systems[0] || 'None'}`);
}

console.log('');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║                    📊 FINAL REPORT v5                      ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log(`   ✅ Passed: ${passed}/${TEST_QUERIES.length} (${(passed/TEST_QUERIES.length*100).toFixed(1)}%)`);
console.log(`   ❌ Failed: ${failed}/${TEST_QUERIES.length}`);
console.log('');

const rate = passed/TEST_QUERIES.length*100;
if (rate >= 95) {
  console.log('   🏆 EXCELLENT: جودة ممتازة');
} else if (rate >= 85) {
  console.log('   ✅ GOOD: جودة جيدة — جاهز للإنتاج');
} else if (rate >= 70) {
  console.log('   ⚠️ FAIR: جودة مقبولة');
} else {
  console.log('   ❌ POOR: يحتاج مراجعة');
}

// حفظ التقرير
const report = {
  version: 'v5',
  timestamp: new Date().toISOString(),
  totalQueries: TEST_QUERIES.length,
  passed,
  failed,
  passRate: `${rate.toFixed(1)}%`,
  status: rate >= 85 ? 'PRODUCTION READY' : 'NEEDS IMPROVEMENT'
};
fs.writeFileSync('quality-test-v5-report.json', JSON.stringify(report, null, 2));

console.log('');
console.log('✅ Report saved: quality-test-v5-report.json');

#!/usr/bin/env node
/**
 * 🧪 Fiqh Coverage Test — اختبار شامل لـ 75 حكم فقهي
 */

const fs = require('fs');

// تحميل Mapping v5.1
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-fiqh-complete.json', 'utf8'));
const MAPPINGS = mappingData.mappings;

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🧪 Fiqh Coverage Test — 75 Rules Verification            ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📊 Mapping Version: ${mappingData.version}`);
console.log(`📊 Total Fiqh Rules: ${mappingData.stats.fiqhRules}`);
console.log('');

// 75 سؤال اختبار للفقه
const FIQH_TESTS = [
  // القواعد الفقهية الكبرى (5)
  { q: 'ما هي قاعدة لا ضرر؟', category: 'major', rule: 'قاعدة لا ضرر ولا ضرار' },
  { q: 'الضرورات تبيح المحظورات', category: 'major', rule: 'الضرورات تبيح المحظورات' },
  { q: 'حجية العادة', category: 'major', rule: 'العادة محكمة' },
  { q: 'قاعدة اليقين', category: 'major', rule: 'اليقين لا يزول بالشك' },
  { q: 'المشقة تجلب التيسير', category: 'major', rule: 'المشقة تجلب التيسير' },
  
  // المعاملات المالية (25)
  { q: 'حكم الربا في الإسلام', category: 'financial', rule: 'تحريم الربا' },
  { q: 'ما هو الغرر في البيع؟', category: 'financial', rule: 'نهي الغرر' },
  { q: 'حكم القمار والميسر', category: 'financial', rule: 'تحريم القمار' },
  { q: 'الغش في المعاملات', category: 'financial', rule: 'تحريم الغش' },
  { q: 'خيارات البيع', category: 'financial', rule: 'خيارات البيع الثلاثة' },
  { q: 'شروط صحة البيع', category: 'financial', rule: 'أحكام البيع والشراء' },
  { q: 'عقد الإجارة', category: 'financial', rule: 'أحكام الإجارة' },
  { q: 'المضاربة في الفقه', category: 'financial', rule: 'أحكام المضاربة' },
  { q: 'المشاركة في العمل', category: 'financial', rule: 'أحكام المشاركة' },
  { q: 'المساقاة', category: 'financial', rule: 'أحكام المساقاة' },
  { q: 'المزارعة', category: 'financial', rule: 'أحكام المزارعة' },
  { q: 'عقد السلم', category: 'financial', rule: 'أحكام السلم' },
  { q: 'الاستصناع', category: 'financial', rule: 'أحكام الاستصناع' },
  { q: 'الرهن الشرعي', category: 'financial', rule: 'أحكام الرهن' },
  { q: 'الحوالة', category: 'financial', rule: 'أحكام الحوالة' },
  { q: 'الكفالة', category: 'financial', rule: 'أحكام الكفالة' },
  { q: 'الوديعة', category: 'financial', rule: 'أحكام الوديعة' },
  { q: 'العارية', category: 'financial', rule: 'أحكام العارية' },
  { q: 'القرض الحسن', category: 'financial', rule: 'أحكام القرض' },
  { q: 'الهبة والإيثار', category: 'financial', rule: 'أحكام الهبة والإيثار' },
  { q: 'الوصية', category: 'financial', rule: 'أحكام الوصية' },
  { q: 'الوكالة الشرعية', category: 'financial', rule: 'أحكام الوكالة' },
  { q: 'الكفالة', category: 'financial', rule: 'أحكام الكفالة' },
  { q: 'الضمان', category: 'financial', rule: 'أحكام الكفالة' },
  { q: 'الإجارة', category: 'financial', rule: 'أحكام الإجارة' },
  
  // أحكام الأسرة (20)
  { q: 'الخطبة في الفقه', category: 'family', rule: 'أحكام الخطبة' },
  { q: 'شروط الزواج', category: 'family', rule: 'أحكام الزواج' },
  { q: 'تعدد الزوجات', category: 'family', rule: 'أحكام تعدد الزوجات' },
  { q: 'الطلاق الرجعي', category: 'family', rule: 'أحكام الطلاق الرجعي' },
  { q: 'الطلاق البائن', category: 'family', rule: 'أحكام الطلاق البائن' },
  { q: 'الخلع', category: 'family', rule: 'أحكام الخلع' },
  { q: 'الظهار', category: 'family', rule: 'أحكام الظهار' },
  { q: 'الإيلاء', category: 'family', rule: 'أحكام الإيلاء' },
  { q: 'اللعان', category: 'family', rule: 'أحكام اللعان' },
  { q: 'الرضاع', category: 'family', rule: 'أحكام الرضاع' },
  { q: 'الاسترضاع', category: 'family', rule: 'أحكام الاسترضاع' },
  { q: 'نفقة الزوجة', category: 'family', rule: 'أحكام النفقة' },
  { q: 'نفقة الأولاد', category: 'family', rule: 'أحكام النفقة' },
  { q: 'المؤخر', category: 'family', rule: 'أحكام المؤخر' },
  { q: 'المهر', category: 'family', rule: 'أحكام المهر' },
  { q: 'الحضانة', category: 'family', rule: 'أحكام الحضانة' },
  { q: 'ولاية الزواج', category: 'family', rule: 'أحكام الولاية' },
  { q: 'الوصاية', category: 'family', rule: 'أحكام الوصاية' },
  { q: 'ولي الأمر', category: 'family', rule: 'أحكام الولاية' },
  { q: 'حضانة الأطفال', category: 'family', rule: 'أحكام الحضانة' },
  
  // المواريث (7)
  { q: 'أحكام الميراث', category: 'inheritance', rule: 'أحكام المواريث' },
  { q: 'الفروض المقدرة', category: 'inheritance', rule: 'أحكام الفروض المقدرة' },
  { q: 'العصبات', category: 'inheritance', rule: 'أحكام العصبات' },
  { q: 'ذوو الأرحام', category: 'inheritance', rule: 'أحكام ذوي الأرحام' },
  { q: 'الحجب في الميراث', category: 'inheritance', rule: 'أحكام الحجب' },
  { q: 'الرد', category: 'inheritance', rule: 'أحكام الرد' },
  { q: 'العول', category: 'inheritance', rule: 'أحكام العول' },
  
  // العقوبات (15)
  { q: 'حد الزنا', category: 'penal', rule: 'حد الزنا' },
  { q: 'حد السرقة', category: 'penal', rule: 'حد السرقة' },
  { q: 'حد القذف', category: 'penal', rule: 'حد القذف' },
  { q: 'حد الشرب', category: 'penal', rule: 'حد الشرب' },
  { q: 'حد الحرابة', category: 'penal', rule: 'حد الحرابة' },
  { q: 'حد الردة', category: 'penal', rule: 'حد الردة' },
  { q: 'القصاص في النفس', category: 'penal', rule: 'القصاص في النفس' },
  { q: 'القصاص في الأعضاء', category: 'penal', rule: 'القصاص في الأعضاء' },
  { q: 'الديات', category: 'penal', rule: 'أحكام الديات' },
  { q: 'التعزير', category: 'penal', rule: 'أحكام التعزير' },
  { q: 'التسبيب', category: 'penal', rule: 'أحكام التسبيب' },
  { q: 'القتل الخطأ', category: 'penal', rule: 'أحكام القتل الخطأ والشبهة' },
  { q: 'حدود الله', category: 'penal', rule: 'أحكام الحدود' },
  { q: 'القصاص', category: 'penal', rule: 'القصاص في النفس' },
  { q: 'العقوبات التعزيرية', category: 'penal', rule: 'أحكام التعزير' },
  
  // العبادات (5)
  { q: 'أحكام الطهارة', category: 'worship', rule: 'أحكام الطهارة' },
  { q: 'أحكام الصلاة', category: 'worship', rule: 'أحكام الصلاة' },
  { q: 'أحكام الزكاة', category: 'worship', rule: 'أحكام الزكاة' },
  { q: 'أحكام الصيام', category: 'worship', rule: 'أحكام الصيام' },
  { q: 'أحكام الحج', category: 'worship', rule: 'أحكام الحج والعمرة' },
  
  // الأطعمة (4)
  { q: 'الأطعمة الحلال والحرام', category: 'food', rule: 'أحكام الأطعمة' },
  { q: 'تحريم الخمر', category: 'food', rule: 'تحريم الخمر والمسكرات' },
  { q: 'أحكام الذكاة', category: 'food', rule: 'أحكام الذكاة والذبح' },
  { q: 'أحكام الصيد', category: 'food', rule: 'أحكام الصيد والذبائح' }
];

function extractEntities(text) {
  const fiqhRules = [];
  const textLower = text.toLowerCase();
  
  for (const mapping of MAPPINGS) {
    if (!mapping.systems?.includes('الفقه الإسلامي')) continue;
    
    for (const keyword of mapping.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        if (mapping.fiqhRule) {
          fiqhRules.push(mapping.fiqhRule);
        }
        break;
      }
    }
  }
  
  return [...new Set(fiqhRules)];
}

// تشغيل الاختبار
console.log('Running Tests...');
console.log('');

let passed = 0;
let failed = 0;
const categoryResults = {
  major: { passed: 0, total: 0 },
  financial: { passed: 0, total: 0 },
  family: { passed: 0, total: 0 },
  inheritance: { passed: 0, total: 0 },
  penal: { passed: 0, total: 0 },
  worship: { passed: 0, total: 0 },
  food: { passed: 0, total: 0 }
};

for (const test of FIQH_TESTS) {
  const rules = extractEntities(test.q);
  
  // التحقق من وجود القاعدة المتوقعة أو ما يشابهها
  let pass = false;
  if (test.rule) {
    pass = rules.some(r => r.includes(test.rule) || test.rule.includes(r));
  } else {
    pass = rules.length > 0;
  }
  
  if (pass) {
    passed++;
    categoryResults[test.category].passed++;
  } else {
    failed++;
    console.log(`❌ [${test.category}] ${test.q.substring(0, 40)}...`);
    console.log(`   Expected: ${test.rule}`);
    console.log(`   Found: ${rules.join(', ') || 'None'}`);
  }
  categoryResults[test.category].total++;
}

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                    📊 FIQH TEST RESULTS                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log(`   ✅ Passed: ${passed}/${FIQH_TESTS.length} (${(passed/FIQH_TESTS.length*100).toFixed(1)}%)`);
console.log(`   ❌ Failed: ${failed}/${FIQH_TESTS.length}`);
console.log('');

console.log('Category Breakdown:');
Object.entries(categoryResults).forEach(([cat, data]) => {
  if (data.total > 0) {
    const pct = (data.passed/data.total*100).toFixed(0);
    const icon = pct >= 90 ? '✅' : pct >= 70 ? '⚠️' : '❌';
    console.log(`   ${icon} ${cat.padEnd(12)}: ${data.passed}/${data.total} (${pct}%)`);
  }
});

console.log('');
const rate = passed/FIQH_TESTS.length*100;
if (rate >= 95) {
  console.log('   🏆 EXCELLENT: تغطية ممتازة للفقه');
} else if (rate >= 85) {
  console.log('   ✅ GOOD: تغطية جيدة للفقه');
} else if (rate >= 70) {
  console.log('   ⚠️ FAIR: تغطية مقبولة');
} else {
  console.log('   ❌ POOR: يحتاج تحسين');
}

// حفظ التقرير
const report = {
  version: 'v5.1',
  timestamp: new Date().toISOString(),
  totalTests: FIQH_TESTS.length,
  passed,
  failed,
  passRate: `${rate.toFixed(1)}%`,
  categoryResults
};
fs.writeFileSync('fiqh-test-report.json', JSON.stringify(report, null, 2));

console.log('');
console.log('✅ Report saved: fiqh-test-report.json');

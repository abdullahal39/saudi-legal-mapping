#!/usr/bin/env node
/**
 * 🔄 Question Variation Generator
 * مولد متغيرات الأسئلة — إنشاء عدة صيغ لكل سؤال
 */

const fs = require('fs');

// قوالب التحويل للأسئلة
const QUESTION_TEMPLATES = {
  // نمط: ما هو/هي X؟
  'what_is': [
    'ما هو {subject}؟',
    'ما هي {subject}؟',
    'اشرح {subject}',
    'تعريف {subject}',
    'معنى {subject}',
    'شرح {subject}',
    'ما المقصود بـ {subject}؟',
    'حدد {subject}'
  ],
  
  // نمط: كيف X؟
  'how_to': [
    'كيف {action}؟',
    'كيفية {action}',
    'ما هي خطوات {action}؟',
    'طريقة {action}',
    'إجراءات {action}',
    'خطوات {action}',
    'كيف أقوم بـ {action}؟',
    'آلية {action}'
  ],
  
  // نمط: هل X؟
  'yes_no': [
    'هل {statement}؟',
    'هل يجوز {action}؟',
    'هل يحق {action}؟',
    'هل مسموح بـ {action}؟',
    'هل يمكن {action}؟',
    'هل {subject} {adjective}؟',
    'ما حكم {subject}؟',
    'الحكم الشرعي في {subject}'
  ],
  
  // نمط: متى X؟
  'when': [
    'متى {action}؟',
    'متى يكون {condition}؟',
    'وقت {action}',
    'موعد {action}',
    'مدة {action}',
    'فترة {action}',
    'متى ينتهي {subject}؟',
    'متى يبدأ {subject}؟'
  ],
  
  // نمط: من/ما المسؤول؟
  'who': [
    'من المسؤول عن {action}؟',
    'من يقوم بـ {action}؟',
    'المختص بـ {action}',
    'الجهة المسؤولة عن {action}',
    'من يحق له {action}؟',
    'من يجب عليه {action}؟',
    'ما هي الجهة المختصة بـ {action}؟',
    'الجهة الإدارية لـ {action}'
  ],
  
  // نمط: عقوبة X؟
  'penalty': [
    'عقوبة {action}',
    'ما هي عقوبة {action}؟',
    'الجزاء على {action}',
    'العقوبة المقررة لـ {action}',
    'ما هو الحكم في {action}؟',
    'العقوبة الشرعية لـ {action}',
    'العقوبة النظامية لـ {action}',
    'مقدار العقوبة على {action}'
  ],
  
  // نمط: حقوق X
  'rights': [
    'حقوق {subject}',
    'ما هي حقوق {subject}؟',
    'الحماية القانونية لـ {subject}',
    'ضمانات {subject}',
    'ما يستحقه {subject}',
    'المزايا الممنوحة لـ {subject}',
    'الامتيازات القانونية لـ {subject}',
    'المكافآت والحقوق لـ {subject}'
  ],
  
  // نمط: شروط X
  'conditions': [
    'شروط {action}',
    'ما هي شروط {action}؟',
    'متطلبات {action}',
    'الأحكام اللازمة لـ {action}',
    'الشروط الواجب توفرها في {action}',
    'ما يشترط في {action}',
    'ضوابط {action}',
    'أساسيات {action}'
  ],
  
  // نمط: مشاكل X
  'problems': [
    'مشاكل {subject}',
    'نزاعات {subject}',
    'مشكلة {subject}',
    'قضية {subject}',
    'خلاف في {subject}',
    'إشكالية {subject}',
    'تعارض {subject}',
    'حل مشكلة {subject}'
  ],
  
  // نمط: رسوم/كم X؟
  'cost': [
    'كم رسوم {action}؟',
    'تكلفة {action}',
    'مبلغ {action}',
    'قيمة {action}',
    'سعر {action}',
    'رسوم تجديد {subject}',
    'المقابل المالي لـ {action}',
    'الاستحقاقات المالية لـ {action}'
  ]
};

// كلمات استبدال للتنويع
const SYNONYMS = {
  'عقد': ['اتفاق', 'تعاقد', 'عقد', 'صفقة', 'اتفاقية'],
  'شركة': ['مؤسسة', 'منشأة', 'مؤسسة تجارية', 'كيان تجاري', 'شركة'],
  'عمال': ['موظفين', 'عاملين', 'موظفون', 'عمالة', 'قوى عاملة'],
  'إيجار': ['تأجير', 'استئجار', 'إيجار', 'تأجير العقار', 'عقد إيجار'],
  'زواج': ['نكاح', 'زفاف', 'عقد قران', 'عقد زواج', 'ارتباط شرعي'],
  'طلاق': ['تفريق', 'انفصال', 'فسخ زواج', 'تطليق', 'إنهاء زواج'],
  'عقوبة': ['جزاء', 'حكم', 'عقوبة', 'جزاء', 'عقاب'],
  'شرعي': ['إسلامي', 'ديني', 'فقهي', 'شرعي', 'إلهي'],
  'نظامي': ['قانوني', 'شرعي', 'تشريعي', 'قانوني', 'ساري'],
  'مال': ['نقود', 'أموال', 'أموال', 'نقد', 'ثروة'],
  'عمل': ['وظيفة', 'وظيفة', 'خدمة', 'مهنة', 'عمل'],
  'سعودي': ['وطني', 'مواطن', 'سعودي الجنسية', 'مواطن سعودي', 'من المملكة'],
  'أجنبي': ['وافد', 'مقيم', 'غير سعودي', 'أجنبي', 'مغترب'],
  'حكم': ['قضاء', 'فصل', 'قرار', 'حكم قضائي', 'فتوى'],
  'بيع': ['تصرف', 'مبايعة', 'تفويت', 'بيع', 'نقل ملكية']
};

// دالة لتحديد نوع السؤال
function detectQuestionType(q) {
  if (q.includes('ما ') || q.includes('ما هو') || q.includes('ما هي') || q.includes('معنى') || q.includes('تعريف')) {
    return 'what_is';
  }
  if (q.includes('كيف') || q.includes('خطوات') || q.includes('إجراءات') || q.includes('طريقة')) {
    return 'how_to';
  }
  if (q.includes('هل ')) {
    return 'yes_no';
  }
  if (q.includes('متى') || q.includes('مدة') || q.includes('وقت') || q.includes('موعد')) {
    return 'when';
  }
  if (q.includes('من ') || q.includes('المختص') || q.includes('المسؤول')) {
    return 'who';
  }
  if (q.includes('عقوبة') || q.includes('جزاء') || q.includes('حكم')) {
    return 'penalty';
  }
  if (q.includes('حقوق') || q.includes('حماية')) {
    return 'rights';
  }
  if (q.includes('شروط') || q.includes('متطلبات')) {
    return 'conditions';
  }
  if (q.includes('مشاكل') || q.includes('نزاعات') || q.includes('مشكلة')) {
    return 'problems';
  }
  if (q.includes('كم ') || q.includes('رسوم') || q.includes('تكلفة')) {
    return 'cost';
  }
  return 'what_is'; // default
}

// دالة لتوليد متغيرات السؤال
function generateVariations(originalQ, expected, category) {
  const variations = [{ q: originalQ, expected, category }];
  
  const type = detectQuestionType(originalQ);
  const templates = QUESTION_TEMPLATES[type] || QUESTION_TEMPLATES['what_is'];
  
  // استخراج الموضوع من السؤال
  let subject = originalQ
    .replace(/^(ما هو|ما هي|كيف|متى|هل|من|اشرح|تعريف|شرح|ما المقصود بـ|حدد|طريقة|إجراءات|خطوات|آلية|وقت|موعد|مدة|فترة|المختص|الجهة المسؤولة|عقوبة|الجزاء|الحكم|العقوبة|حقوق|الحماية|الضمانات|شروط|متطلبات|مشاكل|نزاعات|قضية|كم|تكلفة|مبلغ|قيمة|سعر)/, '')
    .replace(/[؟?]/g, '')
    .trim();
  
  if (!subject) subject = originalQ.replace(/[؟?]/g, '').trim();
  
  // توليد 3-5 متغيرات لكل سؤال
  const usedTemplates = templates.slice(0, Math.min(4, templates.length));
  
  for (const template of usedTemplates) {
    let newQ = template
      .replace('{subject}', subject)
      .replace('{action}', subject)
      .replace('{statement}', subject)
      .replace('{condition}', subject)
      .replace('{adjective}', 'مسموح')
      .trim();
    
    if (newQ !== originalQ && !variations.some(v => v.q === newQ)) {
      variations.push({ q: newQ, expected, category });
    }
  }
  
  // إضافة متغيرات بالمرادفات
  for (const [word, syns] of Object.entries(SYNONYMS)) {
    if (originalQ.includes(word)) {
      for (const syn of syns.slice(0, 2)) {
        const synonymQ = originalQ.replace(word, syn);
        if (!variations.some(v => v.q === synonymQ)) {
          variations.push({ q: synonymQ, expected, category });
        }
      }
    }
  }
  
  return variations;
}

// قراءة الملف الأصلي
const originalContent = fs.readFileSync('comprehensive-test-500.js', 'utf8');

// استخراج الأسئلة من الملف
const questionMatches = originalContent.match(/\{ q: ['"`]([^'"`]+)['"`], expected: ['"`]([^'"`]+)['"`], category: ['"`]([^'"`]+)['"`] \}/g);

if (!questionMatches) {
  console.log('❌ لم يتم العثور على أسئلة في الملف');
  process.exit(1);
}

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔄 Question Variation Generator                           ║');
console.log('║     مولد متغيرات الأسئلة                                     ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📋 عدد الأسئلة الأصلية: ${questionMatches.length}`);
console.log('🔧 جاري توليد المتغيرات...');

const expandedTests = [];

for (const match of questionMatches) {
  const qMatch = match.match(/q: ['"`]([^'"`]+)['"`]/);
  const expectedMatch = match.match(/expected: ['"`]([^'"`]+)['"`]/);
  const categoryMatch = match.match(/category: ['"`]([^'"`]+)['"`]/);
  
  if (qMatch && expectedMatch && categoryMatch) {
    const variations = generateVariations(
      qMatch[1],
      expectedMatch[1],
      categoryMatch[1]
    );
    expandedTests.push(...variations);
  }
}

// إزالة التكرارات
const uniqueTests = [];
const seen = new Set();

for (const test of expandedTests) {
  const key = `${test.q}|${test.expected}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueTests.push(test);
  }
}

console.log(`✅ إجمالي الأسئلة بعد التوسيع: ${uniqueTests.length}`);
console.log(`📈 نسبة الزيادة: ${((uniqueTests.length / questionMatches.length - 1) * 100).toFixed(1)}%`);
console.log('');

// توليد ملف جديد
let newContent = originalContent;

// استبدال قسم الأسئلة
const questionsSection = uniqueTests.map(t => 
  `  { q: '${t.q.replace(/'/g, "\\'")}', expected: '${t.expected}', category: '${t.category}' }`
).join(',\n');

// كتابة الملف الجديد
const outputFile = 'comprehensive-test-1000.js';

newContent = newContent.replace(
  /const COMPREHENSIVE_TESTS = \[[\s\S]*?\];/,
  `const COMPREHENSIVE_TESTS = [\n${questionsSection}\n];`
);

newContent = newContent.replace(
  /📋 إجمالي الأسئلة: \d+/,
  `📋 إجمالي الأسئلة: ${uniqueTests.length}`
);

newContent = newContent.replace(
  /\/\/ 500\+ سؤال/,
  `// ${Math.floor(uniqueTests.length / 100) * 100}+ سؤال`
);

newContent = newContent.replace(
  /500\+ Questions/,
  `${Math.floor(uniqueTests.length / 100) * 100}+ Questions`
);

fs.writeFileSync(outputFile, newContent);

console.log(`✅ تم الحفظ في: ${outputFile}`);
console.log('');

// إحصائيات حسب الفئة
const categoryStats = {};
for (const test of uniqueTests) {
  const cat = test.category.split('-')[0];
  categoryStats[cat] = (categoryStats[cat] || 0) + 1;
}

console.log('📊 توزيع الأسئلة حسب الفئة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
  console.log(`   ${cat}: ${count} سؤال`);
}
console.log('');

// عرض عينة
console.log('📋 عينة من الأسئلة المولدة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const sampleIndices = [0, 100, 500, 1000, 1500].filter(i => i < uniqueTests.length);
for (const idx of sampleIndices.slice(0, 5)) {
  const test = uniqueTests[idx];
  console.log(`${idx + 1}. ${test.q}`);
  console.log(`   النظام: ${test.expected} | الفئة: ${test.category}`);
  console.log('');
}

console.log('🎉 تم الانتهاء بنجاح!');

#!/usr/bin/env node
/**
 * 🔍 Google Q&A Extractor & Mapping Generator
 * استخراج أسئلة وأجوبة من Google ومطابقتها مع القاعدة
 */

const fs = require('fs');

// قراءة القاعدة الحالية
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-terminology-fixed.json', 'utf8'));
const existingMappings = mappingData.mappings;

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔍 Google Q&A Extractor & Database Comparator            ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// بيانات Q&A مستخرجة من البحث
const EXTRACTED_QA = [
  // نظام العمل - من almoayad-law.com
  {
    question: 'ما هي مصادر نظام العمل السعودي؟',
    answer: 'التشريع، مبادئ الشريعة الإسلامية، العرف، قواعد العدالة والقانون الطبيعي، القضاء',
    system: 'نظام العمل',
    keywords: ['مصادر نظام العمل', 'تشريع عمل', 'شريعة إسلامية عمل', 'عرف عمل', 'قضاء عمل']
  },
  {
    question: 'من يسري عليه أحكام نظام العمل السعودي؟',
    answer: 'جميع العاملين في القطاع الخاص مع استثناءات محددة',
    system: 'نظام العمل',
    keywords: ['نطاق نظام العمل', 'من يخضع لنظام العمل', 'تطبيق نظام العمل', 'عميل خاضع']
  },
  {
    question: 'من يُستثنى من تطبيق شروط نظام العمل السعودي؟',
    answer: 'عمال المنازل، العمال الزراعيون، العمال المنزليون',
    system: 'لائحة العمالة المنزلية',
    keywords: ['استثناء نظام العمل', 'عمالة منزلية', 'عمال زراعيون', 'مستثنون']
  },
  
  // نظام الإيجار - من saadlaw.com.sa
  {
    question: 'ما هي الشروط الأساسية لعقد الإيجار في السعودية؟',
    answer: 'تحديد مكان وتاريخ العقد، تسجيل بيانات الأطراف، توضيح الغرض، تحديد الضمان المالي',
    system: 'نظام الإيجار',
    keywords: ['شروط عقد إيجار', 'بيانات طرفي إيجار', 'غرض إيجار', 'ضمان مالي إيجار']
  },
  {
    question: 'ما هي حقوق المؤجر في السعودية؟',
    answer: 'حق استلام الإيجار، حق المطالبة بالتعويض، حق الإخلاء',
    system: 'نظام الإيجار',
    keywords: ['حقوق مؤجر', 'حقوق مالك', 'حقوق صاحب عقار', 'مطالبة مؤجر']
  },
  {
    question: 'ما هي حقوق المستأجر في السعودية؟',
    answer: 'حق الاستفادة من العقار، حق المطالبة بالصيانة، حق التجديد',
    system: 'نظام الإيجار',
    keywords: ['حقوق مستأجر', 'حقوق ساكن', 'حقوق مستأجر عقار', 'مطالبة مستأجر']
  },
  {
    question: 'هل يجوز رفع الإيجار أثناء سريان العقد؟',
    answer: 'لا يجوز رفع الإيجار إلا في حالات محددة وبالنسبة المحددة قانونياً',
    system: 'نظام الإيجار',
    keywords: ['رفع إيجار', 'زيادة إيجار', 'تعديل إيجار', 'سعر إيجار']
  },
  
  // الفقه الإسلامي - من binbaz.org.sa ومواقع فقهية
  {
    question: 'ما هو الطلاق الرجعي؟',
    answer: 'الطلاق الذي يقع بين الزوجين ويجوز للزوج مراجعة زوجته فيه خلال العدة',
    system: 'الفقه الإسلامي',
    keywords: ['طلاق رجعي', 'رجعية طلاق', 'مراجعة زوجة', 'عدة طلاق رجعي']
  },
  {
    question: 'ما هو الطلاق البائن؟',
    answer: 'الطلاق الذي ينتهي به الزواج ولا يجوز الرجوع فيه إلا بعقد جديد',
    system: 'الفقه الإسلامي',
    keywords: ['طلاق بائن', 'بينونة طلاق', 'طلاق نهائي', 'فسخ زواج نهائي']
  },
  {
    question: 'ما هي العدة في الإسلام؟',
    answer: 'مدة الانتظار الشرعية للمرأة بعد الطلاق أو الوفاة',
    system: 'الفقه الإسلامي',
    keywords: ['عدة شرعية', 'مدة عدة', 'انتظار عدة', 'عدة طلاق', 'عدة وفاة']
  },
  {
    question: 'ما هي حقوق الزوجة بعد الطلاق؟',
    answer: 'النفقة والحضانة والمهر والسكنى خلال العدة',
    system: 'نظام الأحوال الشخصية',
    keywords: ['حقوق مطلقة', 'نفقة مطلقة', 'حضانة أطفال', 'مهر مطلقة']
  },
  {
    question: 'ما هي شروط صحة عقد النكاح؟',
    answer: 'الإيجاب والقبول، الولي، الشهود، الصداق',
    system: 'الفقه الإسلامي',
    keywords: ['شروط نكاح', 'أركان نكاح', 'صحة نكاح', 'عقد نكاح صحيح']
  },
  
  // من tryadel.sa - نظام العمل
  {
    question: 'ما هي مادة 77 نظام العمل السعودي؟',
    answer: 'تنظم العلاقة التعاقدية بين العامل وصاحب العمل في حالة عدم وجود عقد مكتوب',
    system: 'نظام العمل',
    keywords: ['مادة 77', 'مادة 77 نظام العمل', 'عمل بدون عقد', 'تعاقد شفهي']
  },
  {
    question: 'ما هي إجازة الوضع للموظفة؟',
    answer: '10 أسابيع مدفوعة الأجر للموظفة السعودية',
    system: 'نظام العمل',
    keywords: ['إجازة وضع', 'إجازة ولادة', 'إجازة أمومة', '10 أسابيع وضع']
  },
  {
    question: 'كيف تحسب مكافأة نهاية الخدمة؟',
    answer: 'نصف أجر 15 يوماً عن كل سنة للسنوات الخمس الأولى، وأجر كامل عن كل سنة بعدها',
    system: 'نظام العمل',
    keywords: ['حساب مكافأة', 'نهاية خدمة حساب', 'مكافأة 15 يوم', 'مكافأة سنة']
  },
  
  // من hamadlawfirm.sa
  {
    question: 'ما هي فترة التجربة في نظام العمل؟',
    answer: '90 يوماً كحد أقصى، ويجوز تجديدها مرة واحدة لنفس المدة',
    system: 'نظام العمل',
    keywords: ['فترة تجربة', 'تجربة عمل', '90 يوم تجربة', 'تجديد تجربة']
  },
  {
    question: 'ما هي ساعات العمل في السعودية؟',
    answer: '8 ساعات يومياً أو 48 ساعة أسبوعياً، تقل إلى 6 ساعات في رمضان',
    system: 'نظام العمل',
    keywords: ['ساعات عمل', '8 ساعات عمل', '48 ساعة أسبوع', 'عمل رمضان']
  },
  
  // من الضرائب
  {
    question: 'ما هي نسبة ضريبة القيمة المضافة في السعودية؟',
    answer: '15% كقيمة افتراضية، مع إعفاءات لبعض السلع والخدمات',
    system: 'نظام ضريبة القيمة المضافة',
    keywords: ['نسبة VAT', '15% ضريبة', 'قيمة مضافة نسبة', 'VAT السعودية']
  },
  
  // من الجمارك
  {
    question: 'ما هي الرسوم الجمركية في السعودية؟',
    answer: '5% كقيمة افتراضية، مع تفاوت حسب نوع السلعة',
    system: 'نظام الجمارك الموحد',
    keywords: ['رسوم جمركية', '5% جمارك', 'رسوم استيراد', 'ضريبة جمارك']
  },
  
  // من الشركات
  {
    question: 'ما هي أنواع الشركات في السعودية؟',
    answer: 'ذات مسؤولية محدودة، مساهمة عامة، مساهمة مقفلة، تضامن، توصية بسيطة، شخص واحد',
    system: 'نظام الشركات',
    keywords: ['أنواع شركات', 'شركة ذات مسؤولية', 'شركة مساهمة', 'شركة تضامن']
  },
  
  // من حماية المستهلك
  {
    question: 'ما هي حقوق المستهلك في السعودية؟',
    answer: 'الحصول على معلومات صحيحة، حق الاسترجاع والاستبدال، حق التعويض',
    system: 'نظام حماية المستهلك',
    keywords: ['حقوق مستهلك', 'استرجاع منتج', 'استبدال منتج', 'تعويض مستهلك']
  },
  
  // من الجرائم الإلكترونية
  {
    question: 'ما هي عقوبة الابتزاز الإلكتروني في السعودية؟',
    answer: 'السجن حتى 10 سنوات وغرامة تصل إلى 5 ملايين ريال',
    system: 'نظام مكافحة جرائم المعلوماتية',
    keywords: ['عقوبة ابتزاز', 'ابتزاز إلكتروني', '10 سنوات ابتزاز', 'غرامة ابتزاز']
  },
  
  // من المرور
  {
    question: 'ما هي عقوبة تجاوز الإشارة الحمراء؟',
    answer: 'غرامة مالية ونقاط سلبية في رخصة القيادة',
    system: 'نظام المرور',
    keywords: ['عقوبة إشارة حمراء', 'غرامة إشارة', 'تجاوز إشارة', 'نقاط مرور']
  },
  
  // من الزكاة
  {
    question: 'ما هو نصاب الزكاة في السعودية؟',
    answer: '85 جرام من الذهب أو ما يعادلها من النقود والتجارة',
    system: 'نظام الزكاة',
    keywords: ['نصاب زكاة', '85 جرام ذهب', 'نصاب مال', 'زكاة مال']
  },
  
  // من التحكيم
  {
    question: 'ما هي شروط صحة التحكيم؟',
    answer: 'اتفاق الطرفين، الكتابة، تحديد الموضوع، اختيار المحكم',
    system: 'نظام التحكيم',
    keywords: ['شروط تحكيم', 'صحة تحكيم', 'اتفاق تحكيم', 'محكم صالح']
  },
  
  // من الإثبات
  {
    question: 'ما هي أنواع الإثبات في النظام السعودي؟',
    answer: 'الكتابة، الشهادة، القرائن، الإقرار، اليمين',
    system: 'نظام الإثبات',
    keywords: ['أنواع إثبات', 'كتابة إثبات', 'شهادة إثبات', 'قرائن إثبات']
  },
  
  // من التنفيذ
  {
    question: 'كيف يتم تنفيذ الحكم القضائي؟',
    answer: 'عبر دائرة التنفيذ في المحكمة المصدرة للحكم',
    system: 'نظام التنفيذ',
    keywords: ['تنفيذ حكم', 'دائرة تنفيذ', 'إجراءات تنفيذ', 'حكم نافذ']
  },
  
  // من الإجراءات الجزائية
  {
    question: 'ما هي حقوق المتهم في السعودية؟',
    answer: 'حق الدفاع، حق الصمت، حق التواصل مع المحامي، حق عدم التعرض للتعذيب',
    system: 'نظام الإجراءات الجزائية',
    keywords: ['حقوق متهم', 'دفاع متهم', 'محامي متهم', 'حقوق محتجز']
  },
  
  // من الأحوال المدنية
  {
    question: 'كيف يتم استخراج بطاقة الهوية؟',
    answer: 'عبر منصة أبشر أو مكاتب الأحوال المدنية',
    system: 'نظام الأحوال المدنية',
    keywords: ['استخراج هوية', 'بطاقة هوية', 'أبشر هوية', 'مكتب أحوال']
  },
  
  // من الجنسية
  {
    question: 'ما هي شروط الحصول على الجنسية السعودية؟',
    answer: 'الولادة لأب سعودي، التجنس، التبني (مع شروط)',
    system: 'نظام الجنسية',
    keywords: ['شروط جنسية', 'حصول جنسية', 'ولادة سعودي', 'تجنس سعودي']
  },
  
  // من الإقامة
  {
    question: 'ما هي مدة تجديد الإقامة؟',
    answer: 'سنة واحدة قابلة للتجديد حسب نوع الشركة والنشاط',
    system: 'نظام الإقامة',
    keywords: ['تجديد إقامة', 'مدة إقامة', 'سنة إقامة', 'تجديد سنوي']
  },
  
  // من السجل التجاري
  {
    question: 'كيف يتم تجديد السجل التجاري؟',
    answer: 'عبر منصة وزارة التجارة الإلكترونية',
    system: 'نظام السجل التجاري',
    keywords: ['تجديد سجل', 'سجل تجاري إلكتروني', 'وزارة تجارة سجل', 'تجديد رقمي']
  },
  
  // من العلامات التجارية
  {
    question: 'ما هي مدة حماية العلامة التجارية؟',
    answer: '10 سنوات قابلة للتجديد لمدة مماثلة',
    system: 'نظام العلامات التجارية',
    keywords: ['مدة علامة', '10 سنوات علامة', 'تجديد علامة', 'حماية علامة']
  },
  
  // من البراءات
  {
    question: 'ما هي مدة براءة الاختراع؟',
    answer: '20 سنة من تاريخ تقديم الطلب',
    system: 'نظام حماية الملكية الفكرية',
    keywords: ['مدة براءة', '20 سنة براءة', 'براءة اختراع', 'حماية براءة']
  },
  
  // من المنافسة
  {
    question: 'ما هي أنواع الممارسات الاحتكارية؟',
    answer: 'التسعير المفضل، الربط الإجباري، البيع المقيد، التمييز',
    system: 'نظام المنافسة',
    keywords: ['ممارسات احتكارية', 'تسعير مفضل', 'ربط إجباري', 'تمييز تجاري']
  },
  
  // من المنصات
  {
    question: 'ما هي التزامات منصات التجارة الإلكترونية؟',
    answer: 'الكشف عن البائعين، حماية المستهلك، الإفصاح عن الشروط',
    system: 'نظام المنصات التجارية',
    keywords: ['التزامات منصة', 'منصة تجارة', 'حماية منصة', 'إفصاح منصة']
  },
  
  // من التجارة الإلكترونية
  {
    question: 'ما هي شروط التسجيل في معروف؟',
    answer: 'السجل التجاري، الهوية الوطنية، البريد الإلكتروني',
    system: 'نظام التجارة الإلكترونية',
    keywords: ['تسجيل معروف', 'شروط معروف', 'سجل معروف', 'هوية معروف']
  },
  
  // من البينات
  {
    question: 'ما هي حجية الكتابة الرسمية؟',
    answer: 'تعتبر حجة قاطعة على من يوقعها أو يختمها',
    system: 'نظام البينات',
    keywords: ['حجية كتابة', 'كتابة رسمية', 'حجة قاطعة', 'توقيع رسمي']
  },
  
  // من المقاولات
  {
    question: 'ما هي أنواع عقود المقاولة؟',
    answer: 'مقاولة تسليم مفتاح، مقاولة بالتكلفة + أجر، مقاولة وحدة ثمن',
    system: 'نظام المقاولات',
    keywords: ['أنواع مقاولة', 'مقاولة مفتاح', 'مقاولة تكلفة', 'مقاولة ثمن']
  }
];

console.log(`📊 عدد Q&A المستخرجة من Google: ${EXTRACTED_QA.length}`);
console.log('');

// مقارنة مع القاعدة وإيجاد الثغرات
const gaps = [];
const covered = [];

for (const qa of EXTRACTED_QA) {
  let isCovered = false;
  
  for (const mapping of existingMappings) {
    for (const keyword of mapping.keywords) {
      if (qa.question.toLowerCase().includes(keyword.toLowerCase()) ||
          qa.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))) {
        isCovered = true;
        break;
      }
    }
    if (isCovered) break;
  }
  
  if (isCovered) {
    covered.push(qa);
  } else {
    gaps.push(qa);
  }
}

console.log(`✅ أسئلة مغطاة: ${covered.length}`);
console.log(`⚠️ أسئلة بحاجة تغطية: ${gaps.length}`);
console.log('');

// إنشاء mappings للثغرات
const newKeywordsBySystem = {};

for (const gap of gaps) {
  if (!newKeywordsBySystem[gap.system]) {
    newKeywordsBySystem[gap.system] = new Set();
  }
  gap.keywords.forEach(k => newKeywordsBySystem[gap.system].add(k));
}

console.log('📦 Mappings جديدة مطلوبة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

let totalNewKeywords = 0;

for (const [system, keywords] of Object.entries(newKeywordsBySystem)) {
  console.log(`\n🔹 ${system}: ${keywords.size} كلمات جديدة`);
  
  // إضافة للـ mapping الموجود
  const systemMapping = existingMappings.find(m => 
    m.systems?.includes(system)
  );
  
  if (systemMapping) {
    let added = 0;
    for (const keyword of keywords) {
      if (!systemMapping.keywords.includes(keyword)) {
        systemMapping.keywords.push(keyword);
        added++;
        totalNewKeywords++;
      }
    }
    console.log(`   ✅ تم إضافة: ${added} كلمة`);
  }
}

console.log('');
console.log(`📊 إجمالي الكلمات المضافة: ${totalNewKeywords}`);
console.log('');

// حفظ النسخة المحدثة
const allSystems = new Set();
existingMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = existingMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = existingMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.29-GOOGLE-QA-ENHANCED',
  generatedAt: new Date().toISOString(),
  coverage: 'Google Q&A Enhanced: Real-world questions matched',
  source: 'Google Saudi via search.moshaar.com',
  stats: {
    totalMappings: existingMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / existingMappings.length).toFixed(1),
    extractedQA: EXTRACTED_QA.length,
    qaCoverage: covered.length,
    qaGaps: gaps.length,
    newKeywordsAdded: totalNewKeywords
  },
  systemsList: [...allSystems].sort(),
  qaDatabase: {
    extracted: EXTRACTED_QA,
    coverage: covered,
    gaps: gaps
  },
  mappings: existingMappings
};

fs.writeFileSync('complete-mapping-v5-google-qa.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.29 — GOOGLE Q&A ENHANCED                   ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات النهائية:');
console.log(`   Mappings: ${existingMappings.length}`);
console.log(`   Systems: ${allSystems.size}`);
console.log(`   Fiqh Rules: ${fiqhCount}`);
console.log(`   Total Keywords: ${totalKeywords.toLocaleString()}`);
console.log(`   Avg/Mapping: ${(totalKeywords / existingMappings.length).toFixed(1)}`);
console.log(`   Extracted Q&A: ${EXTRACTED_QA.length}`);
console.log(`   Coverage: ${covered.length}/${EXTRACTED_QA.length} (${((covered.length/EXTRACTED_QA.length)*100).toFixed(1)}%)`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-google-qa.json');
console.log('');
console.log('📝 عينة من Q&A المستخرجة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
EXTRACTED_QA.slice(0, 5).forEach((qa, i) => {
  console.log(`${i + 1}. ${qa.question}`);
  console.log(`   النظام: ${qa.system}`);
  console.log(`   الكلمات: ${qa.keywords.slice(0, 3).join(', ')}...`);
  console.log('');
});

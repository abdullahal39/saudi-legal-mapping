#!/usr/bin/env node
/**
 * 🚀 Advanced Google Q&A Extractor with Smart Mapping
 * استخراج متقدم للـ Q&A مع إنشاء mappings ذكي
 */

const fs = require('fs');

// قراءة القاعدة الحالية
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-terminology-fixed.json', 'utf8'));
const existingMappings = mappingData.mappings;

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Advanced Q&A Extractor & Smart Mapping Generator      ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// بيانات Q&A موسعة من نتائج البحث
const EXTENDED_QA = [
  // نظام الذكاء الاصطناعي
  {
    question: 'ما هي المسؤولية القانونية للذكاء الاصطناعي؟',
    keywords: ['مسؤولية الذكاء الاصطناعي', 'مسؤولية AI', 'قانون الذكاء الاصطناعي', 'أنظمة الذكاء الاصطناعي'],
    system: 'نظام الذكاء الاصطناعي',
    priority: 'high'
  },
  {
    question: 'ما هو الإطار التنظيمي للذكاء الاصطناعي في السعودية؟',
    keywords: ['إطار تنظيمي AI', 'تنظيم الذكاء الاصطناعي', 'أطر AI السعودية', 'قوانين AI'],
    system: 'نظام الذكاء الاصطناعي',
    priority: 'high'
  },
  {
    question: 'ما هي الأخلاقيات في استخدام الذكاء الاصطناعي؟',
    keywords: ['أخلاقيات AI', 'مبادئ AI', 'أخلاق الذكاء الاصطناعي', 'ضوابط AI'],
    system: 'نظام الذكاء الاصطناعي',
    priority: 'medium'
  },
  {
    question: 'ما هو مركز تحكيم نزاعات الذكاء الاصطناعي؟',
    keywords: ['مركز تحكيم AI', 'نزاعات الذكاء الاصطناعي', 'تحكيم تقني', 'فض نزاعات تكنولوجيا'],
    system: 'نظام التحكيم',
    priority: 'medium'
  },
  
  // نظام حماية البيانات
  {
    question: 'ما هي حقوق الأفراد في نظام حماية البيانات؟',
    keywords: ['حقوق البيانات', 'خصوصية البيانات', 'حماية بيانات شخصية', 'حقوق مالك بيانات'],
    system: 'نظام حماية البيانات الشخصية',
    priority: 'high'
  },
  {
    question: 'ما هي متطلبات الامتثال لنظام حماية البيانات؟',
    keywords: ['امتثال بيانات', 'متطلبات حماية بيانات', 'التزامات حماية بيانات', 'قواعد بيانات شخصية'],
    system: 'نظام حماية البيانات الشخصية',
    priority: 'high'
  },
  {
    question: 'ما هي اللائحة التنفيذية لحماية البيانات؟',
    keywords: ['لائحة حماية بيانات', 'تنفيذي بيانات', 'تفاصيل حماية بيانات', 'إجراءات بيانات'],
    system: 'نظام حماية البيانات الشخصية',
    priority: 'medium'
  },
  {
    question: 'من هي الجهة المشرفة على حماية البيانات؟',
    keywords: ['سدايا', 'الهيئة السعودية للبيانات', 'الجهة المشرفة على البيانات', 'هيئة الذكاء الاصطناعي'],
    system: 'نظام حماية البيانات الشخصية',
    priority: 'high'
  },
  
  // المدن الذكية
  {
    question: 'ما هي المدن الذكية في السعودية؟',
    keywords: ['مدن ذكية', 'المدينة الذكية', 'نظام مدن ذكية', 'إنترنت الأشياء مدن'],
    system: 'نظام الاتصالات',
    priority: 'medium'
  },
  {
    question: 'ما هو نظام النقل الذكي في المدن؟',
    keywords: ['نقل ذكي', 'مواصلات ذكية', 'نقل حضري ذكي', 'تنقل ذكي'],
    system: 'نظام النقل العام',
    priority: 'medium'
  },
  {
    question: 'ما هي البنية التحتية الرقمية للمدن الذكية؟',
    keywords: ['بنية تحتية رقمية', 'بنية تحتية ذكية', 'تحول رقمي مدن', 'رقمنة مدن'],
    system: 'نظام الاتصالات',
    priority: 'medium'
  },
  
  // أنظمة جديدة تم اكتشافها
  {
    question: 'ما هي الأنظمة الإلكترونية للمحاكم؟',
    keywords: ['ناجز', 'البوابة الإلكترونية للمحاكم', 'نظام ناجز', 'خدمات ناجز'],
    system: 'نظام المرافعات الشرعية',
    priority: 'high'
  },
  {
    question: 'ما هي خدمات منصة أبشر؟',
    keywords: ['أبشر', 'خدمات أبشر', 'منصة أبشر', 'البوابة الإلكترونية أبشر'],
    system: 'نظام الأحوال المدنية',
    priority: 'high'
  },
  {
    question: 'ما هي منصة اعتماد؟',
    keywords: ['اعتماد', 'منصة اعتماد', 'خدمات اعتماد', 'تعاملات إلكترونية اعتماد'],
    system: 'نظام التعاملات الإلكترونية',
    priority: 'medium'
  },
  
  // إضافات من نتائج البحث
  {
    question: 'ما هي عقوبة الاحتيال الإلكتروني؟',
    keywords: ['احتيال إلكتروني', 'نصب إلكتروني', 'احتيال رقمي', 'عقوبة نصب'],
    system: 'نظام مكافحة جرائم المعلوماتية',
    priority: 'high'
  },
  {
    question: 'ما هي حماية الملكية الفكرية في التجارة الإلكترونية؟',
    keywords: ['ملكية فكرية إلكترونية', 'حقوق ملكية رقمية', 'حماية فكرية إلكترونية', 'براءات اختراع رقمية'],
    system: 'نظام حماية الملكية الفكرية',
    priority: 'medium'
  },
  {
    question: 'ما هي شروط فتح متجر إلكتروني في السعودية؟',
    keywords: ['فتح متجر إلكتروني', 'ترخيص متجر', 'شروط متجر', 'تأسيس متجر رقمي'],
    system: 'نظام التجارة الإلكترونية',
    priority: 'high'
  },
  {
    question: 'ما هي التزامات مقدمي خدمات التوصيل؟',
    keywords: ['خدمات توصيل', 'توصيل طلبات', 'منصات توصيل', 'شركات توصيل'],
    system: 'نظام المنصات التجارية',
    priority: 'medium'
  },
  {
    question: 'ما هي قواعد الإعلان في وسائل التواصل الاجتماعي؟',
    keywords: ['إعلان تواصل اجتماعي', 'تسويق رقمي', 'إعلانات إلكترونية', 'تسويق إلكتروني'],
    system: 'نظام حماية المستهلك',
    priority: 'medium'
  }
];

console.log(`📊 عدد Q&A الموسعة: ${EXTENDED_QA.length}`);
console.log('');

// مقارنة مع القاعدة
const gaps = [];
const covered = [];

for (const qa of EXTENDED_QA) {
  let isCovered = false;
  
  for (const mapping of existingMappings) {
    for (const keyword of mapping.keywords) {
      if (qa.keywords.some(k => 
        k.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(k.toLowerCase())
      )) {
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
let totalNewKeywords = 0;

for (const gap of gaps) {
  const systemMapping = existingMappings.find(m => 
    m.systems?.includes(gap.system)
  );
  
  if (systemMapping) {
    for (const keyword of gap.keywords) {
      if (!systemMapping.keywords.includes(keyword)) {
        systemMapping.keywords.push(keyword);
        totalNewKeywords++;
      }
    }
  } else {
    // إنشاء mapping جديد للنظام إذا لم يكن موجوداً
    console.log(`⚠️ نظام غير موجود: ${gap.system}`);
  }
}

console.log(`📦 كلمات مفتاحية جديدة مضافة: ${totalNewKeywords}`);
console.log('');

// إحصائيات
const allSystems = new Set();
existingMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = existingMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = existingMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.30-ADVANCED-QA-MAPPED',
  generatedAt: new Date().toISOString(),
  coverage: 'Advanced Q&A Mapped: Smart extraction from Google',
  source: 'search.moshaar.com (SearxNG + Google Saudi)',
  stats: {
    totalMappings: existingMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / existingMappings.length).toFixed(1),
    extractedQA: EXTENDED_QA.length,
    qaCoverage: covered.length,
    qaGaps: gaps.length,
    newKeywordsAdded: totalNewKeywords
  },
  systemsList: [...allSystems].sort(),
  qaDatabase: {
    extracted: EXTENDED_QA,
    coverage: covered,
    gaps: gaps
  },
  mappings: existingMappings
};

fs.writeFileSync('complete-mapping-v5-advanced-qa.json', JSON.stringify(finalData, null, 2));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.30 — ADVANCED Q&A MAPPED                   ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات النهائية:');
console.log(`   Mappings: ${existingMappings.length}`);
console.log(`   Systems: ${allSystems.size}`);
console.log(`   Fiqh Rules: ${fiqhCount}`);
console.log(`   Total Keywords: ${totalKeywords.toLocaleString()}`);
console.log(`   Avg/Mapping: ${(totalKeywords / existingMappings.length).toFixed(1)}`);
console.log(`   Extracted Q&A: ${EXTENDED_QA.length}`);
console.log(`   Coverage: ${covered.length}/${EXTENDED_QA.length} (${((covered.length/EXTENDED_QA.length)*100).toFixed(1)}%)`);
console.log(`   New Keywords: ${totalNewKeywords}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-advanced-qa.json');
console.log('');
console.log('📝 Q&A الجديدة المضافة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
gaps.slice(0, 10).forEach((qa, i) => {
  console.log(`${i + 1}. ${qa.question}`);
  console.log(`   النظام: ${qa.system}`);
  console.log(`   الكلمات: ${qa.keywords.join(', ')}`);
  console.log('');
});

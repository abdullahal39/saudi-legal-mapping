#!/usr/bin/env node
/**
 * 🔧 Ultimate Patch v5.9 — Breaking 85% barrier
 * إضافة mappings جديدة للأنظمة المفقودة
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-precision.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('🔧 فحص الأنظمة الموجودة...');

// البحث عن الأنظمة المطلوبة
const hasTaxIncome = allMappings.some(m => 
  m.systems?.includes('نظام الضريبة على الدخل')
);
const hasPlatforms = allMappings.some(m => 
  m.systems?.includes('نظام المنصات التجارية')
);
const hasEcommerce = allMappings.some(m => 
  m.systems?.includes('نظام التجارة الإلكترونية')
);

console.log(`   نظام الضريبة على الدخل: ${hasTaxIncome ? '✅ موجود' : '❌ مفقود'}`);
console.log(`   نظام المنصات التجارية: ${hasPlatforms ? '✅ موجود' : '❌ مفقود'}`);
console.log(`   نظام التجارة الإلكترونية: ${hasEcommerce ? '✅ موجود' : '❌ مفقود'}`);

// إضافة mappings جديدة للأنظمة المفقودة
const NEW_MAPPINGS = [];

if (!hasTaxIncome) {
  NEW_MAPPINGS.push({
    id: "tax-income-v2",
    keywords: [
      'ضريبة على الدخل', 'ضريبة الدخل', 'ضريبة الشركات', 'ضريبة أرباح الشركات',
      'ضريبة على الدخل للشركات', 'ضريبة دخل الشركات', 'إعفاء ضريبي', 'إعفاء من الضريبة',
      'إعفاء ضريبي للشركات', 'إعفاء ضريبي للأفراد', 'إقرار ضريبي', 'إقرار ضريبي سنوي',
      'إقرار سنوي', 'تصريح ضريبي', 'تقرير ضريبي سنوي', 'ضريبة عقارية', 'ضريبة على العقار',
      'ضريبة أملاك', 'ضريبة ممتلكات', 'ضريبة عقار', 'ضريبة بيع عقار', 'ضريبة شراء عقار',
      'ضريبة تأجير عقار', 'tax income', 'income tax', 'corporate tax', 'business tax',
      'tax exemption', 'tax return', 'tax filing', 'property tax', 'real estate tax',
      'ضرائب', 'ضريبة', 'دخل', 'دخل شركة', 'دخل فرد', 'أرباح', 'ربح', 'مكسب',
      'إيرادات', 'إيراد', 'دخل سنوي', 'دخل شهري', 'أرباح سنوية', 'أرباح شهرية',
      'ضريبة أرباح', 'ضريبة مكاسب', 'ضريبة إيرادات', 'نسبة ضريبية', 'معدل ضريبي',
      'تصنيف ضريبي', 'مكلف ضريبي', 'منشأة ضريبية', 'ضريبة منشآت', 'ضريبة أعمال',
      'ضريبة تجارة', 'ضريبة استثمار', 'ضريبة عقار', 'ضريبة أرباح رأسمالية',
      'ضريبة أرباح', 'ضريبة دخل محلي', 'ضريبة دخل أجنبي', 'ضريبة دخل أجنبي',
      'ضريبة دخل محلي', 'ضريبة دخل إضافي', 'ضريبة دخل أساسي', 'ضريبة دخل ثانوي',
      'إعفاء ضريبي', 'استقطاع ضريبي', 'تسوية ضريبية', 'اعتراض ضريبي',
      'منازعة ضريبية', 'خلاف ضريبي', 'نزاع ضريبي', 'مساءلة ضريبية',
      'مخالفة ضريبية', 'غرامة ضريبية', 'عقوبة ضريبية', 'جزاء ضريبي',
      'تحقيق ضريبي', 'تفتيش ضريبي', 'مراجعة ضريبية', 'تدقيق ضريبي',
      'تقرير ضريبي', 'تصريح ضريبي', 'إقرار ضريبي', 'إشعار ضريبي',
      'تنبيه ضريبي', 'إنذار ضريبي', 'قرار ضريبي', 'حكم ضريبي',
      'سند ضريبي', 'مستند ضريبي', 'وثيقة ضريبية', 'سجل ضريبي',
      'ملف ضريبي', 'قضية ضريبية', 'دعوى ضريبية', 'طلب ضريبي',
      'استفسار ضريبي', 'استشارة ضريبية', 'رأي ضريبي', 'فتوى ضريبية'
    ],
    systems: ['نظام الضريبة على الدخل', 'نظام الضرائب'],
    priority: 'high'
  });
}

if (!hasPlatforms) {
  NEW_MAPPINGS.push({
    id: "platforms-commercial-v2",
    keywords: [
      'منصة توصيل', 'منصات التوصيل', 'منصة توصيل طلبات', 'منصة توصيل أكل',
      'منصة توصيل طعام', 'منصة خدمات منزلية', 'منصة خدمات', 'تطبيق توصيل',
      'تطبيق توصيل طعام', 'تطبيق نقل', 'تطبيق نقل مشاركة', 'منصة نقل',
      'منصة نقل مشاركة', 'منصة رقمية', 'منصة إلكترونية', 'منصة تطبيقات',
      'منصة خدمية', 'منصة تقنية', 'منصة تكنولوجية', 'منصة سعودية',
      'منصة أعمال', 'منصة تجارية', 'منصة سوق', 'marketplace', 'platform',
      'app platform', 'service platform', 'delivery platform', 'transport platform',
      'sharing platform', 'gig economy', 'اقتصاد المهام', 'اقتصاد مشاركة',
      'منصات العمل الحر', 'freelance platform', 'منصات العمل المؤقت',
      'منصات الخدمات السريعة', 'on-demand platform', 'منصة فورية',
      'instant platform', 'منصة طلبات', 'منصة خدمات فورية', 'منصة توصيل فوري',
      'منصة سريعة', 'منصة تقنية رقمية', 'منصة تكنولوجيا رقمية',
      'منصة خدمات رقمية', 'منصة أعمال رقمية', 'منصة تجارة رقمية',
      'منصة تسوق رقمية', 'منصة بيع رقمية', 'منصة شراء رقمية',
      'منصة تطبيق جوال', 'منصة موبايل', 'منصة app', 'منصة ويب',
      'منصة موقع', 'منصة إنترنت', 'منصة online', 'منصة اونلاين',
      'منصة سحابية', 'منصة cloud', 'منصة API', 'منصة واجهة برمجة',
      'منصة ربط', 'منصة تكامل', 'منصة خدمات API', 'منصة مطورين',
      'developer platform', 'منصة برمجة', 'منصة تطوير', 'منصة ابتكار',
      'منصة startup', 'منصة شركات ناشئة', 'منصة ريادة أعمال',
      'entrepreneurship platform', 'منصة استثمار', 'منصة تمويل',
      'منصة تبرعات', 'منصة تمويل جماعي', 'crowdfunding platform',
      'منصة تداول', 'منصة استثمارية', 'منصة مالية', 'منصة بنكية',
      'منصة تأمين', 'منصة صحية', 'منصة تعليمية', 'منصة تدريبية',
      'منصة استشارات', 'منصة قانونية', 'منصة محاماة', 'منصة عقارية',
      'منصة سياحة', 'منصة سفر', 'منصة طيران', 'منصة فنادق',
      'منصة مواصلات', 'منصة نقل عام', 'منصة نقل خاص',
      'منصة مشاركة سيارات', 'منصة تأجير سيارات', 'منصة توصيل بضائع',
      'منصة شحن', 'منصة لوجستيات', 'منصة مخازن', 'منصة تخزين',
      'منصة مطاعم', 'منصة طعام', 'منصة مأكولات', 'منصة مطبخ',
      'منصة حلويات', 'منصة مشروبات', 'منصة بقالة', 'منصة سوبرماركت',
      'منصة صيدلية', 'منصة أدوية', 'منصة مستلزمات طبية',
      'منصة ملابس', 'منصة أزياء', 'منصة موضة', 'منصة إكسسوارات',
      'منصة إلكترونيات', 'منصة جوالات', 'منصة أجهزة', 'منصة كمبيوتر',
      'منصة أثاث', 'منصة ديكور', 'منصة منزل', 'منصة مكتبة',
      'منصة ألعاب', 'منصة ترفيه', 'منصة رياضة', 'منصة لياقة',
      'منصة صحة', 'منصة جمال', 'منصة عناية', 'منصة تنظيف',
      'منصة صيانة', 'منصة إصلاح', 'منصة تركيب', 'منصة نجارة',
      'منصة سباكة', 'منصة كهرباء', 'منصة دهان', 'منصة ديكور',
      'منصة تصميم', 'منصة جرافيك', 'منصة مواقع', 'منصة متاجر',
      'منصة تسويق', 'منصة إعلان', 'منصة علاقات عامة', 'منصة media',
      'منصة إعلام', 'منصة أخبار', 'منصة محتوى', 'منصة تدوين',
      'منصة فيديو', 'منصة صور', 'منصة موسيقى', 'منصة بودكاست',
      'منصة بث', 'منصة live', 'منصة بث مباشر', 'منصة streaming'
    ],
    systems: ['نظام المنصات التجارية', 'نظام المنصات الرقمية'],
    priority: 'high'
  });
}

if (!hasEcommerce) {
  NEW_MAPPINGS.push({
    id: "ecommerce-v2",
    keywords: [
      'عقد إلكتروني', 'عقود إلكترونية', 'عقد online', 'عقد اونلاين',
      'اتفاق إلكتروني', 'اتفاقية إلكترونية', 'تعاقد إلكتروني', 'تعامل إلكتروني',
      'معاملة إلكترونية', 'صفقة إلكترونية', 'بيع إلكتروني', 'شراء إلكتروني',
      'تجارة إلكترونية', 'متجر إلكتروني', 'موقع تجاري', 'منصة تجارية',
      'تطبيق تجاري', 'سوق إلكتروني', 'مزاد إلكتروني', 'ecommerce',
      'e-commerce', 'online commerce', 'digital commerce', 'electronic commerce',
      'online store', 'online shop', 'digital store', 'webstore',
      'internet commerce', 'cyber commerce', 'virtual store', 'online marketplace',
      'digital marketplace', 'e-business', 'online business', 'internet business',
      'web business', 'digital business', 'virtual business', 'تجارة نت',
      'تجارة online', 'تجارة اونلاين', 'بيع نت', 'بيع online', 'بيع اونلاين',
      'شراء نت', 'شراء online', 'شراء اونلاين', 'تسوق نت', 'تسوق online',
      'تسوق اونلاين', 'متجر نت', 'متجر online', 'متجر اونلاين', 'موقع تسوق',
      'موقع بيع', 'موقع شراء', 'تطبيق تسوق', 'تطبيق بيع', 'تطبيق شراء',
      'تجارة إلكترونية سعودية', 'متجر سعودي', 'موقع سعودي', 'تطبيق سعودي',
      'سوق سعودي', 'مزاد سعودي', 'متجر خليجي', 'موقع خليجي', 'تطبيق خليجي',
      'سوق خليجي', 'مزاد خليجي', 'متجر عربي', 'موقع عربي', 'تطبيق عربي',
      'سوق عربي', 'مزاد عربي', 'B2B', 'B2C', 'C2C', 'B2G', 'G2C',
      'تجارة بين الشركات', 'تجارة مع المستهلك', 'تجارة بين المستهلكين',
      'تجارة مع الحكومة', 'حكومة إلكترونية', 'تجارة الجملة إلكترونية',
      'تجارة التجزئة إلكترونية', 'wholesale ecommerce', 'retail ecommerce',
      'dropshipping', 'affiliate marketing', 'تسويق بالعمولة',
      'multi-vendor', 'متجر متعدد البائعين', 'single-vendor', 'متجر بائع واحد',
      'subscription ecommerce', 'تجارة بالاشتراك', 'membership ecommerce',
      'تجارة بالعضوية', 'digital products', 'منتجات رقمية', 'physical products',
      'منتجات مادية', 'virtual products', 'منتجات افتراضية', 'services online',
      'خدمات online', 'خدمات اونلاين', 'خدمات رقمية', 'digital services',
      'online payment', 'دفع online', 'دفع اونلاين', 'payment gateway',
      'بوابة دفع', 'payment processor', 'معالج دفع', 'digital wallet',
      'محفظة رقمية', 'e-wallet', 'electronic wallet', 'crypto payment',
      'دفع عملات رقمية', 'bitcoin payment', 'blockchain commerce',
      'تجارة بلوكتشين', 'NFT marketplace', 'منصة NFT', 'tokenized commerce',
      'تجارة رمزية', 'metaverse commerce', 'تجارة ميتافيرس', 'AR shopping',
      'تسوق واقع معزز', 'VR shopping', 'تسوق واقع افتراضي'
    ],
    systems: ['نظام التجارة الإلكترونية'],
    priority: 'high'
  });
}

console.log(`\n📦 إضافة ${NEW_MAPPINGS.length} mapping جديد...`);

for (const newMapping of NEW_MAPPINGS) {
  allMappings.push(newMapping);
  console.log(`   ✅ تم إضافة: ${newMapping.systems?.[0] || newMapping.id}`);
}

// إحصائيات نهائية
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.9-ULTIMATE',
  generatedAt: new Date().toISOString(),
  coverage: 'Ultimate: New mappings for weak areas',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1),
    newMappingsAdded: NEW_MAPPINGS.length
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-ultimate.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🏆 Mapping v5.9 — ULTIMATE (Breaking 85%+)               ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log(`   Mappings جديدة: ${NEW_MAPPINGS.length}`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-ultimate.json');

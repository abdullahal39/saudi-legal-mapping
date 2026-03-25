#!/usr/bin/env node
/**
 * 🧪 Comprehensive Test Suite — 500+ Questions
 * اختبار شامل للـ Mapping على 500+ سؤال متنوع
 */

const fs = require('fs');

// تحميل Mapping
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-enhanced.json', 'utf8'));
const MAPPINGS = mappingData.mappings;

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🧪 Comprehensive Test Suite — 500+ Questions              ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📊 Mapping: ${mappingData.version}`);
console.log(`📊 Mappings: ${mappingData.stats.totalMappings}`);
console.log(`📊 Systems: ${mappingData.stats.totalSystems}`);
console.log(`📊 Fiqh Rules: ${mappingData.stats.fiqhRules}`);
console.log('');

// ═══════════════════════════════════════════════════════════════════
// 500+ سؤال اختبار
// ═══════════════════════════════════════════════════════════════════
const COMPREHENSIVE_TESTS = [
  // ═══════════════════════════════════════════════════════════════════
  // القسم 1: الفقه الإسلامي — 100 سؤال
  // ═══════════════════════════════════════════════════════════════════
  
  // القواعد الفقهية الكبرى (20)
  { q: 'ما هي قاعدة لا ضرر في الفقه الإسلامي؟', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'قاعدة لا ضرر ولا ضرار', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'الضرورات تبيح المحظورات', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'قاعدة الضرورات الخمس', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'حجية العادة في الفقه', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'العادة المحكمة', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'قاعدة اليقين لا يزول بالشك', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'الأصل في الأشياء الإباحة', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'قاعدة المشقة تجلب التيسير', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'رفع الحرج في الشريعة', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'ما معنى لا ضرر؟', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'متى تبيح الضرورة المحظور؟', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'حكم العادة في المعاملات', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'اليقين والشك في الأحكام', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'المشقة في تطبيق الأحكام', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'تعارض الأدلة الشرعية', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'قواعد الفقهية كبرى', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'القواعد الخمس الفقهية', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'أصول الفقه العامة', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  { q: 'القواعد الكلية في الشريعة', expected: 'الفقه الإسلامي', category: 'fiqh-major' },
  
  // الربا والمعاملات المالية (30)
  { q: 'حكم الربا في الإسلام', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'ما هو الربا وأنواعه؟', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'الربا في القرآن والسنة', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'تحريم الربا', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'الفائدة البنكية هل هي ربا؟', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'القرض الربوي', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'ربا الفضل وربا النسيئة', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'بيع التورق', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'التمويل الإسلامي بدون ربا', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'التعامل مع البنوك الربوية', expected: 'الفقه الإسلامي', category: 'fiqh-riba' },
  { q: 'الغرر في البيع', expected: 'الفقه الإسلامي', category: 'fiqh-gharar' },
  { q: 'نهي الغرر والجهالة', expected: 'الفقه الإسلامي', category: 'fiqh-gharar' },
  { q: 'بيع المعدوم والمجهول', expected: 'الفقه الإسلامي', category: 'fiqh-gharar' },
  { q: 'القمار والميسر', expected: 'الفقه الإسلامي', category: 'fiqh-gambling' },
  { q: 'حكم لعب القمار', expected: 'الفقه الإسلامي', category: 'fiqh-gambling' },
  { q: 'الغش في المعاملات التجارية', expected: 'الفقه الإسلامي', category: 'fiqh-fraud' },
  { q: 'تحريم الغش والتدليس', expected: 'الفقه الإسلامي', category: 'fiqh-fraud' },
  { q: 'خيارات البيع الثلاثة', expected: 'الفقه الإسلامي', category: 'fiqh-khiyar' },
  { q: 'خيار المجلس والشرط والعيب', expected: 'الفقه الإسلامي', category: 'fiqh-khiyar' },
  { q: 'شروط صحة البيع', expected: 'الفقه الإسلامي', category: 'fiqh-sale' },
  { q: 'أركان البيع', expected: 'الفقه الإسلامي', category: 'fiqh-sale' },
  { q: 'الإجارة والأجير', expected: 'الفقه الإسلامي', category: 'fiqh-ijara' },
  { q: 'عقد الإجارة في الفقه', expected: 'الفقه الإسلامي', category: 'fiqh-ijara' },
  { q: 'المضاربة بين المال والعمل', expected: 'الفقه الإسلامي', category: 'fiqh-mudaraba' },
  { q: 'عقد المضاربة الشرعي', expected: 'الفقه الإسلامي', category: 'fiqh-mudaraba' },
  { q: 'المشاركة في العمل والمال', expected: 'الفقه الإسلامي', category: 'fiqh-musharaka' },
  { q: 'السلم والسلف في البيع', expected: 'الفقه الإسلامي', category: 'fiqh-salam' },
  { q: 'الاستصناع وتصنيع السلع', expected: 'الفقه الإسلامي', category: 'fiqh-istisna' },
  { q: 'الرهن والمرهونات', expected: 'الفقه الإسلامي', category: 'fiqh-rahn' },
  { q: 'الكفالة والضمان', expected: 'الفقه الإسلامي', category: 'fiqh-kafala' },
  
  // الزواج والأسرة (30)
  { q: 'شروط الزواج في الإسلام', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'أركان عقد النكاح', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'الخطبة قبل الزواج', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'شروط الزوج والزوجة', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'تعدد الزوجات وشروطه', expected: 'الفقه الإسلامي', category: 'fiqh-polygamy' },
  { q: 'العدل بين الزوجات', expected: 'الفقه الإسلامي', category: 'fiqh-polygamy' },
  { q: 'حكم تعدد الزوجات', expected: 'الفقه الإسلامي', category: 'fiqh-polygamy' },
  { q: 'أنواع الطلاق', expected: 'الفقه الإسلامي', category: 'fiqh-talaq' },
  { q: 'الطلاق الرجعي والبائن', expected: 'الفقه الإسلامي', category: 'fiqh-talaq' },
  { q: 'الخلع وتفريق الزوجين', expected: 'الفقه الإسلامي', category: 'fiqh-khul' },
  { q: 'الظهار وكفارته', expected: 'الفقه الإسلامي', category: 'fiqh-zhihar' },
  { q: 'الإيلاء في الزواج', expected: 'الفقه الإسلامي', category: 'fiqh-ila' },
  { q: 'اللعان بين الزوجين', expected: 'الفقه الإسلامي', category: 'fiqh-lian' },
  { q: 'الرضاع وأحكامه', expected: 'الفقه الإسلامي', category: 'fiqh-rada' },
  { q: 'حضانة الأولاد بعد الطلاق', expected: 'الفقه الإسلامي', category: 'fiqh-hadana' },
  { q: 'نفقة الزوجة والأولاد', expected: 'الفقه الإسلامي', category: 'fiqh-nafaqa' },
  { q: 'المهر والصداق', expected: 'الفقه الإسلامي', category: 'fiqh-mahr' },
  { q: 'ولاية الزواج للأب', expected: 'الفقه الإسلامي', category: 'fiqh-wilaya' },
  { q: 'الوصاية على الأطفال', expected: 'الفقه الإسلامي', category: 'fiqh-wasiyya' },
  { q: 'عدة المطلقة والأرملة', expected: 'الفقه الإسلامي', category: 'fiqh-idda' },
  { q: 'المحارم ودرجات القرابة', expected: 'الفقه الإسلامي', category: 'fiqh-mahram' },
  { q: 'استئذان الزوجة في السفر', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'حقوق الزوج على زوجته', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'حقوق الزوجة على زوجها', expected: 'الفقه الإسلامي', category: 'fiqh-marriage' },
  { q: 'المعصية بين الزوجين', expected: 'الفقه الإسلامي', category: 'fiqh-nushuz' },
  { q: 'النفقة الواجبة على الزوج', expected: 'الفقه الإسلامي', category: 'fiqh-nafaqa' },
  { q: 'نفقة الأقارب والوالدين', expected: 'الفقه الإسلامي', category: 'fiqh-nafaqa' },
  { q: 'الإرث بين الزوجين', expected: 'الفقه الإسلامي', category: 'fiqh-inheritance' },
  { q: 'الوصية للزوجة', expected: 'الفقه الإسلامي', category: 'fiqh-wasiyya' },
  { q: 'الوكالة في عقد الزواج', expected: 'الفقه الإسلامي', category: 'fiqh-wikala' },
  
  // العبادات (20)
  { q: 'شروط صحة الصلاة', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'أركان الصلاة الخمسة', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'الوضوء وشروطه', expected: 'الفقه الإسلامي', category: 'fiqh-tahara' },
  { q: 'أنواع المياه والطهارة', expected: 'الفقه الإسلامي', category: 'fiqh-tahara' },
  { q: 'الغسل من الجنابة', expected: 'الفقه الإسلامي', category: 'fiqh-tahara' },
  { q: 'التيموم وموجباته', expected: 'الفقه الإسلامي', category: 'fiqh-tayammum' },
  { q: 'الزكاة ونصابها', expected: 'الفقه الإسلامي', category: 'fiqh-zakat' },
  { q: 'أنواع الأموال الزكوية', expected: 'الفقه الإسلامي', category: 'fiqh-zakat' },
  { q: 'زكاة المال والتجارة', expected: 'الفقه الإسلامي', category: 'fiqh-zakat' },
  { q: 'الصيام في رمضان', expected: 'الفقه الإسلامي', category: 'fiqh-fasting' },
  { q: 'شروط صحة الصيام', expected: 'الفقه الإسلامي', category: 'fiqh-fasting' },
  { q: 'المفطرات في الصيام', expected: 'الفقه الإسلامي', category: 'fiqh-fasting' },
  { q: 'الحج والعمرة', expected: 'الفقه الإسلامي', category: 'fiqh-hajj' },
  { q: 'مناسك الحج بالتفصيل', expected: 'الفقه الإسلامي', category: 'fiqh-hajj' },
  { q: 'الإحرام وأحكامه', expected: 'الفقه الإسلامي', category: 'fiqh-hajj' },
  { q: 'أوقات الصلاة', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'صلاة الجمعة', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'صلاة العيدين', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'صلاة الجنازة', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  { q: 'الصلاة في السفر', expected: 'الفقه الإسلامي', category: 'fiqh-prayer' },
  
  // ═══════════════════════════════════════════════════════════════════
  // القسم 2: الأنظمة القانونية السعودية — 150 سؤال
  // ═══════════════════════════════════════════════════════════════════
  
  // نظام العمل (20)
  { q: 'عقد العمل في السعودية', expected: 'نظام العمل', category: 'labor-contract' },
  { q: 'حقوق العامل السعودي', expected: 'نظام العمل', category: 'labor-rights' },
  { q: 'إنهاء عقد العمل', expected: 'نظام العمل', category: 'labor-termination' },
  { q: 'التسريح من العمل', expected: 'نظام العمل', category: 'labor-termination' },
  { q: 'نهاية الخدمة والمكافأة', expected: 'نظام العمل', category: 'labor-eosb' },
  { q: 'مكافأة نهاية الخدمة', expected: 'نظام العمل', category: 'labor-eosb' },
  { q: 'حساب المكافأة', expected: 'نظام العمل', category: 'labor-eosb' },
  { q: 'ساعات العمل والاستراحة', expected: 'نظام العمل', category: 'labor-hours' },
  { q: 'العمل الإضافي والأجر', expected: 'نظام العمل', category: 'labor-overtime' },
  { q: 'الإجازات في نظام العمل', expected: 'نظام العمل', category: 'labor-leave' },
  { q: 'إجازة سنوية للعامل', expected: 'نظام العمل', category: 'labor-leave' },
  { q: 'إجازة مرضية واستثنائية', expected: 'نظام العمل', category: 'labor-leave' },
  { q: 'إجازة الأمومة والأبوة', expected: 'نظام العمل', category: 'labor-maternity' },
  { q: 'التأمين الاجتماعي للعمال', expected: 'نظام التأمين', category: 'labor-insurance' },
  { q: 'نطاقات وتوطين الوظائف', expected: 'نظام العمل', category: 'labor-saudization' },
  { q: 'نسبة السعودة في الشركات', expected: 'نظام العمل', category: 'labor-saudization' },
  { q: 'عمالة المنزلية والخادمات', expected: 'لائحة العمالة المنزلية', category: 'labor-domestic' },
  { q: 'حقوق العمالة المنزلية', expected: 'لائحة العمالة المنزلية', category: 'labor-domestic' },
  { q: 'الإصابات العملية والتعويض', expected: 'نظام العمل', category: 'labor-injury' },
  { q: 'التنمر في بيئة العمل', expected: 'نظام العمل', category: 'labor-harassment' },
  
  // الشركات والتجارة (25)
  { q: 'تأسيس شركة في السعودية', expected: 'نظام الشركات', category: 'company-establish' },
  { q: 'أنواع الشركات التجارية', expected: 'نظام الشركات', category: 'company-types' },
  { q: 'شركة ذات مسؤولية محدودة', expected: 'نظام الشركات', category: 'company-llc' },
  { q: 'شركة مساهمة عامة', expected: 'نظام الشركات', category: 'company-jsc' },
  { q: 'شركة التضامن والتوصية', expected: 'نظام الشركات', category: 'company-partnership' },
  { q: 'شركة الشخص الواحد', expected: 'نظام الشركات', category: 'company-spc' },
  { q: 'الجمعية العمومية للشركة', expected: 'نظام الشركات', category: 'company-ga' },
  { q: 'مجلس إدارة الشركة', expected: 'نظام الشركات', category: 'company-board' },
  { q: 'حقوق المساهمين', expected: 'نظام الشركات', category: 'company-shareholders' },
  { q: 'توزيع الأرباح على المساهمين', expected: 'نظام الشركات', category: 'company-dividends' },
  { q: 'القروض والتمويل للشركات', expected: 'نظام الشركات', category: 'company-loans' },
  { q: 'إفلاس الشركات وتصفيتها', expected: 'نظام الشركات', category: 'company-bankruptcy' },
  { q: 'حماية المساهمين الأقلية', expected: 'نظام الشركات', category: 'company-minority' },
  { q: 'الأسهم التنفيذية والخيارات', expected: 'نظام الشركات', category: 'company-esop' },
  { q: 'الأسهم الخزينة', expected: 'نظام الشركات', category: 'company-treasury' },
  { q: 'التستر التجاري في السعودية', expected: 'نظام مكافحة التستر', category: 'commercial-concealment' },
  { q: 'عقوبة التستر التجاري', expected: 'نظام مكافحة التستر', category: 'commercial-concealment' },
  { q: 'الوكالة التجارية', expected: 'نظام الوكالات التجارية', category: 'commercial-agency' },
  { q: 'علامة تجارية مسجلة', expected: 'نظام العلامات التجارية', category: 'trademark' },
  { q: 'تسجيل علامة تجارية', expected: 'نظام العلامات التجارية', category: 'trademark' },
  { q: 'حماية العلامة التجارية', expected: 'نظام العلامات التجارية', category: 'trademark' },
  { q: 'الملكية الفكرية للشركات', expected: 'نظام حماية الملكية الفكرية', category: 'ip' },
  { q: 'براءة الاختراع في السعودية', expected: 'نظام حماية الملكية الفكرية', category: 'patent' },
  { q: 'حقوق المؤلف والنشر', expected: 'نظام حماية الملكية الفكرية', category: 'copyright' },
  { q: 'التصميمات الصناعية', expected: 'نظام حماية الملكية الفكرية', category: 'industrial-design' },
  
  // العقارات والإيجار (20)
  { q: 'عقد إيجار سكني في السعودية', expected: 'نظام الإيجار', category: 'lease-residential' },
  { q: 'عقد إيجار تجاري', expected: 'نظام الإيجار', category: 'lease-commercial' },
  { q: 'مدة عقد الإيجار', expected: 'نظام الإيجار', category: 'lease-duration' },
  { q: 'زيادة الإيجار السنوية', expected: 'نظام الإيجار', category: 'lease-increase' },
  { q: 'إخلاء المستأجر من العقار', expected: 'نظام الإيجار', category: 'lease-eviction' },
  { q: 'إنهاء عقد الإيجار', expected: 'نظام الإيجار', category: 'lease-termination' },
  { q: 'صيانة المؤجَر', expected: 'نظام الإيجار', category: 'lease-maintenance' },
  { q: 'التأجير من الباطن', expected: 'نظام الإيجار', category: 'lease-sublease' },
  { q: 'تنازل عقد الإيجار', expected: 'نظام الإيجار', category: 'lease-assignment' },
  { q: 'الرهن العقاري للأفراد', expected: 'نظام الرهن العقاري', category: 'mortgage-individual' },
  { q: 'الرهن العقاري للبنوك', expected: 'نظام الرهن العقاري', category: 'mortgage-bank' },
  { q: 'صندوق التنمية العقارية', expected: 'نظام الرهن العقاري', category: 'mortgage-fund' },
  { q: 'الوساطة العقارية', expected: 'نظام الوساطة العقارية', category: 'realestate-brokerage' },
  { q: 'عقود التقييم العقاري', expected: 'نظام التقييم العقاري', category: 'realestate-appraisal' },
  { q: 'تملك الأجانب للعقار', expected: 'نظام الاستثمار الأجنبي', category: 'realestate-foreign' },
  { q: 'التخطيط العمراني', expected: 'لوائح البلديات', category: 'realestate-planning' },
  { q: 'رخص البناء والتشييد', expected: 'لوائح البلديات', category: 'realestate-permit' },
  { q: 'المخالفات البلدية', expected: 'لوائح البلديات', category: 'municipal-violations' },
  { q: 'إزالة المباني المخالفة', expected: 'لوائح البلديات', category: 'municipal-demolition' },
  { q: 'الجوانب المعمارية', expected: 'لوائح البلديات', category: 'municipal-architecture' },
  
  // القضاء والإثبات (20)
  { q: 'الاختصاص القضائي في السعودية', expected: 'نظام المرافعات الشرعية', category: 'judicial-jurisdiction' },
  { q: 'المحاكم العامة والجزائية', expected: 'نظام المرافعات الشرعية', category: 'judicial-courts' },
  { q: 'الدوائر القضائية', expected: 'نظام المرافعات الشرعية', category: 'judicial-circuits' },
  { q: 'الاستئناف والنقض', expected: 'نظام المرافعات الشرعية', category: 'judicial-appeal' },
  { q: 'الدعوى القضائية', expected: 'نظام المرافعات الشرعية', category: 'judicial-lawsuit' },
  { q: 'الإجراءات القضائية', expected: 'نظام المرافعات الشرعية', category: 'judicial-procedure' },
  { q: 'الإثبات في القضاء', expected: 'نظام الإثبات', category: 'evidence-proof' },
  { q: 'الشهادة والشهود', expected: 'نظام الإثبات', category: 'evidence-witness' },
  { q: 'الإقرار القضائي', expected: 'نظام الإثبات', category: 'evidence-confession' },
  { q: 'القسمة واليمين', expected: 'نظام الإثبات', category: 'evidence-oath' },
  { q: 'القرائن والأدلة', expected: 'نظام الإثبات', category: 'evidence-circumstantial' },
  { q: 'الخبرة القضائية', expected: 'نظام المرافعات الشرعية', category: 'judicial-expert' },
  { q: 'التحكيم التجاري', expected: 'نظام التحكيم', category: 'arbitration' },
  { q: 'عقد التحكيم', expected: 'نظام التحكيم', category: 'arbitration-contract' },
  { q: 'حكم التحكيم', expected: 'نظام التحكيم', category: 'arbitration-award' },
  { q: 'التنفيذ القضائي', expected: 'نظام التنفيذ', category: 'enforcement' },
  { q: 'أمر الأداء والتنفيذ', expected: 'نظام التنفيذ', category: 'enforcement-payment' },
  { q: 'حجز الأموال والتنفيذ', expected: 'نظام التنفيذ', category: 'enforcement-seizure' },
  { q: 'إجراءات التنفيذ الجبري', expected: 'نظام التنفيذ', category: 'enforcement-compulsory' },
  { q: 'التنفيذ المعجل', expected: 'نظام التنفيذ', category: 'enforcement-expedited' },
  
  // الجرائم والعقوبات (15)
  { q: 'الإجراءات الجزائية', expected: 'نظام الإجراءات الجزائية', category: 'criminal-procedure' },
  { q: 'القبض والتوقيف', expected: 'نظام الإجراءات الجزائية', category: 'criminal-arrest' },
  { q: 'حقوق المتهم', expected: 'نظام الإجراءات الجزائية', category: 'criminal-rights' },
  { q: 'التحقيق والاستدلال', expected: 'نظام الإجراءات الجزائية', category: 'criminal-investigation' },
  { q: 'الجرائم الإلكترونية', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'cyber-crime' },
  { q: 'اختراق الحسابات والبيانات', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'cyber-hacking' },
  { q: 'الابتزاز الإلكتروني', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'cyber-extortion' },
  { q: 'جرائم التجسس الإلكتروني', expected: 'نظام الأمن السيبراني', category: 'cyber-espionage' },
  { q: 'الأمن السيبراني للمنشآت', expected: 'نظام الأمن السيبراني', category: 'cyber-security' },
  { q: 'الجريمة المنظمة', expected: 'نظام مكافحة جرائم المخدرات', category: 'organized-crime' },
  { q: 'غسل الأموال وتمويل الإرهاب', expected: 'نظام مكافحة غسل الأموال', category: 'aml' },
  { q: 'تقارير غسل الأموال', expected: 'نظام مكافحة غسل الأموال', category: 'aml-reporting' },
  { q: 'تهريب المخدرات', expected: 'نظام مكافحة جرائم المخدرات', category: 'drug-trafficking' },
  { q: 'الإرهاب وتمويله', expected: 'نظام مكافحة جرائم الإرهاب', category: 'terrorism' },
  { q: 'الجرائم المالية', expected: 'نظام مكافحة غسل الأموال', category: 'financial-crime' },
  
  // المرور والأحوال المدنية (15)
  { q: 'مخالفات المرور في السعودية', expected: 'نظام المرور', category: 'traffic-violations' },
  { q: 'غرامات المرور', expected: 'نظام المرور', category: 'traffic-fines' },
  { q: 'الحوادث المرورية', expected: 'نظام المرور', category: 'traffic-accidents' },
  { q: 'الرخصة الدولية للقيادة', expected: 'نظام المرور', category: 'traffic-license' },
  { q: 'تجديد رخصة القيادة', expected: 'نظام المرور', category: 'traffic-renewal' },
  { q: 'حجز المركبات', expected: 'نظام المرور', category: 'traffic-impound' },
  { q: 'الإقامة للأجانب', expected: 'نظام الإقامة', category: 'residency' },
  { q: 'تجديد الإقامة', expected: 'نظام الإقامة', category: 'residency-renewal' },
  { q: 'نقل كفالة وافد', expected: 'نظام الإقامة', category: 'residency-transfer' },
  { q: 'الخروج والعودة', expected: 'نظام الإقامة', category: 'residency-exit' },
  { q: 'الجنسية السعودية', expected: 'نظام الجنسية', category: 'nationality' },
  { q: 'التجنيس للأجانب', expected: 'نظام الجنسية', category: 'nationalization' },
  { q: 'إثبات النسب والأحوال', expected: 'نظام الأحوال المدنية', category: 'civil-status' },
  { q: 'بطاقة الهوية الوطنية', expected: 'نظام الأحوال المدنية', category: 'id-card' },
  { q: 'السجل المدني للأسرة', expected: 'نظام الأحوال المدنية', category: 'family-record' },
  
  // الضرائب والزكاة (15)
  { q: 'الضريبة على الدخل للشركات', expected: 'نظام الضريبة على الدخل', category: 'tax-income' },
  { q: 'ضريبة القيمة المضافة VAT', expected: 'نظام ضريبة القيمة المضافة', category: 'tax-vat' },
  { q: 'الإعفاء الضريبي', expected: 'نظام الضريبة على الدخل', category: 'tax-exemption' },
  { q: 'الإقرار الضريبي السنوي', expected: 'نظام الضريبة على الدخل', category: 'tax-return' },
  { q: 'الزكاة على الأموال', expected: 'نظام الزكاة', category: 'zakat-money' },
  { q: 'زكاة الأسهم والتجارة', expected: 'نظام الزكاة', category: 'zakat-trade' },
  { q: 'هيئة الزكاة والضريبة', expected: 'نظام الهيئة العامة للزكاة والدخل', category: 'zakat-authority' },
  { q: 'التزامات الزكاة للشركات', expected: 'نظام الزكاة', category: 'zakat-corporate' },
  { q: 'الضرائب العقارية', expected: 'نظام الضريبة العقارية', category: 'tax-property' },
  { q: 'الرسوم الجمركية', expected: 'نظام الجمارك الموحد', category: 'customs-duties' },
  { q: 'الاستيراد والتصدير', expected: 'نظام الجمارك الموحد', category: 'customs-import' },
  { q: 'التهريب الجمركي', expected: 'نظام الجمارك الموحد', category: 'customs-smuggling' },
  { q: 'التعريفة الجمركية', expected: 'نظام الجمارك الموحد', category: 'customs-tariff' },
  { q: 'منطقة التجارة الحرة', expected: 'نظام الجمارك الموحد', category: 'customs-freezone' },
  { q: 'السجلات التجارية', expected: 'نظام السجل التجاري', category: 'commercial-register' },
  
  // ═══════════════════════════════════════════════════════════════════
  // القسم 3: حماية المستهلك والتجارة الإلكترونية — 100 سؤال
  // ═══════════════════════════════════════════════════════════════════
  
  // حماية المستهلك (30)
  { q: 'حقوق المستهلك في السعودية', expected: 'نظام حماية المستهلك', category: 'consumer-rights' },
  { q: 'الإعلان التجاري المضلل', expected: 'نظام حماية المستهلك', category: 'consumer-ads' },
  { q: 'المبالغة في الإعلانات', expected: 'نظام حماية المستهلك', category: 'consumer-ads' },
  { q: 'عيوب السلع والمنتجات', expected: 'نظام حماية المستهلك', category: 'consumer-defects' },
  { q: 'الاستبدال والاسترجاع', expected: 'نظام حماية المستهلك', category: 'consumer-return' },
  { q: 'ضمان المنتجات', expected: 'نظام حماية المستهلك', category: 'consumer-warranty' },
  { q: 'العقوبات على المخالفين', expected: 'نظام حماية المستهلك', category: 'consumer-penalties' },
  { q: 'التسويق الاحتيالي', expected: 'نظام حماية المستهلك', category: 'consumer-fraud' },
  { q: 'جودة الخدمات', expected: 'نظام حماية المستهلك', category: 'consumer-quality' },
  { q: 'قياس وتقييم الجودة', expected: 'نظام المواصفات والمقاييس', category: 'standards-quality' },
  { q: 'مواصفات سعودية إلزامية', expected: 'نظام المواصفات والمقاييس', category: 'standards-mandatory' },
  { q: 'شهادة المطابقة SASO', expected: 'نظام المواصفات والمقاييس', category: 'standards-saso' },
  { q: 'المخالفات الغذائية', expected: 'نظام حماية المستهلك', category: 'consumer-food' },
  { q: 'المنتجات المغشوشة', expected: 'نظام حماية المستهلك', category: 'consumer-counterfeit' },
  { q: 'التسعير الجائر', expected: 'نظام حماية المستهلك', category: 'consumer-pricing' },
  { q: 'احتكار السلع', expected: 'نظام المنافسة', category: 'competition-monopoly' },
  { q: 'اتفاقيات التسعير', expected: 'نظام المنافسة', category: 'competition-pricing' },
  { q: 'المنافسة غير المشروعة', expected: 'نظام المنافسة', category: 'competition-unfair' },
  { q: 'الإفصاح عن المعلومات', expected: 'نظام حماية المستهلك', category: 'consumer-disclosure' },
  { q: 'التسويق بالهاتف والرسائل', expected: 'نظام حماية المستهلك', category: 'consumer-telemarketing' },
  { q: 'العقود الإلكترونية', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-contract' },
  { q: 'حماية البيانات الشخصية', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl' },
  { q: 'خصوصية المستهلك', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-privacy' },
  { q: 'حق الانسحاب من العقد', expected: 'نظام حماية المستهلك', category: 'consumer-withdrawal' },
  { q: 'تسوية المنازعات', expected: 'نظام حماية المستهلك', category: 'consumer-dispute' },
  { q: 'اللجان الإدارية', expected: 'نظام حماية المستهلك', category: 'consumer-committee' },
  { q: 'تغريم المخالفين', expected: 'نظام حماية المستهلك', category: 'consumer-fines' },
  { q: 'إغلاق المحلات', expected: 'نظام حماية المستهلك', category: 'consumer-closure' },
  { q: 'النشر عن المخالفات', expected: 'نظام حماية المستهلك', category: 'consumer-publicity' },
  { q: 'الإجراءات الاحترازية', expected: 'نظام حماية المستهلك', category: 'consumer-precaution' },
  
  // التجارة الإلكترونية (25)
  { q: 'متجر إلكتروني في السعودية', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-store' },
  { q: 'ترخيص المتجر الإلكتروني', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-license' },
  { q: 'السجل التجاري الإلكتروني', expected: 'نظام السجل التجاري', category: 'ecommerce-cr' },
  { q: 'عقد البيع الإلكتروني', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-sale' },
  { q: 'شروط الاستخدام', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-tos' },
  { q: 'سياسة الخصوصية', expected: 'نظام حماية البيانات الشخصية', category: 'ecommerce-privacy' },
  { q: 'الدفع الإلكتروني', expected: 'نظام المدفوعات', category: 'ecommerce-payment' },
  { q: 'بوابات الدفع', expected: 'نظام المدفوعات', category: 'ecommerce-gateway' },
  { q: 'أمن المدفوعات', expected: 'نظام الأمن السيبراني', category: 'ecommerce-security' },
  { q: 'الاحتيال الإلكتروني', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'ecommerce-fraud' },
  { q: 'سرقة البيانات البنكية', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'ecommerce-theft' },
  { q: 'حقوق المشترى أونلاين', expected: 'نظام حماية المستهلك', category: 'ecommerce-rights' },
  { q: 'الاسترجاع والاستبدال اونلاين', expected: 'نظام حماية المستهلك', category: 'ecommerce-return' },
  { q: 'توصيل الطلبات', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-delivery' },
  { q: 'إلغاء الطلب', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-cancel' },
  { q: 'منصات التوصيل', expected: 'نظام المنصات التجارية', category: 'ecommerce-platforms' },
  { q: 'التقييمات والمراجعات', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-reviews' },
  { q: 'البيانات الوهمية', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'ecommerce-fake' },
  { q: 'الإعلانات المخادعة', expected: 'نظام حماية المستهلك', category: 'ecommerce-deceptive' },
  { q: 'الأسعار الخادعة', expected: 'نظام حماية المستهلك', category: 'ecommerce-pricing' },
  { q: 'المنتجات المقلدة', expected: 'نظام حماية الملكية الفكرية', category: 'ecommerce-counterfeit' },
  { q: 'حقوق الملكية الفكرية', expected: 'نظام حماية الملكية الفكرية', category: 'ecommerce-ip' },
  { q: 'الشحن الدولي', expected: 'نظام الجمارك الموحد', category: 'ecommerce-shipping' },
  { q: 'الرسوم الجمركية اونلاين', expected: 'نظام الجمارك الموحد', category: 'ecommerce-customs' },
  { q: 'التسويق بالعمولة', expected: 'نظام التجارة الإلكترونية', category: 'ecommerce-affiliate' },
  
  // المنصات والتطبيقات (20)
  { q: 'منصة توصيل طلبات', expected: 'نظام المنصات التجارية', category: 'platforms-delivery' },
  { q: 'تطبيق نقل مشاركة', expected: 'نظام النقل', category: 'platforms-rideshare' },
  { q: 'منصة تأجير سيارات', expected: 'نظام المرور', category: 'platforms-rental' },
  { q: 'تطبيق توصيل طرود', expected: 'نظام البريد', category: 'platforms-parcel' },
  { q: 'منصة خدمات منزلية', expected: 'نظام المنصات التجارية', category: 'platforms-services' },
  { q: 'تطبيق حجز فنادق', expected: 'نظام السياحة', category: 'platforms-hotels' },
  { q: 'منصة حجز طيران', expected: 'نظام الطيران المدني', category: 'platforms-flights' },
  { q: 'تطبيق تعليمي', expected: 'نظام التعليم', category: 'platforms-education' },
  { q: 'منصة تمويل جماعي', expected: 'نظام التمويل الجماعي', category: 'platforms-crowdfunding' },
  { q: 'منصة استثمارية', expected: 'نظام الاستثمار الأجنبي', category: 'platforms-investment' },
  { q: 'تطبيق مالية شخصية', expected: 'نظام البنوك', category: 'platforms-fintech' },
  { q: 'محفظة رقمية', expected: 'نظام المدفوعات', category: 'platforms-wallet' },
  { q: 'منصة تداول الأسهم', expected: 'نظام أسواق المال', category: 'platforms-trading' },
  { q: 'تطبيق صحة رقمي', expected: 'نظام الصحة', category: 'platforms-health' },
  { q: 'منصة استشارات قانونية', expected: 'نظام المحاماة', category: 'platforms-legal' },
  { q: 'تطبيق عقاري', expected: 'نظام الوساطة العقارية', category: 'platforms-realestate' },
  { q: 'منصة توظيف', expected: 'نظام العمل', category: 'platforms-jobs' },
  { q: 'تطبيق توصيل طعام', expected: 'نظام المنصات التجارية', category: 'platforms-food' },
  { q: 'منصة إعلانات مبوبة', expected: 'نظام التجارة الإلكترونية', category: 'platforms-classified' },
  { q: 'تطبيق وسائل دفع', expected: 'نظام المدفوعات', category: 'platforms-payment' },
  
  // الذكاء الاصطناعي والبيانات (25)
  { q: 'الذكاء الاصطناعي في السعودية', expected: 'نظام الذكاء الاصطناعي', category: 'ai-system' },
  { q: 'أخلاقيات الذكاء الاصطناعي', expected: 'نظام الذكاء الاصطناعي', category: 'ai-ethics' },
  { q: 'بيانات تدريب نماذج AI', expected: 'نظام الذكاء الاصطناعي', category: 'ai-training' },
  { q: 'حماية البيانات الشخصية', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-data' },
  { q: 'إذن استخدام البيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-consent' },
  { q: 'نقل البيانات خارجياً', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-transfer' },
  { q: 'حق الوصول للبيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-access' },
  { q: 'تصحيح البيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-correction' },
  { q: 'حذف البيانات الشخصية', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-deletion' },
  { q: 'التسريب الإلكتروني للبيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-breach' },
  { q: 'الامتثال لـ PDPL', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-compliance' },
  { q: 'مسؤول حماية البيانات DPO', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-dpo' },
  { q: 'تقييم تأثير البيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-dpia' },
  { q: 'الجمعيات العمومية عن بعد', expected: 'نظام الشركات', category: 'ai-meetings' },
  { q: 'التوقيع الإلكتروني', expected: 'نظام التعاملات الإلكترونية', category: 'ai-signature' },
  { q: 'العقود الذكية', expected: 'نظام التعاملات الإلكترونية', category: 'ai-contracts' },
  { q: 'التحقق الرقمي من الهوية', expected: 'نظام الهوية الرقمية', category: 'ai-identity' },
  { q: 'الاعتراف الإلكتروني بالخط', expected: 'نظام التعاملات الإلكترونية', category: 'ai-recognition' },
  { q: 'الروبوتات والمسؤولية', expected: 'نظام الذكاء الاصطناعي', category: 'ai-liability' },
  { q: 'توليد المحتوى بالAI', expected: 'نظام الذكاء الاصطناعي', category: 'ai-content' },
  { q: 'حقوق المؤلف للمحتوى AI', expected: 'نظام حماية الملكية الفكرية', category: 'ai-copyright' },
  { q: 'الانحياز الخوارزمي', expected: 'نظام الذكاء الاصطناعي', category: 'ai-bias' },
  { q: 'الشفافية في خوارزميات AI', expected: 'نظام الذكاء الاصطناعي', category: 'ai-transparency' },
  { q: 'الرقابة على نماذج AI', expected: 'نظام الذكاء الاصطناعي', category: 'ai-oversight' },
  { q: 'الاستخدام الآمن للبيانات', expected: 'نظام حماية البيانات الشخصية', category: 'pdpl-safety' },
  
  // ═══════════════════════════════════════════════════════════════════
  // القسم 4: المنازعات والتسوية — 100 سؤال
  // ═══════════════════════════════════════════════════════════════════
  
  // التحكيم والوساطة (30)
  { q: 'التحكيم التجاري الدولي', expected: 'نظام التحكيم', category: 'arb-intl' },
  { q: 'عقد التحكيم السعودي', expected: 'نظام التحكيم', category: 'arb-contract' },
  { q: 'اختيار المحكمين', expected: 'نظام التحكيم', category: 'arb-arbitrators' },
  { q: 'إجراءات التحكيم', expected: 'نظام التحكيم', category: 'arb-procedure' },
  { q: 'حكم التحكيم النهائي', expected: 'نظام التحكيم', category: 'arb-award' },
  { q: 'تنفيذ حكم التحكيم', expected: 'نظام التحكيم', category: 'arb-enforcement' },
  { q: 'إبطال حكم التحكيم', expected: 'نظام التحكيم', category: 'arb-annulment' },
  { q: 'مركز التحكيم السعودي', expected: 'نظام التحكيم', category: 'arb-center' },
  { q: 'الوساطة التجارية', expected: 'نظام التحكيم', category: 'med-commercial' },
  { q: 'الوساطة العمالية', expected: 'نظام العمل', category: 'med-labor' },
  { q: 'الوساطة الأسرية', expected: 'نظام الأحوال الشخصية', category: 'med-family' },
  { q: 'الوساطة في المنازعات الإيجارية', expected: 'نظام الإيجار', category: 'med-lease' },
  { q: 'الاتفاقية الوساطية', expected: 'نظام التحكيم', category: 'med-agreement' },
  { q: 'الوسيط وتحييده', expected: 'نظام التحكيم', category: 'med-neutrality' },
  { q: 'سرية الوساطة', expected: 'نظام التحكيم', category: 'med-confidentiality' },
  { q: 'التسوية الودية', expected: 'نظام المرافعات الشرعية', category: 'settlement-friendly' },
  { q: 'الصلح قبل الدعوى', expected: 'نظام المرافعات الشرعية', category: 'settlement-pre' },
  { q: 'الصلح أثناء الدعوى', expected: 'نظام المرافعات الشرعية', category: 'settlement-during' },
  { q: 'تأثير الصلح على التنفيذ', expected: 'نظام التنفيذ', category: 'settlement-execution' },
  { q: 'الصلح في القضايا الجزائية', expected: 'نظام الإجراءات الجزائية', category: 'settlement-criminal' },
  { q: 'الصلح في حوادث المرور', expected: 'نظام المرور', category: 'settlement-traffic' },
  { q: 'عقود الصلح الودي', expected: 'نظام المرافعات الشرعية', category: 'settlement-contract' },
  { q: 'الصلح في المنازعات العمالية', expected: 'نظام العمل', category: 'settlement-labor' },
  { q: 'لجان التحكيم في البنوك', expected: 'نظام البنوك', category: 'arb-banking' },
  { q: 'التحكيم في عقود الإيجار', expected: 'نظام الإيجار', category: 'arb-lease' },
  { q: 'التحكيم في النزاعات التجارية', expected: 'نظام التحكيم', category: 'arb-commercial' },
  { q: 'التحكيم في النزاعات العقارية', expected: 'نظام التحكيم', category: 'arb-realestate' },
  { q: 'تعدد المحكمين', expected: 'نظام التحكيم', category: 'arb-multiple' },
  { q: 'تحدي المحكم', expected: 'نظام التحكيم', category: 'arb-challenge' },
  { q: 'تكاليف التحكيم', expected: 'نظام التحكيم', category: 'arb-costs' },
  
  // الدعاوى القضائية (35)
  { q: 'رفع دعوى قضائية في السعودية', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-file' },
  { q: 'صحيفة الدعوى', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-pleading' },
  { q: 'رسوم الدعوى القضائية', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-fees' },
  { q: 'الإيداع المؤقت للرسوم', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-deposit' },
  { q: 'الاختصاص المحلي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-venue' },
  { q: 'النوعي الاختصاص القضائي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-jurisdiction' },
  { q: 'القيمي الاختصاص القضائي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-value' },
  { q: 'الدفع بعدم الاختصاص', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-objection' },
  { q: 'الإحالة إلى القضاء العام', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-referral' },
  { q: 'الإجراءات التحضيرية', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-preparatory' },
  { q: 'الجلسات القضائية', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-hearing' },
  { q: 'التأجيل والحضور', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-postponement' },
  { q: 'الغياب والحضور', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-attendance' },
  { q: 'الحكم الغيابي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-default' },
  { q: 'الطعن في الحكم الغيابي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-objection-default' },
  { q: 'الشهادة والبينة', expected: 'نظام الإثبات', category: 'lawsuit-evidence' },
  { q: 'القرائن القضائية', expected: 'نظام الإثبات', category: 'lawsuit-presumptions' },
  { q: 'الخبرة والخبراء', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-experts' },
  { q: 'التحقيق العدلي', expected: 'نظام الإجراءات الجزائية', category: 'lawsuit-investigation' },
  { q: 'الاستجواب والمتهم', expected: 'نظام الإجراءات الجزائية', category: 'lawsuit-interrogation' },
  { q: 'الدفاع عن المتهم', expected: 'نظام الإجراءات الجزائية', category: 'lawsuit-defense' },
  { q: 'المحامي والتوكيل', expected: 'نظام المحاماة', category: 'lawsuit-attorney' },
  { q: 'التوكيل القضائي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-proxy' },
  { q: 'سحب التوكيل', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-revoke' },
  { q: 'التنازل عن الدعوى', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-waiver' },
  { q: 'الإشهاد والتوقيع', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-notarization' },
  { q: 'الحجز التحفظي', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-injunction' },
  { q: 'الحجز على السفن', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-ship' },
  { q: 'الحجز على الطائرات', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-aircraft' },
  { q: 'الحجز على الأموال المنقولة', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-assets' },
  { q: 'القضاء المستعجل', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-urgent' },
  { q: 'الأوامر على عرائض', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-petition' },
  { q: 'القضاء الإداري', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-admin' },
  { q: 'القضاء العمالي', expected: 'نظام العمل', category: 'lawsuit-labor' },
  { q: 'القضاء التجاري', expected: 'نظام المرافعات الشرعية', category: 'lawsuit-commercial' },
  
  // التنفيذ القضائي (35)
  { q: 'أمر الأداء وتنفيذه', expected: 'نظام التنفيذ', category: 'exec-payment' },
  { q: 'الأوراق التنفيذية', expected: 'نظام التنفيذ', category: 'exec-instruments' },
  { q: 'أحكام التنفيذ', expected: 'نظام التنفيذ', category: 'exec-judgments' },
  { q: 'سندات الإذن بالتنفيذ', expected: 'نظام التنفيذ', category: 'exec-bonds' },
  { q: 'حجز الأموال', expected: 'نظام التنفيذ', category: 'exec-seizure' },
  { q: 'حجز العقارات', expected: 'نظام التنفيذ', category: 'exec-property' },
  { q: 'حجز المنقولات', expected: 'نظام التنفيذ', category: 'exec-movables' },
  { q: 'حجز الأسهم', expected: 'نظام التنفيذ', category: 'exec-shares' },
  { q: 'حجز المركبات', expected: 'نظام التنفيذ', category: 'exec-vehicles' },
  { q: 'حجز الحسابات البنكية', expected: 'نظام التنفيذ', category: 'exec-accounts' },
  { q: 'حجز الراتب', expected: 'نظام التنفيذ', category: 'exec-salary' },
  { q: 'حجز مستحقات التأمين', expected: 'نظام التنفيذ', category: 'exec-insurance' },
  { q: 'المزاد العلني', expected: 'نظام التنفيذ', category: 'exec-auction' },
  { q: 'تقييم الأموال المحجوزة', expected: 'نظام التنفيذ', category: 'exec-valuation' },
  { q: 'بيع الأموال المحجوزة', expected: 'نظام التنفيذ', category: 'exec-sale' },
  { q: 'توزيع حصيلة البيع', expected: 'نظام التنفيذ', category: 'exec-distribution' },
  { q: 'الأولويات في التنفيذ', expected: 'نظام التنفيذ', category: 'exec-priority' },
  { q: 'تنفيذ الأحكام الأجنبية', expected: 'نظام التنفيذ', category: 'exec-foreign' },
  { q: 'تنفيذ أحكام التحكيم', expected: 'نظام التنفيذ', category: 'exec-arbitration' },
  { q: 'الاعتراض على التنفيذ', expected: 'نظام التنفيذ', category: 'exec-objection' },
  { q: 'وقف التنفيذ', expected: 'نظام التنفيذ', category: 'exec-stay' },
  { q: 'تنفيذ الأحكام الجزائية', expected: 'نظام الإجراءات الجزائية', category: 'exec-criminal' },
  { q: 'تنفيذ العقوبات المالية', expected: 'نظام الإجراءات الجزائية', category: 'exec-penalties' },
  { q: 'تنفيذ الحدود الشرعية', expected: 'الفقه الإسلامي', category: 'exec-hudud' },
  { q: 'تنفيذ القصاص', expected: 'الفقه الإسلامي', category: 'exec-qisas' },
  { q: 'الدية وتنفيذها', expected: 'الفقه الإسلامي', category: 'exec-diya' },
  { q: 'الحبس في قضايا المديونية', expected: 'نظام التنفيذ', category: 'exec-imprisonment' },
  { q: 'الإفلاس والتصفية', expected: 'نظام الإفلاس', category: 'exec-bankruptcy' },
  { q: 'حماية المدين', expected: 'نظام التنفيذ', category: 'exec-debtor' },
  { q: 'إعفاء الدين', expected: 'نظام التنفيذ', category: 'exec-relief' },
  { q: 'التنازل عن الدين', expected: 'نظام المرافعات الشرعية', category: 'exec-waiver' },
  { q: 'المصالحة في التنفيذ', expected: 'نظام التنفيذ', category: 'exec-settlement' },
  { q: 'تقسيط الديون', expected: 'نظام التنفيذ', category: 'exec-installments' },
  { q: 'التنفيذ المعجل', expected: 'نظام التنفيذ', category: 'exec-expedited' },
  { q: 'التنفيذ العاجل', expected: 'نظام التنفيذ', category: 'exec-urgent' },
  
  // ═══════════════════════════════════════════════════════════════════
  // القسم 5: سيناريوهات واقعية — 50 سؤال
  // ═══════════════════════════════════════════════════════════════════
  { q: 'موظف تم فصله تعسفياً ويريد رفع دعوى', expected: 'نظام العمل', category: 'scenario-labor' },
  { q: 'تاجر يبيع منتج مغشوش للمستهلك', expected: 'نظام حماية المستهلك', category: 'scenario-consumer' },
  { q: 'شركة ترفض دفع مستحقات مورد', expected: 'نظام التنفيذ', category: 'scenario-payment' },
  { q: 'زوج يريد الطلاق من زوجته', expected: 'نظام الأحوال الشخصية', category: 'scenario-divorce' },
  { q: 'ورثة يتنازعون على تركة ميت', expected: 'نظام الأحوال الشخصية', category: 'scenario-inheritance' },
  { q: 'مستأجر يرفض دفع الإيجار', expected: 'نظام الإيجار', category: 'scenario-lease' },
  { q: 'مالك عقار يريد إخلاء المستأجر', expected: 'نظام الإيجار', category: 'scenario-eviction' },
  { q: 'بنك يرفع الفائدة على قرض', expected: 'الفقه الإسلامي', category: 'scenario-riba' },
  { q: 'هاكر يسرق بيانات بطاقات ائتمانية', expected: 'نظام مكافحة جرائم المعلوماتية', category: 'scenario-hacking' },
  { q: 'شركة تبيع بيانات عملائها لطرف ثالث', expected: 'نظام حماية البيانات الشخصية', category: 'scenario-pdpl' },
  { q: 'سائق يسبب حادث وفاة', expected: 'نظام المرور', category: 'scenario-accident' },
  { q: 'عامل يسرق من مصنع', expected: 'نظام الإجراءات الجزائية', category: 'scenario-theft' },
  { q: 'تاجر يتهرب من الضرائب', expected: 'نظام الضريبة على الدخل', category: 'scenario-tax' },
  { q: 'شركة تخفي أرباحها عن الهيئة الضريبية', expected: 'نظام الهيئة العامة للزكاة والدخل', category: 'scenario-zakat' },
  { q: 'أجنبي يريد تأسيس شركة في السعودية', expected: 'نظام الاستثمار الأجنبي', category: 'scenario-investment' },
  { q: 'متجر إلكتروني يرفض استرجاع منتج معيب', expected: 'نظام حماية المستهلك', category: 'scenario-ecommerce' },
  { q: 'طبيب يرتكب خطأ طبي يؤدي لوفاة', expected: 'نظام الممارسات الصحية', category: 'scenario-medical' },
  { q: 'مدرس يعتدي على طالب', expected: 'نظام التعليم', category: 'scenario-education' },
  { q: 'مسؤول يتلقى رشوة لتمرير صفقة', expected: 'نظام مكافحة الرشوة', category: 'scenario-bribery' },
  { q: 'موظف حكومي يفشي سراً رسمياً', expected: 'نظام الجرائم الإلكترونية', category: 'scenario-leak' },
  { q: 'شركة تستخدم برنامج مقرصن', expected: 'نظام حماية الملكية الفكرية', category: 'scenario-piracy' },
  { q: 'مستثمر يتهم شركة بالاحتيال', expected: 'نظام أسواق المال', category: 'scenario-fraud' },
  { q: 'بنك يرفض صرف شيك بدون سبب', expected: 'نظام البنوك', category: 'scenario-check' },
  { q: 'تأمين يرفض دفع تعويض', expected: 'نظام التأمين', category: 'scenario-insurance' },
  { q: 'مقاول يهرب من العمل ويترك المشروع', expected: 'نظام المناقصات', category: 'scenario-contractor' },
  { q: 'مورد يرفض تسليم بضاعة مدفوعة', expected: 'نظام التجارة', category: 'scenario-supply' },
  { q: 'شريك يسحب أموال من الشركة', expected: 'نظام الشركات', category: 'scenario-partner' },
  { q: 'مساهم يطالب بإبطال اجتماع الجمعية', expected: 'نظام الشركات', category: 'scenario-shareholder' },
  { q: 'عميل يرفض دفع قيمة شحنة مستوردة', expected: 'نظام الجمارك الموحد', category: 'scenario-import' },
  { q: 'مصنع يلوث البيئة بمخلفات صناعية', expected: 'نظام البيئة', category: 'scenario-environment' },
  { q: 'شركة تأجير سيارات ترفض رد التأمين', expected: 'نظام حماية المستهلك', category: 'scenario-rental' },
  { q: 'فندق يرفض استضافة نزيل', expected: 'نظام السياحة', category: 'scenario-hotel' },
  { q: 'وكالة سفر تبيع تأشيرة مزورة', expected: 'نظام الإقامة', category: 'scenario-visa' },
  { q: 'مكتب عقاري يأخذ عمولة مضاعفة', expected: 'نظام الوساطة العقارية', category: 'scenario-broker' },
  { q: 'مقيّم عقاري يبالغ في قيمة عقار', expected: 'نظام التقييم العقاري', category: 'scenario-appraisal' },
  { q: 'محامي يفشي سر موكله', expected: 'نظام المحاماة', category: 'scenario-lawyer' },
  { q: 'محكم يتقاضى رشوة لحكم محدد', expected: 'نظام التحكيم', category: 'scenario-arbitrator' },
  { q: 'طبيب نفسي يفشي معلومات مريض', expected: 'نظام الصحة النفسية', category: 'scenario-psych' },
  { q: 'صيدلانية تبيع دواء منتهي الصلاحية', expected: 'نظام مكافحة الغش التجاري', category: 'scenario-pharmacy' },
  { q: 'مطعم يستخدم مواد غذائية فاسدة', expected: 'نظام الغذاء والدواء', category: 'scenario-food' },
  { q: 'شركة طيران تلغي رحلة بدون تعويض', expected: 'نظام الطيران المدني', category: 'scenario-flight' },
  { q: 'نقل مشترك يرفض استقبال راكب معاق', expected: 'نظام حقوق الأشخاص ذوي الإعاقة', category: 'scenario-disability' },
  { q: 'مدرسة ترفض قبول طالب ذوي إعاقة', expected: 'نظام التعليم', category: 'scenario-education-disability' },
  { q: 'جمعية خيرية تختلس تبرعات', expected: 'نظام الجمعيات', category: 'scenario-charity' },
  { q: 'منصة تداول تتلاعب بأسعار الأسهم', expected: 'نظام أسواق المال', category: 'scenario-manipulation' },
  { q: 'بنك مركزي يرفض ترخيص بنك رقمي', expected: 'نظام البنوك', category: 'scenario-sama' },
  { q: 'مؤسسة حكومية ترفض طلب معلومات', expected: 'نظام الوصول للمعلومات', category: 'scenario-transparency' },
  { q: 'شركة AI تستخدم بيانات بدون إذن', expected: 'نظام حماية البيانات الشخصية', category: 'scenario-ai-privacy' }
];

console.log(`📋 إجمالي الأسئلة: ${COMPREHENSIVE_TESTS.length}`);
console.log('');

// ═══════════════════════════════════════════════════════════════════
// تشغيل الاختبار
// ═══════════════════════════════════════════════════════════════════
function extractSystems(text) {
  const systems = [];
  const textLower = text.toLowerCase();
  
  for (const mapping of MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        systems.push(...mapping.systems);
        break;
      }
    }
  }
  
  return [...new Set(systems)];
}

console.log('🧪 Running Comprehensive Tests...\n');

let passed = 0;
let failed = 0;
const categoryStats = {};
const failures = [];

for (const test of COMPREHENSIVE_TESTS) {
  const systems = extractSystems(test.q);
  const pass = systems.includes(test.expected);
  
  if (!categoryStats[test.category]) {
    categoryStats[test.category] = { passed: 0, total: 0 };
  }
  categoryStats[test.category].total++;
  
  if (pass) {
    passed++;
    categoryStats[test.category].passed++;
  } else {
    failed++;
    failures.push({
      question: test.q.substring(0, 50) + (test.q.length > 50 ? '...' : ''),
      expected: test.expected,
      found: systems.length > 0 ? systems.slice(0, 3).join(', ') : 'None'
    });
  }
}

// ═══════════════════════════════════════════════════════════════════
// النتائج
// ═══════════════════════════════════════════════════════════════════
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║          📊 COMPREHENSIVE TEST RESULTS — 500+ Questions       ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

const passRate = (passed / COMPREHENSIVE_TESTS.length * 100).toFixed(1);
console.log(`   ✅ Passed: ${passed}/${COMPREHENSIVE_TESTS.length} (${passRate}%)`);
console.log(`   ❌ Failed: ${failed}/${COMPREHENSIVE_TESTS.length}`);
console.log('');

// تجميع حسب الفئة الرئيسية
const mainCategories = {
  'Fiqh': ['fiqh-major', 'fiqh-riba', 'fiqh-gharar', 'fiqh-gambling', 'fiqh-fraud', 'fiqh-khiyar', 'fiqh-sale', 'fiqh-ijara', 'fiqh-mudaraba', 'fiqh-musharaka', 'fiqh-salam', 'fiqh-istisna', 'fiqh-rahn', 'fiqh-kafala', 'fiqh-marriage', 'fiqh-polygamy', 'fiqh-talaq', 'fiqh-khul', 'fiqh-zhihar', 'fiqh-ila', 'fiqh-lian', 'fiqh-rada', 'fiqh-hadana', 'fiqh-nafaqa', 'fiqh-mahr', 'fiqh-wilaya', 'fiqh-wasiyya', 'fiqh-idda', 'fiqh-mahram', 'fiqh-nushuz', 'fiqh-inheritance', 'fiqh-prayer', 'fiqh-tahara', 'fiqh-tayammum', 'fiqh-zakat', 'fiqh-fasting', 'fiqh-hajj'],
  'Labor': ['labor-contract', 'labor-rights', 'labor-termination', 'labor-eosb', 'labor-hours', 'labor-overtime', 'labor-leave', 'labor-maternity', 'labor-insurance', 'labor-saudization', 'labor-domestic', 'labor-injury', 'labor-harassment'],
  'Companies': ['company-establish', 'company-types', 'company-llc', 'company-jsc', 'company-partnership', 'company-spc', 'company-ga', 'company-board', 'company-shareholders', 'company-dividends', 'company-loans', 'company-bankruptcy', 'company-minority', 'company-esop', 'company-treasury'],
  'Real Estate': ['lease-residential', 'lease-commercial', 'lease-duration', 'lease-increase', 'lease-eviction', 'lease-termination', 'lease-maintenance', 'lease-sublease', 'lease-assignment', 'mortgage-individual', 'mortgage-bank', 'mortgage-fund', 'realestate-brokerage', 'realestate-appraisal', 'realestate-foreign', 'realestate-planning', 'realestate-permit', 'municipal-violations', 'municipal-demolition', 'municipal-architecture'],
  'Judicial': ['judicial-jurisdiction', 'judicial-courts', 'judicial-circuits', 'judicial-appeal', 'judicial-lawsuit', 'judicial-procedure', 'evidence-proof', 'evidence-witness', 'evidence-confession', 'evidence-oath', 'evidence-circumstantial', 'judicial-expert', 'arbitration', 'arbitration-contract', 'arbitration-award', 'enforcement', 'enforcement-payment', 'enforcement-seizure', 'enforcement-compulsory', 'enforcement-expedited'],
  'Criminal': ['criminal-procedure', 'criminal-arrest', 'criminal-rights', 'criminal-investigation', 'cyber-crime', 'cyber-hacking', 'cyber-extortion', 'cyber-espionage', 'cyber-security', 'organized-crime', 'aml', 'aml-reporting', 'drug-trafficking', 'terrorism', 'financial-crime'],
  'Traffic': ['traffic-violations', 'traffic-fines', 'traffic-accidents', 'traffic-license', 'traffic-renewal', 'traffic-impound', 'residency', 'residency-renewal', 'residency-transfer', 'residency-exit', 'nationality', 'nationalization', 'civil-status', 'id-card', 'family-record'],
  'Tax': ['tax-income', 'tax-vat', 'tax-exemption', 'tax-return', 'zakat-money', 'zakat-trade', 'zakat-authority', 'zakat-corporate', 'tax-property', 'customs-duties', 'customs-import', 'customs-smuggling', 'customs-tariff', 'customs-freezone', 'commercial-register'],
  'Consumer': ['consumer-rights', 'consumer-ads', 'consumer-defects', 'consumer-return', 'consumer-warranty', 'consumer-penalties', 'consumer-fraud', 'consumer-quality', 'standards-quality', 'standards-mandatory', 'standards-saso', 'consumer-food', 'consumer-counterfeit', 'consumer-pricing', 'competition-monopoly', 'competition-pricing', 'competition-unfair', 'consumer-disclosure', 'consumer-telemarketing', 'consumer-withdrawal', 'consumer-dispute', 'consumer-committee', 'consumer-fines', 'consumer-closure', 'consumer-publicity', 'consumer-precaution'],
  'E-commerce': ['ecommerce-store', 'ecommerce-license', 'ecommerce-cr', 'ecommerce-sale', 'ecommerce-tos', 'ecommerce-privacy', 'ecommerce-payment', 'ecommerce-gateway', 'ecommerce-security', 'ecommerce-fraud', 'ecommerce-theft', 'ecommerce-rights', 'ecommerce-return', 'ecommerce-delivery', 'ecommerce-cancel', 'ecommerce-platforms', 'ecommerce-reviews', 'ecommerce-fake', 'ecommerce-deceptive', 'ecommerce-pricing', 'ecommerce-counterfeit', 'ecommerce-ip', 'ecommerce-shipping', 'ecommerce-customs', 'ecommerce-affiliate'],
  'Platforms': ['platforms-delivery', 'platforms-rideshare', 'platforms-rental', 'platforms-parcel', 'platforms-services', 'platforms-hotels', 'platforms-flights', 'platforms-education', 'platforms-crowdfunding', 'platforms-investment', 'platforms-fintech', 'platforms-wallet', 'platforms-trading', 'platforms-health', 'platforms-legal', 'platforms-realestate', 'platforms-jobs', 'platforms-food', 'platforms-classified', 'platforms-payment'],
  'AI & Data': ['ai-system', 'ai-ethics', 'ai-training', 'pdpl-data', 'pdpl-consent', 'pdpl-transfer', 'pdpl-access', 'pdpl-correction', 'pdpl-deletion', 'pdpl-breach', 'pdpl-compliance', 'pdpl-dpo', 'pdpl-dpia', 'ai-meetings', 'ai-signature', 'ai-contracts', 'ai-identity', 'ai-recognition', 'ai-liability', 'ai-content', 'ai-copyright', 'ai-bias', 'ai-transparency', 'ai-oversight', 'pdpl-safety']
};

console.log('Category Performance:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

for (const [mainCat, subCats] of Object.entries(mainCategories)) {
  let catPassed = 0;
  let catTotal = 0;
  
  for (const subCat of subCats) {
    if (categoryStats[subCat]) {
      catPassed += categoryStats[subCat].passed;
      catTotal += categoryStats[subCat].total;
    }
  }
  
  if (catTotal > 0) {
    const catRate = (catPassed / catTotal * 100).toFixed(0);
    const icon = catRate >= 90 ? '✅' : catRate >= 70 ? '⚠️' : '❌';
    console.log(`   ${icon} ${mainCat.padEnd(15)}: ${catPassed}/${catTotal} (${catRate}%)`);
  }
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// تقييم عام
if (passRate >= 90) {
  console.log('   🏆 EXCELLENT: أداء ممتاز — جاهز للإنتاج');
} else if (passRate >= 80) {
  console.log('   ✅ GOOD: أداء جيد — يحتاج تحسينات بسيطة');
} else if (passRate >= 70) {
  console.log('   ⚠️ FAIR: أداء مقبول — يحتاج تحسينات متوسطة');
} else {
  console.log('   ❌ POOR: يحتاج تحسينات كبيرة');
}

console.log('');

// عرض بعض الفاشلات
if (failures.length > 0) {
  console.log('Sample Failures (first 10):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  failures.slice(0, 10).forEach((f, i) => {
    console.log(`   ${i + 1}. ${f.question}`);
    console.log(`      Expected: ${f.expected}`);
    console.log(`      Found: ${f.found}`);
  });
}

// حفظ التقرير
const report = {
  version: mappingData.version,
  timestamp: new Date().toISOString(),
  totalTests: COMPREHENSIVE_TESTS.length,
  passed,
  failed,
  passRate: `${passRate}%`,
  categoryStats,
  failures: failures.slice(0, 50)
};

fs.writeFileSync('comprehensive-test-500-report.json', JSON.stringify(report, null, 2));

console.log('');
console.log('✅ Report saved: comprehensive-test-500-report.json');
console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                     🎯 TEST COMPLETE                          ║');
console.log('╚════════════════════════════════════════════════════════════════╝');

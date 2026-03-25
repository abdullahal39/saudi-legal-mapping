#!/usr/bin/env node
/**
 * 🧪 Quality Assurance Test — 100 Comprehensive Queries
 * اختبار شامل لـ Mapping v4 على 100 سؤال متنوع
 */

const fs = require('fs');

// تحميل Mapping v4 PRODUCTION
const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v4-production.json', 'utf8'));
const MAPPINGS = mappingData.mappings;

/**
 * 100 سؤال اختبار شامل — يغطي جميع القطاعات
 */
const TEST_QUERIES = [
  // ═══════════════════════════════════════════════════════════════════
  // الفقه الإسلامي (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي قاعدة لا ضرر ولا ضرار في الفقه الإسلامي؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'هل الربا حرام في جميع الأحوال؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما حكم الغرر في البيع؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما هي شروط صحة البيع في الفقه؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما حكم القمار والميسر؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما هي قاعدة الضرورات تبيح المحظورات؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما هو حد السرقة في الإسلام؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما هي شروط القصاص في النفس؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما هي أحكام الولاية في الزواج؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  { q: 'ما حكم النفقة على الزوجة؟', category: 'fiqh', expectedSystems: ['الفقه الإسلامي'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // نظام العمل (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي حقوق العامل في فترة التجربة؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'هل يجوز فصل الموظفة الحامل؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي مدة الإجازة السنوية للعامل؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'كيف يتم إنهاء عقد العمل غير المحدد؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي مكافأة نهاية الخدمة؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي الإجازة المرضية في نظام العمل؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'هل يحق للعامل الاستقالة بدون إشعار؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي ساعات العمل القانونية؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي أجر العامل في الإجازة؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  { q: 'ما هي حماية المرأة العاملة في نظام العمل؟', category: 'labor', expectedSystems: ['نظام العمل'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // نظام التنفيذ (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي شروط سند التنفيذ؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'كيف يتم حجز أموال المدين؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هي إجراءات بيع العقار بالمزاد؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هو الإعسار في نظام التنفيذ؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هي أتعاب المحاماة في التنفيذ؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هي المادة 16 في نظام التنفيذ؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'كيف يتم تنفيذ حكم المحكمة؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هي شروط الحجز التحفظي؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هو سند اللأمر؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  { q: 'ما هي أولويات الدائنين في التنفيذ؟', category: 'enforcement', expectedSystems: ['نظام التنفيذ'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // نظام الإثبات والمرافعات (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي شروط قبول البينة في المحكمة؟', category: 'evidence', expectedSystems: ['نظام الإثبات'] },
  { q: 'ما حكم الإقرار القضائي؟', category: 'evidence', expectedSystems: ['نظام الإثبات'] },
  { q: 'كيف يتم التحليف باليمين؟', category: 'evidence', expectedSystems: ['نظام الإثبات'] },
  { q: 'ما هي شروط صحيفة الدعوى؟', category: 'procedures', expectedSystems: ['نظام المرافعات الشرعية'] },
  { q: 'ما هي درجات التقاضي في المملكة؟', category: 'procedures', expectedSystems: ['نظام القضاء', 'نظام المرافعات الشرعية'] },
  { q: 'ما هو الخيار في المرافعات الشرعية؟', category: 'procedures', expectedSystems: ['نظام المرافعات الشرعية'] },
  { q: 'ما هي شروط استئناف الحكم؟', category: 'procedures', expectedSystems: ['نظام المرافعات الشرعية'] },
  { q: 'ما هي اختصاصات المحكمة العليا؟', category: 'judiciary', expectedSystems: ['نظام القضاء'] },
  { q: 'ما هي الدلائل الإلكترونية في المحاكم؟', category: 'evidence', expectedSystems: ['نظام البينات', 'نظام الإثبات'] },
  { q: 'ما هو التوقيع الإلكتروني في الإثبات؟', category: 'evidence', expectedSystems: ['نظام البينات'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // الأنظمة الاقتصادية (15 سؤال)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي ضريبة القيمة المضافة VAT؟', category: 'tax', expectedSystems: ['نظام الضرائب', 'نظام ضريبة القيمة المضافة'] },
  { q: 'ما هي نسبة الزكاة الشرعية؟', category: 'zakat', expectedSystems: ['نظام الزكاة'] },
  { q: 'ما هي إجراءات الاستيراد من الجمارك؟', category: 'customs', expectedSystems: ['نظام الجمارك الموحد'] },
  { q: 'ما هو التهريب الجمركي وعقوبته؟', category: 'customs', expectedSystems: ['نظام الجمارك الموحد'] },
  { q: 'ما هي شروط الاستثمار الأجنبي في السعودية؟', category: 'investment', expectedSystems: ['نظام الاستثمار'] },
  { q: 'ما هي نسبة التملك الأجنبي؟', category: 'investment', expectedSystems: ['نظام الاستثمار'] },
  { q: 'ما هي مكافحة الاحتكار في المملكة؟', category: 'competition', expectedSystems: ['نظام المنافسة'] },
  { q: 'ما هو غسل الأموال وكيف يُكافح؟', category: 'aml', expectedSystems: ['نظام مكافحة غسل الأموال'] },
  { q: 'ما هي اشتراطات التأمين الاجتماعي؟', category: 'insurance', expectedSystems: ['نظام التأمينات الاجتماعية'] },
  { q: 'ما هي معاشات الضمان الاجتماعي؟', category: 'social', expectedSystems: ['نظام الضمان الاجتماعي'] },
  { q: 'ما هي تراخيص مزاولة مهنة المحاسبة؟', category: 'profession', expectedSystems: ['نظام مزاولة مهنة المحاسبة'] },
  { q: 'ما هي شروط ترخيص البنوك؟', category: 'banking', expectedSystems: ['نظام البنوك'] },
  { q: 'ما هو التمويل العقاري؟', category: 'finance', expectedSystems: ['نظام مراقبة التمويل'] },
  { q: 'ما هي إجراءات إفلاس الشركة؟', category: 'bankruptcy', expectedSystems: ['نظام الإفلاس'] },
  { q: 'ما هي الأوراق المالية وطرحها؟', category: 'securities', expectedSystems: ['نظام السوق المالية'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // الأنظمة الخدمية (15 سؤال)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي إجراءات استخراج رخصة قيادة؟', category: 'traffic', expectedSystems: ['نظام المرور'] },
  { q: 'ما هي مخالفات المرور وعقوباتها؟', category: 'traffic', expectedSystems: ['نظام المرور'] },
  { q: 'ما هي شروط رخصة البناء؟', category: 'municipal', expectedSystems: ['نظام البلديات'] },
  { q: 'ما هي مخالفات البناء وإزالتها؟', category: 'municipal', expectedSystems: ['نظام البلديات', 'نظام إجراءات مخالفات البناء'] },
  { q: 'ما هي اشتراطات فتح مطعم؟', category: 'health', expectedSystems: ['نظام البلديات', 'نظام الغذاء'] },
  { q: 'ما هي تراخيص المنشآت الصحية؟', category: 'health', expectedSystems: ['نظام الصحة', 'نظام المؤسسات الصحية الخاصة'] },
  { q: 'ما هي شروط فتح صيدلية؟', category: 'pharmacy', expectedSystems: ['نظام الأدوية', 'نظام مزاولة مهنة الصيدلة'] },
  { q: 'ما هي تراخيص الاتصالات؟', category: 'telecom', expectedSystems: ['نظام الاتصالات'] },
  { q: 'ما هي خدمات البريد السعودي SPL؟', category: 'postal', expectedSystems: ['نظام البريد'] },
  { q: 'ما هي تراخيص النقل البري؟', category: 'transport', expectedSystems: ['نظام النقل'] },
  { q: 'ما هي شروط الزراعة في المملكة؟', category: 'agriculture', expectedSystems: ['نظام الزراعة'] },
  { q: 'ما هي معايير حماية البيئة؟', category: 'environment', expectedSystems: ['نظام البيئة'] },
  { q: 'ما هي تراخيص الفنادق والسياحة؟', category: 'tourism', expectedSystems: ['نظام السياحة'] },
  { q: 'ما هي اشتراطات فتح مدرسة أهلية؟', category: 'education', expectedSystems: ['نظام التعليم الأهلي'] },
  { q: 'ما هي إجراءات التعليم الجامعي؟', category: 'education', expectedSystems: ['نظام الجامعات'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // الأنظمة الأمنية والقضائية (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي عقوبات الجرائم الإلكترونية؟', category: 'cybercrime', expectedSystems: ['نظام مكافحة جرائم المعلوماتية', 'نظام الجرائم المعلوماتية'] },
  { q: 'ما هو الابتزاز الإلكتروني وعقوبته؟', category: 'cybercrime', expectedSystems: ['نظام مكافحة جرائم المعلوماتية'] },
  { q: 'ما هي شروط حمل السلاح؟', category: 'weapons', expectedSystems: ['نظام الأسلحة والذخائر'] },
  { q: 'ما هي إجراءات الدفاع المدني؟', category: 'civildefense', expectedSystems: ['نظام الدفاع المدني'] },
  { q: 'ما هي شروط الإقامة للأجانب؟', category: 'residency', expectedSystems: ['نظام الإقامة'] },
  { q: 'ما هي إجراءات تجنيس الأجنبي؟', category: 'nationality', expectedSystems: ['نظام الجنسية'] },
  { q: 'ما هي حقوق المتهم عند القبض؟', category: 'criminal', expectedSystems: ['نظام الإجراءات الجزائية'] },
  { q: 'ما هي مراحل التحقيق الجنائي؟', category: 'criminal', expectedSystems: ['نظام الإجراءات الجزائية'] },
  { q: 'ما هي إجراءات الحج والعمرة؟', category: 'hajj', expectedSystems: ['نظام الحج والعمرة'] },
  { q: 'ما هي شروط إدارة الأوقاف؟', category: 'awqaf', expectedSystems: ['نظام الأوقاف'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // أنظمة العمل والمهن (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي برامج التوطين في السعودية؟', category: 'saudization', expectedSystems: ['نظام نطاقات', 'نظام الموارد البشرية'] },
  { q: 'ما هو برنامج نطاقات؟', category: 'saudization', expectedSystems: ['نظام نطاقات'] },
  { q: 'ما هي شروط مزاولة المحاماة؟', category: 'legal', expectedSystems: ['نظام المحاماة'] },
  { q: 'ما هي تراخيص المهن الصحية؟', category: 'medical', expectedSystems: ['نظام مزاولة مهن الصحة'] },
  { q: 'ما هي اشتراطات مزاولة الهندسة؟', category: 'engineering', expectedSystems: ['نظام مزاولة مهنة الهندسة'] },
  { q: 'ما هي إجراءات نقل خدمات العمالة؟', category: 'labor', expectedSystems: ['نظام نقل خدمات العمالة'] },
  { q: 'ما هي حقوق العمالة المنزلية؟', category: 'domestic', expectedSystems: ['لائحة العمالة المنزلية'] },
  { q: 'ما هي اشتراطات استقدام الخادمة؟', category: 'domestic', expectedSystems: ['لائحة العمالة المنزلية'] },
  { q: 'ما هي برامج التدريب التقني؟', category: 'training', expectedSystems: ['نظام التدريب التقني والمهني'] },
  { q: 'ما هي إجراءات تسجيل المنشآت؟', category: 'business', expectedSystems: ['نظام المنشآت'] },
  
  // ═══════════════════════════════════════════════════════════════════
  // أنظمة التقنية والملكية الفكرية (10 أسئلة)
  // ═══════════════════════════════════════════════════════════════════
  { q: 'ما هي حماية حقوق المؤلف؟', category: 'copyright', expectedSystems: ['نظام حماية حقوق المؤلف'] },
  { q: 'ما هي شروط تسجيل علامة تجارية؟', category: 'trademark', expectedSystems: ['نظام العلامات التجارية'] },
  { q: 'ما هي إجراءات براءة الاختراع؟', category: 'patent', expectedSystems: ['نظام براءات الاختراع'] },
  { q: 'ما هي حماية البيانات الشخصية PDPL؟', category: 'privacy', expectedSystems: ['نظام حماية البيانات الشخصية'] },
  { q: 'ما هي حقوق الأفراد في البيانات؟', category: 'privacy', expectedSystems: ['نظام حماية البيانات الشخصية'] },
  { q: 'ما هي خدمات الحكومة الإلكترونية؟', category: 'egov', expectedSystems: ['نظام الحكومة الإلكترونية'] },
  { q: 'ما هو الأمن السيبراني في المملكة؟', category: 'cybersecurity', expectedSystems: ['نظام الأمن السيبراني'] },
  { q: 'ما هي حماية البنية التحتية الحيوية؟', category: 'critical', expectedSystems: ['نظام الأمن السيبراني للبنية التحتية الحيوية'] },
  { q: 'ما هي استخدامات الذكاء الاصطناعي في الحكومة؟', category: 'ai', expectedSystems: ['نظام الذكاء الاصطناعي'] },
  { q: 'ما هي مشاريع المدن الذكية؟', category: 'smartcity', expectedSystems: ['نظام المدن الذكية'] }
];

/**
 * استخراج الكيانات باستخدام Mapping v4
 */
function extractEntitiesV4(text) {
  const entities = {
    articles: [],
    systems: [],
    fiqhRules: []
  };
  
  const textLower = text.toLowerCase();
  
  for (const mapping of MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        if (mapping.articles) {
          entities.articles.push(...mapping.articles);
        }
        if (mapping.systems) {
          entities.systems.push(...mapping.systems);
        }
        if (mapping.fiqhRule) {
          entities.fiqhRules.push(mapping.fiqhRule);
        }
        break;
      }
    }
  }
  
  // إزالة التكرار
  entities.articles = [...new Set(entities.articles)];
  entities.systems = [...new Set(entities.systems)];
  entities.fiqhRules = [...new Set(entities.fiqhRules)];
  
  return entities;
}

/**
 * اختبار الجودة
 */
async function runQualityTest() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     🧪 Quality Assurance Test — 100 Queries v4           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Mapping Version: v4 FINAL (${MAPPINGS.length} mappings)`);
  console.log(`Test Queries: ${TEST_QUERIES.length}`);
  console.log('');
  
  let passed = 0;
  let failed = 0;
  const results = {
    fiqh: { passed: 0, total: 0 },
    labor: { passed: 0, total: 0 },
    enforcement: { passed: 0, total: 0 },
    evidence: { passed: 0, total: 0 },
    tax: { passed: 0, total: 0 },
    customs: { passed: 0, total: 0 },
    investment: { passed: 0, total: 0 },
    traffic: { passed: 0, total: 0 },
    municipal: { passed: 0, total: 0 },
    health: { passed: 0, total: 0 },
    cybercrime: { passed: 0, total: 0 },
    residency: { passed: 0, total: 0 },
    saudization: { passed: 0, total: 0 },
    legal: { passed: 0, total: 0 },
    copyright: { passed: 0, total: 0 },
    privacy: { passed: 0, total: 0 },
    cybersecurity: { passed: 0, total: 0 }
  };
  
  for (let i = 0; i < TEST_QUERIES.length; i++) {
    const test = TEST_QUERIES[i];
    const entities = extractEntitiesV4(test.q);
    
    // التحقق من النظام المتوقع
    let systemMatch = false;
    if (test.expectedSystems) {
      systemMatch = test.expectedSystems.some(exp => 
        entities.systems.includes(exp)
      );
    }
    
    const pass = systemMatch;
    if (pass) {
      passed++;
      if (results[test.category]) results[test.category].passed++;
    } else {
      failed++;
    }
    if (results[test.category]) results[test.category].total++;
    
    // طباعة النتيجة
    if (i < 20 || !pass) { // طباعة أول 20 + الفاشلة
      console.log(`${pass ? '✅' : '❌'} [${test.category}] ${test.q.substring(0, 50)}...`);
      console.log(`   Systems: ${entities.systems.join(', ') || 'None'}`);
      if (!pass) {
        console.log(`   Expected: ${test.expectedSystems.join(' أو ')}`);
      }
      console.log('');
    }
  }
  
  // التقرير النهائي
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    📊 FINAL REPORT                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Overall Results:');
  console.log(`   ✅ Passed: ${passed}/${TEST_QUERIES.length} (${(passed/TEST_QUERIES.length*100).toFixed(1)}%)`);
  console.log(`   ❌ Failed: ${failed}/${TEST_QUERIES.length} (${(failed/TEST_QUERIES.length*100).toFixed(1)}%)`);
  console.log('');
  
  console.log('Category Breakdown:');
  Object.entries(results).forEach(([cat, data]) => {
    if (data.total > 0) {
      const pct = (data.passed/data.total*100).toFixed(0);
      console.log(`   ${cat.padEnd(15)}: ${data.passed}/${data.total} (${pct}%)`);
    }
  });
  
  console.log('');
  console.log('Quality Assessment:');
  const passRate = passed/TEST_QUERIES.length*100;
  if (passRate >= 95) {
    console.log('   🏆 EXCELLENT: جودة ممتازة — جاهز للإنتاج');
  } else if (passRate >= 85) {
    console.log('   ✅ GOOD: جودة جيدة — يحتاج تحسينات بسيطة');
  } else if (passRate >= 70) {
    console.log('   ⚠️ FAIR: جودة مقبولة — يحتاج تحسينات متوسطة');
  } else {
    console.log('   ❌ POOR: جودة ضعيفة — يحتاج مراجعة شاملة');
  }
  
  // Save results
  const report = {
    timestamp: new Date().toISOString(),
    mappingVersion: 'v4 FINAL',
    totalQueries: TEST_QUERIES.length,
    passed,
    failed,
    passRate: `${passRate.toFixed(1)}%`,
    categoryResults: results
  };
  fs.writeFileSync('quality-test-report-v4.json', JSON.stringify(report, null, 2));
  console.log('');
  console.log('✅ Report saved: quality-test-report-v4.json');
}

runQualityTest().catch(console.error);

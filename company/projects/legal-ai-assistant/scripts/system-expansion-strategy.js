#!/usr/bin/env node
/**
 * 🎯 System-by-System Question Expansion Strategy
 * استراتيجية التوسيع النظامي للأسئلة - نظام تلو الآخر
 */

const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🎯 SYSTEMATIC QUESTION EXPANSION STRATEGY               ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// ترتيب الأنظمة حسب الطلب والأهمية (بناءً على معرفة المجال)
const PRIORITY_SYSTEMS = [
  // المستوى 1: الأكثر طلباً
  {
    rank: 1,
    system: 'نظام التأمينات الاجتماعية',
    category: 'insurance',
    estimatedQueries: '500K+/month',
    priority: 'CRITICAL',
    reasons: ['معاشات', 'تقاعد', 'إصابات عمل', 'تأمين طبي', 'نقل خدمات'],
    searchTerms: [
      'تأمينات اجتماعية معاش',
      'نقل خدمات تأمينات',
      'تقاعد تأمينات',
      'إصابة عمل تأمينات',
      'اشتراك تأمينات',
      'المستفيد من التأمينات',
      'تعويض تأمينات',
      'مكافأة نهاية خدمة تأمينات'
    ]
  },
  {
    rank: 2,
    system: 'نظام العمل',
    category: 'labor',
    estimatedQueries: '400K+/month',
    priority: 'CRITICAL',
    reasons: ['عقود عمل', 'إجازات', 'نهاية خدمة', 'مكافآت', 'نزاعات عملية'],
    searchTerms: [
      'عقد عمل سعودي',
      'مكافأة نهاية خدمة',
      'إجازة عمل',
      'فسخ عقد عمل',
      'نزاع عمل',
      'صاحب عمل حقوق',
      'عامل حقوق',
      'إنهاء خدمة موظف'
    ]
  },
  {
    rank: 3,
    system: 'نظام الإيجار',
    category: 'lease',
    estimatedQueries: '350K+/month',
    priority: 'CRITICAL',
    reasons: ['نزاعات إيجار', 'إخلاء', 'زيادة إيجار', 'عقود إيجار', 'منصة إيجار'],
    searchTerms: [
      'عقد إيجار سكني',
      'إخلاء مستأجر',
      'زيادة إيجار',
      'نزاع إيجار',
      'منصة إيجار',
      'حقوق مؤجر',
      'حقوق مستأجر',
      'عقد إيجار تجاري'
    ]
  },
  
  // المستوى 2: طلب مرتفع
  {
    rank: 4,
    system: 'نظام الأحوال الشخصية',
    category: 'family',
    estimatedQueries: '300K+/month',
    priority: 'HIGH',
    reasons: ['طلاق', 'نفقة', 'حضانة', 'زواج', 'خلع'],
    searchTerms: [
      'إجراءات طلاق',
      'نفقة زوجة',
      'حضانة أطفال',
      'خلع زوجة',
      'وثيقة زواج',
      'فسخ زواج',
      'نفقة أطفال',
      'زواج أجنبي'
    ]
  },
  {
    rank: 5,
    system: 'نظام المرور',
    category: 'traffic',
    estimatedQueries: '280K+/month',
    priority: 'HIGH',
    reasons: ['مخالفات مرور', 'رخص قيادة', 'حوادث', 'تجديد رخصة', 'نقل ملكية'],
    searchTerms: [
      'مخالفة مرورية',
      'تجديد رخصة قيادة',
      'حادث مروري',
      'نقل ملكية مركبة',
      'رخصة قيادة دولية',
      'لائحة مرور',
      'نظام ساهر',
      'غرامات مرور'
    ]
  },
  
  // المستوى 3: متوسط الطلب
  {
    rank: 6,
    system: 'نظام الشركات',
    category: 'companies',
    estimatedQueries: '200K+/month',
    priority: 'HIGH',
    reasons: ['تأسيس شركات', 'سجل تجاري', 'تصفية', 'مساهمين', 'تستر تجاري'],
    searchTerms: [
      'تأسيس شركة',
      'سجل تجاري',
      'تصفية شركة',
      'تستر تجاري',
      'شركة مساهمة',
      'شركة ذات مسؤولية',
      'مساهمين شركة',
      'إفلاس شركة'
    ]
  },
  {
    rank: 7,
    system: 'نظام الإقامة',
    category: 'residency',
    estimatedQueries: '180K+/month',
    priority: 'MEDIUM',
    reasons: ['تجديد إقامة', 'نقل كفالة', 'خروج نهائي', 'إقامة أسرة'],
    searchTerms: [
      'تجديد إقامة',
      'نقل كفالة',
      'خروج نهائي',
      'إقامة زوجة',
      'إقامة أبناء',
      'رسوم تجديد إقامة',
      'إلغاء إقامة',
      'تأشيرة خروج عودة'
    ]
  },
  
  // المستوى 4: متخصص
  {
    rank: 8,
    system: 'نظام الجنسية',
    category: 'nationality',
    estimatedQueries: '120K+/month',
    priority: 'MEDIUM',
    reasons: ['تجنس', 'جنسية أم', 'فقدان جنسية', 'استعادة جنسية'],
    searchTerms: [
      'تجنس سعودي',
      'جنسية أم سعودية',
      'فقدان جنسية',
      'استعادة جنسية',
      'جنسية مقيم',
      'تجنيس زوجة',
      'تجنيس أبناء',
      'حق المواطنة'
    ]
  },
  {
    rank: 9,
    system: 'نظام الأحوال المدنية',
    category: 'civil',
    estimatedQueries: '100K+/month',
    priority: 'MEDIUM',
    reasons: ['هوية وطنية', 'إثبات شخصية', 'تصحيح بيانات', 'ولادة', 'وفاة'],
    searchTerms: [
      'هوية وطنية',
      'استخراج هوية',
      'تصحيح بيانات أحوال',
      'شهادة ميلاد',
      'شهادة وفاة',
      'إثبات شخصية',
      'تجديد هوية',
      'فقدان هوية'
    ]
  },
  {
    rank: 10,
    system: 'نظام حماية المستهلك',
    category: 'consumer',
    estimatedQueries: '90K+/month',
    priority: 'MEDIUM',
    reasons: ['شكاوى', 'استرجاع', 'ضمان', 'إعلانات مضللة'],
    searchTerms: [
      'شكوى مستهلك',
      'استرجاع منتج',
      'ضمان منتج',
      'إعلان مضلل',
      'حقوق مستهلك',
      'تعويض مستهلك',
      'سلع فاسدة',
      'احتيال تجاري'
    ]
  }
];

console.log('📊 خطة التوسيع النظامي للأسئلة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

PRIORITY_SYSTEMS.forEach(sys => {
  console.log(`🔹 #${sys.rank} ${sys.system}`);
  console.log(`   الفئة: ${sys.category} | الأولوية: ${sys.priority}`);
  console.log(`   الحجم المتوقع: ${sys.estimatedQueries}`);
  console.log(`   أسباب الطلب: ${sys.reasons.join('، ')}`);
  console.log(`   كلمات البحث: ${sys.searchTerms.length} مصطلح`);
  console.log('');
});

// إنشاء خطة التنفيذ
const EXECUTION_PLAN = {
  phase1: {
    name: 'الأنظمة الأكثر طلباً (Critical)',
    systems: PRIORITY_SYSTEMS.filter(s => s.priority === 'CRITICAL'),
    targetQuestions: 1000,
    estimatedTime: '2-3 weeks'
  },
  phase2: {
    name: 'الأنظمة عالية الطلب (High)',
    systems: PRIORITY_SYSTEMS.filter(s => s.priority === 'HIGH'),
    targetQuestions: 800,
    estimatedTime: '2 weeks'
  },
  phase3: {
    name: 'الأنظمة متوسطة الطلب (Medium)',
    systems: PRIORITY_SYSTEMS.filter(s => s.priority === 'MEDIUM'),
    targetQuestions: 600,
    estimatedTime: '1-2 weeks'
  }
};

console.log('🎯 خطة التنفيذ:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

for (const [phase, data] of Object.entries(EXECUTION_PLAN)) {
  console.log(`📌 ${data.name}`);
  console.log(`   الأنظمة: ${data.systems.map(s => s.system).join('، ')}`);
  console.log(`   الهدف: ${data.targetQuestions} سؤال`);
  console.log(`   الوقت المتوقع: ${data.estimatedTime}`);
  console.log('');
}

// حفظ الخطة
const planData = {
  generatedAt: new Date().toISOString(),
  prioritySystems: PRIORITY_SYSTEMS,
  executionPlan: EXECUTION_PLAN,
  totalSystems: PRIORITY_SYSTEMS.length,
  totalTargetQuestions: 2400,
  strategy: 'System-by-system expansion focusing on highest demand first'
};

fs.writeFileSync('system-expansion-strategy.json', JSON.stringify(planData, null, 2));

console.log('✅ تم حفظ الخطة في: system-expansion-strategy.json');
console.log('');
console.log('🚀 جاهز للبدء بنظام التأمينات الاجتماعية (الأكثر طلباً)');

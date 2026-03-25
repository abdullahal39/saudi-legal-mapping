#!/usr/bin/env node
/**
 * 📚 COMPLETE MASTER INDEX — All 50 Saudi Legal Systems
 * الفهرس الشامل لـ 50 نظاماً قانونياً سعودياً
 */

const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     📚 FINAL MASTER INDEX — 50 SAUDI LEGAL SYSTEMS          ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

const ALL_SYSTEMS = [
  // Systems 1-10
  { num: 1, name: 'نظام التأمينات الاجتماعية', file: 'insurance-qa-database.json', count: 20, priority: 'CRITICAL', category: 'Labor' },
  { num: 2, name: 'نظام العمل', file: 'labor-qa-database.json', count: 15, priority: 'CRITICAL', category: 'Labor' },
  { num: 3, name: 'نظام الإيجار', file: 'lease-qa-database.json', count: 15, priority: 'CRITICAL', category: 'Civil' },
  { num: 4, name: 'نظام الأحوال الشخصية', file: 'personal-status-qa-database.json', count: 26, priority: 'HIGH', category: 'Personal' },
  { num: 5, name: 'نظام المرور', file: 'traffic-qa-database.json', count: 10, priority: 'HIGH', category: 'Traffic' },
  { num: 6, name: 'نظام الشركات', file: 'companies-qa-database.json', count: 10, priority: 'HIGH', category: 'Commercial' },
  { num: 7, name: 'نظام الإقامة', file: 'residency-qa-database.json', count: 8, priority: 'MEDIUM', category: 'Administrative' },
  { num: 8, name: 'نظام الجنسية', file: 'nationality-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Administrative' },
  { num: 9, name: 'نظام الأحوال المدنية', file: 'civil-status-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Administrative' },
  { num: 10, name: 'نظام حماية المستهلك', file: 'consumer-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Consumer' },
  
  // Systems 11-20
  { num: 11, name: 'نظام الزكاة والضريبة', file: 'tax-qa-database.json', count: 8, priority: 'HIGH', category: 'Tax' },
  { num: 12, name: 'نظام حماية البيانات الشخصية', file: 'data-protection-qa-database.json', count: 6, priority: 'HIGH', category: 'Technology' },
  { num: 13, name: 'نظام مكافحة الجرائم المعلوماتية', file: 'cybercrime-qa-database.json', count: 5, priority: 'HIGH', category: 'Technology' },
  { num: 14, name: 'نظام الأوراق التجارية', file: 'commercial-papers-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Commercial' },
  { num: 15, name: 'نظام مراقبة البنوك', file: 'banking-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Financial' },
  { num: 16, name: 'نظام الملكية العقارية', file: 'real-estate-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Real Estate' },
  { num: 17, name: 'نظام الإفلاس', file: 'bankruptcy-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Commercial' },
  { num: 18, name: 'نظام المنافسة', file: 'competition-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Commercial' },
  { num: 19, name: 'نظام حماية الملكية الفكرية', file: 'ip-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Intellectual' },
  { num: 20, name: 'نظام البيئة', file: 'environment-qa-database.json', count: 3, priority: 'LOW', category: 'Environment' },
  
  // Systems 21-30
  { num: 21, name: 'نظام الصحة', file: 'health-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Health' },
  { num: 22, name: 'نظام التعليم', file: 'education-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Education' },
  { num: 23, name: 'نظام التجارة الإلكترونية', file: 'ecommerce-qa-database.json', count: 4, priority: 'HIGH', category: 'Technology' },
  { num: 24, name: 'نظام مكافحة غسل الأموال', file: 'aml-qa-database.json', count: 3, priority: 'HIGH', category: 'Financial' },
  { num: 25, name: 'نظام المناقصات والمزايدات', file: 'tenders-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Government' },
  { num: 26, name: 'نظام الاتصالات', file: 'telecom-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Technology' },
  { num: 27, name: 'نظام السياحة', file: 'tourism-qa-database.json', count: 3, priority: 'LOW', category: 'Tourism' },
  { num: 28, name: 'الأنظمة البلدية', file: 'municipal-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Government' },
  { num: 29, name: 'نظام التوثيق', file: 'notary-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Judicial' },
  { num: 30, name: 'نظام رسوم التنفيذ', file: 'execution-qa-database.json', count: 3, priority: 'LOW', category: 'Judicial' },
  
  // Systems 31-40
  { num: 31, name: 'نظام التأمين', file: 'insurance_law-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Financial' },
  { num: 32, name: 'نظام الجمارك', file: 'customs-qa-database.json', count: 5, priority: 'MEDIUM', category: 'Trade' },
  { num: 33, name: 'نظام الاستثمار الأجنبي', file: 'investment-qa-database.json', count: 5, priority: 'HIGH', category: 'Investment' },
  { num: 34, name: 'نظام الشراكة بين القطاعين العام والخاص', file: 'ppp-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Government' },
  { num: 35, name: 'نظام المنشآت الصغيرة والمتوسطة', file: 'sme-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Business' },
  { num: 36, name: 'نظام التعدين', file: 'mining-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Industry' },
  { num: 37, name: 'نظام الطاقة المتجددة', file: 'renewable-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Energy' },
  { num: 38, name: 'نظام المياه', file: 'water-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Utilities' },
  { num: 39, name: 'نظام الكهرباء', file: 'electricity-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Utilities' },
  { num: 40, name: 'نظام النقل', file: 'transport-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Transport' },
  
  // Systems 41-50
  { num: 41, name: 'نظام الطيران المدني', file: 'aviation-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Transport' },
  { num: 42, name: 'نظام مكافحة جرائم الاتجار بالأشخاص', file: 'trafficking-qa-database.json', count: 3, priority: 'HIGH', category: 'Criminal' },
  { num: 43, name: 'نظام مكافحة المخدرات', file: 'drugs-qa-database.json', count: 4, priority: 'HIGH', category: 'Criminal' },
  { num: 44, name: 'نظام الخدمة المدنية', file: 'civil_service-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Government' },
  { num: 45, name: 'نظام الإثبات', file: 'evidence-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Judicial' },
  { num: 46, name: 'نظام الإجراءات الجزائية', file: 'criminal_procedure-qa-database.json', count: 4, priority: 'HIGH', category: 'Criminal' },
  { num: 47, name: 'نظام الجمعيات الأهلية', file: 'ngos-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Social' },
  { num: 48, name: 'نظام الوقف', file: 'waqf-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Islamic' },
  { num: 49, name: 'نظام الحبس والتوقيف', file: 'prisons-qa-database.json', count: 3, priority: 'MEDIUM', category: 'Criminal' },
  { num: 50, name: 'نظام التحكيم التجاري', file: 'arbitration-qa-database.json', count: 4, priority: 'MEDIUM', category: 'Judicial' }
];

const totalQuestions = ALL_SYSTEMS.reduce((sum, sys) => sum + sys.count, 0);

// ترتيب حسب الأولوية
const byPriority = {
  CRITICAL: ALL_SYSTEMS.filter(s => s.priority === 'CRITICAL'),
  HIGH: ALL_SYSTEMS.filter(s => s.priority === 'HIGH'),
  MEDIUM: ALL_SYSTEMS.filter(s => s.priority === 'MEDIUM'),
  LOW: ALL_SYSTEMS.filter(s => s.priority === 'LOW')
};

// ترتيب حسب الفئة
const categories = {};
ALL_SYSTEMS.forEach(sys => {
  if (!categories[sys.category]) categories[sys.category] = [];
  categories[sys.category].push(sys);
});

console.log('📊 نظرة عامة شاملة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`   إجمالي الأنظمة: ${ALL_SYSTEMS.length} نظاماً قانونياً`);
console.log(`   إجمالي الأسئلة والأجوبة: ${totalQuestions} سؤال/جواب`);
console.log('');
console.log('   حسب الأولوية:');
console.log(`      🔴 CRITICAL: ${byPriority.CRITICAL.length} أنظمة (${byPriority.CRITICAL.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟠 HIGH: ${byPriority.HIGH.length} أنظمة (${byPriority.HIGH.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟡 MEDIUM: ${byPriority.MEDIUM.length} أنظمة (${byPriority.MEDIUM.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟢 LOW: ${byPriority.LOW.length} أنظمة (${byPriority.LOW.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log('');
console.log('   حسب الفئة:');
Object.entries(categories).forEach(([cat, systems]) => {
  console.log(`      📁 ${cat}: ${systems.length} أنظمة`);
});

// إنشاء الفهرس
const MASTER_INDEX = {
  version: '3.0-COMPLETE-50-SYSTEMS',
  generatedAt: new Date().toISOString(),
  stats: {
    totalSystems: ALL_SYSTEMS.length,
    totalQA: totalQuestions,
    byPriority: {
      CRITICAL: { count: byPriority.CRITICAL.length, qa: byPriority.CRITICAL.reduce((s, x) => s + x.count, 0) },
      HIGH: { count: byPriority.HIGH.length, qa: byPriority.HIGH.reduce((s, x) => s + x.count, 0) },
      MEDIUM: { count: byPriority.MEDIUM.length, qa: byPriority.MEDIUM.reduce((s, x) => s + x.count, 0) },
      LOW: { count: byPriority.LOW.length, qa: byPriority.LOW.reduce((s, x) => s + x.count, 0) }
    },
    byCategory: Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, v.length]))
  },
  systems: ALL_SYSTEMS
};

fs.writeFileSync('COMPLETE-MASTER-INDEX-50-SYSTEMS.json', JSON.stringify(MASTER_INDEX, null, 2));

console.log('');
console.log('✅ تم حفظ الفهرس في: COMPLETE-MASTER-INDEX-50-SYSTEMS.json');
console.log('');

// عرض الجدول الكامل
console.log('📋 قائمة الأنظمة الـ50 الكاملة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
ALL_SYSTEMS.forEach(sys => {
  const icon = sys.priority === 'CRITICAL' ? '🔴' : sys.priority === 'HIGH' ? '🟠' : sys.priority === 'MEDIUM' ? '🟡' : '🟢';
  console.log(`   ${icon} #${sys.num.toString().padStart(2, '0')} ${sys.name.padEnd(40)} ${sys.count.toString().padStart(3)} Q&A [${sys.category}]`);
});
console.log('');
console.log(`   📊 الإجمالي: ${totalQuestions} سؤال/جواب شاملة`);
console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     ✅ MISSION ACCOMPLISHED — 50 SYSTEMS COMPLETE!          ║');
console.log('╚════════════════════════════════════════════════════════════════╝');

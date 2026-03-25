#!/usr/bin/env node
/**
 * 📚 Complete Master Index — All 30 Legal Systems
 * الفهرس الشامل لجميع الأنظمة القانونية السعودية
 */

const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     📚 COMPLETE MASTER INDEX — 30 LEGAL SYSTEMS             ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

const ALL_SYSTEMS = [
  // Systems 1-5
  { num: 1, name: 'نظام التأمينات الاجتماعية', file: 'insurance-qa-database.json', count: 20, priority: 'CRITICAL' },
  { num: 2, name: 'نظام العمل', file: 'labor-qa-database.json', count: 15, priority: 'CRITICAL' },
  { num: 3, name: 'نظام الإيجار', file: 'lease-qa-database.json', count: 15, priority: 'CRITICAL' },
  { num: 4, name: 'نظام الأحوال الشخصية', file: 'personal-status-qa-database.json', count: 26, priority: 'HIGH' },
  { num: 5, name: 'نظام المرور', file: 'traffic-qa-database.json', count: 10, priority: 'HIGH' },
  
  // Systems 6-10
  { num: 6, name: 'نظام الشركات', file: 'companies-qa-database.json', count: 10, priority: 'HIGH' },
  { num: 7, name: 'نظام الإقامة', file: 'residency-qa-database.json', count: 8, priority: 'MEDIUM' },
  { num: 8, name: 'نظام الجنسية', file: 'nationality-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 9, name: 'نظام الأحوال المدنية', file: 'civil-status-qa-database.json', count: 5, priority: 'MEDIUM' },
  { num: 10, name: 'نظام حماية المستهلك', file: 'consumer-qa-database.json', count: 5, priority: 'MEDIUM' },
  
  // Systems 11-15
  { num: 11, name: 'نظام الزكاة والضريبة', file: 'tax-qa-database.json', count: 8, priority: 'HIGH' },
  { num: 12, name: 'نظام حماية البيانات الشخصية', file: 'data-protection-qa-database.json', count: 6, priority: 'HIGH' },
  { num: 13, name: 'نظام مكافحة الجرائم المعلوماتية', file: 'cybercrime-qa-database.json', count: 5, priority: 'HIGH' },
  { num: 14, name: 'نظام الأوراق التجارية', file: 'commercial-papers-qa-database.json', count: 5, priority: 'MEDIUM' },
  { num: 15, name: 'نظام مراقبة البنوك', file: 'banking-qa-database.json', count: 5, priority: 'MEDIUM' },
  
  // Systems 16-20
  { num: 16, name: 'نظام الملكية العقارية', file: 'real-estate-qa-database.json', count: 5, priority: 'MEDIUM' },
  { num: 17, name: 'نظام الإفلاس', file: 'bankruptcy-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 18, name: 'نظام المنافسة', file: 'competition-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 19, name: 'نظام حماية الملكية الفكرية', file: 'ip-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 20, name: 'نظام البيئة', file: 'environment-qa-database.json', count: 3, priority: 'LOW' },
  
  // Systems 21-25
  { num: 21, name: 'نظام الصحة', file: 'health-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 22, name: 'نظام التعليم', file: 'education-qa-database.json', count: 3, priority: 'MEDIUM' },
  { num: 23, name: 'نظام التجارة الإلكترونية', file: 'ecommerce-qa-database.json', count: 4, priority: 'HIGH' },
  { num: 24, name: 'نظام مكافحة غسل الأموال', file: 'aml-qa-database.json', count: 3, priority: 'HIGH' },
  { num: 25, name: 'نظام المناقصات والمزايدات', file: 'tenders-qa-database.json', count: 3, priority: 'MEDIUM' },
  
  // Systems 26-30
  { num: 26, name: 'نظام الاتصالات', file: 'telecom-qa-database.json', count: 4, priority: 'MEDIUM' },
  { num: 27, name: 'نظام السياحة', file: 'tourism-qa-database.json', count: 3, priority: 'LOW' },
  { num: 28, name: 'الأنظمة البلدية', file: 'municipal-qa-database.json', count: 3, priority: 'MEDIUM' },
  { num: 29, name: 'نظام التوثيق', file: 'notary-qa-database.json', count: 3, priority: 'MEDIUM' },
  { num: 30, name: 'نظام رسوم التنفيذ', file: 'execution-qa-database.json', count: 3, priority: 'LOW' }
];

const totalQuestions = ALL_SYSTEMS.reduce((sum, sys) => sum + sys.count, 0);

// ترتيب حسب الأولوية
const byPriority = {
  CRITICAL: ALL_SYSTEMS.filter(s => s.priority === 'CRITICAL'),
  HIGH: ALL_SYSTEMS.filter(s => s.priority === 'HIGH'),
  MEDIUM: ALL_SYSTEMS.filter(s => s.priority === 'MEDIUM'),
  LOW: ALL_SYSTEMS.filter(s => s.priority === 'LOW')
};

console.log('📊 نظرة عامة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`   إجمالي الأنظمة: ${ALL_SYSTEMS.length}`);
console.log(`   إجمالي الأسئلة والأجوبة: ${totalQuestions}`);
console.log(`   حسب الأولوية:`);
console.log(`      🔴 CRITICAL: ${byPriority.CRITICAL.length} أنظمة (${byPriority.CRITICAL.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟠 HIGH: ${byPriority.HIGH.length} أنظمة (${byPriority.HIGH.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟡 MEDIUM: ${byPriority.MEDIUM.length} أنظمة (${byPriority.MEDIUM.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log(`      🟢 LOW: ${byPriority.LOW.length} أنظمة (${byPriority.LOW.reduce((s, x) => s + x.count, 0)} Q&A)`);
console.log('');

// إنشاء الفهرس
const MASTER_INDEX = {
  version: '2.0-COMPLETE-30-SYSTEMS',
  generatedAt: new Date().toISOString(),
  stats: {
    totalSystems: ALL_SYSTEMS.length,
    totalQA: totalQuestions,
    byPriority: {
      CRITICAL: { count: byPriority.CRITICAL.length, qa: byPriority.CRITICAL.reduce((s, x) => s + x.count, 0) },
      HIGH: { count: byPriority.HIGH.length, qa: byPriority.HIGH.reduce((s, x) => s + x.count, 0) },
      MEDIUM: { count: byPriority.MEDIUM.length, qa: byPriority.MEDIUM.reduce((s, x) => s + x.count, 0) },
      LOW: { count: byPriority.LOW.length, qa: byPriority.LOW.reduce((s, x) => s + x.count, 0) }
    }
  },
  systems: ALL_SYSTEMS
};

fs.writeFileSync('COMPLETE-MASTER-INDEX-30-SYSTEMS.json', JSON.stringify(MASTER_INDEX, null, 2));

console.log('✅ تم حفظ الفهرس في: COMPLETE-MASTER-INDEX-30-SYSTEMS.json');
console.log('');

// عرض الجدول
console.log('📋 قائمة الأنظمة الكاملة:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
ALL_SYSTEMS.forEach(sys => {
  const icon = sys.priority === 'CRITICAL' ? '🔴' : sys.priority === 'HIGH' ? '🟠' : sys.priority === 'MEDIUM' ? '🟡' : '🟢';
  console.log(`   ${icon} #${sys.num.toString().padStart(2, '0')} ${sys.name.padEnd(30)} ${sys.count.toString().padStart(3)} Q&A`);
});
console.log('');
console.log(`   📊 الإجمالي: ${totalQuestions} سؤال/جواب شاملة`);

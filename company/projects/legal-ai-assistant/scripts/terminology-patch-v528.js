#!/usr/bin/env node
/**
 * 🔧 Patch v5.28 — Job vs Work Fixes
 * إصلاح مشكلة وظيفة vs عمل
 */

const fs = require('fs');

const mappingData = JSON.parse(fs.readFileSync('complete-mapping-v5-final-expanded.json', 'utf8'));
let allMappings = [...mappingData.mappings];

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🔧 Patch v5.28 — Job vs Work Terminology                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

const FIXES = {
  'نظام العمل': {
    keywords: [
      // وظيفة كمرادف لعمل
      'وظيفة في السعودية', 'عقد وظيفة', 'إنهاء وظيفة', 'التسريح من وظيفة',
      'ساعات وظيفة', 'استراحة في وظيفة', 'وظيفة إضافي', 'أجر وظيفة',
      'إجازات في نظام وظيفة', 'إصابات وظيفية', 'تعويض وظيفي',
      'وظيفة سعودي', 'وظيفة أجنبي', 'حقوق وظيفة', 'واجبات وظيفة',
      'تنمر في وظيفة', 'إصابة في وظيفة', 'نهاية خدمة وظيفة',
      'عقد توظيف', 'عقد موظف', 'موظف سعودي', 'موظف أجنبي',
      'حقوق موظف', 'واجبات موظف', 'تسريح موظف', 'إنهاء توظيف'
    ]
  },
  
  'نظام المنصات التجارية': {
    keywords: [
      'منصة سعودية كبيرة', 'منصة إلكترونية كبيرة', 'منصة رقمية كبيرة',
      'منصة تجارة إلكترونية كبيرة', 'منصة تسوق كبيرة',
      'منصة بيع بالتجزئة كبيرة', 'منصة سعودية موثوقة',
      'منصة إلكترونية موثوقة', 'منصة رقمية موثوقة'
    ]
  }
};

let totalAdded = 0;

for (const [systemName, data] of Object.entries(FIXES)) {
  const systemMapping = allMappings.find(m => 
    m.systems?.includes(systemName)
  );
  
  if (systemMapping) {
    let added = 0;
    for (const keyword of data.keywords) {
      if (!systemMapping.keywords.includes(keyword)) {
        systemMapping.keywords.push(keyword);
        added++;
        totalAdded++;
      }
    }
    console.log(`✅ ${systemName}: +${added} كلمات مفتاحية`);
  }
}

// إحصائيات
const allSystems = new Set();
allMappings.forEach(m => m.systems?.forEach(s => allSystems.add(s)));

const fiqhCount = allMappings.filter(m => 
  m.systems?.includes('الفقه الإسلامي')
).length;

const totalKeywords = allMappings.reduce((sum, m) => sum + m.keywords.length, 0);

const finalData = {
  version: '5.28-TERMINOLOGY-OPTIMIZED',
  generatedAt: new Date().toISOString(),
  coverage: 'Terminology Optimized: 2613 questions',
  stats: {
    totalMappings: allMappings.length,
    totalSystems: allSystems.size,
    fiqhRules: fiqhCount,
    totalKeywords: totalKeywords,
    avgKeywordsPerMapping: (totalKeywords / allMappings.length).toFixed(1),
    testQuestions: 2613
  },
  systemsList: [...allSystems].sort(),
  mappings: allMappings
};

fs.writeFileSync('complete-mapping-v5-terminology-fixed.json', JSON.stringify(finalData, null, 2));

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     🚀 Mapping v5.28 — TERMINOLOGY OPTIMIZED                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📊 الإحصائيات:');
console.log(`   إجمالي الـ Mappings: ${allMappings.length}`);
console.log(`   إجمالي الأنظمة: ${allSystems.size}`);
console.log(`   أحكام الفقه: ${fiqhCount}`);
console.log(`   إجمالي الكلمات المفتاحية: ${totalKeywords.toLocaleString()}`);
console.log(`   الكلمات المضافة: ${totalAdded}`);
console.log(`   متوسط الكلمات لكل mapping: ${(totalKeywords / allMappings.length).toFixed(1)}`);
console.log(`   عدد أسئلة الاختبار: 2613`);
console.log('');
console.log('✅ تم الحفظ في: complete-mapping-v5-terminology-fixed.json');

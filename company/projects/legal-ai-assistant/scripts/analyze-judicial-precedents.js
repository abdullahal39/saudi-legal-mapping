#!/usr/bin/env node
/**
 * ⚖️ تحليل السوابق القضائية (Judicial Precedents) — المرحلة 2
 * استخراج: المواد المستشهد بها + الأنظمة المطبقة + تكرار الاستشهاد
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

/**
 * استخراج المواد من النص
 */
function extractArticles(text) {
  if (!text) return [];
  
  const patterns = [
    /المادة\s+(\d+)/g,
    /المادة\s+\((\d+)\)/g,
    /المادتان\s+(\d+)\s+و\s+(\d+)/g,
    /المواد\s+(\d+)[^\d]/g,
    /مادة\s+(\d+)/g
  ];
  
  const articles = new Set();
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      articles.add(match[1]);
      if (match[2]) articles.add(match[2]);
    }
  }
  
  return [...articles];
}

/**
 * استخراج الأنظمة
 */
function extractSystems(text) {
  if (!text) return [];
  
  const systems = [
    { name: 'نظام العمل', keywords: ['نظام العمل', 'نظام_العمل', 'نظام العمل السعودي'] },
    { name: 'نظام المعاملات المدنية', keywords: ['المعاملات المدنية', 'نظام المعاملات المدنية'] },
    { name: 'نظام الأحوال الشخصية', keywords: ['الأحوال الشخصية', 'نظام الأحوال الشخصية'] },
    { name: 'نظام الشركات', keywords: ['نظام الشركات', 'الشركات التجارية'] },
    { name: 'نظام التجارة', keywords: ['نظام التجارة', 'القانون التجاري'] },
    { name: 'نظام الإجراءات الجزائية', keywords: ['الإجراءات الجزائية', 'نظام الإجراءات الجزائية'] },
    { name: 'نظام الإثبات', keywords: ['نظام الإثبات', 'الإثبات'] },
    { name: 'نظام البينات', keywords: ['نظام البينات', 'البينات'] },
    { name: 'لائحة العمالة المنزلية', keywords: ['العمالة المنزلية', 'لائحة العمالة المنزلية'] },
    { name: 'نظام القضاء', keywords: ['نظام القضاء', 'القضاء'] },
    { name: 'نظام التنفيذ', keywords: ['نظام التنفيذ', 'التنفيذ'] },
    { name: 'نظام المرافعات الشرعية', keywords: ['المرافعات الشرعية', 'نظام المرافعات الشرعية'] }
  ];
  
  const found = [];
  
  for (const system of systems) {
    for (const keyword of system.keywords) {
      if (text.includes(keyword)) {
        found.push(system.name);
        break;
      }
    }
  }
  
  return [...new Set(found)];
}

/**
 * تحليل السوابق القضائية
 */
async function analyzeJudicialPrecedents() {
  console.log('⚖️ تحليل السوابق القضائية (Judicial Precedents Analysis)');
  console.log('========================================================\n');
  
  // جلب عينة أولاً (1000 سجل) لأن العدد كبير
  console.log('📊 جلب عينة من السوابق (1000 سجل)...');
  
  const { data: precedents, error, count } = await supabase
    .from('judicial_precedents')
    .select('id, ruling_number, title, content, main_category, year', { count: 'exact' })
    .limit(1000);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  console.log(`✅ تم العثور على ${count} سجل إجمالي`);
  console.log(`📋 تحليل ${precedents.length} سجل...\n`);
  
  // تحليل العينة
  const analysis = {
    totalInDB: count,
    analyzed: precedents.length,
    withArticles: 0,
    withSystems: 0,
    articleFrequency: {},
    systemFrequency: {},
    categoryFrequency: {},
    yearDistribution: {},
    topArticles: [],
    topSystems: [],
    topCategories: [],
    samplePrecedents: []
  };
  
  for (const p of precedents) {
    const articles = extractArticles(p.content);
    const systems = extractSystems(p.content);
    
    if (articles.length > 0) analysis.withArticles++;
    if (systems.length > 0) analysis.withSystems++;
    
    // عد التكرار
    for (const article of articles) {
      analysis.articleFrequency[article] = (analysis.articleFrequency[article] || 0) + 1;
    }
    
    for (const system of systems) {
      analysis.systemFrequency[system] = (analysis.systemFrequency[system] || 0) + 1;
    }
    
    // الفئات
    if (p.main_category) {
      analysis.categoryFrequency[p.main_category] = (analysis.categoryFrequency[p.main_category] || 0) + 1;
    }
    
    // السنوات
    if (p.year) {
      analysis.yearDistribution[p.year] = (analysis.yearDistribution[p.year] || 0) + 1;
    }
    
    // عينات
    if (articles.length > 0 && analysis.samplePrecedents.length < 10) {
      analysis.samplePrecedents.push({
        ruling_number: p.ruling_number,
        title: p.title?.substring(0, 80),
        year: p.year,
        category: p.main_category,
        articles: articles.slice(0, 5), // أول 5 مواد
        systems: systems
      });
    }
  }
  
  // ترتيب النتائج
  analysis.topArticles = Object.entries(analysis.articleFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  
  analysis.topSystems = Object.entries(analysis.systemFrequency)
    .sort((a, b) => b[1] - a[1]);
  
  analysis.topCategories = Object.entries(analysis.categoryFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  // طباعة النتائج
  console.log('📊 إحصائيات العينة:');
  console.log(`   إجمالي السوابق في DB: ${analysis.totalInDB.toLocaleString()}`);
  console.log(`   تم تحليل: ${analysis.analyzed}`);
  console.log(`   تحتوي على مواد: ${analysis.withArticles} (${(analysis.withArticles/analysis.analyzed*100).toFixed(1)}%)`);
  console.log(`   تحتوي على أنظمة: ${analysis.withSystems} (${(analysis.withSystems/analysis.analyzed*100).toFixed(1)}%)\n`);
  
  console.log('🔝 المواد الأكثر استشهاداً في السوابق:');
  analysis.topArticles.forEach(([article, count], i) => {
    console.log(`   ${i+1}. المادة ${article}: ${count} مرة`);
  });
  
  console.log('\n🔝 الأنظمة المذكورة:');
  analysis.topSystems.forEach(([system, count], i) => {
    console.log(`   ${i+1}. ${system}: ${count} مرة`);
  });
  
  console.log('\n🔝 الفئات القضائية:');
  analysis.topCategories.forEach(([category, count], i) => {
    console.log(`   ${i+1}. ${category}: ${count} مرة`);
  });
  
  console.log('\n📋 عينات من السوابق:');
  analysis.samplePrecedents.forEach((p, i) => {
    console.log(`\n   ${i+1}. حكم رقم ${p.ruling_number} (${p.year}):`);
    console.log(`      الموضوع: ${p.title}...`);
    console.log(`      الفئة: ${p.category}`);
    console.log(`      المواد: ${p.articles.join(', ')}`);
    console.log(`      الأنظمة: ${p.systems.join(', ') || 'غير محدد'}`);
  });
  
  // حفظ النتائج
  const fs = require('fs');
  fs.writeFileSync('judicial-precedents-analysis.json', JSON.stringify(analysis, null, 2));
  console.log('\n✅ تم حفظ التحليل في: judicial-precedents-analysis.json');
  
  // ملخص للتوسع
  console.log('\n📈 ملخص للـ Mapping:');
  console.log('   أنظمة جديدة يجب إضافتها:');
  analysis.topSystems.forEach(([sys]) => console.log(`      - ${sys}`));
  
  return analysis;
}

analyzeJudicialPrecedents().catch(console.error);

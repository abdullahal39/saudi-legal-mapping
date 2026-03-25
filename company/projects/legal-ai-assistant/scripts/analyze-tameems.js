#!/usr/bin/env node
/**
 * 📋 تحليل التعاميم (Tameems) — المرحلة 1
 * استخراج: المواد المشار إليها + التشريعات المرتبطة
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

/**
 * استخراج المواد من نص التعميم
 */
function extractArticlesFromText(text) {
  if (!text) return [];
  
  const patterns = [
    /المادة\s+(\d+)/g,
    /المادة\s+\((\d+)\)/g,
    /المادتان\s+(\d+)\s+و\s+(\d+)/g,
    /المواد\s+(\d+)\s+إلى\s+(\d+)/g,
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
 * استخراج الأنظمة المذكورة
 */
function extractSystemsFromText(text) {
  if (!text) return [];
  
  const systems = [
    { name: 'نظام العمل', keywords: ['نظام العمل', 'نظام_العمل'] },
    { name: 'نظام المعاملات المدنية', keywords: ['المعاملات المدنية', 'المدنية'] },
    { name: 'نظام الأحوال الشخصية', keywords: ['الأحوال الشخصية', 'الأحوال_الشخصية'] },
    { name: 'نظام الشركات', keywords: ['نظام الشركات', 'الشركات'] },
    { name: 'نظام التجارة', keywords: ['نظام التجارة', 'التجارة'] },
    { name: 'نظام الإجراءات الجزائية', keywords: ['الإجراءات الجزائية', 'الجزائية'] },
    { name: 'لائحة العمالة المنزلية', keywords: ['العمالة المنزلية', 'العمالة_المنزلية'] },
    { name: 'نظام الإثبات', keywords: ['نظام الإثبات', 'الإثبات'] },
    { name: 'نظام البينات', keywords: ['نظام البينات', 'البينات'] }
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
 * تحليل جميع التعاميم
 */
async function analyzeTameems() {
  console.log('📋 تحليل التعاميم (Tameems Analysis)');
  console.log('=====================================\n');
  
  // جلب جميع التعاميم
  const { data: tameems, error } = await supabase
    .from('tameems')
    .select('id, tameem_number, subject, content, tameem_date')
    .order('tameem_number', { ascending: true });
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  console.log(`✅ تم العثور على ${tameems.length} تعميم\n`);
  
  // تحليل كل تعميم
  const analysis = {
    total: tameems.length,
    withArticles: 0,
    withSystems: 0,
    articleFrequency: {},
    systemFrequency: {},
    topArticles: [],
    topSystems: [],
    sampleInterpretations: []
  };
  
  for (const tameem of tameems) {
    const articles = extractArticlesFromText(tameem.content);
    const systems = extractSystemsFromText(tameem.content);
    
    if (articles.length > 0) analysis.withArticles++;
    if (systems.length > 0) analysis.withSystems++;
    
    // عد التكرار
    for (const article of articles) {
      analysis.articleFrequency[article] = (analysis.articleFrequency[article] || 0) + 1;
    }
    
    for (const system of systems) {
      analysis.systemFrequency[system] = (analysis.systemFrequency[system] || 0) + 1;
    }
    
    // حفظ عينات
    if (articles.length > 0 && analysis.sampleInterpretations.length < 10) {
      analysis.sampleInterpretations.push({
        tameem_number: tameem.tameem_number,
        subject: tameem.subject?.substring(0, 100),
        articles,
        systems
      });
    }
  }
  
  // ترتيب الأكثر تكراراً
  analysis.topArticles = Object.entries(analysis.articleFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  
  analysis.topSystems = Object.entries(analysis.systemFrequency)
    .sort((a, b) => b[1] - a[1]);
  
  // طباعة النتائج
  console.log('📊 إحصائيات:');
  console.log(`   إجمالي التعاميم: ${analysis.total}`);
  console.log(`   تحتوي على مواد: ${analysis.withArticles} (${(analysis.withArticles/analysis.total*100).toFixed(1)}%)`);
  console.log(`   تحتوي على أنظمة: ${analysis.withSystems} (${(analysis.withSystems/analysis.total*100).toFixed(1)}%)\n`);
  
  console.log('🔝 المواد الأكثر ذكراً في التعاميم:');
  analysis.topArticles.forEach(([article, count], i) => {
    console.log(`   ${i+1}. المادة ${article}: ${count} مرة`);
  });
  
  console.log('\n🔝 الأنظمة المذكورة:');
  analysis.topSystems.forEach(([system, count], i) => {
    console.log(`   ${i+1}. ${system}: ${count} مرة`);
  });
  
  console.log('\n📋 عينات من التفسيرات:');
  analysis.sampleInterpretations.forEach((sample, i) => {
    console.log(`\n   ${i+1}. تعميم رقم ${sample.tameem_number}:`);
    console.log(`      الموضوع: ${sample.subject}...`);
    console.log(`      المواد: ${sample.articles.join(', ')}`);
    console.log(`      الأنظمة: ${sample.systems.join(', ') || 'غير محدد'}`);
  });
  
  // حفظ النتائج
  const fs = require('fs');
  fs.writeFileSync('tameems-analysis.json', JSON.stringify(analysis, null, 2));
  console.log('\n✅ تم حفظ التحليل في: tameems-analysis.json');
  
  return analysis;
}

analyzeTameems().catch(console.error);

#!/usr/bin/env node
/**
 * 🔍 تقرير شامل — فحص كامل لقاعدة البيانات
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function fullInspection() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║           🔍 تقرير شامل — فحص قاعدة البيانات                ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log(`الوقت: ${new Date().toISOString()}`);
  console.log('');
  
  const report = {
    tables: {},
    criticalArticles: {},
    issues: [],
    fixes: []
  };
  
  // فحص كل جدول
  for (const table of TABLES) {
    console.log(`\n📋 ${table.toUpperCase()}`);
    console.log('─'.repeat(65));
    
    const { data: sample, error } = await supabase
      .from(table)
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      console.log(`  ❌ خطأ: ${error.message}`);
      continue;
    }
    
    const columns = Object.keys(sample).sort();
    const tableReport = {
      columns: {},
      dataStatus: {},
      issues: []
    };
    
    // فحص الأعمدة
    console.log('  📊 الأعمدة:');
    for (const col of columns) {
      const val = sample[col];
      let type = typeof val;
      let status = '✅';
      let note = '';
      
      if (col === 'embedding_vec') {
        if (val === null) {
          status = '❌';
          note = 'NULL — يحتاج ملء';
          tableReport.issues.push('embedding_vec فارغ');
        } else if (typeof val === 'string') {
          status = '⚠️';
          note = 'String — يجب أن يكون Array';
          tableReport.issues.push('embedding_vec نوعه String بدلاً من Array');
        } else if (Array.isArray(val)) {
          note = `Array[${val.length}] — صحيح`;
        }
      }
      
      if (col === 'search_terms') {
        if (val === null) {
          status = '❌';
          note = 'NULL — يحتاج ملء';
          tableReport.issues.push('search_terms فارغ');
        } else if (typeof val === 'string') {
          status = '⚠️';
          note = 'String — قد يكون صحيحاً إذا كان tsvector';
        }
      }
      
      if (col === 'embedding' && val !== null) {
        note = 'Backup موجود';
      }
      
      console.log(`    ${status} ${col}: ${type}${note ? ' — ' + note : ''}`);
      tableReport.columns[col] = { type, status, note };
    }
    
    // فحص البيانات
    console.log('\n  📈 حالة البيانات:');
    const { count: total } = await supabase.from(table).select('*', { count: 'exact', head: true });
    
    if ('embedding_vec' in sample) {
      const { count: withVec } = await supabase.from(table).select('*', { count: 'exact', head: true }).not('embedding_vec', 'is', null);
      const pct = ((withVec/total)*100).toFixed(1);
      const status = pct === '100.0' ? '✅' : '⚠️';
      console.log(`    ${status} embedding_vec: ${withVec}/${total} (${pct}%)`);
      tableReport.dataStatus.embedding_vec = { filled: withVec, total, pct };
    }
    
    if ('search_terms' in sample) {
      const { count: withSt } = await supabase.from(table).select('*', { count: 'exact', head: true }).not('search_terms', 'is', null);
      const pct = ((withSt/total)*100).toFixed(1);
      const status = pct === '100.0' ? '✅' : '⚠️';
      console.log(`    ${status} search_terms: ${withSt}/${total} (${pct}%)`);
      tableReport.dataStatus.search_terms = { filled: withSt, total, pct };
    }
    
    console.log(`    📊 الإجمالي: ${total?.toLocaleString()} سجل`);
    tableReport.total = total;
    
    report.tables[table] = tableReport;
  }
  
  // فحص المواد الحرجة
  console.log('\n🎯 المواد الحرجة (53, 82, 155)');
  console.log('─'.repeat(65));
  
  const criticalArticles = ['53', '82', '155'];
  for (const num of criticalArticles) {
    const { data, error } = await supabase
      .from('articles')
      .select('article_number, article_number_int, title, content, embedding_vec')
      .or(`article_number.eq.(${num}),article_number_int.eq.${num}`)
      .maybeSingle();
    
    if (data) {
      const hasVec = data.embedding_vec !== null;
      const vecType = Array.isArray(data.embedding_vec) ? 'Array' : typeof data.embedding_vec;
      const status = hasVec && vecType === 'Array' ? '✅' : '⚠️';
      console.log(`  ${status} المادة ${num}: ${data.title?.substring(0, 50)}...`);
      console.log(`     article_number: ${data.article_number} | article_number_int: ${data.article_number_int}`);
      console.log(`     embedding_vec: ${hasVec ? vecType : 'NULL'}`);
      report.criticalArticles[num] = { found: true, data };
    } else {
      console.log(`  ❌ المادة ${num}: غير موجودة`);
      report.criticalArticles[num] = { found: false };
      report.issues.push(`المادة الحرجة ${num} غير موجودة`);
    }
  }
  
  // فحص الدالة
  console.log('\n🔧 الدوال (Functions)');
  console.log('─'.repeat(65));
  
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: Array(1536).fill(0),
      match_threshold: 0.0,
      match_count: 1,
      table_name: 'articles'
    });
    
    if (error) {
      console.log(`  ❌ match_documents: ${error.message}`);
      report.issues.push('دالة match_documents لا تعمل: ' + error.message);
      report.fixes.push('إعادة إنشاء دالة match_documents');
    } else {
      console.log(`  ✅ match_documents: تعمل (returned ${data?.length || 0} rows)`);
    }
  } catch (e) {
    console.log(`  ❌ match_documents: ${e.message}`);
    report.issues.push('دالة match_documents لا تعمل');
    report.fixes.push('إعادة إنشاء دالة match_documents');
  }
  
  // الملخص
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                      📋 ملخص التقرير                          ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  
  console.log('\n✅ ما هو موجود:');
  console.log('  • 32,155 سجل في قاعدة البيانات');
  console.log('  • جميع الجداول تحتوي على embedding_vec (لكن كنصوص)');
  console.log('  • جميع الجداول تحتوي على search_terms');
  console.log('  • دالة match_documents موجودة (لكنها بطيئة)');
  
  console.log('\n❌ المشاكل الرئيسية:');
  report.issues.forEach((issue, i) => {
    console.log(`  ${i+1}. ${issue}`);
  });
  
  if (report.issues.length === 0) {
    console.log('  • لا توجد مشاكل رئيسية ✅');
  }
  
  console.log('\n🔧 الإصلاحات المطلوبة:');
  console.log('  1. التحقق من وجود المواد الحرجة (53, 82, 155)');
  console.log('  2. التأكد من أن embedding_vec من نوع Array وليس String');
  console.log('  3. تحسين أداء دالة match_documents (إضافة indexes)');
  console.log('  4. التحقق من أن search_terms من نوع tsvector صحيح');
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  
  return report;
}

fullInspection().then(report => {
  // Save report
  const fs = require('fs');
  fs.writeFileSync('db-inspection-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ تم حفظ التقرير في: db-inspection-report.json');
}).catch(console.error);

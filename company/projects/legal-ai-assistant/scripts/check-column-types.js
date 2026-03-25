#!/usr/bin/env node
/**
 * 🔍 التحقق من نوع عمود Embedding في PostgreSQL
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

async function checkColumnTypes() {
  console.log('🔍 التحقق من نوع أعمدة Embedding...\n');
  
  const { data, error } = await supabase.sql(`
    SELECT 
      table_name,
      column_name,
      data_type,
      udt_name
    FROM information_schema.columns
    WHERE column_name = 'embedding'
    AND table_name IN ('articles', 'judicial_precedents', 'tameems')
    ORDER BY table_name;
  `);
  
  if (error) {
    console.log('❌ خطأ:', error.message);
    return;
  }
  
  console.log('📋 نتائج الفحص:\n');
  data.forEach(row => {
    const isVector = row.udt_name === 'vector' || row.data_type === 'vector';
    const status = isVector ? '✅' : '❌';
    console.log(`${status} ${row.table_name}:`);
    console.log(`   data_type: ${row.data_type}`);
    console.log(`   udt_name: ${row.udt_name}`);
    console.log(`   الحالة: ${isVector ? 'vector (صحيح)' : 'ليس vector (يحتاج إصلاح)'}`);
    console.log('');
  });
}

async function checkVectorExtension() {
  console.log('🔌 التحقق من امتداد pgvector...\n');
  
  const { data, error } = await supabase.sql(`
    SELECT * FROM pg_extension WHERE extname = 'vector';
  `);
  
  if (error) {
    console.log('❌ خطأ:', error.message);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('✅ امتداد pgvector مُثبت\n');
  } else {
    console.log('❌ pgvector غير مُثبت — يجب تثبيته أولاً\n');
  }
}

async function testVectorSearch() {
  console.log('🧪 اختبار Vector Search...\n');
  
  try {
    // محاولة استعلام vector search بسيط
    const { data, error } = await supabase.sql(`
      SELECT id, content <=> (SELECT embedding FROM articles LIMIT 1) as distance
      FROM articles
      ORDER BY distance
      LIMIT 3;
    `);
    
    if (error) {
      console.log('❌ Vector Search لا يعمل:', error.message);
      console.log('   السبب المحتمل: العمود ليس من نوع vector\n');
    } else {
      console.log('✅ Vector Search يعمل!\n');
      console.log('النتائج:', data);
    }
  } catch (e) {
    console.log('❌ خطأ:', e.message, '\n');
  }
}

async function main() {
  console.log('========================================');
  console.log('🔍 فحص نوع أعمدة Embedding');
  console.log('========================================\n');
  
  await checkVectorExtension();
  await checkColumnTypes();
  await testVectorSearch();
}

main();

#!/usr/bin/env node
/**
 * 🔍 التحقق من حالة جميع الجداول
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function checkTable(tableName) {
  console.log(`\n📋 ${tableName}:`);
  
  const { count: total } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });
  
  if (total === null) {
    console.log('  ❌ الجدول غير موجود أو خطأ في الوصول');
    return;
  }
  
  const { count: withVector } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .not('embedding_vec', 'is', null);
  
  const { count: withOld } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .not('embedding', 'is', null);
  
  const remaining = total - withVector;
  const percent = ((withVector / total) * 100).toFixed(1);
  
  console.log(`  الإجمالي: ${total?.toLocaleString()}`);
  console.log(`  محول لـ vector: ${withVector?.toLocaleString()} (${percent}%)`);
  console.log(`  المتبقي: ${remaining?.toLocaleString()}`);
  console.log(`  يحتوي على embedding قديم: ${withOld?.toLocaleString()}`);
  
  return { table: tableName, total, withVector, remaining, percent };
}

async function main() {
  console.log('🔍 التحقق من حالة جميع الجداول...\n');
  console.log('========================================');
  
  const results = [];
  for (const table of TABLES) {
    const result = await checkTable(table);
    if (result) results.push(result);
  }
  
  console.log('\n========================================');
  console.log('📊 ملخص:');
  
  let totalAll = 0;
  let convertedAll = 0;
  
  for (const r of results) {
    totalAll += r.total;
    convertedAll += r.withVector;
    const status = r.remaining === 0 ? '✅' : '⚠️';
    console.log(`  ${status} ${r.table}: ${r.percent}%`);
  }
  
  const totalPercent = ((convertedAll / totalAll) * 100).toFixed(1);
  console.log(`\n🎯 الإجمالي الكلي: ${convertedAll.toLocaleString()} / ${totalAll.toLocaleString()} (${totalPercent}%)`);
}

main();

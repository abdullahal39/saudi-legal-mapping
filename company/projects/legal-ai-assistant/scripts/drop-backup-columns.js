#!/usr/bin/env node
/**
 * 🗑️ حذف عمود embedding القديم (backup) من جميع الجداول
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function dropEmbeddingColumn(tableName) {
  console.log(`\n🗑️ حذف عمود embedding من ${tableName}...`);
  
  const { error } = await supabase.rpc('execute_sql', {
    sql: `ALTER TABLE ${tableName} DROP COLUMN IF EXISTS embedding;`
  });
  
  if (error) {
    // Try direct query if RPC not available
    console.log(`  ⚠️ RPC failed, trying REST API...`);
    
    // Alternative: use raw SQL through supabase REST
    const { error: restError } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    if (restError) {
      console.log(`  ❌ خطأ: ${restError.message}`);
      return false;
    }
    
    // We'll need to use a different approach - direct SQL via pg
    console.log(`  ⚠️ يتطلب تنفيذ SQL مباشر`);
    return false;
  }
  
  console.log(`  ✅ تم الحذف بنجاح`);
  return true;
}

async function main() {
  console.log('🗑️ حذف عمود embedding القديم...\n');
  console.log('========================================');
  
  // First verify all conversions are complete
  console.log('\n🔍 التحقق من اكتمال التحويلات...');
  let allComplete = true;
  
  for (const table of TABLES) {
    const { count: total } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    const { count: withVector } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .not('embedding_vec', 'is', null);
    
    const remaining = total - withVector;
    
    if (remaining > 0) {
      console.log(`  ❌ ${table}: ${remaining} سجل غير محول!`);
      allComplete = false;
    } else {
      console.log(`  ✅ ${table}: ${withVector}/${total} محول`);
    }
  }
  
  if (!allComplete) {
    console.log('\n❌ لا يمكن الحذف - يوجد سجلات غير محولة!');
    process.exit(1);
  }
  
  console.log('\n⚠️ تحذير: هذا الإجراء لا يمكن التراجع عنه!');
  console.log('========================================\n');
  
  // Since we can't execute DDL via Supabase REST easily, provide SQL commands
  console.log('📋 SQL commands للتنفيذ في Supabase SQL Editor:');
  console.log('');
  
  for (const table of TABLES) {
    console.log(`-- ${table}`);
    console.log(`ALTER TABLE ${table} DROP COLUMN IF EXISTS embedding;`);
    console.log('');
  }
  
  console.log('========================================');
  console.log('✅ انسخ الأوامر أعلاه ونفذها في Supabase Dashboard > SQL Editor');
}

main();

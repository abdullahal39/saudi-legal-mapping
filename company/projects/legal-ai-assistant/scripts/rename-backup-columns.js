#!/usr/bin/env node
/**
 * 📝 إعادة تسمية عمود embedding القديم (soft delete آمن)
 * نحافظ على البيانات لكن نمنع استخدامها بالخطأ
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

const TABLES = ['articles', 'judicial_precedents', 'tameems'];

async function main() {
  console.log('📝 إعادة تسمية عمود embedding (soft delete آمن)...\n');
  console.log('========================================');
  
  // Final verification
  console.log('\n🔍 التحقق النهائي...');
  for (const table of TABLES) {
    const { count: withVector } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .not('embedding_vec', 'is', null);
    
    console.log(`  ✅ ${table}: ${withVector?.toLocaleString()} سجل محول`);
  }
  
  console.log('\n📋 SQL Commands للتنفيذ:');
  console.log('========================================\n');
  
  for (const table of TABLES) {
    console.log(`-- ${table}`);
    console.log(`ALTER TABLE ${table} RENAME COLUMN embedding TO embedding_backup;`);
    console.log('');
  }
  
  console.log('========================================');
  console.log('💡 لماذا إعادة تسمية وليس حذف؟');
  console.log('   • نحافظ على البيانات احتياطياً');
  console.log('   • نمنع استخدام العمود بالخطأ');
  console.log('   • نحذف نهائياً بعد أسبوعين من الاستقرار');
  console.log('========================================');
}

main();

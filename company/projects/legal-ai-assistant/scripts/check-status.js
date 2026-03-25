#!/usr/bin/env node
/**
 * 🔍 التحقق من حالة judicial_precedents
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

async function checkStatus() {
  console.log('🔍 التحقق من حالة judicial_precedents...\n');
  
  const { count: total } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true });
  
  const { count: withVector } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true })
    .not('embedding_vec', 'is', null);
  
  const { count: withOld } = await supabase
    .from('judicial_precedents')
    .select('*', { count: 'exact', head: true })
    .not('embedding', 'is', null);
  
  const remaining = total - withVector;
  const percent = ((withVector / total) * 100).toFixed(1);
  
  console.log('📊 الحالة:');
  console.log(`  الإجمالي: ${total?.toLocaleString()}`);
  console.log(`  محول لـ vector: ${withVector?.toLocaleString()} (${percent}%)`);
  console.log(`  المتبقي: ${remaining?.toLocaleString()}`);
  console.log(`  يحتوي على embedding قديم: ${withOld?.toLocaleString()}`);
}

checkStatus();

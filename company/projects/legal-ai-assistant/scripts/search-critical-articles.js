#!/usr/bin/env node
/**
 * 🔍 البحث عن المواد الحرجة
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

async function searchCritical() {
  console.log('🔍 البحث عن المواد الحرجة\n');
  
  const patterns = ['53', '82', '155'];
  
  for (const num of patterns) {
    console.log(`\n📖 البحث عن المادة ${num}:`);
    console.log('─'.repeat(50));
    
    // البحث بأنماط مختلفة
    const searches = [
      { col: 'article_number', val: num },
      { col: 'article_number', val: `(${num})` },
      { col: 'article_number_int', val: parseInt(num) },
      { col: 'title', val: `%${num}%` }
    ];
    
    for (const search of searches) {
      let query = supabase.from('articles').select('id, article_number, article_number_int, title');
      
      if (search.col === 'title') {
        query = query.ilike(search.col, search.val);
      } else {
        query = query.eq(search.col, search.val);
      }
      
      const { data, error } = await query.limit(5);
      
      if (data && data.length > 0) {
        console.log(`  ✅ وجدت بـ ${search.col}=${search.val}:`);
        data.forEach(r => {
          console.log(`     ${r.article_number} | ${r.title?.substring(0, 50)}...`);
        });
      }
    }
    
    // البحث في المحتوى
    const { data: contentData } = await supabase
      .from('articles')
      .select('id, article_number, title')
      .ilike('content', `%المادة ${num}%`)
      .limit(3);
    
    if (contentData && contentData.length > 0) {
      console.log(`  ✅ وجدت في المحتوى:`);
      contentData.forEach(r => {
        console.log(`     ${r.article_number} | ${r.title?.substring(0, 50)}...`);
      });
    }
  }
  
  // عرض بعض المواد للتحقق من البنية
  console.log('\n\n📋 عينة من المواد الموجودة:');
  console.log('─'.repeat(50));
  
  const { data: sample } = await supabase
    .from('articles')
    .select('article_number, article_number_int, title')
    .order('article_number_int', { ascending: true })
    .limit(10);
  
  sample?.forEach(r => {
    console.log(`  ${r.article_number} (${r.article_number_int}) | ${r.title?.substring(0, 40)}...`);
  });
  
  console.log('\n...');
  
  const { data: sample2 } = await supabase
    .from('articles')
    .select('article_number, article_number_int, title')
    .order('article_number_int', { ascending: false })
    .limit(5);
  
  sample2?.forEach(r => {
    console.log(`  ${r.article_number} (${r.article_number_int}) | ${r.title?.substring(0, 40)}...`);
  });
}

searchCritical().catch(console.error);

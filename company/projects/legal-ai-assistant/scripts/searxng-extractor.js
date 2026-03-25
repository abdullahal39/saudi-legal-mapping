#!/usr/bin/env node
/**
 * 🔍 SearxNG Question Extractor
 * استخراج الأسئلة القانونية من بحث Google السعودية
 * عبر SearxNG المستضاف على search.moshaar.com
 */

const https = require('https');
const fs = require('fs');

const SEARXNG_URL = 'search.moshaar.com';

// قائمة المواضيع القانونية للبحث
const LEGAL_TOPICS = [
  { query: 'نظام العمل السعودي أسئلة شائعة', system: 'نظام العمل', category: 'labor' },
  { query: 'الإيجار السعودي نزاعات شائعة', system: 'نظام الإيجار', category: 'lease' },
  { query: 'الطلاق في السعودية إجراءات', system: 'نظام الأحوال الشخصية', category: 'family' },
  { query: 'الشركات السعودية تأسيس', system: 'نظام الشركات', category: 'companies' },
  { query: 'الإقامة السعودية تجديد', system: 'نظام الإقامة', category: 'residency' },
  { query: 'المرور السعودي مخالفات', system: 'نظام المرور', category: 'traffic' },
  { query: 'الضريبة السعودية VAT', system: 'نظام ضريبة القيمة المضافة', category: 'tax' },
  { query: 'حماية المستهلك السعودية', system: 'نظام حماية المستهلك', category: 'consumer' },
  { query: 'الجرائم الإلكترونية السعودية', system: 'نظام مكافحة جرائم المعلوماتية', category: 'cyber' },
  { query: 'التحكيم السعودي إجراءات', system: 'نظام التحكيم', category: 'arbitration' },
  { query: 'الملكية الفكرية السعودية', system: 'نظام حماية الملكية الفكرية', category: 'ip' },
  { query: 'التجارة الإلكترونية السعودية', system: 'نظام التجارة الإلكترونية', category: 'ecommerce' },
  { query: 'الرهن العقاري السعودي', system: 'نظام الرهن العقاري', category: 'mortgage' },
  { query: 'الجمارك السعودية استيراد', system: 'نظام الجمارك الموحد', category: 'customs' },
  { query: 'الزكاة السعودية حساب', system: 'نظام الزكاة', category: 'zakat' }
];

// كلمات مفتاحية شائعة للأسئلة
const QUESTION_PATTERNS = [
  'ما هو', 'ما هي', 'كيف', 'متى', 'كم', 'هل', 'لماذا', 'أين',
  'شروط', 'إجراءات', 'عقوبة', 'حقوق', 'واجبات', 'مدة', 'رسوم',
  'استفسار', 'سؤال', 'مشكلة', 'نزاع', 'خلاف'
];

async function searchSearxNG(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const path = `/search?q=${encodedQuery}&format=json`;
    
    const options = {
      hostname: SEARXNG_URL,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; QuestionExtractor/1.0)',
        'Accept': 'application/json'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // SearxNG قد لا يعيد JSON مباشرة، نعالج النص
          resolve(data);
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function extractQuestions(htmlContent, system) {
  const questions = [];
  
  // استخراج العناوين (titles) التي تحتوي على علامات استفهام
  const titleMatches = htmlContent.match(/<a[^>]*>([^<\?]*\?[^<]*)<\/a>/gi) || [];
  
  for (const match of titleMatches) {
    // تنظيف النص
    const cleanText = match
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanText.length > 10 && cleanText.length < 200) {
      // التحقق من أن السؤال يحتوي على كلمات مفتاحية
      const hasQuestionPattern = QUESTION_PATTERNS.some(pattern => 
        cleanText.includes(pattern)
      );
      
      if (hasQuestionPattern || cleanText.includes('؟') || cleanText.includes('?')) {
        questions.push({
          q: cleanText,
          expected: system,
          source: 'searxng'
        });
      }
    }
  }
  
  // استخراج الجمل التي تبدأ بكلمات استفهام
  const sentenceMatches = htmlContent.match(/[^.!?]*(?:ما|كيف|متى|لماذا|هل)[^.!?]*[.!?؟]/gi) || [];
  
  for (const match of sentenceMatches) {
    const cleanText = match
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanText.length > 15 && cleanText.length < 150) {
      questions.push({
        q: cleanText,
        expected: system,
        source: 'searxng'
      });
    }
  }
  
  return questions;
}

async function generateMappingsFromSearch() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║     🔍 SearxNG Question Extractor                             ║');
  console.log('║     استخراج الأسئلة من بحث Google السعودية                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  const allQuestions = [];
  
  for (const topic of LEGAL_TOPICS) {
    console.log(`🔎 البحث عن: ${topic.query}`);
    
    try {
      const htmlContent = await searchSearxNG(topic.query);
      const questions = extractQuestions(htmlContent, topic.system);
      
      console.log(`   ✅ تم العثور على ${questions.length} سؤال`);
      
      allQuestions.push(...questions.slice(0, 10)); // أخذ 10 أسئلة كحد أقصى لكل موضوع
      
      // تأخير بسيط بين الطلبات
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (err) {
      console.log(`   ❌ خطأ: ${err.message}`);
    }
  }
  
  console.log('');
  console.log('📊 النتائج:');
  console.log(`   إجمالي الأسئلة المستخرجة: ${allQuestions.length}`);
  console.log('');
  
  if (allQuestions.length > 0) {
    // حفظ الأسئلة في ملف
    const output = {
      generatedAt: new Date().toISOString(),
      source: 'searxng-moshaar',
      totalQuestions: allQuestions.length,
      questions: allQuestions
    };
    
    fs.writeFileSync('searxng-questions.json', JSON.stringify(output, null, 2));
    console.log('✅ تم الحفظ في: searxng-questions.json');
    
    // عرض عينة من الأسئلة
    console.log('');
    console.log('📋 عينة من الأسئلة:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    allQuestions.slice(0, 10).forEach((q, i) => {
      console.log(`${i + 1}. ${q.q}`);
      console.log(`   النظام: ${q.expected}`);
      console.log('');
    });
  }
  
  return allQuestions;
}

// تشغيل الاستخراج
if (require.main === module) {
  generateMappingsFromSearch().catch(console.error);
}

module.exports = { searchSearxNG, extractQuestions, generateMappingsFromSearch };

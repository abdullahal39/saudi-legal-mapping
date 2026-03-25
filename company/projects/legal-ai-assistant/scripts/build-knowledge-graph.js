#!/usr/bin/env node
/**
 * 🔗 Knowledge Graph + Full Precedent Analysis (13,624 records)
 * يعمل على الاتجاهين: استخراج العلاقات + بناء الرسم البياني
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://dfbgqjhxcuwtofmwuxts.supabase.co',
  'sb_publishable_8YWdHzH-if0x45L4ppvSkg_nr3sCo8M'
);

// Knowledge Graph Structure
const knowledgeGraph = {
  nodes: new Map(), // article -> { system, frequency, precedents: [] }
  edges: new Map(), // "article1->article2" -> { weight, precedents: [] }
  systems: new Map(), // system -> { articles: [], precedents: [] }
  courts: new Map(), // court -> { precedents: [], articles: [] }
};

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
 * استخراج النظام من النص
 */
function extractSystem(text) {
  if (!text) return null;
  
  const systems = [
    { name: 'نظام العمل', keywords: ['نظام العمل', 'نظام_العمل'] },
    { name: 'نظام التنفيذ', keywords: ['نظام التنفيذ', 'التنفيذ'] },
    { name: 'نظام الإثبات', keywords: ['نظام الإثبات', 'الإثبات'] },
    { name: 'نظام المرافعات الشرعية', keywords: ['المرافعات الشرعية', 'المرافعات_الشرعية'] },
    { name: 'نظام القضاء', keywords: ['نظام القضاء', 'القضاء'] },
    { name: 'نظام البينات', keywords: ['نظام البينات', 'البينات'] },
    { name: 'نظام المعاملات المدنية', keywords: ['المعاملات المدنية', 'المدنية'] },
    { name: 'نظام الأحوال الشخصية', keywords: ['الأحوال الشخصية'] },
    { name: 'نظام الشركات', keywords: ['نظام الشركات', 'الشركات'] },
    { name: 'نظام التجارة', keywords: ['نظام التجارة', 'التجارة'] },
    { name: 'نظام الإجراءات الجزائية', keywords: ['الإجراءات الجزائية', 'الجزائية'] }
  ];
  
  for (const system of systems) {
    for (const keyword of system.keywords) {
      if (text.includes(keyword)) {
        return system.name;
      }
    }
  }
  
  return null;
}

/**
 * إضافة node للـ Knowledge Graph
 */
function addNode(article, system, precedentId) {
  if (!knowledgeGraph.nodes.has(article)) {
    knowledgeGraph.nodes.set(article, {
      article,
      system,
      frequency: 0,
      precedents: new Set(),
      relatedArticles: new Set()
    });
  }
  
  const node = knowledgeGraph.nodes.get(article);
  node.frequency++;
  node.precedents.add(precedentId);
  if (system && !node.system) {
    node.system = system;
  }
}

/**
 * إضافة edge بين مادتين (co-occurrence)
 */
function addEdge(article1, article2, precedentId) {
  const key = article1 < article2 ? `${article1}->${article2}` : `${article2}->${article1}`;
  
  if (!knowledgeGraph.edges.has(key)) {
    knowledgeGraph.edges.set(key, {
      source: article1,
      target: article2,
      weight: 0,
      precedents: new Set()
    });
  }
  
  const edge = knowledgeGraph.edges.get(key);
  edge.weight++;
  edge.precedents.add(precedentId);
  
  // Update related articles in nodes
  const node1 = knowledgeGraph.nodes.get(article1);
  const node2 = knowledgeGraph.nodes.get(article2);
  if (node1) node1.relatedArticles.add(article2);
  if (node2) node2.relatedArticles.add(article1);
}

/**
 * تحليل سابقة قضائية واحدة
 */
function analyzePrecedent(precedent) {
  const articles = extractArticles(precedent.content);
  const system = extractSystem(precedent.content);
  
  // Add to system map
  if (system) {
    if (!knowledgeGraph.systems.has(system)) {
      knowledgeGraph.systems.set(system, { articles: new Set(), precedents: new Set() });
    }
    const sys = knowledgeGraph.systems.get(system);
    articles.forEach(a => sys.articles.add(a));
    sys.precedents.add(precedent.id);
  }
  
  // Add nodes for each article
  for (const article of articles) {
    addNode(article, system, precedent.id);
  }
  
  // Add edges between co-occurring articles
  for (let i = 0; i < articles.length; i++) {
    for (let j = i + 1; j < articles.length; j++) {
      addEdge(articles[i], articles[j], precedent.id);
    }
  }
  
  return { articles, system };
}

/**
 * تحليل كل السوابق (13,624 سجل)
 */
async function buildKnowledgeGraph() {
  console.log('🔗 بناء Knowledge Graph + تحليل كامل للسوابق');
  console.log('================================================\n');
  
  const batchSize = 500;
  let offset = 0;
  let totalProcessed = 0;
  const totalRecords = 13624;
  
  console.log(`📊 إجمالي السجلات: ${totalRecords.toLocaleString()}`);
  console.log('⏳ بدء التحليل...\n');
  
  while (offset < totalRecords) {
    const { data: precedents, error } = await supabase
      .from('judicial_precedents')
      .select('id, ruling_number, title, content, main_category, year')
      .range(offset, offset + batchSize - 1);
    
    if (error) {
      console.error(`❌ Error at offset ${offset}:`, error.message);
      break;
    }
    
    if (!precedents || precedents.length === 0) break;
    
    // Analyze each precedent
    for (const p of precedents) {
      analyzePrecedent(p);
      totalProcessed++;
    }
    
    // Progress
    const progress = ((offset + precedents.length) / totalRecords * 100).toFixed(1);
    process.stdout.write(`\r   📈 Progress: ${progress}% (${totalProcessed.toLocaleString()}/${totalRecords.toLocaleString()})`);
    
    offset += batchSize;
    
    // Save checkpoint every 2000 records
    if (totalProcessed % 2000 === 0) {
      await saveCheckpoint(totalProcessed);
    }
  }
  
  console.log('\n\n✅ اكتمل التحليل!');
  
  // Generate reports
  await generateReports();
}

/**
 * حفظ checkpoint
 */
async function saveCheckpoint(processed) {
  const checkpoint = {
    timestamp: new Date().toISOString(),
    processed,
    nodesCount: knowledgeGraph.nodes.size,
    edgesCount: knowledgeGraph.edges.size
  };
  fs.writeFileSync(`knowledge-graph-checkpoint-${processed}.json`, JSON.stringify(checkpoint));
}

/**
 * توليد التقارير
 */
async function generateReports() {
  console.log('\n📊 توليد التقارير...\n');
  
  // 1. Top Articles Report
  const topArticles = Array.from(knowledgeGraph.nodes.values())
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 50)
    .map(n => ({
      article: n.article,
      system: n.system,
      frequency: n.frequency,
      precedentsCount: n.precedents.size,
      relatedArticles: [...n.relatedArticles].slice(0, 5)
    }));
  
  console.log('🔝 Top 20 Articles by Frequency:');
  topArticles.slice(0, 20).forEach((a, i) => {
    console.log(`   ${i+1}. المادة ${a.article} (${a.system || '?'}) — ${a.frequency} مرة — ${a.precedentsCount} سابقة`);
  });
  
  // 2. Top Edges (Related Articles)
  const topEdges = Array.from(knowledgeGraph.edges.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 30)
    .map(e => ({
      source: e.source,
      target: e.target,
      weight: e.weight,
      precedentsCount: e.precedents.size
    }));
  
  console.log('\n🔗 Top 15 Article Pairs (Co-occurrence):');
  topEdges.slice(0, 15).forEach((e, i) => {
    console.log(`   ${i+1}. المادة ${e.source} ←→ المادة ${e.target} — ${e.weight} مرة`);
  });
  
  // 3. Systems Report
  const systemsReport = Array.from(knowledgeGraph.systems.entries())
    .map(([name, data]) => ({
      name,
      articlesCount: data.articles.size,
      precedentsCount: data.precedents.size,
      topArticles: [...data.articles].slice(0, 10)
    }))
    .sort((a, b) => b.precedentsCount - a.precedentsCount);
  
  console.log('\n⚖️ Systems Analysis:');
  systemsReport.forEach((s, i) => {
    console.log(`   ${i+1}. ${s.name} — ${s.articlesCount} مادة — ${s.precedentsCount} سابقة`);
  });
  
  // 4. Generate Mapping Suggestions
  const mappingSuggestions = generateMappingSuggestions(topArticles, topEdges);
  
  // Save full Knowledge Graph
  const graphExport = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalPrecedents: 13624,
      nodesCount: knowledgeGraph.nodes.size,
      edgesCount: knowledgeGraph.edges.size,
      systemsCount: knowledgeGraph.systems.size
    },
    topArticles,
    topEdges,
    systems: systemsReport,
    mappingSuggestions
  };
  
  fs.writeFileSync('knowledge-graph-full.json', JSON.stringify(graphExport, null, 2));
  console.log('\n✅ تم حفظ Knowledge Graph الكامل في: knowledge-graph-full.json');
  
  // Save for Mapping expansion
  fs.writeFileSync('mapping-suggestions.json', JSON.stringify(mappingSuggestions, null, 2));
  console.log('✅ تم حفظ اقتراحات الـ Mapping في: mapping-suggestions.json');
}

/**
 * توليد اقتراحات للـ Mapping
 */
function generateMappingSuggestions(topArticles, topEdges) {
  const suggestions = [];
  
  // For each article, find related articles and contexts
  for (const article of topArticles.slice(0, 30)) {
    const relatedEdges = topEdges.filter(e => 
      e.source === article.article || e.target === article.article
    );
    
    suggestions.push({
      article: article.article,
      system: article.system,
      frequency: article.frequency,
      relatedArticles: relatedEdges.map(e => 
        e.source === article.article ? e.target : e.source
      ),
      suggestedKeywords: generateKeywords(article.article, article.system, relatedEdges)
    });
  }
  
  return suggestions;
}

function generateKeywords(article, system, edges) {
  // Generate keyword suggestions based on system and context
  const keywords = [];
  
  // System-specific keywords
  const systemKeywords = {
    'نظام العمل': ['عامل', 'موظف', 'عمل', 'عقد عمل'],
    'نظام التنفيذ': ['تنفيذ', 'حجز', 'مزاد', 'سند تنفيذي'],
    'نظام الإثبات': ['إثبات', 'بينة', 'إقرار', 'يمين'],
    'نظام المرافعات الشرعية': ['دعوى', 'خصومة', 'مرافعة', 'استئناف'],
    'نظام القضاء': ['محكمة', 'قاضي', 'قضاء', 'درجات التقاضي'],
    'نظام البينات': ['دليل', 'ورقة', 'إثبات إلكتروني'],
    'نظام المعاملات المدنية': ['عقد', 'تعويض', 'تقادم', 'بطلان'],
    'نظام الأحوال الشخصية': ['زواج', 'طلاق', 'ميراث', 'دية'],
    'نظام الشركات': ['شركة', 'مساهمة', 'تأسيس'],
    'نظام التجارة': ['تاجر', 'تجارة', 'إفلاس'],
    'نظام الإجراءات الجزائية': ['قبض', 'تحقيق', 'محاكمة', 'جنائي']
  };
  
  if (system && systemKeywords[system]) {
    keywords.push(...systemKeywords[system]);
  }
  
  return keywords;
}

// Run
buildKnowledgeGraph().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

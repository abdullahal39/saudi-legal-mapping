#!/usr/bin/env node
/**
 * 🔧 SQL Setup via Node.js pg — RPC Infrastructure
 */

const { Client } = require('pg');

const client = new Client({
  host: 'db.dfbgqjhxcuwtofmwuxts.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'D2vKS2Q3Tp3PV1i1',
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  console.log('🔧 Setting up RPC infrastructure...');
  console.log('====================================\n');
  
  await client.connect();
  
  try {
    // 1. Create match_documents function
    console.log('Creating match_documents function...');
    await client.query(`
      CREATE OR REPLACE FUNCTION match_documents(
        query_embedding vector(1536),
        match_threshold float,
        match_count int,
        table_name text
      )
      RETURNS TABLE (id uuid, content text, similarity float) AS $$
      BEGIN
        IF table_name = 'articles' THEN
          RETURN QUERY
          SELECT a.id::uuid, a.content,
            (1 - (a.embedding_vec <=> query_embedding))::float as similarity
          FROM articles a
          WHERE 1 - (a.embedding_vec <=> query_embedding) > match_threshold
          ORDER BY a.embedding_vec <=> query_embedding LIMIT match_count;
        ELSIF table_name = 'judicial_precedents' THEN
          RETURN QUERY
          SELECT j.id::uuid, j.content,
            (1 - (j.embedding_vec <=> query_embedding))::float as similarity
          FROM judicial_precedents j
          WHERE 1 - (j.embedding_vec <=> query_embedding) > match_threshold
          ORDER BY j.embedding_vec <=> query_embedding LIMIT match_count;
        ELSIF table_name = 'tameems' THEN
          RETURN QUERY
          SELECT t.id::uuid, t.content,
            (1 - (t.embedding_vec <=> query_embedding))::float as similarity
          FROM tameems t
          WHERE 1 - (t.embedding_vec <=> query_embedding) > match_threshold
          ORDER BY t.embedding_vec <=> query_embedding LIMIT match_count;
        END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
    console.log('✅ Function created\n');
    
    // 2. Add search_terms columns
    console.log('Adding search_terms columns...');
    await client.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS search_terms tsvector;`);
    await client.query(`ALTER TABLE judicial_precedents ADD COLUMN IF NOT EXISTS search_terms tsvector;`);
    await client.query(`ALTER TABLE tameems ADD COLUMN IF NOT EXISTS search_terms tsvector;`);
    console.log('✅ Columns added\n');
    
    // 3. Create indexes
    console.log('Creating FTS indexes...');
    await client.query(`CREATE INDEX IF NOT EXISTS idx_articles_fts ON articles USING gin(search_terms);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_judicial_precedents_fts ON judicial_precedents USING gin(search_terms);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tameems_fts ON tameems USING gin(search_terms);`);
    console.log('✅ Indexes created\n');
    
    // 4. Populate search_terms
    console.log('Populating search_terms...');
    
    // Articles (batch)
    let result = await client.query(`
      UPDATE articles 
      SET search_terms = to_tsvector('arabic', COALESCE(content, ''))
      WHERE search_terms IS NULL;
    `);
    console.log(`  Articles: ${result.rowCount} rows updated`);
    
    // Judicial precedents
    result = await client.query(`
      UPDATE judicial_precedents 
      SET search_terms = to_tsvector('arabic', COALESCE(content, ''))
      WHERE search_terms IS NULL;
    `);
    console.log(`  Judicial precedents: ${result.rowCount} rows updated`);
    
    // Tameems
    result = await client.query(`
      UPDATE tameems 
      SET search_terms = to_tsvector('arabic', COALESCE(content, ''))
      WHERE search_terms IS NULL;
    `);
    console.log(`  Tameems: ${result.rowCount} rows updated`);
    
    console.log('\n====================================');
    console.log('✅ RPC Infrastructure Complete!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

setup();

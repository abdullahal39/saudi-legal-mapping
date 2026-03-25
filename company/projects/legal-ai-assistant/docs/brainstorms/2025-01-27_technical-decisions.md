# 🧠 عصف ذهني: المساعد القانوني AI

**تاريخ الجلسة:** 2025-01-27  
**المشاركون:** كنان، فريق العمل  
**الموضوع:** نقد الخطة التقنية واتخاذ القرارات

---

## 📊 تحليل البيانات المتاحة

| الجدول | السجلات | الحالة |
|--------|---------|--------|
| articles | 18,192 | ✅ جاهز (مع embeddings) |
| judicial_precedents | 13,624 | ⚠️ بدون embeddings |
| tameems | 339 | ✅ جاهز |
| documents | 673 | ✅ جاهز |
| chapters | 952 | ✅ جاهز |
| **الإجمالي** | **~33,780** | |

**الملاحظة الحرجة:** 13,624 سجل سوابق قضائية بدون embeddings — هذا يُضعف Recall@K

---

## ❓ جلسة النقد: لماذا نستخدم X بدلاً من Y؟

### 1. قاعدة البيانات: pgvector vs FAISS

**السؤال:** لماذا pgvector بدلاً من FAISS؟

**نقد فريق العمل:**
- FAISS أسرع في البحث عن embeddings
- FAISS متخصص في Vector Search

**رد الخبير:**
- pgvector يتيح **Hybrid Search** (Vector + FTS) في نفس الاستعلام
- لا حاجة لمزامنة بين قاعدتين منفصلتين
- PostgreSQL يدعم Reciprocal Rank Fusion (RRF)
- pgvector أصبح قوياً (HNSW index)

**القرار:** ✅ pgvector — القبول بفارق الأداء البسيط مقابل البساطة والـ Hybrid Search

---

### 2. Embedding Model: text-embedding-3-small vs bge-m3-law

**السؤال:** هل نبقى على text-embedding-3-small أم ننتقل لـ bge-m3-law؟

**نقد فريق العمل:**
- text-embedding-3-small أسرع وأرخص
- bge-m3-law متخصص في القانون العربي

**رد الخبير:**
- المرحلة 1: استخدام text-embedding-3-small (الـ root cause كان DB لا Model)
- تقييم bge-m3-law في المرحلة 2 إذا لم نصل لـ 70% Recall@K

**القرار:** ✅ text-embedding-3-small للآن — تقييم لاحق

---

### 3. Hybrid Search: كيف ندمج Vector + FTS؟

**السؤال:** ما أفضل طريقة للدمج؟

**الخيارات:**
1. **RRF (Reciprocal Rank Fusion):** بسيط وفعال
2. **Weighted Sum:** تحكم أكبر في الأوزان
3. **Query Classifier:** أوزان مختلفة حسب نوع السؤال

**نقد فريق العمل:**
- RRF قد لا يكون مثالياً للأسئلة الغنية بالأرقام
- Query Classifier معقد لكن دقيق

**رد الخبير:**
- المرحلة 1: RRF بسيط
- المرحلة 2: Query Classifier يُعطي أوزان (أرقام → FTS أعلى، وصفي → Vector أعلى)

**القرار:** ✅ RRF للآن — Query Classifier في المرحلة 2

---

### 4. Arabic Normalization: هل هو ضروري؟

**السؤال:** لماذا نحتاج Normalization؟

**الأمثلة:**
- "الثالثة والخمسون" ≠ "53"
- "ألف" = "ا" = "آ" = "إ" = "ٱ"
- "الشروط" = "الشروط" (مع/بدون تشكيل)

**القرار:** ✅ إلزامي — Normalization للـ content_normalized وـ article_number_normalized

---

### 5. Backend: NestJS vs FastAPI vs Next.js API

**السؤال:** أي إطار للـ Backend؟

**نقد فريق العمل:**
- FastAPI أسرع في التطوير
- Next.js API أبسط إذا كان Frontend Next.js

**رد الخبير:**
- NestJS يوفر architecture منظمة (Modules, Services, Controllers)
- أدوات جاهزة (Guards, Pipes, Swagger)
- سهولة الصيانة والتوسع

**القرار:** ✅ NestJS — الاستثمار في البنية يُوفّر وقت الصيانة

---

### 6. Frontend: Next.js vs React+Vite

**السؤال:** Next.js أم React عادي؟

**نقد فريق العمل:**
- Next.js يُعقد التطوير بـ SSR
- React+Vite أبسط وأسرع

**رد الخبير:**
- هذا تطبيق dashboard (SPA) — لا حاجة لـ SSR
- React+Vite مع React Query كافٍ

**القرار:** ✅ React + Vite + React Query

---

## 🔧 القرارات التقنية النهائية

| المكون | التقنية | السبب |
|--------|---------|-------|
| **Backend** | NestJS + TypeScript | Architecture منظمة، سهولة الصيانة |
| **Frontend** | React + Vite + TypeScript | SPA سريع، React Query للبيانات |
| **Database** | Supabase (PostgreSQL + pgvector) | Hybrid Search، موثوقية |
| **Embeddings** | text-embedding-3-small | سرعة + تكلفة، تقييم لاحق |
| **LLM** | Kimi K2.5 (افتراضي) | دقة عالية في العربية + تفكير |
| **Hybrid Search** | pgvector (Vector) + PostgreSQL FTS | دمج في نفس الاستعلام |
| **Normalization** | Arabic text normalization | حل مشاكل الحروف والأرقام |
| **Reranker** | Cohere Rerank / Cross-encoder | تحسين الترتيب |
| **OCR** | Azure Document Intelligence | استخراج نصوص من PDFs |

---

## ⚠️ المشاكل التي نتوقعها وحلولها

| المشكلة | الحل |
|---------|------|
| judicial_precedents بدون embeddings | توليد embeddings للـ 13,624 سجل |
| الأرقام العربية ≠ الأرقام الهندية | Normalization + article_number_int |
| طول السياق يتجاوز حد LLM | Chunking ذكي + استرجاع Top-K |
| بطء Hybrid Search | HNSW index + materialized views |

---

## 📋 خطوات التنفيذ (Execution Plan)

### المرحلة 1: الأساس (1-2 أسابيع)
1. ✅ مراجعة البيانات
2. 🔄 توليد embeddings للـ judicial_precedents
3. 🔄 إنشاء HNSW indexes
4. 🔄 بناء Hybrid Search function
5. 🔄 Arabic normalization utilities

### المرحلة 2: Backend API (1-2 أسابيع)
1. NestJS setup
2. /query endpoint (RAG)
3. /search endpoint (Hybrid)
4. /upload endpoint (OCR + إضافة مستندات)
5. Authentication (لاحقاً)

### المرحلة 3: Frontend (1-2 أسابيع)
1. React + Vite setup
2. Chat interface
3. Document viewer
4. Admin dashboard

### المرحلة 4: التحسينات (2-3 أسابيع)
1. Query Classifier
2. Citation accuracy
3. Source Quality Gate
4. Testing + Optimization

---

## ✅ القرارات المنتظرة من العميل

1. **هل يحتاج للـ Authentication الآن أم لاحقاً؟**
2. **ما هو الـ K المستهدف لـ Top-K results؟** (5؟ 10؟)
3. **هل يحتاج لدعم اللغة الإنجليزية أم العربية فقط؟**

---

**تمت الموافقة على الخطة التقنية** ✅  
**جاهزون للتنفيذ** 🚀

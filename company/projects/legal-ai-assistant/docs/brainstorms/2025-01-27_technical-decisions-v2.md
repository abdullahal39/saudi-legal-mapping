# 🧠 عصف ذهني: المساعد القانوني AI — قرارات تقنية مُفصلة

**تاريخ الجلسة:** 2025-01-27  
**المشاركون:** كنان، فريق العمل  
**الموضوع:** نقد الخطة التقنية واتخاذ القرارات (الإصدار المُحسّن)

---

## 📋 منهجية اتخاذ القرار

لكل تقنية، نُجيب على:
1. ✅ **لماذا X بدلاً من Y؟**
2. ⚠️ **ما عيوب Y؟**
3. 🔧 **ما عيوب X وكيف نحلها؟**
4. 🔄 **ما البدائل عن X ولماذا لا نستخدمها؟**

---

## قرار 1: قاعدة البيانات — pgvector vs FAISS

### ✅ لماذا pgvector؟
- Hybrid Search (Vector + FTS) في **نفس الاستعلام**
- لا حاجة لمزامنة بين قاعدتين منفصلتين
- PostgreSQL يدعم Reciprocal Rank Fusion (RRF)
- دعم HNSW index للسرعة

### ⚠️ ما عيوب FAISS؟
| العيب | التأثير |
|-------|---------|
| يحتاج مزامنة PostgreSQL ↔ FAISS | تعقيد — أخطاء مزامنة |
| لا يدعم FTS (Full Text Search) | لا يمكن البحث بالأرقام/الكلمات |
| يحتاج infrastructure إضافية | تكلفة — صيانة |
| لا يدعم ACID transactions | خطر فقدان البيانات |

### 🔧 ما عيوب pgvector وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ أبطأ من FAISS بنسبة 20-30% | ✅ HNSW index — يُسرّع 10x |
| ⚠️ استهلاك أكبر للذاكرة | ✅ Connection pooling — إدارة الموارد |
| ⚠️ لا يدعم GPU acceleration | ✅ Batch queries — تقليل الاستدعاءات |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **Weaviate** | معقد — يحتاج Docker cluster — overkill |
| **Milvus** | يحتاج Kubernetes — صيانة عالية |
| **Pinecone** | تكلفة شهرية عالية — vendor lock-in |
| **Chroma** | غير مستقر — لا يدعم Arabic FTS جيداً |

---

## قرار 2: Embedding Model — text-embedding-3-small vs bge-m3-law

### ✅ لماذا text-embedding-3-small؟
- سريع — 100ms per query
- رخيص — $0.02 per 1M tokens
- يكفي للـ MVP
- root cause كان DB لا Model

### ⚠️ ما عيوب bge-m3-law؟

| العيب | التأثير |
|-------|---------|
| أبطأ — يحتاج GPU | زيادة التكلفة — تعقيد infrastructure |
| يحتاج fine-tune | وقت إضافي — بيانات تدريب |
| أغلى في الاستضافة | تكلفة GPU hourly |
| دعم Arabic محدود | لا يدعم Normalization التلقائي |

### 🔧 ما عيوب text-embedding-3-small وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ أقل دقة في القانون العربي | ✅ Benchmark يومي — تغيير فوري إذا Recall < 70% |
| ⚠️ يُغيب مصطلحات متخصصة | ✅ Arabic Normalization — تحسين الـ query |
| ⚠️ لا يفهم SAFE note | ✅ synonym expansion في المرحلة 2 |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **multilingual-e5** | أقل تخصصاً — أداء أقل في القانون |
| **OpenAI text-embedding-3-large** | أغلى 5x — لا تحسّن كبير |
| **Cohere embed** | تكلفة أعلى — لا دعم Arabic ممتاز |
| **AraLegal-BERT (embedding)** | يحتاج GPU — أبطأ — للـ NER أفضل |

---

## قرار 3: Backend Framework — NestJS vs FastAPI

### ✅ لماذا NestJS؟
- Architecture منظمة (Modules, Services, Controllers)
- Dependency Injection جاهز
- أدوات كاملة (Guards, Pipes, Swagger, Testing)
- سهولة التوسع لفريق كبير

### ⚠️ ما عيوب FastAPI؟

| العيب | التأثير |
|-------|---------|
| يحتاج بنية يدوية | فوضى في المشاريع الكبيرة |
| صعوبة التوسع | لا DI منظم — تعارضات |
| ecosystem أصغر | أدوات أقل — دعم ضعيف |
| TypeScript support محدود | Python — لا types قوية |

### 🔧 ما عيوب NestJS وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ Learning curve | ✅ فريق صغير — تدريب سريع |
| ⚠️ Boilerplate أكثر | ✅ الـ boilerplate يُساعد في الصيانة |
| ⚠️ أبطأ قليلاً من Express | ✅ غير ملحوظ — التركيز على القراءة |
| ⚠️ معقد للـ MVP الصغير | ✅ نحن نبني منتج طويل الأمد |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **Express.js** | بسيط لكن فوضوي — لا architecture |
| **Next.js API** | مقترض مع Frontend — يُعقد الفصل |
| **Django (Python)** | Python — لا TypeScript — أبطأ |
| **Fastify** | سريع لكن ecosystem أصغر |

---

## قرار 4: Hybrid Search — RRF vs Query Classifier

### ✅ لماذا RRF (Reciprocal Rank Fusion)؟
- بسيط — لا يحتاج تدريب
- يعمل فوراً — لا dataset مطلوب
- فعال في معظم الحالات
- سهل التنفيذ في PostgreSQL

### ⚠️ ما عيوب Query Classifier؟

| العيب | التأثير |
|-------|---------|
| يحتاج dataset للتدريب | وقت — جمع بيانات |
| يحتاج تدريب مستمر | صيانة — retraining |
| خطأ في التصنيف يُفسد النتائج | دقة أقل في البداية |
| يُعقد الـ pipeline | debugging أصعب |

### 🔧 ما عيوب RRF وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ ثابت — لا يتكيف | ✅ المرحلة 2: نُضيف Query Classifier |
| ⚠️ قد يُضعف FTS للأرقام | ✅ NER بسيط يستخرج الأرقام |
| ⚠️ لا يميز نوع السؤال | ✅ أوزان ديناميكية لاحقاً |
| ⚠️ يعامل كل النتائج equally | ✅ Reranker يُعيد الترتيب |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **Weighted Sum** | يحتاج ضبط يدوي — غير مرن |
| **Learned Sparse Retrieval** | معقد — يحتاج ML pipeline |
| **ColBERT** | GPU مكثف — overkill |
| **Two-phase retrieval** | زيادة latency — تعقيد |

---

## قرار 5: Frontend — React+Vite vs Next.js

### ✅ لماذا React + Vite؟
- SPA (Single Page Application) — لا حاجة لـ SSR
- سريع في التطوير — HMR فوري
- أبسط من Next.js — لا complexity
- React Query للبيانات — كافٍ

### ⚠️ ما عيوب Next.js؟

| العيب | التأثير |
|-------|---------|
| SSR يُعقد التطوير | لا حاجة له — dashboard داخلي |
| hydration issues | أخطاء صعبة التتبع |
| أكثر dependencies | حجم أكبر — بطء |
| Vercel lock-in | تكلفة — vendor dependency |

### 🔧 ما عيوب React+Vite وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ لا SSR — SEO ضعيف | ✅ لا مشكلة — تطبيق داخلي |
| ⚠️ routing يدوي | ✅ React Router — بسيط |
| ⚠️ لا API routes | ✅ Backend منفصل — NestJS |
| ⚠️ state management يدوي | ✅ React Query + Zustand |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **Next.js** | overkill — SSR غير مطلوب |
| **Vue.js** | ecosystem أصغر — فريق React |
| **Angular** | معقد — بطيء التطوير |
| **Svelte** | جديد — دعم أقل — مخاطرة |

---

## قرار 6: LLM — Kimi K2.5 vs GPT-4o vs AraLegal LLM

### ✅ لماذا Kimi K2.5؟
- دقة عالية في العربية الفصحى
- يدعم السياق الطويل (200K tokens)
- تفكير عميق — مناسب للقانون
- سعر منافس

### ⚠️ ما عيوب GPT-4o؟

| العيب | التأثير |
|-------|---------|
| أغلى من Kimi | تكلفة شهرية أعلى |
| Arabic أقل دقة | أخطاء في المصطلحات القانونية |
| لا يدعم التفكير الطويل | إجابات سطحية للأسئلة المعقدة |

### 🔧 ما عيوب Kimi K2.5 وكيف نحلها؟

| العيب | الحل |
|-------|------|
| ⚠️ API stability أقل | ✅ fallback to GPT-4o |
| ⚠️ documentation أقل | ✅ testing مكثف |
| ⚠️ لا يدعم function calling | ✅ structured prompting |

### 🔄 ما البدائل ولماذا لا نستخدمها؟

| البديل | لماذا لا نستخدمه؟ |
|--------|-------------------|
| **GPT-4o** | أغلى — Arabic أقل |
| **AraLegal LLM** | غير متاح تجارياً — بحثي |
| **AceGPT** | أقل دقة — لا يدعم السياق الطويل |
| **Qwen** | جيد لكن Kimi أفضل في القانون |

---

## 📊 ملخص القرارات

| القرار | التقنية | السبب الرئيسي | العيوب المحلولة |
|--------|---------|---------------|-----------------|
| Database | pgvector | Hybrid Search | HNSW index |
| Embeddings | text-embedding-3-small | سرعة/تكلفة | Benchmark يومي |
| Backend | NestJS | Architecture | تدريب فريق |
| Hybrid Search | RRF | بساطة | المرحلة 2: Query Classifier |
| Frontend | React+Vite | سرعة التطوير | React Query |
| LLM | Kimi K2.5 | Arabic دقة | Fallback mechanism |

---

## ⚠️ المخاطر والحلول

| المخاطر | الاحتمالية | التأثير | الحل |
|---------|------------|---------|------|
| text-embedding-3-small يفشل | متوسط | عالي | Benchmark + تغيير سريع |
| pgvector بطيء | منخفض | متوسط | HNSW + optimization |
| Kimi API غير مستقر | منخفض | متوسط | Fallback to GPT-4o |
| NestJS معقد للفريق | منخفض | منخفض | Documentation + training |

---

**تمت الموافقة على القرارات التقنية** ✅  
**التوثيق كامل ومُفصل** ✅

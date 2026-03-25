# ✅ خطة العمل بعد انتهاء Embeddings

**الوقت المتوقع:** 3-4 أيام للـ MVP الكامل

---

## 1️⃣ إنشاء HNSW Indexes (10 دقائق)

```sql
-- Index للبحث السريع بالـ Vector
CREATE INDEX idx_judicial_precedents_embedding 
ON judicial_precedents 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- نفس الشيء للجداول الأخرى
CREATE INDEX idx_articles_embedding ON articles USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_tameems_embedding ON tameems USING hnsw (embedding vector_cosine_ops);
```

**الفائدة:** البحث يصبح أسرع 100x

---

## 2️⃣ Hybrid Search Function (30 دقيقة)

```sql
-- دالة تجمع Vector + FTS في استعلام واحد
CREATE OR REPLACE FUNCTION hybrid_search(
  query_text TEXT,
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 10
)
RETURNS TABLE (...)
```

**اختبار:** سؤال حقيقي + التحقق من النتائج

---

## 3️⃣ اختبار Backend API (2 ساعة)

| الاختبار | الطريقة |
|----------|---------|
| `/api/v1/search` | Postman / curl |
| `/api/v1/query` | أسئلة حقيقية |
| Citation accuracy | التحقق من الاستشهادات |

**أسئلة الاختبار:**
- "ما هي شروط صحة عقد البيع؟"
- "المادة 38 من نظام التجارة"
- "قضية الشركة التجارية"

---

## 4️⃣ بناء Frontend — React + Vite (2-3 أيام)

### اليوم 1: Setup + Chat Interface
```
- React + Vite + TypeScript
- Tailwind CSS
- Chat UI (مثل ChatGPT)
- ربط بالـ Backend
```

### اليوم 2: Document Viewer + Citations
```
- عرض المصادر
- تمييز المواد القانونية
- روابط للنصوص الأصلية
```

### اليوم 3: Polish + Testing
```
- تحسين UI/UX
- اختبار المستخدم
- إصلاح الأخطاء
```

---

## 5️⃣ اختبار شامل + Benchmark (1 يوم)

| الاختبار | الهدف |
|----------|-------|
| Recall@K | > 70% |
| Citation Accuracy | > 90% |
| Latency | < 2 ثانية |
| Arabic Numbers | "الثالثة والخمسون" = 53 |

---

## 📋 الخلاصة

| المهمة | الوقت | الأولوية |
|--------|-------|----------|
| HNSW Indexes | 10 دقائق | 🔴 عاجل |
| Hybrid Search | 30 دقيقة | 🔴 عاجل |
| Backend Testing | 2 ساعات | 🔴 عاجل |
| **Frontend** | **3 أيام** | 🟡 هذا الأسبوع |
| **Testing** | **1 يوم** | 🟡 نهاية الأسبوع |

---

**الموعد النهائي للـ MVP: 7-8 أيام من الآن** 🚀

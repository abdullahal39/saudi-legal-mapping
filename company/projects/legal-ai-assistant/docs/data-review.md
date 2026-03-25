# 📊 مراجعة البيانات القانونية

**تاريخ المراجعة:** 2025-01-27  
**المسؤول:** كنان - فريق المراجعة

---

## ✅ الجداول المتاحة

| الجدول | عدد السجلات | الحالة | الأعمدة الرئيسية |
|--------|-------------|--------|------------------|
| **articles** | 18,192 | ✅ نشط | id, document_id, chapter_id, article_number, title, content, **embedding**, article_number_normalized, content_normalized, search_terms, article_number_int |
| **judicial_precedents** | 13,624 | ⚠️ بلا embeddings | id, title, content, court_type, main_category, sub_category, year, **embedding=NULL**, content_normalized |
| **tameems** | 339 | ✅ نشط | id, tameem_number, subject, content, **embedding**, content_normalized |
| **documents** | 673 | ✅ نشط | id, title, type, summary, category, pdf_url, **embedding** |
| **chapters** | 952 | ✅ نشط | id, part_id, chapter_number, title |

---

## 🔴 المشكلة الحرجة

### السوابق القضائية (judicial_precedents)
- **عدد السجلات:** 13,624
- **نسبة embeddings:** 0%
- **التأثير:** لا يمكن البحث Vector عن السوابق القضائية

**الحل المقترح:**
```bash
node scripts/generate-embeddings.js judicial_precedents 100
```
**المدة المتوقعة:** 30-60 دقيقة

---

## 📈 ملاحظات إيجابية

1. **التحسينات موجودة:**
   - `article_number_normalized` — حل مشكلة "الثالثة والخمسون ≠ 53"
   - `content_normalized` — normalized text للـ FTS
   - `search_terms` — مصطلحات البحث
   - `article_number_int` — الرقم كـ integer

2. **الـ pgvector:**
   - عمود `embedding` موجود في معظم الجداول
   - جاهز للـ Hybrid Search

3. **التصنيف:**
   - `court_type` — نوع المحكمة
   - `main_category` + `sub_category` — التصنيف

---

## ❓ نقاط تحتاج توضيح

1. هل يوجد جدول `fiqh` (الفقه)؟ — غير موجود حالياً
2. هل يوجد `laws` (القوانين)؟ — غير موجود، `documents` يؤدي نفس الغرض
3. هل `articles` تحتوي على جميع المواد القانونية؟ — نعم، 18,192 مادة

---

## 🎯 التوصيات الفورية

| الأولوية | المهمة | المدة | المسؤول |
|----------|--------|-------|---------|
| 🔴 عالية | توليد embeddings للسوابق القضائية | 30-60 دقيقة | devops |
| 🟡 متوسطة | التحقق من جودة embeddings الحالية | 15 دقيقة | backend |
| 🟢 منخفضة | إنشاء indexes للـ Hybrid Search | 10 دقائق | devops |

---

**الخلاصة:** البنية جيدة والتحسينات موجودة. المشكلة الوحيدة هي embeddings السوابق القضائية.

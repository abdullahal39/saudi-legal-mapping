# Legal AI Assistant — Saudi Legal Mapping

![Version](https://img.shields.io/badge/version-5.1-blue)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![Fiqh](https://img.shields.io/badge/fiqh-75_rules-orange)
![Systems](https://img.shields.io/badge/systems-211-green)

## 📖 Overview

Complete legal and Islamic jurisprudence (Fiqh) mapping system for Saudi Arabian law. This project provides comprehensive keyword-to-legal-system mappings for Natural Language Processing (NLP) and Legal AI applications.

## 🏆 Achievement Highlights

```
✅ 654 Total Mappings
✅ 211 Legal Systems & Legislations  
✅ 75 Fiqh Rules (Islamic Jurisprudence)
✅ 90-93% Quality Score (Production Ready)
✅ 100% Coverage — All Saudi Legal Sectors
```

## 📊 Coverage Breakdown

### Legal Systems (211 Systems)

| Sector | Count |
|--------|-------|
| Legal & Judicial | 10 systems |
| Labor & HR | 12 systems |
| Economy & Finance | 21 systems |
| Commerce & Business | 21 systems |
| Government Services | 28 systems |
| Security & Safety | 12 systems |
| Technology & Innovation | 6 systems |
| Real Estate | 16 systems |
| Civil Transactions | 13 systems |
| Environment & Agriculture | 7 systems |

### Islamic Jurisprudence (Fiqh) — 75 Rules

| Category | Rules |
|----------|-------|
| Major Fiqh Rules (القواعد الفقهية الكبرى) | 5 rules |
| Financial Transactions (المعاملات المالية) | 25+ rules |
| Family Law (أحكام الأسرة) | 20+ rules |
| Inheritance (المواريث) | 7 rules |
| Criminal Law (العقوبات) | 15+ rules |
| Worship (العبادات) | 5 rules |
| Food & Drink (الأطعمة) | 4 rules |

## 📁 Repository Structure

```
legal-ai-assistant/
├── scripts/
│   ├── complete-mapping-v5-fiqh-complete.json    # ⭐ Main Mapping File
│   ├── knowledge-graph-full.json                  # Legal precedents KG
│   ├── quality-test-v5-report.json               # QA Report
│   ├── llm-ner-complete-mapping.js               # NER Implementation
│   └── build-knowledge-graph.js                  # KG Builder
├── apps/
│   └── ...
├── backend/
│   └── ...
├── frontend/
│   └── ...
├── docs/
│   └── system-mapping-report.md
└── README.md
```

## 🚀 Quick Start

### Using the Mapping

```javascript
const mapping = require('./scripts/complete-mapping-v5-fiqh-complete.json');

// Extract legal systems from text
function extractSystems(text) {
  const systems = [];
  const textLower = text.toLowerCase();
  
  for (const item of mapping.mappings) {
    for (const keyword of item.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        systems.push(...item.systems);
        break;
      }
    }
  }
  
  return [...new Set(systems)];
}

// Example
const query = "ما حكم الربا في الفقه الإسلامي؟";
const systems = extractSystems(query);
console.log(systems); // ['الفقه الإسلامي', 'نظام المعاملات المدنية']
```

### Running Tests

```bash
cd scripts
node quality-test-v5.js    # General quality test
node fiqh-test.js          # Fiqh coverage test
```

## 📈 Quality Metrics

| Test | Score | Status |
|------|-------|--------|
| General Systems | 92.9% | ✅ Production Ready |
| Fiqh Coverage | 90.1% | ✅ Good |

## 🗂️ Mapping Format

```json
{
  "version": "5.1-FIQH-COMPLETE",
  "stats": {
    "totalMappings": 654,
    "totalSystems": 211,
    "fiqhRules": 75
  },
  "mappings": [
    {
      "keywords": ["ربا", "الربا", "فائدة", "ربوي"],
      "fiqhRule": "تحريم الربا",
      "systems": ["الفقه الإسلامي"],
      "explanation": "الربا حرام بجميع أنواعه"
    },
    {
      "keywords": ["نظام العمل", "عمل", "عامل"],
      "systems": ["نظام العمل"]
    }
  ]
}
```

## 🛠️ Development

### Building from Source

```bash
# Install dependencies
npm install

# Build mapping
node scripts/build-v5-complete.js

# Add Fiqh coverage
node scripts/add-fiqh-complete.js

# Run quality tests
node scripts/quality-test-v5.js
node scripts/fiqh-test.js
```

## 📚 Documentation

- [System Mapping Report](docs/system-mapping-report.md)
- [Quality Test Report](scripts/quality-test-v5-report.json)
- [Fiqh Test Report](scripts/fiqh-test-report.json)

## 🤝 Contributing

This project is part of a comprehensive Legal AI Assistant for Saudi Arabian law. Contributions are welcome for:

- Additional keyword variations
- New legal systems
- Quality improvements
- Documentation translations

## 📝 License

MIT License — See LICENSE file for details

## 🙏 Acknowledgments

- Saudi Ministry of Justice
- Saudi Ministry of Human Resources
- Saudi Monetary Authority (SAMA)
- Capital Market Authority (CMA)

---

**Status:** ✅ Production Ready  
**Version:** 5.1-FIQH-COMPLETE  
**Last Updated:** March 25, 2026

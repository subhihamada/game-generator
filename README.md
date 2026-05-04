# 🎮 مولّد الألعاب الذكي — AI Game Generator

تطبيق React يستخدم Gemini AI و Google Search لبناء أي لعبة تطلبها فوراً.

---

## 🚀 تشغيل المشروع

### المتطلبات
- Node.js 16 أو أحدث
- npm أو yarn

### الخطوات

```bash
# 1. تثبيت المكتبات
npm install

# 2. تشغيل المشروع
npm start
```

سيفتح المتصفح تلقائياً على `http://localhost:3000`

---

## 📁 هيكل المشروع

```
game-generator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx        ← شاشة البحث
│   │   ├── HomeScreen.module.css
│   │   ├── LoadingScreen.jsx     ← شاشة التحميل
│   │   ├── LoadingScreen.module.css
│   │   ├── GameScreen.jsx        ← شاشة اللعبة
│   │   └── GameScreen.module.css
│   ├── games/
│   │   ├── index.js              ← تصدير الألعاب المدمجة
│   │   ├── chess.js              ← شطرنج
│   │   ├── snake.js              ← ثعبان
│   │   └── tictactoe.js          ← تيك تاك تو
│   ├── hooks/
│   │   └── useGameGenerator.js   ← منطق التوليد
│   ├── api.js                    ← Gemini + Google APIs
│   ├── config.js                 ← مفاتيح API
│   ├── App.jsx
│   ├── App.css
│   └── index.js
└── package.json
```

---

## 🔑 API Keys

الـ keys موجودة في `src/config.js`:

| المفتاح | الاستخدام |
|---------|-----------|
| `GEMINI_KEY` | توليد المعلومات وكود اللعبة |
| `GOOGLE_KEY` | البحث عن صور |
| `SEARCH_CX`  | معرّف محرك البحث المخصص |

---

## 🎮 الألعاب المدمجة (بدون API)

| الاسم | الوصف |
|-------|-------|
| شطرنج | لعبة شطرنج كاملة |
| ثعبان | لعبة Snake الكلاسيكية |
| تيك تاك تو | لعبة X O |

---

## 🛠️ البناء للإنتاج

```bash
npm run build
```

ينتج مجلد `build/` جاهز للرفع.

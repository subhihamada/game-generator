import { useState, useCallback } from 'react';
import { askGemini, searchImages } from '../api';
import { getBuiltin } from '../games';

export const STEPS = [
  '🔍 جاري تحليل اللعبة...',
  '🤖 Gemini يجمع المعلومات...',
  '⚙️  جاري بناء كود اللعبة...',
  '🖼️  جاري البحث عن صور...',
  '✅ اللعبة جاهزة!',
];

const META_PROMPT = (name) => `أنت مطور ألعاب خبير. المستخدم يريد لعبة: "${name}"
أعطني JSON فقط (بدون أي markdown أو نص إضافي) بهذا الشكل الدقيق:
{
  "name": "اسم اللعبة بالعربي",
  "description": "وصف مختصر 2-3 جمل",
  "category": "نوع اللعبة",
  "players": "عدد اللاعبين",
  "difficulty": "مستوى الصعوبة",
  "rules": ["قاعدة 1","قاعدة 2","قاعدة 3","قاعدة 4","قاعدة 5"],
  "searchQuery": "english image search query for this game"
}`;

const CODE_PROMPT = (name) => `أنت مطور ألعاب محترف متخصص بـ HTML/CSS/JavaScript.
اكتب لعبة "${name}" كاملة 100% في ملف HTML واحد فقط.

شروط أساسية:
- واجهة جميلة داكنة، ألوان جذابة، أنيميشن
- تعليمات واضحة داخل الصفحة
- إذا كانت ضد الكمبيوتر: اجعل الذكاء الاصطناعي يعمل جيداً
- كل النصوص بالعربي
- يعمل داخل srcdoc في iframe (لا تستخدم fetch أو localStorage)

اكتب HTML الكامل من <!DOCTYPE html> إلى </html> فقط، بدون أي شرح:`;

export function useGameGenerator() {
  const [screen, setScreen]     = useState('home');   // 'home' | 'loading' | 'game'
  const [step, setStep]         = useState(0);
  const [error, setError]       = useState('');
  const [gameData, setGameData] = useState(null);
  const [images, setImages]     = useState([]);
  const [htmlCode, setHtmlCode] = useState('');

  const generate = useCallback(async (name) => {
    if (!name.trim()) { setError('من فضلك أدخل اسم اللعبة'); return; }

    setError('');
    setScreen('loading');
    setStep(0);

    try {
      // ── Step 0-1: Get game metadata from Gemini ──────────────────
      setStep(0);
      let meta;
      try {
        setStep(1);
        meta = await askGemini(META_PROMPT(name), true);
      } catch {
        meta = {
          name,
          description: `لعبة ${name} الممتعة`,
          category: 'لعبة',
          players: '1-2',
          difficulty: 'متوسط',
          rules: ['اتبع تعليمات اللعبة', 'استمتع باللعب'],
          searchQuery: name + ' board game',
        };
      }

      // ── Step 2: Generate HTML game code ──────────────────────────
      setStep(2);
      let html = getBuiltin(name); // try builtin first (instant, no API)

      if (!html) {
        const raw = await askGemini(CODE_PROMPT(name));
        html = raw.replace(/```html|```/g, '').trim();
        if (!html.startsWith('<!')) html = '<!DOCTYPE html>' + html;
      }

      // ── Step 3: Google Image Search ──────────────────────────────
      setStep(3);
      const imgs = await searchImages(meta.searchQuery || name + ' game');

      // ── Done ─────────────────────────────────────────────────────
      setStep(4);
      setGameData(meta);
      setImages(imgs);
      setHtmlCode(html);
      setScreen('game');

    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setScreen('home');
    }
  }, []);

  const goHome = useCallback(() => {
    setScreen('home');
    setError('');
  }, []);

  return { screen, step, error, gameData, images, htmlCode, generate, goHome };
}

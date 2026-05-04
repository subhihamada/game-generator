import { GEMINI_URL, GOOGLE_SEARCH_URL } from './config';

// ══════════════════════════════════════════════
//  Gemini API
// ══════════════════════════════════════════════

export async function askGemini(prompt, parseJson = false) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${res.statusText}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  if (!parseJson) return text;

  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

// ══════════════════════════════════════════════
//  Google Image Search
// ══════════════════════════════════════════════

export async function searchImages(query) {
  try {
    const res = await fetch(GOOGLE_SEARCH_URL(query));
    const data = await res.json();
    return (data.items || []).map((item) => item.link);
  } catch {
    return [];
  }
}

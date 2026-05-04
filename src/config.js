// ══════════════════════════════════════════════
//  API Configuration
// ══════════════════════════════════════════════

export const GEMINI_KEY   = "";
export const GOOGLE_KEY   = "";
export const SEARCH_CX    = "";

export const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

export const GOOGLE_SEARCH_URL = (query) =>
  `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${SEARCH_CX}&q=${encodeURIComponent(query)}&searchType=image&num=5&safe=active`;

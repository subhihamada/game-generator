# 🎮 AI Game Generator

A React application that uses Gemini AI and Google Search to instantly generate any game you request.

---

## 🚀 Running the Project

### Requirements

* Node.js 16 or higher
* npm or yarn

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the project
npm start
```

The browser will automatically open at `http://localhost:3000`

---

## 📁 Project Structure

```
game-generator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx        ← Search screen
│   │   ├── HomeScreen.module.css
│   │   ├── LoadingScreen.jsx     ← Loading screen
│   │   ├── LoadingScreen.module.css
│   │   ├── GameScreen.jsx        ← Game screen
│   │   └── GameScreen.module.css
│   ├── games/
│   │   ├── index.js              ← Game exports
│   │   ├── chess.js              ← Chess game
│   │   ├── snake.js              ← Snake game
│   │   └── tictactoe.js         ← Tic Tac Toe game
│   ├── hooks/
│   │   └── useGameGenerator.js   ← Generation logic
│   ├── api.js                    ← Gemini + Google APIs
│   ├── config.js                 ← API keys
│   ├── App.jsx
│   ├── App.css
│   └── index.js
└── package.json
```

---

## 🔑 API Keys Setup

You MUST create and configure your API keys inside `src/config.js`.

Add the following code:

```javascript
export const GEMINI_KEY   = "";
export const GOOGLE_KEY   = "";
export const SEARCH_CX    = "";
```

### 🔒 Important

* Do NOT run the project without filling these keys
* These keys are required for:

  * Gemini AI game generation
  * Google image search
  * Custom search engine functionality

---

## 🎮 Built-in Games (No API required)

| Name        | Description        |
| ----------- | ------------------ |
| Chess       | Full chess game    |
| Snake       | Classic Snake game |
| Tic Tac Toe | X O game           |

---

## 🛠️ Build for Production

```bash
npm run build
```

This generates a `build/` folder ready for deployment.

import { useState } from 'react';
import styles from './HomeScreen.module.css';

const QUICK_GAMES = [
  { label: 'شطرنج ♟',       value: 'شطرنج' },
  { label: 'تيك تاك تو ✕○', value: 'تيك تاك تو' },
  { label: 'ثعبان 🐍',       value: 'ثعبان' },
  { label: 'ماين سويبر 💣',  value: 'ماين سويبر' },
  { label: 'سودوكو 🔢',      value: 'سودوكو' },
  { label: 'بازل 🧩',        value: 'بازل' },
];

export default function HomeScreen({ onGenerate, error }) {
  const [name, setName] = useState('');

  const submit = () => onGenerate(name);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎮 مولّد الألعاب الذكي</h1>
        <p className={styles.subtitle}>اكتب اسم أي لعبة وسنبنيها لك فوراً بمساعدة Gemini AI</p>
      </header>

      <div className={styles.searchRow}>
        <input
          className={styles.input}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="مثال: شطرنج، ثعبان، تيك تاك تو، ماين سويبر..."
        />
        <button className={styles.btn} onClick={submit}>
          🚀 ابنِ اللعبة
        </button>
      </div>

      {error && (
        <div className={styles.error}>⚠️ {error}</div>
      )}

      <div className={styles.quickGrid}>
        {QUICK_GAMES.map(g => (
          <button
            key={g.value}
            className={styles.quickBtn}
            onClick={() => { setName(g.value); onGenerate(g.value); }}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );
}

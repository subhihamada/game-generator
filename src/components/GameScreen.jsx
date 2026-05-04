import { useState, useEffect, useRef } from 'react';
import styles from './GameScreen.module.css';

export default function GameScreen({ gameData, images, htmlCode, onBack }) {
  const [activeTab, setActiveTab] = useState('play');
  const iframeRef = useRef(null);

  // Inject game HTML into iframe via srcdoc (avoids CORS completely)
  useEffect(() => {
    if (activeTab === 'play' && iframeRef.current && htmlCode) {
      iframeRef.current.srcdoc = htmlCode;
    }
  }, [htmlCode, activeTab]);

  return (
    <div className={styles.container}>
      {/* Back */}
      <button className={styles.backBtn} onClick={onBack}>← العودة</button>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <h2 className={styles.gameName}>🎮 {gameData.name}</h2>
        <p className={styles.desc}>{gameData.description}</p>
        <div className={styles.badges}>
          <span className={styles.badge}>📁 {gameData.category}</span>
          <span className={styles.badge}>👥 {gameData.players} لاعب</span>
          <span className={styles.badge}>⭐ {gameData.difficulty}</span>
        </div>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className={styles.imagesRow}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={gameData.name}
              className={styles.thumb}
              onError={e => { e.target.style.display = 'none'; }}
            />
          ))}
        </div>
      )}

      {/* Game Panel */}
      <div className={styles.panel}>
        <div className={styles.tabs}>
          {[['play', '🎮 العب الآن'], ['rules', '📋 القواعد']].map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'play' && (
          <iframe
            ref={iframeRef}
            title="game"
            sandbox="allow-scripts allow-same-origin"
            className={styles.iframe}
          />
        )}

        {activeTab === 'rules' && (
          <div className={styles.rules}>
            <h3 className={styles.rulesTitle}>📋 قواعد اللعبة</h3>
            <ul className={styles.rulesList}>
              {(gameData.rules || []).map((r, i) => (
                <li key={i} className={styles.ruleItem}>🎮 {r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

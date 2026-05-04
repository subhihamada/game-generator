import styles from './LoadingScreen.module.css';
import { STEPS } from '../hooks/useGameGenerator';

export default function LoadingScreen({ step }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p className={styles.msg}>{STEPS[step]}</p>
      <div className={styles.dots}>
        {STEPS.slice(0, 4).map((_, i) => (
          <div
            key={i}
            className={styles.dot}
            style={{ background: i <= step ? '#a78bfa' : '#2d2d4e' }}
          />
        ))}
      </div>
    </div>
  );
}

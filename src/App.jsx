import { useGameGenerator } from './hooks/useGameGenerator';
import HomeScreen    from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import GameScreen    from './components/GameScreen';
import './App.css';

export default function App() {
  const {
    screen, step, error,
    gameData, images, htmlCode,
    generate, goHome,
  } = useGameGenerator();

  return (
    <div className="app">
      {screen === 'home'    && <HomeScreen    onGenerate={generate} error={error} />}
      {screen === 'loading' && <LoadingScreen step={step} />}
      {screen === 'game'    && (
        <GameScreen
          gameData={gameData}
          images={images}
          htmlCode={htmlCode}
          onBack={goHome}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import GameSetup from '../components/GameSetup';
import GamePlay from '../components/GamePlay';
import ScoreDisplay from '../components/ScoreDisplay';
import '../styles/GamePage.css';

const GamePage: React.FC = () => {
  const [phase, setPhase] = useState<'setup' | 'play' | 'score'>('setup');
  const [duration, setDuration] = useState<number>(60);
  const [finalScore, setFinalScore] = useState<{ correct: number; incorrect: number } | null>(null);

  // Callback from GameSetup: receives the game duration then starts the game
  const handleStart = (gameDuration: number) => {
    setDuration(gameDuration);
    setPhase('play');
  };

  // Callback from GamePlay: receives the final score then moves to score display phase
  const handleGameEnd = (score: { correct: number; incorrect: number }) => {
    setFinalScore(score);
    setPhase('score');
  };

  // Optionally restart the game
  const handleRestart = () => {
    setFinalScore(null);
    setPhase('setup');
  };

  return (
    <div className="gamepage-container">
      <header className="mb-4">
        <h1 className="gamepage-title">FizzBuzz Game</h1>
      </header>
      <main className="gamepage-card">
        {phase === 'setup' && <GameSetup onStart={handleStart} />}
        {phase === 'play' && <GamePlay duration={duration} onGameEnd={handleGameEnd} />}
        {phase === 'score' && finalScore && (
          <ScoreDisplay score={finalScore} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
};

export default GamePage;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation
import '../styles/ScoreDisplay.css'; // Import custom styles

interface ScoreDisplayProps {
  score: {
    correct: number;
    incorrect: number;
  };
  onRestart?: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, onRestart }) => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="score-container">
      <div className="score-card">
        <h2 className="score-title">Game Over</h2>
        <p className="score-text">
          Correct Answers: <span className="correct-score">{score.correct}</span>
        </p>
        <p className="score-text">
          Incorrect Answers: <span className="incorrect-score">{score.incorrect}</span>
        </p>

        {onRestart && (
          <button className="btn-restart" onClick={onRestart}>
            Restart Game
          </button>
        )}

        {/* Return to Home Button */}
        <button className="btn-home" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
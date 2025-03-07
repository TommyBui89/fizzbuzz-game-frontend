import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameSetup.css';

interface GameSetupProps {
  onStart: (duration: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStart }) => {
  const [duration, setDuration] = useState(60);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (duration >= 10) {
      onStart(duration);
    }
  };

  return (
    <div className="gamesetup-container">
      <div className="gamesetup-card">
        <h2 className="gamesetup-title">FizzBuzz Game Setup</h2>
        <p className="gamesetup-text">Welcome to the FizzBuzz Game! Follow these rules:</p>

        <ul className="gamesetup-rules">
          <li><strong>Fizz:</strong> If a number is divisible by <strong>3</strong>, type <strong>"Fizz"</strong>.</li>
          <li><strong>Buzz:</strong> If a number is divisible by <strong>5</strong>, type <strong>"Buzz"</strong>.</li>
          <li><strong>FizzBuzz:</strong> If divisible by <strong>both 3 and 5</strong>, type <strong>"FizzBuzz"</strong>.</li>
          <li>Otherwise, enter the <strong>number itself</strong>.</li>
          <li>Try to answer correctly as many times as possible before time runs out!</li>
        </ul>

        <form onSubmit={handleSubmit} className="gamesetup-form">
          <div className="gamesetup-duration">
            <label className="form-label" htmlFor="duration">Game Duration (seconds):</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="10"
              className="form-control"
              aria-label="Set game duration in seconds"
            />
          </div>

          <button type="submit" className="btn btn-custom" disabled={duration < 10}>
            Start Game
          </button>

          <button type="button" className="btn btn-home" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameSetup;

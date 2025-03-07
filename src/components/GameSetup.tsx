import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation
import '../styles/GameSetup.css'; // Import custom styles

interface GameSetupProps {
  onStart: (duration: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStart }) => {
  const [duration, setDuration] = useState(60);
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(duration);
  };

  return (
    <div className="gamesetup-card">
      <div className="card-body">
        <h2 className="gamesetup-title">Game Setup</h2>
        <p className="gamesetup-text">
          Welcome to the FizzBuzz Game! In this game:
        </p>
        <ul className="gamesetup-rules">
          <li>Each round, a number will appear on the screen.</li>
          <li>If the number is divisible by <strong>3</strong>, type <strong>"Fizz"</strong>.</li>
          <li>If the number is divisible by <strong>5</strong>, type <strong>"Buzz"</strong>.</li>
          <li>If the number is divisible by <strong>both 3 and 5</strong>, type <strong>"FizzBuzz"</strong>.</li>
          <li>Otherwise, type the number itself.</li>
          <li>Try to get as many correct answers as possible before time runs out!</li>
        </ul>
        <form onSubmit={handleSubmit} className="gamesetup-form">
          <div className="gamesetup-duration">
            <label className="form-label">Game Duration (seconds):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="10"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-custom">
            Start Game
          </button>

          {/* Return to Home Button */}
          <button type="button" className="btn btn-home" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameSetup;

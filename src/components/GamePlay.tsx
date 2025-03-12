import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/GamePlay.css';

interface GamePlayProps {
  duration: number;
  onGameEnd: (score: { correct: number; incorrect: number }) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/game";

const GamePlay: React.FC<GamePlayProps> = ({ duration, onGameEnd }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [scoreCorrect, setScoreCorrect] = useState(0);
  const [scoreIncorrect, setScoreIncorrect] = useState(0);
  const [answerEffect, setAnswerEffect] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const scoreCorrectRef = useRef(scoreCorrect);
  const scoreIncorrectRef = useRef(scoreIncorrect);

  useEffect(() => {
    scoreCorrectRef.current = scoreCorrect;
    scoreIncorrectRef.current = scoreIncorrect;
  }, [scoreCorrect, scoreIncorrect]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameEnd({ correct: scoreCorrectRef.current, incorrect: scoreIncorrectRef.current });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onGameEnd]);

  const fetchNumber = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/next`);
      setCurrentNumber(response.data.number);
    } catch (error) {
      console.error("Error fetching number:", error);
    }
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentNumber === null) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/check`, {
        number: currentNumber,
        answer: userAnswer,
      });

      if (response.data.isCorrect) {
        setScoreCorrect((prev) => prev + 1);
        setAnswerEffect('correct-glow');
      } else {
        setScoreIncorrect((prev) => prev + 1);
        setAnswerEffect('wrong-shake');
      }

      setUserAnswer('');
      setTimeout(() => setAnswerEffect(''), 500);
      fetchNumber();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="gameplay-container">
      <div className="gameplay-card">
        <h2 className="gameplay-title">Game In Progress</h2>

        <div className="digital-timer-container">
          <span className="digital-timer">{timeLeft}s</span>
        </div>

        <div className="gameplay-number">
          <p>
            Number: <span className="current-number">{currentNumber ?? "Loading..."}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="gameplay-form">
          <div className="mb-3">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              className={`form-control ${answerEffect}`}
              aria-label="Enter your FizzBuzz answer"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-submit" disabled={!userAnswer.trim()}>
            Submit Answer
          </button>
        </form>

        <div className="score-container">
          <p className="correct-score">Correct: {scoreCorrect}</p>
          <p className="incorrect-score">Incorrect: {scoreIncorrect}</p>
        </div>

        <button className="btn btn-back" onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
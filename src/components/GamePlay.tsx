import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation
import '../styles/GamePlay.css'; // Import custom styles

interface GamePlayProps {
  duration: number; // total game duration in seconds
  onGameEnd: (score: { correct: number; incorrect: number }) => void;
}

const GamePlay: React.FC<GamePlayProps> = ({ duration, onGameEnd }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState('');
  const [scoreCorrect, setScoreCorrect] = useState(0);
  const [scoreIncorrect, setScoreIncorrect] = useState(0);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([currentNumber]);
  const [answerEffect, setAnswerEffect] = useState<string>(''); // Effect class state

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

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  function getCorrectAnswer(num: number): string {
    let answer = '';
    if (num % 3 === 0) answer += 'Fizz';
    if (num % 5 === 0) answer += 'Buzz';
    if (answer === '') answer = num.toString();
    return answer;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = getCorrectAnswer(currentNumber);
    
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setScoreCorrect((prev) => prev + 1);
      setAnswerEffect('correct-flash'); // Apply green flash effect
    } else {
      setScoreIncorrect((prev) => prev + 1);
      setAnswerEffect('wrong-shake'); // Apply red shake effect
    }

    setUserAnswer('');

    setTimeout(() => setAnswerEffect(''), 500); // Remove effect after animation

    let newNumber = generateRandomNumber();
    let attempts = 0;
    while (usedNumbers.includes(newNumber) && attempts < 10) {
      newNumber = generateRandomNumber();
      attempts++;
    }
    setUsedNumbers((prev) => [...prev, newNumber]);
    setCurrentNumber(newNumber);
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
            Number: <span className="current-number">{currentNumber}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="gameplay-form">
          <div className="mb-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              className={`form-control ${answerEffect}`} // Apply dynamic effect
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Submit Answer
          </button>
        </form>

        <div className="score-container">
          <p className="correct-score">Correct: {scoreCorrect}</p>
          <p className="incorrect-score">Incorrect: {scoreIncorrect}</p>
        </div>

        {/* Go Back Button */}
        <button className="btn btn-back" onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
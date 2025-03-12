import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startSession, submitAnswer, getGameById } from "../api";
import {
  GameSessionResponse,
  SubmitAnswerResponse,
  SubmitAnswerRequest,
} from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClock, faRedo, faPlay, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

// Import styles
import "../styles/gameSession.css";
import "../styles/buttons.css";
import "../styles/animations.css";

const GameSession: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [gameName, setGameName] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [userDuration, setUserDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cardState, setCardState] = useState("");

  // Fetch game name
  useEffect(() => {
    if (id) {
      fetchGameName(parseInt(id));
    }
  }, [id]);

  async function fetchGameName(gameId: number) {
    try {
      const game = await getGameById(gameId);
      setGameName(game.name);
    } catch (error) {
      console.error(error);
    }
  }

  // Start session
  async function handleStartSession() {
    if (!id) return;
    try {
      const gameId = parseInt(id);
      const data: GameSessionResponse = await startSession(gameId, userDuration);
      setSessionId(data.sessionId);
      setCurrentNumber(data.number);
      setTimeLeft(userDuration);
    } catch (error) {
      console.error(error);
    }
  }

  // Countdown effect
  useEffect(() => {
    if (!sessionId || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentNumber(null);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionId, timeLeft]);

  // Handle answer submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId || timeLeft <= 0) return;
    
    const request: SubmitAnswerRequest = { answer };
    try {
      const data: SubmitAnswerResponse = await submitAnswer(sessionId, request);

      if (data.correct) {
        setCardState("correct-glow");
      } else {
        setCardState("incorrect-glow shake");
      }

      setTimeout(() => setCardState(""), 1000);

      setCorrectCount(data.score.correctCount);
      setIncorrectCount(data.score.incorrectCount);
      setCurrentNumber(data.nextNumber);
      setAnswer("");
    } catch (error) {
      console.error(error);
    }
  }

  function handleRestart() {
    setSessionId(null);
    setTimeLeft(0);
    setAnswer("");
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentNumber(null);
  }

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  return (
    <div className="game-session-container fade-in">
      <div className={`game-session-box ${cardState}`}>
        <h1 className="session-title">Game Session</h1>
        {gameName && <h2 className="session-subtitle">Playing: {gameName}</h2>}

        {!sessionId ? (
          <div className="session-start">
            <label>Set Duration (seconds):</label>
            <input
              type="number"
              value={userDuration}
              onChange={(e) => setUserDuration(parseInt(e.target.value) || 0)}
              className="session-input"
            />
            <div className="session-buttons">
              <button className="btn-primary" onClick={handleStartSession}>
                <FontAwesomeIcon icon={faPlay} /> Start Session
              </button>
              <button className="btn-go-home" onClick={() => navigate("/games")}>
                <FontAwesomeIcon icon={faHome} /> Go Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="digital-clock">{formattedTime}</div>
            <p className="score-info">
              ✅ {correctCount} Correct | ❌ {incorrectCount} Incorrect
            </p>

            {timeLeft === 0 || currentNumber === null ? (
              <div className="session-complete">
                <p>⏳ Time is up! Session complete.</p>
                <button className="btn-restart" onClick={handleRestart}>
                  <FontAwesomeIcon icon={faRedo} /> Restart
                </button>
                <button className="btn-go-home" onClick={() => navigate("/games")}>
                  <FontAwesomeIcon icon={faHome} /> Go Home
                </button>
              </div>
            ) : (
              <div className="question-section">
                <h3 className="question-number">Number: {currentNumber}</h3>
                <form onSubmit={handleSubmit} className="session-form">
                  <input 
                    type="text" 
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)} 
                    required 
                    className="session-input"
                  />
                  <button className="btn-submit">
                    <FontAwesomeIcon icon={faCheck} /> Submit
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameSession;
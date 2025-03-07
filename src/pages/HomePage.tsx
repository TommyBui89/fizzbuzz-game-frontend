import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <div className="card-body">
          <h1 className="homepage-title">Welcome to FizzBuzz Game</h1>
          <p className="homepage-text">
            This is a customizable FizzBuzz-style game. Create or join a game session and start playing!
          </p>
          <Link to="/game" className="btn btn-custom">
            Start Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

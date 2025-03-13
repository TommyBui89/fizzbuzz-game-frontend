import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../types";
import { getGames, deleteGame } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faPlay } from "@fortawesome/free-solid-svg-icons";

import "../styles/gamesList.css";
import "../styles/buttons.css";
import "../styles/animations.css";

const GamesList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch games");
    }
  }

  async function handleDelete(id: number | undefined) {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      await deleteGame(id);
      await fetchGames();
    } catch (error) {
      console.error(error);
      alert("Failed to delete game");
    }
  }

  return (
    <div className="games-list-container fade-in">
      <div className="games-header">
        <h1 className="games-title">Available Games</h1>
        <button className="btn-create" onClick={() => navigate("/games/new")}>
          <FontAwesomeIcon icon={faPlus} /> Create New Game
        </button>
      </div>

      <div className="games-grid">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-card-body">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-author">by {game.author}</p>
              </div>

              <div className="game-actions">
                <button className="btn-edit" onClick={() => navigate(`/games/${game.id}/edit`)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(game.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button className="btn-start" onClick={() => navigate(`/games/${game.id}/session`)}>
                  <FontAwesomeIcon icon={faPlay} /> Start
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-games">No games available. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default GamesList;

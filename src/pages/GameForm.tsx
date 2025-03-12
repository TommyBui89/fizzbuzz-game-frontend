import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGame, getGameById, updateGame } from "../api";
import { Game } from "../types";
import RuleFields from "../components/RuleFields";

// Import styles
import "../styles/gameForm.css";
import "../styles/buttons.css";

const GameForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [game, setGame] = useState<Game>({
    name: "",
    author: "",
    rules: [],
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchGame(parseInt(id));
    }
  }, [id]);

  async function fetchGame(gameId: number) {
    try {
      const data = await getGameById(gameId);
      setGame(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch game");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setGame((prev) => ({ ...prev, [name]: value }));
  }

  function handleRulesChange(updatedRules: any) {
    setGame((prev) => ({ ...prev, rules: updatedRules }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isEdit && id) {
        // Update an existing game
        await updateGame(parseInt(id), {
          id: parseInt(id),
          name: game.name,
          author: game.author,
          rules: game.rules.map((r) => ({
            divisor: r.divisor,
            replacementText: r.replacementText,
          })),
        });
        alert("Game updated!");
      } else {
        // Create a new game and return to the games list
        await createGame({
          name: game.name,
          author: game.author,
          rules: game.rules.map((r) => ({
            divisor: r.divisor,
            replacementText: r.replacementText,
          })),
        });
        alert("Game created!");
      }
  
      // Redirect to the Games List
      navigate("/games");
    } catch (error) {
      console.error(error);
      alert("Failed to save game");
    }
  }  

  return (
    <div className="game-form-container fade-in">
      <div className="game-form-card">
        <h1 className="form-title">{isEdit ? "Edit Game" : "Create Game"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Game Name</label>
            <input
              className="form-input"
              name="name"
              value={game.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              className="form-input"
              name="author"
              value={game.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* RuleFields Component */}
          <RuleFields rules={game.rules} onChange={handleRulesChange} />

          <div className="button-group">
            <button type="submit" className="btn-submit">
              {isEdit ? "Update Game" : "Create Game"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/games")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;

import {
    Game,
    CreateGameDto,
    UpdateGameDto,
    GameSessionResponse,
    SubmitAnswerResponse,
    SubmitAnswerRequest,
  } from "./types";
  
  const API_BASE = "http://localhost:8080/api";
  
  // Fetch all games
  export async function getGames(): Promise<Game[]> {
    const res = await fetch(`${API_BASE}/game`);
    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json();
  }
  
  // Fetch one game by ID
  export async function getGameById(id: number): Promise<Game> {
    const res = await fetch(`${API_BASE}/game/${id}`);
    if (!res.ok) throw new Error("Failed to fetch game");
    return res.json();
  }
  
  // Create a new game
  export async function createGame(dto: CreateGameDto): Promise<Game> {
    const res = await fetch(`${API_BASE}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error("Failed to create game");
    return res.json();
  }
  
  // Update an existing game
  export async function updateGame(id: number, dto: UpdateGameDto): Promise<void> {
    const res = await fetch(`${API_BASE}/game/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error("Failed to update game");
  }
  
  // Delete a game
  export async function deleteGame(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/game/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete game");
  }
  
  // Start a session for a given game
  export async function startSession(
    gameId: number,
    durationSeconds: number
  ): Promise<GameSessionResponse> {
    const res = await fetch(
      `${API_BASE}/games/${gameId}/sessions?durationSeconds=${durationSeconds}`,
      { method: "POST" }
    );
    if (!res.ok) throw new Error("Failed to start session");
    return res.json();
  }
  
  // Submit an answer
  export async function submitAnswer(
    sessionId: string,
    dto: SubmitAnswerRequest
  ): Promise<SubmitAnswerResponse> {
    const res = await fetch(`${API_BASE}/sessions/${sessionId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error("Failed to submit answer");
    return res.json();
  }
  
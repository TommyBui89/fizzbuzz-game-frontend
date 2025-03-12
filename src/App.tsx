import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GamesList from "./pages/GamesList";
import GameForm from "./pages/GameForm";
import GameSession from "./pages/GameSession";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/games" />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/games/new" element={<GameForm />} />
        <Route path="/games/:id/edit" element={<GameForm />} />
        <Route path="/games/:id/session" element={<GameSession />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

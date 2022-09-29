import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Index from "./pages/Index";
import Match from "./pages/Match";
import Team from "./pages/Team";
import Standings from "./pages/Standings";
import Player from "./pages/Player";
import "./index.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/fixture/:id" element={<Match />} />
        <Route path="/teams/:teamId/fixture/:id" element={<Match />} />
        <Route path="/standings/:leagueId/fixture/:id" element={<Match />} />
        <Route
          path="/standings/:leagueId/teams/:teamId/fixture/:id"
          element={<Match />}
        />
        <Route path="/fixture/:id/teams/:teamId" element={<Team />} />
        <Route path="/teams/:teamId" element={<Team />} />
        <Route path="/standings/:leagueId/teams/:teamId" element={<Team />} />
        <Route path="/standings/:leagueId" element={<Standings />} />
        <Route path="/player/:playerId" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

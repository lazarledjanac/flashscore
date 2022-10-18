import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import { IndexPage, Match, Team, Standings, Player, Coach } from "./pages";
import "./index.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
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
        <Route path="/coach/:coachId" element={<Coach />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

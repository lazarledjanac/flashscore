import React from "react";
import { useGetFixtureByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";

const Lineups = ({ id }) => {
  const navigate = useNavigate();
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  const lineups = match?.lineups.length > 0;

  const Player = ({ player }) => {
    let style;
    if (player == 0) style = { borderRadius: "15px 15px 0 0" };
    if (player == 10) style = { borderRadius: "0 0 15px 15px" };
    return (
      <div className="starting-lineup-player" style={style}>
        <div
          style={{ textAlign: "left", display: "flex", flexDirection: "row" }}
          onClick={() =>
            navigate(
              `/player/${match?.lineups[0]?.startXI[player]?.player?.id}`
            )
          }
        >
          <div>{match?.lineups[0]?.startXI[player]?.player?.number}</div>
          <div style={{ flex: 4 }}>
            {match?.lineups[0]?.startXI[player]?.player?.name}
          </div>
        </div>
        <div
          style={{ textAlign: "right", display: "flex", flexDirection: "row" }}
          onClick={() =>
            navigate(
              `/player/${match?.lineups[1]?.startXI[player]?.player?.id}`
            )
          }
        >
          <div style={{ flex: 4 }}>
            {match?.lineups[1]?.startXI[player]?.player?.name}
          </div>
          <div>{match?.lineups[1]?.startXI[player]?.player?.number}</div>
        </div>
      </div>
    );
  };
  const Players = () => {
    let players = [];

    for (let i = 0; i < 11; i++) {
      players[i] = i;
    }
    return (
      <>
        {players.map((player) => (
          <Player player={player} />
        ))}
      </>
    );
  };

  const Substitute = ({ substitute }) => {
    let style;
    if (substitute == 0) style = { borderRadius: "15px 15px 0 0" };
    if (substitute == 8) style = { borderRadius: "0 0 15px 15px" };
    return (
      <div className="starting-lineup-player" style={style}>
        <div
          style={{ textAlign: "left", display: "flex", flexDirection: "row" }}
        >
          <div>
            {match?.lineups[0]?.substitutes[substitute]?.player?.number}
          </div>
          <div style={{ flex: 4 }}>
            {match?.lineups[0]?.substitutes[substitute]?.player?.name}
          </div>
        </div>
        <div
          style={{ textAlign: "right", display: "flex", flexDirection: "row" }}
        >
          <div style={{ flex: 4 }}>
            {match?.lineups[1]?.substitutes[substitute]?.player?.name}
          </div>
          <div>
            {match?.lineups[1]?.substitutes[substitute]?.player?.number}
          </div>
        </div>
      </div>
    );
  };
  const Substitutes = () => {
    let substitutes = [];

    for (let i = 0; i < 9; i++) {
      substitutes[i] = i;
    }
    return (
      <>
        {substitutes.map((substitute) => (
          <Substitute substitute={substitute} />
        ))}
      </>
    );
  };
  if (lineups) {
    return (
      <div className="lineups-container">
        <h1>Lineups</h1>
        <div className="match-summary">
          <div style={{ textAlign: "left" }}>4-4-2</div>
          <div style={{ flex: 2 }}>STARTING LINEUPS</div>
          <div style={{ textAlign: "right" }}>4-2-3-1</div>
        </div>
        <Players />
        <div className="match-summary">
          <div>SUBSTITUTES</div>
        </div>
        <Substitutes />
        <div className="match-summary">
          <div>COACH</div>
        </div>
        <div
          className="starting-lineup-player"
          style={{ borderRadius: "15px" }}
        >
          <div
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => navigate(`/coach/${match?.lineups[0]?.coach?.id}`)}
          >
            {match?.lineups[0]?.coach?.name}
          </div>
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => navigate(`/coach/${match?.lineups[1]?.coach?.id}`)}
          >
            {match?.lineups[1]?.coach?.name}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Lineups are not available for this match</p>
      </div>
    );
  }
};

export default Lineups;

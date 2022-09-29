import React from "react";
import "../index.scss";
import { AiOutlineStar } from "react-icons/ai";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const Fixture = ({ game }) => {
  let navigate = useNavigate();

  const halftimeScoreHome = game?.score?.halftime?.home;
  const halftimeScoreAway = game?.score?.halftime?.away;
  return (
    <div
      className="game-container"
      onClick={() => {
        navigate(`/fixture/${game.fixture.id}`);
      }}
    >
      {/* <div className="game-league">
        <AiFillStar style={{ color: "orange" }} /> {league}
        <a style={{ float: "right" }}>
          Standings <IoIosArrowUp />
        </a>
      </div> */}
      <div className="game">
        <AiOutlineStar style={{ paddingRight: "2vw" }} />
        <div style={{ width: "6vw" }}>
          {DateTime.fromISO(game?.fixture?.date).toFormat("T")}
        </div>
        <div className="teams-container">
          <div>
            <img src={game?.teams?.home?.logo} className="img" />
            {game?.teams?.home?.name}
          </div>
          <div>
            <img src={game?.teams?.away?.logo} className="img" />
            {game?.teams?.away?.name}
          </div>
        </div>
        <div className="score_container">
          <div>
            <b>{game?.goals?.home}</b>
          </div>
          <div>
            <b>{game?.goals?.away}</b>
          </div>
        </div>
        <div className="halftime_score_container">
          <div>
            {halftimeScoreHome != null && "(" + halftimeScoreHome + ")"}
          </div>
          <div>
            {halftimeScoreAway != null && "(" + halftimeScoreAway + ")"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fixture;

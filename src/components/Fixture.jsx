import React, { useState } from "react";
import "../index.scss";
import { AiOutlineStar } from "react-icons/ai";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const Fixture = ({ game }) => {
  let navigate = useNavigate();

  const halftimeScoreHome = game?.score?.halftime?.home;
  const halftimeScoreAway = game?.score?.halftime?.away;

  const [navigation, setNavigation] = useState(`/fixture/${game.fixture.id}`);

  return (
    <>
      {/* <div className="game-league">
        <AiFillStar style={{ color: "orange" }} /> {league}
        <a style={{ float: "right" }}>
          Standings <IoIosArrowUp />
        </a>
      </div> */}
      {game?.goals?.home != null && (
        <div
          className="game"
          onClick={() => {
            navigate(navigation);
          }}
          key={game.fixture.id}
        >
          <i>
            <AiOutlineStar style={{ paddingRight: "2vw" }} />
          </i>
          <div className="game-time">
            {DateTime.fromISO(game?.fixture?.date).toFormat("T")}
          </div>
          <div className="teams-container">
            <div className="game-team">
              <img src={game?.teams?.home?.logo} className="img" />
              <strong
                style={{ fontWeight: "normal" }}
                onClick={() => navigate(navigation)}
                onMouseEnter={() =>
                  setNavigation(`/teams/${game?.teams?.home?.id}`)
                }
                onMouseLeave={() =>
                  setNavigation(`/fixture/${game.fixture.id}`)
                }
              >
                {game?.teams?.home?.name}
              </strong>
            </div>
            <div className="game-team">
              <img src={game?.teams?.away?.logo} className="img" />
              <strong
                style={{ fontWeight: "normal", width: "fit-content" }}
                onClick={() => navigate(navigation)}
                onMouseEnter={() =>
                  setNavigation(`/teams/${game?.teams?.away?.id}`)
                }
                onMouseLeave={() =>
                  setNavigation(`/fixture/${game.fixture.id}`)
                }
              >
                {game?.teams?.away?.name}
              </strong>
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
          {game?.fixture?.status?.elapsed != null &&
            game?.fixture?.status?.elapsed < 90 && (
              <div className="live-game">
                <small
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {game?.fixture?.status?.elapsed + "'"}
                </small>
                <div
                  id="div"
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "red",
                    width: "10px",
                    height: "10px",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default Fixture;

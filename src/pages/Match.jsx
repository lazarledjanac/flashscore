import React, { useState, useEffect } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { DateTime } from "luxon";
import { useGetFixtureByIdQuery } from "../services/footballApi";
import { useParams, useNavigate } from "react-router-dom";
import { MatchDetails, Odds, HeadToHead, Table } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addNewFavoriteTeam, removeFromFavoriteTeams } from "../services/Redux";

const Match = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favoriteTeams } = useSelector((store) => store.redux);

  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  const played = match?.fixture?.status?.elapsed > 0;
  const halfTime = match?.score?.halftime;
  const extraTime = played && match?.score?.extratime?.home != null;
  const penalties = played && match?.score?.penalty.home != null;
  const date = DateTime.fromISO(match?.fixture?.date);

  let homeNameColor = !match?.teams?.home?.winner ? "gray" : "black";
  let awayNameColor = !match?.teams?.away?.winner ? "gray" : "black";

  const homeId = match?.teams?.home?.id;
  const awayId = match?.teams?.away?.id;

  const isFavoriteHome = favoriteTeams.includes(parseInt(homeId));
  const isFavoriteAway = favoriteTeams.includes(parseInt(awayId));

  const [display, setDisplay] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  const Standings = () => {
    const tableYear = DateTime.fromISO(match?.fixture?.date).year;
    const endOfTheSeason = DateTime.fromISO(`${tableYear}-07-01`);
    let season = endOfTheSeason > date ? tableYear - 1 : tableYear;
    return (
      <div className="match-standings-container">
        <Table
          emphasize={homeId}
          emphasizeGuest={awayId}
          season={season}
          leagueId={match?.league?.id}
        />
      </div>
    );
  };
  return (
    <>
      <div className="match-league-name">
        <center>
          {match?.league?.country} <img src={match?.league?.flag} /> :{" "}
          {match?.league?.name} - {match?.league?.round} round:{" "}
        </center>
      </div>
      <hr style={{ width: "30%" }} />
      <center>
        <i>
          {match?.fixture?.venue?.name}, {match?.fixture?.venue?.city}
        </i>
      </center>
      <div className="match-teams-container">
        {!isFavoriteHome && (
          <h3>
            <BsStar
              onClick={() => {
                dispatch(addNewFavoriteTeam(parseInt(homeId)));
              }}
            />
          </h3>
        )}
        {isFavoriteHome && (
          <h3>
            <BsStarFill
              onClick={() => {
                dispatch(removeFromFavoriteTeams(parseInt(homeId)));
              }}
            />
          </h3>
        )}
        <div
          className="match-team"
          onClick={() => {
            navigate(`/fixture/${id}/teams/${match?.teams?.home?.id}`);
          }}
        >
          <img src={match?.teams?.home?.logo} alt="" className="match_img" />
          <h2 style={{ color: homeNameColor }}>{match?.teams?.home?.name}</h2>
        </div>
        <center>
          {DateTime.fromISO(match?.fixture?.date).toFormat("dd LLL y T")}
          <h4>
            {match?.goals?.home} {played ? "-" : "vs"} {match?.goals?.away}
          </h4>
          {played && (
            <>
              HT: {halfTime?.home} - {halfTime?.away}
            </>
          )}
          <br />
          {extraTime && (
            <text>
              Extra Time: {match?.score?.extratime?.home} -{" "}
              {match?.score?.extratime?.away}
            </text>
          )}
          <br />
          {penalties && (
            <text>
              Penalties: {match?.score?.penalties?.home} -{" "}
              {match?.score?.penalties?.away}
            </text>
          )}
        </center>
        <div
          className="match-team"
          onClick={() => {
            navigate(`/fixture/${id}/teams/${match?.teams?.away?.id}`);
          }}
        >
          <img src={match?.teams?.away?.logo} alt="" className="match_img" />
          <h2 style={{ textAlign: "center", color: awayNameColor }}>
            {match?.teams?.away?.name}
          </h2>
        </div>
        {!isFavoriteAway && (
          <h3>
            <BsStar
              onClick={(e) => {
                e.preventDefault();
                dispatch(addNewFavoriteTeam(parseInt(awayId)));
              }}
            />
          </h3>
        )}
        {isFavoriteAway && (
          <h3>
            <BsStarFill
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeFromFavoriteTeams(parseInt(awayId)));
              }}
            />
          </h3>
        )}
      </div>
      <hr style={{ width: "50vw" }} />
      <div className="details">
        {played && (
          <button
            className={display === "match" ? "active" : null}
            onClick={() => {
              setDisplay("match");
            }}
          >
            Match
          </button>
        )}
        <button
          className={display === "odds" ? "active" : null}
          onClick={() => {
            setDisplay("odds");
          }}
        >
          Odds
        </button>
        <button
          className={display === "h2h" ? "active" : null}
          onClick={() => {
            setDisplay("h2h");
          }}
        >
          H2H
        </button>
        <button
          className={display === "standings" ? "active" : null}
          onClick={() => {
            setDisplay("standings");
          }}
        >
          Standings
        </button>
      </div>
      <hr style={{ width: "50vw" }} />
      {display === "match" && <MatchDetails id={id} />}
      {display === "odds" && (
        <Odds
          id={id}
          homeGoals={match?.goals?.home}
          awayGoals={match?.goals?.away}
        />
      )}
      {display === "h2h" && (
        <HeadToHead
          id={id}
          homeId={homeId}
          awayId={awayId}
          onClick={() => setDisplay("match")}
        />
      )}
      {display === "standings" && <Standings />}
      <br />
      <br />
    </>
  );
};

export default Match;

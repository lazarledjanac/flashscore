import React, { useState, useEffect } from "react";
import { BsStar } from "react-icons/bs";
import { DateTime } from "luxon";
import { useGetFixtureByIdQuery } from "../services/footballApi";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MatchDetails, Odds, HeadToHead, Table } from "../components";

const Match = () => {
  let { id } = useParams();
  let navigate = useNavigate();

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
  console.log(match);

  const [display, setDisplay] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  });
  const Standings = () => {
    const tableYear = DateTime.fromISO(match?.fixture?.date).year;
    const endOfTheSeason = DateTime.fromISO(`${tableYear}-07-01`);
    let season = endOfTheSeason > date ? tableYear - 1 : tableYear;
    return (
      <div style={{ width: "50vw", margin: "auto" }}>
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
    <div>
      <div style={{ display: "-webkit-inline-flex" }}>
        <h1
          style={{ marginLeft: "2vw" }}
          onClick={() => {
            navigate(`/fixture/${id}`);
          }}
        >
          <IoIosArrowBack />
        </h1>
        <h1 style={{ marginLeft: "25vw" }}>
          {match?.league?.country}{" "}
          <img src={match?.league?.flag} width="40px" height="40px" /> :{" "}
          {match?.league?.name}
          <img src={match?.league?.logo} width="40px" height="40px" />-{" "}
          {match?.league?.round}:{" "}
        </h1>
      </div>
      <hr style={{ width: "30vw" }} />
      <center>
        {match?.fixture?.venue?.name}, {match?.fixture?.venue?.city}
      </center>
      <div className="match-container">
        <BsStar style={{ paddingTop: "35px" }} />
        <div
          className="match-team"
          onClick={() => {
            navigate(`/fixture/${id}/teams/${match?.teams?.home?.id}`);
          }}
        >
          <img src={match?.teams?.home?.logo} alt="" className="match_img" />
          <h2 style={{ textAlign: "center", color: homeNameColor }}>
            {match?.teams?.home?.name}
          </h2>
        </div>
        <div style={{ textAlign: "center", display: "inline" }}>
          {DateTime.fromISO(match?.fixture?.date).toFormat("dd LLL y T")}
          <h4 style={{ fontSize: "3em", margin: "2vw" }}>
            {match?.goals?.home} {played ? "-" : "vs"} {match?.goals?.away}
          </h4>
          {played && (
            <text>
              HT: {halfTime?.home} - {halfTime?.away}
            </text>
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
        </div>
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
        <BsStar style={{ paddingTop: "35px" }} />
      </div>
      <hr style={{ marginTop: "10vh", width: "50vw" }} />
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
      {display === "odds" && <Odds id={id} />}
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
    </div>
  );
};

export default Match;

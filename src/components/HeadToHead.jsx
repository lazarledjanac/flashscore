import React from "react";
import { useGetHeadToHeadFixturesQuery } from "../services/footballApi";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const HeadToHead = ({ id, homeId, awayId, onClick }) => {
  const navigate = useNavigate();
  const matches = useGetHeadToHeadFixturesQuery({ homeId, awayId })?.data
    ?.response;
  console.log(matches);

  let games = [];
  for (let i = 0; i < matches?.length; i++) {
    games[i] = i;
  }

  return games.map((game) => (
    <div
      className="h2h-container"
      style={
        id == matches[game]?.fixture?.id
          ? { backgroundColor: "lightgray" }
          : null
      }
    >
      <div
        onClick={() => {
          navigate(`/fixture/${matches[game]?.fixture?.id}`);
          onClick();
        }}
      >
        {DateTime.fromISO(matches[game]?.fixture?.date).toFormat("dd-LL-y")}
      </div>
      <div
        className="h2h-league-name"
        onClick={() => {
          navigate(`/fixture/${matches[game]?.fixture?.id}`);
          onClick();
        }}
      >
        <img
          src={matches[game]?.league?.logo}
          width="20px"
          height="30px"
          alt=""
        />
        <i>{matches[game]?.league?.name}</i>
      </div>
      <div>
        <div
          id="h2h-team-home"
          onClick={() => navigate(`/teams/${matches[game]?.teams?.home?.id}`)}
          style={
            matches[game]?.teams?.home?.winner ? { fontWeight: "bold" } : null
          }
        >
          {matches[game]?.teams?.home?.name}
        </div>
        <div
          id="h2h-team-away"
          onClick={() => navigate(`/teams/${matches[game]?.teams?.away?.id}`)}
          style={
            matches[game]?.teams?.away?.winner ? { fontWeight: "bold" } : null
          }
        >
          {matches[game]?.teams?.away?.name}
        </div>
      </div>
      <div
        style={{ marginRight: "2vw" }}
        onClick={() => {
          navigate(`/fixture/${matches[game]?.fixture?.id}`);
          onClick();
        }}
      >
        <div style={{ paddingBottom: ".4vh" }}>
          {matches[game]?.goals?.home}
        </div>
        <div style={{ paddingTop: ".4vh" }}>{matches[game]?.goals?.away}</div>
      </div>
    </div>
  ));
};

export default HeadToHead;

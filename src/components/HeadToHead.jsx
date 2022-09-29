import React from "react";
import { useGetHeadToHeadFixturesQuery } from "../services/footballApi";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const HeadToHead = ({ id, homeId, awayId, onClick }) => {
  let navigate = useNavigate();
  const matches = useGetHeadToHeadFixturesQuery({ homeId, awayId })?.data
    ?.response;
  console.log(useGetHeadToHeadFixturesQuery(homeId + "-" + awayId));

  let games = [];
  for (let i = 0; i < matches?.length; i++) {
    games[i] = i;
  }

  return games.map((game) => (
    <div
      className="h2h"
      onClick={() => {
        navigate(`/fixture/${matches[game]?.fixture?.id}`);
        onClick();
      }}
      style={
        id == matches[game]?.fixture?.id
          ? { backgroundColor: "lightgray" }
          : null
      }
    >
      <div>
        {DateTime.fromISO(matches[game]?.fixture?.date).toFormat("dd-LL-y")}
      </div>
      <div style={{ width: "20vw" }}>
        <img
          src={matches[game]?.league?.logo}
          width="20px"
          height="30px"
          alt=""
        />
        {matches[game]?.league?.name}
      </div>
      <div style={{ flex: 1 }}>
        <div>{matches[game]?.teams?.home?.name}</div>
        <div>{matches[game]?.teams?.away?.name}</div>
      </div>
      <div style={{ marginRight: "2vw" }}>
        <div>{matches[game]?.goals?.home}</div>
        <div>{matches[game]?.goals?.away}</div>
      </div>
    </div>
  ));
};

export default HeadToHead;

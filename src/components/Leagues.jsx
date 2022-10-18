import React from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { useGetLeagueByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";

import "../index.scss";

const leagues = [39, 78, 140, 61, 135, 88];

const League = ({ leagueId }) => {
  const navigate = useNavigate();
  const league = useGetLeagueByIdQuery(leagueId)?.data?.response[0]?.league;
  return (
    <div
      key={leagueId}
      style={{ padding: "1vh" }}
      onClick={() => {
        navigate(`/standings/${leagueId}`);
      }}
    >
      <img
        src={league?.logo}
        alt=""
        width="25px"
        height="25px"
        style={{ marginRight: "1vw" }}
      />
      <text>{league?.name}</text>
    </div>
  );
};

const Leagues = () => {
  return (
    <div className="leagues">
      <p>
        <AiFillStar />
        My Leagues
      </p>
      <hr />
      {leagues.map((league) => (
        <League leagueId={league} />
      ))}
      <hr />
      <center>
        <AiOutlinePlus /> Add New League
      </center>
    </div>
  );
};

export default Leagues;

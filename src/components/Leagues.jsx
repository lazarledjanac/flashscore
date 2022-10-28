import React from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { useGetLeagueByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../index.scss";

const League = ({ leagueId }) => {
  const navigate = useNavigate();

  const league = useGetLeagueByIdQuery(leagueId)?.data?.response[0]?.league;
  return (
    <div
      key={leagueId}
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
  const dispatch = useDispatch();
  const { favoriteLeagues } = useSelector((store) => store.redux);
  return (
    <div className="leagues">
      <p>
        <AiFillStar />
        My Leagues
      </p>
      <hr />
      {favoriteLeagues.map((league) => (
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

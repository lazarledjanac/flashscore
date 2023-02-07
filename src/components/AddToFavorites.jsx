import React, { useState, useRef } from "react";
import { BsXLg } from "react-icons/bs";
import {
  useGetTeamBySearchTermQuery,
  useGetLeagueBySearchTermQuery,
} from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { Loader, StarLeague, StarTeam } from ".";
import { AiOutlineSearch } from "react-icons/ai";

const AddToFavorites = ({ close, type }) => {
  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const termRef = useRef();

  const LeagueSearchResults = () => {
    const { data: results, isFetching } = useGetLeagueBySearchTermQuery(term);
    console.log(results);
    if (term.length < 3) return;
    if (isFetching) return <Loader />;
    if (!results?.response) return <p>No results for "{term}"</p>;
    return results?.response.map((res) => (
      <>
        <div className="search-item">
          <img src={res?.league?.logo} alt="" />
          <div
            onClick={() => {
              navigate(`/standings/${res?.league?.id}`);
              close();
            }}
          >
            <b style={{ color: "black" }}> {res?.league?.name}</b>
            <b style={{ fontSize: "small" }}>{res?.country?.name}</b>
          </div>
          <h2>
            <StarLeague leagueId={res?.league?.id} />
          </h2>
        </div>
        <hr width="80%" />
      </>
    ));
  };
  const TeamSearchResults = () => {
    const { data: results, isFetching } = useGetTeamBySearchTermQuery(term);

    if (term.length < 3) return;
    if (isFetching) return <Loader />;
    if (!results?.response) return <p>No results for "{term}"</p>;
    return results?.response.map((res) => (
      <>
        <div className="search-item">
          <img src={res?.team?.logo} alt="" />
          <div
            onClick={() => {
              navigate(`/teams/${res?.team?.id}`);
              close();
            }}
          >
            <b style={{ color: "black" }}>{res?.team?.name}</b>
            <b style={{ fontSize: "small" }}>{res?.team?.country}</b>
          </div>
          <h2>
            <StarTeam teamId={res?.team?.id} />
          </h2>
        </div>
        <hr width="80%" />
      </>
    ));
  };
  return (
    <div className="search-box">
      <div>
        <b>
          Add New {type == "league" && "League"}
          {type == "team" && "Team"} to Favorites
        </b>
        <strong>
          <BsXLg onClick={() => close()} />
        </strong>
      </div>
      <hr width="100%" />
      <div id="search-bar">
        <input
          type="text"
          placeholder="Type your search here..."
          ref={termRef}
        />
        <button onClick={() => setTerm(termRef.current.value)}>
          <AiOutlineSearch />
        </button>
        <hr />
      </div>
      {type == "league" && <LeagueSearchResults />}
      {type == "team" && <TeamSearchResults />}
    </div>
  );
};

export default AddToFavorites;

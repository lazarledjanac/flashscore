import React, { useState, useRef, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
  useGetTeamBySearchTermQuery,
  useGetCoachBySearchTermQuery,
  useGetLeagueBySearchTermQuery,
} from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { Loader, StarLeague, StarTeam } from ".";

const SearchBox = ({ close }) => {
  const navigate = useNavigate();

  const [type, setType] = useState("teams");
  const [term, setTerm] = useState("");
  const termRef = useRef();

  useEffect(() => {
    termRef.current.value = "";
    document.getElementById("termRef").innerHTML = "";
    setTerm("");
  }, [type]);

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
  const CompetitionSearchResults = () => {
    const { data: results, isFetching } = useGetLeagueBySearchTermQuery(term);

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
  const CoachSearchResults = () => {
    let results = useGetCoachBySearchTermQuery(term);
    console.log(results);
    if (term.length < 3) return;
    if (!results?.data?.response) return <p>No results for "{term}"</p>;
    return results?.data?.response.map((res) => (
      <>
        <div
          className="search-item"
          onClick={() => {
            navigate(`/coach/${res?.id}`);
            close();
          }}
          id="coach"
        >
          <img src={res?.photo} alt="" />
          <div>
            <b style={{ color: "black" }}>
              {res?.firstname}
              &nbsp;
              {res?.lastname}
            </b>
            <b style={{ fontSize: "small" }}>{res?.team?.name}</b>
          </div>
          <img src={res?.team?.logo} alt="" />
        </div>
      </>
    ));
  };
  console.log(type);
  return (
    <div className="search-box">
      <div>
        <b>Search</b>
        <strong>
          <BsXLg onClick={() => close()} />
        </strong>
      </div>
      <hr width="100%" />
      <div id="search-bar">
        <select onChange={(e) => setType(e.target.value)}>
          <option value="teams">Teams</option>
          <option value="competitions">Competitions</option>
          <option value="coaches">Coaches</option>
        </select>
        <input
          id="termRef"
          type="text"
          placeholder="Type your search here..."
          ref={termRef}
        />
        <button onClick={() => setTerm(termRef.current.value)}>
          <AiOutlineSearch />
        </button>
      </div>
      {term.length < 3 && <p>Please type at least 3 characters.</p>}
      {type === "teams" && <TeamSearchResults />}
      {type === "competitions" && <CompetitionSearchResults />}
      {type === "coaches" && <CoachSearchResults />}
    </div>
  );
};

export default SearchBox;

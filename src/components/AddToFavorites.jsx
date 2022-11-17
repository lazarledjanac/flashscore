import React,{useState,useEffect,useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BsXLg, BsStar, BsStarFill } from "react-icons/bs";
import {
  addNewFavoriteTeam,
  removeFromFavoriteTeams,
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
} from "../services/Redux";
import {
  useGetTeamBySearchTermQuery,
  useGetLeagueBySearchTermQuery,
} from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { AiOutlineSearch } from "react-icons/ai";
import {CompetitionSearchResults} from "../components/SearchBox"

const AddToFavorites = ({close,type}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { favoriteLeagues } = useSelector((store) => store.redux);
    const { favoriteTeams } = useSelector((store) => store.redux);

    const [term, setTerm] = useState("");
    const termRef = useRef();

  const LeagueSearchResults = () => {
      const { data: results, isFetching }= useGetLeagueBySearchTermQuery(term);
    console.log(results);
    if (term.length < 3) return;
    if (isFetching) return <Loader />;
    if (!results?.response) return <p>No results for "{term}"</p>;
    return results?.response.map((res) => (
      <>
        <div
          className="search-item"
        >
          <img src={res?.league?.logo} alt="" />
          <div 
          onClick={() => {
            navigate(`/standings/${res?.league?.id}`);
            close();
          }}>
            <b style={{ color: "black" }}> {res?.league?.name}</b>
            <b style={{ fontSize: "small" }}>{res?.country?.name}</b>
          </div>
          <h2>
            {!favoriteLeagues.includes(parseInt(res?.league?.id)) && (
              <BsStar
                onClick={() => {
                  dispatch(addNewFavoriteLeague(parseInt(res?.league?.id)));
                }}
              />
            )}
            {favoriteLeagues.includes(parseInt(res?.league?.id)) && (
              <BsStarFill
                onClick={() => {
                  dispatch(
                    removeFromFavoriteLeagues(parseInt(res?.league?.id))
                  );
                }}
              />
            )}
          </h2>
        </div>
        <hr width="80%" />
      </>
    ));
  }
  const TeamSearchResults = () => {
    const { data: results, isFetching } = useGetTeamBySearchTermQuery(term);
  
    if (term.length < 3) return;
    if (isFetching) return <Loader />;
    if (!results?.response) return <p>No results for "{term}"</p>;
    return results?.response.map((res) => (
      <>
        <div
          className="search-item"
          
        >
          <img src={res?.team?.logo} alt="" />
          <div onClick={() => {
            navigate(`/teams/${res?.team?.id}`);
            close();
          }}>
            <b style={{ color: "black" }}>{res?.team?.name}</b>
            <b style={{ fontSize: "small" }}>{res?.team?.country}</b>
          </div>
          <h2>
            {!favoriteTeams.includes(parseInt(res?.team?.id)) && (
              <BsStar
                onClick={() => {
                  dispatch(addNewFavoriteTeam(parseInt(res?.team?.id)));
                }}
              />
            )}
            {favoriteTeams.includes(parseInt(res?.team?.id))  && (
              <BsStarFill
                onClick={() => {
                  dispatch(removeFromFavoriteTeams(parseInt(res?.team?.id)));
                }}
              />
            )}
          </h2>
        </div>
        <hr width="80%" />
      </>
    ));
  };
  return (
     <div className="search-box">
      <div>
        <b>Add New {type=="league"&&"League"}{type=="team"&&"Team"}  to Favorites</b>
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
      {type=="league"&&<LeagueSearchResults/>}
      {type=="team"&&<TeamSearchResults/>}
    </div>
  )
}

export default AddToFavorites
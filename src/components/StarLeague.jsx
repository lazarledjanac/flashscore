import React, { useEffect } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
} from "../services/Redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const StarLeague = ({ leagueId }) => {
  const dispatch = useDispatch();
  const { loggedIn, favoriteLeagues, loggedUser, favoriteTeams } = useSelector(
    (store) => store.redux
  );
  const { id, username, password } = loggedUser;

  useEffect(() => {
    if (loggedIn) {
      let request = new XMLHttpRequest();
      request.open(
        "PUT",
        "https://flashscore-b65db-default-rtdb.europe-west1.firebasedatabase.app/" +
          `users/${id}.json`,
        true
      );
      request.send(
        JSON.stringify({
          username,
          password,
          favoriteLeagues,
          favoriteTeams,
        })
      );
    }
  }, [favoriteLeagues]);

  return (
    <>
      {!favoriteLeagues.includes(parseInt(leagueId)) && (
        <>
          <BsStar
            onClick={() => {
              dispatch(addNewFavoriteLeague(parseInt(leagueId)));
            }}
            id="add"
          />
          <Tooltip anchorId="add" content="Add to Favorites!" place="right" />
        </>
      )}
      {favoriteLeagues.includes(parseInt(leagueId)) && (
        <>
          <BsStarFill
            onClick={() => {
              dispatch(removeFromFavoriteLeagues(parseInt(leagueId)));
            }}
            id="remove"
          />
          <Tooltip
            anchorId="remove"
            content="Remove from Favorites!"
            place="right"
          />
        </>
      )}
    </>
  );
};

export default StarLeague;

import { useEffect } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { addNewFavoriteTeam, removeFromFavoriteTeams } from "../services/Redux";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const StarTeam = ({ teamId }) => {
  const dispatch = useDispatch();
  const { loggedIn, favoriteLeagues, loggedUser, favoriteTeams } = useSelector(
    (store) => store.redux
  );
  const { username, password, id } = loggedUser;

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
  }, [favoriteTeams]);

  return (
    <>
      {!favoriteTeams.includes(parseInt(teamId)) && (
        <>
          <BsStar
            onClick={() => {
              dispatch(addNewFavoriteTeam(parseInt(teamId)));
            }}
            id="add"
          />
          <Tooltip anchorId="add" content="Add to Favorites!" place="right" />
        </>
      )}
      {favoriteTeams.includes(parseInt(teamId)) && (
        <>
          <BsStarFill
            onClick={() => {
              dispatch(removeFromFavoriteTeams(parseInt(teamId)));
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

export default StarTeam;

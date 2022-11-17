import React, { useRef } from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useGetTeamByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { AddToFavorites, Modal } from "../components";

const Teams = () => {
  const { favoriteTeams } = useSelector((store) => store.redux);
  const addNewLeagueRef = useRef();

  const closeAddLeagueModal = () => {
    addNewLeagueRef.current.close();
  };
  const openAddLeagueModal = () => {
    addNewLeagueRef.current.openModal();
  };

  const Team = ({ teamId }) => {
    const navigate = useNavigate();
    const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;
    console.log(team);
    return (
      <div
        key={teamId}
        onClick={() => {
          navigate(`/teams/${teamId}`);
        }}
      >
        <img
          src={team?.logo}
          alt=""
          width="25px"
          height="25px"
          style={{ marginRight: "1vw" }}
        />
        <text>{team?.name}</text>
      </div>
    );
  };

  return (
    <div className="leagues">
      <p>
        <AiFillStar /> My Teams
      </p>
      <hr />
      {favoriteTeams.length === 0 && (
        <i style={{ color: "gray", marginLeft: "2vw" }}>No Favorite Teams</i>
      )}
      {favoriteTeams.map((team) => (
        <Team teamId={team} />
      ))}
      <hr />
      <center onClick={openAddLeagueModal}>
        <AiOutlinePlus /> Add New Team
      </center>
      <Modal ref={addNewLeagueRef}>
        <AddToFavorites close={closeAddLeagueModal} type="team" />
      </Modal>
    </div>
  );
};

export default Teams;

import React, { useRef } from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { useGetLeagueByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddToFavorites, Modal } from "../components";

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
      <img src={league?.logo} alt="" className="league-logo" />
      <text>{league?.name}</text>
    </div>
  );
};

const Leagues = () => {
  const { favoriteLeagues } = useSelector((store) => store.redux);
  const addNewLeagueRef = useRef();

  const closeAddLeagueModal = () => {
    addNewLeagueRef.current.close();
  };
  const openAddLeagueModal = () => {
    addNewLeagueRef.current.openModal();
  };
  return (
    <div className="leagues">
      <h3 id="my-leagues">
        <AiFillStar />
        My Leagues
      </h3>
      <hr />
      {favoriteLeagues.map((league) => (
        <League leagueId={league} />
      ))}
      <hr />
      <i onClick={openAddLeagueModal}>
        <AiOutlinePlus /> Add New League
      </i>
      <Modal ref={addNewLeagueRef}>
        <AddToFavorites close={closeAddLeagueModal} type="league" />
      </Modal>
    </div>
  );
};

export default Leagues;

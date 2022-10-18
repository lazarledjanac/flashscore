import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCoachByIdQuery,
  useGetCountryQuery,
} from "../services/footballApi";
import { Achievements } from "../components";

const Coach = () => {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const coach = useGetCoachByIdQuery(coachId).data?.response[0];
  const flag = useGetCountryQuery(coach?.nationality)?.data?.response[0]?.flag;
  console.log(coach);

  const Career = () => {
    return (
      <table className="coach-table">
        <tr>
          <th style={{ paddingLeft: "5vw" }}>Club</th>
          <th>From:</th>
          <th>To:</th>
        </tr>
        {coach?.career.map((club) => (
          <tr>
            <td
              onClick={() => navigate(`/teams/${club?.team?.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={club?.team?.logo} alt="" width="40px" height="40px" />
              &nbsp;&nbsp;
              <b>{club?.team?.name}</b>
            </td>
            <td>{club?.start}</td>
            <td>{club.end || "now"}</td>
          </tr>
        ))}
      </table>
    );
  };

  return (
    <center>
      <div className="player-container">
        <div className="player">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="photo">
              <img src={coach?.photo} alt="" width="100px" height="100px" />
            </div>
            <div>
              <b id="name">{coach?.firstname}</b>{" "}
              <b id="name">{coach?.lastname}</b>{" "}
              <img src={flag} alt="" width="30px" height="20px" />
              <p>
                Age: {coach?.age} ({coach?.birth?.date})
              </p>
            </div>
          </div>
        </div>
        <div
          className="player-team"
          onClick={() => navigate(`/teams/${coach?.team?.id}`)}
        >
          <img src={coach?.team?.logo} alt="" />
        </div>
      </div>
      <div className="player-container" style={{ flexDirection: "column" }}>
        <b>Career</b>
        <hr />
        <Career />
        <hr width="80%" />
        <b>Achievements</b>
        <br />
        <Achievements coachId={coachId} />
      </div>
    </center>
  );
};

export default Coach;

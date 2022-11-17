import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPlayerByIdQuery,
  useGetCountryQuery,
  useGetTransfersByPlayerIdQuery,
} from "../services/footballApi";
import { PlayerStats, Loader, Achievements } from "../components";

const Player = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const player = useGetPlayerByIdQuery(playerId)?.data?.response[0].player;
  const statistics = useGetPlayerByIdQuery(playerId)?.data;
  const flag = useGetCountryQuery(player?.nationality)?.data?.response[0]?.flag;
  console.log(player);
  console.log(statistics);
  let buttons = [];
  for (let i = 0; i < statistics?.response[0]?.statistics?.length; i++)
    buttons[i] = i;

  const [activeButton, setActiveButton] = useState(0);
  const [display, setDisplay] = useState("statistics");

  const Statistics = () => {
    return (
      <div className="player-statistics">
        <b>2022/2023 Statistics</b>
        <hr width="90%" />
        <div id="player-leagues">
          {buttons.map(
            (button) =>
              statistics?.response[0]?.statistics[button]?.league?.logo && (
                <div
                  style={{ display: "flex" }}
                  onClick={() => setActiveButton(button)}
                  className={activeButton === button ? "active" : null}
                >
                  <img
                    src={
                      statistics?.response[0]?.statistics[button]?.league?.logo
                    }
                    alt=""
                    width="80px"
                    height="80px"
                  />
                </div>
              )
          )}
        </div>
        <hr width="90%" />
        <PlayerStats id={playerId} competition={activeButton} />
      </div>
    );
  };
  const Transfers = () => {
    const { data: transfers, isFetching } =
      useGetTransfersByPlayerIdQuery(playerId);
    console.log(transfers);

    let array = [];
    for (let i = 0; i < transfers?.response[0]?.transfers?.length; i++)
      array[i] = i;

    const Row = ({ i }) => {
      return (
        <tr>
          <td>{transfers?.response[0]?.transfers[i]?.date}</td>
          <td
            onClick={() => {
              navigate(
                `/teams/${transfers?.response[0]?.transfers[i]?.teams?.out?.id}`
              );
            }}
            id="transfer-club"
          >
            <img
              src={transfers?.response[0]?.transfers[i]?.teams?.out?.logo}
              alt=""
              width="20px"
              height="20px"
            />
            {transfers?.response[0]?.transfers[i]?.teams?.out?.name}
          </td>
          <td>{transfers?.response[0]?.transfers[i]?.type}</td>
          <td
            onClick={() => {
              navigate(
                `/teams/${transfers?.response[0]?.transfers[i]?.teams?.in?.id}`
              );
            }}
            id="transfer-club"
          >
            <img
              src={transfers?.response[0]?.transfers[i]?.teams?.in?.logo}
              alt=""
              width="20px"
              height="20px"
            />
            {transfers?.response[0]?.transfers[i]?.teams?.in?.name}
          </td>
        </tr>
      );
    };
    if (isFetching) return <Loader />;
    return (
      <div className="player-statistics">
        {!transfers?.response?.length && <h3>This player had no transfers.</h3>}
        <table style={{ marginLeft: "2vw" }}>
          <tr style={{ textAlign: "left" }}>
            <th>Date</th>
            <th>From</th>
            <th>Type</th>
            <th>To</th>
          </tr>
          {array.map((i) => (
            <Row i={i} />
          ))}
        </table>
      </div>
    );
  };
  return (
    <center>
      <div className="player-container">
        <div className="player">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="photo">
              <img src={player?.photo} alt="" width="100px" height="100px" />
            </div>
            <div>
              <b id="name">{player?.name}</b>{" "}
              <img src={flag} alt="" width="30px" height="20px" />
              <p>
                Position:{" "}
                {statistics?.response[0]?.statistics[0]?.games?.position}
              </p>
              <p style={{ marginLeft: "30px" }}>
                Age: {player?.age} ({player?.birth?.date})
              </p>
            </div>
          </div>
        </div>
        <div
          className="player-team"
          onClick={() =>
            navigate(
              `/teams/${statistics?.response[0]?.statistics[0].team?.id}`
            )
          }
        >
          <img
            src={statistics?.response[0]?.statistics[0]?.team?.logo}
            alt=""
          />
        </div>
      </div>
      <div className="details" style={{ margin: "2vh 0 " }}>
        <button
          className={display === "statistics" ? "active" : null}
          onClick={() => setDisplay("statistics")}
        >
          Statistics
        </button>
        <button
          className={display === "transfers" ? "active" : null}
          onClick={() => setDisplay("transfers")}
        >
          Transfers
        </button>
        <button
          className={display === "achievements" ? "active" : null}
          onClick={() => setDisplay("achievements")}
        >
          Achievements
        </button>
      </div>
      {display === "statistics" && <Statistics />}
      {display === "transfers" && <Transfers />}
      {display === "achievements" && (
        <div className="player-statistics">
          <Achievements playerId={playerId} />
        </div>
      )}
    </center>
  );
};

export default Player;

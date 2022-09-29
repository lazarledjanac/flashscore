import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPlayerByIdQuery,
  useGetCountryQuery,
} from "../services/footballApi";

const Player = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const player = useGetPlayerByIdQuery(playerId)?.data?.response[0].player;
  const statistics = useGetPlayerByIdQuery(playerId)?.data;
  const flag = useGetCountryQuery(player?.nationality)?.data?.response[0]?.flag;
  const friendlyMatchLogo =
    "data:image/png;base64,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";
  console.log(player);
  console.log(statistics);
  let buttons = [];
  for (let i = 0; i < statistics?.response[0]?.statistics?.length; i++)
    buttons[i] = i;

  const PlayerStats = ({ competition }) => {
    const attacker =
      statistics?.response[0]?.statistics[competition]?.games?.position ===
      "Attacker";
    if (attacker)
      return (
        <div className="player-stats-container">
          <div>
            Appearances:{" "}
            {
              statistics?.response[0]?.statistics[competition]?.games
                ?.appearences
            }
          </div>

          <div>
            Average rating:{" "}
            {parseInt(
              statistics?.response[0]?.statistics[competition]?.games?.rating
            )}
          </div>
          <div>
            Total minutes played:{" "}
            {statistics?.response[0]?.statistics[competition]?.games?.minutes}
          </div>

          <div>
            Goals:{" "}
            {statistics?.response[0]?.statistics[competition]?.goals?.total}
          </div>
          <div>
            Shots on goal / total:{" "}
            {statistics?.response[0]?.statistics[competition]?.shots?.on}/
            {statistics?.response[0]?.statistics[competition]?.shots?.total}
          </div>
          <div>
            Successful dribbles:{" "}
            {
              statistics?.response[0]?.statistics[competition]?.dribbles
                ?.success
            }
          </div>
          <div>
            Assists:{" "}
            {statistics?.response[0]?.statistics[competition]?.goals?.assists ||
              0}
          </div>
          <div>
            Penalties scored/missed:{" "}
            {statistics?.response[0]?.statistics[competition]?.penalty?.scored}/
            {statistics?.response[0]?.statistics[competition]?.penalty?.missed}
          </div>
        </div>
      );
  };

  const [activeButton, setActiveButton] = useState(0);
  return (
    <center>
      <div className="player-container">
        <div className="player">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="photo">
              <img src={player?.photo} alt="" width="100px" height="100px" />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <b id="name">{player?.name}</b>{" "}
              <img src={flag} alt="" width="30px" height="20px" />
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
      <div className="player-statistics">
        <b>2022/2023 Statistics</b>
        <hr width="90%" />
        <div id="player-leagues">
          {buttons.map((button) => (
            <div
              style={{ display: "flex" }}
              onClick={() => setActiveButton(button)}
              className={activeButton === button ? "active" : null}
            >
              <img
                src={
                  statistics?.response[0]?.statistics[button]?.league?.logo ||
                  friendlyMatchLogo
                }
                alt=""
                width="80px"
                height="80px"
              />
            </div>
          ))}
        </div>
        <hr width="90%" />
        <PlayerStats competition={activeButton} />
      </div>
    </center>
  );
};

export default Player;

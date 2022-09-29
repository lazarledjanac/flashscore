import React from "react";
import { useGetPlayerByIdQuery } from "../services/footballApi";
const PlayerStats = ({ id, competition }) => {
  const statistics = useGetPlayerByIdQuery(id)?.data;

  const attacker =
    statistics?.response[0]?.statistics[competition]?.games?.position ===
    "Attacker";
  const midfielder =
    statistics?.response[0]?.statistics[competition]?.games?.position ===
    "Midfielder";
  const defender =
    statistics?.response[0]?.statistics[competition]?.games?.position ===
    "Defender";
  const goalkeeper =
    statistics?.response[0]?.statistics[competition]?.games?.position ===
    "Goalkeeper";
  if (attacker)
    return (
      <div className="player-stats-container">
        <div>
          Appearances:{" "}
          {statistics?.response[0]?.statistics[competition]?.games
            ?.appearences || 0}
        </div>
        <div>
          Average rating:{" "}
          {parseFloat(
            statistics?.response[0]?.statistics[competition]?.games?.rating
          ).toPrecision(1) || "None"}
        </div>
        <div>
          Total minutes played:{" "}
          {statistics?.response[0]?.statistics[competition]?.games?.minutes}
        </div>
        <div>
          Goals:{" "}
          {statistics?.response[0]?.statistics[competition]?.goals?.total || 0}
        </div>
        {statistics?.response[0]?.statistics[competition]?.shots?.on && (
          <div>
            Shots on goal:{" "}
            {statistics?.response[0]?.statistics[competition]?.shots?.on || 0}/
            {statistics?.response[0]?.statistics[competition]?.shots?.total ||
              0}
          </div>
        )}
        {statistics?.response[0]?.statistics[competition]?.dribbles
          ?.attempts && (
          <div>
            Successful dribbles:{" "}
            {statistics?.response[0]?.statistics[competition]?.dribbles
              ?.success || 0}
          </div>
        )}
        <div>
          Assists:{" "}
          {statistics?.response[0]?.statistics[competition]?.goals?.assists ||
            0}
        </div>
        <div>
          Penalties scored:{" "}
          {statistics?.response[0]?.statistics[competition]?.penalty?.scored ||
            0}
          /
          {statistics?.response[0]?.statistics[competition]?.penalty?.missed +
            statistics?.response[0]?.statistics[competition]?.penalty?.scored}
        </div>
      </div>
    );
  if (midfielder)
    return (
      <div className="player-stats-container">
        <div>
          Appearances:{" "}
          {statistics?.response[0]?.statistics[competition]?.games
            ?.appearences || 0}
        </div>
        <div>
          Average rating:{" "}
          {parseFloat(
            statistics?.response[0]?.statistics[competition]?.games?.rating
          ).toPrecision(1) || "None"}
        </div>
        <div>
          Total minutes played:{" "}
          {statistics?.response[0]?.statistics[competition]?.games?.minutes}
        </div>
        <div>
          Goals:{" "}
          {statistics?.response[0]?.statistics[competition]?.goals?.total || 0}
        </div>
        <div>
          Duels: {statistics?.response[0]?.statistics[competition]?.duels?.won}/
          {statistics?.response[0]?.statistics[competition]?.duels?.total}
        </div>
        <div>
          Pass accuracy:{" "}
          {statistics?.response[0]?.statistics[competition]?.passes?.accuracy}%
        </div>
        {statistics?.response[0]?.statistics[competition]?.dribbles
          ?.attempts && (
          <div>
            Successful dribbles:{" "}
            {statistics?.response[0]?.statistics[competition]?.dribbles
              ?.success || 0}
          </div>
        )}
        <div>
          Assists:{" "}
          {statistics?.response[0]?.statistics[competition]?.goals?.assists ||
            0}
        </div>
      </div>
    );
  if (defender)
    return (
      <div className="player-stats-container">
        <div>
          Appearances:{" "}
          {statistics?.response[0]?.statistics[competition]?.games?.appearences}
        </div>
        <div>
          Average rating:{" "}
          {parseFloat(
            statistics?.response[0]?.statistics[competition]?.games?.rating
          ).toPrecision(1) || "None"}
        </div>
        <div>
          Total minutes played:{" "}
          {statistics?.response[0]?.statistics[competition]?.games?.minutes}
        </div>
        <div>
          Tackles:{" "}
          {statistics?.response[0]?.statistics[competition]?.tackles?.total}
        </div>
        <div>
          Blocks:{" "}
          {statistics?.response[0]?.statistics[competition]?.tackles?.blocks}
        </div>
        <div>
          Interceptions:{" "}
          {
            statistics?.response[0]?.statistics[competition]?.tackles
              ?.interceptions
          }
        </div>
        <div>
          Duels: {statistics?.response[0]?.statistics[competition]?.duels?.won}/
          {statistics?.response[0]?.statistics[competition]?.duels?.total}
        </div>
        <div>
          Pass accuracy:{" "}
          {statistics?.response[0]?.statistics[competition]?.passes?.accuracy}%
        </div>
      </div>
    );
  if (goalkeeper)
    return (
      <div className="player-stats-container">
        <div>
          Appearances:{" "}
          {statistics?.response[0]?.statistics[competition]?.games
            ?.appearences || 0}
        </div>
        <div>
          Average rating:{" "}
          {parseFloat(
            statistics?.response[0]?.statistics[competition]?.games?.rating
          ).toPrecision(1) || "None"}
        </div>
        <div>
          Total minutes played:{" "}
          {statistics?.response[0]?.statistics[competition]?.games?.minutes}
        </div>
        <div>
          Penalty saves:{" "}
          {statistics?.response[0]?.statistics[competition]?.penalty?.saved ||
            0}
        </div>
        <div>
          Total saves:{" "}
          {statistics?.response[0]?.statistics[competition]?.goals?.saves || 0}
        </div>
      </div>
    );
};

export default PlayerStats;

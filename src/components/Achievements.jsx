import React from "react";
import {
  useGetTrophiesByCoachIdQuery,
  useGetTrophiesByPlayerIdQuery,
} from "../services/footballApi";

const Achievements = ({ coachId, playerId }) => {
  const coachAchievements =
    useGetTrophiesByCoachIdQuery(coachId)?.data?.response;
  const playerAchievements =
    useGetTrophiesByPlayerIdQuery(playerId)?.data?.response;
  let achievements = coachId ? coachAchievements : playerAchievements;
  console.log(achievements);
  return (
    <table className="coach-table">
      <tr>
        <th>Competition</th>
        <th>Season</th>
        <th>Place</th>
      </tr>
      {achievements?.map((achievement) => (
        <tr>
          <td>{achievement?.league}</td>
          <td>{achievement?.season}</td>
          <td>{achievement?.place === "Winner" ? "Champion" : "Runner-up"}</td>
        </tr>
      ))}
    </table>
  );
};

export default Achievements;

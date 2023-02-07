import React from "react";
import { useGetTopScorersByLeagueIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";

const TopScorers = ({ leagueId }) => {
  const navigate = useNavigate();
  const { data: topscorers, isFetching } =
    useGetTopScorersByLeagueIdQuery(leagueId);
  console.log(topscorers);

  const Row = ({ topscorer, rank }) => {
    return (
      <tr>
        <td>{rank + 1}</td>
        <td onClick={() => navigate(`/player/${topscorer?.player?.id}`)}>
          {topscorer?.player?.name}
        </td>
        <td
          onClick={() =>
            navigate(`/teams/${topscorer?.statistics[0]?.team?.id}`)
          }
        >
          {topscorer?.statistics[0]?.team?.name}
        </td>
        <td>{topscorer?.statistics[0]?.goals?.total}</td>
        <td>{topscorer?.statistics[0]?.goals?.assists || 0}</td>
      </tr>
    );
  };
  if (isFetching) return <Loader />;
  return (
    <div className="topscorers">
      <table>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Team</th>
          <th>Goals</th>
          <th>Assists</th>
        </tr>
        {topscorers?.response?.map((topscorer, index) => (
          <Row topscorer={topscorer} rank={index} />
        ))}
      </table>
    </div>
  );
};

export default TopScorers;

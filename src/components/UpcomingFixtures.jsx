import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetNextFixturesByTeamIdQuery,
  useGetTeamByIdQuery,
} from "../services/footballApi";
import { DateTime } from "luxon";

const UpcomingFixtures = ({ teamId, leagueId, next }) => {
  let navigate = useNavigate();
  const match = useGetNextFixturesByTeamIdQuery({ teamId, next })?.data
    ?.response.length;

  const UpcomingFixture = ({ fixture }) => {
    const match = useGetNextFixturesByTeamIdQuery({ teamId, next })?.data
      ?.response[fixture];
    const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;
    const isHome = match?.teams?.home?.name === team?.name;
    const bold = { fontWeight: "bold" };

    let navigation = leagueId
      ? `/standings/${leagueId}/teams/${teamId}/fixture/${match?.fixture?.id}`
      : `/teams/${teamId}/fixture/${match?.fixture?.id}`;

    return (
      <div className="lastFixtures" onClick={() => navigate(navigation)}>
        <div>
          {DateTime.fromISO(match?.fixture?.date).toFormat("dd-LL-y T")}
        </div>
        <div id="league">
          <img src={match?.league?.logo} width="30px" height="30px" alt="" />
          <b>{match?.league?.name}</b>
        </div>
        <div style={{ marginRight: "5%", flex: 3 }}>
          <div style={isHome ? bold : {}}>{match?.teams?.home?.name}</div>
          <div style={!isHome ? bold : {}}>{match?.teams?.away?.name}</div>
        </div>
      </div>
    );
  };
  let matches = [];

  for (let i = 0; i < match; i++) {
    matches[i] = i;
  }
  return matches.map((game) => <UpcomingFixture fixture={game} />);
};

export default UpcomingFixtures;

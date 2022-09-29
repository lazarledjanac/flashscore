import React from "react";
import {
  useGetTeamByIdQuery,
  useGetPreviousFixturesByTeamIdQuery,
} from "../services/footballApi";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const Results = ({ teamId, leagueId, last }) => {
  const navigate = useNavigate();
  const length = useGetPreviousFixturesByTeamIdQuery({ teamId, last })?.data
    ?.response.length;
  console.log(teamId);
  console.log(useGetPreviousFixturesByTeamIdQuery({ last, teamId }));
  const Result = ({ game }) => {
    const match = useGetPreviousFixturesByTeamIdQuery({ teamId, last })?.data
      ?.response[game];
    const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;
    let navigation = leagueId
      ? `/standings/${leagueId}/teams/${teamId}/fixture/${match?.fixture?.id}`
      : `/teams/${teamId}/fixture/${match?.fixture?.id}`;

    const isHome = match?.teams?.home?.name === team?.name;
    const victory = { backgroundColor: "lightgreen" };
    const defeat = { backgroundColor: "rgb(255, 102, 102)" };
    const draw = { backgroundColor: "yellow" };
    const bold = { fontWeight: "bold" };

    let outcome = draw;

    if (isHome && match?.teams?.home?.winner) {
      outcome = victory;
    }
    if (!isHome && match?.teams?.away?.winner) {
      outcome = victory;
    }
    if (isHome && match?.goals?.home < match?.goals?.away) {
      outcome = defeat;
    }
    if (!isHome && match?.goals?.home > match?.goals?.away) {
      outcome = defeat;
    }
    return (
      <div
        className="lastFixtures"
        style={outcome}
        onClick={() => navigate(navigation)}
      >
        <div>{DateTime.fromISO(match?.fixture?.date).toFormat("dd-LL-y")}</div>
        <div style={{ width: "20vw" }}>
          <img src={match?.league?.logo} width="40px" height="40px" alt="" />
          {match?.league?.name}
        </div>
        <div style={{ flex: 2 }}>
          <div style={isHome ? bold : {}}>{match?.teams?.home?.name}</div>
          <div style={!isHome ? bold : {}}>{match?.teams?.away?.name}</div>
        </div>
        <div style={{ marginRight: "2vw" }}>
          <div>{match?.goals?.home}</div>
          <div>{match?.goals?.away}</div>
        </div>
      </div>
    );
  };

  let matches = [];

  for (let i = 0; i < length; i++) {
    matches[i] = i;
  }
  return matches.map((game) => <Result game={game} />);
};

export default Results;

import React, { useState } from "react";
import {
  useGetTeamByIdQuery,
  useGetPreviousFixturesByTeamIdQuery,
} from "../services/footballApi";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const Results = ({ teamId, last }) => {
  const navigate = useNavigate();
  const length = useGetPreviousFixturesByTeamIdQuery({ teamId, last })?.data
    ?.response.length;
  console.log(teamId);
  console.log(useGetPreviousFixturesByTeamIdQuery({ last, teamId }));
  const Result = ({ game }) => {
    const match = useGetPreviousFixturesByTeamIdQuery({ teamId, last })?.data
      ?.response[game];
    const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;

    const [navigation, setNavigation] = useState(
      `/fixture/${match?.fixture?.id}`
    );
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
        <div id="league">
          <img src={match?.league?.logo} width="40px" height="40px" alt="" />
          <b>{match?.league?.name}</b>
        </div>
        <div style={{ flex: 3 }}>
          <div
            style={isHome ? bold : {}}
            onMouseEnter={() =>
              setNavigation(`/teams/${match?.teams?.home?.id}`)
            }
            onMouseLeave={() => setNavigation(`/fixture/${match?.fixture?.id}`)}
            onClick={() => (!isHome ? navigate(navigation) : null)}
          >
            {match?.teams?.home?.name}
          </div>
          <div
            style={!isHome ? bold : {}}
            onMouseEnter={() =>
              setNavigation(`/teams/${match?.teams?.away?.id}`)
            }
            onMouseLeave={() => setNavigation(`/fixture/${match?.fixture?.id}`)}
            onClick={() => (isHome ? navigate(navigation) : null)}
          >
            {match?.teams?.away?.name}
          </div>
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

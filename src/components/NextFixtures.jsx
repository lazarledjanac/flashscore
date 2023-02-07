import React from "react";
import {
  useGetAllRoundsByLeagueIdQuery,
  useGetResultsByRoundAndLeagueIdQuery,
} from "../services/footballApi";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const NextFixtures = ({ leagueId, currentRound }) => {
  const navigate = useNavigate();
  const leagueRounds = useGetAllRoundsByLeagueIdQuery(leagueId)?.data?.results;

  let matchdays = [];
  for (let i = currentRound; i <= leagueRounds; i++) {
    matchdays[i] = i;
  }

  const Fixture = ({ matchday }) => {
    const { data: results, isFetching } = useGetResultsByRoundAndLeagueIdQuery({
      leagueId,
      round: matchday,
    });
    if (isFetching) return <Loader />;
    return (
      <>
        <h1 style={{ marginTop: "2vh", textAlign: "center" }}>
          Matchday {matchday}
        </h1>
        {results?.response.map((res) => (
          <div
            className="standings-results"
            onClick={() =>
              navigate(`/standings/${leagueId}/fixture/${res?.fixture?.id}`)
            }
          >
            <div style={{ flex: 1 }}>
              {DateTime.fromISO(res?.fixture?.date).toFormat("dd-LL-y T")}
            </div>

            <div style={{ flex: 1, textAlign: "left" }}>
              <div>
                <img
                  src={res?.teams?.home?.logo}
                  alt=""
                  height="20px"
                  width="20px"
                />
                {res?.teams?.home?.name}
              </div>
              <div>
                <img
                  src={res?.teams?.away?.logo}
                  alt=""
                  height="20px"
                  width="20px"
                />
                {res?.teams?.away?.name}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  return matchdays.map((matchday) => <Fixture matchday={matchday} />);
};

export default NextFixtures;

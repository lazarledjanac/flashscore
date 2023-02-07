import React from "react";
import {
  useGetResultsByRoundAndLeagueIdQuery,
} from "../services/footballApi";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const LeagueResults = ({ leagueId,currentRound }) => {
  const navigate = useNavigate();

  let matchdays = [];
  for (let i = 1; i < currentRound; i++) {
    matchdays[i] = i;
  }

  const Result = ({ matchday }) => {
    const { data: results, isFetching } = useGetResultsByRoundAndLeagueIdQuery({
      leagueId,
      round: matchday,
    });
    console.log(results);
    if (isFetching) return <Loader />;
    return (
      <>
        {results?.response?.map((res) => (
          <div
            className="standings-results"
            onClick={() =>
              navigate(`/standings/${leagueId}/fixture/${res?.fixture?.id}`)
            }
          >
            <div>
              {DateTime.fromISO(res?.fixture?.date).toFormat("dd-LL-y T")}
            </div>
            <div style={{ flex: 2, marginLeft: "5vw", textAlign: "left" }}>
              <div
                style={res?.teams?.home?.winner ? { fontWeight: "bold" } : {}}
              >
                <img
                  src={res?.teams?.home?.logo}
                  alt=""
                  height="20px"
                  width="20px"
                />
                {res?.teams?.home?.name}
              </div>
              <div
                style={res?.teams?.away?.winner ? { fontWeight: "bold" } : {}}
              >
                <img
                  src={res?.teams?.away?.logo}
                  alt=""
                  height="20px"
                  width="20px"
                />
                {res?.teams?.away?.name}
              </div>
            </div>
            {res?.fixture?.status?.long !== "Match Postponed" && (
              <>
                <div>
                  <div>
                    <b>{res?.goals?.home}</b>
                  </div>
                  <div>
                    <b>{res?.goals?.away}</b>
                  </div>
                </div>
                <div
                  style={{
                    marginRight: "2vw",
                    marginLeft: ".5vw",
                    color: "gray",
                  }}
                >
                  <div>({res?.score?.halftime?.home})</div>
                  <div>({res?.score?.halftime?.away})</div>
                </div>
              </>
            )}
            {res?.fixture?.status?.long === "Match Postponed" && "Postponed"}
          </div>
        ))}
        <strong
          style={{
            textAlign: "center",
            marginTop: "3vh",
            fontSize: "1.6rem",
          }}
        >
          Matchday {matchday}
        </strong>
      </>
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      {matchdays.map((matchday) => (
        <Result matchday={matchday} />
      ))}
    </div>
  );
};

export default LeagueResults;

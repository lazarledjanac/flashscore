import React from "react";
import {
  useGetOddsByFixtureIdQuery,
  useGetFixtureByIdQuery,
} from "../services/footballApi";

const Odds = ({ id, homeGoals, awayGoals }) => {
  const odds =
    useGetOddsByFixtureIdQuery(id)?.data?.response[0]?.bookmakers[0]?.bets;
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  const finished = match?.fixture?.status?.short === "FT";
  const homeWinner = match?.teams?.home?.winner == true;
  const awayWinner = match?.teams?.away?.winner == true;

  console.log(
    useGetOddsByFixtureIdQuery(id)?.data?.response[0]?.bookmakers[0]?.bets
  );
  const MatchWinnerOdds = () => {
    return (
      <center>
        <h3>{odds[0]?.name}</h3>
        <div className="odds" style={{ gridTemplateColumns: "7vw 7vw 7vw " }}>
          <div className={finished && homeWinner ? "odd-active" : "odd"}>
            1 | <b>{odds[0]?.values[0]?.odd}</b>
          </div>
          <div
            className={
              finished && !homeWinner && !awayWinner ? "odd-active" : "odd"
            }
          >
            X | <b>{odds[0]?.values[1]?.odd}</b>
          </div>
          <div className={finished && awayWinner ? "odd-active" : "odd"}>
            2 | <b>{odds[0]?.values[2]?.odd}</b>
          </div>
        </div>
      </center>
    );
  };
  const GoalsOdds = () => {
    return (
      <center>
        <h3>{odds[3]?.name}</h3>
        <div
          className="odds"
          style={{ gridTemplateColumns: "7vw 7vw 7vw 7vw 7vw" }}
        >
          {odds[3]?.values?.map((value) => (
            <div
              className="odd"
              style={{
                height: "5vh",
              }}
            >
              {value?.value}
              <br />
              <b>{value?.odd}</b>
            </div>
          ))}
        </div>
      </center>
    );
  };
  const BothTeamsScore = () => {
    const bothTeamsScored = homeGoals != 0 && awayGoals != 0;
    return (
      <center>
        <h3>Both Teams Score</h3>
        <div className="odds" style={{ gridTemplateColumns: "7vw 7vw " }}>
          <div className={bothTeamsScored ? "odd-active" : "odd"}>
            Yes | {odds[9]?.values[0]?.odd}
          </div>
          <div className={!bothTeamsScored ? "odd-active" : "odd"}>
            No | {odds[9]?.values[1]?.odd}
          </div>
        </div>
      </center>
    );
  };
  if (odds)
    return (
      <>
        <MatchWinnerOdds />
        <GoalsOdds />
        {/* <BothTeamsScore /> */}
      </>
    );
  else {
    return (
      <center>
        <p>Odds are not available for this match</p>
      </center>
    );
  }
};

export default Odds;

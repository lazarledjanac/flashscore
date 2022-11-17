import React from "react";
import {
  useGetOddsByFixtureIdQuery,
  useGetFixtureByIdQuery,
} from "../services/footballApi";

const Odds = ({ id }) => {
  const odds =
    useGetOddsByFixtureIdQuery(id)?.data?.response[0]?.bookmakers[0]?.bets;
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  const finished = match?.fixture?.status?.short === "FT";
  const homeWinner = match?.teams?.home?.winner == true;
  const awayWinner = match?.teams?.away?.winner == true;

  console.log(match);
  const MatchWinnerOdds = () => {
    return (
      <center>
        <h3>{odds[0]?.name}</h3>
        <div className="odds">
          <div className={finished && homeWinner ? "odd-active" : "odd"}>
            1 | {odds[0]?.values[0]?.odd}
          </div>
          <div
            className={
              finished && !homeWinner && !awayWinner ? "odd-active" : "odd"
            }
          >
            X | {odds[0]?.values[1]?.odd}
          </div>
          <div className={finished && awayWinner ? "odd-active" : "odd"}>
            2 | {odds[0]?.values[2]?.odd}
          </div>
        </div>
      </center>
    );
  };
  const GoalsOdds = () => {
    return (
      <center>
        <h3>{odds[3]?.name}</h3>
        <div className="odds">
          {odds[3]?.values?.map((value) => (
            <div className="odd">
              {value?.value} | {value?.odd}
            </div>
          ))}
        </div>
      </center>
    );
  };
  if (odds)
    return (
      <>
        <MatchWinnerOdds />
        <GoalsOdds />
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

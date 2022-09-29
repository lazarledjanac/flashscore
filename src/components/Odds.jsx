import React from "react";
import {
  useGetOddsByFixtureIdQuery,
  useGetFixtureByIdQuery,
} from "../services/footballApi";

const Odds = ({ id }) => {
  const odds =
    useGetOddsByFixtureIdQuery(id)?.data?.response[0]?.bookmakers[0]?.bets[0];
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  const finished = match?.fixture?.status?.short === "FT";
  const homeWinner = match?.teams?.home?.winner == true;
  const awayWinner = match?.teams?.away?.winner == true;

  console.log(odds);
  if (odds?.values.length > 0)
    return (
      <center>
        <h3>{odds?.name}</h3>
        <div className="odds">
          <div className={finished && homeWinner ? "odd-active" : "odd"}>
            1 | {odds?.values[0]?.odd}
          </div>
          <div
            className={
              finished && !homeWinner && !awayWinner ? "odd-active" : "odd"
            }
          >
            X | {odds?.values[1]?.odd}
          </div>
          <div className={finished && awayWinner ? "odd-active" : "odd"}>
            2 | {odds?.values[2]?.odd}
          </div>
        </div>
      </center>
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

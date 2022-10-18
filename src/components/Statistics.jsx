import React from "react";
import { useGetFixtureByIdQuery } from "../services/footballApi";
import { Statistic } from "../components";

const Statistics = ({ id }) => {
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  let show = match?.statistics[0]?.statistics[0]?.length > 0;
  console.log(show);
  let statistics = [];
  for (let i = 0; i < match?.statistics[0]?.statistics?.length; i++)
    statistics[i] = i;
  if (show)
    return (
      <>
        <h1>Statistics</h1>
        {show && (
          <div className="statistics">
            {statistics.map((statistic) => (
              <Statistic
                type={match?.statistics[0]?.statistics[statistic]?.type}
                home={match?.statistics[0]?.statistics[statistic]?.value}
                away={match?.statistics[1]?.statistics[statistic]?.value}
              />
            ))}
          </div>
        )}
      </>
    );
  else {
    return (
      <center>
        <p>Statistics are not available for this match.</p>
      </center>
    );
  }
};

export default Statistics;

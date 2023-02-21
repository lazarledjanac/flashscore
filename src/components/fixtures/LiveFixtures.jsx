import { useState } from "react";
import { useGetLiveFixturesQuery } from "../../services/footballApi";
import { Fixture } from "..";

const LiveFixtures = () => {
  return (
    <div>
      {useGetLiveFixturesQuery()?.data?.response.map((fixture) => (
        <Fixture game={fixture} />
      ))}
    </div>
  );
};

export default LiveFixtures;

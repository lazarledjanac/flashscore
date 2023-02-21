import { useGetUpcomingFixturesQuery } from "../../services/footballApi";
import { Fixture } from "..";

const UpcomingFixtures = ({ date }) => {
  let fixtures = useGetUpcomingFixturesQuery(date.toFormat("y-LL-dd"));
  return (
    <div>
      {fixtures?.data?.response.map((fixture) => (
        <Fixture game={fixture} />
      ))}
    </div>
  );
};

export default UpcomingFixtures;

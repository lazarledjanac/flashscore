import { useGetPreviousFixturesQuery } from "../../services/footballApi";
import { Fixture } from "..";

const FinishedFixtures = ({ date }) => {
  let fixtures = useGetPreviousFixturesQuery(date.toFormat("y-LL-dd"));
  return (
    <div>
      {fixtures?.data?.response.map((fixture) => (
        <Fixture game={fixture} />
      ))}
    </div>
  );
};

export default FinishedFixtures;

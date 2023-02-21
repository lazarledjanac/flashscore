import { useGetFixturesByDateQuery } from "../../services/footballApi";
import { Fixture, Loader } from "..";
import { useSelector } from "react-redux";

const AllFixtures = () => {
  const { date } = useSelector((store) => store.redux);
  const { data: fixtures, isFetching } = useGetFixturesByDateQuery(
    date.toFormat("y-LL-dd")
  );
  if (isFetching) return <Loader />;
  return (
    <div>
      {fixtures?.response.map((fixture) => (
        <Fixture game={fixture} />
      ))}
    </div>
  );
};

export default AllFixtures;

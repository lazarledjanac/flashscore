import { useGetAllCountriesQuery } from "../services/footballApi";
import { Country } from ".";

const Countries = () => {
  const countries = useGetAllCountriesQuery();

  return (
    <div className="leagues">
      <h3 id="my-leagues">Countries</h3>
      <hr />
      {countries?.data?.response.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
};

export default Countries;

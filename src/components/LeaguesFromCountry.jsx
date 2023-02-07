import React from "react";
import { useGetLeagueByCountryNameQuery } from "../services/footballApi";
import { Loader, StarLeague } from ".";
import { useNavigate } from "react-router-dom";

const LeaguesFromCountry = ({ countryName }) => {
  const navigate = useNavigate();
  const leagues = useGetLeagueByCountryNameQuery(countryName);
  console.log(leagues);

  if (leagues?.isFetching) return <Loader />;
  return (
    <div className="countries-leagues" key={countryName}>
      {leagues?.data?.response.map((league) => (
        <div style={{ display: "flex", padding: "0" }}>
          <div
            key={league.league.name}
            onClick={() => {
              if (league?.league.type === "League")
                navigate(`/standings/${league?.league.id}`);
            }}
          >
            {league.league.name}
          </div>
          <strong>
            <StarLeague leagueId={league?.league.id} />
          </strong>
        </div>
      ))}
      <hr width="100%" />
    </div>
  );
};

export default LeaguesFromCountry;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";
import { useGetLeagueByIdQuery } from "../services/footballApi";

const Archive = ({ leagueId, league, changeDisplay, currentSeason }) => {
  const navigate = useNavigate();
  const { data: seasons, isFetching } = useGetLeagueByIdQuery(leagueId);
  console.log(seasons);
  if (isFetching) return <Loader />;
  return (
    <div className="archive">
      {seasons?.response[0]?.seasons?.map((season) => (
        <div
          style={
            currentSeason == season?.year ? { backgroundColor: "white" } : {}
          }
          onClick={() => {
            navigate(`/standings/${leagueId}/${season?.year}`);
            changeDisplay();
          }}
        >
          <img src={league?.logo} alt="" />
          <strong>
            {league?.name} {season?.year}/{season?.year + 1}
          </strong>
        </div>
      ))}
    </div>
  );
};
export default Archive;

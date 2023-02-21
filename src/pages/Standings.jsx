import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  useGetLeagueByCountryNameQuery,
  useGetCurrentRoundByLeagueIdQuery,
  useGetStandingsBySeasonAndLeagueIdQuery,
} from "../services/footballApi";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { Loader, Table, StarLeague } from "../components";

const LeagueResults = lazy(() => import("../components/LeagueResults"));
const NextFixtures = lazy(() => import("../components/NextFixtures"));
const TopScorers = lazy(() => import("../components/TopScorers"));
const Archive = lazy(() => import("../components/Archive"));

const Standings = () => {
  const navigate = useNavigate();
  const { leagueId, archive } = useParams();

  const year = archive ? archive : DateTime.now().year - 1;
  const [season, setSeason] = useState(year);
  const [display, setDisplay] = useState("table");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isFetching = useGetStandingsBySeasonAndLeagueIdQuery({
    season,
    leagueId,
  }).isFetching;

  const league = useGetStandingsBySeasonAndLeagueIdQuery({
    season: parseInt(season),
    leagueId,
  })?.data?.response[0].league;
  const currentRound =
    useGetCurrentRoundByLeagueIdQuery(leagueId)?.data?.response[0]?.slice(-2);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (archive) setSeason(archive);
  }, [archive]);

  const Buttons = () => {
    return (
      <div className="standings-buttons">
        <button
          className="standings-button"
          onClick={() => setDisplay("table")}
        >
          Standings
        </button>
        <button
          className="standings-button"
          onClick={() => setDisplay("results")}
        >
          Results
        </button>
        <button
          className="standings-button"
          onClick={() => setDisplay("fixtures")}
        >
          Fixtures
        </button>
        <button
          className="standings-button"
          onClick={() => setDisplay("topscorers")}
        >
          TopScorers
        </button>
        <button
          className="standings-button"
          onClick={() => setDisplay("archive")}
        >
          Archive
        </button>
      </div>
    );
  };
  const Leagues = () => {
    const { data: leagues, isFetching } = useGetLeagueByCountryNameQuery(
      league?.country
    );
    console.log(leagues);
    if (isFetching) return <Loader />;
    return (
      <div className="national-leagues">
        <section style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={league?.flag}
            alt=""
            width="50px"
            height="30px"
            style={{ marginTop: "2vh" }}
          />
          <h3>{league?.country}</h3>
        </section>
        <hr width="100%" />
        {leagues?.response?.map((res) => (
          <div
            onClick={() => {
              if (res?.league?.type === "League") {
                navigate(`/standings/${res?.league?.id}`);
                // setDisplay("table");
              }
            }}
          >
            {res?.league?.name}
          </div>
        ))}
      </div>
    );
  };
  if (isFetching) return <Loader />;
  return (
    <>
      <div className="standings-container">
        {screenWidth > 450 && <Leagues />}
        <div>
          <div className="standings-league-name">
            <img src={league?.logo} alt="" className="standings-league-logo" />
            <h1>
              {league?.name} {league?.season}/{league?.season + 1}
            </h1>
            <h2>
              <StarLeague leagueId={leagueId} />
            </h2>
          </div>
          <Buttons />
          {display === "table" && <Table season={season} leagueId={leagueId} />}
          {display === "results" && (
            <Suspense>
              <LeagueResults leagueId={leagueId} currentRound={currentRound} />
            </Suspense>
          )}
          {display === "fixtures" && (
            <Suspense>
              <NextFixtures leagueId={leagueId} currentRound={currentRound} />
            </Suspense>
          )}
          {display === "topscorers" && (
            <Suspense>
              <TopScorers leagueId={leagueId} />
            </Suspense>
          )}
          {display === "archive" && (
            <Suspense>
              <Archive
                leagueId={leagueId}
                league={league}
                changeDisplay={() => setDisplay("table")}
                currentSeason={season}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};
export default Standings;

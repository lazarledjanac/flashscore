import React, { useState } from "react";
import {
  useGetLeagueByCountryNameQuery,
  useGetCurrentRoundByLeagueIdQuery,
  useGetResultsByRoundAndLeagueIdQuery,
  useGetAllRoundsByLeagueIdQuery,
  useGetTopScorersByLeagueIdQuery,
  useGetLeagueByIdQuery,
  useGetStandingsBySeasonAndLeagueIdQuery,
} from "../services/footballApi";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { Loader, Table } from "../components";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
} from "../services/Redux";

const Standings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leagueId } = useParams();
  const { favoriteLeagues } = useSelector((store) => store.redux);
  const isFavorite = favoriteLeagues.includes(parseInt(leagueId));
  console.log(isFavorite);

  const year = DateTime.now().year;
  const [season, setSeason] = useState(year);

  const isFetching = useGetStandingsBySeasonAndLeagueIdQuery({
    season,
    leagueId,
  }).isFetching;
  const league = useGetStandingsBySeasonAndLeagueIdQuery({ season, leagueId })
    ?.data?.response[0].league;
  const currentRound =
    useGetCurrentRoundByLeagueIdQuery(leagueId)?.data?.response[0].slice(-2);

  const Leagues = () => {
    const { data: leagues, isFetching } = useGetLeagueByCountryNameQuery(
      league?.country
    );
    console.log(leagues);
    if (isFetching) return <Loader />;
    return (
      <div className="national-leagues">
        <div style={{ display: "flex" }}>
          <img
            src={league?.flag}
            alt=""
            width="50px"
            height="30px"
            style={{ marginTop: "2vh" }}
          />
          <h4>{league?.country}</h4>
        </div>
        <hr width="100%" />
        {leagues?.response?.map((res) => (
          <div
            onClick={() => {
              if (res?.league?.type === "League") {
                navigate(`/standings/${res?.league?.id}`);
                setDisplay("table");
              }
            }}
          >
            {res?.league?.name}
          </div>
        ))}
      </div>
    );
  };
  const Results = () => {
    let matchdays = [];
    for (let i = 1; i < currentRound; i++) {
      matchdays[i] = i;
    }
    console.log(matchdays);
    const Result = ({ matchday }) => {
      const results = useGetResultsByRoundAndLeagueIdQuery({
        leagueId,
        round: matchday,
      })?.data;
      const isFetching = useGetResultsByRoundAndLeagueIdQuery({
        leagueId,
        round: matchday,
      }).isFetching;

      console.log(results);
      if (isFetching) return <Loader />;
      return (
        <>
          {results?.response?.map((res) => (
            <div
              className="standings-results"
              onClick={() =>
                navigate(`/standings/${leagueId}/fixture/${res?.fixture?.id}`)
              }
            >
              <div>
                {DateTime.fromISO(res?.fixture?.date).toFormat("dd-LL-y T")}
              </div>
              <div style={{ flex: 2, marginLeft: "5vw", textAlign: "left" }}>
                <div
                  style={res?.teams?.home?.winner ? { fontWeight: "bold" } : {}}
                >
                  <img
                    src={res?.teams?.home?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {res?.teams?.home?.name}
                </div>
                <div
                  style={res?.teams?.away?.winner ? { fontWeight: "bold" } : {}}
                >
                  <img
                    src={res?.teams?.away?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {res?.teams?.away?.name}
                </div>
              </div>
              {res?.fixture?.status?.long !== "Match Postponed" && (
                <>
                  <div>
                    <div>
                      <b>{res?.goals?.home}</b>
                    </div>
                    <div>
                      <b>{res?.goals?.away}</b>
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: "2vw",
                      marginLeft: ".5vw",
                      color: "gray",
                    }}
                  >
                    <div>({res?.score?.halftime?.home})</div>
                    <div>({res?.score?.halftime?.away})</div>
                  </div>
                </>
              )}
              {res?.fixture?.status?.long === "Match Postponed" && "Postponed"}
            </div>
          ))}
          <strong
            style={{
              textAlign: "center",
              marginTop: "3vh",
              fontSize: "1.6rem",
            }}
          >
            Matchday {matchday}
          </strong>
        </>
      );
    };
    return (
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {matchdays.map((matchday) => (
          <Result matchday={matchday} />
        ))}
      </div>
    );
  };
  const Fixtures = () => {
    const leagueRounds =
      useGetAllRoundsByLeagueIdQuery(leagueId)?.data?.results;
    let matchdays = [];
    for (let i = currentRound; i <= leagueRounds; i++) {
      matchdays[i] = i;
    }
    console.log(currentRound);

    const Fixture = ({ matchday }) => {
      const { data: results, isFetching } =
        useGetResultsByRoundAndLeagueIdQuery({
          leagueId,
          round: matchday,
        });
      if (isFetching) return <Loader />;
      return (
        <>
          <h1 style={{ marginTop: "2vh", textAlign: "center" }}>
            Matchday {matchday}
          </h1>
          {results?.response.map((res) => (
            <div
              className="standings-results"
              onClick={() =>
                navigate(`/standings/${leagueId}/fixture/${res?.fixture?.id}`)
              }
            >
              <div style={{ flex: 1 }}>
                {DateTime.fromISO(res?.fixture?.date).toFormat("dd-LL-y T")}
              </div>

              <div style={{ flex: 1, textAlign: "left" }}>
                <div>
                  <img
                    src={res?.teams?.home?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {res?.teams?.home?.name}
                </div>
                <div>
                  <img
                    src={res?.teams?.away?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {res?.teams?.away?.name}
                </div>
              </div>
            </div>
          ))}
        </>
      );
    };
    return matchdays.map((matchday) => <Fixture matchday={matchday} />);
  };
  const TopScorers = () => {
    const topscorers =
      useGetTopScorersByLeagueIdQuery(leagueId)?.data?.response;
    console.log(topscorers);

    const Row = ({ topscorer, rank }) => {
      return (
        <tr>
          <td>{rank + 1}</td>
          <td onClick={() => navigate(`/player/${topscorer?.player?.id}`)}>
            {topscorer?.player?.name}
          </td>
          <td
            onClick={() =>
              navigate(`/teams/${topscorer?.statistics[0]?.team?.id}`)
            }
          >
            {topscorer?.statistics[0]?.team?.name}
          </td>
          <td>{topscorer?.statistics[0]?.goals?.total}</td>
          <td>{topscorer?.statistics[0]?.goals?.assists || 0}</td>
        </tr>
      );
    };
    return (
      <div className="topscorers">
        <table>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Team</th>
            <th>Goals</th>
            <th>Assists</th>
          </tr>
          {topscorers?.map((topscorer, index) => (
            <Row topscorer={topscorer} rank={index} />
          ))}
        </table>
      </div>
    );
  };
  const Archive = () => {
    const seasons = useGetLeagueByIdQuery(leagueId)?.data?.response[0]?.seasons;
    return (
      <div className="archive">
        {seasons?.map((season) => (
          <div
            onClick={() => {
              setSeason(season?.year);
              setDisplay("table");
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

  const [star, setStar] = useState(isFavorite);
  const [display, setDisplay] = useState("table");

  if (isFetching) return <Loader />;
  return (
    <>
      <div className="standings-container">
        {/* <Leagues /> */}
        <div>
          <div style={{ display: "flex", marginLeft: "7vw", marginTop: "1vh" }}>
            <img src={league?.logo} alt="" width="70px" height="70px" />
            <h1>
              {league?.name} {league?.season}/{league?.season + 1}
            </h1>
            <h2 style={{ margin: "auto" }}>
              {!star && (
                <BsStar
                  onClick={() => {
                    dispatch(addNewFavoriteLeague(parseInt(leagueId)));
                    return setStar(true);
                  }}
                />
              )}
              {star && (
                <BsStarFill
                  onClick={() => {
                    dispatch(removeFromFavoriteLeagues(parseInt(leagueId)));
                    setStar(false);
                  }}
                />
              )}
            </h2>
          </div>
          <div className="standings-buttons">
            <button onClick={() => setDisplay("table")}>Standings</button>
            <button onClick={() => setDisplay("results")}>Results</button>
            <button onClick={() => setDisplay("fixtures")}>Fixtures</button>
            <button onClick={() => setDisplay("topscorers")}>TopScorers</button>
            <button onClick={() => setDisplay("archive")}>Archive</button>
          </div>
          {display === "table" && <Table season={season} leagueId={leagueId} />}
          {display === "results" && <Results />}
          {display === "fixtures" && <Fixtures />}
          {display === "topscorers" && <TopScorers />}
          {display === "archive" && <Archive />}
        </div>
      </div>
    </>
  );
};
export default Standings;

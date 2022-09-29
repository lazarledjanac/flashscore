import React, { useState } from "react";
import {
  useGetStandingsByLeagueIdQuery,
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
import { IoIosArrowBack } from "react-icons/io";
import Loader from "../components/Loader";

const Standings = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();

  const year = DateTime.now().year;
  const [season, setSeason] = useState(year);

  const isFetching = useGetStandingsBySeasonAndLeagueIdQuery({
    season,
    leagueId,
  }).isFetching;
  const league = useGetStandingsBySeasonAndLeagueIdQuery({ season, leagueId })
    ?.data?.response[0].league;
  const standings = useGetStandingsBySeasonAndLeagueIdQuery({
    season,
    leagueId,
  })?.data?.response[0]?.league?.standings[0];
  const currentRound =
    useGetCurrentRoundByLeagueIdQuery(leagueId)?.data?.response[0].slice(-1);

  console.log(league);

  const Row = ({ i }) => {
    let spans = [];
    for (let j = 0; j < standings[i]?.form?.length; j++) {
      spans[j] = (
        <span
          style={
            standings[i]?.form[j] === "W"
              ? { backgroundColor: "lightgreen" }
              : standings[i]?.form[j] === "L"
              ? { backgroundColor: "red" }
              : { backgroundColor: "yellow" }
          }
        >
          {standings[i]?.form[j]}
        </span>
      );
    }
    const form = (
      <td style={{ display: "flex", justifyContent: "center" }}>
        {spans.map((span) => span)}
      </td>
    );
    return (
      <tr>
        <td>{standings[i]?.rank}</td>
        <td
          style={{ textAlign: "left", paddingLeft: "3vw", width: "30%" }}
          onClick={() => {
            navigate(`/standings/${leagueId}/teams/${standings[i]?.team?.id}`);
          }}
        >
          <img
            src={standings[i]?.team?.logo}
            width="20px"
            height="20px"
            alt=""
          />
          {standings[i]?.team?.name}
        </td>
        <td>{standings[i]?.all?.played}</td>
        <td>{standings[i]?.all?.win}</td>
        <td>{standings[i]?.all?.draw}</td>
        <td>{standings[i]?.all?.lose}</td>
        <td>{standings[i]?.all?.goals?.for}</td>
        <td>{standings[i]?.all?.goals?.against}</td>
        <td>{standings[i]?.goalsDiff}</td>
        <td>{standings[i]?.points}</td>
        {form}
      </tr>
    );
  };
  const Leagues = () => {
    const { data: leagues, isFetching } = useGetLeagueByCountryNameQuery(
      league?.country
    );
    console.log(leagues);
    let array = [];
    for (let i = 0; i < leagues?.results; i++) {
      array[i] = i;
    }
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
        {array.map((i) => (
          <div
            onClick={() => {
              if (leagues?.response[i]?.league?.type === "League")
                navigate(`/standings/${leagues?.response[i]?.league?.id}`);
            }}
          >
            {leagues?.response[i]?.league?.name}
          </div>
        ))}
      </div>
    );
  };
  const Table = () => {
    let array = [];
    for (let i = 0; i < standings?.length; i++) array[i] = i;
    return (
      <div className="standings">
        <table>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>PTS</th>
            <th>Form</th>
          </tr>
          {array.map((i) => (
            <Row i={i} />
          ))}
        </table>
      </div>
    );
  };
  const Results = () => {
    let matchdays = [];
    let j = 0;
    for (let i = currentRound - 1; i > 0; i--) {
      matchdays[j] = i;
      j++;
    }

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
      let array = [];
      for (let i = 0; i < results?.results; i++) {
        array[i] = i;
      }
      if (isFetching) return <Loader />;
      return (
        <>
          <h1 style={{ marginLeft: "1vw" }}>Matchday {matchday}</h1>
          {array.map((i) => (
            <div
              className="standings-results"
              onClick={() =>
                navigate(
                  `/standings/${leagueId}/fixture/${results?.response[i]?.fixture?.id}`
                )
              }
            >
              <div>
                {DateTime.fromISO(results?.response[i]?.fixture?.date).toFormat(
                  "dd-LL-y T"
                )}
              </div>
              <div style={{ flex: 2, marginLeft: "5vw", textAlign: "left" }}>
                <div
                  style={
                    results?.response[i]?.teams?.home?.winner
                      ? { fontWeight: "bold" }
                      : {}
                  }
                >
                  <img
                    src={results?.response[i]?.teams?.home?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {results?.response[i]?.teams?.home?.name}
                </div>
                <div
                  style={
                    results?.response[i]?.teams?.away?.winner
                      ? { fontWeight: "bold" }
                      : {}
                  }
                >
                  <img
                    src={results?.response[i]?.teams?.away?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {results?.response[i]?.teams?.away?.name}
                </div>
              </div>
              {results?.response[i]?.fixture?.status?.long !==
                "Match Postponed" && (
                <>
                  <div>
                    <div>
                      <b>{results?.response[i]?.goals?.home}</b>
                    </div>
                    <div>
                      <b>{results?.response[i]?.goals?.away}</b>
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: "2vw",
                      marginLeft: ".5vw",
                      color: "gray",
                    }}
                  >
                    <div>({results?.response[i]?.score?.halftime?.home})</div>
                    <div>({results?.response[i]?.score?.halftime?.away})</div>
                  </div>
                </>
              )}
              {results?.response[i]?.fixture?.status?.long ===
                "Match Postponed" && "Postponed"}
            </div>
          ))}
        </>
      );
    };
    return matchdays.map((matchday) => <Result matchday={matchday} />);
  };
  const Fixtures = () => {
    const leagueRounds =
      useGetAllRoundsByLeagueIdQuery(leagueId)?.data?.results;
    let matchdays = [];
    for (let i = currentRound; i <= leagueRounds; i++) {
      matchdays[i] = i;
    }
    const Fixture = ({ matchday }) => {
      const { data: results, isFetching } =
        useGetResultsByRoundAndLeagueIdQuery({
          leagueId,
          round: matchday,
        });
      let array = [];
      for (let i = 0; i < results?.results; i++) {
        array[i] = i;
      }
      console.log(array);
      if (isFetching) return <Loader />;
      return (
        <>
          <h1 style={{ marginLeft: "1vw" }}>Matchday {matchday}</h1>
          {array.map((i) => (
            <div
              className="standings-results"
              onClick={() =>
                navigate(
                  `/standings/${leagueId}/fixture/${results?.response[i]?.fixture?.id}`
                )
              }
            >
              <div style={{ flex: 1 }}>
                {DateTime.fromISO(results?.response[i]?.fixture?.date).toFormat(
                  "dd-LL-y T"
                )}
              </div>

              <div style={{ flex: 1, textAlign: "left" }}>
                <div>
                  <img
                    src={results?.response[i]?.teams?.home?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {results?.response[i]?.teams?.home?.name}
                </div>
                <div>
                  <img
                    src={results?.response[i]?.teams?.away?.logo}
                    alt=""
                    height="20px"
                    width="20px"
                  />
                  {results?.response[i]?.teams?.away?.name}
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
    let array = [];
    for (let i = 0; i < topscorers?.length; i++) {
      array[i] = i;
    }
    const Row = ({ i }) => {
      return (
        <tr>
          <td>{i + 1}</td>
          <td>{topscorers[i]?.player?.name}</td>
          <td>{topscorers[i]?.statistics[0]?.team?.name}</td>
          <td>{topscorers[i]?.statistics[0]?.goals?.total}</td>
          <td>{topscorers[i]?.statistics[0]?.goals?.assists || 0}</td>
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
          {array.map((i) => (
            <Row i={i} />
          ))}
        </table>
      </div>
    );
  };
  const Archive = () => {
    const seasons = useGetLeagueByIdQuery(leagueId)?.data?.response[0]?.seasons;
    console.log(seasons);

    let array = [];
    let j = 0;
    for (let i = seasons?.length - 1; i >= 0; i--) {
      array[j] = i;
      j++;
    }
    console.log(array);
    return (
      <div className="archive">
        {array.map((i) => (
          <h4
            onClick={() => {
              setSeason(seasons[i]?.year);
              setDisplay("table");
            }}
          >
            <img src={league?.logo} alt="" /> {league?.name} {seasons[i]?.year}/
            {seasons[i]?.year + 1}
          </h4>
        ))}
      </div>
    );
  };

  const [display, setDisplay] = useState("table");

  if (isFetching) return <Loader />;
  return (
    <>
      <div className="standings-container">
        <h1
          style={{ marginLeft: "2vw" }}
          onClick={() => {
            navigate(`/`);
          }}
        >
          <IoIosArrowBack />
        </h1>
        <Leagues />
        <div>
          <div style={{ display: "flex", marginLeft: "15vw" }}>
            <img src={league?.logo} alt="" width="70px" height="70px" />
            <h1>
              {league?.name} {league?.season}/{league?.season + 1}
            </h1>
          </div>
          <div className="standings-buttons">
            <button onClick={() => setDisplay("table")}>Standings</button>
            <button onClick={() => setDisplay("results")}>Results</button>
            <button onClick={() => setDisplay("fixtures")}>Fixtures</button>
            <button onClick={() => setDisplay("topscorers")}>TopScorers</button>
            <button onClick={() => setDisplay("archive")}>Archive</button>
          </div>
          {display === "table" && <Table />}
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

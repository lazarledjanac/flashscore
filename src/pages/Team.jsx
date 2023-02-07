import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  useGetTeamByIdQuery,
  useGetLeagueByTeamIdQuery,
} from "../services/footballApi";
import { StarTeam, Squad } from "../components";
import { DateTime } from "luxon";

const UpcomingFixtures = lazy(() => import("../components/UpcomingFixtures"));
const Table = lazy(() => import("../components/Table"));
const Results = lazy(() => import("../components/Results"));
const Transfers = lazy(() => import("../components/Transfers"));

const Team = () => {
  const { teamId, leagueId } = useParams();

  const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;
  const stadium = useGetTeamByIdQuery(teamId)?.data?.response[0]?.venue;
  const league = useGetLeagueByTeamIdQuery(teamId).data;
  const isNationalTeam = team?.national;

  const year = DateTime.now().year;
  const [season, setSeason] = useState(year);

  const Info = () => {
    return (
      <center>
        {!isNationalTeam && (
          <>
            <h4>Country: {team?.country}</h4>
            <h4>City: {stadium?.city}</h4>
            <h4>Founded: {team?.founded}</h4>
            <h4>Stadium: {stadium?.name}</h4>
            <h4>Stadium capacity: {stadium?.capacity}</h4>
            <hr width="80%" />
          </>
        )}
        <h1>Latest results:</h1>
        <Results teamId={teamId} leagueId={leagueId} last={5} />
        <hr width="80%" />
        <h1>Upcoming Fixtures:</h1>
        <UpcomingFixtures leagueId={leagueId} teamId={teamId} next={5} />
      </center>
    );
  };

  const [content, setContent] = useState("info");

  const Buttons = () => {
    return (
      <div className="team-details">
        <button
          onClick={() => setContent("info")}
          className={content === "info" ? "active" : null}
        >
          Info
        </button>
        <button
          onClick={() => setContent("results")}
          className={content === "results" ? "active" : null}
        >
          Results
        </button>
        <button
          onClick={() => setContent("fixtures")}
          className={content === "fixtures" ? "active" : null}
        >
          Fixtures
        </button>
        <button
          onClick={() => setContent("standings")}
          className={content === "standings" ? "active" : null}
        >
          Standings
        </button>
        {/* <button
          onClick={() => setContent("squad")}
          className={content === "squad" ? "active" : null}
        >
          Squad
        </button> */}
        {!isNationalTeam && (
          <button
            onClick={() => setContent("transfers")}
            className={content === "transfers" ? "active" : null}
          >
            Transfers
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  });
  return (
    <div className="team">
      <div className="team-logo">
        <img src={team?.logo} alt="" />
        <h2 style={{ marginLeft: "1vw", marginTop: "4vh" }}>
          <StarTeam teamId={teamId} />
        </h2>
      </div>
      <h1>{team?.name}</h1>
      <Buttons />
      <hr width="80%" />
      {content === "info" && <Info />}
      {content === "results" && (
        <Suspense>
          <Results teamId={teamId} last={20} />
        </Suspense>
      )}
      {content === "fixtures" && (
        <Suspense>
          <UpcomingFixtures teamId={teamId} next={20} />
        </Suspense>
      )}
      {content === "standings" && (
        <Suspense>
          <Table
            changeState={() => setContent("info")}
            emphasize={teamId}
            season={season}
            leagueId={league?.response[0]?.league?.id}
          />
        </Suspense>
      )}
      {content === "squad" && (
        <Suspense>
          <Squad teamId={teamId} />
        </Suspense>
      )}
      {content === "transfers" && (
        <Suspense>
          <Transfers teamId={teamId} changeState={() => setContent("info")} />
        </Suspense>
      )}
    </div>
  );
};

export default Team;

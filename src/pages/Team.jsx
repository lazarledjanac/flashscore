import React, { useState } from "react";
import { BsStar } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTeamByIdQuery,
  useGetTransfersByTeamIdQuery,
  useGetLeagueByTeamIdQuery,
  useGetSquadByTeamIdQuery,
} from "../services/footballApi";
import { IoIosArrowBack } from "react-icons/io";
import { UpcomingFixtures, Table, Loader, Results } from "../components";
import { DateTime } from "luxon";

const Team = () => {
  const { id, teamId, leagueId } = useParams();
  const navigate = useNavigate();

  let navigation = id
    ? `/fixture/${id}`
    : leagueId
    ? `/standings/${leagueId}`
    : `/`;

  const team = useGetTeamByIdQuery(teamId)?.data?.response[0]?.team;
  const stadium = useGetTeamByIdQuery(teamId)?.data?.response[0]?.venue;
  const league = useGetLeagueByTeamIdQuery(teamId).data;
  console.log(league);

  const year = DateTime.now().year;
  const [season, setSeason] = useState(year);

  const Info = () => {
    return (
      <center>
        <h4>Country: {team?.country}</h4>
        <h4>City: {stadium?.city}</h4>
        <h4>Founded: {team?.founded}</h4>
        <h4>Stadium: {stadium?.name}</h4>
        <h4>Stadium capacity: {stadium?.capacity}</h4>
        <hr width="80%" />
        <h1>Latest results:</h1>
        <Results teamId={teamId} leagueId={leagueId} last={5} />
        <hr width="80%" />
        <h1>Upcoming Fixtures:</h1>
        <UpcomingFixtures leagueId={leagueId} teamId={teamId} next={5} />
      </center>
    );
  };
  const Transfers = () => {
    const { data: transfers, isFetching } =
      useGetTransfersByTeamIdQuery(teamId);
    console.log(transfers);

    let array = [];
    let j = 0;
    for (let i = transfers?.results - 1; i > transfers?.results - 20; i--) {
      array[j] = i;
      j++;
    }
    console.log(array);
    const Row = ({ i }) => {
      return (
        <tr>
          <td>{transfers?.response[i]?.transfers[0]?.date}</td>
          <td
            onClick={() =>
              navigate(`/player/${transfers?.response[i]?.player?.id}`)
            }
          >
            {transfers?.response[i]?.player?.name}
          </td>
          <td
            onClick={() => {
              navigate(
                `/teams/${transfers?.response[i]?.transfers[0]?.teams?.out?.id}`
              );
              setContent("info");
            }}
          >
            <img
              src={transfers?.response[i]?.transfers[0]?.teams?.out?.logo}
              alt=""
              width="20px"
              height="20px"
            />
            {transfers?.response[i]?.transfers[0]?.teams?.out?.name}
          </td>
          <td
            onClick={() => {
              navigate(
                `/teams/${transfers?.response[i]?.transfers[0]?.teams?.in?.id}`
              );
              setContent("info");
            }}
          >
            <img
              src={transfers?.response[i]?.transfers[0]?.teams?.in?.logo}
              alt=""
              width="20px"
              height="20px"
            />
            {transfers?.response[i]?.transfers[0]?.teams?.in?.name}
          </td>
        </tr>
      );
    };
    if (isFetching) return <Loader />;
    return (
      <div className="transfers">
        <table>
          <tr>
            <th>Date</th>
            <th>Player</th>
            <th>From</th>
            <th>To</th>
          </tr>
          {array.map((i) => (
            <Row i={i} />
          ))}
        </table>
      </div>
    );
  };
  const Standings = () => {
    return (
      <Table
        changeState={() => setContent("info")}
        emphasize={teamId}
        season={season}
        leagueId={league?.response[0]?.league?.id}
      />
    );
  };
  const Squad = () => {
    const squad = useGetSquadByTeamIdQuery(teamId)?.data?.response[0]?.players;
    console.log(squad);

    let array = [];
    for (let i = 0; i < squad?.length; i++) array[i] = i;
    return (
      <div className="squad">
        <table>
          <tr>
            <th></th>
            <th>Number</th>
            <th>Name</th>
            <th> Position</th>
          </tr>
          <tr>
            <th></th>
            <th>Number</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
          {array.map((i) => (
            <tr onClick={() => navigate(`/player/${squad[i]?.id}`)}>
              <td>
                <img src={squad[i]?.photo} alt="" />
              </td>
              <td>{squad[i]?.number}</td>
              <td>{squad[i]?.name}</td>
              <td>({squad[i]?.position})</td>
            </tr>
          ))}
        </table>
      </div>
    );
  };
  const [content, setContent] = useState("info");
  return (
    <div style={{ display: "flex" }}>
      <h1
        style={{ marginLeft: "2vw" }}
        onClick={() => {
          navigate(navigation);
        }}
      >
        <IoIosArrowBack />
      </h1>
      <div className="team">
        <div className="team-logo">
          <img src={team?.logo} alt="" width="150vw" height="150vh" />
          <div style={{ marginLeft: "1vw" }}>
            <BsStar />
          </div>
        </div>
        <h1>{team?.name}</h1>
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
          <button
            onClick={() => setContent("squad")}
            className={content === "squad" ? "active" : null}
          >
            Squad
          </button>
          <button
            onClick={() => setContent("transfers")}
            className={content === "transfers" ? "active" : null}
          >
            Transfers
          </button>
        </div>
        <hr width="80%" />
        {content === "info" && <Info />}
        {content === "results" && <Results teamId={teamId} last={20} />}
        {content === "fixtures" && (
          <UpcomingFixtures teamId={teamId} next={20} />
        )}
        {content === "standings" && <Standings />}
        {content === "squad" && <Squad />}
        {content === "transfers" && <Transfers />}
      </div>
    </div>
  );
};

export default Team;

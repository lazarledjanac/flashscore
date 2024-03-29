import React from "react";
import { useGetStandingsBySeasonAndLeagueIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";

const Table = ({
  changeState,
  emphasize,
  emphasizeGuest,
  season,
  leagueId,
}) => {
  const navigate = useNavigate();
  const standings = useGetStandingsBySeasonAndLeagueIdQuery({
    season,
    leagueId,
  })?.data?.response[0]?.league?.standings[0];

  console.log(
    useGetStandingsBySeasonAndLeagueIdQuery({
      season,
      leagueId,
    })
  );
  const Row = ({ res }) => {
    let style;
    const description = res?.description;
    const relegation = description?.substring(0, 10) === "Relegation";
    const UCL =
      description?.substring(0, 28) === "Promotion - Champions League";
    const UEL = description?.substring(0, 25) === "Promotion - Europa League";
    const UECL =
      description?.substring(0, 36) === "Promotion - Europa Conference League";
    if (relegation) {
      style = { backgroundColor: "darkred", color: "white" };
    }
    if (UCL) {
      style = { backgroundColor: "rgb(18, 0, 153)", color: "white" };
    }
    if (UEL) {
      style = { backgroundColor: "rgb(179, 0, 0)", color: "white" };
    } else if (UECL) {
      style = { backgroundColor: "rgb(153, 153, 0)", color: "white" };
    } else if (description?.substring(0, 9) === "Promotion") {
      style = { backgroundColor: "rgb(18, 0, 153)", color: "white" };
    }
    let spans = [];
    for (let i = 0; i < res?.form?.length; i++) {
      spans[i] = (
        <span
          id="span"
          style={
            res?.form[i] === "W"
              ? { backgroundColor: "lightgreen" }
              : res?.form[i] === "L"
              ? { backgroundColor: "red" }
              : { backgroundColor: "yellow" }
          }
        >
          {res?.form[i]}
        </span>
      );
    }
    const form = (
      <td className="standings-form">{spans.map((span) => span)}</td>
    );
    return (
      <tr
        style={
          emphasize == res?.team?.id || emphasizeGuest == res?.team?.id
            ? { backgroundColor: "rgb(204, 224, 255)" }
            : null
        }
        onClick={() => changeState()}
        key={res}
      >
        <td style={style} className="dropdown">
          {res?.rank}
          <div className="dropdown-qualification-content" style={style}>
            {description}
          </div>
        </td>
        <td
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
          onClick={() => {
            navigate(`/teams/${res?.team?.id}`);
          }}
        >
          <div className="dropdown">
            <img src={res?.team?.logo} id="table-team-logo" alt="" />
            <div className="dropdown-content">
              <img src={res?.team?.logo} alt="" width="200px" height="200px" />
            </div>
          </div>
          <div className="standings-team-name">{res?.team?.name}</div>
        </td>
        <td>{res?.all?.played}</td>
        <td>{res?.all?.win}</td>
        <td>{res?.all?.draw}</td>
        <td>{res?.all?.lose}</td>
        <td>{res?.all?.goals?.for}</td>
        <td>{res?.all?.goals?.against}</td>
        <td>{res?.goalsDiff}</td>
        <td>{res?.points}</td>
        {form}
      </tr>
    );
  };
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
        {standings?.map((res) => (
          <Row res={res} />
        ))}
      </table>
    </div>
  );
};

export default Table;

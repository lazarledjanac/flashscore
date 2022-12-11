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
  const Row = ({ res }) => {
    let style;
    const description = res?.description;
    const relegation = description?.substring(0, 10) === "Relegation";
    const UCL =
      description?.substring(0, 28) === "Promotion - Champions League";
    const UEL = description?.substring(0, 25) === "Promotion - Europa League";
    const UECL =
      description?.substring(0, 36) === "Promotion - Europa Conference League";
    if (relegation) style = { backgroundColor: "darkred", color: "white" };
    else if (UCL)
      style = { backgroundColor: "rgb(18, 0, 153)", color: "white" };
    else if (UEL) style = { backgroundColor: "rgb(179, 0, 0)", color: "white" };
    else if (UECL)
      style = { backgroundColor: "rgb(153, 153, 0)", color: "white" };
    else if (description && description.substring(0, 9) === "Promotion") {
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
      >
        <td style={style}>{res?.rank}</td>
        <td
          className="standings-team-name"
          onClick={() => {
            navigate(`/standings/${leagueId}/teams/${res?.team?.id}`);
          }}
        >
          <img src={res?.team?.logo} id="table-team-logo" alt="" />
          {res?.team?.name}
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

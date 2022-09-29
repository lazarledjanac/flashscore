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
  const Row = ({ i }) => {
    const standings = useGetStandingsBySeasonAndLeagueIdQuery({
      season,
      leagueId,
    })?.data?.response[0]?.league?.standings[0];
    console.log(standings[i]?.description);
    const description = standings[i]?.description;
    const relegation =
      description && description.substring(0, 10) === "Relegation";
    const UCL =
      description &&
      description.substring(0, 28) === "Promotion - Champions League";
    console.log(description && description.substring(0, 24));
    const UEL =
      description &&
      description.substring(0, 25) === "Promotion - Europa League";
    const UECL =
      description &&
      description.substring(0, 36) === "Promotion - Europa Conference League";
    console.log(relegation);
    let style;
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
      <tr
        style={
          emphasize == standings[i]?.team?.id ||
          emphasizeGuest == standings[i]?.team?.id
            ? { backgroundColor: "lightblue" }
            : null
        }
        onClick={() => changeState()}
      >
        <td style={style}>{standings[i]?.rank}</td>
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

export default Table;

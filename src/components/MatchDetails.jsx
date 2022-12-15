import React, { useState } from "react";
import { Statistics, MatchSummary, Lineups } from "../components";

const MatchDetails = ({ id }) => {
  const [details, setDetails] = useState(<MatchSummary id={id} />);
  const [active, setActive] = useState("matchSummary");
  return (
    <>
      <center>
        <div className="match-buttons-container">
          <div
            className={
              active === "matchSummary" ? "match-button-active" : "match-button"
            }
            onClick={() => {
              setDetails(<MatchSummary id={id} />);
              setActive("matchSummary");
            }}
          >
            <p>Match Summary</p>
          </div>
          <div
            className={
              active === "statistics" ? "match-button-active" : "match-button"
            }
            onClick={() => {
              setDetails(<Statistics id={id} />);
              setActive("statistics");
            }}
          >
            <p>Statistics</p>
          </div>
          <div
            className={
              active === "lineups" ? "match-button-active" : "match-button"
            }
            onClick={() => {
              setDetails(<Lineups id={id} />);
              setActive("lineups");
            }}
          >
            <p>Lineups</p>
          </div>
        </div>
      </center>
      <hr style={{ width: "30vw" }} />
      <center>{details}</center>
    </>
  );
};

export default MatchDetails;

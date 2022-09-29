import React from "react";

const Statistic = ({ type, home, away }) => {
  let homeWidth;
  let awayWidth;
  if (typeof home == "number") {
    homeWidth = `${(home / (home + away)) * 100}%`;
    awayWidth = `${(away / (home + away)) * 100}%`;
  } else {
    homeWidth = home;
    awayWidth = away;
  }
  if (home == null) {
    home = 0;
  }
  if (away == null) {
    away = 0;
  }
  return (
    <>
      <div
        style={{
          display: "-webkit-inline-flex",
          justifyContent: "center",
        }}
      >
        <h4 style={{ paddingRight: "6vw" }}>{home}</h4>
        <h4>{type}</h4>
        <h4 style={{ paddingLeft: "6vw" }}>{away}</h4>
      </div>
      <center>
        <div style={{ display: "-webkit-inline-flex" }}>
          <div className="home-bar-empty">
            <div
              className="home-bar-filled"
              style={{ width: `${homeWidth}` }}
            ></div>
          </div>
          <div className="away-bar-empty">
            <div
              className="away-bar-filled"
              style={{
                width: `${awayWidth}`,
              }}
            ></div>
          </div>
        </div>
      </center>
      <br />
    </>
  );
};

export default Statistic;

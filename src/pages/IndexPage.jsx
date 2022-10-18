import React from "react";
import "../index.scss";
import { Leagues, Teams, Fixtures } from "../components";

const IndexPage = () => {
  return (
    <div className="container">
      <div>
        <Leagues />
        <br />
        <Teams />
      </div>
      <Fixtures />
    </div>
  );
};

export default IndexPage;

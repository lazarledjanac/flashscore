import React from "react";
import "../index.scss";
import { Leagues, Teams, Fixtures, Countries } from "../components";

const IndexPage = () => {
  return (
    <div className="container">
      <div>
        <Leagues />
        <Teams />
        <Countries />
      </div>
      <Fixtures />
    </div>
  );
};

export default IndexPage;

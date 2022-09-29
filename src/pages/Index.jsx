import React from "react";
import "../index.scss";
import Leagues from "../components/Leagues";
import Teams from "../components/Teams";
import Team from "../pages/Team";
import Fixtures from "../components/Fixtures";
import { useSelector } from "react-redux";

const Index = () => {
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

export default Index;

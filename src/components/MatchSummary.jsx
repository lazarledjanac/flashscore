import React from "react";
import { BiFootball } from "react-icons/bi";
import { TbSwitchHorizontal } from "react-icons/tb";
import { useGetFixtureByIdQuery } from "../services/footballApi";
import { useNavigate } from "react-router-dom";

const MatchSummary = ({ id }) => {
  const navigate = useNavigate();
  const match = useGetFixtureByIdQuery(id)?.data?.response[0];
  let firstHalfHome = match?.score?.halftime?.home;
  let firstHalfAway = match?.score?.halftime?.away;
  let secondHalfHome = match?.score?.fulltime?.home - firstHalfHome;
  let secondHalfAway = match?.score?.fulltime?.away - firstHalfAway;

  const Event = ({ event }) => {
    let className = "event-away";
    if (match?.events[event]?.team?.name == match?.teams?.home?.name) {
      className = "event-home";
    }
    const goal = match?.events[event]?.type === "Goal";
    const assist = match?.events[event]?.assist?.name;
    const yellowCard = match?.events[event]?.detail === "Yellow Card";
    const redCard = match?.events[event]?.detail === "Red Card";
    const cardDescription = match?.events[event]?.comments;
    const substitution = match?.events[event]?.type === "subst";
    const stoppageTime = match?.events[event]?.time.extra;
    if (goal)
      return (
        <div className={className}>
          <b>
            {match?.events[event]?.time.elapsed}'
            {stoppageTime && "+" + stoppageTime + "'"}
          </b>
          &nbsp;
          <BiFootball />
          <b
            onClick={() =>
              navigate(`/player/${match?.events[event]?.player?.id}`)
            }
          >
            &nbsp;
            {match?.events[event]?.player?.name}&nbsp;
          </b>
          <text
            onClick={() =>
              navigate(`/player/${match?.events[event]?.assist?.id}`)
            }
          >
            {assist && "(" + assist + ")"}{" "}
          </text>
        </div>
      );
    if (yellowCard)
      return (
        <div className={className}>
          {match?.events[event]?.time.elapsed}'
          {stoppageTime && "+" + stoppageTime + "'"}{" "}
          <div className="yellowcard"></div>
          <text
            onClick={() =>
              navigate(`/player/${match?.events[event]?.player?.id}`)
            }
          >
            {match?.events[event]?.player?.name}
          </text>
          &nbsp;
          {cardDescription && "(" + cardDescription + ")"}
          &nbsp;
        </div>
      );
    if (redCard)
      return (
        <div className={className}>
          <text>
            {match?.events[event]?.time.elapsed}'
            {stoppageTime && "+" + stoppageTime + "'"}{" "}
          </text>
          <div className="yellowcard" style={{ backgroundColor: "red" }}></div>
          <text
            onClick={() =>
              navigate(`/player/${match?.events[event]?.player?.id}`)
            }
          >
            {match?.events[event]?.player?.name}
          </text>
          &nbsp;
          {cardDescription && "(" + cardDescription + ")"}
          &nbsp;
        </div>
      );
    if (substitution)
      return (
        <div className={className}>
          <text>
            {match?.events[event]?.time.elapsed}'
            {stoppageTime && "+" + stoppageTime + "'"}&nbsp;
          </text>
          {/* <div className="icon" style={{ paddingTop: "0.5vh" }}> */}
          <TbSwitchHorizontal />
          {/* </div> */}
          <text
            onClick={() =>
              navigate(`/player/${match?.events[event]?.assist?.id}`)
            }
          >
            &nbsp;
            {match?.events[event]?.assist?.name}
          </text>
          <text
            onClick={() =>
              navigate(`/player/${match?.events[event]?.player?.id}`)
            }
          >
            &nbsp; ({match?.events[event]?.player?.name})
          </text>
        </div>
      );
  };

  const Events = () => {
    let firstHalfEvents = [];
    let secondHalfEvents = [];
    for (let i = 0; i < match?.events?.length; i++)
      if (match?.events[i]?.time.elapsed <= 45) {
        firstHalfEvents[i] = i;
      } else {
        secondHalfEvents[i] = i;
      }
    return (
      <>
        <div className="match-summary">
          <div style={{ textAlign: "left" }}>1ST HALF</div>
          <div style={{ textAlign: "right" }}>
            {firstHalfHome + " - " + firstHalfAway}
          </div>
        </div>
        {firstHalfEvents.map((event) => (
          <Event event={event} />
        ))}
        <div className="match-summary">
          <div style={{ textAlign: "left" }}>2ND HALF</div>
          <div style={{ textAlign: "right" }}>
            {secondHalfHome + " - " + secondHalfAway}
          </div>
        </div>
        {secondHalfEvents.map((event) => (
          <Event event={event} />
        ))}
      </>
    );
  };

  return (
    <>
      <h1>Match Summary</h1>
      <div className="match-summary-container">
        <Events />
      </div>
    </>
  );
};
export default MatchSummary;

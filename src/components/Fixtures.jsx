import React, { useState, useEffect } from "react";
import "../index.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCalendar3 } from "react-icons/bs";
import Loader from "./Loader";
import {
  useGetFixturesByDateQuery,
  useGetLiveFixturesQuery,
  useGetPreviousFixturesQuery,
  useGetNextFixturesQuery,
} from "../services/footballApi";
import { DateTime } from "luxon";
import Fixture from "./Fixture";

const Fixtures = () => {
  const now = DateTime.now();
  const [date, setDate] = useState(now);

  const { data: fixturesList, isFetching } = useGetFixturesByDateQuery(
    date.toFormat("y-LL-dd")
  );
  const { data: liveFixturesList } = useGetLiveFixturesQuery();
  const { data: finishedFixturesList } = useGetPreviousFixturesQuery();
  const { data: upcomingFixturesList } = useGetNextFixturesQuery();

  const [fixtures, setFixtures] = useState("all");

  useEffect(() => {
    setDate(now);
  }, [fixtures]);

  if (isFetching) return <Loader />;

  return (
    <div className="games">
      <div className="buttons-container">
        <button
          type="button"
          className={fixtures === "all" ? "active" : null}
          onClick={() => {
            setFixtures("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          className={fixtures === "live" ? "active" : null}
          onClick={() => {
            setFixtures("live");
          }}
        >
          Live
        </button>
        <button
          type="button"
          className={fixtures === "finished" ? "active" : null}
          onClick={() => {
            setFixtures("finished");
          }}
        >
          Finished
        </button>
        <button
          type="button"
          className={fixtures === "upcoming" ? "active" : null}
          onClick={() => {
            setFixtures("upcoming");
          }}
        >
          Scheduled
        </button>
        <div className="date">
          <IoIosArrowBack
            className="date-buttons"
            onClick={() => {
              setDate(date.minus({ days: 1 }));
            }}
          />
          <BsCalendar3 className="date-buttons" />
          <h7>{date.toFormat("dd / LL ccc")}</h7>
          <IoIosArrowForward
            className="date-buttons"
            onClick={() => {
              setDate(date.plus({ days: 1 }));
            }}
          />
        </div>
      </div>
      <br />
      {fixtures === "all" &&
        fixturesList?.response.map((fixture) => <Fixture game={fixture} />)}
      {fixtures === "live" &&
        liveFixturesList?.response.map((fixture) => <Fixture game={fixture} />)}
      {fixtures === "finished" &&
        finishedFixturesList?.response.map((fixture) => (
          <Fixture game={fixture} />
        ))}
      {fixtures === "upcoming" &&
        upcomingFixturesList?.response.map((fixture) => (
          <Fixture game={fixture} />
        ))}
    </div>
  );
};

export default Fixtures;

{
  /* <div className="game-league">
  <AiFillStar style={{ color: "orange" }} /> England:Premier League
  <a style={{ float: "right" }}>
    Standings <IoIosArrowUp />
  </a>
</div> */
}

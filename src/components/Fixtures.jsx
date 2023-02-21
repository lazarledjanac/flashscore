import React, { useState, useEffect, lazy, Suspense } from "react";
import "../index.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCalendar3 } from "react-icons/bs";
import { DateTime } from "luxon";
import { Calendar } from ".";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../services/Redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const AllFixtures = lazy(() => import("../components/fixtures/AllFixtures"));
const LiveFixtures = lazy(() => import("../components/fixtures/LiveFixtures"));
const FinishedFixtures = lazy(() =>
  import("../components/fixtures/FinishedFixtures")
);
const UpcomingFixtures = lazy(() =>
  import("../components/fixtures/UpcomingFixtures")
);

const Fixtures = () => {
  const today = DateTime.now();
  const dispatch = useDispatch();
  const { date } = useSelector((store) => store.redux);
  const [fixtures, setFixtures] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const isToday =
    date.c.year == today.c.year &&
    date.c.month == today.c.month &&
    date.c.day == today.c.day;

  useEffect(() => {
    setShowCalendar(false);
  }, [date]);

  return (
    <div className="games">
      <div className="buttons-container">
        <div style={{ position: "relative", flex: 1 }}>
          <div className="date" id="calendar">
            <IoIosArrowBack
              className="date-buttons"
              onClick={() => {
                dispatch(setDate(date.minus({ days: 1 })));
              }}
            />
            <BsCalendar3
              className="date-buttons"
              onClick={() =>
                setShowCalendar((prevState) => {
                  return !prevState;
                })
              }
            />
            <strong
              onClick={() =>
                setShowCalendar((prevState) => {
                  return !prevState;
                })
              }
              style={{ cursor: "pointer" }}
            >
              {date.toFormat("dd / LL ")}
            </strong>
            <IoIosArrowForward
              className="date-buttons"
              onClick={() => {
                dispatch(setDate(date.plus({ days: 1 })));
              }}
            />
          </div>
          <Tooltip
            anchorId="calendar"
            content="Click to open calendar"
            place="top"
          />
          <Calendar date={date} show={showCalendar} />
        </div>
        {isToday && (
          <>
            <button
              className={fixtures === "all" ? "active" : null}
              onClick={() => {
                setFixtures("all");
              }}
            >
              ALL
            </button>
            <button
              className={fixtures === "live" ? "active" : null}
              onClick={() => {
                setFixtures("live");
              }}
            >
              LIVE
            </button>
            <button
              className={fixtures === "finished" ? "active" : null}
              onClick={() => {
                setFixtures("finished");
              }}
            >
              PLAYED
            </button>
            <button
              className={fixtures === "scheduled" ? "active" : null}
              onClick={() => {
                setFixtures("scheduled");
              }}
            >
              SCHEDULED
            </button>
          </>
        )}
      </div>
      <br />

      {fixtures === "all" && (
        <Suspense>
          <AllFixtures />
        </Suspense>
      )}
      {fixtures === "live" && (
        <Suspense>
          <LiveFixtures />
        </Suspense>
      )}
      {fixtures === "finished" && (
        <Suspense>
          <FinishedFixtures date={date} />
        </Suspense>
      )}
      {fixtures === "scheduled" && (
        <Suspense>
          <UpcomingFixtures date={date} />
        </Suspense>
      )}
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

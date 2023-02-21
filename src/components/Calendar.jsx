import React, { useState } from "react";
import { DateTime } from "luxon";
import { CalendarWeek } from ".";
import { useSelector } from "react-redux";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Calendar = ({ show }) => {
  const { date } = useSelector((store) => store.redux);
  const year = date.year;
  const month = date.toFormat("LL");

  const [firstCalendarDay, setFirstCalendarDay] = useState(
    DateTime.fromFormat(
      `${year}-W${DateTime.fromISO(`${year}-${month}`).weekNumber}-1`,
      "kkkk-'W'W-E"
    )
  );

  const calendarMonth = firstCalendarDay.plus({ weeks: 1 }).toFormat("LLLL y");

  const numberOfRows = () => {
    if (firstCalendarDay.toFormat("d LLLL") === "1 February") {
      return 4;
    } else if (
      (firstCalendarDay.plus({ days: 7 }).startOf("months").toFormat("ccc") ===
        "Sat" &&
        firstCalendarDay.plus({ days: 7 }).startOf("months").daysInMonth ==
          31) ||
      firstCalendarDay.plus({ days: 7 }).startOf("months").toFormat("ccc") ===
        "Sun"
    )
      return 6;
    else return 5;
  };
  const renderRows = () => {
    let tableRows = [];
    for (let i = 0; i < numberOfRows(); i++) {
      tableRows.push(
        <CalendarWeek
          date={firstCalendarDay.plus({ weeks: i })}
          calendarMonth={calendarMonth}
        />
      );
    }
    return tableRows;
  };

  const previousMonth = () => {
    if (firstCalendarDay.minus({ weeks: 1 }).daysInMonth === 28)
      setFirstCalendarDay(firstCalendarDay.minus({ weeks: 4 }));
    else if (firstCalendarDay.toFormat("d") == 1)
      setFirstCalendarDay(firstCalendarDay.minus({ weeks: 5 }));
    else if (
      firstCalendarDay.startOf("months").toFormat("ccc") === "Sat" ||
      firstCalendarDay.startOf("months").toFormat("ccc") === "Sun"
    ) {
      setFirstCalendarDay(firstCalendarDay.minus({ weeks: 5 }));
    } else setFirstCalendarDay(firstCalendarDay.minus({ weeks: 4 }));
  };

  const nextMonth = () => {
    if (firstCalendarDay.daysInMonth === 28) {
      setFirstCalendarDay(firstCalendarDay.plus({ weeks: 4 }));
    } else if (
      firstCalendarDay.plus({ weeks: 1 }).endOf("months").toFormat("ccc") ===
      "Sun"
    ) {
      setFirstCalendarDay(firstCalendarDay.plus({ weeks: 5 }));
    } else if (numberOfRows() === 5) {
      setFirstCalendarDay(firstCalendarDay.plus({ weeks: 4 }));
    } else {
      setFirstCalendarDay(firstCalendarDay.plus({ weeks: 5 }));
    }
  };
  return (
    <>
      <div className={show ? "calendar-active" : "calendar"}>
        <div style={{ display: "flex", height: "30px", alignItems: "center" }}>
          <b onClick={previousMonth}>
            <BiLeftArrow />
          </b>
          <strong
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              cursor: "default",
            }}
          >
            {calendarMonth}
          </strong>
          <b onClick={nextMonth}>
            <BiRightArrow />
          </b>
        </div>
        <div className="calendar-weekdays">
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>
          <span>Sunday</span>
        </div>
        {renderRows()}
      </div>
    </>
  );
};

export default Calendar;

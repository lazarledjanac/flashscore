import React from "react";
import { DateTime } from "luxon";
import { CalendarDay } from ".";

export default function CalendarWeek({ date, calendarMonth }) {
  let tableRow = [];
  for (let i = 0; i < 7; i++) {
    tableRow.push(
      <CalendarDay
        day={DateTime.fromISO(date).plus({ days: i })}
        calendarMonth={calendarMonth}
      />
    );
  }
  return (
    <div style={{ display: "flex" }} key={date}>
      {tableRow}
    </div>
  );
}

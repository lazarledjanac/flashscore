import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../services/Redux";

export default function CalendarDay({ day, calendarMonth }) {
  const dispatch = useDispatch();
  const { date } = useSelector((store) => store.redux);
  const isToday =
    date.c.year == day.c.year &&
    date.c.month == day.c.month &&
    date.c.day == day.c.day;
  const isThisMonth = calendarMonth === day.toFormat("LLLL y");
  console.log(isThisMonth);
  return (
    <span
      key={day.toFormat("dd/LL")}
      style={
        isToday
          ? { backgroundColor: "#ccebff" }
          : !isThisMonth
          ? { backgroundColor: "#cccccc", color: "gray" }
          : {}
      }
      onClick={() => (isThisMonth ? dispatch(setDate(day)) : null)}
    >
      {day.toFormat("dd/LL")}
    </span>
  );
}

"use client";
import { calendarEvents } from "@/lib/data";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const BigCalender = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const onViewChange = (newView: View) => {
    setView(newView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={[Views.WORK_WEEK, Views.DAY]} // Use Views constants
      view={view} // Bind to state
      style={{ height: "98%" }}
      onView={onViewChange}
      min={new Date(2025, 0, 1, 8, 0, 0)} // Start time at 8:00 AM
      max={new Date(2025, 0, 1, 17, 0, 0)} // End time at 5:00 PM
    />
  );
};

export default BigCalender;

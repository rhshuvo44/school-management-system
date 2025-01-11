"use client";
import Calendar from "react-calendar";

import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  const route = useRouter();
  useEffect(() => {
    if (value instanceof Date) {
      route.push(`?date=${value.toLocaleDateString("en-US")}`);
    }
  }, [route, value]);
  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalender;

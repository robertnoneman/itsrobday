"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"


export default function RobdayCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div className="bg-slate-950 rounded-md shadow">
    <Calendar
      mode="single"
      selected={date}
      onSelect={(date) => date && setDate(date)}
      className="rounded-md border shadow"
    />
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export function SiteDate() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date()),
    );
  }, []);

  return (
    <span className="brand-date">
      {today || "বাংলাদেশের বাজারদর"}
    </span>
  );
}

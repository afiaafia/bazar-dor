"use client";

import { useSyncExternalStore } from "react";

function subscribeToDateChanges() {
  return () => {};
}

function getToday() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getServerDate() {
  return "";
}

export function SiteDate() {
  const today = useSyncExternalStore(
    subscribeToDateChanges,
    getToday,
    getServerDate,
  );

  return (
    <span className="brand-date">
      {today || "বাংলাদেশের বাজারদর"}
    </span>
  );
}

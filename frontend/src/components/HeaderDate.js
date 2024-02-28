import React, { useEffect, useState } from "react";

export default function HeaderDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const day = currentDate.toLocaleDateString(undefined, { weekday: "long" });
  const monthDate = currentDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
  const year = currentDate.toLocaleDateString(undefined, { year: "numeric" });
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const hours = currentDate.getHours();

  return (
    <div className="col-md-4 text-right d-none d-md-block">
      {hours}:{minutes}:{seconds} {day}, {monthDate}, {year}
    </div>
  );
}

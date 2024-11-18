import React, { useState } from "react";

const DateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

interface LocalDateAndTimeProps {
  timezone: number;
}

const LocalDateAndTime: React.FC<LocalDateAndTimeProps> = ({ timezone }) => {
  const [localDate, setLocalDate] = useState<null | string>("");
  setInterval(() => {
    const localDate = new Date();
    const UTCTime =
      localDate.getTime() +
      localDate.getTimezoneOffset() * 60000 +
      timezone * 1000;
    const UTCDate = new Date(UTCTime).toLocaleDateString("en", DateFormat);
    setLocalDate(UTCDate);
  }, 1000);

  return <p className="localDate">{localDate}</p>;
};

export default LocalDateAndTime;

import React from "react";
import { ForecastItem, HourlyForecastInterface } from "../../types/weather";

interface ForecastProps {
  temp_unit: string;
  timezone: number;
  hourlyForecast: HourlyForecastInterface;
}

interface HourlyWeatherProps {
  key: number;
  date: number;
  timezone: number;
  temp_unit: string;
  hourlyForecast: ForecastItem;
}

const getLocalDate = (date: Date, timezone: number) => {
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  const localDate = utcDate + timezone * 1000;
  return new Date(localDate);
};

const HourlyWeather: React.FC<HourlyWeatherProps> = ({
  hourlyForecast,
  date,
  timezone,
  temp_unit,
}) => {
  const localTime = new Date(hourlyForecast.dt * 1000);
  const currentDate = getLocalDate(localTime, timezone);
  if (date !== currentDate.getDate()) return;
  const time = currentDate.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="hourly-weather-item">
      <p className="time">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
      <p className="description">{hourlyForecast.weather[0].description}</p>
      <p className="temp">
        {hourlyForecast.main.temp}{" "}
        {temp_unit === "c" ? <span> &#8451; </span> : <span> &#8457; </span>}
      </p>
    </div>
  );
};

const Forecast: React.FC<ForecastProps> = ({
  hourlyForecast,
  temp_unit,
  timezone,
}) => {
  const localTime = new Date(hourlyForecast.list[0].dt * 1000);
  const today = getLocalDate(localTime, timezone);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div className="forecast-info center">
      <h2 className="title">
        Forecast for{" "}
        {today.toLocaleString("en", {
          weekday: "long",
        })}
      </h2>
      <div className="hourly-weather-list">
        {hourlyForecast.list.map((item, index) => (
          <HourlyWeather
            hourlyForecast={item}
            key={index}
            date={today.getDate()}
            timezone={timezone}
            temp_unit={temp_unit}
          />
        ))}
      </div>
      <h2 className="title">
        Forecast for{" "}
        {tomorrow.toLocaleString("en", {
          weekday: "long",
        })}
      </h2>
      <div className="hourly-weather-list">
        {hourlyForecast.list.map((item, index) => (
          <HourlyWeather
            hourlyForecast={item}
            key={index}
            date={tomorrow.getDate()}
            timezone={timezone}
            temp_unit={temp_unit}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;

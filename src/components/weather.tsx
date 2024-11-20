import React from "react";
import { LocalDateAndTime, ForeCast } from "./Weather/index";
import "./styles/weather-info.css";

import {
  WeatherInterface,
  Coord,
  Main,
  Clouds,
  Sys,
  Wind,
  HourlyForecastInterface,
} from "../types/weather";

interface WeatherProps {
  currentWeather: {
    coord: Coord;
    weather: WeatherInterface[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
  hourlyForecast: HourlyForecastInterface;
}

const TimeFormat: Intl.DateTimeFormatOptions = {
  minute: "numeric",
  hour: "numeric",
};

const getLocalDate = (localTime: number, timezone: number) => {
  const date = new Date(localTime * 1000);
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  const localDate = utcDate + timezone * 1000;
  return new Date(localDate);
};

const WeatherInfo: React.FC<WeatherProps> = ({
  currentWeather,
  hourlyForecast,
}) => {
  const tempUnit = localStorage.getItem("temp_unit") || "c";

  const sunriseTime = getLocalDate(
    currentWeather.sys.sunrise,
    currentWeather.timezone
  ).toLocaleTimeString("en", TimeFormat);

  const sunsetTime = getLocalDate(
    currentWeather.sys.sunset,
    currentWeather.timezone
  ).toLocaleDateString("en", TimeFormat);

  const lastUpdatedTime = new Date(currentWeather.dt * 1000).toLocaleTimeString(
    "en",
    TimeFormat
  );

  return (
    <div className="weather-info-area">
      <LocalDateAndTime timezone={currentWeather.timezone} />
      <div className="current-weather-info">
        <div className="main-details center">
          <div className="description-box center">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <p>{currentWeather.weather[0].description}</p>
          </div>
          <div className="temperature-box">
            <h1>{currentWeather.main.temp}</h1>
            {tempUnit === "c" ? <span> &#8451; </span> : <span> &#8457; </span>}
          </div>
        </div>
        <hr className="vline" />
        <div className="more-details center">
          <div className="detail">
            Humidity
            <p className="value">{currentWeather.main.humidity + " %"}</p>
          </div>
          <div className="detail">
            Wind Speed
            <p className="value">{currentWeather.wind.speed + " /m/s"}</p>
          </div>
          <div className="detail">
            Pressure
            <p className="value">{currentWeather.main.pressure + " hPa"}</p>
          </div>
          <div className="detail">
            Visibility
            <p className="value">{currentWeather.visibility / 1000 + " km"}</p>
          </div>
          <div className="sunrise-sunset">
            <div className="sunrise-box">
              <p>{sunriseTime}</p>
              <img src="/img/icons/sunrise.png" alt="sunrise" />
            </div>
            <div className="sunset-box">
              <img src="/img/icons/sunset.png" alt="sunset" />
              <p>{sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="hline" />
      <ForeCast
        hourlyForecast={hourlyForecast}
        timezone={currentWeather.timezone}
        temp_unit={tempUnit}
      />
      <p className="last-updated-time">
        Last Updated : <span>{lastUpdatedTime}</span>
      </p>
    </div>
  );
};

export default WeatherInfo;

import React, { useState, useEffect } from "react";
import Header from "./components/header";
import FavArea from "./components/favArea";
import SearchArea from "./components/searchArea";
import Setting from "./components/Setting/setting";
import WeatherInfo from "./components/weather";
import Footer from "./components/footer";
import "./index.css";
import { changeDefaultBg, changeDynamicBg } from "./components/changeBg";
import { toast, Toaster } from "react-hot-toast";

interface PopupState {
  favArea: boolean;
  settingArea: boolean;
}

changeDefaultBg();
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_KEY;
const API_TEMP_UNIT = {
  c: "metric",
  f: "imperial",
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [settings, setSettings] = useState({
    dynamicBg: localStorage.getItem("dynamicBg") || "4",
    defaultBg: localStorage.getItem("defaultBg") || "ON",
    temp_unit: (localStorage.getItem("temp_unit") as "c" | "f") || "c",
  });
  const [popup, setPopup] = useState<PopupState>({
    favArea: false,
    settingArea: false,
  });

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  useEffect(fetchLocation, [lat, long]);

  const search = async (cityName: string) => {
    setIsLoading(true);
    let query = null;
    const tempUnit = API_TEMP_UNIT[settings.temp_unit];

    if (cityName) {
      query = `?q=${cityName}&appid=${API_KEY}&units=${tempUnit}`;
    } else if (lat && long) {
      query = `?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${tempUnit}`;
    } else {
      setIsLoading(false);
      let __confirm = toast.error("Location access has not been granted", {
        position: "top-center",
      });
      if (__confirm) fetchLocation();
      return;
    }

    Promise.all([
      await fetch(`${API_URL}/weather/${query}`).then((resp) => resp.json()),
      await fetch(`${API_URL}/forecast/${query}`).then((resp) => resp.json()),
    ]).then((res) => {
      setIsLoading(false);
      if (res[0].cod !== 200) {
        toast.error("The searched city name does not exist", {
          position: "top-right",
        });
        return;
      }

      let cityNameTitle = res[0].name;
      res[0].sys.country ? (cityNameTitle += ", " + res[0].sys.country) : "";
      changeDynamicBg(res[0]);
      setData({
        currentWeather: res[0],
        hourlyForecast: res[1],
        headerTitle: cityNameTitle,
      });
    });
  };

  const gotoSearchArea = () => {
    changeDefaultBg();
    setData(null);
    setPopup({
      favArea: false,
      settingArea: false,
    });
  };

  const toggleFavArea = () => {
    setPopup({
      favArea: !popup.favArea,
      settingArea: false,
    });
  };

  const toggleSettingArea = () => {
    setPopup({
      favArea: false,
      settingArea: !popup.settingArea,
    });
  };

  const closeArea = () => {
    setPopup({
      favArea: false,
      settingArea: false,
    });
  };

  const changeSettings = (key: string, value: string) => {
    let newSettings = { ...settings, [key]: value };
    localStorage.setItem(key, value);
    setSettings(newSettings);
    if (key === "defaultBg") changeDefaultBg();
  };

  return (
    <>
      <div className="absolute right-0">
        <Toaster
          position="top-left"
          reverseOrder={false}
          toastOptions={{
            error: {
              style: {
                background: "#ffcccc",
                color: "#fe0808",
                fontSize: "0.7rem",
                cursor: "pointer",
              },
            },
            success: {
              style: {
                background: "#d8ffc5",
                color: "#1e5b00",
                fontSize: "0.7rem",
                cursor: "pointer",
              },
            },
          }}
        />
      </div>
      {popup.favArea && !data && (
        <FavArea onSearch={search} onClose={closeArea} />
      )}
      {popup.settingArea && !data && (
        <Setting onClose={closeArea} onChange={changeSettings} />
      )}
      <Header
        title={data ? data.headerTitle : "Weather Watch"}
        onBack={gotoSearchArea}
        onToggleFav={toggleFavArea}
        onToggleSetting={toggleSettingArea}
      />

      {data ? (
        <WeatherInfo
          currentWeather={data.currentWeather}
          hourlyForecast={data.hourlyForecast}
        />
      ) : (
        <SearchArea onSearch={search} isLoading={isLoading} />
      )}
      <Footer />
    </>
  );
};

export default App;

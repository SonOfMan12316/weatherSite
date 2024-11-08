import React, { useState, useEffect } from "react";
import Header from "./components/header";
import FavArea from "./components/favArea";
import SearchArea from "./components/searchArea";
import Setting from "./components/Setting/setting";
import Weather from "./components/weather"
import Footer from "./components/footer";
import "./index.css";
import { changeDefaultBg, changeDynamicBg } from "./components/hooks/useBg";

changeDefaultBg();
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_KEY;
const API_TEMP_UNIT = {
  c: 'metric',
  f: 'imperial',
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null); 
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [settings, setSettings] = useState({
    dynamicBg: localStorage.getItem("dynamicBg") || "4",
    defaultBg: localStorage.getItem("defaultBg") || "ON",
    temp_unit: (localStorage.getItem("temp_unit") as 'c' | 'f') || "c"
  });

  const [popup, setPopup] = useState({
    favArea: false,
    settingArea: false,
  });

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    })
  }

  useEffect(fetchLocation, [lat, long])

  const search = async (cityName: string) => {
    setIsLoading(true);
    let query = null;
    const tempUnit = API_TEMP_UNIT[settings.temp_unit];
    console.log(tempUnit, 'tempUnit')

    if(cityName) {
      query = `?q=${cityName}&appid=${API_KEY}&units=${tempUnit}`;
    } else if (lat && long) {
      query = `?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${tempUnit}`
    } else {
      setIsLoading(false);
      let __confirm = confirm(
        'Location permission is not granted. Would you want to give permission?'
      )
      if(__confirm) fetchLocation();
      return;
    }

    Promise.all([
      await fetch(`${API_URL}/weather/${query}`).then((resp) => resp.json()),
      await fetch(`${API_URL}/forecast/${query}`).then((resp) => resp.json()),
    ]).then((res) => {
      setIsLoading(false);
      if (res[0].cod !== 200) {
        document.documentElement.style.setProperty('--color', `RED`);
        alert('Searched City Name Does Not Exist');
        return;
      }

      let cityNameTitle = res[0].name;
      res[0].sys.country ? (cityNameTitle += ', ' + res[0].sys.country) : '';
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
    setData(null)
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
    let newSettings = { ...settings, [key]: value }
    localStorage.setItem(key, value)
    setSettings(newSettings)
    if(key === 'defaultBg') changeDefaultBg()
  }

  return (
    <>
      {popup.favArea && !data && (
        <FavArea onSearch={search} onClose={closeArea} />
      )}
      {popup.settingArea && !data && (
        <Setting onClose={closeArea} onChange={changeSettings} />
      )}
      <Header
        title={data ? data.headerTitle : "Weather Site"}
        onBack={gotoSearchArea}
        onToggleFav={toggleFavArea}
        onToggleSetting={toggleSettingArea}
      />

      {  
        data ? (
          <Weather 
          />
        ) : (
          <SearchArea onSearch={search} isLoading={isLoading} />
        )
      }
      <Footer/>
    </>
  );
};

export default App;

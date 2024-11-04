import React, { useState } from "react";
import { Location } from "./icons";
import "./styles/searchArea.css";

interface SearchAreaProp {
  onSearch: (cityName: string) => void;
  isLoading: boolean;
}

const SearchArea: React.FC<SearchAreaProp> = ({ onSearch, isLoading }) => {
  const [cityName, setCityName] = useState("");
  const [message, setMessage] = useState("");

  const LoadingSpinner = () => {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  };

  const showError = (msg: string) => {
    setMessage(msg);
    document.documentElement.style.setProperty("--color", `RED`);
  };

  const removeError = () => {
    setMessage("");
    document.documentElement.style.setProperty("--color", `var(--accent)`);
  };

  const searchCity = () => {
    if (cityName.trim() === "") {
      showError("City name is required");
      return;
    }
    removeError();
    onSearch(cityName.trim());
  };

  const searchLocation = () => {
    removeError();
    onSearch("");
  };

  return (
    <div className="flex justify-center">
      <div className="search-area">
      <p className="text">City</p>
      <div className="input-container">
        <input
          type="text"
          name="cityName"
          value={cityName}
          placeholder="Ex: Lekki, Ng"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCityName(e.target.value);
            removeError();
          }}
        />
        <Location
          id="location-icon"
          titleAccess="Current Location"
          className="icon"
          onClick={searchLocation}
        />
      </div>
      <p className="message-text">{message}</p>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button type="button" onClick={searchCity}>
          Search
        </button>
      )}
      <div className="about-area">
        <p className="about-text">
          Get <span>Accurate</span> and <span>Up-to-Date</span> weather
          information with a <span>Beautiful Interface</span> and{" "}
          <span>Dynamic Backgrounds</span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SearchArea;

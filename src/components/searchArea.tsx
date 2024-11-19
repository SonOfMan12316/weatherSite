import React, { useState } from "react";
import { Location } from "./icons";
import "./styles/searchArea.css";

interface SearchAreaProp {
  onSearch: (cityName: string) => void;
  isLoading: boolean;
}

const SearchArea: React.FC<SearchAreaProp> = ({ onSearch, isLoading }) => {
  const [cityName, setCityName] = useState("");

  const LoadingSpinner = () => {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchCity();
    }
  };

  const searchCity = () => {
    onSearch(cityName.trim());
  };

  const searchLocation = () => {
    onSearch("");
  };

  return (
    <div className="search-area">
      <p className="text">City</p>
      <div className="input-container">
        <input
          type="text"
          name="cityName"
          value={cityName}
          placeholder="Casablanca"
          onKeyDown={handleKeyDown}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCityName(e.target.value);
          }}
        />
        <Location
          id="location-icon"
          titleAccess="Current Location"
          className="icon"
          onClick={searchLocation}
        />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button
          type="button"
          onClick={searchCity}
          disabled={!cityName}
          style={{
            opacity: !cityName ? 0.5 : 1,
            cursor: !cityName ? "not-allowed" : "pointer",
          }}
        >
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
  );
};

export default SearchArea;

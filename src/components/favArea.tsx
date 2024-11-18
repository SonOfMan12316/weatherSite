import React from "react";

import useOutsideClick from "../hooks/useOutsideClick";
import { Close } from "./icons";
import "./styles/favArea.css";

interface FavAreaProp {
  onClose: () => void;
  onSearch: (arg0: string) => void;
}

const FavArea: React.FC<FavAreaProp> = ({ onClose, onSearch }) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  favourites.sort();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const cityName = e.currentTarget.innerText;
    onSearch(cityName);
    onClose();
  };

  return (
    <div ref={useOutsideClick(onClose)} className="fav-area popup-area">
      <p className="title">Favourite Cities</p>
      <span className="icon" onClick={handleClick}>
        <Close />
      </span>

      <div className="fav-cities">
        {favourites.length === 0 ? (
          <div className="fav-city">Nothing to show!</div>
        ) : (
          favourites.map((cityName: string) => (
            <div
              key={cityName}
              onClick={() => handleClick}
              className="fav-city"
            >
              {cityName}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavArea;

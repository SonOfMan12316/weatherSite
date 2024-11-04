import React, { useState } from "react";
import { Arrowback, Folder, Settings, Star } from "./icons";

interface HeaderProps {
  title: string;
  onBack: () => void;
  onToggleFav: () => void;
  onToggleSetting: () => void;
}
const ls = localStorage;
const favs: string[] = JSON.parse(ls.getItem("favourites") || "[]");

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onToggleFav,
  onToggleSetting,
}) => {
  const [favourites, setFavourites] = useState(favs);

  const addFavourite = () => {
    const newFavourites = [...favourites, title];
    setFavourites(newFavourites);
    ls.setItem("favorites", JSON.stringify(newFavourites));
  };

  const removeFavourite = () => {
    const newFavourites = [...favourites];
    const index = newFavourites.indexOf(title);
    newFavourites.splice(index, 1);
    setFavourites(newFavourites);
    ls.setItem("favourites", JSON.stringify(newFavourites));
  };

  return (
    <div className="header flex justify-between">
      <div className="flex items-center justify-center">
        {title === "Weather Site" ? (
        <Settings
          titleAccess="Settings"
          className="left-icon icon"
          onClick={onToggleSetting}
        />
      ) : (
        <Arrowback
          titleAccess="Go Back"
          className="left-icon icon"
          onClick={onBack}
        />
      )}
      </div>
      <div>
        <p className="font-medium md:font-bold text-xl md:text-2xl text-center">{title}</p>
      </div>
      <div className="flex items-center justify-center">
        {title === "Weather Site" ? (
        <Folder
          titleAccess="Favourite Cities"
          className="right-icon icon"
          onClick={onToggleFav}
        />
      ) : favourites.some((name) => name === title) ? (
        <Star 
          titleAccess='Remove from favourites' 
          className="right-icon active icon"
          filled={false} onClick={removeFavourite} />
      ) : (
        <Star
          titleAccess="Add to favourite"
          className="right-icon icon"
          filled={true} onClick={addFavourite} />
      )}
      </div>
    </div>
  );
};

export default Header;

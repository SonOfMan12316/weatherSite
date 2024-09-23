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
    <div className="header">
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
      <p className="header-title">{title}</p>
      {title === "Weather Site" ? (
        <Folder
          titleAccess="Favourite Cities"
          className="rigt-icon icon"
          onclick={onToggleFav}
        />
      ) : favourites.some((name) => name === title) ? (
        <Star filled={false} onClick={removeFavourite} />
      ) : (
        <Star filled={true} onClick={addFavourite} />
      )}
    </div>
  );
};

export default Header;

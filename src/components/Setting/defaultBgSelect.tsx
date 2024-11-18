import React, { useState } from "react";

interface BgSelectProp {
  onChange: (type: string, value: string) => void;
}

const DefaultBgSelection: React.FC<BgSelectProp> = ({ onChange }) => {
  const [bgNum, setBgNum] = useState(localStorage.getItem("defaultBg") || "0");
  const ids = ["0", "1", "2", "3", "4", "5"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    localStorage.setItem("defaultBg", value);
    onChange("defaultBg", value);
    setBgNum(value);
  };

  const ThumbnailImage = ({ num }: { num: number }) => {
    const source = `/WeatherWatch/img/default/thumbnail${num}.jpg`;
    return (
      <div className="thumbnail-container">
        <label htmlFor={`thumbnail${num}`}>
          <img src={source} alt="Thumbnail Image" />
        </label>
        <input
          id={`thumbnail${num}`}
          type="radio"
          name="default-bg"
          value={num}
          onChange={handleChange}
          checked={Number(bgNum) === num}
        />
      </div>
    );
  };

  return (
    <div className="option">
      <div className="option-text">
        <div className="label">Default Home Background</div>
        <div className="select-random">
          <label htmlFor="random">Random</label>
          <input
            id="random"
            type="radio"
            name="default-bg"
            value="-1"
            onChange={handleChange}
            checked={bgNum === "-1"}
          />
        </div>
      </div>
      <div className="thumbnail-images">
        {ids.map((number) => {
          return <ThumbnailImage num={Number(number)} key={number} />;
        })}
      </div>
    </div>
  );
};

export default DefaultBgSelection;

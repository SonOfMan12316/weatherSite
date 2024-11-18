import React from "react";
import '../styles/setting.css';
import useOutsideClick from "../../hooks/useOutsideClick";
import DefaultBgSelection from './defaultBgSelect';
import DynamicBgSelection from "./dynamicBgSelection";
import TempUnitSelection from "./temp-unit";
import { Close } from "../icons";

interface SettingProp {
    onClose: () => void;
    onChange: (key: string, val: string) => void;
}

const Setting: React.FC<SettingProp> = ({ onClose, onChange }) => {
  return (
    <div ref={useOutsideClick(onClose)} className="popup-area setting-area">
      <p className="title">Settings</p>
      <span className="icon" onClick={onClose}>
        <Close/>
      </span>
      <div className="options">
        <TempUnitSelection onChange={(key, val) => onChange(key, val)} />
        <DynamicBgSelection onChange={(key, val) => onChange(key, val)} />
        <DefaultBgSelection onChange={(key, val) => onChange(key, val)} />
      </div>
    </div>
  )
}

export default Setting;
import { useState } from "react";

interface BgSelectionProp {
  onChange: (type: string, value: string) => void;
}

const DynamicBgSelection: React.FC<BgSelectionProp> = ({ onChange }) => {
  const [status, setStatus] = useState(localStorage.getItem('dynamicBg') || 'ON');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.checked ? 'ON' : 'OFF'
    onChange('dynamicBg', val)
    setStatus(val)
    localStorage.setItem('dynamicBg', val)
  }

  return (
      <div className="option">
        <div className="label">Dynamic Weather backgrounds</div>
          <label className="switch">
            <input
              id="dynamic-weather-bg"
              type="checkbox"
              onChange={handleChange}
              checked={status === 'ON'}
            />
            <span className="slider round"></span>
          </label>
        </div>
    )
}

export default DynamicBgSelection
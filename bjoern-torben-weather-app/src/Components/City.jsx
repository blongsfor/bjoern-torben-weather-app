// ------------------ this component returns a dropdown menu  of locations ---------------------
import { useState } from "react";
export default function City({ onSelectCity }) {
  const [selectCityValue, setSelectCityValue] = useState("rainforest");
  function handleChangeCity(event) {
    const selectedCity = event.target.value.toLowerCase();
    setSelectCityValue(selectedCity);
    onSelectCity(selectedCity);
  }
  return (
    <form name="city-form" className="city-form">
      <label htmlFor="location-names">Choose a location:</label>
      <select
        name="location-names"
        id="location-names"
        value={selectCityValue}
        onChange={handleChangeCity}
      >
        <option value="europe">Europe</option>
        <option value="arctic">Arctic</option>
        <option value="Sahara">Sahara</option>
        <option value="rainforest">Rainforest</option>
      </select>
    </form>
  );
}

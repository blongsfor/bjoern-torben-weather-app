import { useState } from "react";

export const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);

    console.log("is checked: ", isChecked);
  };

  return (
    <div>
      <label htmlFor="isForGoodWeather">Good-weather activity:</label>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
    </div>
  );
};

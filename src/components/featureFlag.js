import React, { useState } from "react";
import axios from "axios";
import "./featureFlag.css";

const FeatureFlag = ({ name, value }) => {
  const [toggleValue, setToggleValue] = useState(value);

  const handleToggleClick = () => {
    // Update the toggle value by making an API call
    axios
      .post("https://localhost:7205/api/featureFlag/toggle", {
        identifier: name,
        isEnabled: toggleValue,
      })
      .then((response) => {
        // If the API call is successful, update the toggle value in the component state
        setToggleValue(response.data.isEnabled);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error updating toggle value:", error);
      });
  };

  return (
    <div class="list-item">
      <label className="switch">
        <input
          type="checkbox"
          checked={toggleValue}
          onClick={() => handleToggleClick()}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default FeatureFlag;

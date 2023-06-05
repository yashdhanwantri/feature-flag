import "./App.css";
import React, { useState } from "react";
import FeatureFlagList from "./components/featureFlagList";
import axios from "axios";

function App() {
  const [flags, setFlags] = useState([]);
  const [newFlag, setNewFlag] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newFlagAdded, setNewFlagAdded] = useState(false);

  const handleNewFlagChange = (e) => {
    setNewFlag(e.target.value);
  };

  const handleAddFlag = () => {
    if (newFlag.trim() !== "") {
      const requestBody = {
        id: 0,
        identifier: newFlag,
        description: "setting flag",
        isEnabled: true,
      };

      axios
        .post("https://localhost:7205/api/FeatureFlag", requestBody)
        .then((response) => {
          const newFlagIdentifier = response.data.identifier;
          setFlags([...flags, newFlagIdentifier]);
          setNewFlag("");
          setShowInput(false);
          if (!newFlagAdded) {
            setNewFlagAdded(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setShowInput(false);
  };

  const handleOpenInput = () => {
    console.log(newFlagAdded);
    setShowInput(true);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };
  return (
    <div className="App">
      <header className="header">
        <span className="header-text">Feature Flag Management</span>
      </header>
      <div className="flag-container">
        <aside className="sidebar">
          <div className="d-flex justify-content-center">
            {showInput ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newFlag}
                  onChange={handleNewFlagChange}
                  placeholder="Enter flag name"
                />
                <div>
                  <button
                    className="btn btn-primary submit-button"
                    onClick={handleAddFlag}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseInput}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenInput}>
                Create a new flag
              </button>
            )}
          </div>
        </aside>
        <div className="body">
          <FeatureFlagList newFlagAdded={newFlagAdded}></FeatureFlagList>
        </div>
      </div>
    </div>
  );
}

export default App;

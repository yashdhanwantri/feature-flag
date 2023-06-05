import React, { useState, useEffect } from "react";
import axios from "axios";
import FeatureFlag from "./featureFlag";
import "./featureFlag.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeatureFlagList = (newFlagAdded) => {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7205/api/featureFlag"
      );
      // Process the response data
      setItems(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    fetchData();

    return () => {
      // Cancel the API request if the component unmounts or re-renders before it completes
      source.cancel();
    };
  }, [newFlagAdded]);

  const handleToggleUpdate = (itemName) => {
    // Update the toggle value of the specific item by making an API call
    axios
      .post("https://localhost:7205/api/featureFlag/toggle", {
        identifier: itemName,
      })
      .then((response) => {
        // If the API call is successful, update the toggle value in the items state
        const updatedItems = items.map((item) => {
          if (item.identifier === itemName) {
            return { ...item, value: response.data.isEnabled };
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error updating toggle value:", error);
      });
  };

  const handleDeleteFlag = (id) => {
    axios
      .delete(`https://localhost:7205/api/FeatureFlag/${id}`)
      .then(() => {
        // Handle successful deletion
        fetchData(); // Call the fetchData function to update the list of items
        toast.success("Flag deleted successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting flag:", error);
      });
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card custom-card">
            <div className="card-body">
              {items.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {items.map((item) => (
                    <li
                      key={item.identifier}
                      className="list-group-item custom-list-item"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>{item.identifier}</div>
                        <div className="d-flex align-items-center">
                          <FeatureFlag
                            name={item.identifier}
                            value={item.isEnabled}
                            onToggleUpdate={() =>
                              handleToggleUpdate(item.identifier)
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            onClick={() => handleDeleteFlag(item.id)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center">No data found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagList;

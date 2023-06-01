import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeatureFlag from './featureFlag';

const FeatureFlagList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the list of items from the API when the component mounts
    axios
      .get('https://localhost:7205/api/featureFlag')
      .then(response => {
        // If the API call is successful, update the items state with the retrieved data
        setItems(response.data);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleToggleUpdate = (itemName) => {
    // Update the toggle value of the specific item by making an API call
    axios
      .post('https://localhost:7205/api/featureFlag/toggle', {
        identifier: itemName
      })
      .then(response => {
        // If the API call is successful, update the toggle value in the items state
        const updatedItems = items.map(item => {
          if (item.identifier === itemName) {
            return { ...item, value: response.data.isEnabled };
          }
          return item;
        });
        setItems(updatedItems);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('Error updating toggle value:', error);
      });
  };

  return (
    <div>
      {items.map(item => (
        <FeatureFlag
          key={item.identifier}
          name={item.identifier}
          value={item.isEnabled}
          onToggleUpdate={handleToggleUpdate}
        />
      ))}
    </div>
  );
};

export default FeatureFlagList;

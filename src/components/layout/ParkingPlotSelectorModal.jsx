import React, { useEffect, useState } from "react";
import useParkingList from "../../pages/parkings/hooks/useParkingList";
import '../styles/ParkingSelectorModal.css'

const ParkingPlotSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [postalCode, setPostalCode] = useState("");
  const { getParkingList, loading, error, data } = useParkingList();

  const handleSearch = async () => {
    getParkingList({ pincode: postalCode });
  };

  useEffect(()=>{

  },[data])


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Parking Spot</h2>

        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p>Loading parking spots...</p>}
        {error && <p className="error">Error fetching parkings.</p>}

        <ul className="parking-list">
          {data?.spots.map((spot) => (
            <li
              key={spot.unique_id}
              className="parking-item"
              onClick={() => {
                onSelect(spot.unique_id);
                onClose();
              }}
            >
              {spot.unique_id}
            </li>
          ))}
        </ul>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ParkingPlotSelectorModal;

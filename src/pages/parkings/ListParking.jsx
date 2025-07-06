import React, { useState } from 'react';
import useParkingList from './hooks/useParkingList';
import './styles/ListParking.css';
import { useNavigate } from 'react-router-dom';

export default function ListParking() {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { data, loading, error, getParkingList } = useParkingList();

  const parkings = data?.spots || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (postalCode.trim()) {
      getParkingList({ pincode: postalCode });
      setHasSearched(true);
    }
  };

  const handleClick = (uniqueId) => {
    console.log('btn click')
    navigate(`/parkings/${uniqueId}/vehicle`);
  };

  return (
    <div className="parking-list-container">
      <h2 className="parking-title">
        {hasSearched ? 'Available Parkings' : 'Find Nearby Parkings'}
      </h2>

      {!hasSearched ? (
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="search-input"
              required
            />
            <button type="submit" className="search-button">
              Find Parkings
            </button>
          </form>
          <div className="search-note">
            <p>Enter a postal code to find available parking spots near you</p>
          </div>
        </div>
      ) : (
        <>
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search another postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="search-input"
                required
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {loading && <p className="loading">Loading parkings...</p>}
          {error && <p className="error">Error loading parking data: {error.message}</p>}
          {!loading && parkings.length === 0 && (
            <p className="no-results">No parkings available for this postal code.</p>
          )}

          {!loading && parkings.length > 0 && (
            <ul className="parking-list">
              {parkings.map((parking) => (
                <li key={parking.unique_id} className="parking-card"  onClick={() => handleClick(parking.unique_id)} >
                  <h3>{parking.name}</h3>
                  <p><strong>Location:</strong> {parking.location}</p>
                  <p><strong>Type:</strong> {parking.office_type}</p>
                  <p><strong>Pincode:</strong> {parking.pincode}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
import React, { useState } from 'react';

export default function EditVehicleModal({ initialData = {}, onCancel, onSave }) {
  const [vehicle, setVehicle] = useState({
    model: '',
    number: '',
    vehicle_type: 'car',
    fuel_type: 'petrol',
    carbon_footprint: 0,
    ...initialData,
  });

  console.log('modal vehicle value', vehicle)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
    onSave(vehicle)
  };

  return (
    <div className="vehicle-modal-form">
      <label>Model</label>
      <input name="model" value={vehicle.model} onChange={handleChange} required />

      <label>Number</label>
      <input name="number" value={vehicle.number} onChange={handleChange} required />

      <label>Vehicle Type</label>
      <select name="vehicle_type" value={vehicle.vehicle_type} onChange={handleChange}>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="scooter">Scooter</option>
        <option value="cycle">Cycle</option>
      </select>

      <label>Fuel Type</label>
      <select name="fuel_type" value={vehicle.fuel_type} onChange={handleChange}>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
        <option value="none">None</option>
      </select>

      <label>Carbon Footprint (g/km)</label>
      <input
        name="carbon_footprint"
        type="number"
        min='0'
        value={vehicle.carbon_footprint ?? 0}
        onChange={handleChange}
        required
      />
    </div>
  );
}

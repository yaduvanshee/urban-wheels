import React, { useState } from 'react';

export default function EditVehicleModal({ initialData = {}, onSave }) {
  const [price, setPrice] = useState({
    vehicle_type: '',
    price: '',
    ...initialData
  });

  const handleChange =(e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(price);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{`Price for ${price.vehicle_type}`}</label>
      <input
        name="price"
        type="number"
        min="0"
        value={price.price ?? 0}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}

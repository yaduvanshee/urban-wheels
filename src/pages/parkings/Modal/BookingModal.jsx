import React, { useEffect } from "react";
import usePrice from "../../../hooks/getPrice";

export default function BookingContainer({ vehicle }) {
  const { getPrice, data, loading, error } = usePrice();

  useEffect(() => {
    if (vehicle) {
      getPrice({ vehicle_type: vehicle.vehicle_type });
    }
  }, [vehicle]);

  if (!vehicle) return null;

  return (
    <div className="space-y-3">
      <div>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Number:</strong> {vehicle.number}</p>
        <p><strong>Type:</strong> {vehicle.vehicle_type}</p>
        <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
        <p><strong>Carbon Footprint:</strong> {vehicle.carbon_footprint}</p>
      </div>

      {loading && <p className="text-gray-500">Loading price...</p>}
      {error && <p className="text-red-500">Error loading price: {error.message}</p>}

      {data && (
        <div className="border-t pt-3">
          <h3 className="font-semibold">Pricing</h3>
          <p><strong>Price:</strong> ₹{data.price}</p>
        </div>
      )}
    </div>
  );
}

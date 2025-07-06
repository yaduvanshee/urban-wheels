import React, { useEffect } from 'react';
import useVehicleHistory from '../hooks/useVehicleHistory';
import Table from '../../../components/ui/Table';
import '../styles/VehicleHistory.css';

export default function VehicleHistory({ vehicleId }) {
  const { getVehicleHistory, data: history, error, loading } = useVehicleHistory();

  useEffect(() => {
    if (vehicleId) {
      getVehicleHistory(vehicleId);
    }
  }, [vehicleId]);

  const columns = [
    {
      key: 'date',
      title: 'Date',
      render: (ride) => new Date(ride.created_at).toLocaleDateString()
    },
    {
      key: 'from',
      title: 'From',
      render: (ride) => ride.from_parking_id || 'N/A'
    },
    {
      key: 'to',
      title: 'To',
      render: (ride) => ride.to_parking_id || 'N/A'
    },
    {
      key: 'distance',
      title: 'Distance (km)',
      render: (ride) => ride.distance_covered?.toFixed(2) || '0.00'
    },
    {
      key: 'carbon',
      title: 'Carbon (kg)',
      render: (ride) => ride.carbon_emission?.toFixed(2) || '0.00'
    },
    {
      key: 'duration',
      title: 'Duration (min)',
      render: (ride) => ride.journey_time || '0'
    },
    {
      key: 'amount',
      title: 'Amount (Rs)',
      render: (ride) => ride.payment?.amount_paid?.toFixed(2) || '0.00'
    }
  ];

  if (loading) {
    return <div className="loading">Loading vehicle history...</div>;
  }

  if (error) {
    return <div className="error">Error loading vehicle history: {error.message}</div>;
  }

  return (
    <div className="vehicle-history">
      <div className="summary-card">
        <h3>Vehicle History Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Total Rides:</span>
            <span className="value">{history?.total_count || 0}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Revenue:</span>
            <span className="value">Rs. {history?.total_revenue|| '0.00'}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Distance:</span>
            <span className="value">
              {history?.list?.reduce((sum, ride) => sum + (ride.distance_covered || 0), 0).toFixed(2) || '0.00'} km
            </span>
          </div>
        </div>
      </div>

      <Table
        data={history || { list: [] }}
        columns={columns}
        emptyMessage="No ride history found for this vehicle"
      />
    </div>
  );
}
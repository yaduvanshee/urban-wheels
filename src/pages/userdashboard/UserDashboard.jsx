import React, { useEffect, useState } from "react";
import useMyRide from "./hooks/useMyRide";
import useMyRideHistory from "./hooks/useMyRideHistory";
import useEndRide from "./hooks/useEndRide";
import ParkingPlotSelectorModal from "../../components/layout/ParkingPlotSelectorModal";
import Table from "../../components/ui/Table"; // Import the Table component
import "./styles/userdashboard.css";
import Card from "../../components/ui/Card";

export default function UserDashboard() {
  const { data: currentRideData, loading: loadingCurrent, error: errorCurrent, getMyRide } = useMyRide();
  const { data: historyData, loading: loadingHistory, error: errorHistory, getMyRideHistory } = useMyRideHistory();
  const { endRide } = useEndRide();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMyRide();
    getMyRideHistory({ page });
  }, [page]);

  const handleMarkComplete = async (parkingId, ride) => {
    await endRide(ride.id, parkingId);
    await getMyRide();
    await getMyRideHistory({ page });
  };

  const currentRide = currentRideData || null;
  
  const historyColumns = [
    {
      key: 'vehicle',
      title: 'Vehicle',
      render: (ride) => `${ride.vehicle?.model} (${ride.vehicle?.number})`
    },
    {
      key: 'from_parking_id',
      title: 'From'
    },
    {
      key: 'to_parking_id',
      title: 'To',
      render: (ride) => ride.to_parking_id || "Not completed"
    },
    {
      key: 'distance_covered',
      title: 'Distance (km)',
      render: (ride) => ride.distance_covered ?? "N/A"
    },
    {
      key: 'carbon_emission',
      title: 'Emission (kg)',
      render: (ride) => ride.carbon_emission ?? "N/A"
    },
    {
      key: 'payment',
      title: 'Amount Paid (Rs)',
      render: (ride) => ride.payment?.amount_paid ?? "N/A"
    },
    {
      key: 'created_at',
      title: 'Booked On',
      render: (ride) => new Date(ride.created_at).toLocaleString()
    }
  ];

  // const tableData = historyData 
  // ? {
  //     ...historyData,
  //     list: historyData.list.map(item => ({
  //       ...item,
  //       actions: [
  //         { type: 'view', label: 'View' },
  //         { type: 'edit', label: 'Edit' }
  //       ]
  //     }))
  //   }
  // : { list: [] };

  // const handleRideAction = (actionType, ride) => {
  //   switch(actionType) {
  //     case 'view':
  //       console.log('action:', actionType);
  //       break;
        
  //     case 'receipt':
  //       console.log('action:', actionType);
  //       break;
        
  //     default:
  //       console.warn('Unknown action:', actionType);
  //   }
  // };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>

      <section className="dashboard-section">
  <h2 className="section-title">Current Ride</h2>
  
  {loadingCurrent && <p>Loading current ride...</p>}
  {errorCurrent && <p className="error-message">Failed to load current ride.</p>}

  {!loadingCurrent && currentRide ? (
    <Card
      title="Current Ride Details" 
      className="primary" 
      bodyClassName="ride-details"
    >
      <div className="detail-row">
        <span className="detail-label">Vehicle ID:</span>
        <span className="detail-value">{currentRide.vehicle.number}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">From:</span>
        <span className="detail-value">{currentRide.from_parking_id || "Not started yet"}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">To:</span>
        <span className="detail-value">{currentRide.to_parking_id || "Not completed"}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Distance:</span>
        <span className="detail-value">{currentRide.distance_covered ?? "N/A"} km</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Carbon Emission:</span>
        <span className="detail-value">{currentRide.carbon_emission ?? "N/A"} kg</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Journey Time:</span>
        <span className="detail-value">{currentRide.journey_time} min</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Started At:</span>
        <span className="detail-value">
          {new Date(currentRide.created_at).toLocaleString()}
        </span>
      </div>
      
      <button
        className="btn-complete"
        onClick={() => setIsModalOpen(true)}
      >
        Mark Ride Complete
      </button>
      
      <ParkingPlotSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(parkingId) => handleMarkComplete(parkingId, currentRide)}
      />
    </Card>
  ) : (
    !loadingCurrent && (
      <Card title="No Active Ride">
        <p>You don't have any ongoing ride at the moment.</p>
        <button
          className="btn-go-parkings"
          onClick={() => window.location.href = "/parkings"}
        >
          Book Your Ride
        </button>
      </Card>
    )
  )}
</section>

      <section className="dashboard-section">
        <h2 className="section-title">Ride History</h2>
        {loadingHistory && <p>Loading history...</p>}
        {errorHistory && <p className="error-message">Failed to load ride history.</p>}

        {!loadingHistory && (
          <Table
            data={historyData || {list: []}}
            columns={historyColumns}
            onPageChange={setPage}
            // onActionClick={handleRideAction}
            emptyMessage="No rides found"
          />
        )}
      </section>
    </div>
  );
}
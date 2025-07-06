import React, { useState } from 'react';
import ParkingPlotSelectorModal from '../../components/layout/ParkingPlotSelectorModal';
import Btn from '../../components/ui/Btn';
import useParkingPlotStats from './hooks/useParkingPlotStats';
import { useNavigate } from 'react-router-dom';

const ParkingPlotStats = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedParkingId, setSelectedParkingId] = useState(null);

  const {
    data: plotStats,
    getPlotStats,
    loading: loadingStats,
  } = useParkingPlotStats(selectedParkingId);

  const handleSelectParking = async (parkingId) => {
    setSelectedParkingId(parkingId); 
    await getPlotStats(parkingId); 
    setIsModalOpen(false); 
  };

  return (
    <section className="dashboard-section">
      <Btn type='text' onClick={()=>navigate('/admin')}>Go Back</Btn>
      <h2 className="section-title">Lookup Parking Plot Stats</h2>

      <Btn type="text" onClick={() => setIsModalOpen(true)}>
        Select Parking Plot
      </Btn>

      {selectedParkingId && !loadingStats && plotStats && (
        <div className="card">
          <p><strong>Parking ID:</strong> {selectedParkingId}</p>
          <p><strong>Total Rides:</strong> {plotStats.total_rides}</p>
          <p><strong>Total Carbon Emission:</strong> {plotStats.total_carbon_emission} kg</p>
          <p><strong>Total Revenue:</strong> ₹{plotStats.total_amount_paid}</p>
          <p><strong>Unique Vehicles Used:</strong> {plotStats.unique_vehicles}</p>
          <p><strong>Avg. Distance:</strong> {plotStats.average_distance} km</p>
        </div>
      )}

      {loadingStats && <p>Loading parking stats...</p>}

      <ParkingPlotSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectParking}
      />
    </section>
  );
};

export default ParkingPlotStats;

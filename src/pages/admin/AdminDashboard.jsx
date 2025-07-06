import React, { useEffect } from 'react';
import useTop5ParkingPlot from './hooks/useTop5ParkingPlot';
import './styles/adminDashboard.css';
import Btn from '../../components/ui/Btn';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data: topRide, loading, error, getTopRides } = useTop5ParkingPlot();

  useEffect(() => {
    const fetchData = async () => {
      await getTopRides();
    };
    fetchData();
  }, []);


  console.log(topRide, 'topRide')

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <Btn type='Primary' onClick={()=>navigate('/admin/vehicles')}>Manage Vehicle</Btn>
      <Btn type='Primary' onClick={()=>navigate('/admin/edit-pricing')}>Manage Price</Btn>
      
     
      <section className="dashboard-section">
        <h2 className="section-subtitle">Top 5 Parking Plots</h2>

        {loading && <p>Loading data...</p>}
        {error && <p className="error-message">Failed to load top parking plots.</p>}

        {!loading && topRide?.length === 0 && <p>No ride data found.</p>}

        {!loading && topRide?.length > 0 && (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Parking Plot</th>
                <th>Total Carbon Emission (kg)</th>
                <th>Total Amount Got (₹)</th>
                <th>Total Rides</th>
              </tr>
            </thead>
            <tbody>
              {topRide?.map((plot, index) => (
                <tr key={plot.from_parking_id}>
                  <td>{index + 1}</td>
                  <td>{plot.from_parking_id}</td>
                  <td>{plot.total_carbon_emission}</td>
                  <td>{plot.total_amount_paid}</td>
                  <td>{plot.total_rides}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      <Btn type='text' style={{ marginTop: '10px' }} onClick={()=>navigate('/admin/parking-plot-stats')}>Lookup by Postal Code</Btn>
      </section>


    </div>
  );
}

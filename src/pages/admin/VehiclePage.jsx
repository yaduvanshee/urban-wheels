import React, { useEffect, useState } from "react";
import useVehicleList from "./hooks/useVehicleList";
import Btn from "../../components/ui/Btn";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/ui/PopUp";
import EditVehicleModal from "./Modal/EditVehcielModal";
import useUpdateVehicle from "./hooks/useUpdateVehicle";
import VehicleHistory from './components/VehicleHistory';

export default function VehiclePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState(""); 
  const [searchParams, setSearchParams] = useState("");
  const { data: vehicles, loading, error, getVehicleList } = useVehicleList();
  const [page, setPage] = useState(1);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const {updateVehicle} = useUpdateVehicle()

  useEffect(() => {
    getVehicleList({ page, q: searchParams });
  }, [page, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query);
    setPage(1);
  };


  const handelClick = (vehicle, action) => {
    setSelectedVehicle(vehicle)

    switch (action) {
      case 'view':
        setViewModalOpen(true)
        break;

      case 'edit':
        setEditModalOpen(true)
        break;
    
      default:
        console.log('no implementation')
        break;
    }
  }

  const handleEditSave = async (updatedVehicle) => {
    await updateVehicle(updatedVehicle.id, updatedVehicle)
    await setEditModalOpen(false);
    await getVehicleList({ page, q: searchParams });
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < vehicles?.total_pages ) setPage(page + 1);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Btn type='text' onClick={()=>navigate('/admin')}>Go Back</Btn>
      <h2>Admin — Vehicle List</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={query}
          placeholder="Search vehicle..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", marginRight: "8px", width: "200px" }}
        />
        <Btn type="submit">Search</Btn>
      </form>

      {loading && <p>Loading vehicles...</p>}
      {error && <p style={{ color: "red" }}>Error loading vehicles: {error.message}</p>}

      {vehicles?.list?.length > 0 ? (
        <div>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>SN</th>
              <th>Model</th>
              <th>Number</th>
              <th>State</th>
              <th>Type</th>
              <th>Fuel Type</th>
              <th>CF</th>
              <th>Parked At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.list.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td>{index+1}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.number}</td>
                <td>{vehicle.state == 'in_use' ? 'In Use' : 'Available' }</td>
                <td>{vehicle.vehicle_type}</td>
                <td>{vehicle.fuel_type}</td>
                <td>{vehicle.carbon_footprint}</td>
                <td>{vehicle.parking_id}</td>
                <td>
                  <Btn type="text" onClick={() => handelClick(vehicle, 'edit')}>Edit Vehicle</Btn> 
                  <Btn type="text" onClick={() => handelClick(vehicle, 'view')}>View history</Btn> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEditModalOpen && selectedVehicle && (
          <PopUp
            title="Edit Vehicle"
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSubmit={() => handleEditSave(selectedVehicle)}
            width="max-w-md"
          >
            <EditVehicleModal
              initialData={selectedVehicle}
              onCancel={() => setEditModalOpen(false)}
              onSave={(updated) => setSelectedVehicle(updated)}
            />
          </PopUp>
        )}
        
        {isViewModalOpen && selectedVehicle && (
          <PopUp
            title="Vehicle History"
            isOpen={isViewModalOpen}
            onClose={() => setViewModalOpen(false)}
            width="max-w-md"
          >
            <VehicleHistory vehicleId={selectedVehicle.id}/>
          </PopUp>
        )}

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
        <Btn type="bordered" onClick={handlePrev} disabled={page <= 1}>
          ← Previous
        </Btn>
        <Btn type="bordered" onClick={handleNext}>
          Next →
        </Btn>
        <span>Page {page}</span>
        </div>
        </div>
      ) : !loading ? (
        <p>No vehicles found.</p>
      ) : null}
    </div>
  );
}

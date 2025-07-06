import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/VehiclePage.css';
import useCreateVehicle from './hooks/useCreateVehicle';
import useUpdateVehicle from './hooks/useUpdateVehicle';
import useVehicleList from './hooks/useVhicleList';
import { useAuth } from '../../context/AuthContext';
import PopUp from '../../components/ui/PopUp'
import EditVehicleModal from './Modal/EditVehicleModal';
import BookingContainer from './Modal/BookingModal';
import useStartRide from './hooks/useStartRide';
import Btn from '../../components/ui/Btn';

export default function VehiclePage() {
  const {isAdmin, refreshUser} =  useAuth();
  const {startRide} = useStartRide()
  const { parking_id } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ parking_id: parking_id });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isBooking, setBooking] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState({});

  const {createVehicle} = useCreateVehicle()
  const {updateVehicle} = useUpdateVehicle()

  const {data, error, loading , getVehicleList} = useVehicleList()

  useEffect(() => {
    if(parking_id){
      getVehicleList(parking_id);
    }
  }, [parking_id]);

  const handleEditSave = async (updatedVehicle) => {
    console.log("Saving edited vehicle:", updatedVehicle);
    await updateVehicle(updatedVehicle.id, updatedVehicle)
    await setEditModalOpen(false);
    await getVehicleList(parking_id)
  };

  const handlebooking = async ()=>{
    await startRide(bookingVehicle.id)
    await setBooking(false)
    await getVehicleList(parking_id)
    await refreshUser()
  }

  const handleCreateSave = async (createdVehicle) => {
    await console.log("Creating new vehicle:", createdVehicle);
    await createVehicle(createdVehicle)
    await setIsCreateModalOpen(false);
    await getVehicleList(parking_id)
  };

  const vehicles = data?.list || [];

  return (
    <div className="vehicle-page-container">
      <h2 className="vehicle-title">Vehicles at Parking #{parking_id}</h2>

      {loading && <p className="loading">Loading vehicles...</p>}
      {error && <p className="error">Failed to load vehicles.</p>}
      {!loading && vehicles.length === 0 && <p className="no-results">No vehicles found.</p>}

      {isAdmin && (
                <Btn
                  type="dotted"
                  onClick={() => {
                    setIsCreateModalOpen(true);
                  }}
                >
                  + Add New Vehicle
                </Btn>
              )}

      {!loading && vehicles.length > 0 && (
        <ul className="vehicle-list">
          {vehicles.map(vehicle => (
            <li key={vehicle.id} className="vehicle-item">
              <h3>{vehicle.model}</h3>
              <p><strong>Number:</strong> {vehicle.number}</p>
              <p><strong>Type:</strong> {vehicle.vehicle_type}</p>
          
              {isAdmin && (
                <Btn
                  type='primary'
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </Btn>
              )}

              <Btn
                  type='primary'
                  onClick={()=>{setBookingVehicle(vehicle); setBooking(true)}}
                >
                  Book Now
                </Btn>
            </li>
          ))}
        </ul>
      )}

      {isBooking && (
        <PopUp
          title="Start A Ride"
          isOpen={isBooking}
          onClose={() => setBooking(false)}
          onSubmit={handlebooking}
          width="max-w-md"
          savetext='Book Now'
        >
          <BookingContainer vehicle={bookingVehicle}/>

        </PopUp>
      )}

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

      {isCreateModalOpen && (
        <PopUp
          title="Add New Vehicle"
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={() => handleCreateSave(newVehicle)}
          width="max-w-md"
        >
          <EditVehicleModal
            initialData={newVehicle}
            onCancel={() => setIsCreateModalOpen(false)}
            onSave={(newVehicle) => setNewVehicle(newVehicle)}
          />
        </PopUp>
      )}

    </div>
  );
}

import React, { useEffect, useState } from "react";
import usePrice from "./hooks/usePrice";
import Btn from "../../components/ui/Btn";
import { useNavigate } from "react-router-dom";
import useUpdatePrice from "./hooks/useUpdatePrice";
import PopUp from "../../components/ui/PopUp";
import EditPriceModal from './Modal/EditPriceModal'

export default function PricePage() {
  const navigate = useNavigate()
  const { data: prices, loading, error, getPrice } = usePrice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const {updatePrice} = useUpdatePrice()

  const handleEditClick = (price) => {
    setEditingPrice(price);
    setIsModalOpen(true);
  };

  const handleEditSave = async (price) => {
    await updatePrice(price.id, price)
    await setIsModalOpen(false);
    await getPrice();
  };


  useEffect(() => {
    getPrice();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Btn type='text' onClick={()=>navigate('/admin')}>Go Back</Btn>
      <h2>Admin — Price List</h2>

      {loading && <p>Loading Pricing...</p>}
      {error && <p style={{ color: "red" }}>Error loading Price: {error.message}</p>}

      {prices?.length > 0 ? (
        <div>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>SN</th>
              <th>Vehicle type</th>
              <th>Price (Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={price.id}>
                <td>{index+1}</td>
                <td>{price.vehicle_type}</td>
                <td>{price.price}</td>
                <td>
                  <Btn type="text" onClick={() => handleEditClick(price)}>Edit</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && editingPrice && (
        <PopUp
          title="Edit Vehicle"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => handleEditSave(editingPrice)}
          width="max-w-md"
        >
          <EditPriceModal
            initialData={editingPrice}
            onCancel={() => setIsModalOpen(false)}
            onSave={(updated) => setEditingPrice(updated)}
          />
        </PopUp>
      )}
        </div>
      ) : !loading ? (
        <p>No Pricing found.</p>
      ) : null}
    </div>
  );
}

import useRequest from "../../../hooks/useRequest";

const useCreateVehicle = () => {
  const endpoint = "/admin/vehicle";
  const { data, error, loading, fetchData } = useRequest(endpoint, {
    method: "POST",
  });

  const createVehicle = async (vehicleParams) => {
    await fetchData({ vehicle: vehicleParams });
  };

  return { data, error, loading, createVehicle };
};

export default useCreateVehicle;

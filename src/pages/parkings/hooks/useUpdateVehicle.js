import useRequest from "../../../hooks/useRequest";

const useUpdateVehicle = () => {
  const endpoint = "/admin/vehicle/";
  const { data, error, loading, fetchData } = useRequest(endpoint, {
    method: "PUT",
  });

  const updateVehicle = async (vehicleId, updateParams) => {
    const extraUrl = `${vehicleId}`;
    await fetchData({ vehicle: updateParams }, extraUrl);
  };

  return { data, error, loading, updateVehicle };
};

export default useUpdateVehicle;

import useRequest from '../../../hooks/useRequest';

const useVehicleList = () => {
  const endpoint = '/admin/vehicle';
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const getVehicleHistory = async (vehicleId) => {
    const extraUrl = `/${vehicleId}/list_history`
    await fetchData(null, extraUrl);
  };

  return {
    data,
    error,
    loading,
    getVehicleHistory,
  };
};

export default useVehicleList;

import useRequest from '../../../hooks/useRequest';

const useTop5ParkingPlot = () => {
  const endpoint = '/admin/ride';
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const getTopRides = async () => {
    await fetchData(null, '');
  };

  return {
    data,
    error,
    loading,
    getTopRides,
  };
};

export default useTop5ParkingPlot;

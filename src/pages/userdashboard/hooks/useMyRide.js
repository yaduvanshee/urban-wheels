import useRequest from '../../../hooks/useRequest';

const useMyRide = () => {
  const endpoint = '/rides/my_ride';
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const getMyRide = async () => {
    await fetchData(null,'');
  };

  return {
    data,
    error,
    loading,
    getMyRide,
  };
};

export default useMyRide;

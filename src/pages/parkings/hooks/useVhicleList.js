import useRequest from '../../../hooks/useRequest';

const useVehicleList = () => {
  const endpoint = '/parking_spots';
  const { data, error, loading, fetchData, getQueryString } = useRequest(endpoint);

  const getVehicleList = async (parking_id,filters = {}) => {
    const updatedFilters = {
      ...filters,
      per_page: 10,
    };

    const extraUrl = `/${parking_id}/vehicles${getQueryString(updatedFilters)}`;
    await fetchData(null, extraUrl);
  };

  return {
    data,
    error,
    loading,
    getVehicleList,
  };
};

export default useVehicleList;

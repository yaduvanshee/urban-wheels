import useRequest from '../../../hooks/useRequest';

const useVehicleList = () => {
  const endpoint = '/admin/vehicle';
  const { data, error, loading, fetchData, getQueryString } = useRequest(endpoint);

  const getVehicleList = async (filters = {}) => {
    const updatedFilters = {
      ...filters,
      per_page: 10,
    };

    const extraUrl = getQueryString(updatedFilters);
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

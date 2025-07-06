import useRequest from './useRequest';

const usePrice = () => {
  const endpoint = '/rides/vehicle_prices';
  const { data, error, loading, fetchData, getQueryString } = useRequest(endpoint);

  const getPrice = async (filters = {}) => {
    const updatedFilters = {
      ...filters,
    };

    const extraUrl = getQueryString(updatedFilters);
    await fetchData(null, extraUrl);
  };

  return {
    data,
    error,
    loading,
    getPrice,
  };
};

export default usePrice;

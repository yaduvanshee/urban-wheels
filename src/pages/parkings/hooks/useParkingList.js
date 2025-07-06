import useRequest from '../../../hooks/useRequest';

const useParkingList = () => {
  const endpoint = '/parking_spots/search';
  const { data, error, loading, fetchData, getQueryString } = useRequest(endpoint);

  const getParkingList = async (filters = {}) => {
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
    getParkingList,
  };
};

export default useParkingList;

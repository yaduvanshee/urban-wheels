import useRequest from '../../../hooks/useRequest';

const useMyRideHistory = () => {
  const endpoint = '/rides/history';
  const { data, error, loading, fetchData, getQueryString } = useRequest(endpoint);

  const getMyRideHistory = async (filters = {}) => {
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
    getMyRideHistory,
  };
};

export default useMyRideHistory;

import useRequest from '../../../hooks/useRequest';

const usePrice = () => {
  const endpoint = '/admin/prices';
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

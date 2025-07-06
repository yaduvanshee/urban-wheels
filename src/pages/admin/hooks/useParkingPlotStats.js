import useRequest from '../../../hooks/useRequest';

const useParkingPlotStats = (parkingId) => {
  const endpoint = `/admin/ride/parking_stats/`;
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const getPlotStats = async (parkingId) => {
    await fetchData(null, `${parkingId}`);
  };

  return {
    data,
    error,
    loading,
    getPlotStats,
  };
};

export default useParkingPlotStats;

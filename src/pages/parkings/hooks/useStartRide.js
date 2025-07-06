import useRequest from "../../../hooks/useRequest";

const useStartRide = () => {
  const endpoint = "/parking_spots/rides/";
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const startRide = async (vehicleId) => {
    const extraUrl = `${vehicleId}`;
    await fetchData({},extraUrl);
  };

  return { data, error, loading, startRide };
};

export default useStartRide;

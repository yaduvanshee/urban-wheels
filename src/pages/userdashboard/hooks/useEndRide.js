import useRequest from "../../../hooks/useRequest";

const useEndRide = () => {
  const endpoint = "/parking_spots/rides/";
  const { data, error, loading, fetchData } = useRequest(endpoint);

  const endRide = async (ride_id, parkingId) => {
    const extraUrl = `${parkingId}/complete/${ride_id}`;
    await fetchData(null, extraUrl);
  };

  return { data, error, loading, endRide };
};

export default useEndRide;

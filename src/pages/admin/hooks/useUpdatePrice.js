import useRequest from "../../../hooks/useRequest";

const useUpdatePrice = () => {
  const endpoint = "/admin/prices/";
  const { data, error, loading, fetchData } = useRequest(endpoint, {
    method: "PUT",
  });

  const updatePrice = async (priceId, updateParams) => {
    const extraUrl = `${priceId}`;
    await fetchData({ vehicle_price: updateParams }, extraUrl);
  };

  return { data, error, loading, updatePrice };
};

export default useUpdatePrice;

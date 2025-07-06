import useRequest from "./useRequest";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const endpoint = "/api/v1/me";

export default function useGetUserDetails() {
  const { setUserDetails } = useAuth();

  const { data, error, loading, fetchData } = useRequest(endpoint, {
    method: "GET",
  });

  const getUserDetails = async () => {
    await fetchData();
  };

  useEffect(() => {
    if (!data) return;
    setUserDetails(data);
  }, [data]);

  return {
    user: data,
    loading,
    error,
    refetch: getUserDetails,
  };
}

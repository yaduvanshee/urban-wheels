import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

const BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${BASE_URL}/api/v1/login`;

export function useAuthLogin() {
  const { login: saveAuth } = useAuth();
  const { notify } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      saveAuth(data.token, data.user); // Save in context
      notify("✅ Login successful!", "success");

      return data;
    } catch (err) {
      setError(err.message);
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

const BASE_URL = import.meta.env.VITE_API_URL;
const REGISTER_URL = `${BASE_URL}/api/v1/register`;

export function useRegister() {
  const { login } = useAuth();
  const { notify } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      login(data.token, data.user); // <- Save token + user
      notify("🎉 Registered successfully!", "success");

      return data;
    } catch (err) {
      setError(err.message);
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}

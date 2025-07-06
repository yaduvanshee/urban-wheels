import { useState, useEffect } from "react";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function useAuthDetails() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const setUserDetails = (userData) => {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const getUserDetails = () => {
    return user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) setToken(storedToken);
  }, []);

  return { token, user, setAuthToken, setUserDetails, getUserDetails, logout };
}

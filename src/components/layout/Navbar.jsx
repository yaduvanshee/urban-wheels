import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/NavBar.css'

export default function NavBar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleSignUp = () => {
    logout();
    navigate("/auth/register");
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        🚗 Urban Wheels
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <span className="user-info">
              Hi, {user?.first_name} 
            </span>
            <span className="user-info">
              Balance {user?.wallet_balance} Rs
            </span>
            {isAdmin && <>
                <button onClick={()=>navigate('/admin')} className="nav-button logout">
              Admin Dashboard
            </button>
              </>}
            <button onClick={handleLogout} className="nav-button logout">
              Logout
            </button>
          </>
        ) : (
          <>
          <button onClick={handleLogin} className="nav-button login">
            Login
          </button>
          <button onClick={handleSignUp} className="nav-button login">
          Sign Up
        </button></>
        )}
      </div>
    </nav>
  );
}

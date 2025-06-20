import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiHome, FiBookOpen, FiUser, FiLogIn, FiLogOut, FiEdit } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav style={{ 
      padding: "12px 20px", 
      backgroundColor: "#333", 
      color: "white", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between" 
    }}>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
          <FiHome /> Home
        </Link>
        <Link to="/books" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
          <FiBookOpen /> Books
        </Link>

        {userId && (
          <Link to={`/users/${userId}`} style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
            <FiUser /> My Profile
          </Link>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {userId ? (
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "6px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <FiLogOut /> Logout
          </button>
        ) : (
          <>
            <Link to="/register" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
              <FiEdit /> Register
            </Link>
            <Link to="/login" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
              <FiLogIn /> Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Import backend base URL from .env
const apiBase = process.env.REACT_APP_API_URL;

function LoginPage({ setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBase}/register/login`, {
        username,
        password,
      });

      const user = res.data.user;

      setLoggedInUser(user);
      localStorage.setItem("userId", user.id);
      setMessage(" Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(" Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="center-page">
      <div className="form-container fade-in">
        <h1>Login</h1>

        {message && (
          <p
            className={message.includes("✅") ? "message-success" : "message-error"}
            style={{ marginBottom: "15px" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button-form">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from "react";
import axios from "axios";

// ✅ Read the backend base URL from .env
const apiBase = process.env.REACT_APP_API_URL;

function RegisterPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBase}/register`, {
        name,
        bio,
        username,
        password,
      });
      setMessage(" Registered successfully. You can log in now.");
    } catch (err) {
      setMessage(" Registration failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="center-page">
      <div className="form-container fade-in">
        <h1>Register</h1>
        {message && (
          <p
            className={message.includes("✅") ? "message-success" : "message-error"}
            style={{ marginBottom: "15px" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
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
          <button type="submit" className="button-form">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

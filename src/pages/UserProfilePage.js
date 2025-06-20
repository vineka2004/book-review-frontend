import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Neutral user icon

// ✅ Get backend base URL from environment variable
const apiBase = process.env.REACT_APP_API_URL;

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${apiBase}/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setBio(res.data.bio);
      })
      .catch(() => setMessage("❌ Failed to load user."));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${apiBase}/users/${id}`, { name, bio })
      .then((res) => {
        setUser(res.data);
        setMessage("✅ Profile updated!");
      })
      .catch(() => setMessage("❌ Failed to update profile."));
  };

  if (!user) return <p style={{ textAlign: "center", color: "white" }}>Loading profile...</p>;

  return (
    <div className="center-page">
      <div className="form-container fade-in" style={{ maxWidth: "500px" }}>
        <h1>User Profile</h1>

        {/* ✅ Neutral icon instead of male-only avatar */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <FaUserCircle size={100} color="#4A90E2" style={{ marginBottom: "10px" }} />
          <h3 style={{ margin: "5px 0", color: "#333" }}>{user.username}</h3>
        </div>

        {message && (
          <p
            className={message.includes("✅") ? "message-success" : "message-error"}
            style={{ marginBottom: "15px" }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Bio:</label>
          <textarea
            rows="4"
            value={bio}
            placeholder="Tell us about yourself..."
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <button type="submit" className="button-form">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;

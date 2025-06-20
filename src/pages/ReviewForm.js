import React, { useState } from "react";
import axios from "axios";

// ✅ Load backend base URL from .env
const apiBase = process.env.REACT_APP_API_URL;

function ReviewForm({ bookId, onReviewSubmit }) {
  const [user, setUser] = useState(""); // Replace with current user if you implement auth
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment) return alert("Please fill all fields");

    try {
      await axios.post(`${apiBase}/reviews`, {
        bookId,
        user,
        rating,
        comment,
      });
      alert("Review submitted!");
      setUser("");
      setRating(5);
      setComment("");
      onReviewSubmit(); // refresh reviews
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Leave a Review</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
        ))}
      </select>
      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        style={{ width: "100%", padding: "8px" }}
      />
      <button type="submit" className="btn" style={{ marginTop: "10px" }}>
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;

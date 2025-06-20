import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaBookOpen, FaUserAlt, FaStar, FaInbox } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

// ✅ Get backend base URL from .env
const apiBase = process.env.REACT_APP_API_URL;

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(() => {
    setReviewLoading(true);
    axios
      .get(`${apiBase}/reviews?bookId=${id}`)
      .then((res) => {
        setReviews(res.data);
        setReviewLoading(false);
      })
      .catch(() => setReviewLoading(false));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${apiBase}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(" Book not found.");
        setLoading(false);
      });

    fetchReviews();
  }, [id, fetchReviews]);

  if (loading)
    return (
      <p className="fade-in" style={{ textAlign: "center", color: "white" }}>
        ⏳ Loading book details...
      </p>
    );
  if (error)
    return (
      <p className="fade-in" style={{ textAlign: "center", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div className="page-bg fade-in" style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div
        className="book-detail-card"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "#ffffff",
          color: "#333",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "40px",
        }}
      >
        {/* Book Info Section */}
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <img
            src={book.coverImage || "https://via.placeholder.com/200x300?text=No+Image"}
            alt={book.title}
            style={{
              width: "220px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <div>
            <h1
              style={{
                fontSize: "28px",
                color: "#222",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaBookOpen /> {book.title}
            </h1>
            <p style={{ margin: "8px 0", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUserAlt />
              <strong>Author:</strong> {book.author}
            </p>
            <p style={{ margin: "8px 0", fontSize: "16px" }}>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p
              style={{
                marginTop: "20px",
                lineHeight: "1.6",
                fontSize: "15px",
                color: "#555",
              }}
            >
              {book.description}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <hr style={{ margin: "40px 0", border: "none", borderTop: "1px solid #eee" }} />
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <FaStar style={{ color: "#f1c40f" }} />
          Reader Reviews
        </h2>

        {reviewLoading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Fetching reviews...</p>
        ) : reviews.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {reviews.map((r, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <p style={{ margin: "0 0 8px", fontWeight: "600", color: "#222" }}>
                  {r.user} <span style={{ color: "#777" }}>rated it</span> {r.rating}⭐
                </p>
                <p style={{ color: "#555", fontSize: "15px" }}>{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#888",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaInbox /> No reviews yet.
          </p>
        )}

        {/* Review Form */}
        <div style={{ marginTop: "50px" }}>
          <ReviewForm bookId={id} onReviewSubmit={fetchReviews} />
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;

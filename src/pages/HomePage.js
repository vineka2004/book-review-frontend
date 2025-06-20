import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";

// ✅ Read the backend API URL from the .env file
const apiBase = process.env.REACT_APP_API_URL;

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${apiBase}/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="page-bg fade-in">
      <div style={{ padding: "40px 30px" }}>
        <h1><FiBookOpen style={{ marginRight: "8px" }} /> Featured Books</h1>

        <div className="book-grid">
          {books.slice(0, 3).map((book) => (
            <div className="book-card" key={book._id}>
              <img
                src={book.coverImage || "https://via.placeholder.com/200x300?text=No+Image"}
                alt={book.title}
                style={{ height: "260px", objectFit: "cover", width: "100%" }}
              />
              <div className="info">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p><strong>{book.genre}</strong></p>
                <Link to={`/books/${book._id}`} className="btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <p style={{ color: "#ccc", textAlign: "center", marginTop: "30px" }}>
            📭 No books available.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

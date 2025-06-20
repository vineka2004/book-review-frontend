import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSearch, FiBookOpen } from "react-icons/fi"; // Modern icons

// ✅ Load API base URL from environment
const apiBase = process.env.REACT_APP_API_URL;

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${apiBase}/books`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(" Failed to load books");
        setLoading(false);
      });
  }, []);

  const genres = [...new Set(books.map((book) => book.genre))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === "" || book.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="page-bg">
      <div style={{ padding: "30px" }}>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FiBookOpen /> Your Next Great Read Awaits
        </h1>

        <div
          style={{
            margin: "30px auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <div style={{ position: "relative" }}>
            <FiSearch
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                color: "#888",
              }}
            />
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "12px 12px 12px 36px",
                width: "280px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#1e1e1e",
                color: "white",
              }}
            />
          </div>

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            style={{
              padding: "12px",
              width: "180px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#1e1e1e",
              color: "white",
            }}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {loading && <p style={{ textAlign: "center", color: "white" }}>⏳ Loading books...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <img src={book.coverImage} alt={book.title} />
              <div className="info">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>
                  <strong>{book.genre}</strong>
                </p>
                <Link to={`/books/${book._id}`} className="btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
          {!loading && filteredBooks.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "30px", color: "white" }}>
              📭 No books found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookListPage;

import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); 

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} />
      <Routes>
        <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute user={loggedInUser}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute user={loggedInUser}>
              <BookListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute user={loggedInUser}>
              <BookDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute user={loggedInUser}>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

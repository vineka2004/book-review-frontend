# 📚 Book Review Frontend

This is the React-based frontend for the Book Review Platform. It allows users to browse books, view details, register/login, and submit reviews.

---

## 🔗 Live Demo

- 🌐 Frontend: [https://book-review-frontend-tau.vercel.app](https://book-review-frontend-tau.vercel.app)
- 🛠️ Backend API: [https://book-review-backend-kq9i.onrender.com](https://book-review-backend-kq9i.onrender.com)

---

## 🛠️ Tech Stack

- ⚛️ React.js
- 🎨 CSS
- 🌐 Axios (for API requests)
- 🚀 Vercel (for deployment)

---

## 📌 Features

- ✅ Browse and view book details
- ✅ Submit and read reviews
- ✅ User registration and login
- ✅ Protected routes for user profile

---

## 🔐 API Endpoints Used

### 👤 Users
- `POST /users` – Create new user  
- `GET /users/:id` – Fetch user details  
- `PUT /users/:id` – Update user profile  

### 📚 Books
- `POST /books` – Add a new book 

### ✍️ Reviews
- `GET /reviews` – Fetch all reviews  
- `POST /reviews` – Add a new review  

---

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vineka2004/book-review-frontend.git
   cd book-review-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root folder and add:
   ```env
   REACT_APP_API_URL=https://book-review-backend-kq9i.onrender.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

---


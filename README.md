Book Review Frontend
This is the React-based frontend for the Book Review Platform, where users can browse books, view details, and submit reviews.






🔗 Live Website
https://book-review-frontend-tau.vercel.app
🔗 Backend API
 https://book-review-backend-kq9i.onrender.com
 

🛠️ Tech Stack
⚛️ React.js
🎨 CSS
🌐 Axios for API requests
🚀 Vercel for frontend hosting


## 🚀 API Endpoints

### Users
- `POST /users` – Create a new user  
- `GET /users/:id` – Get user by ID  
- `PUT /users/:id` – Update user profile  

### Books
- `POST /books` – Add a new book  

### Reviews
- `GET /reviews` – Fetch all reviews  
- `POST /reviews` – Add a review  

---

⚙️ Setup Instructions (Run Locally)
1. Clone the repository
 git clone https://github.com/vineka2004/book-review-frontend.git
 cd book-review-frontend
2. Install dependencies
 npm install
3. Create a .env file in the root folder
   REACT_APP_API_URL=https://book-review-backend-kq9i.onrender.com
4. Start the development server
  npm start

📌 Features
📚 Browse and view book details
✍️ Add and read reviews
👤 User registration and login
🔐 Protected routes based on login

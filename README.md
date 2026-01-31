# Task Management Web Application (Full Stack)

A full stack Task Management Web Application where users can register/login and manage tasks (Create, View, Update, Delete).  
This project is built for assignment submission using **HTML, CSS, JavaScript** (Frontend), **Node.js + Express REST API** (Backend), and **MySQL** (Database).

---

## 🚀 Features

### ✅ Authentication
- User Registration
- User Login
- JWT Token based authentication
- Protected APIs (only logged-in users can manage tasks)

### ✅ Task Management (CRUD)
- Create a task
- View task list
- Update a task
- Delete a task

### ✅ Task Fields
- Title
- Description
- Status: `Pending`, `In Progress`, `Completed`

### ✅ Filters
- Filter tasks by Status
- Search tasks by Title

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS (Responsive UI)
- JavaScript (Fetch API)

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs (Password Hashing)

### Database
- MySQL (Persistent storage)

---

## 📁 Project Structure
taskmanager/
│
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── app.js
│ │ ├── db.js
│ │ ├── utils/jwt.js
│ │ ├── middleware/auth.js
│ │ ├── controllers/authController.js
│ │ ├── controllers/taskController.js
│ │ ├── routes/authRoutes.js
│ │ └── routes/taskRoutes.js
│ ├── database.sql
│ ├── .env.example
│ ├── package.json
│
└── frontend/
├── index.html
├── dashboard.html
├── css.css
└── app.js


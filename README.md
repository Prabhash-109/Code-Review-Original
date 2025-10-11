<<<<<<< HEAD
# 🤖 CodeLens — AI Code Review Application

**CodeLens** is a full-stack web application that lets developers paste code and get **AI-powered code reviews**, keep a local history of reviews, sign up/login, and subscribe for email updates.  
The backend is built with **Express + MongoDB** and uses a **Generative AI client** for automated code review.  
The frontend is a **Vite + React app** with routing and local history persistence.

---

## 🧩 Tech Stack

### **Frontend**
- ⚛️ **React** (Functional Components + Hooks) with Vite  
- 🔀 **React Router DOM** (Routing)  
- 📡 **Axios** (API communication)  
- 📝 **react-markdown + rehype-highlight** (render AI responses)  
- ✏️ **react-simple-code-editor + prismjs** (code editor + highlighting)  
- 🔔 **react-toastify** (notifications)  
- 🎨 **CSS3** (responsive UI)  

### **Backend**
- ☕ **Node.js (Express)** — RESTful API  
- 🗄️ **MongoDB with Mongoose** (data persistence)  
- 🔒 **JWT Authentication** (`jsonwebtoken`) + **bcrypt** (password hashing)  
- 🤖 **Google Generative AI client** (for code review)  
- 📧 **Nodemailer** (subscription email confirmations)  
- ⚙️ **dotenv** (environment variables)  
- 🔄 **nodemon** (development server)

---

## 🏗️ Project Structure

<details>
<summary>📁 Click to expand full project structure</summary>

```text
CodeLens/
├── BackEnd/ (Express API)
│   ├── package.json
│   ├── server.js
│   ├── .env (MONGO_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS, etc.)
│   └── src/
│       ├── app.js
│       ├── controllers/
│       │   ├── ai.controller.js        # POST /ai/get-review
│       │   ├── authController.js      # signup & login
│       │   └── subscriberController.js # subscribe endpoint
│       ├── Middlewares/
│       │   └── authMiddleware.js      # auth validation
│       ├── Models/
│       │   ├── User.js
│       │   └── Subscriber.js
│       ├── routes/
│       │   ├── ai.routes.js
│       │   ├── authRouter.js
│       │   └── subscriberRoutes.js
│       └── services/
│           ├── ai.service.js          # Google generative AI call
│           └── emailService.js        # Nodemailer emails
│
├── FrontEnd/ (React + Vite)
│   ├── package.json
│   ├── index.html / public/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── pages/
│       │   ├── CodeReview.jsx
│       │   ├── History.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── About.jsx
│       ├── components/                # Header, Footer, UI components
│       ├── utils.js                    # toast helpers, etc.
│       └── styles/                     # CSS for pages/components

</details>
🚀 Features
User Features

✅ Signup and Login (JWT-based auth)

📝 Paste code into an editor and request an AI review

💾 Store a local history of code reviews (browser localStorage)

📧 Subscribe with email — confirmation email sent via Nodemailer

Admin / Dev Features

🔧 Email subscription system via emailService

🤖 AI-powered code review endpoint using Google generative AI client

🔒 Simple JWT auth + protected routes

⚙️ Installation & Setup
Backend Setup (Express + MongoDB)
cd BackEnd
# create .env file with:
# MONGO_URL=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# EMAIL_USER=your_email
# EMAIL_PASS=your_email_password
npm install
npm run dev  # or npm start


Default backend: http://localhost:5000 (PORT in .env)

Frontend Setup (React + Vite)
cd FrontEnd
# create .env file for Vite:
# VITE_BACKEND_URL=http://localhost:5000
npm install
npm run dev


Frontend runs on http://localhost:5173 (Vite default)

🔗 API Endpoints (Sample)
Method	Endpoint	Body / Params	Description
POST	/auth/signup	{ name, email, password }	Register new user
POST	/auth/login	{ email, password }	Authenticate & get JWT token
POST	/ai/get-review	{ code }	Send code string to AI service, get review
POST	/api/subscribe	{ email }	Subscribe email & send confirmation

Frontend calls ${VITE_BACKEND_URL}/ai/get-review.
JWT tokens are stored in localStorage (jwtToken).

🔒 Security

🔑 Passwords hashed with bcrypt

🔒 JWT used for authenticated routes

🔐 Environment variables (.env) must be kept secret

📧 Use secure credentials for email (app password / transactional provider)

👨‍💻 Author

Prabhash Jha
🎓 Computer Science Engineering Student
📧 Email: prabhashjha92560@gmail.com
💼 GitHub: https://github.com/Prabhash-109
=======
# CodeLens - AI Code Review Website

## Description
CodeLens is a full-stack MERN website that lets users submit code and get AI-powered reviews. It helps improve code quality with instant feedback and highlights best practices.

## Features
- User authentication (Signup/Login)  
- Submit code for AI review  
- View past reviews (history)  
- Syntax highlighting  
- Responsive UI

## Tech Stack
- Frontend: React, Vite, PrismJS  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Deployment: Render (Backend), Render (Frontend)

## Setup

### Backend
1. Navigate to the backend folder:
```bash
cd Backend
npm install

2. Create a .env file in the Backend folder:
MONGO_URI=<your-mongodb-uri>
PORT=5000

3. Start the backend server:
npm start



Frontend
1. Navigate to the frontend folder:
cd Frontend
npm install

2. Create a .env file in the Frontend folder:
VITE_API_URL=http://localhost:5000

3. Start the frontend dev server:
npm run dev

Folder Structure
CodeLens/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md




Author
Prabhash Jha
>>>>>>> bb24e5671d8591903059a78882b123e5ea2466de

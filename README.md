# CodeLens - AI Code Review App

## Description
CodeLens is a full-stack MERN app that lets users submit code and get AI-powered reviews. It helps improve code quality with instant feedback and highlights best practices.

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
- Deployment: Render (Backend), Vercel / Render (Frontend)

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

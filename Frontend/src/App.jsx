import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header.jsx';
import { Routes, Route, Navigate, useNavigate ,useLocation} from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import CodeReview from '../pages/CodeReview.jsx';
import History from '../pages/History.jsx';
import Footer from '../components/Footer.jsx';
import About from '../pages/About.jsx';

import './App.css';
import './index.css';
import 'highlight.js/styles/github-dark.css';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme || 'light');
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  // Splash logic: show for 5 sec then go to /login
  useEffect(() => {
  const token = localStorage.getItem('jwtToken');

  // Run only on "/" and only if not logged in
  if (!token && location.pathname === '/') {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }
}, []);

  return (
    <><div id="main" className={theme}>
      <div className="container">
        <Header theme={theme} setTheme={setTheme} />
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={showSplash ? (
              <CodeReview /> // splash content
            ) : isLoggedIn ? (
              <CodeReview /> // main app content
            ) : (
              <Navigate to="/login" replace />
            )} />

          {/* Login route */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Other routes */}
          <Route path="/signup" element={<Signup theme={theme} setTheme={setTheme} />} />
          <Route path="/about" element={<About theme={theme} setTheme={setTheme} />} />
          <Route
            path="/history"
            element={isLoggedIn ? (
              <History theme={theme} setTheme={setTheme} />
            ) : (
              <Navigate to="/login" replace />
            )} />
        </Routes>
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div><ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover /></>
  );
}

export default App;

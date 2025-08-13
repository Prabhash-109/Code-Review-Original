import React, { useState } from 'react';
import axios from 'axios';
import './Footer.css';
import 'react-toastify/dist/ReactToastify.css';
import { handleSucces, handleError } from '../src/utils';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Footer = ({ theme }) => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    if (!email.trim()) {
      handleError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/subscribe`, { email });
      handleSucces(res.data.message);
      setEmail("");
    } catch (err) {
      handleError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className={`footer-top ${theme}`}>
        <div className="contact" id="contactid">
          <div className="contacthead">
            <p>Our team is always ready to support you.</p>
            <h1>Contact CodeLens</h1>
            <p>Have a question, bug report or feedback? We'd love to hear from you!</p>
          </div>

          <div className="contactoptions">
            <div className="email">
              <i className="fas fa-envelope custom-icon"></i>
              <h2>Email</h2>
              <p>Reach us for support or suggestions.</p>
              <p>support@codelens.dev</p>
            </div>
            <div className="call">
              <i className="fa fa-phone custom-icon"></i>
              <h2>Call</h2>
              <p>Speak with our support team directly.</p>
              <p>+91623963XXXX</p>
            </div>
            <div className="loc">
              <i className="fas fa-map-marker-alt custom-icon"></i>
              <h2>Office</h2>
              <p>Panchkula, Haryana</p>
            </div>
          </div>
        </div>

        <hr />

        <footer className="footer" id="footer">
          <div className="newsletter">
            <p>Subscribe for dev tips, feature updates, and AI code review insights.</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="navfoot">
            <a href="/">Home</a> <br />
            <a href="/history">History</a> <br />
            <a href="/about">About Us</a> <br />
            <a href="#contactid">Contact Us</a> <br />
          </div>

          <div className="follow">
            <b>Follow Us</b> <br />
            <i className="fab fa-instagram custom-icon"></i> <a href="https://instagram.com" target="_blank">Instagram</a> <br />
            <i className="fab fa-linkedin custom-icon"></i> <a href="https://linkedin.com" target="_blank">LinkedIn</a> <br />
            <i className="fab fa-github custom-icon"></i> <a href="https://github.com" target="_blank">GitHub</a> <br />
            <i className="fab fa-twitter custom-icon"></i> <a href="https://twitter.com" target="_blank">Twitter</a> <br />
            <i className="fab fa-facebook custom-icon"></i> <a href="https://facebook.com" target="_blank">Facebook</a> <br />
          </div>
        </footer>
      </div>

      <hr />

      <div className="copyright">
        © {year} CodeLens. All rights reserved.
      </div>
    </>
  );
};

export default Footer;

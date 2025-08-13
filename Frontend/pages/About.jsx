import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const infoSections = [
  {
    title: "Our Mission",
    text: `At CodeLens, our mission is to bridge the gap between raw code and its refined potential. We empower developers to gain instant, AI-driven code reviews that not only detect issues but also guide toward industry best practices. Our goal is to enhance learning, productivity, and code quality across all skill levels.`,
    img: "./assets/mission.png",
  },
  {
    title: "Our Vision",
    text: `We envision a future where developers spend less time debugging and more time innovating. By combining AI with human-centered design, CodeLens strives to become a trusted companion in every developer's toolkit — offering seamless integration, insightful feedback, and educational growth.`,
    img: "./assets/vision.jpg",
  },
  {
    title: "Why CodeLens",
    text: `Unlike traditional code reviewers, CodeLens offers an intelligent and interactive platform to understand, improve, and document your code. From beginner projects to enterprise-grade systems, our features scale with you. We help teams reduce errors, improve collaboration, and code confidently.`,
    img: "./assets/whyCodelens.png",
  },
];

const About = ({ theme }) => {
  return (
    <div className={`about-wrapper ${theme}`}>
      <div className="about-header">
        <h1>About CodeLens</h1>
        <p>AI-powered code review platform that helps you write cleaner, better code.</p>
      </div>

      <div className="info-section-wrapper">
        {infoSections.map((section, idx) => (
          <motion.div
            className={`info-section-card ${theme}`}
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.3 }}
            viewport={{ once: true }}
          >
            <img src={section.img} alt={section.title} />
            <div className="info-text">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;

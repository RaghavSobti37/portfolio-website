import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/home.css";
import profileImage from "../images/raghav.png";
import backgroundImage from "../images/RWOVDDW.jpg";

const Home = () => {
  // Function to handle file downloads
  const handleDownload = (fileName, originalName) => {
    const link = document.createElement('a');
    link.href = `/downloads/${fileName}`;
    link.download = originalName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-page">
      <div className="hero-container">
        <div className="hero-background">
          <img
            src={backgroundImage}
            alt="Professional Videographer Cinematographer Background"
            className="desaturated-image"
          />
        </div>

        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImage}
              alt="Raghav Raj Sobti - Professional Videographer and Cinematographer"
              className="profile-image"
            />

            {/* Decorative Graphic Elements */}
            {/* <div className="graphic-element sun"></div>
            <div className="graphic-element moon"></div>
            <div className="graphic-line line-one"></div>
            <div className="graphic-line line-two"></div> */}
          </div>

          <div className="hero-text">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              RAGHAV RAJ SOBTI
            </motion.h1>
            <motion.div
              className="hero-intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                Crafting <span className="highlight-main">cinematic narratives</span> is my passion. My journey began with a love for <span className="highlight-secondary">gaming</span>, a curiosity for <span className="highlight-accent">code</span>, and a mind for <span className="highlight-main">problem-solving</span>. This led me to not only bring stories to life through the lens, but to also <span className="highlight-secondary">self-code</span> and <span className="highlight-accent">self-host</span> this entire website.
              </p>
              <p>
                My skills are complemented by a solid foundation in <span className="highlight-main">cinematography</span>, honed as a graduate of the  <span className="highlight-main">New York Film Academy</span>. Let's create something <span className="highlight-accent">unforgettable</span> together.
              </p>
            </motion.div>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/projects" className="animated-button primary">
                VIEW MY WORK
              </Link>
              
              <button 
                onClick={() => handleDownload('Raghav Raj sobti.pdf', 'Raghav_Raj_Sobti_Resume_2025.pdf')}
                className="animated-button download-resume"
                aria-label="Download Professional Videographer Resume"
              >
                {/* <span className="button-icon">📄</span> */}
                DOWNLOAD RESUME
              </button>
              
              <Link to="/contact" className="animated-button download-agreement">
                CONTACT ME
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

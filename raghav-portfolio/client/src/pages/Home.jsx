import React from "react";
import { motion } from "framer-motion";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/home.css";
import profileImage from "../images/raghav.png";
import backgroundImage from "../images/RWOVDDW.jpg";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-container">
        <div className="hero-background">
          <img
            src={backgroundImage}
            alt="Cinematic Background"
            className="desaturated-image"
          />
        </div>

        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img
              src={profileImage}
              alt="Raghav Raj Sobti"
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PHOTOGRAPHER & VIDEOGRAPHER
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Bringing stories to life through compelling visuals and cinematic
              storytelling
            </motion.p>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="/projects" className="animated-button">
                VIEW MY WORK
              </a>
              <a href="/contact" className="animated-button">
                CONTACT ME
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

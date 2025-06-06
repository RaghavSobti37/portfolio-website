// Updated About.js and about.css with enhanced timeline readability

import React from "react";
import { motion } from "framer-motion";
import "../styles/responsive.css";
import "../styles/about.css";
import "../styles/main.css";
import profileImage from "../images/i25.jpg";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <motion.h1
          className="desktop-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          RAGHAV
        </motion.h1>

        <div className="about-content">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="square-box">
              <img
                src={profileImage}
                alt="Raghav at work"
                className="profile-shot"
              />
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              A passionate and dedicated cinematographer with hands-on
              experience, always eager to learn and contribute creative ideas.
              Skilled in visual storytelling, I aim to bring my expertise to
              dynamic filmmaking projects and deliver impactful visuals.
            </p>
            <p>
              My journey in visual arts began with a curiosity about how images
              can evoke emotions and tell stories. Over the years, I've
              developed a distinctive style that blends technical precision with
              artistic expression.
            </p>
          </motion.div>
        </div>

        <div className="experience-section">
          <h2>WORK EXPERIENCE</h2>
          <div className="timeline">
            <div className="timeline-item highlighted">
              <div className="timeline-date">🎥 2025</div>
              <div className="timeline-gap" />
              <div className="timeline-content">
                <h3>
                  <strong>Director</strong>
                </h3>
                <h4>
                  <strong>"Ek Kamra" – Music Video</strong>
                </h4>
                <p>
                  Directed and shot with a minimalist aesthetic and a strong
                  emotional narrative.
                </p>
              </div>
            </div>

            <div className="timeline-item highlighted">
              <div className="timeline-date">📹 2024–2025</div>
              <div className="timeline-gap" />
              <div className="timeline-content">
                <h3>
                  <strong>Videographer</strong>
                </h3>
                <h4>
                  <strong>BoxoutFM & Premise</strong>
                </h4>
                <ul>
                  <li>Covered live DJ set events & afterparties</li>
                  <li>Captured underground electronic music culture</li>
                  <li>
                    Filmed interviews with Laksh Maheshwari, Smoke, Rebel7
                  </li>
                  <li>Shot BTS for The Sundog Project, Jahnvi, and more</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item highlighted">
              <div className="timeline-date">🎬 2023–2024</div>
              <div className="timeline-gap" />
              <div className="timeline-content">
                <h3>
                  <strong>Assistant Director</strong>
                </h3>
                <h4>
                  <strong>EBC Originals & ArtisteFirst</strong>
                </h4>
                <ul>
                  <li>
                    2nd AD in <i>Riqqat</i> Album launch{" "}
                  </li>
                  <li>Helped with scene setups and creative direction</li>
                  <li>
                    Worked in Ladakh for the musical film <i>Rooh</i>{" "}
                  </li>
                  <li>
                    Assisted on MV projects like <i>Khwaab</i>, <i>Dhamaal</i>,{" "}
                  </li>
                </ul>
              </div>
            </div>

            <div className="timeline-item highlighted">
              <div className="timeline-date">🎬 2022</div>
              <div className="timeline-gap" />
              <div className="timeline-content">
                <h3>
                  <strong>Intern Assistant Director</strong>
                </h3>
                <h4>
                  <strong>Classic Films</strong>
                </h4>
                <ul>
                  <li>Pre-production, shot listing, and art direction</li>
                  <li>Created 4 offline edits for NPS ads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "../styles/main.css";
import emailjs from "emailjs-com";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

    const templateParams = {
      name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "raghavsobti37@gmail.com",
    };

    // Send primary message to yourself
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        console.log("Primary message sent.");
      })
      .then(() => {
        console.log("Auto-reply sent.");
        setIsSubmitting(false);
        setSubmitMessage({
          type: "success",
          text: "Your message has been sent successfully! I will get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        setIsSubmitting(false);
        setSubmitMessage({
          type: "error",
          text: "Failed to send message. Please try again later or contact me directly.",
        });
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          GET IN TOUCH
        </motion.h1>

        <div className="contact-content-grid">
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>SEND ME A MESSAGE</h2>
              {submitMessage && (
                <div className={`submit-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="animated-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="contact-info-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2>CONTACT INFORMATION</h2>

            <div className="contact-details">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+918591499393">+91 85914 99393</a>
                </div>
              </div>
              <a
                href="mailto:raghavsobti37@gmail.com"
                className="contact-item-link"
              >
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h3>Email</h3>
                    <span>raghavsobti37@gmail.com</span>
                  </div>
                </div>
              </a>
              <a
                href="https://instagram.com/bluepolaroid05"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-link"
              >
                <div className="contact-item">
                  <FaInstagram className="contact-icon" />
                  <div>
                    <h3>Instagram</h3>
                    <span>@bluepolaroid05</span>
                  </div>
                </div>
              </a>
              <a
                href="https://youtube.com/@bluepolaroid05"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-link"
              >
                <div className="contact-item">
                  <FaYoutube className="contact-icon" />
                  <div>
                    <h3>YouTube</h3>
                    <span>@bluepolaroid05</span>
                  </div>
                </div>
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://instagram.com/bluepolaroid05"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </a>
              <a
                href="https://youtube.com/@bluepolaroid05"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="social-icon" />
              </a>
              <a
                href="https://wa.me/918591499393"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="social-icon" />
              </a>
              <a href="mailto:raghavsobti37@gmail.com">
                <FaEnvelope className="social-icon" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

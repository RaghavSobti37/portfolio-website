import React from 'react';
import '../styles/main.css';
import '../styles/services.css';
import '../styles/responsive.css';

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-container">
        <h1>SERVICES</h1>
        
        <div className="service-category">
          <h2>VIDEOGRAPHY SERVICES</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>Cinematic Reel with Thumbnail</h3>
              <p>Short-form, high-quality edited video with custom thumbnail</p>
            </div>
            <div className="service-card">
              <h3>Storyboard / Reference Reel</h3>
              <p>Pre-visualization and reference creation for your project</p>
            </div>
            <div className="service-card">
              <h3>Music Video Production</h3>
              <p>Full-length music video with professional editing</p>
            </div>
            <div className="service-card">
              <h3>Behind-The-Scenes (BTS) Footage</h3>
              <p>Optional BTS footage up to 30s</p>
            </div>
            <div className="service-card">
              <h3>Event Coverage</h3>
              <p>Professional photography and videography for events</p>
            </div>
          </div>
        </div>
        
        <div className="service-category">
          <h2>PHOTOGRAPHY SERVICES</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>Photoshoot</h3>
              <p>Raw photos and videos from professional photoshoots</p>
            </div>
            <div className="service-card">
              <h3>Event Photography & Videography</h3>
              <p>Coverage of personal, corporate, or entertainment events</p>
            </div>
            <div className="service-card">
              <h3>Product & Brand Photography</h3>
              <p>High-resolution images tailored for marketing and branding</p>
            </div>
          </div>
        </div>
        
        <div className="workflow-section">
          <h2>WORKFLOW</h2>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Understanding the Brief</h3>
                <p>Initial consultation to discuss concept, mood board, locations, and schedule</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Concept Locking</h3>
                <p>Finalize concept and mood board, provide quote based on agreed scope</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Payment Terms</h3>
                <p>50% non-refundable advance, remaining 50% before final delivery</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Shoot Planning</h3>
                <p>Complete planning within 48 hours of payment confirmation</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Output Delivery</h3>
                <p>Final edited package delivered via email within 14 days</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="conditions-section">
          <h2>CONDITIONS</h2>
          <div className="condition-cards">
            <div className="condition-card">
              <h3>Credits</h3>
              <p>All posts must include "Shot by @bluepolaroid05" in captions</p>
            </div>
            <div className="condition-card">
              <h3>Revisions</h3>
              <p>3 rounds of revisions included, additional revisions charged hourly</p>
            </div>
            <div className="condition-card">
              <h3>Payment</h3>
              <p>Payments non-refundable once work commences, late fees apply</p>
            </div>
            <div className="condition-card">
              <h3>Travel</h3>
              <p>Travel and accommodation billed separately for out-of-city shoots</p>
            </div>
          </div>
        </div>
        
        <div className="contact-cta">
          <h2>READY TO CREATE SOMETHING AMAZING?</h2>
          <a href="/contact" className="cta-button">GET IN TOUCH</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
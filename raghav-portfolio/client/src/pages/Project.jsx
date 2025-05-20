import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/projects.css';

const projects = [
  {
    id: 1,
    title: "Music Video - 'Ek Kamra'",
    role: "Director",
    year: "2025",
    description: "Directed and shot the video with a minimalist aesthetic and a strong emotional narrative",
    image: "/images/ek-kamra.jpg",
    category: "music-video",
    details: {
      date: "March 2025",
      location: "Mumbai, India",
      company: "Independent",
      artist: "XYZ Band",
      director: "Your Name",
      type: "Music Video",
      videos: [
        { url: "https://www.youtube.com/embed/example1", platform: "youtube" },
        { url: "https://www.youtube.com/embed/example2", platform: "youtube" }
      ]
    }
  },
  {
    id: 2,
    title: "BoxoutFM & Premise",
    role: "Videographer",
    year: "2024-2025",
    description: "Covered live DJ sets and captured underground electronic music culture",
    image: "/images/boxout.jpg",
    category: "event",
    details: {
      date: "January 2025",
      location: "Delhi, India",
      company: "BoxoutFM",
      artist: "Various Artists",
      director: "Your Name",
      type: "Event Coverage",
      videos: [
        { url: "https://www.youtube.com/embed/example3", platform: "youtube" }
      ]
    }
  },
  {
    id: 3,
    title: "The Sunday Project",
    role: "Cinematographer",
    year: "2024",
    description: "Captured intimate performances in unique locations",
    image: "/images/sunday-project.jpg",
    category: "music",
    details: {
      date: "November 2024",
      location: "Goa, India",
      company: "Sunday Sessions",
      artist: "Various Artists",
      director: "Your Name",
      type: "Live Session",
      videos: [
        { url: "https://www.youtube.com/embed/example4", platform: "youtube" }
      ]
    }
  },
  {
    id: 4,
    title: "Rigaat Album Launch",
    role: "Assistant Director",
    year: "2023",
    description: "Contributed to pre-production planning and scene setups",
    image: "/images/rigaat.jpg",
    category: "music",
    details: {
      date: "August 2023",
      location: "Bangalore, India",
      company: "Rigaat Music",
      artist: "Rigaat",
      director: "Director Name",
      type: "Album Launch",
      videos: [
        { url: "https://www.youtube.com/embed/example5", platform: "youtube" }
      ]
    }
  },
  {
    id: 5,
    title: "Ladakh Shoot - Rooh",
    role: "Cinematographer",
    year: "2023",
    description: "Worked in extreme conditions to capture breathtaking landscapes",
    image: "/images/ladakh.jpg",
    category: "music-video",
    details: {
      date: "June 2023",
      location: "Ladakh, India",
      company: "Independent",
      artist: "Rooh Band",
      director: "Director Name",
      type: "Music Video",
      videos: [
        { url: "https://www.youtube.com/embed/example6", platform: "youtube" }
      ]
    }
  },
  {
    id: 6,
    title: "Artist Interviews",
    role: "Director of Photography",
    year: "2024",
    description: "Filmed interviews with various Indian artists",
    image: "/images/interviews.jpg",
    category: "documentary",
    details: {
      date: "February 2024",
      location: "Multiple Locations",
      company: "Arts Council",
      artist: "Various Artists",
      director: "Your Name",
      type: "Documentary Series",
      videos: [
        { url: "https://www.youtube.com/embed/example7", platform: "youtube" }
      ]
    }
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="projects-page">
      <div className="projects-container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PROJECTS
        </motion.h1>
        
        <div className="category-filter">
          <button 
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={activeCategory === 'music-video' ? 'active' : ''}
            onClick={() => setActiveCategory('music-video')}
          >
            Music Videos
          </button>
          <button 
            className={activeCategory === 'event' ? 'active' : ''}
            onClick={() => setActiveCategory('event')}
          >
            Events
          </button>
          <button 
            className={activeCategory === 'documentary' ? 'active' : ''}
            onClick={() => setActiveCategory('documentary')}
          >
            Documentary
          </button>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openProjectModal(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span>VIEW PROJECT</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span className="role">{project.role}</span>
                  <span className="year">{project.year}</span>
                </div>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-content">
              <button className="close-button" onClick={closeProjectModal}>
                &times;
              </button>
              
              <div className="modal-videos">
                {selectedProject.details.videos.map((video, index) => (
                  <div key={index} className="video-container">
                    <iframe
                      src={video.url}
                      title={`${selectedProject.title} - Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
              
              <div className="modal-details">
                <h2>{selectedProject.title}</h2>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{selectedProject.details.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{selectedProject.details.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Company</span>
                    <span className="detail-value">{selectedProject.details.company}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Artist</span>
                    <span className="detail-value">{selectedProject.details.artist}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Director</span>
                    <span className="detail-value">{selectedProject.details.director}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Type</span>
                    <span className="detail-value">{selectedProject.details.type}</span>
                  </div>
                </div>
                
                <div className="project-description">
                  <h3>About the Project</h3>
                  <p>{selectedProject.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
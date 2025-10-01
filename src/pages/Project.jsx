import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/projects.css";
import { useInView } from "react-intersection-observer";
import { projects, categories } from "../data/projectsData";
console.log("Projects data:", projects);
const ProjectImage = ({ src, alt }) => {
  const { ref, inView } = useInView({

    triggerOnce: true, // load only once when visible
    rootMargin: "100px", // load a bit before they come into view
  });

  return (
    <div ref={ref} className="project-image">
      {inView ? (
        <img src={src} alt={alt} />
      ) : (
        <div style={{ height: "200px", background: "#eee" }}></div>
      )}
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "all") {
      return true;
    }
    // Special case for "AD" to catch all related roles
    if (activeCategory === "AD") {
      return project.role.includes("AD") || project.role.includes("Assistant Director") || project.role.includes("Director's Assistant");
    }
    // Special case for "Director" to exclude "Assistant" roles
    if (activeCategory === "Director") {
      return project.role.includes("Director") && !project.role.includes("Assistant");
    }
    return project.role.includes(activeCategory);
  });

  const handleProjectClick = (project) => {
    let urlToOpen = "";
    
    if (project.platform === "instagram") {
      urlToOpen = project.videoUrl;
    } else if (project.platform === "youtube") {
      // Extract video ID from embed URL and construct watch URL
      const embedId = project.videoUrl.split("/").pop().split("?")[0];
      urlToOpen = `https://www.youtube.com/watch?v=${embedId}`;
    } else {
      urlToOpen = project.videoUrl;
    }
    
    if (urlToOpen) {
      window.open(urlToOpen, "_blank", "noopener,noreferrer");
    } else {
      console.warn("No valid URL found for project:", project.title);
    }
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
          <div>
            <button className={activeCategory === 'all' ? 'active' : ''} onClick={() => setActiveCategory("all")}>All</button>
            <button className={activeCategory === 'Videographer' ? 'active' : ''} onClick={() => setActiveCategory("Videographer")}>Videographer</button>
            <button className={activeCategory === 'Director' ? 'active' : ''} onClick={() => setActiveCategory("Director")}>Director</button>
            <button className={activeCategory === 'Cinematographer' ? 'active' : ''} onClick={() => setActiveCategory("Cinematographer")}>Cinematographer</button>
            <button className={activeCategory === 'AD' ? 'active' : ''} onClick={() => setActiveCategory("AD")}>AD</button>
          </div>
          <a href="/gallery" className="gallery-button">Go to Gallery →</a>
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
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image">
                <ProjectImage src={project.image} alt={project.title} />
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
    </div>
  );
};

export default Projects;

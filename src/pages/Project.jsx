import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/projects.css";
import { useInView } from "react-intersection-observer";
import { projects, categories } from "../data/projectsData";

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

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}

          <a href="/gallery" className="gallery-button">
            Go to Gallery →
          </a>
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

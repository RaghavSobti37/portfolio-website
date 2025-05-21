import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/projects.css";
import { useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "Ek Kamra",
    role: "Director and Cinematographer",
    year: "2025",
    description:
      "Directed and shot the video with a minimalist aesthetic and a strong emotional narrative",
    image: "/thumbnails/ek-kamra.png",
    category: "music-video",
    details: {
      date: "March 2025",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "AK$HAR",
      director: "Raghav Raj Sobti & Dhiren",
      type: "Music Video",
      videos: [
        {
          url: "https://www.youtube.com/embed/28Mb1cIooGw",
          platform: "youtube",
        },
      ],
    },
  },
  // {
  //   id: 2,
  //   title: "BoxoutFM & Premise",
  //   role: "Videographer",
  //   year: "2024-2025",
  //   description:
  //     "Covered live DJ sets and captured underground electronic music culture",
  //   image: "/images/boxout.jpg",
  //   category: "event",
  //   details: {
  //     date: "January 2025",
  //     location: "Delhi, India",
  //     company: "BoxoutFM",
  //     artist: "Various Artists",
  //     director: "Your Name",
  //     type: "Event Coverage",
  //     videos: [
  //       { url: "https://www.youtube.com/embed/example3", platform: "youtube" },
  //     ],
  //   },
  // },
  {
    id: 3,
    title: "Dead Dreams",
    role: "Director and Cinematographer",
    year: "2024",
    description:
      "From the depths of darkness, even the faintest spark can ignite a new beginning.",
    image: "/thumbnails/dead-dreams.png",
    category: "short-film",
    details: {
      date: "November 2024",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Harsh Pratap Singh",
      director: "Raghav / Ketan / Dhiren",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/79ooo0YE5fY",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Beneath the surface",
    role: "Cinematographer",
    year: "2024",
    description:
      "We all wear masks, hiding the emotions we don’t know how to express.",
    image: "/thumbnails/BTS.png",
    category: "short-film",
    details: {
      date: "November 2024",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Abid",
      director: "Raghav / Ketan / Dhiren",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/Uzu819p0hL8",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Narazi",
    role: "Cinematographer",
    year: "2024",
    description:
      "Black and white film on 'Kun Faya Kun' with a fresh visual take on loneliness.",
    image: "/thumbnails/narazi.png",
    category: "short-film",
    details: {
      date: "November 2024",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Harsh Pratap Singh",
      director: "Raghav / Ketan / Dhiren",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/CVIGswYIsUM",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 6,
    title: "Socially trapped // Socially free",
    role: "Director / Cinematographer",
    year: "2024",
    description: "Breaking free from the fake online life to embrace reality.",
    image: "/thumbnails/stsf.png",
    category: "short-film",
    details: {
      date: "November 2024",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Abid",
      director: "Raghav / Ketan / Dhiren",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/xjacCCS0Y9Q",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 7,
    title: "TIMEOUT",
    role: "Director / Cinematographer",
    year: "2024",
    description: "The difference between succeeding and failing is TRYING!",
    image: "/thumbnails/timeout.png",
    category: "short-film",
    details: {
      date: "November 2024",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Ishaan",
      director: "Raghav",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/BxU_oYhwwNs",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 8,
    title: "Jahnvi @ Hard Rock cafe",
    role: "Videographer",
    year: "2025",
    description: "A raw Documentary Form set recording for Jahnvi",
    image: "/thumbnails/jahnvi.png",
    category: "event",
    details: {
      date: "May 2025",
      location: "Delhi, India",
      company: "Independent",
      artist: "Jahnvi",
      director: "Raghav",
      type: "Event Coverage",
      videos: [
        {
          url: "https://www.youtube.com/embed/UC8VuiWBDPw",
          platform: "youtube",
        },
      ],
    },
  },
  {
    id: 9,
    title: "Jahnvi Interview",
    role: "Videographer",
    year: "2025",
    description:
      "90 sec interview where Jahnvi is raw and vulnerable before her festival set.",
    image: "/thumbnails/jahnvi2.png",
    category: "interview",
    details: {
      date: "April 2025",
      location: "Delhi, India",
      company: "Premise",
      artist: "Jahnvi",
      director: "Raghav",
      type: "Interview",
      videos: [{ url: "DJPJWiMTcIl", platform: "instagram" }], // Changed to just post ID
    },
  },
  {
    id: 10,
    title: "Laksh Interview",
    role: "Videographer",
    year: "2025",
    description:
      "A storyteller who revives folklore and culture through lyrical depth.",
    image: "/thumbnails/laksh.jpg",
    category: "interview",
    details: {
      date: "March 2025",
      location: "Delhi, India",
      company: "Premise",
      artist: "Laksh",
      director: "Raghav",
      type: "Interview",
      videos: [{ url: "DHdxbxSTuAu", platform: "instagram" }], // Changed to just post ID
    },
  },
  {
    id: 11,
    title: "Delhi Gate Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Delhi Gate's underground rap event @ Piano Man.",
    image: "/thumbnails/delhigate.jpg",
    category: "showreel",
    details: {
      date: "January 2025",
      location: "Delhi, India",
      company: "Premise",
      artist: "Various",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DHdF3gyorF-", platform: "instagram" }], // Changed to just post ID
    },
  },
   {
    id: 11,
    title: "Bandhan Indian Wear Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Bandhan's New line of Indian Wear @ Humayun Tomb",
    image: "/thumbnails/porash.jpg",
    category: "showreel",
    details: {
      date: "February 2025",
      location: "Humayun Tomb, India",
      company: "Bandhan",
      artist: "Porash Mishra",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DGsNRvwtlX4", platform: "instagram" }], 
    },
  },
     {
    id: 12,
    title: "Bandhan Western Wear Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Bandhan's New line of Western Wear ",
    image: "/thumbnails/porash2.jpg",
    category: "showreel",
    details: {
      date: "February 2025",
      location: "Delhi, India",
      company: "Bandhan",
      artist: "Porash Mishra",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DIzAjRGIOOU", platform: "instagram" }], 
    },
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Load Instagram embed script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
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
          {["all", "short-film", "event", "interview"].map((cat) => (
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
              <h2>{selectedProject.title}</h2>
              <button className="close-button" onClick={closeProjectModal}>
                &times;
              </button>

              <div className="modal-videos">
                {selectedProject.details.videos.map((video, index) => (
                  <div key={index} className="video-container">
                    {video.platform === "instagram" ? (
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={`https://www.instagram.com/reel/${video.url}/`}
                        data-instgrm-version="13"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "100%",
                          textDecoration: "none",
                        }}
                      >
                        <a
                          href={`https://www.instagram.com/reel/${video.url}/`}
                          style={{
                            color: "var(--dark-primary)",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            padding: "1rem 2rem",
                            border: "2px solid var(--dark-primary)",
                            borderRadius: "4px",
                            textAlign: "center",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor =
                              "var(--dark-primary)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          View on Instagram
                        </a>
                      </blockquote>
                    ) : (
                      <iframe
                        src={video.url}
                        title={`${selectedProject.title} - Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ))}
              </div>

              <div className="modal-details">
                <div className="details-grid">
                  {Object.entries(selectedProject.details).map(
                    ([key, value]) =>
                      key !== "videos" && (
                        <div key={key} className="detail-item">
                          <span className="detail-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className="detail-value">{value}</span>
                        </div>
                      )
                  )}
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

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/gallery.css";
import { photos, photoCategories } from "../data/galleryData";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  // Navigation functions
  const goToPrevious = () => {
    if (!selectedImage) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    setSelectedImage(filteredPhotos[prevIndex]);
  };

  const goToNext = () => {
    if (!selectedImage) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage.id);
    const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredPhotos[nextIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, filteredPhotos]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container gallery-page"
    >
      <h1>Photography Gallery</h1>

      <div className="category-filter">
        <button
          onClick={() => setActiveCategory("all")}
          className={activeCategory === "all" ? "active" : ""}
        >
          All
        </button>
        {photoCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={activeCategory === category.id ? "active" : ""}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="gallery-item"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(photo)}
            layoutId={`photo-${photo.id}`}
          >
            <img src={photo.src} alt={photo.title} loading="lazy" />
            <div className="photo-overlay">
              <h3>{photo.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <motion.div
          className="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Title at the top */}
            <div className="modal-header">
              <h2>{selectedImage.title}</h2>
              <div className="image-counter">
                {filteredPhotos.findIndex(photo => photo.id === selectedImage.id) + 1} of {filteredPhotos.length}
              </div>
            </div>
            
            {/* Image container */}
            <div className="modal-image-container">
              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="modal-image"
              />
            </div>
            
            {/* Navigation buttons */}
            <button
              className="nav-button nav-button-left"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
            
            <button
              className="nav-button nav-button-right"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
            
            {/* Close button at the bottom */}
            <div className="modal-footer">
              <button
                onClick={() => setSelectedImage(null)}
                className="btn close-btn"
              >
                <FiX /> Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Gallery;

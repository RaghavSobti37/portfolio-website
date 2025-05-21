import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Sample photo data - replace with your actual photos
  const photos = [
    { id: 1, src: "/images/gallery/photo1.jpg", title: "Urban Landscape", category: "landscape" },
    { id: 2, src: "/images/gallery/photo2.jpg", title: "Portrait Series", category: "portrait" },
    { id: 3, src: "/images/gallery/photo3.jpg", title: "Event Coverage", category: "event" },
    { id: 4, src: "/images/gallery/photo4.jpg", title: "Street Photography", category: "street" },
    { id: 5, src: "/images/gallery/photo5.jpg", title: "Music Festival", category: "event" },
    { id: 6, src: "/images/gallery/photo6.jpg", title: "Studio Portrait", category: "portrait" },
    { id: 7, src: "/images/gallery/photo7.jpg", title: "Architecture", category: "landscape" },
    { id: 8, src: "/images/gallery/photo8.jpg", title: "Behind the Scenes", category: "bts" },
    { id: 9, src: "/images/gallery/photo9.jpg", title: "Concert Photography", category: "event" }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

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
          onClick={() => setActiveCategory('all')} 
          className={activeCategory === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setActiveCategory('portrait')} 
          className={activeCategory === 'portrait' ? 'active' : ''}
        >
          Portraits
        </button>
        <button 
          onClick={() => setActiveCategory('landscape')} 
          className={activeCategory === 'landscape' ? 'active' : ''}
        >
          Landscape
        </button>
        <button 
          onClick={() => setActiveCategory('event')} 
          className={activeCategory === 'event' ? 'active' : ''}
        >
          Events
        </button>
        <button 
          onClick={() => setActiveCategory('bts')} 
          className={activeCategory === 'bts' ? 'active' : ''}
        >
          Behind the Scenes
        </button>
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
            <img 
              src={photo.src} 
              alt={photo.title} 
              loading="lazy"
            />
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
          <motion.img
            src={selectedImage.src}
            alt={selectedImage.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            layoutId={`photo-${selectedImage.id}`}
          />
          <div className="image-info">
            <h2>{selectedImage.title}</h2>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="btn"
            >
              <FiX /> Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Gallery;
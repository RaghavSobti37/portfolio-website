import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample photo data - replace with your actual photos
  const photos = [
    { id: 1, src: "/thumbnails/i28.JPG", title: "Nature", category: "nature" },
    { id: 2, src: "/thumbnails/i47.jpg", title: "Nature", category: "nature" },
    {
      id: 3,
      src: "/thumbnails/i5.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    { id: 4, src: "/thumbnails/i46.jpg", title: "Art", category: "art" },
    { id: 5, src: "/thumbnails/i33.jpg", title: "Art", category: "art" },
    { id: 6, src: "/thumbnails/i34.jpg", title: "Nature", category: "nature" },
    { id: 7, src: "/thumbnails/i30.jpg", title: "Nature", category: "nature" },
    { id: 8, src: "/thumbnails/i44.jpg", title: "Art", category: "art" },
    {
      id: 9,
      src: "/thumbnails/i26.jpg",
      title: "Portrait",
      category: "portrait",
    },
    { id: 10, src: "/thumbnails/i13.jpg", title: "Art", category: "art" },
    {
      id: 11,
      src: "/thumbnails/i8.jpg",
      title: "Event Coverage",
      category: "event",
    },
    { id: 12, src: "/thumbnails/i41.jpg", title: "Art", category: "art" },
    {
      id: 13,
      src: "/thumbnails/i1.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    {
      id: 14,
      src: "/thumbnails/i14.jpg",
      title: "Event Coverage",
      category: "event",
    },
    {
      id: 15,
      src: "/thumbnails/i9.jpg",
      title: "Event Coverage",
      category: "event",
    },
    { id: 16, src: "/thumbnails/i16.jpg", title: "Nature", category: "nature" },
    { id: 17, src: "/thumbnails/i19.jpg", title: "Nature", category: "nature" },
    { id: 18, src: "/thumbnails/i29.jpg", title: "Nature", category: "nature" },
    { id: 19, src: "/thumbnails/i45.jpg", title: "Nature", category: "Nature" },
    { id: 20, src: "/thumbnails/i17.jpg", title: "Nature", category: "nature" },
    {
      id: 21,
      src: "/thumbnails/i3.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    {
      id: 22,
      src: "/thumbnails/i10.jpg",
      title: "Event Coverage",
      category: "event",
    },
    {
      id: 23,
      src: "/thumbnails/i12.jpg",
      title: "Event Coverage",
      category: "event",
    },
    { id: 24, src: "/thumbnails/i36.jpg", title: "Nature", category: "nature" },
    {
      id: 25,
      src: "/thumbnails/i24.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    { id: 27, src: "/thumbnails/i38.jpg", title: "Nature", category: "Nature" },
    {
      id: 28,
      src: "/thumbnails/i2.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    {
      id: 29,
      src: "/thumbnails/i6.jpg",
      title: "Concert Photography",
      category: "concert",
    },
    {
      id: 30,
      src: "/thumbnails/i11.jpg",
      title: "Event Coverage",
      category: "event",
    },
    { id: 31, src: "/thumbnails/i15.jpg", title: "Nature", category: "nature" },
    { id: 32, src: "/thumbnails/i22.jpg", title: "Nature", category: "nature" },
    {
      id: 33,
      src: "/thumbnails/i32.jpg",
      title: "Portrait",
      category: "portrait",
    },
    { id: 34, src: "/thumbnails/i21.jpg", title: "Nature", category: "nature" },
    {
      id: 35,
      src: "/thumbnails/i31.jpg",
      title: "Potrait",
      category: "potrait",
    },
    { id: 36, src: "/thumbnails/i43.jpg", title: "Nature", category: "nature" },
    {
      id: 37,
      src: "/thumbnails/i27.jpg",
      title: "Portrait",
      category: "portrait",
    },
    {
      id: 38,
      src: "/thumbnails/i40.jpg",
      title: "Portrait",
      category: "portrait",
    },
    { id: 39, src: "/thumbnails/i20.jpg", title: "Nature", category: "nature" },
    { id: 40, src: "/thumbnails/i7.jpg", title: "Nature", category: "nature" },
    { id: 41, src: "/thumbnails/i42.jpg", title: "Nature", category: "nature" },
    { id: 42, src: "/thumbnails/i37.jpg", title: "Nature", category: "nature" },
    {
      id: 43,
      src: "/thumbnails/i23.jpg",
      title: "Event Coverage",
      category: "event",
    },
    { id: 44, src: "/thumbnails/i35.jpg", title: "Nature", category: "nature" },
    { id: 45, src: "/thumbnails/i18.jpg", title: "Nature", category: "nature" },
    {
      id: 46,
      src: "/thumbnails/i39.jpg",
      title: "Portrait",
      category: "portrait",
    },
    {
      id: 47,
      src: "/thumbnails/i4.jpg",
      title: "Concert Photography",
      category: "concert",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

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
        <button
          onClick={() => setActiveCategory("portrait")}
          className={activeCategory === "portrait" ? "active" : ""}
        >
          Portraits
        </button>
        <button
          onClick={() => setActiveCategory("nature")}
          className={activeCategory === "nature" ? "active" : ""}
        >
          Nature
        </button>
        <button
          onClick={() => setActiveCategory("concert")}
          className={activeCategory === "concert" ? "active" : ""}
        >
          Concert
        </button>
        <button
          onClick={() => setActiveCategory("event")}
          className={activeCategory === "event" ? "active" : ""}
        >
          Events
        </button>
        <button
          onClick={() => setActiveCategory("art")}
          className={activeCategory === "art" ? "active" : ""}
        >
          Art
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

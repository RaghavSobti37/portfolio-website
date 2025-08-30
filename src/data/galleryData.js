// Gallery data with simplified structure - no EXIF/metadata
const photos = [
  // Portrait Photography
  { id: 1, src: "/gallery/professional-portrait-photographer-headshot-1.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 2, src: "/gallery/creative-portrait-photography-studio-2.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 3, src: "/gallery/professional-headshot-photographer-delhi-3.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 4, src: "/gallery/artistic-portrait-photography-session-4.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 5, src: "/gallery/professional-portrait-photographer-outdoor-5.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 6, src: "/gallery/creative-headshot-photography-studio-6.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 7, src: "/gallery/professional-portrait-session-natural-light-7.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 8, src: "/gallery/artistic-portrait-photographer-delhi-8.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 9, src: "/gallery/professional-headshot-photography-creative-9.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 10, src: "/gallery/portrait-photographer-professional-session-10.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 11, src: "/gallery/creative-portrait-photography-outdoor-11.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 12, src: "/gallery/professional-headshot-photographer-studio-12.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 13, src: "/gallery/artistic-portrait-session-natural-lighting-13.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 14, src: "/gallery/professional-portrait-photographer-creative-14.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 15, src: "/gallery/headshot-photographer-professional-delhi-15.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 16, src: "/gallery/creative-portrait-photography-session-16.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 17, src: "/gallery/professional-portrait-photographer-outdoor-17.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 18, src: "/gallery/artistic-headshot-photography-studio-18.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 19, src: "/gallery/professional-portrait-session-creative-19.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 20, src: "/gallery/portrait-photographer-natural-light-20.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 21, src: "/gallery/creative-headshot-photographer-delhi-21.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 22, src: "/gallery/professional-portrait-photography-outdoor-22.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 23, src: "/gallery/artistic-portrait-photographer-session-23.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 24, src: "/gallery/professional-headshot-photography-creative-24.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 25, src: "/gallery/portrait-photographer-professional-studio-25.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 26, src: "/gallery/creative-portrait-session-natural-light-26.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 27, src: "/gallery/professional-headshot-photographer-outdoor-27.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 28, src: "/gallery/artistic-portrait-photography-delhi-28.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 29, src: "/gallery/professional-portrait-photographer-creative-29.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 30, src: "/gallery/headshot-photography-professional-session-30.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 31, src: "/gallery/creative-portrait-photographer-outdoor-31.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 32, src: "/gallery/professional-headshot-photography-studio-32.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 33, src: "/gallery/artistic-portrait-session-natural-lighting-33.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 34, src: "/gallery/professional-portrait-photographer-delhi-34.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 35, src: "/gallery/creative-headshot-photographer-session-35.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 36, src: "/gallery/professional-portrait-photography-outdoor-36.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 37, src: "/gallery/artistic-headshot-photography-creative-37.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 38, src: "/gallery/professional-portrait-photographer-studio-38.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 39, src: "/gallery/portrait-photography-professional-session-39.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 40, src: "/gallery/creative-headshot-photographer-delhi-40.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 41, src: "/gallery/professional-portrait-session-outdoor-41.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 42, src: "/gallery/artistic-portrait-photographer-creative-42.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 43, src: "/gallery/professional-headshot-photography-natural-43.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 44, src: "/gallery/portrait-photographer-professional-delhi-44.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 45, src: "/gallery/creative-portrait-photography-session-45.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 46, src: "/gallery/professional-headshot-photographer-outdoor-46.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 47, src: "/gallery/artistic-portrait-session-professional-47.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  
  // Additional Portrait Photos
  { id: 48, src: "/gallery/professional-portrait-photographer-creative-session-48.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 49, src: "/gallery/artistic-headshot-photography-professional-49.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 50, src: "/gallery/portrait-photographer-professional-outdoor-50.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 51, src: "/gallery/creative-portrait-photography-natural-light-51.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 52, src: "/gallery/professional-headshot-photographer-delhi-52.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 53, src: "/gallery/artistic-portrait-session-creative-53.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },

  // Events & Concerts
  { id: 54, src: "/gallery/professional-event-photographer-storytelling-festival.jpg", title: "Professional Event Photography - Storytelling Festival", category: "events" },
  // { id: 55, src: "/thumbnails/samarpan2.jpg", title: "Samarpan Event", category: "events" },
  // { id: 56, src: "/thumbnails/porash.jpg", title: "Porash Performance", category: "events" },
  // { id: 57, src: "/thumbnails/porash2.jpg", title: "Porash Portrait", category: "events" },

  // Street & Urban
  { id: 58, src: "/gallery/professional-street-photographer-urban-moments.jpg", title: "Professional Street Photography - Urban Moments", category: "street" },

];

// Photo categories for filtering
const photoCategories = [
  { id: "portraits", name: "Portraits" },
  { id: "events", name: "Events & Concerts" },
  { id: "street", name: "Street & Urban" },
];

// Shuffle function to randomize the order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Export shuffled photos for variety
const shuffledPhotos = shuffleArray(photos);
export { shuffledPhotos as photos, photoCategories };

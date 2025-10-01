// Gallery data with simplified structure - no EXIF/metadata
const photos = [
  // Portrait Photography
  { id: 1, src: "/gallery/1.jpg", title: "Professional Portrait Photographer Headshot 1", category: "portraits" },
  { id: 2, src: "/gallery/2.jpg", title: "Creative Portrait in Studio", category: "portraits" },
  { id: 3, src: "/gallery/3.jpg", title: "Professional Headshot in Delhi", category: "portraits" },
  { id: 4, src: "/gallery/4.jpg", title: "Artistic Portrait Session", category: "portraits" },
  { id: 5, src: "/gallery/5.jpg", title: "Outdoor Professional Portrait", category: "portraits" },
  { id: 6, src: "/gallery/6.jpg", title: "Creative Studio Headshot", category: "portraits" },
  { id: 7, src: "/gallery/7.jpg", title: "Natural Light Portrait", category: "portraits" },
  { id: 8, src: "/gallery/8.jpg", title: "Artistic Portrait in Delhi", category: "portraits" },
  { id: 9, src: "/gallery/9.jpg", title: "Creative Professional Headshot", category: "portraits" },
  { id: 10, src: "/gallery/10.jpg", title: "Professional Portrait Session", category: "portraits" },
  { id: 11, src: "/gallery/11.jpg", title: "Creative Outdoor Portrait", category: "portraits" },
  { id: 12, src: "/gallery/12.jpg", title: "Studio Headshot", category: "portraits" },
  { id: 13, src: "/gallery/13.jpg", title: "Artistic Natural Light Portrait", category: "portraits" },
  { id: 14, src: "/gallery/14.jpg", title: "Creative Professional Portrait", category: "portraits" },
  { id: 15, src: "/gallery/15.jpg", title: "Professional Delhi Headshot", category: "portraits" },
  { id: 16, src: "/gallery/16.jpg", title: "Creative Portrait Session", category: "portraits" },
  { id: 17, src: "/gallery/17.jpg", title: "Outdoor Professional Portrait", category: "portraits" },
  { id: 18, src: "/gallery/18.jpg", title: "Artistic Studio Headshot", category: "portraits" },
  { id: 19, src: "/gallery/19.jpg", title: "Creative Portrait Session", category: "portraits" },
  { id: 20, src: "/gallery/20.jpg", title: "Natural Light Portrait", category: "portraits" },
  { id: 21, src: "/gallery/21.jpg", title: "Creative Headshot in Delhi", category: "portraits" },
  { id: 22, src: "/gallery/22.jpg", title: "Outdoor Professional Portrait", category: "portraits" },
  { id: 23, src: "/gallery/23.jpg", title: "Artistic Portrait Session", category: "portraits" },
  { id: 24, src: "/gallery/24.jpg", title: "Creative Professional Headshot", category: "portraits" },
  { id: 25, src: "/gallery/25.jpg", title: "Professional Studio Portrait", category: "portraits" },
  { id: 26, src: "/gallery/26.jpg", title: "Creative Natural Light Session", category: "portraits" },
  { id: 27, src: "/gallery/27.jpg", title: "Outdoor Professional Headshot", category: "portraits" },
  { id: 28, src: "/gallery/28.jpg", title: "Artistic Portrait in Delhi", category: "portraits" },
  { id: 29, src: "/gallery/29.jpg", title: "Creative Professional Portrait", category: "portraits" },
  { id: 30, src: "/gallery/30.jpg", title: "Professional Headshot Session", category: "portraits" },
  { id: 31, src: "/gallery/31.jpg", title: "Creative Outdoor Portrait", category: "portraits" },
  { id: 32, src: "/gallery/32.jpg", title: "Professional Studio Headshot", category: "portraits" },
  { id: 33, src: "/gallery/33.jpg", title: "Artistic Natural Light Session", category: "portraits" },
  { id: 34, src: "/gallery/34.jpg", title: "Professional Portrait in Delhi", category: "portraits" },
  { id: 35, src: "/gallery/35.jpg", title: "Creative Headshot Session", category: "portraits" },
  { id: 36, src: "/gallery/36.jpg", title: "Outdoor Professional Portrait", category: "portraits" },
  { id: 37, src: "/gallery/37.jpg", title: "Creative Artistic Headshot", category: "portraits" },
  { id: 38, src: "/gallery/38.jpg", title: "Professional Studio Portrait", category: "portraits" },
  { id: 39, src: "/gallery/39.jpg", title: "Professional Portrait Session", category: "portraits" },
  { id: 40, src: "/gallery/40.jpg", title: "Creative Headshot in Delhi", category: "portraits" },
  { id: 41, src: "/gallery/41.jpg", title: "Outdoor Portrait Session", category: "portraits" },
  { id: 42, src: "/gallery/42.jpg", title: "Creative Artistic Portrait", category: "portraits" },
  { id: 43, src: "/gallery/43.jpg", title: "Natural Light Headshot", category: "portraits" },
  { id: 44, src: "/gallery/44.jpg", title: "Professional Portrait in Delhi", category: "portraits" },
  { id: 45, src: "/gallery/45.jpg", title: "Creative Portrait Session", category: "portraits" },
  { id: 46, src: "/gallery/46.jpg", title: "Outdoor Professional Headshot", category: "portraits" },
  { id: 47, src: "/gallery/47.jpg", title: "Professional Artistic Portrait", category: "portraits" },
  
  // Additional Portrait Photos
  { id: 48, src: "/gallery/48.jpg", title: "Creative Portrait Session", category: "portraits" },
  { id: 49, src: "/gallery/49.jpg", title: "Professional Artistic Headshot", category: "portraits" },
  { id: 50, src: "/gallery/50.jpg", title: "Outdoor Professional Portrait", category: "portraits" },
  { id: 51, src: "/gallery/51.jpg", title: "Creative Natural Light Portrait", category: "portraits" },
  { id: 52, src: "/gallery/52.jpg", title: "Professional Headshot in Delhi", category: "portraits" },
  { id: 53, src: "/gallery/53.jpg", title: "Creative Artistic Portrait Session", category: "portraits" },

  // Events & Concerts
  { id: 54, src: "/gallery/54.jpg", title: "Professional Event Photography - Storytelling Festival", category: "events" },
  { id: 55, src: "/gallery/55.jpg", title: "Samarpan Event", category: "events" },
  { id: 57, src: "/gallery/57.jpg", title: "Porash Portrait", category: "events" },

  // Street & Urban
  { id: 58, src: "/gallery/58.jpg", title: "Professional Street Photography - Urban Moments", category: "street" },

  // Behind the Scenes
  { id: 59, src: "/gallery/59.jpg", title: "Behind the Scenes - Music Video", category: "bts" },
  { id: 60, src: "/gallery/60.jpg", title: "Behind the Scenes - Short Film", category: "bts" },
  { id: 61, src: "/gallery/61.jpg", title: "Cinematographer on Set", category: "bts" },
  { id: 62, src: "/gallery/62.jpg", title: "Film Set - Behind the Scenes", category: "bts" },
  { id: 64, src: "/gallery/64.jpg", title: "On Location Film Shoot", category: "bts" },
  { id: 65, src: "/gallery/65.jpg", title: "Behind the Scenes - Interview", category: "bts" },
  { id: 66, src: "/gallery/66.jpg", title: "Documentary Film Set", category: "bts" },
];

// Photo categories for filtering
const photoCategories = [
  { id: "portraits", name: "Portraits" },
  { id: "events", name: "Events & Concerts" },
  { id: "bts", name: "Behind the Scenes" },
  { id: "street", name: "Street & Urban" },
];

// Export photos and categories. The photos will appear in the order they are listed above.
export { photos, photoCategories };

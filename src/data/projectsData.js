// Project data for the portfolio
const projectsData = [
  {
    id: 1,
    title: "Ek Kamra",
    role: "Director and Cinematographer",
    year: "2025",
    description: "Directed and shot the video with a minimalist aesthetic and a strong emotional narrative",
    image: "/thumbnails/professional-cinematographer-music-video-ek-kamra.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/28Mb1cIooGw",
    platform: "youtube"
  },
  {
    id: 2,
    title: "Paas aa re",
    role: "Director and Cinematographer",
    year: "2025",
    description: "Studio making of the song 'Paas aa re' by Samarpan Band",
    image: "/thumbnails/professional-videographer-music-video-paas-aa-re.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/bp633hDo9us?si=mDbrPGct9zazKVj5",
    platform: "youtube"
  },
  {
    id: 3,
    title: "Dead Dreams",
    role: "Director and Cinematographer",
    year: "2024",
    description: "From the depths of darkness, even the faintest spark can ignite a new beginning.",
    image: "/thumbnails/professional-cinematographer-short-film-dead-dreams.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/79ooo0YE5fY",
    platform: "youtube"
  },
  {
    id: 4,
    title: "Beneath the surface",
    role: "Cinematographer",
    year: "2024",
    description: "We all wear masks, hiding the emotions we don't know how to express.",
    image: "/thumbnails/professional-videographer-short-film-beneath-surface.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/Uzu819p0hL8",
    platform: "youtube"
  },
  {
    id: 5,
    title: "Narazi",
    role: "Cinematographer",
    year: "2024",
    description: "Black and white film on 'Kun Faya Kun' with a fresh visual take on loneliness.",
    image: "/thumbnails/professional-cinematographer-black-white-film-narazi.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/CVIGswYIsUM",
    platform: "youtube"
  },
  {
    id: 6,
    title: "Socially trapped // Socially free",
    role: "Director / Cinematographer",
    year: "2024",
    description: "Breaking free from the fake online life to embrace reality.",
    image: "/thumbnails/professional-videographer-short-film-socially-trapped.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/xjacCCS0Y9Q",
    platform: "youtube"
  },
  {
    id: 7,
    title: "TIMEOUT",
    role: "Director / Cinematographer",
    year: "2024",
    description: "The difference between succeeding and failing is TRYING!",
    image: "/thumbnails/professional-cinematographer-motivational-film-timeout.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/BxU_oYhwwNs",
    platform: "youtube"
  },
  {
    id: 8,
    title: "Jahnvi @ Hard Rock cafe",
    role: "Videographer",
    year: "2025",
    description: "A raw Documentary Form set recording for Jahnvi",
    image: "/thumbnails/professional-videographer-live-concert-recording.jpg",
    category: "event",
    videoUrl: "https://www.youtube.com/embed/UC8VuiWBDPw",
    platform: "youtube"
  },
  {
    id: 9,
    title: "Jahnvi Interview",
    role: "Videographer",
    year: "2025",
    description: "90 sec interview where Jahnvi is raw and vulnerable before her festival set.",
    image: "/thumbnails/professional-videographer-artist-interview-jahnvi.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DJPJWiMTcIl/",
    platform: "instagram"
  },
  {
    id: 10,
    title: "Laksh Interview",
    role: "Videographer",
    year: "2025",
    description: "A storyteller who revives folklore and culture through lyrical depth.",
    image: "/thumbnails/professional-videographer-storyteller-interview-laksh.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DHdxbxSTuAu/",
    platform: "instagram"
  },
  {
    id: 11,
    title: "Delhi Gate Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Delhi Gate's underground rap event @ Piano Man.",
    image: "/thumbnails/professional-videographer-underground-rap-event.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DHdF3gyorF-/",
    platform: "instagram"
  },
  {
    id: 12,
    title: "Bandhan Indian Wear Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Bandhan's New line of Indian Wear @ Humayun Tomb",
    image: "/thumbnails/professional-videographer-fashion-showreel-indian-wear.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DGsNRvwtlX4/",
    platform: "instagram"
  },
  {
    id: 13,
    title: "Bandhan Western Wear Showreel",
    role: "Videographer",
    year: "2025",
    description: "Showreel of Bandhan's New line of Western Wear",
    image: "/thumbnails/professional-videographer-fashion-showreel-western-wear.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DIzAjRGIOOU/",
    platform: "instagram"
  },
  {
    id: 14,
    title: "NPS for Flexibility",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/professional-videographer-commercial-ad-film-nps.jpg",
    category: "Ad Film",
    videoUrl: "https://www.youtube.com/embed/oLjqyQlZ75U",
    platform: "youtube"
  },
  {
    id: 15,
    title: "NPS for Transparency",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/professional-cinematographer-commercial-ad-transparency.jpg",
    category: "Ad Film",
    videoUrl: "https://www.youtube.com/embed/BZL_kGt-zRQ",
    platform: "youtube"
  },
  {
    id: 16,
    title: "NPS for Portability",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/professional-videographer-commercial-ad-portability.jpg",
    category: "Ad Film",
    videoUrl: "https://www.youtube.com/embed/7WAAMXyT4l8",
    platform: "youtube"
  },
  {
    id: 17,
    title: "NPS for Trust",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/professional-cinematographer-commercial-ad-trust.jpg",
    category: "Ad Film",
    videoUrl: "https://www.youtube.com/embed/qguwlDHest0",
    platform: "youtube"
  },
  {
    id: 18,
    title: "Khwaab",
    role: "Assistant Director",
    year: "2024",
    description: "Khwaab means unrequited love. A kind of love where feelings are not reciprocated.",
    image: "/thumbnails/professional-videographer-music-video-khwaab.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/EWIay_vyFMk",
    platform: "youtube"
  },
  {
    id: 19,
    title: "Rooh Music Film",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that describes deep love. In this state of passionate love, you see your lover as perfect.",
    image: "/thumbnails/professional-cinematographer-music-video-rooh.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/EWIay_vyFMk",
    platform: "youtube"
  },
  {
    id: 20,
    title: "Masa Rosh",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Masa Rosh is a playful song that captures the essence of making amends in a fun way.",
    image: "/thumbnails/professional-videographer-music-video-masa-rosh.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/Gt7_LUqnldo",
    platform: "youtube"
  },
  {
    id: 21,
    title: "Mora Piya",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The song talks about a heart yearning for its beloved.",
    image: "/thumbnails/professional-cinematographer-music-video-mora-piya.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/y0g1uj3OE_Y",
    platform: "youtube"
  },
  {
    id: 22,
    title: "Fanna Fillah",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The song gives hope, reminding us that even when we feel lost, we will eventually find our way.",
    image: "/thumbnails/professional-videographer-music-video-fanna-fillah.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/mm48gpsJ9bQ",
    platform: "youtube"
  },
  {
    id: 23,
    title: "Dhamaal",
    role: "2nd Assistant Director",
    year: "2025",
    description: "Dhamaal captures the intense emotional journey of someone searching for their love.",
    image: "/thumbnails/professional-cinematographer-music-video-dhamaal.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/EKET-n4cBHI",
    platform: "youtube"
  },
  {
    id: 24,
    title: "Tu kahan hai",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Tu Kahan Hai is a journey of self-discovery, a quest for meaning.",
    image: "/thumbnails/professional-videographer-music-video-tu-kahan-hai.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/GQn3vTTKo9g",
    platform: "youtube"
  },
  {
    id: 25,
    title: "Zamane Ki Zanjeer",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Zamane Ki Zanjeer delves into the themes of existentialism and social demons.",
    image: "/thumbnails/professional-cinematographer-music-video-zamane-zanjeer.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/xk1qELGYnDQ",
    platform: "youtube"
  },
  {
    id: 26,
    title: "Dard-e-Maa",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Dard-e-Maa is a mystical song blending Hafiz's and Shamas Faqir's Persian poetry.",
    image: "/thumbnails/professional-videographer-music-video-dard-e-maa.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/dBUTXHooqF0",
    platform: "youtube"
  },
  {
    id: 27,
    title: "Saba Ke Baad",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that describes deep love. In this state of passionate love, you see your lover as perfect.",
    image: "/thumbnails/professional-cinematographer-music-video-saba-baad.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/nFQTEXzwFqI",
    platform: "youtube"
  },
  {
    id: 28,
    title: "Rooh 2.0",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that shows you admire someone so much that you're willing to lose yourself for them.",
    image: "/thumbnails/professional-videographer-music-video-rooh-2.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/K2_L5On8N-M",
    platform: "youtube"
  },
  {
    id: 29,
    title: "RIQQAT The Decode",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics and music.",
    image: "/thumbnails/professional-videographer-artist-interview-riqqat-decode.jpg",
    category: "interview",
    videoUrl: "https://www.youtube.com/embed/D8HXMxND-aY",
    platform: "youtube"
  },
  {
    id: 30,
    title: "RIQQAT The Decode EP-2",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics and music.",
    image: "/thumbnails/professional-cinematographer-artist-interview-riqqat-2.jpg",
    category: "interview",
    videoUrl: "https://www.youtube.com/embed/ngeMq67_3sM",
    platform: "youtube"
  },
  {
    id: 31,
    title: "RIQQAT The Decode EP-3",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics and music.",
    image: "/thumbnails/professional-videographer-artist-interview-riqqat-3.jpg",
    category: "interview",
    videoUrl: "https://www.youtube.com/embed/TdHVE9_9iHA",
    platform: "youtube"
  },
  {
    id: 32,
    title: "Aabruu",
    role: "1st Director's Assistant",
    year: "2024",
    description: "The song captures the essence of a deep and enduring love, where the lover's dignity becomes a source of immense joy.",
    image: "/thumbnails/professional-cinematographer-music-video-aabruu.jpg",
    category: "Music Video",
    videoUrl: "https://www.youtube.com/embed/8d9tcK27H0I",
    platform: "youtube"
  },
  {
    id: 33,
    title: "Making of Aabruu",
    role: "1st Director's Assistant",
    year: "2024",
    description: "Aabruu is a heartfelt song that expresses having pride on your lover.",
    image: "/thumbnails/professional-videographer-behind-scenes-aabruu.jpg",
    category: "Behind the scenes",
    videoUrl: "https://www.youtube.com/embed/N2_sGRTLaIs",
    platform: "youtube"
  },
  {
    id: 34,
    title: "Making of Dhamaal",
    role: "1st Director's Assistant",
    year: "2024",
    description: "Presenting the journey and the making of the music film of Dhamaal.",
    image: "/thumbnails/professional-cinematographer-behind-scenes-dhamaal.jpg",
    category: "Behind the scenes",
    videoUrl: "https://www.youtube.com/embed/prEhLOAk3GI",
    platform: "youtube"
  },
  {
    id: 35,
    title: "Making of Rooh",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Presenting the journey and the making of the music film of Rooh.",
    image: "/thumbnails/professional-videographer-behind-scenes-rooh.jpg",
    category: "Behind the scenes",
    videoUrl: "https://www.youtube.com/embed/RRUdEIQ9vH8",
    platform: "youtube"
  },
  {
    id: 36,
    title: "The Last Page",
    role: "Director",
    year: "2025",
    description: "Musical short film on the song pal pal by talwinder",
    image: "/thumbnails/professional-cinematographer-short-film-last-page.jpg",
    category: "short-film",
    videoUrl: "https://www.youtube.com/embed/s6P4pilPNwQ",
    platform: "youtube"
  },
  {
    id: 37,
    title: "Samarpan Jim Corbett set",
    role: "Videographer",
    year: "2025",
    description: "Covered the journey and the set performance of Samarpan Band at Jim Corbett.",
    image: "/thumbnails/professional-videographer-live-concert-jim-corbett.jpg",
    category: "event",
    videoUrl: "https://www.youtube.com/embed/oSzBcfMb564?si=9WA_rzMauLF-2f0h",
    platform: "youtube"
  },
  {
    id: 38,
    title: "Holy Trinity of Filmmakers",
    role: "Director",
    year: "2025",
    description: "Three storytellers united by a love for cinema, crafting short films that speak from the heart.",
    image: "/thumbnails/professional-cinematographer-filmmakers-showreel.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DELCubty0cN/",
    platform: "instagram"
  },
  {
    id: 39,
    title: "Savera EC Reveal",
    role: "Videographer",
    year: "2024",
    description: "Savera Elective committee reveal",
    image: "/thumbnails/professional-videographer-committee-reveal-savera.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/C_lEzIZvEU4/",
    platform: "instagram"
  },
  {
    id: 40,
    title: "Concerts",
    role: "Videographer",
    year: "2024",
    description: "A collection of all the concerts i have been to around india",
    image: "/thumbnails/professional-videographer-concert-photographer-india.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/C5DY3hsSJWO/",
    platform: "instagram"
  },
  {
    id: 41,
    title: "Fest '24 Recap",
    role: "Videographer",
    year: "2024",
    description: "Award winning reel for the BML Munjal university's Fest '24",
    image: "/thumbnails/professional-videographer-festival-recap-award-winning.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/C4DcH0WSkiY/",
    platform: "instagram"
  },
  {
    id: 42,
    title: "Rooh BTS",
    role: "Videographer",
    year: "2024",
    description: "Behind the scenes on the set of Rooh",
    image: "/thumbnails/professional-cinematographer-behind-scenes-rooh-bts.jpg",
    category: "Behind the scenes",
    videoUrl: "https://www.instagram.com/reel/DE7hrOqP8Tu/",
    platform: "instagram"
  },
  {
    id: 43,
    title: "Rooh BTS",
    role: "Videographer",
    year: "2024",
    description: "Behind the scenes on the set of Rooh",
    image: "/thumbnails/professional-videographer-behind-scenes-rooh-bts-2.jpg",
    category: "Behind the scenes",
    videoUrl: "https://www.instagram.com/reel/DEmePaCsQ0R/",
    platform: "instagram"
  },
  {
    id: 44,
    title: "Colours of Market",
    role: "Videographer",
    year: "2025",
    description: "A short reel capturing the vibrant life of Delhi's markets",
    image: "/thumbnails/professional-videographer-delhi-market-colors-reel.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DLrW2bxSK37/",
    platform: "instagram"
  },
  {
    id: 45,
    title: "90 Seconds with nikamma",
    role: "Videographer",
    year: "2025",
    description: "No one to share your 3 AM thoughts with? Let Nikamma's songs be your midnight companions.",
    image: "/thumbnails/professional-videographer-artist-interview-nikamma.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DK4jBv5zNV_/",
    platform: "instagram"
  },
  {
    id: 46,
    title: "90 Seconds with Muzzle",
    role: "Videographer",
    year: "2025",
    description: "His sound doesn't shout; it whispers, gently wrapping around your heart.",
    image: "/thumbnails/professional-videographer-artist-interview-muzzle.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DKkIxRyzc0H/",
    platform: "instagram"
  },
  {
    id: 47,
    title: "Samarpan showreel",
    role: "Videographer",
    year: "2025",
    description: "Samarpan is more than a band—it's a way of being. Born from a shared sense of surrender.",
    image: "/thumbnails/professional-videographer-band-showreel-samarpan.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DKH4RVozCiU/",
    platform: "instagram"
  },
  {
    id: 48,
    title: "90 Seconds with Sinash",
    role: "Videographer",
    year: "2025",
    description: "Rising from Jaipur, Sinash is an upcoming rhythm prodigy who is coming in front of the mic after being the man behind some of your favourite underground bangers!!",
    image: "/thumbnails/sinash.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DNLZmU2T5bZ/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
    platform: "instagram"
  },
  {
    id: 49,
    title: "90 Seconds with Ankur Tiwari",
    role: "Videographer",
    year: "2025",
    description: "a lucky opportunity to spend some time with Ankur as he prepared for his set at @buskr.in and got to watch him live as he mesmerized the hundreds in attendance for him!",
    image: "/thumbnails/Image-665.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DMXy444xFMx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    platform: "instagram"
  },
  {
    id: 50,
    title: "Karun's Confession",
    role: "Videographer",
    year: "2025",
    description: "Special Trailer for the album launch of Karun with a story to unfold his true face to his listeners.",
    image: "/thumbnails/karun.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DM0AVz2TRmw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    platform: "instagram"
  },
  {
    id: 51,
    title: "Pyaar @ Kalarooms",
    role: "Videographer",
    year: "2025",
    description: "In this special collaboration at a one-of-a-kind antique shop that preserves the history of entertainment and design,",
    image: "/thumbnails/pyaar.jpg",
    category: "interview",
    videoUrl: "https://www.instagram.com/reel/DNk66ZzyVMw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    platform: "instagram"
  },
];

// Function to shuffle array while maintaining ID order
const shuffleProjects = (projects) => {
  const shuffled = [...projects];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Re-assign IDs in order 1, 2, 3, etc.
  return shuffled.map((project, index) => ({
    ...project,
    id: index + 1
  }));
};

// Export the shuffled projects
export const projects = shuffleProjects(projectsData);

// Export individual categories for filtering
export const categories = [
  "all",
  "Music Video",
  "Behind the scenes",
  "short-film",
  "event",
  "Ad Film",
  "interview",
  "showreel",
];

export default projects;

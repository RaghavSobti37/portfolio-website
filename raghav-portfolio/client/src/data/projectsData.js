// Project data for the portfolio
const projectsData = [
  {
    id: 1,
    title: "Ek Kamra",
    role: "Director and Cinematographer",
    year: "2025",
    description: "Directed and shot the video with a minimalist aesthetic and a strong emotional narrative",
    image: "/thumbnails/ek-kamra.png",
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
    image: "/thumbnails/0619(4).png",
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
    image: "/thumbnails/dead-dreams.png",
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
    image: "/thumbnails/BTS.png",
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
    image: "/thumbnails/narazi.png",
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
    image: "/thumbnails/stsf.png",
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
    image: "/thumbnails/timeout.png",
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
    image: "/thumbnails/jahnvi.png",
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
    image: "/thumbnails/jahnvi2.png",
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
    image: "/thumbnails/laksh.jpg",
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
    image: "/thumbnails/delhigate.jpg",
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
    image: "/thumbnails/porash.jpg",
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
    image: "/thumbnails/porash2.jpg",
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
    image: "/thumbnails/nps1.png",
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
    image: "/thumbnails/nps2.png",
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
    image: "/thumbnails/nps3.png",
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
    image: "/thumbnails/nps4.png",
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
    image: "/thumbnails/khwaab.png",
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
    image: "/thumbnails/rooh.png",
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
    image: "/thumbnails/masa.png",
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
    image: "/thumbnails/mora.png",
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
    image: "/thumbnails/fanna.png",
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
    image: "/thumbnails/dhamaal.png",
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
    image: "/thumbnails/kahan.png",
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
    image: "/thumbnails/zanjeer.png",
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
    image: "/thumbnails/dardemaa.png",
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
    image: "/thumbnails/sabba.png",
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
    image: "/thumbnails/rooh2.png",
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
    image: "/thumbnails/decode.png",
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
    image: "/thumbnails/decode2.png",
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
    image: "/thumbnails/decode3.png",
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
    image: "/thumbnails/aabruu.png",
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
    image: "/thumbnails/making1.png",
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
    image: "/thumbnails/making2.png",
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
    image: "/thumbnails/making3.png",
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
    image: "/thumbnails/thelastpage.png",
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
    image: "/thumbnails/samarpan.png",
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
    image: "/thumbnails/holy.png",
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
    image: "/thumbnails/savera.png",
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
    image: "/thumbnails/concert.jpg",
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
    image: "/thumbnails/fest.jpg",
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
    image: "/thumbnails/177.JPG",
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
    image: "/thumbnails/066.JPG",
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
    image: "/thumbnails/0703.png",
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
    image: "/thumbnails/nikamma.jpg",
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
    image: "/thumbnails/Image-957.jpg",
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
    image: "/thumbnails/samarpan2.jpg",
    category: "showreel",
    videoUrl: "https://www.instagram.com/reel/DKH4RVozCiU/",
    platform: "instagram"
  }
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

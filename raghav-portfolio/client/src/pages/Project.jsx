import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/projects.css";
import { useEffect } from "react";

import { useInView } from 'react-intersection-observer';

const ProjectImage = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // load only once when visible
    rootMargin: '100px', // load a bit before they come into view
  });

  return (
    <div ref={ref} className="project-image">
      {inView ? <img src={src} alt={alt} /> : <div style={{ height: '200px', background: '#eee' }}></div>}
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Ek Kamra",
    role: "Director and Cinematographer",
    year: "2025",
    description:
      "Directed and shot the video with a minimalist aesthetic and a strong emotional narrative",
    image: "/thumbnails/ek-kamra.png",
    category: "Music Video",
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
    id: 36,
    title: "The Last Page",
    role: "Director",
    year: "2025",
    description: "Musical short film on the song pal pal by talwinder",
    image: "/thumbnails/thelastpage.png",
    category: "short-film",
    details: {
      date: "May 2025",
      location: "Gurgaon, India",
      company: "Independent",
      artist: "Nehal",
      director: "Raghav / Dhiren",
      type: "Short Film",
      videos: [
        {
          url: "https://www.youtube.com/embed/s6P4pilPNwQ",
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
      videos: [{ url: "DJPJWiMTcIl", platform: "instagram" }],
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
      videos: [{ url: "DHdxbxSTuAu", platform: "instagram" }],
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
      videos: [{ url: "DHdF3gyorF-", platform: "instagram" }], 
    },
  },
   {
    id: 12,
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
    id: 13,
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
    {
    id: 14,
    title: "NPS for Flexibility",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/nps1.png",
    category: "Ad Film",
    details: {
      date: "October 2023",
      location: "Mumbai, India",
      company: "Classic Films",
      artist: "Arpit Choudhary",
      director: "Abhay Nihalani",
      type: "ad film",
      videos: [{ url: "https://www.youtube.com/embed/oLjqyQlZ75U",
          platform: "youtube" }], 
    },
  },

   {
    id: 15,
    title: "NPS for Transparency",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/nps2.png",
    category: "Ad Film",
    details: {
      date: "October 2023",
      location: "Mumbai, India",
      company: "Classic Films",
      artist: "Arpit Choudhary",
      director: "Abhay Nihalani",
      type: "ad film",
      videos: [{ url: "https://www.youtube.com/embed/BZL_kGt-zRQ",
          platform: "youtube" }], 
    },
  },
   {
    id: 16,
    title: "NPS for Portability",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/nps3.png",
    category: "Ad Film",
    details: {
      date: "October 2023",
      location: "Mumbai, India",
      company: "Classic Films",
      artist: "Arpit Choudhary",
      director: "Abhay Nihalani",
      type: "ad film",
      videos: [{ url: "https://www.youtube.com/embed/7WAAMXyT4l8",
          platform: "youtube" }], 
    },
  },
   {
    id: 17,
    title: "NPS for Trust",
    role: "Intern AD",
    year: "2023",
    description: "Ad film for the mobile app National Pension scheme",
    image: "/thumbnails/nps4.png",
    category: "Ad Film",
    details: {
      date: "October 2023",
      location: "Mumbai, India",
      company: "Classic Films",
      artist: "Arpit Choudhary",
      director: "Abhay Nihalani",
      type: "ad film",
      videos: [{ url: "https://www.youtube.com/embed/qguwlDHest0",
          platform: "youtube" }], 
    },
  },
   {
    id: 18,
    title: "Khwaab",
    role: "Assistant Director",
    year: "2024",
    description: "Khwaab means unrequited love. A kind of love where feelings are not reciprocated. The song expresses the feelings one goes through and it reminds of the days gone by",
    image: "/thumbnails/khwaab.png",
    category: "Music Video",
    details: {
      date: "September 2024",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Faheem Abdullah and PHO",
      director: "Imbesat Ahmad & Oun Mehdi",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/EWIay_vyFMk",
          platform: "youtube" }], 
    },
  },
   {
    id: 19,
    title: "Rooh Music Film",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that describes deep love. In this state of passionate love, you see your lover as perfect, almost unreal, like a divine being.",
    image: "/thumbnails/rooh.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Ladakh, India",
      company: "Artiste First",
      artist: "Rekha Bhardwaj, Arslan Nizami",
      director: "Jomin Varghese ",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/EWIay_vyFMk",
          platform: "youtube" }], 
    },
  },
   {
    id: 20,
    title: "Masa Rosh",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Masa Rosh is a playful song that captures the essence of making amends in a fun and endearing way. It's a song about playful apologies, cheeky charm, and the joy of making up to someone.",
    image: "/thumbnails/masa.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami  ,Siddharth Pandit",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/Gt7_LUqnldo",
          platform: "youtube" }], 
    },
  },
   {
    id: 21,
    title: "Mora Piya",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The song talks about a heart yearning for its beloved. The lyrics express a deep sense of longing, as they eagerly awaits the arrival of their love, their heart pounding with each passing moment.",
    image: "/thumbnails/mora.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Shradha Mishra",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/y0g1uj3OE_Y",
          platform: "youtube" }], 
    },
  },
   {
    id: 22,
    title: "Fanna Fillah ",
    role: "2nd Assistant Director",
    year: "2024",
    description: " The song gives hope, reminding us that even when we feel lost, we will eventually find our way. It’s a song that resonates with today’s generation, who often feel lost in their own thoughts, overwhelmed by the complexities of life.",
    image: "/thumbnails/fanna.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Faheem Abdullah , Siddharth Pandit",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/mm48gpsJ9bQ",
          platform: "youtube" }], 
    },
  },
   {
    id: 23,
    title: "Dhamaal",
    role: "2nd Assistant Director",
    year: "2025",
    description: "Dhamaal is a song that captures the intense emotional journey of someone searching for their love and the joy that would have come if they have got that love.",
    image: "/thumbnails/dhamaal.png",
    category: "Music Video",
    details: {
      date: "February 2025",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Faheem Abdullah , Qaisar Nizami , Aman Moroney",
      director: "Faheem Abdullah",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/EKET-n4cBHI",
          platform: "youtube" }], 
    },
  },
   {
    id: 24,
    title: "Tu kahan hai",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Tu Kahan Hai is a journey of self-discovery, a quest for meaning. 'Tu Kahan Hai' is an exploration of identity, purpose, and the human condition.",
    image: "/thumbnails/kahan.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/GQn3vTTKo9g",
          platform: "youtube" }], 
    },
  },
   {
    id: 25,
    title: "Zamane Ki Zanjeer",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Zamane Ki Zanjeer delves into the themes of existentialism, and social demons. It explores the human condition, questioning the purpose of life and the nature of reality. ",
    image: "/thumbnails/zanjeer.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Farozan Nizami , Huzaif Nazar ",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/xk1qELGYnDQ",
          platform: "youtube" }], 
    },
  },
   {
    id: 26,
    title: "Dard-e-Maa ",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Dard-e-Maa is a mystical song blending Hafiz's and Shamas Faqir’s Persian poetry with Kashmiri influences. It symbolizes a door that leads listeners to a personal, journey.",
    image: "/thumbnails/dardemaa.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/dBUTXHooqF0",
          platform: "youtube" }], 
    },
  },
   {
    id: 27,
    title: "Saba Ke Baad",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that describes deep, love. In this state of passionate love, you see your lover as perfect, almost unreal, like a divine being.",
    image: "/thumbnails/sabba.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Zeeshaan Nabi",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/nFQTEXzwFqI",
          platform: "youtube" }], 
    },
  },
   {
    id: 28,
    title: "Rooh 2.0",
    role: "2nd Assistant Director",
    year: "2024",
    description: "A song that shows you admire someone so much that you’re willing to loose yourself for them. It’s a love that’s pure, intense, and all-consuming",
    image: "/thumbnails/rooh2.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Qafilah",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/K2_L5On8N-M",
          platform: "youtube" }], 
    },
  },
     {
    id: 32,
    title: "Aabruu",
    role: "1st Director's Assistant",
    year: "2024",
    description: "The song captures the essence of a deep and enduring love, where the lover's dignity becomes a source of immense joy.",
    image: "/thumbnails/aabruu.png",
    category: "Music Video",
    details: {
      date: "December 2024",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Khan Inam-Ul-Haq , Princy Khatiwada",
      director: "Faheem Abdullah",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/8d9tcK27H0I",
          platform: "youtube" }], 
    },
  },
   {
    id: 29,
    title: "RIQQAT The Decode",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics, music, and the collaborative journey that brought it to life.",
    image: "/thumbnails/decode.png",
    category: "interview",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Multiple Artists",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/D8HXMxND-aY",
          platform: "youtube" }], 
    },
  },
   {
    id: 30,
    title: "RIQQAT The Decode EP-2",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics, music, and the collaborative journey that brought it to life.",
    image: "/thumbnails/decode2.png",
    category: "interview",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Multiple Artists",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/ngeMq67_3sM",
          platform: "youtube" }], 
    },
  },
   {
    id: 31,
    title: "RIQQAT The Decode EP-3",
    role: "2nd Assistant Director",
    year: "2024",
    description: "The artists themselves unravel the layers of RIQQAT, exploring its rich lyrics, music, and the collaborative journey that brought it to life.",
    image: "/thumbnails/decode3.png",
    category: "interview",
    details: {
      date: "December 2024",
      location: "Mumbai, India",
      company: "Artiste First",
      artist: "Multiple Artists",
      director: "Deepak Rawat",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/TdHVE9_9iHA",
          platform: "youtube" }], 
    },
  },
{
    id: 33,
    title: "Making of Aabruu",
    role: "1st Director's Assistant",
    year: "2024",
    description: "Aabruu is a heartfelt song that expresses having pride on your lover. It delves into the emotions of love, admiration, and pride.",
    image: "/thumbnails/making1.png",
    category: "Behind the scenes",
    details: {
      date: "December 2024",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Khan Inam-Ul-Haq , Princy Khatiwada",
      director: "Faheem Abdullah",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/N2_sGRTLaIs",
          platform: "youtube" }], 
    },
  },
{
    id: 34,
    title: "Making of Dhamaal",
    role: "1st Director's Assistant",
    year: "2024",
    description: "Presenting the journey and the making of the music film of Dhamaal from Arslan Nizami's latest album RIQQAT.",
    image: "/thumbnails/making2.png",
    category: "Behind the scenes",
    details: {
      date: "December 2024",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Arslan Nizami , Quaisar Nizami ",
      director: "Faheem Abdullah",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/prEhLOAk3GI",
          platform: "youtube" }], 
    },
  },
{
    id: 35,
    title: "Making of Rooh",
    role: "2nd Assistant Director",
    year: "2024",
    description: "Presenting the journey and the making of the music film of Rooh from Arslan Nizami's latest album RIQQAT.",
    image: "/thumbnails/making3.png",
    category: "Behind the scenes",
    details: {
      date: "December 2024",
      location: "Kashmir, India",
      company: "Artiste First",
      artist: "Rekha Bhardwaj, Arslan Nizami, Shiwani Bhardwaj",
      director: "Faheem Abdullah",
      type: "Music Video",
      videos: [{ url: "https://www.youtube.com/embed/RRUdEIQ9vH8",
          platform: "youtube" }], 
    },
  },
    {
    id: 37,
    title: "Jahnvi Hard Rock Cafe",
    role: "Videographer",
    year: "2025",
    description: " It felt as if it was waiting for me to cut through the things that were killing me and be born right at that miracle moment. ",
    image: "/thumbnails/jahnvi3.png",
    category: "showreel",
    details: {
      date: "January 2025",
      location: "Delhi, India",
      company: "Premise",
      artist: "Jahnvi",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DJCEeopy2F3", platform: "instagram" }], 
    },
  },
      {
    id: 38,
    title: "Holy Trinity of Filmmakers",
    role: "Director",
    year: "2025",
    description: "Three storytellers united by a love for cinema, crafting short films that speak from the heart. ",
    image: "/thumbnails/holy.png",
    category: "showreel",
    details: {
      date: "January 2025",
      location: "Delhi, India",
      company: "Independent",
      artist: "Various",
      director: "Various",
      type: "Showreel",
      videos: [{ url: "DELCubty0cN", platform: "instagram" }], 
    },
  },
    {
    id: 39,
    title: "Savera EC Reveal",
    role: "Videographer",
    year: "2024",
    description: "Savera Elective commitee reveal ",
    image: "/thumbnails/savera.png",
    category: "showreel",
    details: {
      date: "September 2024",
      location: "Delhi, India",
      company: "Independent",
      artist: "Various",
      director: "Various",
      type: "Showreel",
      videos: [{ url: "C_lEzIZvEU4", platform: "instagram" }], 
    },
  },
  {
    id: 40,
    title: "Concerts",
    role: "Videographer",
    year: "2024",
    description: "A collection of all the conerts i have been to around india",
    image: "/thumbnails/concert.jpg",
    category: "showreel",
    details: {
      date: "September 2024",
      location: "India",
      company: "Independent",
      artist: "Various",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "C5DY3hsSJWO", platform: "instagram" }], 
    },
  },
  {
    id: 41,
    title: "Fest '24 Recap",
    role: "Videographer",
    year: "2024",
    description: "Award winning reel for the BML Munjal university's Fest '24",
    image: "/thumbnails/fest.jpg",
    category: "showreel",
    details: {
      date: "March 2024",
      location: "gurgaon , India",
      company: "Independent",
      artist: "Various",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "C4DcH0WSkiY", platform: "instagram" }], 
    },
  },
  {
    id: 42,
    title: "Rooh BTS",
    role: "Videographer",
    year: "2024",
    description: "Behind the scenes on the set of Rooh",
    image: "/thumbnails/177.JPG",
    category: "Behind the scenes",
    details: {
      date: "March 2024",
      location: "Ladakh , India",
      company: "Independent",
      artist: "Arsalan nizami , Rekha Bhardwaj , Shiwani Bhardwaj",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DE7hrOqP8Tu", platform: "instagram" }], 
    },
  },
  {
    id: 43,
    title: "Rooh BTS",
    role: "Videographer",
    year: "2024",
    description: "Behind the scenes on the set of Rooh",
    image: "/thumbnails/066.JPG",
    category: "Behind the scenes",
    details: {
      date: "March 2024",
      location: "Ladakh , India",
      company: "Independent",
      artist: "Arsalan nizami , Rekha Bhardwaj , Shiwani Bhardwaj",
      director: "Raghav",
      type: "Showreel",
      videos: [{ url: "DEmePaCsQ0R", platform: "instagram" }], 
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
          {["all", "Music Video","Behind the scenes","short-film", "event","Ad Film","interview" , "showreel"].map((cat) => (
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

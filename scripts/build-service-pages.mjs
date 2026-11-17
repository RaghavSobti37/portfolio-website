// Generates static, crawlable service landing pages into dist/ after `vite build`.
// Each page targets the kind of enquiry Raghav actually gets (long-form edits, music videos,
// event/festival coverage, AI films & reels, brand reels, camera crew for visiting productions).
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://bluepolaroid.com';
const OUT = join(process.cwd(), 'dist');
const EMAIL = 'raghavsobti37@gmail.com';
const WA = '918591499393';
const PHONE = '+91 85914 99393';

const W = {
  ekKamra: { t: 'Ek Kamra', r: 'Director & cinematographer · music video', img: '/thumbnails/professional-cinematographer-music-video-ek-kamra.jpg', url: 'https://www.youtube.com/watch?v=28Mb1cIooGw' },
  lastPage: { t: 'The Last Page', r: 'Director · musical short on Talwiinder’s “Pal Pal”', img: '/thumbnails/professional-cinematographer-short-film-last-page.jpg', url: 'https://www.youtube.com/watch?v=s6P4pilPNwQ' },
  rooh: { t: 'Rooh', r: 'AD team · music film, 13M+ views', img: '/thumbnails/professional-cinematographer-music-video-rooh.jpg', url: 'https://www.youtube.com/watch?v=EWIay_vyFMk' },
  narazi: { t: 'Narazi', r: 'Cinematographer · black-and-white film', img: '/thumbnails/professional-cinematographer-black-white-film-narazi.jpg', url: 'https://www.youtube.com/watch?v=CVIGswYIsUM' },
  aashiqana: { t: 'NH7 Weekender · Aashiqana', r: 'Creative director · festival film', img: '/thumbnails/ig-DWY8k8Jj79k.jpg', url: 'https://www.instagram.com/reel/DWY8k8Jj79k/' },
  team: { t: 'NH7 Weekender · The Team', r: 'Creative director · short documentary', img: '/thumbnails/ig-DXKAjwUk1N9.jpg', url: 'https://www.instagram.com/reel/DXKAjwUk1N9/' },
  corbett: { t: 'Samarpan at Jim Corbett', r: 'Journey + full live set', img: '/thumbnails/professional-videographer-live-concert-jim-corbett.jpg', url: 'https://www.youtube.com/watch?v=oSzBcfMb564' },
  hardRock: { t: 'Jahnvi @ Hard Rock Cafe', r: 'Documentary-style set recording', img: '/thumbnails/professional-videographer-live-concert-recording.jpg', url: 'https://www.youtube.com/watch?v=UC8VuiWBDPw' },
  gini: { t: '90 Seconds with Gini', r: 'Artist interview · shot & cut', img: '/thumbnails/ig-DaS166SBKj-.jpg', url: 'https://www.instagram.com/reel/DaS166SBKj-/' },
  maan: { t: '90 Seconds with Maan Panu', r: 'Artist interview · shot & cut', img: '/thumbnails/ig-DcgVDvltpxP.jpg', url: 'https://www.instagram.com/reel/DcgVDvltpxP/' },
  gogangaa: { t: 'Gogangaa', r: 'AI film · 9 minutes', img: '/thumbnails/ai-film-gogangaa.jpg', url: 'https://www.youtube.com/watch?v=mwHVQmIkvKw' },
  bandhan: { t: 'Bandhan Indian Wear', r: 'Fashion showreel · Humayun’s Tomb', img: '/thumbnails/professional-videographer-fashion-showreel-indian-wear.jpg', url: 'https://www.instagram.com/reel/DGsNRvwtlX4/' },
  bandhanW: { t: 'Bandhan Western Wear', r: 'Fashion showreel', img: '/thumbnails/professional-videographer-fashion-showreel-western-wear.jpg', url: 'https://www.instagram.com/reel/DIzAjRGIOOU/' },
  market: { t: 'Colours of Market', r: 'Street reel · Delhi', img: '/thumbnails/professional-videographer-delhi-market-colors-reel.jpg', url: 'https://www.instagram.com/reel/DLrW2bxSK37/' },
  manali: { t: 'Manali, through my lens', r: 'Travel · own kit', img: '/gallery/31.jpg', url: 'https://www.instagram.com/reel/DO1n0CCE_q-/' },
  fest: { t: 'Fest ’24 Recap', r: 'Award-winning event film', img: '/thumbnails/professional-videographer-festival-recap-award-winning.jpg', url: 'https://www.instagram.com/reel/C4DcH0WSkiY/' },
  karun: { t: 'Karun’s Confession', r: 'Album-launch trailer', img: '/thumbnails/karun.jpg', url: 'https://www.instagram.com/reel/DM0AVz2TRmw/' },
  aabruuBts: { t: 'Aabruu — BTS', r: 'Music film shot in Kashmir', img: '/thumbnails/professional-videographer-behind-scenes-aabruu.jpg', url: 'https://www.youtube.com/watch?v=N2_sGRTLaIs' },
};

const PAGES = [
  {
    slug: 'freelance-video-editor',
    title: 'Freelance Video Editor in Mumbai — YouTube, Podcasts & Reels | BluePolaroid',
    desc: 'Freelance video editor in Mumbai working remotely across India: long-form YouTube edits, podcasts, documentaries and reels, cut and graded in DaVinci Resolve.',
    h1: 'Freelance video editor for YouTube, podcasts and reels',
    kicker: 'EDIT · REMOTE ACROSS INDIA',
    intro: 'I cut long-form YouTube videos, video podcasts, interviews, mini-documentaries and short-form reels — story first, then pace, colour and sound. Everything is edited and graded in DaVinci Resolve, delivered remotely, with clear revision rounds.',
    service: 'Video editing',
    offers: ['Long-form YouTube edits (10–40 min) with story structure, b-roll, captions and thumbnail frames', 'Video podcasts and interviews — multi-cam sync, clean audio, highlight clips', 'Reels and Shorts cut from long-form, vertical-first', 'Colour grading and sound clean-up in DaVinci Resolve', 'Monthly retainers for channels that publish every week'],
    work: ['gini', 'team', 'corbett', 'karun'],
    process: ['Send the footage link and a reference you like', 'I share a first cut, usually within 3–4 days', 'Two revision rounds, then final export in every format you need'],
    faq: [
      ['Do you edit remotely?', 'Yes. Most edit work is remote — you share footage through Google Drive, Dropbox or Frame.io and I deliver from Mumbai to anywhere in India or abroad.'],
      ['Which software do you use?', 'DaVinci Resolve Studio for edit, colour and sound. I can deliver project files on request.'],
      ['Do you take monthly retainers?', 'Yes, for channels and brands that publish regularly. Retainers come with priority turnaround and a fixed monthly video count.'],
      ['How do I get a quote?', 'Email or WhatsApp the video length, footage volume and deadline. I reply with a per-video and a retainer option.'],
    ],
    wa: 'Hi Raghav, I need a video editor for ',
  },
  {
    slug: 'music-video-director-mumbai',
    title: 'Music Video Director & DOP in Mumbai | BluePolaroid',
    desc: 'Music video director and cinematographer in Mumbai with his own kit. Music films, performance videos and artist visuals for independent artists and labels.',
    h1: 'Music video director and cinematographer in Mumbai',
    kicker: 'DIRECT · SHOOT · CUT',
    intro: 'I direct and shoot music videos for independent artists and labels — from minimal, emotional pieces like Ek Kamra to musical short films like The Last Page. I worked on the AD team of music films for EBC Originals and ArtisteFirst (Rooh, Khwaab — 13M+ views each), trained in cinematography at NYFA, and shoot with my own kit.',
    service: 'Music video production',
    offers: ['Concept, treatment and shot list built around the song', 'Direction and cinematography with my own camera and lighting kit', 'Performance, narrative and studio-session videos', 'Edit and colour grade in DaVinci Resolve', 'Vertical cut-downs for Reels and Shorts for the release'],
    work: ['ekKamra', 'lastPage', 'rooh', 'narazi'],
    process: ['Share the track and your references', 'I send a one-page treatment and a budget', 'Shoot day(s), then edit, grade and release cut-downs'],
    faq: [
      ['Do you have your own camera kit?', 'Yes. I shoot with my own camera and lighting, which keeps budgets lean for independent releases.'],
      ['Do you travel for shoots?', 'Yes — anywhere in India. Travel and stay are added to the quote for outstation shoots.'],
      ['Can you just shoot, or just edit?', 'Yes. I work as director, DOP or editor on its own, or take the whole video end to end.'],
      ['How far ahead should I book?', 'Two to three weeks gives time for a treatment and recce; faster turnarounds are possible for performance videos.'],
    ],
    wa: 'Hi Raghav, I want to make a music video for ',
  },
  {
    slug: 'event-concert-videographer-mumbai',
    title: 'Event, Concert & Festival Videographer in Mumbai | BluePolaroid',
    desc: 'Concert and festival videographer in Mumbai: aftermovies, live sets, artist interviews and same-day reels. Creative director on NH7 Weekender 2026 films.',
    h1: 'Concert, festival and event videographer',
    kicker: 'LIVE · FESTIVALS · ARTISTS',
    intro: 'I film concerts, festivals and live events — stage, crowd and backstage — and turn them around fast. In 2026 I creative-directed NH7 Weekender’s Aashiqana film and The Team documentary, and I shoot the “90 Seconds With” artist-interview series with Gini, Aditya Gadhvi, Maan Panu, Vichaar and Ankur Tewari.',
    service: 'Event and concert videography',
    offers: ['Festival aftermovies and recap films', 'Full live-set recordings and documentary-style performance films', 'Short artist interviews shot on the day', 'Same-day and next-day reels for social', 'College fests, launches and brand events'],
    work: ['aashiqana', 'corbett', 'hardRock', 'fest'],
    process: ['Share the date, venue and line-up', 'I plan coverage and deliverables with you', 'Shoot on the day, quick reels next, full film after'],
    faq: [
      ['Can you deliver reels on the same day?', 'Yes. Same-day or next-morning reels are part of most festival packages.'],
      ['Do you cover multi-day festivals?', 'Yes — I have covered multi-stage festivals and can bring a second camera when needed.'],
      ['Do you film artist interviews at events?', 'Yes. The “90 Seconds With” format works well backstage before a set.'],
      ['Which cities do you cover?', 'Mumbai-based and travelling across India for festivals and tours.'],
    ],
    wa: 'Hi Raghav, I need event coverage for ',
  },
  {
    slug: 'ai-film-production',
    title: 'AI Film & AI Video Production in India — AI Reels, Ads, Shorts | BluePolaroid',
    desc: 'AI filmmaker in Mumbai making AI short films, AI reels and AI ads with a cinematographer’s eye. Made Gogangaa, a 9-minute AI film.',
    h1: 'AI films, AI reels and AI ads — directed by a cinematographer',
    kicker: 'AI FILM · GENERATIVE VIDEO',
    intro: 'I make AI films and AI video with the same craft I bring to camera work: script, shot design, consistent characters, voice, sound and grade. My 9-minute AI film Gogangaa explains a large spiritual project for Shri Kshetra Dattadham — the kind of story that would have needed a big crew to shoot.',
    service: 'AI video production',
    offers: ['AI short films and explainer films', 'AI reels and Shorts for brands and creators', 'AI ad films and product concepts', 'Hybrid work — live action mixed with generated shots', 'Script, voice-over, music and sound design included'],
    work: ['gogangaa', 'lastPage', 'ekKamra', 'aashiqana'],
    process: ['Share the idea, length and where it will run', 'I send a script and a look board', 'Generate, cut, voice and grade — with two revision rounds'],
    faq: [
      ['What makes your AI films different?', 'They are directed like films: shot lists, camera language and edit rhythm come first, tools second.'],
      ['Who pays for the AI tool credits?', 'Credits are either included in the quote or billed at cost — I tell you which before starting.'],
      ['Can you keep a character consistent across shots?', 'Yes. Character and style consistency is planned in pre-production, not fixed in the edit.'],
      ['How long does an AI reel take?', 'Usually 3–5 days for a 30–60 second reel; longer films are scheduled by length.'],
    ],
    wa: 'Hi Raghav, I want an AI video for ',
  },
  {
    slug: 'brand-films-reels',
    title: 'Brand Films & Instagram Reels Production in Mumbai | BluePolaroid',
    desc: 'Brand films, product videos and Instagram reels for fashion, music, food and lifestyle brands. Shot and edited by a Mumbai cinematographer with his own kit.',
    h1: 'Brand films and Instagram reels that people stop for',
    kicker: 'BRANDS · REELS · CONTENT DAYS',
    intro: 'I shoot and edit brand films and social-first content — fashion showreels like Bandhan’s at Humayun’s Tomb, artist content for Havells mYOUsic in Dumka, Noida and Jaipur, and reels for studios, cafés and creators. One person from shoot to final cut keeps it fast and affordable.',
    service: 'Brand film and reel production',
    offers: ['Content days: a batch of reels shot in one go', 'Fashion, product and studio showreels', 'Founder, artist and customer stories', 'Monthly reel packages for brands and studios', 'Vertical-first edits with captions and sound design'],
    work: ['bandhan', 'bandhanW', 'market', 'karun'],
    process: ['Tell me the brand, platform and how many pieces', 'I plan a shot list for one content day', 'Shoot, then deliver reels in batches'],
    faq: [
      ['Do you do monthly reel packages?', 'Yes — a fixed number of reels each month, shot in content days, is the most cost-effective way to stay consistent.'],
      ['Do you travel outside Mumbai?', 'Yes, including Delhi NCR and Gurugram; travel is added to the quote.'],
      ['Do you write the concepts?', 'Yes. I can pitch reel ideas and hooks or shoot to your brief.'],
      ['How are reels priced?', 'Per reel or per content day, depending on volume. Message the number of reels and I will quote both.'],
    ],
    wa: 'Hi Raghav, I need brand reels for ',
  },
  {
    slug: 'camera-crew-india',
    title: 'Freelance DOP & Camera Operator in India for Visiting Productions | BluePolaroid',
    desc: 'Mumbai-based freelance DOP and camera operator with own kit for international documentary, travel and music productions shooting in India. Remote editing available.',
    h1: 'Your DOP and camera operator when you shoot in India',
    kicker: 'CREW · DOCUMENTARY · TRAVEL',
    intro: 'For production companies and fixers bringing shoots to India: I work as DOP, second camera, BTS or local camera operator with my own kit, and travel anywhere in the country — from city streets to the Himalaya. NYFA-trained, used to small documentary crews and fast turnarounds, and I can edit remotely after the shoot.',
    service: 'Freelance cinematography and camera crew',
    offers: ['DOP or second camera for documentary, travel and factual shoots', 'BTS and EPK filming on music and brand productions', 'Local camera for interviews and pickups', 'Own camera, lenses, lighting and audio kit', 'Remote editing and selects after the shoot'],
    work: ['team', 'manali', 'aabruuBts', 'corbett'],
    process: ['Send dates, locations and the brief', 'I confirm availability, kit and day rate', 'Shoot, back up and hand over media the same day'],
    faq: [
      ['Do you have your own equipment?', 'Yes — camera, lenses, lighting and audio for small crews.'],
      ['Can you travel across India?', 'Yes, including mountain and remote locations. Travel days are billed at a reduced rate.'],
      ['Do you work with fixers and line producers?', 'Yes, I regularly crew alongside fixers for visiting productions.'],
      ['When do we get the footage?', 'Media is backed up and handed over at the end of each shoot day, with selects or a remote edit if you need them.'],
    ],
    wa: 'Hi Raghav, we are shooting in India and need camera crew for ',
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `
:root{--bg:#0b0b0e;--fg:#f2efe9;--mut:#958f85;--line:#26262b;--blue:#2c5fb8;--orange:#f2600d;--card:#121216}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 'DM Sans',system-ui,sans-serif}
a{color:inherit}
.wrap{max-width:1040px;margin:0 auto;padding:0 20px}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid var(--line)}
nav .logo{font:700 20px 'Space Grotesk',sans-serif;text-decoration:none}nav .logo span{color:var(--blue)}
nav .links{display:flex;gap:18px;font:500 12px 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
nav .links a{text-decoration:none}nav .links a:hover{color:var(--fg)}
.kicker{font:500 12px 'JetBrains Mono',monospace;letter-spacing:.12em;color:var(--orange);margin:56px 0 12px}
h1{font:700 clamp(2rem,6vw,3.6rem)/1.05 'Space Grotesk',sans-serif;letter-spacing:-.02em;margin:0 0 20px;max-width:16ch}
h2{font:600 1.5rem/1.2 'Space Grotesk',sans-serif;margin:56px 0 16px}
.lead{font-size:1.15rem;color:#cfcac2;max-width:62ch}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0}
.btn{display:inline-block;padding:12px 18px;border:1px solid var(--line);text-decoration:none;font:500 13px 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
.btn.p{background:var(--blue);border-color:var(--blue)}.btn:hover{border-color:var(--fg)}
ul.offers{list-style:none;padding:0;margin:0;display:grid;gap:1px;background:var(--line);border:1px solid var(--line)}
ul.offers li{background:var(--bg);padding:14px 16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--line);text-decoration:none;display:block}
.card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.card div{padding:12px 14px}.card b{display:block;font-family:'Space Grotesk',sans-serif}.card small{color:var(--mut)}
ol.steps{padding-left:20px}ol.steps li{margin:6px 0}
details{border-top:1px solid var(--line);padding:14px 0}details summary{cursor:pointer;font-weight:600}
details p{color:#cfcac2;margin:10px 0 0}
.svc{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.svc a{border:1px solid var(--line);padding:20px;text-decoration:none;background:var(--card)}
.svc a:hover{border-color:var(--blue)}.svc b{font:600 1.15rem 'Space Grotesk',sans-serif;display:block;margin-bottom:6px}.svc span{color:var(--mut)}
footer{margin-top:72px;padding:28px 0 48px;border-top:1px solid var(--line);color:var(--mut);font-size:14px}
footer a{color:var(--fg)}
@media (max-width:640px){nav .links{gap:12px}nav .links .hide{display:none}}
`;

const nav = `<nav class="wrap"><a class="logo" href="/">BLUE<span>POLAROID</span></a><div class="links"><a href="/services">Services</a><a href="/projects">Work</a><a class="hide" href="/gallery">Gallery</a><a href="mailto:${EMAIL}">Contact</a></div></nav>`;

const footerHtml = (links) => `<footer class="wrap"><p><b>Raghav Raj Sobti</b> · BluePolaroid · Cinematographer, director &amp; editor · Mumbai, India<br>
<a href="mailto:${EMAIL}">${EMAIL}</a> · <a href="https://wa.me/${WA}">${PHONE}</a> · <a href="https://www.instagram.com/bluepolaroid05/">Instagram</a> · <a href="https://www.youtube.com/@bluepolaroid05">YouTube</a></p>
<p>Services: ${links}</p></footer>`;

const svcLinks = PAGES.map((p) => `<a href="/services/${p.slug}">${esc(p.service)}</a>`).join(' · ');

function shell({ title, desc, path, body, ld }) {
  const url = `${SITE}${path}`;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.jpg" type="image/jpeg">
<meta name="theme-color" content="#0B0B0D">
<meta name="geo.region" content="IN-MH"><meta name="geo.placename" content="Mumbai">
<meta property="og:type" content="website"><meta property="og:site_name" content="BluePolaroid">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/gallery/about.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>${nav}<main class="wrap">${body}</main>${footerHtml(svcLinks)}</body>
</html>`;
}

const person = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Raghav Raj Sobti', url: `${SITE}/` };
const area = [{ '@type': 'City', name: 'Mumbai' }, { '@type': 'Country', name: 'India' }];

function servicePage(p) {
  const path = `/services/${p.slug}`;
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(p.wa)}`;
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(p.service + ' enquiry')}`;
  const cards = p.work.map((k) => W[k]).map((w) => `<a class="card" href="${w.url}" target="_blank" rel="noopener"><img src="${w.img}" alt="${esc(w.t)} — ${esc(w.r)}" loading="lazy" width="440" height="275"><div><b>${esc(w.t)}</b><small>${esc(w.r)}</small></div></a>`).join('');
  const body = `
<p class="kicker">${esc(p.kicker)}</p>
<h1>${esc(p.h1)}</h1>
<p class="lead">${esc(p.intro)}</p>
<div class="cta"><a class="btn p" href="${wa}">WhatsApp for a quote</a><a class="btn" href="${mail}">Email your brief</a><a class="btn" href="/projects">See all work</a></div>
<h2>What I do</h2>
<ul class="offers">${p.offers.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
<h2>Selected work</h2>
<div class="grid">${cards}</div>
<h2>How it works</h2>
<ol class="steps">${p.process.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
<h2>Questions</h2>
${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
<h2>Start a project</h2>
<p class="lead">Send the date, place and what you need, and I’ll come back with a quote.</p>
<div class="cta"><a class="btn p" href="${wa}">WhatsApp ${PHONE}</a><a class="btn" href="${mail}">${EMAIL}</a></div>`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': `${SITE}${path}#service`, name: p.service, serviceType: p.service, description: p.desc, provider: person, areaServed: area, url: `${SITE}${path}` },
      { '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
        { '@type': 'ListItem', position: 3, name: p.service, item: `${SITE}${path}` },
      ] },
    ],
  };
  return { path, html: shell({ title: p.title, desc: p.desc, path, body, ld }) };
}

function hubPage() {
  const path = '/services';
  const title = 'Services — Video Editing, Music Videos, Event & AI Films | BluePolaroid Mumbai';
  const desc = 'Hire Raghav Raj Sobti (BluePolaroid), Mumbai: freelance video editing, music video direction, concert and festival filming, AI films, brand reels and camera crew across India.';
  const body = `
<p class="kicker">SERVICES · MUMBAI · ACROSS INDIA</p>
<h1>Film, edit and AI video — one person, start to finish</h1>
<p class="lead">I’m Raghav Raj Sobti, a Mumbai-based cinematographer, director and editor (NYFA-trained) working under BluePolaroid. Pick what you need:</p>
<div class="svc">${PAGES.map((p) => `<a href="/services/${p.slug}"><b>${esc(p.service)}</b><span>${esc(p.desc)}</span></a>`).join('')}</div>
<div class="cta"><a class="btn p" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi Raghav, I have a project: ')}">WhatsApp for a quote</a><a class="btn" href="mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry')}">Email your brief</a></div>`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ProfessionalService', '@id': `${SITE}/services#business`, name: 'BluePolaroid — Raghav Raj Sobti', url: `${SITE}/services`, image: `${SITE}/gallery/about.jpg`, email: EMAIL, telephone: PHONE.replace(/\s/g, ''), founder: person,
        address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' }, areaServed: area,
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Video services', itemListElement: PAGES.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p.service, url: `${SITE}/services/${p.slug}` } })) } },
    ],
  };
  return { path, html: shell({ title, desc, path, body, ld }) };
}

if (!existsSync(OUT)) throw new Error('dist/ missing — run vite build first');
const pages = [hubPage(), ...PAGES.map(servicePage)];
for (const { path, html } of pages) {
  const dir = join(OUT, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

// Add the pages to the sitemap copied into dist/.
const smPath = join(OUT, 'sitemap.xml');
let sm = readFileSync(smPath, 'utf8');
const today = new Date().toISOString().slice(0, 10);
const entries = pages
  .filter(({ path }) => !sm.includes(`${SITE}${path}<`))
  .map(({ path }) => `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${path === '/services' ? '0.9' : '0.8'}</priority>\n  </url>`)
  .join('\n');
if (entries) sm = sm.replace('</urlset>', `${entries}\n</urlset>`);
writeFileSync(smPath, sm);
console.log(`service pages: ${pages.length} written`);

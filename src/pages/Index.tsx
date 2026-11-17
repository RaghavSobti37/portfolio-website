import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { StudioHeader, StudioContact, StudioCta } from '@/components/studio/Studio';
import { LoopMedia, sourceUrl } from '@/components/studio/LoopMedia';
import { projects } from '@/data/projects';

/** The films that open the site, in this order. Looked up by title so the data stays in one place. */
const SELECTED: { title: string; name?: string; with?: string; role: string; loop?: string }[] = [
  { title: 'NH7 Weekender · Aashiqana', name: 'NH7 Weekender', with: 'Premise', role: 'Creative director' },
  { title: 'Ek Kamra', with: 'music video', role: 'Director, cinematographer' },
  { title: 'GauGanga', with: 'AI film', role: 'AI filmmaker' },
  { title: 'The Last Page', with: 'Talwiinder, Pal Pal', role: 'Director' },
  { title: '90 Seconds with Aditya Gadhvi', name: '90 Seconds With', with: 'artist series', role: 'Shot and cut' },
  { title: 'NH7 Weekender · The Team', name: 'The Team', with: 'NH7 Weekender', role: 'Creative director' },
  { title: 'Samarpan Jim Corbett set', name: 'Samarpan', with: 'live at Jim Corbett', role: 'Live film' },
  { title: 'Narazi', with: 'black and white', role: 'Cinematographer' },
  { title: 'Fanna Fillah', with: 'EBC Originals', role: 'Assistant director' },
  { title: 'Khwaab', with: 'EBC Originals', role: 'Assistant director' },
];

/** Hero strip: four loops from the latest work. */
const HERO = [
  { loop: '/loops/nh7.mp4', url: 'https://www.instagram.com/reel/DWY8k8Jj79k/', label: 'NH7 Weekender' },
  { loop: '/loops/vichaar.mp4', url: 'https://www.instagram.com/reel/DbiexjeO0l-/', label: 'Vichaar' },
  { loop: '/loops/aditya.mp4', url: 'https://www.instagram.com/reel/DYZpxenwlot/', label: 'Aditya Gadhvi' },
  { loop: '/loops/laksh.mp4', url: 'https://www.instagram.com/reel/DHdxbxSTuAu/', label: 'Laksh' },
];

/** Faces from Raghav's own interview films, so the names stick. */
const ARTISTS: { name: string; img: string; url: string }[] = [
  { name: 'Gini', img: '/thumbnails/ig-DaS166SBKj-.jpg', url: 'https://www.instagram.com/reel/DaS166SBKj-/' },
  { name: 'Aditya Gadhvi', img: '/thumbnails/ig-DYZpxenwlot.jpg', url: 'https://www.instagram.com/reel/DYZpxenwlot/' },
  { name: 'Vichaar', img: '/thumbnails/ig-DbiexjeO0l-.jpg', url: 'https://www.instagram.com/reel/DbiexjeO0l-/' },
  { name: 'Maan Panu', img: '/thumbnails/ig-DcgVDvltpxP.jpg', url: 'https://www.instagram.com/reel/DcgVDvltpxP/' },
  { name: 'Ankur Tewari', img: '/thumbnails/Image-665.jpg', url: 'https://www.instagram.com/reel/DMXy444xFMx/' },
  { name: 'Raiez Khan', img: '/thumbnails/ig-Dbs-xEOJh_j.jpg', url: 'https://www.instagram.com/reel/Dbs-xEOJh_j/' },
  { name: 'Laksh', img: '/thumbnails/professional-videographer-storyteller-interview-laksh.jpg', url: 'https://www.instagram.com/reel/DHdxbxSTuAu/' },
  { name: 'Garvit x Priyansh', img: '/thumbnails/ig-DZ7pI89Pun1.jpg', url: 'https://www.instagram.com/reel/DZ7pI89Pun1/' },
  { name: 'JAHNVI', img: '/thumbnails/professional-videographer-artist-interview-jahnvi.jpg', url: 'https://www.instagram.com/reel/DJPJWiMTcIl/' },
  { name: 'Karun', img: '/thumbnails/karun.jpg', url: 'https://www.instagram.com/reel/DM0AVz2TRmw/' },
  { name: 'Sinash', img: '/thumbnails/ig-DNLZmU2T5bZ.jpg', url: 'https://www.instagram.com/reel/DNLZmU2T5bZ/' },
  { name: 'Samarpan', img: '/thumbnails/professional-videographer-band-showreel-samarpan.jpg', url: 'https://www.instagram.com/reel/DKH4RVozCiU/' },
  { name: 'Nikamma', img: '/thumbnails/professional-videographer-artist-interview-nikamma.jpg', url: 'https://www.instagram.com/reel/DK4jBv5zNV_/' },
  { name: 'Muzzle', img: '/thumbnails/professional-videographer-artist-interview-muzzle.jpg', url: 'https://www.instagram.com/reel/DKkIxRyzc0H/' },
];

/** Logo files go in /public/logos; until one is there the name is set as a wordmark. */
const CLIENTS: { name: string; logo?: string }[] = [
  { name: 'NH7 Weekender' },
  { name: 'Premise' },
  { name: 'Havells mYOUsic' },
  { name: 'EBC Originals' },
  { name: 'ArtisteFirst' },
  { name: 'The Shakti Collective' },
  { name: 'Bandhan' },
  { name: 'Shri Kshetra Dattadham' },
];

const SERVICES = [
  ['Music videos', 'Concept, direction and camera for artists and labels, with my own kit.', 'music-video-director-mumbai'],
  ['Festivals and live music', 'Aftermovies, full live sets and backstage interviews, cut fast.', 'event-concert-videographer-mumbai'],
  ['Video editing', 'Long-form YouTube, podcasts and reels, edited and graded in DaVinci Resolve.', 'freelance-video-editor'],
  ['AI films', 'AI shorts, reels and ads, directed with a camera person’s eye.', 'ai-film-production'],
  ['Brand films and reels', 'Content days for fashion, music and lifestyle brands.', 'brand-films-reels'],
  ['Camera crew in India', 'DOP or second camera for visiting documentary and travel shoots.', 'camera-crew-india'],
] as const;

const Index = () => {
  const location = useLocation();
  const [hover, setHover] = useState<number | null>(null);

  // Header links like About land here from other pages with a section to scroll to.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), 400);
  }, [location.state]);

  const rows = SELECTED.map((s) => ({ ...s, p: projects.find((p) => p.title === s.title) })).filter(
    (r): r is typeof r & { p: (typeof projects)[number] } => Boolean(r.p)
  );
  const hovered = hover !== null ? rows[hover] : null;

  return (
    <div className="st">
      <Seo
        title="Raghav Raj Sobti | Cinematographer, Video Editor & AI Filmmaker in Mumbai | BluePolaroid"
        description="Raghav Raj Sobti (BluePolaroid) — Mumbai cinematographer, music video director, freelance video editor and AI filmmaker. Music videos, festival and concert films, brand reels and AI films across India."
        path="/"
        type="profile"
      />
      <StudioHeader />

      <main>
        <section className="st-hero">
          <div>
            <h1>Music films, festivals, AI films.</h1>
            <p className="st-sub">Directed, shot and cut by Raghav Raj Sobti. Mumbai, working across India.</p>
          </div>
          <div className="st-strip">
            {HERO.map((h) => (
              <a key={h.label} href={h.url} target="_blank" rel="noreferrer" aria-label={`${h.label} on Instagram`}>
                <LoopMedia url={h.url} image={h.loop.replace('.mp4', '.jpg')} loop={h.loop} alt={h.label} />
                <span>{h.label}</span>
              </a>
            ))}
          </div>
        </section>
        <div className="st-facts">
          <span>NYFA-trained cinematographer</span>
          <span>15.8M views across films and interviews</span>
          <span>Own camera kit, edits in DaVinci Resolve</span>
          <a href="#contact">Available for projects</a>
        </div>

        <div className="st-h2">
          <h2>Selected films</h2>
          <Link to="/work">All work, reels and photos</Link>
        </div>
        <div className="st-films" onMouseLeave={() => setHover(null)}>
          <ul className="st-index">
            {rows.map(({ p, name, with: w, role, loop }, i) => (
              <li key={p.id}>
                <a
                  className="st-row"
                  href={sourceUrl(p.videoUrl)}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setHover(i)}
                >
                  <LoopMedia url={p.videoUrl} image={p.image} loop={loop} alt="" className="thumb" />
                  <span className="t">
                    {name ?? p.title}
                    {w && <em>{w}</em>}
                  </span>
                  <span className="r">{role}</span>
                  <span className="y">{p.year}</span>
                </a>
              </li>
            ))}
          </ul>
          <aside className="st-peek" aria-hidden="true">
            {hovered ? (
              <LoopMedia key={hovered.p.id} url={hovered.p.videoUrl} image={hovered.p.image} loop={hovered.loop} alt="" />
            ) : (
              <LoopMedia url={rows[0].p.videoUrl} image={rows[0].p.image} loop={rows[0].loop} alt="" />
            )}
          </aside>
        </div>

        <div className="st-h2">
          <h2>Artists in front of my camera</h2>
        </div>
        <ul className="st-faces">
          {ARTISTS.map((a) => (
            <li key={a.name}>
              <a href={a.url} target="_blank" rel="noreferrer">
                <LoopMedia url={a.url} image={a.img} alt={a.name} />
                <span>{a.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="st-h2">
          <h2>Made for</h2>
        </div>
        <ul className="st-logos">
          {CLIENTS.map((c) => (
            <li key={c.name}>{c.logo ? <img src={c.logo} alt={c.name} /> : <span>{c.name}</span>}</li>
          ))}
        </ul>

        <section className="st-blue">
          <div className="st-h2">
            <h2>Work with me</h2>
            <a href="/services">All services</a>
          </div>
          <ul className="st-list">
            {SERVICES.map(([name, line, slug]) => (
              <li key={slug}>
                <a href={`/services/${slug}`}>
                  <b>{name}</b>
                  <span>{line}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="st-h2" id="about">
          <h2>About</h2>
        </div>
        <section className="st-about">
          <img src="/gallery/about-bts.jpg" alt="Raghav directing on location" loading="lazy" />
          <div>
            <p className="lead">
              I’m Raghav, a cinematographer and director from Mumbai. I make music films, festival stories and short
              artist portraits, and lately AI films too.
            </p>
            <p>
              I started on set as an assistant director on music films for EBC Originals and ArtisteFirst, then picked
              up the camera for independent artists and festivals. In 2025 I trained in cinematography at the New York
              Film Academy. This year I creative-directed NH7 Weekender’s films and made GauGanga, a nine-minute AI
              film.
            </p>
            <p>
              I also write code, so I build the web side for The Shakti Collective. One person from idea to final cut
              keeps things fast and personal.
            </p>
            <dl>
              <dt>Now</dt>
              <dd>Creative technologist, The Shakti Collective</dd>
              <dt>2026</dt>
              <dd>Creative director, NH7 Weekender films. AI film, GauGanga.</dd>
              <dt>2025</dt>
              <dd>Directed Ek Kamra and The Last Page. Cinematography, NYFA.</dd>
              <dt>2023–24</dt>
              <dd>Assistant director, Rooh, Khwaab, Aabruu, Dhamaal.</dd>
              <dt>Tools</dt>
              <dd>Own camera and lighting kit. DaVinci Resolve.</dd>
            </dl>
          </div>
        </section>
      </main>

      <StudioContact />
      <StudioCta />
    </div>
  );
};

export default Index;

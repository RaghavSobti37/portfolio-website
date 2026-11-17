import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  StudioHeader,
  StudioContact,
  StudioCta,
  Lightbox,
  type Playable,
} from "@/components/studio/Studio";
import { projects } from "@/data/projects";

/** The films that open the site, in this order. Looked up by title so the data stays in one place. */
const SELECTED: {
  title: string;
  name?: string;
  with?: string;
  role: string;
}[] = [
  {
    title: "NH7 Weekender · Aashiqana",
    name: "Aashiqana",
    with: "NH7 Weekender",
    role: "Creative director",
  },
  { title: "Ek Kamra", with: "music video", role: "Director, cinematographer" },
  { title: "Gogangaa", with: "AI film", role: "AI filmmaker" },
  { title: "The Last Page", with: "Talwiinder, Pal Pal", role: "Director" },
  {
    title: "90 Seconds with Gini",
    name: "90 Seconds With",
    with: "artist series",
    role: "Shot and cut",
  },
  {
    title: "NH7 Weekender · The Team",
    name: "The Team",
    with: "NH7 Weekender",
    role: "Creative director",
  },
  {
    title: "Samarpan Jim Corbett set",
    name: "Samarpan",
    with: "live at Jim Corbett",
    role: "Live film",
  },
  { title: "Narazi", with: "black and white", role: "Cinematographer" },
  {
    title: "Bandhan Indian Wear Showreel",
    name: "Bandhan",
    with: "Indian Wear",
    role: "Fashion film",
  },
  {
    title: "Rooh Music Film",
    name: "Rooh",
    with: "EBC Originals",
    role: "Assistant director",
  },
];

const ARTISTS = [
  "Indian Ocean",
  "Gini",
  "Ankur Tewari",
  "Aditya Gadhvi",
  "Maan Panu",
  "Faheem Abdullah",
  "Vichaar",
  "Raiez Khan",
  "Garvit x Priyansh",
  "JAHNVI",
  "Karun",
  "Samarpan",
  "Chaar Diwaari",
  "Nikamma",
  "Muzzle",
  "Sinash",
];
const CLIENTS = [
  "NH7 Weekender",
  "Havells mYOUsic",
  "EBC Originals",
  "ArtisteFirst",
  "The Shakti Collective",
  "Bandhan",
  "Shri Kshetra Dattadham",
];

const SERVICES = [
  [
    "Music videos",
    "Concept, direction and camera for artists and labels, with my own kit.",
    "music-video-director-mumbai",
  ],
  [
    "Festivals and live music",
    "Aftermovies, full live sets and backstage interviews, cut fast.",
    "event-concert-videographer-mumbai",
  ],
  [
    "Video editing",
    "Long-form YouTube, podcasts and reels, edited and graded in DaVinci Resolve.",
    "freelance-video-editor",
  ],
  [
    "AI films",
    "AI shorts, reels and ads, directed with a camera person’s eye.",
    "ai-film-production",
  ],
  [
    "Brand films and reels",
    "Content days for fashion, music and lifestyle brands.",
    "brand-films-reels",
  ],
  [
    "Camera crew in India",
    "DOP or second camera for visiting documentary and travel shoots.",
    "camera-crew-india",
  ],
] as const;

const asPlayable = (p: (typeof projects)[number], sub: string): Playable => ({
  title: p.title,
  sub,
  url: p.videoUrl,
  platform: p.platform,
});

const Index = () => {
  const location = useLocation();
  const [active, setActive] = useState<Playable | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Header links like About land here from other pages with a section to scroll to.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target)
      setTimeout(
        () =>
          document
            .querySelector(target)
            ?.scrollIntoView({ behavior: "smooth" }),
        400,
      );
  }, [location.state]);

  const rows = SELECTED.map((s) => ({
    ...s,
    p: projects.find((p) => p.title === s.title),
  })).filter((r): r is typeof r & { p: (typeof projects)[number] } =>
    Boolean(r.p),
  );

  const move = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    const el = previewRef.current;
    if (el) {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    }
  };

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
          <h1>I direct, shoot and cut music films, festivals and AI films.</h1>
          <figure style={{ margin: 0 }}>
            <video
              src="/hero/center.mp4?v=h264-first8-last8"
              poster="/thumbnails/ig-DWY8k8Jj79k.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="NH7 Weekender 2026, a few seconds"
            />
            <figcaption>NH7 Weekender, 2026</figcaption>
          </figure>
        </section>
        <div className="st-facts">
          <span>Based in Mumbai, shooting across India</span>
          <span>NYFA-trained cinematographer</span>
          <span>15.8M views across films and interviews</span>
          <a href="#contact">Available for projects</a>
        </div>

        <div className="st-h2">
          <h2>Selected films</h2>
          <Link to="/work">All work, reels and photos</Link>
        </div>
        <ul
          className="st-index"
          onMouseMove={move}
          onMouseLeave={() => setPreview(null)}
        >
          {rows.map(({ p, name, with: w, role }) => (
            <li key={p.id}>
              <button
                type="button"
                className="st-row"
                onMouseEnter={() => setPreview(p.image)}
                onFocus={() => setPreview(null)}
                onClick={() => setActive(asPlayable(p, `${role}, ${p.year}`))}
              >
                <img className="thumb" src={p.image} alt="" loading="lazy" />
                <span className="t">
                  {name ?? p.title}
                  {w && <em>{w}</em>}
                </span>
                <span className="r">{role}</span>
                <span className="y">{p.year}</span>
              </button>
            </li>
          ))}
        </ul>
        {preview && (
          <img
            ref={previewRef}
            className="st-preview"
            src={preview}
            alt=""
            style={{ left: mouse.current.x, top: mouse.current.y }}
          />
        )}

        <div className="st-h2">
          <h2>Artists in front of my camera</h2>
        </div>
        <p className="st-credits">
          {ARTISTS.join(", ")}. <span>For {CLIENTS.join(", ")}.</span>
        </p>

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
          <img
            src="/gallery/about-bts.jpg"
            alt="Raghav directing on location"
            loading="lazy"
          />
          <div>
            <p className="lead">
              I’m Raghav, a cinematographer and director from Mumbai. I make
              music films, festival stories and short artist portraits, and
              lately AI films too.
            </p>
            <p>
              I started on set as an assistant director on music films for EBC
              Originals and ArtisteFirst, then picked up the camera for
              independent artists and festivals. In 2025 I trained in
              cinematography at the New York Film Academy. This year I
              creative-directed NH7 Weekender’s films and made Gogangaa, a
              nine-minute AI film.
            </p>
            <p>
              I also write code, so I build the web side for The Shakti
              Collective. One person from idea to final cut keeps things fast
              and personal.
            </p>
            <dl>
              <dt>Now</dt>
              <dd>Creative technologist, The Shakti Collective</dd>
              <dt>2026</dt>
              <dd>
                Creative director, NH7 Weekender films. AI film, Gogangaa.
              </dd>
              <dt>2025</dt>
              <dd>
                Directed Ek Kamra and The Last Page. Cinematography, NYFA.
              </dd>
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
      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default Index;

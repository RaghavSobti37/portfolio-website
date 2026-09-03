import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from 'lucide-react';
import { projects, type Project } from '@/data/projects';

const getInstagramEmbedUrl = (url: string): string => {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?]+)/);
  if (match) {
    const kind = url.includes('/p/') ? 'p' : 'reel';
    return `https://www.instagram.com/${kind}/${match[1]}/embed`;
  }
  return url;
};

const openExternal = (item: Project) => {
  if (item.platform === 'instagram') {
    window.open(item.videoUrl, '_blank');
  } else {
    const watchUrl = item.videoUrl.replace('/embed/', '/watch?v=').split('?')[0];
    window.open(watchUrl.includes('watch') ? watchUrl : item.videoUrl, '_blank');
  }
};

const featuredOrder = ['Ek Kamra', 'Rooh Music Film', 'Narazi', 'RIQQAT The Decode EP-2', 'Dhamaal'];

const shortFilms = projects.filter((p) => p.category === 'short-film');

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);
  const films = shortFilms.length > 0 ? shortFilms : projects.slice(0, 6);
  const current = films[slide] ?? films[0];

  useEffect(() => {
    if (films.length < 2) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % films.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [films.length]);

  const featured = featuredOrder
    .map((title) => projects.find((p) => p.title === title))
    .filter(Boolean) as Project[];
  const secondary = featured.filter((p) => p.category !== 'short-film');
  const more = projects
    .filter((p) => !featuredOrder.includes(p.title) && p.category !== 'short-film')
    .slice(0, 8);

  const go = (dir: -1 | 1) => {
    setSlide((s) => (s + dir + films.length) % films.length);
  };

  return (
    <section id="work" className="relative" ref={ref}>
      {/* Short films carousel */}
      {current && (
        <div className="relative min-h-screen flex flex-col justify-end overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
              <div className="absolute inset-0 film-grain opacity-[0.08] mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-24 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono-meta text-accent mb-4 flex items-center gap-2">
                <span className="orange-dot" />
                THE WORK · SHORT FILMS · {String(slide + 1).padStart(2, '0')} /{' '}
                {String(films.length).padStart(2, '0')}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + '-copy'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display text-[clamp(2.6rem,9vw,6.5rem)] font-bold tracking-tighter leading-[0.9] mb-4">
                    {current.title.toUpperCase()}
                  </h2>
                  <p className="font-mono-meta mb-2">
                    {current.category.replace('-', ' ')} · {current.year}
                  </p>
                  <p className="font-body text-muted-foreground max-w-lg mb-2">{current.role}</p>
                  <p className="font-body text-foreground/80 max-w-xl mb-8 text-lg">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActive(current)}
                  className="inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] uppercase border border-primary text-primary px-7 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Watch film →
                </button>

                <div className="flex items-center gap-2 ml-auto md:ml-0">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="w-11 h-11 border border-border hover:border-primary flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    aria-label="Previous film"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="w-11 h-11 border border-border hover:border-primary flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    aria-label="Next film"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-1.5 mt-8">
                {films.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={`h-0.5 transition-all duration-300 ${
                      i === slide ? 'w-10 bg-accent' : 'w-4 bg-foreground/25 hover:bg-foreground/40'
                    }`}
                    aria-label={`Go to ${f.title}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Featured projects — redesigned */}
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="mb-14 md:mb-20">
          <p className="font-mono-meta text-primary mb-3">SELECTED · STILLS IN MOTION</p>
          <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Projects that left a mark
          </h3>
        </div>

        <div className="space-y-6 md:space-y-8">
          {secondary.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActive(project)}
              className="group w-full text-left grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] border border-border hover:border-primary/50 transition-colors overflow-hidden bg-card/20"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 orange-dot" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <p className="font-mono text-[10px] tracking-wider uppercase text-accent mb-3">
                  {String(i + 1).padStart(2, '0')} · {project.year}
                </p>
                <h4 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="font-mono-meta mb-3">{project.role}</p>
                <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-md">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-primary">
                  Open project <Play className="w-3 h-3 fill-current" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-28">
          <p className="font-mono-meta mb-8">MORE WORK · INDEX</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {more.map((project, i) => (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActive(project)}
                className="group relative aspect-[3/4] overflow-hidden bg-card text-left"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-mono text-[10px] text-paper/60 mb-0.5">
                    {String(project.id).padStart(3, '0')}
                  </p>
                  <p className="font-display text-sm text-paper font-medium truncate">
                    {project.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
          <a
            href="#archive"
            className="inline-block mt-10 font-mono-meta text-primary hover:text-accent transition-colors"
          >
            OPEN REELS ARCHIVE →
          </a>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 md:p-10">
          <button
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 p-2 text-paper hover:text-accent"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-5xl">
            <div className="aspect-video bg-black mb-4 overflow-hidden">
              {active.platform === 'youtube' ? (
                <iframe
                  src={`${active.videoUrl}${active.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  title={active.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={getInstagramEmbedUrl(active.videoUrl)}
                  title={active.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold">{active.title}</h3>
                <p className="font-mono-meta mt-1">
                  {active.year} · {active.role}
                </p>
              </div>
              <button
                onClick={() => openExternal(active)}
                className="inline-flex items-center gap-2 font-mono-meta text-primary hover:text-accent"
              >
                Open original <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

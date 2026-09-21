import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, X } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { LazyImage } from '@/components/LazyImage';
import { FooterSection } from '@/components/FooterSection';
import { projects, projectCategories, type Project } from '@/data/projects';

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

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [cat, setCat] = useState('all');

  const filtered = cat === 'all' ? projects : projects.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="All Projects | Raghav Raj Sobti (BluePolaroid) — Films, Music Videos & More"
        description="Every project by Raghav Raj Sobti (BluePolaroid) — music films, short films, interviews, showreels, ad films and behind-the-scenes work."
        path="/projects"
      />

      <header className="fixed top-0 left-0 right-0 z-50 glass py-3">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight">
            BLUE<span className="text-primary">POLAROID</span>
          </Link>
          <Link
            to="/"
            className="font-mono text-[10px] tracking-wider uppercase inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={12} aria-hidden />
            Back home
          </Link>
        </div>
      </header>

      <main className="pt-28 md:pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono-meta text-primary mb-3">FULL INDEX · PROJECTS</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
              All the projects
            </h1>
            <p className="font-body text-muted-foreground max-w-lg">
              Every piece of work in one place — {projects.length} projects across music films,
              short films, interviews, events and more.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            {projectCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                  cat === c.id
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {filtered.map((project, i) => (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 12) * 0.03 }}
                onClick={() => setActive(project)}
                className="group relative aspect-[3/4] overflow-hidden bg-card text-left"
              >
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  shellClassName="absolute inset-0"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-mono text-[9px] text-paper/55 mb-0.5 uppercase tracking-wider">
                    {project.category.replace('-', ' ')} · {project.year}
                  </p>
                  <p className="font-display text-sm text-paper font-medium truncate">
                    {project.title}
                  </p>
                  <p className="font-mono text-[9px] text-paper/70 truncate">{project.role}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="font-mono text-xs text-muted-foreground mt-6">
              No pieces in this category.
            </p>
          )}
        </div>
      </main>

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

      <FooterSection />
    </div>
  );
};

export default Projects;

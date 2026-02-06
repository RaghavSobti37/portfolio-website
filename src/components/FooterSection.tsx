import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/bluepolaroid05/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@bluepolaroid05/videos', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/raghav-raj-sobti/', label: 'LinkedIn' },
  
];

export const FooterSection = () => {
  return (
    <footer id="contact" className="relative py-16 bg-primary/20">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold tracking-wider mb-6"
          >
            BLUE<span className="text-primary">POLAROID</span>
          </motion.a>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-muted-foreground mb-8 max-w-md"
          >
            Crafting visual stories and digital experiences that leave a lasting impression.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 mb-10"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <a
              href="mailto:raghavsobti37@gmail.com"
              className="font-display text-sm tracking-[0.3em] uppercase text-accent hover:text-foreground transition-colors duration-300"
            >
              raghavsobti37@gmail.com
            </a>
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-border mb-8" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} BluePolaroid. Designed & Developed with passion.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

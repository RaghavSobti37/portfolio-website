import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/raghav-raj-sobti/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/RaghavSobti37', label: 'GitHub' },
];

export const CodingFooter = () => {
  return (
    <footer id="contact" className="relative py-16 bg-accent/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold tracking-wider mb-6"
          >
            RAGS<span className="text-accent">.</span>DEV
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-muted-foreground mb-8 max-w-md"
          >
            Building digital products, workflow systems and creative web experiences.
          </motion.p>

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
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-glow"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

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

          <div className="w-full max-w-md h-px bg-border mb-8" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-sm text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} Raghav Raj Sobti. Built with React, TypeScript and creative systems thinking.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

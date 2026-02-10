import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Clapperboard, Globe, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Clapperboard,
    title: 'Cinematography & Production',
    description:
      'Shooting scripts, direction, and expert editing in DaVinci Resolve. From concept to final cut, I bring your vision to life with cinematic precision.',
    features: ['Script Writing', 'Direction', 'Color Grading', 'Sound Design'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom React & Next.js websites designed for SEO and high performance. Clean code, stunning visuals, and seamless user experiences.',
    features: ['React/Next.js', 'Tailwind CSS', 'SEO Optimization', 'Performance'],
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    description:
      'Complete social media roadmaps to boost brand visibility for creators and businesses. Data-driven strategies that deliver results.',
    features: ['Content Strategy', 'Analytics', 'Brand Building', 'Engagement'],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-4">
            What I Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Services & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-card-gradient rounded-sm p-8 border-2 border-primary/20 card-lift overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-primary/5 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-display tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Number decoration */}
                <div className="absolute top-4 right-4 font-display text-7xl font-bold text-foreground/5 group-hover:text-accent/10 transition-colors duration-500">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

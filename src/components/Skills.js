import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: 'Pre-production Planning', level: 90 },
    { name: 'Art Direction', level: 85 },
    { name: 'Video Editing', level: 95 },
    { name: 'Team Leadership', level: 80 },
    { name: 'AI Integration', level: 75 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Working Under Pressure', level: 95 },
    { name: 'Final Cut Pro', level: 90 },
    { name: 'Adobe Lightroom', level: 85 },
    { name: 'Cinematography', level: 88 }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="skills-section"
    >
      <h2>Skills & Expertise</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-info">
              <h3>{skill.name}</h3>
              <span>{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="skill-progress"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
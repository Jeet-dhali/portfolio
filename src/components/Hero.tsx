import { motion } from 'framer-motion';
import { ArrowRight } from './Icons';
import './Hero.css';
import '../styles/buttons.css';

export function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Hi, I'm Jeet.<br />
              I build <span className="gradient-text">websites </span>that solve real problems.
              
            </motion.h1>

            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              I'm a software engineer and computer science student passionate about creating clean, functional web applications.
              I specialize in React, Next.js, and modern frontend technologies. Currently pursuing my B.Tech in Computer Science while building projects that solve real student pain points.
            </motion.p>

            <motion.p 
              className="hero-description" 
              style={{ marginTop: 'var(--space-md)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>MyAttendTracker</strong> — my flagship project — is a free attendance tracking app used by students to monitor their class attendance and calculate safe bunks.
            </motion.p>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View my work <ArrowRight />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

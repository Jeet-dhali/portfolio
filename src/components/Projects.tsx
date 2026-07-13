import { motion } from 'framer-motion';
import { ExternalLink, GithubIcon } from './Icons';
import projAttendImg from '../assets/project_attend.png';
import './Projects.css';
import '../styles/layout.css';

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Projects</div>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Real projects solving real problems — shipped, deployed, and used by people.
          </p>
        </motion.div>

        <motion.div 
          className="projects-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.article 
            className="project-card"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-card-image">
              <motion.img 
                src={projAttendImg} 
                alt="MyAttendTracker dashboard showing attendance analytics"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="project-card-body">
              <div className="project-type live">
                <span className="project-type-dot" /> Live &mdash; myattendtracker.com
              </div>
              <h3>MyAttendTracker</h3>
              <p>
                A free, privacy-first attendance tracker for students. Tracks attendance, calculates safe bunks, provides trend analytics, and stores everything locally in your browser. No signup required — your data stays private on your device.
              </p>
              <div className="project-features">
                <span className="project-feature-tag">Bunk Calculator</span>
                <span className="project-feature-tag">Heatmap Analytics</span>
                <span className="project-feature-tag">Calendar View</span>
                <span className="project-feature-tag">100% Private</span>
                <span className="project-feature-tag">PWA</span>
                <span className="project-feature-tag">Offline Support</span>
              </div>
              <div className="project-links">
                <motion.a 
                  href="https://myattendtracker.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Visit Live Site <ExternalLink />
                </motion.a>
                <motion.a 
                  href="https://github.com/Jeet-dhali" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Source Code <GithubIcon />
                </motion.a>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

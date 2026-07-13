import { motion } from 'framer-motion';
import './TechStack.css';
import '../styles/layout.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export function TechStack() {
  return (
    <section className="section stack-section" id="stack">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            From frontend frameworks to backend tools, here's what I use to ship products.
          </p>
        </motion.div>

        <motion.div 
          className="stack-categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="stack-category" variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <div className="stack-category-icon languages">{'</>'}</div>
            <h3>Languages</h3>
            <div className="stack-tags">
              <span className="stack-tag">JavaScript</span>
              <span className="stack-tag">TypeScript</span>
              <span className="stack-tag">HTML</span>
              <span className="stack-tag">CSS</span>
              <span className="stack-tag">Python</span>
              <span className="stack-tag">Java</span>
            </div>
          </motion.div>

          <motion.div className="stack-category" variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <div className="stack-category-icon frontend">⚛</div>
            <h3>Frontend & Frameworks</h3>
            <div className="stack-tags">
              <span className="stack-tag">React</span>
              <span className="stack-tag">Next.js</span>
              <span className="stack-tag">Astro</span>
              <span className="stack-tag">Tailwind CSS</span>
              <span className="stack-tag">Vite</span>
              <span className="stack-tag">Framer Motion</span>
            </div>
          </motion.div>

          <motion.div className="stack-category" variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <div className="stack-category-icon tools">⚙</div>
            <h3>Tools & Platforms</h3>
            <div className="stack-tags">
              <span className="stack-tag">Git & GitHub</span>
              <span className="stack-tag">VS Code</span>
              <span className="stack-tag">Vercel</span>
              <span className="stack-tag">Cloudflare</span>
              <span className="stack-tag">Firebase</span>
              <span className="stack-tag">Figma</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

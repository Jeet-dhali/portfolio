import { motion } from 'framer-motion';

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

export function Education() {
  return (
    <section className="section" id="education" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Education</div>
          <h2 className="section-title">Academic background</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Where I've been learning and growing as a developer.
          </p>
        </motion.div>

        <motion.div 
          className="education-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="edu-card" variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <div className="edu-date">2022 — Present</div>
            <h3>B.Tech in Computer Science</h3>
            <span className="edu-institution">University (Pursuing)</span>
            <p className="edu-details">
              Studying core computer science — data structures, algorithms, operating systems, databases, and web development. Building projects that solve student pain points.
            </p>
          </motion.div>

          <motion.div className="edu-card" variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
            <div className="edu-date">2020 — 2022</div>
            <h3>Higher Secondary (12th Grade)</h3>
            <span className="edu-institution">Science Stream — PCM with CS</span>
            <p className="edu-details">
              Completed higher secondary education with a focus on Physics, Chemistry, Mathematics, and Computer Science. First introduction to programming.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, MapPinIcon, GithubIcon, ExternalLink, ArrowRight } from './Icons';
import "./Contact.css"
import "../styles/layout.css"
import "../styles/buttons.css"

export function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's connect</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Have a project idea or just want to say hi? Reach out.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div className="contact-info-item" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <div className="contact-icon">
                <MailIcon />
              </div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:jeetproxy@gmail.com">jeetproxy@gmail.com</a></p>
              </div>
            </motion.div>

            <motion.div className="contact-info-item" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <div className="contact-icon">
                <MapPinIcon />
              </div>
              <div>
                <h4>Location</h4>
                <p>India</p>
              </div>
            </motion.div>

            <motion.div className="contact-info-item" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <div className="contact-icon">
                <GithubIcon />
              </div>
              <div>
                <h4>GitHub</h4>
                <p><a href="https://github.com/jeet-dhali" target="_blank" rel="noopener noreferrer">github.com/jeet-dhali</a></p>
              </div>
            </motion.div>

            <motion.div className="contact-info-item" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <div className="contact-icon">
                <ExternalLink />
              </div>
              <div>
                <h4>Portfolio</h4>
                <p><a href="https://jeetdhali.dev" target="_blank" rel="noopener noreferrer">jeetdhali.dev</a></p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {formSubmitted ? (
              <motion.div 
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ fontSize: '1.25rem', marginBottom: 8 }}>Message sent! 🎉</p>
                <p style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form 
                className="contact-form" 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <motion.input
                      type="text"
                      id="name"
                      className="form-input"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <motion.input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <motion.textarea
                    id="message"
                    className="form-input"
                    placeholder="Tell me about your project or idea..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <motion.button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ alignSelf: 'flex-start' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send message <ArrowRight />
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

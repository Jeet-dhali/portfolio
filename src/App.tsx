import { useState, useEffect, useRef, useCallback } from 'react';
import type { FormEvent } from 'react';
import './App.css';

import projAttendImg from './assets/project_attend.png';

/* ───────── Scroll Reveal Hook ───────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ───────── SVG Icon Components ───────── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ExternalLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

/* ───────── App ───────── */
function App() {
  /* Calculator state */
  const [conducted, setConducted] = useState(40);
  const [attended, setAttended] = useState(32);

  /* Contact form */
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /* Mobile nav */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll reveal refs */
  const heroRef = useReveal();
  const stackRef = useReveal();
  const projectRef = useReveal();
  const eduRef = useReveal();
  const contactRef = useReveal();

  /* Calculator computations */
  const percentage = conducted > 0 ? Math.round((attended / conducted) * 100) : 0;
  const isHealthy = percentage >= 75;

  const calcBunkInfo = useCallback(() => {
    if (conducted <= 0) return { message: 'Enter your class data above.', type: 'neutral' as const };
    if (percentage >= 75) {
      // How many can you skip and stay >= 75%?
      let skip = 0;
      while (Math.round((attended / (conducted + skip + 1)) * 100) >= 75) {
        skip++;
      }
      return { message: `You can safely skip ${skip} more class${skip !== 1 ? 'es' : ''} and stay above 75%.`, type: 'safe' as const };
    } else {
      // How many must you attend to reach 75%?
      let extra = 0;
      let tempAttended = attended;
      let tempConducted = conducted;
      while (Math.round((tempAttended / tempConducted) * 100) < 75) {
        tempAttended++;
        tempConducted++;
        extra++;
      }
      return { message: `You need to attend ${extra} more class${extra !== 1 ? 'es' : ''} straight to reach 75%.`, type: 'danger' as const };
    }
  }, [attended, conducted, percentage]);

  const bunkInfo = calcBunkInfo();

  /* Ring circumference for SVG */
  const circumference = 2 * Math.PI * 34;
  const ringOffset = circumference - (Math.min(percentage, 100) / 100) * circumference;
  const ringColor = isHealthy ? 'var(--emerald)' : percentage >= 60 ? 'var(--amber)' : 'var(--rose)';

  /* Form handler */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  /* Close mobile menu on nav click */
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      {/* ─── Navigation ─── */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="nav-brand">
            Jeet<span>.</span>
          </a>

          <ul className="nav-links" style={mobileOpen ? { display: 'flex', position: 'fixed', top: 72, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, zIndex: 99 } : undefined}>
            <li><a href="#about" onClick={handleNavClick}>About</a></li>
            <li><a href="#stack" onClick={handleNavClick}>Tech Stack</a></li>
            <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#education" onClick={handleNavClick}>Education</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>

          <a href="https://github.com/Jeet-dhali" target="_blank" rel="noopener noreferrer" className="nav-cta">
            <GithubIcon /> GitHub
          </a>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero" id="about">
        <div className="container">
          <div className="hero-grid" ref={heroRef}>
            {/* Left: Intro */}
            <div className="reveal">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Open to opportunities
              </div>

              <h1 className="hero-title">
                Hi, I'm Jeet.<br />
                I build <span className="gradient-text">websites</span><br />
                that solve real problems.
              </h1>

              <p className="hero-description">
                I'm a software engineer and computer science student passionate about creating clean, functional web applications.
                I specialize in React, Next.js, and modern frontend technologies. Currently pursuing my B.Tech in Computer Science while building projects that solve real student pain points.
              </p>

              <p className="hero-description" style={{ marginTop: 'var(--space-md)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>MyAttendTracker</strong> — my flagship project — is a free attendance tracking app used by students to monitor their class attendance and calculate safe bunks.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  View my work <ArrowRight />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get in touch
                </a>
              </div>
            </div>

            {/* Right: Live Calculator */}
            <div className="calc-widget reveal">
              <div className="calc-header">
                <span className="calc-title">Mini Bunk Calculator</span>
                <span className="calc-badge">Live Demo</span>
              </div>

              <div className="calc-inputs">
                <div className="calc-field">
                  <label htmlFor="conducted">Total Classes</label>
                  <input
                    id="conducted"
                    type="number"
                    min={0}
                    value={conducted}
                    onChange={(e) => setConducted(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div className="calc-field">
                  <label htmlFor="attended">Attended</label>
                  <input
                    id="attended"
                    type="number"
                    min={0}
                    max={conducted}
                    value={attended}
                    onChange={(e) => setAttended(Math.max(0, Math.min(conducted, Number(e.target.value))))}
                  />
                </div>
              </div>

              <div className="calc-result">
                <div className="calc-ring">
                  <svg viewBox="0 0 80 80">
                    <circle className="calc-ring-bg" cx="40" cy="40" r="34" />
                    <circle
                      className="calc-ring-fill"
                      cx="40" cy="40" r="34"
                      stroke={ringColor}
                      strokeDasharray={circumference}
                      strokeDashoffset={ringOffset}
                    />
                  </svg>
                  <span className="calc-ring-text">{percentage}%</span>
                </div>
                <div className="calc-meta">
                  <h4 style={{ color: ringColor }}>
                    {isHealthy ? 'On Track' : percentage >= 60 ? 'Needs Attention' : 'Critical'}
                  </h4>
                  <p>{bunkInfo.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="section stack-section" id="stack">
        <div className="container">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            From frontend frameworks to backend tools, here's what I use to ship products.
          </p>

          <div className="stack-categories reveal-stagger" ref={stackRef}>
            <div className="stack-category">
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
            </div>

            <div className="stack-category">
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
            </div>

            <div className="stack-category">
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
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-label">Projects</div>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Real projects solving real problems — shipped, deployed, and used by people.
          </p>

          <div className="projects-grid" ref={projectRef}>
            {/* Featured: MyAttendTracker */}
            <article className="project-card reveal">
              <div className="project-card-image">
                <img src={projAttendImg} alt="MyAttendTracker dashboard showing attendance analytics" />
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
                  <a href="https://myattendtracker.com" target="_blank" rel="noopener noreferrer" className="project-link">
                    Visit Live Site <ExternalLink />
                  </a>
                  <a href="https://github.com/Jeet-dhali" target="_blank" rel="noopener noreferrer" className="project-link">
                    Source Code <GithubIcon />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section className="section" id="education" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Education</div>
          <h2 className="section-title">Academic background</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Where I've been learning and growing as a developer.
          </p>

          <div className="education-cards reveal-stagger" ref={eduRef}>
            <div className="edu-card">
              <div className="edu-date">2022 — Present</div>
              <h3>B.Tech in Computer Science</h3>
              <span className="edu-institution">University (Pursuing)</span>
              <p className="edu-details">
                Studying core computer science — data structures, algorithms, operating systems, databases, and web development. Building projects that solve student pain points.
              </p>
            </div>

            <div className="edu-card">
              <div className="edu-date">2020 — 2022</div>
              <h3>Higher Secondary (12th Grade)</h3>
              <span className="edu-institution">Science Stream — PCM with CS</span>
              <p className="edu-details">
                Completed higher secondary education with a focus on Physics, Chemistry, Mathematics, and Computer Science. First introduction to programming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's connect</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
            Have a project idea or just want to say hi? Reach out.
          </p>

          <div className="contact-grid" ref={contactRef}>
            <div className="reveal">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <MailIcon />
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:jeet@jeetdhali.dev">jeet@jeetdhali.dev</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <MapPinIcon />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>India</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <GithubIcon />
                </div>
                <div>
                  <h4>GitHub</h4>
                  <p><a href="https://github.com/Jeet-dhali" target="_blank" rel="noopener noreferrer">github.com/Jeet-dhali</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <ExternalLink />
                </div>
                <div>
                  <h4>Portfolio</h4>
                  <p><a href="https://jeetdhali.dev" target="_blank" rel="noopener noreferrer">jeetdhali.dev</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <ExternalLink />
                </div>
                <div>
                  <h4>MyAttendTracker</h4>
                  <p><a href="https://myattendtracker.com" target="_blank" rel="noopener noreferrer">myattendtracker.com</a></p>
                </div>
              </div>
            </div>

            <div className="reveal">
              {formSubmitted ? (
                <div className="form-success">
                  <p style={{ fontSize: '1.25rem', marginBottom: 8 }}>Message sent! 🎉</p>
                  <p style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="form-input"
                      placeholder="Tell me about your project or idea..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    Send message <ArrowRight />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Jeet Dhali. Built with React & Vite.
          </p>
          <div className="footer-links">
            <a href="https://github.com/Jeet-dhali" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://myattendtracker.com" target="_blank" rel="noopener noreferrer">MyAttendTracker</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

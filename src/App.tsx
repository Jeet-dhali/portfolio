import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import './App.css';

// Import local premium assets
import heroDevImg from './assets/hero_development.png';
import projSpeedImg from './assets/project_speed.png';
import projComponentsImg from './assets/project_components.png';
import projDashboardImg from './assets/project_dashboard.png';

interface SkillState {
  react: boolean;
  typescript: boolean;
  tailwind: boolean;
  webgl: boolean;
}

function App() {
  // Page loader state
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusText, setStatusText] = useState('INITIATING BOOT SEQUENCE...');

  // Cursor elements refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Skill configurator state
  const [skills, setSkills] = useState<SkillState>({
    react: true,
    typescript: true,
    tailwind: false,
    webgl: false
  });

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLogs, setFormLogs] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 1. Page Load sequence simulates a tachometer revving up to redline
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate accelerate revving
      const increment = currentProgress < 30 ? 1 : currentProgress < 70 ? 2 : currentProgress < 90 ? 4 : 1;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Adjust load status message based on progress
      if (currentProgress < 25) {
        setStatusText('CHECKING SYSTEMS CORE INTEGRITY...');
      } else if (currentProgress < 50) {
        setStatusText('WARMING REACT COMBUSTION ENGINE...');
      } else if (currentProgress < 75) {
        setStatusText('STABILIZING LAYOUT DOM LAYERS...');
      } else if (currentProgress < 99) {
        setStatusText('REDLINING LIGHTHOUSE ACCELERATION...');
      } else {
        setStatusText('READY (LAUNCHING FASTLANE)');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 600); // Give 600ms to appreciate the 100% / Ready state
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // 2. Custom cursor tracking and interactive hover states
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (cursorRef.current && cursorRingRef.current) {
        cursorRef.current.style.left = `${clientX}px`;
        cursorRef.current.style.top = `${clientY}px`;
        
        // Ring has a slight lag effect
        cursorRingRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is a button, link, toggle-btn, input, or textarea
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.configurator-toggle-btn') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  // 3. Web Stack Tuner logic (calculates metrics in real-time)
  const toggleSkill = (key: keyof SkillState) => {
    setSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateMetrics = () => {
    // 1. Lighthouse Score: base 50. Max 99.
    let lighthouse = 50;
    if (skills.react) lighthouse += 15;
    if (skills.typescript) lighthouse += 10;
    if (skills.tailwind) lighthouse += 24; // Tailwind makes CSS lightweight
    if (skills.webgl) lighthouse -= 5; // WebGL scripts add weight
    lighthouse = Math.min(Math.max(lighthouse, 50), 99);

    // 2. Load Latency (ms): base 800ms. Min 50ms.
    let latency = 800;
    if (skills.react) latency -= 250;
    if (skills.tailwind) latency -= 200;
    if (skills.webgl) latency += 150; // WebGL canvas load
    if (skills.typescript) latency += 20; // compilation safety, minor load overhead
    latency = Math.max(latency, 50);

    // 3. UI Polish Index (%): base 20%. Max 99%.
    let polish = 20;
    if (skills.react) polish += 20;
    if (skills.tailwind) polish += 15;
    if (skills.webgl) polish += 44; // WebGL unlocks full visual graphics
    polish = Math.min(polish, 99);

    // 4. Code Scalability (%): base 30%. Max 99%.
    let scalability = 30;
    if (skills.typescript) scalability += 45; // TypeScript dominates scale
    if (skills.react) scalability += 20; // React component structures
    if (skills.tailwind) scalability += 4;
    scalability = Math.min(scalability, 99);

    return { lighthouse, latency, polish, scalability };
  };

  const metrics = calculateMetrics();

  // 4. Terminal-style form submit action
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormLogs([
      'INITIATING HANDSHAKE TCP/IP...',
      'SENDING ENCRYPTED REQUEST PACKET...',
      `RESOLVED CLIENT: ${name.toUpperCase()} <${email.toUpperCase()}>`,
      'PAYLOAD INJECTED INTO CORRECTIONS PORT...',
      'TRANSMISSION COMPLETE. CONNECTION SECURED.'
    ]);
    setFormSubmitted(true);
  };

  return (
    <>
      {/* High-Precision Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-ring" ref={cursorRingRef}></div>

      {/* Tachometer Page Loader */}
      <div className={`loader-overlay ${isLoaded ? 'fade-out' : ''}`}>
        <div className="loader-container">
          <div className="loader-header">JEET DHALI | PERFORMANCE METRICS</div>
          <div className="loader-gauge-outer">
            <div className="loader-gauge-inner" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loader-percentage">{progress}%</div>
          <div className="loader-status-text">{statusText}</div>
        </div>
      </div>

      {/* Top Nav */}
      <nav className="top-nav">
        <div className="container top-nav-container">
          <a href="#" className="nav-logo">
            JEET DHALI
            <div className="nav-logo-stripe" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#tuner">Tuner</a></li>
            <li><a href="#experience">Track Record</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-status">
            <span className="nav-status-dot" aria-hidden="true"></span>
            STATUS: FASTLANE ACTIVE
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-background">
          <img src={heroDevImg} alt="" />
        </div>
        <div className="hero-grid-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line"></span>
              PORTFOLIO v4.0
            </div>
            <h1 className="hero-title">
              <span>ENGINEERING</span>
              <span>DIGITAL EXPERIENCES.</span>
            </h1>
            <p className="hero-subtitle">
              Jeet Dhali designs and builds high-performance, modular websites with mathematical precision, clean layout code, and striking dark aesthetics.
            </p>
            <a href="#work" className="button-primary">
              EXPLORE LINEUP
            </a>
          </div>
        </div>
      </header>

      {/* Tricolor Stripe Divider */}
      <hr className="m-stripe-divider" />

      {/* Performance Spec Cells */}
      <section className="specs-section">
        <div className="container">
          <div className="specs-grid">
            <div className="spec-cell">
              <div className="spec-val">0.05s</div>
              <div className="spec-label">AVG TTI SPEED</div>
            </div>
            <div className="spec-cell">
              <div className="spec-val">99%</div>
              <div className="spec-label">LIGHTHOUSE PERFORMANCE</div>
            </div>
            <div className="spec-cell">
              <div className="spec-val">100%</div>
              <div className="spec-label">RESPONSIVE COVERAGE</div>
            </div>
            <div className="spec-cell">
              <div className="spec-val">50+</div>
              <div className="spec-label">WEBSITES LAUNCHED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">THE GARAGE</span>
            <h2 className="section-title">FEATURED WEBSITES</h2>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <article className="project-card">
              <div className="project-card-image">
                <img src={projComponentsImg} alt="Abstract modular component architecture visual" />
              </div>
              <div className="project-card-content">
                <div>
                  <span className="project-category">FRONTEND FRAMEWORK</span>
                  <h3 className="project-title">PROJECT CARBON UI</h3>
                  <p className="project-desc">
                    A zero-dependencies web rendering layout component library, strictly optimized for sub-millisecond layout calculations and seamless responsive reflow.
                  </p>
                </div>
                <div>
                  <div className="project-specs">
                    <div className="project-spec-item">
                      <span className="project-spec-label">SPEED</span>
                      <span className="project-spec-val">120 FPS</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">WEIGHT</span>
                      <span className="project-spec-val">12.5 KB</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">STACK</span>
                      <span className="project-spec-val">TS / CANVAS</span>
                    </div>
                  </div>
                  <a href="#contact" className="text-link">
                    REQUEST ARCHITECTURE DETAILS
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="project-card">
              <div className="project-card-image">
                <img src={projDashboardImg} alt="Futuristic web telemetry dashboard visual" />
              </div>
              <div className="project-card-content">
                <div>
                  <span className="project-category">REAL-TIME TELEMETRY</span>
                  <h3 className="project-title">FASTLANE METRICS</h3>
                  <p className="project-desc">
                    A high-density analytics dashboard featuring WebGL rendering and WebSocket subscriptions, displaying live server loads and performance graphs.
                  </p>
                </div>
                <div>
                  <div className="project-specs">
                    <div className="project-spec-item">
                      <span className="project-spec-label">RESPONSE</span>
                      <span className="project-spec-val">0.8ms</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">CAPACITY</span>
                      <span className="project-spec-val">1M req/s</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">STACK</span>
                      <span className="project-spec-val">REACT / WASM</span>
                    </div>
                  </div>
                  <a href="#contact" className="text-link">
                    TEST TELEMETRY SPEED
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="project-card">
              <div className="project-card-image">
                <img src={projSpeedImg} alt="Abstract representation of speed data charts" />
              </div>
              <div className="project-card-content">
                <div>
                  <span className="project-category">SYSTEMS DEV</span>
                  <h3 className="project-title">PROJECT NITRO SSR</h3>
                  <p className="project-desc">
                    A blazing fast server-side compiler built in Rust that converts dynamic data templates to static layouts in microseconds with zero layout shift.
                  </p>
                </div>
                <div>
                  <div className="project-specs">
                    <div className="project-spec-item">
                      <span className="project-spec-label">SPEEDUP</span>
                      <span className="project-spec-val">15x FASTER</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">CLS RATING</span>
                      <span className="project-spec-val">0.000</span>
                    </div>
                    <div className="project-spec-item">
                      <span className="project-spec-label">STACK</span>
                      <span className="project-spec-val">RUST / NODE</span>
                    </div>
                  </div>
                  <a href="#contact" className="text-link">
                    VIEW COMPILER BENCHMARKS
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Skill Tuner Configurator */}
      <section id="tuner" className="section-padding configurator-section" style={{ borderTop: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">THE TUNING BAY</span>
            <h2 className="section-title">WEB STACK TUNER</h2>
          </div>

          <div className="configurator-grid">
            {/* Left Column: Toggles */}
            <div className="configurator-controls">
              <h3 className="configurator-controls-title">SELECT TECHNOLOGIES</h3>
              <p className="configurator-controls-desc">
                Toggle technologies on/off to watch real-time performance telemetry calculations adapt to your layout configuration.
              </p>

              <div className="configurator-toggles">
                <button 
                  type="button" 
                  className={`configurator-toggle-btn ${skills.react ? 'active' : ''}`}
                  onClick={() => toggleSkill('react')}
                >
                  <div className="toggle-info">
                    <h4>REACT CORE</h4>
                    <p>Enables component architecture and state bindings</p>
                  </div>
                  <div className="toggle-status"></div>
                </button>

                <button 
                  type="button" 
                  className={`configurator-toggle-btn ${skills.typescript ? 'active' : ''}`}
                  onClick={() => toggleSkill('typescript')}
                >
                  <div className="toggle-info">
                    <h4>TYPESCRIPT INTEGRITY</h4>
                    <p>Enforces strict compilation and type scaling</p>
                  </div>
                  <div className="toggle-status"></div>
                </button>

                <button 
                  type="button" 
                  className={`configurator-toggle-btn ${skills.tailwind ? 'active' : ''}`}
                  onClick={() => toggleSkill('tailwind')}
                >
                  <div className="toggle-info">
                    <h4>TAILWIND UTILITIES</h4>
                    <p>Minimizes CSS footprint for ultra-light layout sizing</p>
                  </div>
                  <div className="toggle-status"></div>
                </button>

                <button 
                  type="button" 
                  className={`configurator-toggle-btn ${skills.webgl ? 'active' : ''}`}
                  onClick={() => toggleSkill('webgl')}
                >
                  <div className="toggle-info">
                    <h4>WEBGL ACCELERATION</h4>
                    <p>Unlocks hardware-accelerated layouts and transitions</p>
                  </div>
                  <div className="toggle-status"></div>
                </button>
              </div>
            </div>

            {/* Right Column: Output Telemetry */}
            <div className="configurator-telemetry">
              <div>
                <div className="telemetry-header">
                  <h3>SYSTEM FEEDBACK</h3>
                  <div className="telemetry-status-pill">
                    TELEMETRY ON
                  </div>
                </div>

                <div className="telemetry-gauges">
                  {/* Gauge 1: Lighthouse */}
                  <div className="gauge-item">
                    <div className="gauge-labels">
                      <span className="gauge-name">Lighthouse Score</span>
                      <span className="gauge-val">{metrics.lighthouse}%</span>
                    </div>
                    <div className="gauge-track">
                      <div className="gauge-bar m-gradient" style={{ width: `${metrics.lighthouse}%` }}></div>
                    </div>
                  </div>

                  {/* Gauge 2: Latency */}
                  <div className="gauge-item">
                    <div className="gauge-labels">
                      <span className="gauge-name">Time To Interactive (TTI)</span>
                      <span className="gauge-val">{metrics.latency}ms</span>
                    </div>
                    <div className="gauge-track">
                      {/* Scale width inversely: 100% width = 50ms (best), 0% = 800ms (worst) */}
                      <div 
                        className="gauge-bar" 
                        style={{ 
                          width: `${Math.max(10, ((800 - metrics.latency) / 750) * 100)}%`,
                          backgroundColor: metrics.latency < 200 ? 'var(--success)' : metrics.latency < 500 ? 'var(--warning)' : 'var(--m-red)'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Gauge 3: UI Polish */}
                  <div className="gauge-item">
                    <div className="gauge-labels">
                      <span className="gauge-name">Visual Polish / Animations</span>
                      <span className="gauge-val">{metrics.polish}%</span>
                    </div>
                    <div className="gauge-track">
                      <div className="gauge-bar" style={{ width: `${metrics.polish}%`, backgroundColor: 'var(--m-blue-light)' }}></div>
                    </div>
                  </div>

                  {/* Gauge 4: Scalability */}
                  <div className="gauge-item">
                    <div className="gauge-labels">
                      <span className="gauge-name">Codebase Scalability</span>
                      <span className="gauge-val">{metrics.scalability}%</span>
                    </div>
                    <div className="gauge-track">
                      <div className="gauge-bar" style={{ width: `${metrics.scalability}%`, backgroundColor: 'var(--m-blue-dark)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="telemetry-summary">
                {skills.react && skills.typescript && skills.tailwind && !skills.webgl && (
                  <span><strong>Optimal Configuration Detected:</strong> Maximum compile integrity, ultra-light stylesheet bundle, and modular rendering tree. Extremely high structural strength.</span>
                )}
                {skills.webgl && (
                  <span><strong>Warning (High Polish Mode):</strong> WebGL canvas injects heavy scripts. Ensure visual performance matches core network metrics by using lazy-load boundaries.</span>
                )}
                {!skills.react && !skills.typescript && !skills.tailwind && !skills.webgl && (
                  <span><strong>System Offline:</strong> Enable core modules above to compile a high-performance web structure.</span>
                )}
                {((skills.react || skills.typescript || skills.tailwind || skills.webgl) && !(skills.react && skills.typescript && skills.tailwind && !skills.webgl) && !skills.webgl) && (
                  <span><strong>System Operating:</strong> Core metrics compiled successfully. Adjust toggles in the bay to fine-tune your web configuration.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding" style={{ borderTop: '1px solid var(--hairline)', backgroundColor: 'var(--surface-soft)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">THE LOGS</span>
            <h2 className="section-title">ENGINEERING TRACK RECORD</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-badge"></div>
              <span className="timeline-date">2024 — PRESENT</span>
              <div className="timeline-title">
                <h3>LEAD WEBSITE ARCHITECT</h3>
                <span className="timeline-company">VOLT CREATIVE AGENCY</span>
              </div>
              <p className="timeline-desc">
                Architecting premium dark-themed promotional websites, high-speed marketing landing pages, and customized component libraries for enterprise clients. Standardized structural layout patterns resulting in 30% speedups.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-badge"></div>
              <span className="timeline-date">2022 — 2024</span>
              <div className="timeline-title">
                <h3>FULL-STACK WEB ENGINEER</h3>
                <span className="timeline-company">APEX WEB SYSTEMS</span>
              </div>
              <p className="timeline-desc">
                Engineered server-side compiled sites, optimized database layers, and developed custom interactive modules using React and TypeScript. Managed full deployments to Vercel/AWS with zero downtime and strict cache headers.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-badge"></div>
              <span className="timeline-date">2020 — 2022</span>
              <div className="timeline-title">
                <h3>UI DEVELOPER</h3>
                <span className="timeline-company">STUDIO ZERO</span>
              </div>
              <p className="timeline-desc">
                Collaborated with creative designers to translate high-fidelity designs into pixel-perfect CSS layouts. Implemented custom WebGL layouts and subtle micro-interactions that boosted user retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding contact-section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-header">
                <span className="section-eyebrow">FASTLINK DIRECT</span>
                <h2 className="section-title">INITIATE HANDSHAKE</h2>
              </div>
              <div className="contact-telemetry-text">
                <p style={{ marginBottom: 'var(--space-md)' }}>
                  Submit a message via the secure terminal shell to establish a connection.
                </p>
                <p>
                  For direct engineering consultation: <br />
                  <strong style={{ color: 'var(--on-dark)' }}>jeet@jeetdhali.dev</strong>
                </p>
              </div>
            </div>

            <div>
              {formSubmitted ? (
                <div className="contact-form" style={{ fontFamily: 'monospace', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ color: 'var(--success)', marginBottom: 'var(--space-md)' }}>SYSTEM MESSAGE: TRANSMISSION SUCCESSFUL</p>
                  {formLogs.map((log, idx) => (
                    <p key={idx} style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '4px' }}>
                      &gt; {log}
                    </p>
                  ))}
                  <button 
                    type="button" 
                    className="button-primary-outline" 
                    style={{ marginTop: 'var(--space-lg)', width: 'fit-content' }}
                    onClick={() => {
                      setFormSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                      setFormLogs([]);
                    }}
                  >
                    RESET TERMINAL
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">guest@jeetdhali.dev:~$ input --name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="form-control" 
                      placeholder="YOUR NAME" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">guest@jeetdhali.dev:~$ input --email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      placeholder="YOUR EMAIL" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">guest@jeetdhali.dev:~$ input --message</label>
                    <textarea 
                      id="message" 
                      className="form-control" 
                      placeholder="WRITE TRANSMISSION CONTENT..." 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="button-primary">
                    INITIATE_HANDSHAKE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div>
            &copy; {new Date().getFullYear()} JEET DHALI. ALL RIGHTS RESERVED.
          </div>
          <div>
            BUILT WITH MOTORSPORT PRECISION IN INTER WEB ENVIRONMENT.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

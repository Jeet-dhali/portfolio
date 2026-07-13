import { useState } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon } from './Icons';
import './Navigation.css';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container navbar-inner">
        <motion.a 
          href="#" 
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Jeet<span>.</span>
        </motion.a>

        <ul className="nav-links" style={mobileOpen ? { display: 'flex', position: 'fixed', top: 72, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, zIndex: 99 } : undefined}>
          <li><a href="#about" onClick={handleNavClick}>About</a></li>
          <li><a href="#stack" onClick={handleNavClick}>Tech Stack</a></li>
          <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
          <li><a href="#education" onClick={handleNavClick}>Education</a></li>
          <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
        </ul>

        <motion.a 
          href="https://github.com/Jeet-dhali" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-cta"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <GithubIcon /> GitHub
        </motion.a>

        <motion.button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen(!mobileOpen)} 
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </div>
    </motion.nav>
  );
}

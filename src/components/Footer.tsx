import { motion } from 'framer-motion';
import "./Footer.css"
import "../styles/layout.css"
import "../styles/buttons.css"

export function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container footer-inner">
        <motion.p 
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} Jeet Dhali.
        </motion.p>
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a 
            href="https://github.com/Jeet-dhali" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            GitHub
          </motion.a>
          <motion.a 
            href="https://myattendtracker.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            MyAttendTracker
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ y: -2, color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
}

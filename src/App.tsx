import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <TechStack />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
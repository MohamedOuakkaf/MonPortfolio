import { useState } from 'react'

import './App.css'

import Navbar from "./composants/Navbar";
import Home from "./composants/Home";
import About from "./composants/About";
import Projects from "./composants/Projects";
import Contact from "./composants/Contact";
import Loader from "./composants/Loader";
import PageTransition from "./composants/PageTransition";
import Skills from "./composants/Skills";

function App() {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState('about');

  // Called by Home when user clicks "About Me"
  const navigateTo = (sectionId: string) => {
    if (transitioning) return;
    setTargetSection(sectionId);
    setTransitioning(true);
  };

  // Called by PageTransition at the curtain's peak (full black screen)
  const handleTransitionMid = () => {
    // Scroll to the target section while screen is black
    const el = document.getElementById(targetSection);
    if (el) el.scrollIntoView({ behavior: 'instant' });
    setTransitioning(false);
  };

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="bg-dark text-light">
      <Navbar />
      <PageTransition active={transitioning} onComplete={handleTransitionMid} />
      <Home navigateTo={navigateTo} />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
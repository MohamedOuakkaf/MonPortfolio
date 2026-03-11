import { useState } from 'react'

import './App.css'

import Navbar from "./composants/Navbar";
import Home from "./composants/Home";
import About from "./composants/About";
import Projects from "./composants/Projects";
import Contact from "./composants/Contact";
import Loader from "./composants/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="bg-dark text-light">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
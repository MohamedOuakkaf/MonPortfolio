import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import "./Loader.css";

const texts = [
  "Fullstack Developer",
  "Cybersecurity",
  "Network Specialist",
  "Cloud Computing",
  "Virtualization Engineer",
  "DevOps Engineer"
];

interface LoaderProps {
  onFinish: () => void;
}

function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progression 0 -> 100 en 2s
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => onFinish(), 800); // fade-out
          return 100;
        }
        return prev + 1; // incrément 1 toutes les 20ms → 100*20ms = 2000ms
      });
    }, 20);

    // Texte dynamique
    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 400); // change plus vite pour tenir dans 2s

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onFinish]);

  const progressColor = `rgba(97, 218, 251, ${0.3 + (progress / 100) * 0.7})`;

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      {/* Particules en fond */}
      <Particles
        className="particles-bg"
        options={{
          background: { color: "#0d1117" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } }
          },
          particles: {
            color: { value: "#61dafb" },
            links: { enable: true, color: "#61dafb", distance: 150 },
            collisions: { enable: false },
            move: { enable: true, speed: 1, random: true },
            number: { value: 60, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } }
          },
          detectRetina: true
        }}
      />

      {/* Cercle de progression */}
      <div className="circle-container">
        <svg className="progress-circle" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#61dafb" />
              <stop offset="100%" stopColor="#21a1f1" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" className="circle-bg"/>
          <circle
            cx="50"
            cy="50"
            r="45"
            className="circle-progress"
            style={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          />
        </svg>
        <div className="progress-text" style={{ color: progressColor }}>
          {progress}%
        </div>
      </div>

      {/* Texte dynamique sous le cercle */}
      <div className="dynamic-text-bottom">
        <span className="im-text">I’m </span>
        <span className="role-text">{texts[textIndex]}</span>
      </div>
    </div>
  );
}

export default Loader;
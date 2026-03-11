import { useEffect, useState, useRef } from "react";

const texts = [
  "Fullstack Developer",
  "Cybersecurity",
  "Network Specialist",
  "Cloud Computing",
  "Virtualization Engineer",
  "DevOps Engineer",
];

interface LoaderProps {
  onFinish: () => void;
}

function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [glitch, setGlitch] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキクケコサシスセソ<>{}[]//\\";
    const cols = Math.floor(canvas.width / 20);
    const drops: number[] = Array(cols).fill(1);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(13,17,23,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";

      drops.forEach((y, i) => {
        const alpha = Math.random() * 0.3;
        ctx.fillStyle = `rgba(97,218,251,${alpha})`;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Progress animation
  useEffect(() => {
    const duration = 3000;
    let startTime: number | null = null;
    let animId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      const idx = Math.min(
        Math.floor((percent / 100) * texts.length),
        texts.length - 1
      );
      setTextIndex(idx);

      if (percent < 100) {
        animId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => {
            setIsFinishing(true);
            setTimeout(onFinish, 900);
          }, 400);
        }, 600);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [onFinish]);

  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * progress) / 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ldr-wrap {
          position: fixed;
          inset: 0;
          background: #0d1117;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Share Tech Mono', monospace;
        }

        .ldr-canvas {
          position: absolute;
          inset: 0;
          opacity: 0.4;
        }

        .ldr-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.12) 3px,
            rgba(0,0,0,0.12) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .ldr-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .ldr-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .ldr-header {
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: rgba(97,218,251,0.45);
          text-transform: uppercase;
          margin-bottom: 36px;
          animation: flicker 4s infinite;
        }

        .ldr-ring-wrap {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .ldr-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          filter: drop-shadow(0 0 8px rgba(97,218,251,0.5));
        }

        .ldr-track {
          fill: none;
          stroke: rgba(97,218,251,0.08);
          stroke-width: 3;
        }

        .ldr-arc {
          fill: none;
          stroke: url(#arcGrad);
          stroke-width: 3;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.08s linear;
        }

        .ldr-arc-glow {
          fill: none;
          stroke: rgba(97,218,251,0.15);
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.08s linear;
          filter: blur(4px);
        }

        .ldr-hex {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ldr-hex svg {
          width: 90px;
          height: 90px;
          animation: hexSpin 12s linear infinite;
          opacity: 0.25;
        }

        @keyframes hexSpin {
          to { transform: rotate(360deg); }
        }

        .ldr-pct {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .ldr-num {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
          text-shadow: 0 0 20px rgba(97,218,251,0.8), 0 0 40px rgba(97,218,251,0.4);
        }

        .ldr-sym {
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(97,218,251,0.6);
          letter-spacing: 0.1em;
        }

        .ldr-bar-wrap {
          margin-top: 36px;
          width: 260px;
        }

        .ldr-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: rgba(97,218,251,0.35);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .ldr-bar-track {
          width: 100%;
          height: 2px;
          background: rgba(97,218,251,0.1);
          position: relative;
          overflow: hidden;
        }

        .ldr-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #21a1f1, #61dafb, #a8efff);
          box-shadow: 0 0 10px rgba(97,218,251,0.7);
          transition: width 0.08s linear;
        }

        .ldr-bar-shine {
          position: absolute;
          top: 0; left: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shine 1.5s ease-in-out infinite;
        }

        @keyframes shine {
          0%   { transform: translateX(-30px); }
          100% { transform: translateX(290px); }
        }

        .ldr-role-wrap {
          margin-top: 28px;
          text-align: center;
        }

        .ldr-role-wrap {
          margin-top: 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .ldr-role-line {
          display: flex;
          align-items: baseline;
          gap: 10px;
          animation: roleIn 0.3s ease-out forwards;
        }

        .ldr-role-iam {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          color: #ff9f43;
          text-transform: uppercase;
          text-shadow: 0 0 14px rgba(255,159,67,0.7);
        }

        .ldr-role {
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #61dafb;
          text-transform: uppercase;
          text-shadow: 0 0 14px rgba(97,218,251,0.7);
        }

        @keyframes roleIn {
          from { opacity: 0; transform: translateY(6px) skewX(-5deg); }
          to   { opacity: 1; transform: translateY(0) skewX(0deg); }
        }

        .ldr-corner {
          position: absolute;
          width: 50px;
          height: 50px;
          z-index: 2;
          opacity: 0.4;
        }
        .ldr-corner--tl { top: 20px; left: 20px; border-top: 1px solid #61dafb; border-left: 1px solid #61dafb; }
        .ldr-corner--tr { top: 20px; right: 20px; border-top: 1px solid #61dafb; border-right: 1px solid #61dafb; }
        .ldr-corner--bl { bottom: 20px; left: 20px; border-bottom: 1px solid #61dafb; border-left: 1px solid #61dafb; }
        .ldr-corner--br { bottom: 20px; right: 20px; border-bottom: 1px solid #61dafb; border-right: 1px solid #61dafb; }

        @keyframes flicker {
          0%,95%,100% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
          98% { opacity: 0.3; }
          99% { opacity: 1; }
        }

        .ldr-wrap.glitch { animation: glitchShake 0.4s ease-in-out; }
        @keyframes glitchShake {
          0%,100% { transform: translate(0,0) skewX(0); }
          20% { transform: translate(-3px,1px) skewX(2deg); filter: hue-rotate(45deg); }
          40% { transform: translate(3px,-1px) skewX(-2deg); }
          60% { transform: translate(-2px,2px) skewX(1deg); filter: hue-rotate(-30deg); }
          80% { transform: translate(2px,-2px) skewX(-1deg); }
        }

        .ldr-wrap.fade-out {
          animation: exitAnim 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes exitAnim {
          0%   { opacity: 1; transform: scale(1);    filter: brightness(1); }
          50%  { opacity: 1; transform: scale(1.02); filter: brightness(1.5); }
          100% { opacity: 0; transform: scale(1.05); filter: brightness(2) blur(4px); visibility: hidden; }
        }
      `}</style>

      <div className={`ldr-wrap${glitch ? " glitch" : ""}${isFinishing ? " fade-out" : ""}`}>
        <canvas ref={canvasRef} className="ldr-canvas" />
        <div className="ldr-scanlines" />
        <div className="ldr-vignette" />

        <div className="ldr-corner ldr-corner--tl" />
        <div className="ldr-corner ldr-corner--tr" />
        <div className="ldr-corner ldr-corner--bl" />
        <div className="ldr-corner ldr-corner--br" />

        <div className="ldr-content">
          <div className="ldr-header">System Initialization</div>

          <div className="ldr-ring-wrap">
            <div className="ldr-hex">
              <svg viewBox="0 0 100 100" fill="none">
                <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" stroke="#61dafb" strokeWidth="1.5" />
                <polygon points="50,18 80,34 80,66 50,82 20,66 20,34" stroke="#61dafb" strokeWidth="0.8" />
              </svg>
            </div>

            <svg className="ldr-svg" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#21a1f1" />
                  <stop offset="100%" stopColor="#a8efff" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r={r} className="ldr-track" />
              <circle
                cx="60" cy="60" r={r}
                className="ldr-arc-glow"
                strokeDasharray={circ}
                strokeDashoffset={offset}
              />
              <circle
                cx="60" cy="60" r={r}
                className="ldr-arc"
                strokeDasharray={circ}
                strokeDashoffset={offset}
              />
            </svg>

            <div className="ldr-pct">
              <span className="ldr-num">{Math.floor(progress)}</span>
              <span className="ldr-sym">%</span>
            </div>
          </div>

          <div className="ldr-bar-wrap">
            <div className="ldr-bar-label">
              <span>Loading</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="ldr-bar-track">
              <div className="ldr-bar-fill" style={{ width: `${progress}%` }} />
              <div className="ldr-bar-shine" />
            </div>
          </div>

          <div className="ldr-role-wrap">
            <div key={textIndex} className="ldr-role-line">
              <span className="ldr-role-iam">I am</span>
              <span className="ldr-role">{texts[textIndex]}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

export default function PageTransition({ active, onComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'leave'>('idle');

  useEffect(() => {
    if (!active) return;

    // Phase 1 : rideau descend (0 → 0.45s)
    setPhase('enter');

    // Phase 2 : callback au milieu (rideau plein écran)
    const midTimer = setTimeout(() => {
      onComplete?.();
    }, 500);

    // Phase 3 : rideau remonte (0.9s total)
    const leaveTimer = setTimeout(() => {
      setPhase('leave');
    }, 550);

    // Phase 4 : reset
    const resetTimer = setTimeout(() => {
      setPhase('idle');
    }, 1200);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(leaveTimer);
      clearTimeout(resetTimer);
    };
  }, [active]);

  if (phase === 'idle') return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

        @keyframes curtainDown {
          0%   { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes curtainUp {
          0%   { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        @keyframes fadeLetters {
          0%   { opacity: 0; letter-spacing: 0.5em; }
          40%  { opacity: 1; letter-spacing: 0.2em; }
          70%  { opacity: 1; letter-spacing: 0.2em; }
          100% { opacity: 0; letter-spacing: 0.05em; }
        }
        @keyframes lineGrow {
          0%   { width: 0; }
          50%  { width: 80px; }
          100% { width: 0; }
        }
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100%; }
        }

        .curtain-wrap {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
        }
        .curtain-top {
          flex: 1;
          background: #060910;
          transform: scaleY(0);
          transform-origin: top;
        }
        .curtain-bottom {
          flex: 1;
          background: #060910;
          transform: scaleY(0);
          transform-origin: bottom;
        }

        /* ENTER */
        .curtain-enter .curtain-top {
          animation: curtainDown 0.45s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .curtain-enter .curtain-bottom {
          animation: curtainDown 0.45s cubic-bezier(0.76, 0, 0.24, 1) 0.05s forwards;
        }

        /* LEAVE */
        .curtain-leave .curtain-top {
          transform: scaleY(1);
          animation: curtainUp 0.45s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .curtain-leave .curtain-bottom {
          transform: scaleY(1);
          animation: curtainUp 0.45s cubic-bezier(0.76, 0, 0.24, 1) 0.05s forwards;
        }

        .curtain-center {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          pointer-events: none;
          animation: fadeLetters 0.9s ease 0.2s forwards;
          opacity: 0;
        }
        .curtain-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #00d2be;
        }
        .curtain-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #00d2be, transparent);
          animation: lineGrow 0.9s ease 0.2s forwards;
          width: 0;
        }
        .curtain-scan {
          position: fixed;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,210,190,0.4), transparent);
          z-index: 10001;
          top: -2px;
          pointer-events: none;
          animation: scanline 0.9s linear 0.2s forwards;
        }
      `}</style>

      <div className={`curtain-wrap curtain-${phase}`}>
        <div className="curtain-top" />
        <div className="curtain-bottom" />
      </div>

      <div className="curtain-center">
        <div className="curtain-label">Mohamed Ouakkaf</div>
        <div className="curtain-line" />
      </div>

      <div className="curtain-scan" />
    </>
  );
}

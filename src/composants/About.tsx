import { useEffect, useRef, useState } from "react";

// Ligne 3 — remplace par :
import photo from './photo.png';
// Et supprime la ligne const photo = "https://..."

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const details = [
    { icon: "📞", label: "Phone", value: "0693347945" },
    { icon: "✉️", label: "Email", value: "okfmohammed9@gmail.com" },
    { icon: "📍", label: "From", value: "Morocco, Fez" },
    { icon: "🌐", label: "Language", value: "Arabic, English, French" },
  ];

  const tags = ["Full-Stack Dev", "Cloud Engineer", "Network Infra", "React", "Node.js", "AWS"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideTag {
          from { opacity: 0; transform: translateY(16px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lineDraw {
          from { width: 0; opacity: 0; }
          to   { width: 2rem; opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,210,190,0.2); }
          50%       { box-shadow: 0 0 50px rgba(0,210,190,0.4); }
        }
        @keyframes brushStroke {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes paintDrip {
          0%   { transform: scaleY(0); opacity: 0.8; }
          60%  { transform: scaleY(1.05); }
          100% { transform: scaleY(1); opacity: 1; }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-section {
          font-family: 'DM Sans', sans-serif;
          background: #060910;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: -200px; right: -100px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,210,190,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-section::after {
          content: '';
          position: absolute;
          bottom: -200px; left: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* HEADER */
        .about-header { margin-bottom: 5rem; }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #00d2be; margin-bottom: 1.2rem;
          opacity: 0;
        }
        .section-label.visible {
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
        }
        .section-label::before {
          content: '';
          height: 1px; background: #00d2be;
          animation: lineDraw 0.6s ease 0.3s both;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800; color: #f0f4f8;
          line-height: 1.05; letter-spacing: -0.02em;
          opacity: 0;
        }
        .section-title.visible {
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;
        }
        .section-title span {
          background: linear-gradient(135deg, #00d2be, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* GRID */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* IMAGE */
        .image-col { opacity: 0; }
        .image-col.visible {
          animation: fadeLeft 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
        }

        .image-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M5 31 C7 24, 16 13, 23 6 L30 13 C23 20, 12 29, 5 31Z' fill='%2300d2be' opacity='0.95'/%3E%3Crect x='27' y='2' width='5' height='10' rx='2' transform='rotate(45 29 7)' fill='%23c0cfe0'/%3E%3Ccircle cx='5' cy='31' r='2' fill='%236366f1'/%3E%3C/svg%3E") 5 31, crosshair;
        }

        .profile-photo {
          width: 100%;
          height: 580px;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: saturate(0.95) contrast(1.02);
          transition:
            filter 1.3s ease,
            transform 1.5s cubic-bezier(0.16, 1, 0.3, 1),
            clip-path 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          position: relative;
          z-index: 1;
        }

        .image-frame:hover .profile-photo {
          filter:
            saturate(0)
            contrast(1.15)
            brightness(1.08)
            sepia(0.2)
            drop-shadow(0 0 24px rgba(0,210,190,0.4));
          transform: scale(1.04) rotate(-0.8deg);
          clip-path: polygon(
            1% 2%,   96% 0%,
            100% 2%,  99% 96%,
            98% 100%, 2%  99%,
            0%  97%,  2%  2%
          );
        }

        /* Texture peinture */
        .paint-texture {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.3s ease;
          background:
            repeating-linear-gradient(
              91deg,
              transparent 0px, transparent 2px,
              rgba(0,210,190,0.04) 2px, rgba(0,210,190,0.04) 3px
            ),
            repeating-linear-gradient(
              181deg,
              transparent 0px, transparent 4px,
              rgba(99,102,241,0.03) 4px, rgba(99,102,241,0.03) 5px
            );
          mix-blend-mode: overlay;
        }
        .image-frame:hover .paint-texture { opacity: 1; }

        /* Grain canvas */
        .paint-grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.5s ease;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }
        .image-frame:hover .paint-grain { opacity: 1; }

        /* Trait bas */
        .image-frame::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, #00d2be, #6366f1, #00d2be);
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 4;
        }
        .image-frame:hover::after {
          transform: scaleX(1);
          animation: brushStroke 2s linear infinite;
        }

        /* Trait gauche */
        .image-frame::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, transparent, #00d2be, #6366f1, transparent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          z-index: 4;
        }
        .image-frame:hover::before {
          transform: scaleY(1);
          animation: paintDrip 0.8s ease forwards;
        }

        /* CONTENT */
        .name-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700; color: #f0f4f8;
          line-height: 1.2; margin-bottom: 0.5rem;
          opacity: 0;
        }
        .name-heading.visible {
          animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
        }
        .name-heading .highlight {
          background: linear-gradient(135deg, #00d2be, #5eead4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .role-text {
          font-size: 0.95rem; font-weight: 400;
          color: #6366f1; letter-spacing: 0.05em;
          margin-bottom: 2rem; font-style: italic;
          opacity: 0;
        }
        .role-text.visible {
          animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s forwards;
        }

        .tags-row {
          display: flex; flex-wrap: wrap;
          gap: 0.5rem; margin-bottom: 2rem;
        }
        .tag {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.35rem 0.85rem; border-radius: 100px;
          border: 1px solid rgba(0,210,190,0.2);
          color: #00d2be; background: rgba(0,210,190,0.05);
          transition: all 0.2s ease; opacity: 0;
        }
        .tag.visible {
          animation: slideTag 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .tag:hover {
          background: rgba(0,210,190,0.12);
          border-color: rgba(0,210,190,0.5);
        }

        .bio-text {
          color: #8896a7; font-size: 0.975rem;
          line-height: 1.85; margin-bottom: 2.5rem;
          font-weight: 300; opacity: 0;
        }
        .bio-text.visible {
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .bio-text strong { color: #c0cfe0; font-weight: 500; }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem; margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .details-grid { grid-template-columns: 1fr; }
        }
        .detail-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.75rem;
          padding: 0.9rem 1.1rem;
          display: flex; align-items: center; gap: 0.75rem;
          transition: all 0.25s ease; opacity: 0;
        }
        .detail-card.visible {
          animation: cardPop 0.6s cubic-bezier(0.34,1.3,0.64,1) forwards;
        }
        .detail-card:hover {
          background: rgba(0,210,190,0.04);
          border-color: rgba(0,210,190,0.15);
          transform: translateY(-2px);
        }
        .detail-icon {
          font-size: 1rem; flex-shrink: 0;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,210,190,0.07); border-radius: 8px;
        }
        .detail-info { min-width: 0; }
        .detail-label {
          font-size: 0.65rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #3d4f63; margin-bottom: 2px;
        }
        .detail-value {
          font-size: 0.85rem; color: #9ab0c5; font-weight: 400;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin-bottom: 2rem; opacity: 0;
        }
        .divider.visible { animation: fadeIn 0.6s ease forwards; }

        .cta-row {
          display: flex; align-items: center;
          gap: 1rem; flex-wrap: wrap; opacity: 0;
        }
        .cta-row.visible {
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .btn-cv {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.9rem 2rem; border-radius: 0.6rem;
          background: linear-gradient(135deg, #00d2be, #00b8a5);
          color: #060910; text-decoration: none;
          transition: all 0.3s ease;
          animation: glowPulse 3s ease-in-out infinite;
          position: relative; overflow: hidden;
        }
        .btn-cv::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .btn-cv:hover { transform: translateY(-3px); }
        .btn-cv:hover::before { opacity: 1; }
        .btn-cv svg { width: 16px; height: 16px; }

        .btn-social {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 0.6rem;
          border: 1px solid rgba(255,255,255,0.08);
          color: #6b7a8d; text-decoration: none;
          transition: all 0.25s ease;
          background: rgba(255,255,255,0.02);
        }
        .btn-social:hover {
          border-color: rgba(0,210,190,0.3); color: #00d2be;
          background: rgba(0,210,190,0.05); transform: translateY(-2px);
        }
        .btn-social svg { width: 18px; height: 18px; }
      `}</style>

      <section className="about-section" ref={sectionRef}>
        <div className="grid-bg" />
        <div className="about-container">

          <div className="about-header">
            <p className={`section-label ${visible ? "visible" : ""}`}>Get to know me</p>
            <h2 className={`section-title ${visible ? "visible" : ""}`}>
              Who I <span>Am</span>
            </h2>
          </div>

          <div className="about-grid">

            {/* IMAGE */}
            <div className={`image-col ${visible ? "visible" : ""}`}>
              <div className="image-frame">
                <img src={photo} alt="Mohamed Ouakkaf" className="profile-photo" />
                <div className="paint-texture" />
                <div className="paint-grain" />
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <h3 className={`name-heading ${visible ? "visible" : ""}`}>
                Hi, I'm <span className="highlight">Mohamed Ouakkaf</span>
              </h3>
              <p className={`role-text ${visible ? "visible" : ""}`}>
                Network & Cloud Engineer · Full-Stack Developer
              </p>

              <div className="tags-row">
                {tags.map((t, i) => (
                  <span
                    key={t}
                    className={`tag ${visible ? "visible" : ""}`}
                    style={{ animationDelay: visible ? `${0.7 + i * 0.08}s` : "0s" }}
                  >{t}</span>
                ))}
              </div>

              <p
                className={`bio-text ${visible ? "visible" : ""}`}
                style={{ animationDelay: "1.1s" }}
              >
                A passionate <strong>Full-Stack Developer</strong> with a strong background in{" "}
                <strong>network infrastructure</strong> and <strong>cloud computing</strong>. I build modern web
                applications and design efficient digital solutions that bridge{" "}
                <strong>development, networking, and cloud technologies</strong>. Currently studying at{" "}
                <strong>OFPPT</strong>, specializing in Digital Infrastructure and Cloud Computing, driven
                by <strong>virtualization, cloud platforms, and network security</strong>.
              </p>

              <div className="details-grid">
                {details.map(({ icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`detail-card ${visible ? "visible" : ""}`}
                    style={{ animationDelay: visible ? `${1.2 + i * 0.1}s` : "0s" }}
                  >
                    <span className="detail-icon">{icon}</span>
                    <div className="detail-info">
                      <div className="detail-label">{label}</div>
                      <div className="detail-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`divider ${visible ? "visible" : ""}`} style={{ animationDelay: "1.65s" }} />

              <div className={`cta-row ${visible ? "visible" : ""}`} style={{ animationDelay: "1.75s" }}>
                <a href="/cv.pdf" download className="btn-cv">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3" />
                  </svg>
                  Download CV
                </a>
                <a href="#" className="btn-social" title="GitHub">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" className="btn-social" title="LinkedIn">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
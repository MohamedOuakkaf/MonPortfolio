import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    id: "web",
    label: "Web Development",
    icon: "⚡",
    color: "#00e5ff",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Node.js / Express", level: 85 },
      { name: "TypeScript", level: 82 },
      { name: "HTML / CSS", level: 95 },
      { name: "REST & GraphQL APIs", level: 80 },
      { name: "MongoDB / PostgreSQL", level: 75 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "☁️",
    color: "#a78bfa",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 80 },
      { name: "Azure", level: 72 },
      { name: "Docker / Kubernetes", level: 78 },
      { name: "CI/CD (GitHub Actions)", level: 75 },
      { name: "Terraform / IaC", level: 65 },
      { name: "Linux Administration", level: 88 },
    ],
  },
  {
    id: "network",
    label: "Network & Security",
    icon: "🔒",
    color: "#34d399",
    skills: [
      { name: "Cisco (CCNA Level)", level: 85 },
      { name: "VPN / Firewall", level: 80 },
      { name: "TCP/IP & Protocols", level: 90 },
      { name: "Cybersecurity / Pentest", level: 70 },
      { name: "Network Monitoring", level: 75 },
      { name: "Active Directory", level: 68 },
    ],
  },
];

const tools = [
  { name: "VS Code", icon: "🖥️" },
  { name: "Git / GitHub", icon: "🗂️" },
  { name: "Figma", icon: "🎨" },
  { name: "Postman", icon: "📡" },
  { name: "Wireshark", icon: "🔍" },
  { name: "VirtualBox", icon: "📦" },
  { name: "Nginx", icon: "⚙️" },
  { name: "Jira", icon: "📋" },
];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("web");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes sk-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sk-lineDraw {
          from { width: 0; opacity: 0; }
          to   { width: 2rem; opacity: 1; }
        }
        @keyframes sk-barFill {
          from { width: 0%; }
        }
        @keyframes sk-popIn {
          from { opacity: 0; transform: scale(0.88) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .skills-section {
          font-family: 'DM Sans', sans-serif;
          background: #060910;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .skills-section::before {
          content: '';
          position: absolute;
          top: -200px; left: -100px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .skills-section::after {
          content: '';
          position: absolute;
          bottom: -200px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .sk-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .sk-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* HEADER */
        .sk-header { margin-bottom: 4rem; }
        .sk-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #00e5ff; margin-bottom: 1.2rem;
          opacity: 0;
        }
        .sk-label.sk-vis { animation: sk-fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
        .sk-label::before {
          content: '';
          height: 1px; background: #00e5ff;
          animation: sk-lineDraw 0.6s ease 0.3s both;
        }
        .sk-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800; color: #f0f4f8;
          line-height: 1.05; letter-spacing: -0.02em;
          opacity: 0;
        }
        .sk-title.sk-vis { animation: sk-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s forwards; }
        .sk-title span {
          background: linear-gradient(135deg, #00e5ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* TABS */
        .sk-tabs {
          display: flex; gap: 0.6rem; flex-wrap: wrap;
          margin-bottom: 3rem; opacity: 0;
        }
        .sk-tabs.sk-vis { animation: sk-fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; }
        .sk-tab {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.55rem 1.2rem; border-radius: 50px;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: rgba(248,250,252,0.5);
          cursor: pointer; transition: all 0.25s ease;
        }
        .sk-tab:hover {
          border-color: rgba(0,229,255,0.2);
          color: rgba(248,250,252,0.85);
          background: rgba(0,229,255,0.04);
        }
        .sk-tab.active {
          background: rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.45);
          color: #00e5ff;
          box-shadow: 0 0 16px rgba(0,229,255,0.12);
        }

        /* MAIN GRID */
        .sk-main {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3.5rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .sk-main { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        /* BARS PANEL */
        .sk-bars-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          padding: 2rem 2.2rem;
          opacity: 0;
        }
        .sk-bars-panel.sk-vis { animation: sk-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }
        .sk-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(248,250,252,0.35);
          margin-bottom: 1.8rem;
        }
        .sk-bar-row { margin-bottom: 1.4rem; }
        .sk-bar-row:last-child { margin-bottom: 0; }
        .sk-bar-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.5rem;
        }
        .sk-bar-name {
          font-size: 0.875rem; font-weight: 500;
          color: rgba(248,250,252,0.85);
        }
        .sk-bar-pct {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: rgba(248,250,252,0.4);
          letter-spacing: 0.05em;
        }
        .sk-track {
          height: 5px; border-radius: 100px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .sk-fill {
          height: 100%; border-radius: 100px;
          animation: sk-barFill 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* RIGHT PANEL: category card + tools */
        .sk-right { display: flex; flex-direction: column; gap: 2rem; }

        /* CATEGORY CARD */
        .sk-cat-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          padding: 1.8rem 2rem;
          opacity: 0;
        }
        .sk-cat-card.sk-vis { animation: sk-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s forwards; }
        .sk-cat-icon {
          font-size: 2.4rem;
          margin-bottom: 1rem;
          display: block;
        }
        .sk-cat-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem; font-weight: 800;
          color: #f0f4f8; margin-bottom: 0.5rem;
        }
        .sk-cat-desc {
          font-size: 0.875rem; font-weight: 300;
          color: rgba(248,250,252,0.45);
          line-height: 1.7;
        }
        .sk-cat-stat {
          margin-top: 1.2rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .sk-cat-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 2rem; font-weight: 800;
          line-height: 1;
        }
        .sk-cat-stat-label {
          font-size: 0.75rem; font-weight: 400;
          color: rgba(248,250,252,0.4);
          line-height: 1.4;
        }

        /* TOOLS */
        .sk-tools-panel {
          opacity: 0;
        }
        .sk-tools-panel.sk-vis { animation: sk-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s forwards; }
        .sk-tools-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(248,250,252,0.35);
          margin-bottom: 1rem;
        }
        .sk-tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
        }
        @media (max-width: 480px) {
          .sk-tools-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .sk-tool {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 0.8rem 0.5rem;
          display: flex; flex-direction: column;
          align-items: center; gap: 0.4rem;
          cursor: default;
          transition: all 0.2s ease;
          opacity: 0;
        }
        .sk-tool.sk-vis { animation: sk-popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .sk-tool:hover {
          border-color: rgba(0,229,255,0.2);
          background: rgba(0,229,255,0.04);
          transform: translateY(-3px);
        }
        .sk-tool-icon { font-size: 1.2rem; }
        .sk-tool-name {
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(248,250,252,0.45);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }
      `}</style>

      <section id="skills" className="skills-section" ref={sectionRef}>
        <div className="sk-grid-bg" />
        <div className="sk-container">

          {/* HEADER */}
          <div className="sk-header">
            <p className={`sk-label ${visible ? "sk-vis" : ""}`}>What I know</p>
            <h2 className={`sk-title ${visible ? "sk-vis" : ""}`}>
              My <span>Skills</span>
            </h2>
          </div>

          {/* TABS */}
          <div className={`sk-tabs ${visible ? "sk-vis" : ""}`}>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={`sk-tab${activeTab === cat.id ? " active" : ""}`}
                onClick={() => setActiveTab(cat.id)}
                style={activeTab === cat.id ? { borderColor: cat.color + "80", color: cat.color } : {}}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* MAIN */}
          <div className="sk-main">

            {/* SKILL BARS */}
            <div className={`sk-bars-panel ${visible ? "sk-vis" : ""}`}>
              <p className="sk-panel-title">Proficiency level</p>
              {active.skills.map((sk, i) => (
                <div className="sk-bar-row" key={sk.name}>
                  <div className="sk-bar-header">
                    <span className="sk-bar-name">{sk.name}</span>
                    <span className="sk-bar-pct">{sk.level}%</span>
                  </div>
                  <div className="sk-track">
                    <div
                      className="sk-fill"
                      style={{
                        width: visible ? `${sk.level}%` : "0%",
                        background: `linear-gradient(90deg, ${active.color}, ${active.color}bb)`,
                        boxShadow: `0 0 8px ${active.color}55`,
                        animationDelay: `${0.6 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="sk-right">

              {/* CATEGORY CARD */}
              <div className={`sk-cat-card ${visible ? "sk-vis" : ""}`}
                style={{ borderColor: active.color + "25", boxShadow: `0 0 30px ${active.color}08` }}>
                <span className="sk-cat-icon">{active.icon}</span>
                <div className="sk-cat-name" style={{ color: active.color }}>{active.label}</div>
                <p className="sk-cat-desc">
                  {active.id === "web" && "Building modern, performant web applications with cutting-edge frameworks and tools. From API design to pixel-perfect UIs."}
                  {active.id === "cloud" && "Architecting scalable cloud infrastructure, automating deployments, and managing containerized environments with DevOps best practices."}
                  {active.id === "network" && "Designing and securing network infrastructure. Experienced in enterprise networks, firewall configuration, and ethical hacking techniques."}
                </p>
                <div className="sk-cat-stat">
                  <span className="sk-cat-stat-num" style={{ color: active.color }}>
                    {Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length)}%
                  </span>
                  <span className="sk-cat-stat-label">Average<br/>proficiency</span>
                </div>
              </div>

              {/* TOOLS */}
              <div className={`sk-tools-panel ${visible ? "sk-vis" : ""}`}>
                <p className="sk-tools-title">Tools & Environment</p>
                <div className="sk-tools-grid">
                  {tools.map((tool, i) => (
                    <div
                      key={tool.name}
                      className={`sk-tool ${visible ? "sk-vis" : ""}`}
                      style={{ animationDelay: `${0.9 + i * 0.06}s` }}
                    >
                      <span className="sk-tool-icon">{tool.icon}</span>
                      <span className="sk-tool-name">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

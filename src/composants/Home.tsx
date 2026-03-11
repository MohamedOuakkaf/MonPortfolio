import { useEffect, useRef, useState } from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './Home.css';

const roles = ['Fullstack Developer', 'Cloud Specialist', 'Network Engineer', 'DevOps Engineer', 'Cybersecurity Expert'];

interface HomeProps {
  navigateTo: (section: string) => void;
}

function Home({ navigateTo }: HomeProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // ══ CLEAN CYBER NETWORK BACKGROUND ══
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    let t = 0;
    let mouseX = W / 2;
    let mouseY = H / 2;
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    // Nodes for interactive cyber network
    interface Node { x:number; y:number; vx:number; vy:number; r:number; hue:number; }
    const nodes: Node[] = Array.from({ length: 250 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      hue: Math.random() > 0.5 ? 190 : 280 // Cyan or Purple
    }));

    const drawNodes = () => {
      nodes.forEach((p, i) => {
        // connect nodes
        nodes.slice(i + 1).forEach(e => {
          const dx = p.x - e.x, dy = p.y - e.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(e.x, e.y);
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `hsla(${(p.hue + e.hue)/2}, 100%, 70%, ${alpha})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        });

        // connect to mouse
        const dxM = p.x - mouseX, dyM = p.y - mouseY;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 180) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouseX, mouseY);
          const alphaM = (1 - distM / 180) * 0.4;
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 75%, ${alphaM})`;
          ctx.lineWidth = 1; ctx.stroke();
          
          // REMOVED ATTRACTION to stop regrouping / clumping
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.9)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // base movement
        p.x += p.vx; 
        p.y += p.vy;

        // Wrap around edges softly
        if (p.x < -50) p.x = W + 50; if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50; if (p.y > H + 50) p.y = -50;
      });
    };

    let animId: number;
    const draw = () => {
      // Smooth fade for trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Solid black to prevent messy trails
      ctx.fillRect(0, 0, W, H);
      
      t++;
      drawNodes(); // Just the network, no aurora
      
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  const socials = [
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn',  color: '#0a66c2' },
    { icon: <FaGithub />,     href: '#', label: 'GitHub',    color: '#333333' },
    { icon: <FaInstagram />,  href: '#', label: 'Instagram', color: '#e1306c' },
    { icon: <FaWhatsapp />,   href: '#', label: 'WhatsApp',  color: '#25d366' },
    { icon: <FaEnvelope />,   href: '#', label: 'Email',     color: '#00e5ff' },
  ];

  return (
    <section id="home" className="home-section">
      <canvas ref={canvasRef} className="home-canvas" />
      <div className="home-orb home-orb--1" />
      <div className="home-orb home-orb--2" />
      <div className="home-orb home-orb--3" />
      <div className="home-orb home-orb--4" />
      <div className="home-grid" />

      <div className="home-container">

        {/* ── LEFT ── */}
        <div className="home-left glass-panel-glow">
          <div className="home-badge">
            <span className="home-badge__dot" />
            Available for freelance
          </div>
          <p className="home-hello">Hello, I'm</p>
          <h1 className="home-name">
            <span className="home-name--first">Mohamed </span>
            <span className="home-name--accent">Ouakkaf</span>
          </h1>
          <div className="home-role-wrap">
            <span className="home-role-prefix">I'm a </span>
            <span className="home-role-text">
              {displayed}<span className="home-cursor" />
            </span>
          </div>
          <p className="home-desc">
            Passionné par les technologies modernes et l'innovation digitale, je développe des
            solutions performantes combinant <strong>développement web</strong>, <strong>cloud computing</strong> et
            infrastructures réseau — systèmes sécurisés, évolutifs et optimisés.
          </p>
          <div className="home-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="home-social" aria-label={s.label}
                style={{ '--social-color': s.color } as React.CSSProperties}>
                {s.icon}
              </a>
            ))}
          </div>
          <div className="home-ctas">
            <button
              className="home-btn home-btn--primary"
              onClick={() => navigateTo('about')}
            >
              <span>About Me</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#projects" className="home-btn home-btn--outline">
              <span>View Projects</span>
            </a>
          </div>
          <div className="home-stats">
            {[
              { value: '3+', label: 'Years Exp.' },
              { value: '20+', label: 'Projects' },
              { value: '15+', label: 'Clients' },
            ].map((s) => (
              <div key={s.label} className="home-stat">
                <span className="home-stat__value">{s.value}</span>
                <span className="home-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="home-right">
          <div className="home-img-wrap">
            <div className="home-ring home-ring--1" />
            <div className="home-ring home-ring--2" />
            <div className="home-ring home-ring--3" />
            <div className="home-glow" />
            <div className="robot-wrap">
              <svg className="robot-svg" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="18" x2="100" y2="38" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="100" cy="13" r="6" fill="#00e5ff" className="robot-antenna-dot"/>
                <rect x="52" y="38" width="96" height="72" rx="18" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1.5"/>
                <g className="robot-eye-left">
                  <rect x="68" y="56" width="24" height="16" rx="8" fill="#00e5ff" opacity="0.15"/>
                  <rect x="68" y="56" width="24" height="16" rx="8" stroke="#00e5ff" strokeWidth="1.2"/>
                  <ellipse cx="80" cy="64" rx="6" ry="6" fill="#00e5ff" className="robot-pupil"/>
                  <ellipse cx="80" cy="64" rx="2.5" ry="2.5" fill="#050810"/>
                  <ellipse cx="82" cy="62" rx="1" ry="1" fill="white" opacity="0.8"/>
                </g>
                <g className="robot-eye-right">
                  <rect x="108" y="56" width="24" height="16" rx="8" fill="#00e5ff" opacity="0.15"/>
                  <rect x="108" y="56" width="24" height="16" rx="8" stroke="#00e5ff" strokeWidth="1.2"/>
                  <ellipse cx="120" cy="64" rx="6" ry="6" fill="#00e5ff" className="robot-pupil"/>
                  <ellipse cx="120" cy="64" rx="2.5" ry="2.5" fill="#050810"/>
                  <ellipse cx="122" cy="62" rx="1" ry="1" fill="white" opacity="0.8"/>
                </g>
                <rect x="76" y="86" width="48" height="10" rx="5" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1.2"/>
                <rect className="robot-mouth-bar" x="80" y="89" width="8" height="4" rx="2" fill="#00e5ff"/>
                <rect className="robot-mouth-bar" x="92" y="89" width="8" height="4" rx="2" fill="#a78bfa"/>
                <rect className="robot-mouth-bar" x="104" y="89" width="8" height="4" rx="2" fill="#34d399"/>
                <rect className="robot-mouth-bar" x="116" y="89" width="4" height="4" rx="2" fill="#00e5ff"/>
                <rect x="92" y="108" width="16" height="12" rx="4" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1"/>
                <rect x="42" y="118" width="116" height="88" rx="16" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.5"/>
                <rect x="62" y="132" width="76" height="44" rx="10" fill="#0d1a2e" stroke="rgba(0,229,255,0.25)" strokeWidth="1"/>
                <circle cx="100" cy="148" r="10" fill="#050810" stroke="#00e5ff" strokeWidth="1.2"/>
                <circle cx="100" cy="148" r="5" fill="#00e5ff" className="robot-power"/>
                <circle cx="72" cy="148" r="3.5" fill="#34d399" className="robot-led robot-led--1"/>
                <circle cx="128" cy="148" r="3.5" fill="#a78bfa" className="robot-led robot-led--2"/>
                <rect x="70" y="162" width="60" height="4" rx="2" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.15)" strokeWidth="0.8"/>
                <rect className="robot-progress" x="70" y="162" width="38" height="4" rx="2" fill="#00e5ff"/>
                <rect x="14" y="122" width="30" height="58" rx="14" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.2"/>
                <circle cx="29" cy="188" r="10" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1"/>
                <circle cx="29" cy="188" r="4" fill="rgba(0,229,255,0.25)"/>
                <g className="robot-arm-right" style={{transformOrigin: '157px 130px'}}>
                  <rect x="156" y="122" width="30" height="58" rx="14" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.2"/>
                  <circle cx="171" cy="188" r="10" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1"/>
                  <circle cx="171" cy="188" r="4" fill="rgba(167,139,250,0.4)"/>
                </g>
                <rect x="68" y="204" width="28" height="44" rx="12" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.2"/>
                <rect x="104" y="204" width="28" height="44" rx="12" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.2"/>
                <rect x="62" y="238" width="38" height="14" rx="7" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1"/>
                <rect x="100" y="238" width="38" height="14" rx="7" fill="#0d1a2e" stroke="#00e5ff" strokeWidth="1"/>
              </svg>
              <div className="robot-tooltip">Bye bye! 👋</div>

              {/* ── 4 skill dots — appear on robot hover ── */}
              <div className="robot-skill-dot robot-skill-dot--1">
                <span className="robot-skill-dot__ring" />
                <div className="robot-skill-dot__popup robot-skill-dot__popup--right">
                  <span className="robot-skill-dot__icon">☁️</span>
                  <strong>Cloud Computing</strong>
                  <span>AWS · Azure · GCP</span>
                </div>
              </div>

              <div className="robot-skill-dot robot-skill-dot--2">
                <span className="robot-skill-dot__ring" />
                <div className="robot-skill-dot__popup robot-skill-dot__popup--left">
                  <span className="robot-skill-dot__icon">🔒</span>
                  <strong>Cybersecurity</strong>
                  <span>Pentest · Firewall · SOC</span>
                </div>
              </div>

              <div className="robot-skill-dot robot-skill-dot--3">
                <span className="robot-skill-dot__ring" />
                <div className="robot-skill-dot__popup robot-skill-dot__popup--right">
                  <span className="robot-skill-dot__icon">🌐</span>
                  <strong>Network & Infra</strong>
                  <span>Cisco · VPN · Linux</span>
                </div>
              </div>

              <div className="robot-skill-dot robot-skill-dot--4">
                <span className="robot-skill-dot__ring" />
                <div className="robot-skill-dot__popup robot-skill-dot__popup--left">
                  <span className="robot-skill-dot__icon">⚙️</span>
                  <strong>DevOps</strong>
                  <span>Docker · K8s · CI/CD</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="home-scroll">
        <div className="home-scroll__line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Home;
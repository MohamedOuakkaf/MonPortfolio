import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";

interface FormData { name:string; project:string; email:string; phone:string; message:string; }

const STEPS = [
  { id:1, code:"01", label:"Identity", field:"name"    as const, q:"What is your name?",       ph:"Full name or company",              type:"text",  tag:"input",    hint:"First & last name, or organization" },
  { id:2, code:"02", label:"Project",  field:"project" as const, q:"What is your project?",    ph:"Server deployment, Cloud migration…",type:"text",  tag:"input",    hint:"A few words is enough"              },
  { id:3, code:"03", label:"Email",    field:"email"   as const, q:"Your email address:",      ph:"you@company.com",                   type:"email", tag:"input",    hint:"For all follow-up communication"    },
  { id:4, code:"04", label:"Phone",    field:"phone"   as const, q:"Your phone number:",       ph:"+1 (555) 000-0000",                 type:"tel",   tag:"input",    hint:"Optional — for a quick call"        },
  { id:5, code:"05", label:"Details",  field:"message" as const, q:"Any additional details?",  ph:"Needs, constraints, timeline…",     type:"text",  tag:"textarea", hint:"The more detail, the better"        },
];

const IcoR  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoL  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoS  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L9 14l-2-5-5-2L14 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoOk = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="24" stroke="url(#g1)" strokeWidth="2"/>
    <path d="M15 26l8 8 14-16" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs><linearGradient id="g1" x1="2" y1="2" x2="50" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="#00e5ff"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs>
  </svg>
);

export default function Contact() {
  const [step, setStep] = useState(1);
  const [dir,  setDir]  = useState<"fwd"|"bck">("fwd");
  const [data, setData] = useState<FormData>({ name:"", project:"", email:"", phone:"", message:"" });
  const [sent, setSent] = useState(false);
  const [vis,  setVis]  = useState(false);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  const cur      = STEPS[step - 1];
  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setData(d => ({ ...d, [e.target.name]: e.target.value }));
  const next     = () => { setDir("fwd"); setStep(s => s + 1); };
  const back     = () => { setDir("bck"); setStep(s => s - 1); };
  const submit   = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };
  const reset    = () => { setSent(false); setStep(1); setData({ name:"", project:"", email:"", phone:"", message:"" }); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --bg:      #070c18;
          --surface: rgba(255,255,255,.03);
          --border:  rgba(255,255,255,.08);
          --accent:  #00e5ff;
          --ac2:     #a78bfa;
          --muted:   rgba(255,255,255,.38);
          --text:    rgba(248,250,252,.92);
          --sans:    'Plus Jakarta Sans', sans-serif;
          --mono:    'DM Mono', monospace;
          --ease:    cubic-bezier(.16,1,.3,1);
        }

        /* ══ SECTION — full viewport, no scroll ══════════════════ */
        .c {
          background: var(--bg);
          width: 100vw;
          height: 100dvh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--sans);
          position: relative;
        }

        /* scanlines */
        .c::before {
          content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
          background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.004) 3px,rgba(255,255,255,.004) 4px);
        }

        /* glows */
        .c-ga,.c-gb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(100px); z-index:0; }
        .c-ga { width:560px; height:560px; top:-180px; left:-140px; background:radial-gradient(circle,rgba(0,229,255,.08),transparent 70%); }
        .c-gb { width:480px; height:480px; bottom:-160px; right:-100px; background:radial-gradient(circle,rgba(167,139,250,.08),transparent 70%); }

        /* ══ LAYOUT WRAPPER — fixed height budget ════════════════ */
        /*
         * We give the wrapper a fixed px height that fits on a 768px-tall laptop.
         * Everything inside uses % or fr so it scales properly.
         * max-width keeps it comfortably readable.
         */
        .c-box {
          position: relative; z-index:1;
          width: 100%;
          max-width: 900px;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          /* clamp: min 540px on tiny screens, ideal 88vh, max 680px */
          height: clamp(540px, 88vh, 680px);
        }

        /* ══ HEADER ══════════════════════════════════════════════ */
        .c-hd {
          flex-shrink: 0;
          text-align: center;
          opacity: 0; transform: translateY(12px);
          transition: opacity .55s var(--ease), transform .55s var(--ease);
        }
        .c-hd.v { opacity:1; transform:none; }

        .c-eyebrow {
          display: inline-flex; align-items: center; gap:.5rem;
          font-family: var(--mono); font-size:.6rem;
          letter-spacing:.22em; text-transform:uppercase; color:var(--accent);
          margin-bottom:.4rem;
        }
        .c-eyebrow::before,.c-eyebrow::after {
          content:''; display:block; width:1.8rem; height:1px;
          background:var(--accent); opacity:.5;
        }

        .c-title {
          font-size: clamp(1.7rem, 2.8vw, 2.5rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -.035em;
          color: var(--text);
        }
        .c-title span {
          background: linear-gradient(120deg, var(--accent), var(--ac2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .c-sub {
          margin-top: .3rem;
          font-size: .88rem; font-weight: 300; color: var(--muted); line-height:1.6;
        }

        /* ══ GRID — sidebar + card, fills remaining height ═══════ */
        .c-grid {
          flex: 1; min-height: 0;
          display: grid;
          grid-template-columns: 195px 1fr;
          gap: 1rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity .65s var(--ease) .1s, transform .65s var(--ease) .1s;
        }
        .c-grid.v { opacity:1; transform:none; }

        @media (max-width:620px) {
          .c-grid { grid-template-columns:1fr; }
          .c-sb   { display:none; }
        }

        /* ══ SIDEBAR ════════════════════════════════════════════ */
        .c-sb {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: .85rem;
          padding: 1.5rem 1.1rem;
          display: flex; flex-direction: column;
          justify-content: space-between;   /* steps fill height evenly */
          position: relative; overflow: hidden;
        }

        /* grey track */
        .c-sb::before {
          content:''; position:absolute;
          left:1.8rem; top:1.8rem; bottom:1.8rem;
          width:1px; background:var(--border);
        }
        /* coloured fill */
        .c-sb::after {
          content:''; position:absolute;
          left:1.8rem; top:1.8rem;
          width:1px;
          background:linear-gradient(180deg,var(--accent),var(--ac2));
          transition:height .5s var(--ease);
          height:calc((var(--step,1) - 1) / 4 * (100% - 3.6rem));
        }

        .c-si {
          display:flex; align-items:center; gap:.8rem;
          position:relative; z-index:1;
        }

        .c-dot {
          width:32px; height:32px; border-radius:50%;
          border:1.5px solid var(--border); background:var(--bg);
          display:flex; align-items:center; justify-content:center;
          font-family:var(--mono); font-size:.58rem; color:var(--muted);
          flex-shrink:0; transition:all .25s;
        }
        .c-dot.done { background:var(--accent); border-color:var(--accent); color:var(--bg); font-weight:700; }
        .c-dot.act  { border-color:var(--accent); color:var(--accent); box-shadow:0 0 12px rgba(0,229,255,.3); }

        .c-si-info { display:flex; flex-direction:column; gap:.05rem; }
        .c-si-code { font-family:var(--mono); font-size:.48rem; color:var(--muted); letter-spacing:.1em; opacity:.38; }
        .c-si-lbl  { font-size:.88rem; font-weight:700; color:var(--muted); white-space:nowrap; transition:color .2s; }
        .c-si.act .c-si-lbl  { color:var(--accent); }
        .c-si.done .c-si-lbl { color:var(--text); }
        .c-si-val  {
          font-family:var(--mono); font-size:.52rem; color:rgba(0,229,255,.55);
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:115px;
        }

        /* ══ CARD ════════════════════════════════════════════════ */
        .c-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: .85rem;
          padding: 1.6rem 2rem;
          display: flex; flex-direction: column;
          min-height: 0;
          position: relative; overflow: hidden;
        }
        .c-card::after {
          content:''; position:absolute; top:0; right:0;
          width:200px; height:200px;
          background:radial-gradient(circle at top right,rgba(0,229,255,.04),transparent 65%);
          pointer-events:none;
        }

        /* ── Progress bar ── */
        .c-bar {
          display:flex; align-items:center; gap:.85rem;
          margin-bottom:1.2rem; flex-shrink:0;
        }
        .c-bar-tr { flex:1; height:3px; background:rgba(255,255,255,.07); border-radius:10px; overflow:hidden; }
        .c-bar-fi { height:100%; background:linear-gradient(90deg,var(--accent),var(--ac2)); border-radius:10px; transition:width .5s var(--ease); }
        .c-bar-pc { font-family:var(--mono); font-size:.7rem; color:var(--accent); min-width:2.4rem; text-align:right; font-weight:500; }

        /* ── Form fills card ── */
        .c-form { flex:1; min-height:0; display:flex; flex-direction:column; }

        /* ── Step zone — fills form ── */
        .c-step { flex:1; min-height:0; display:flex; flex-direction:column; }
        .c-step.fwd { animation:sfwd .3s var(--ease) both; }
        .c-step.bck { animation:sbck .3s var(--ease) both; }
        @keyframes sfwd { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
        @keyframes sbck { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:none} }

        .c-tag {
          font-family:var(--mono); font-size:.72rem; color:var(--accent);
          letter-spacing:.1em; margin-bottom:.5rem; flex-shrink:0;
        }
        .c-q {
          font-size:clamp(1.35rem,2.4vw,1.9rem);
          font-weight:700; color:var(--text);
          line-height:1.2; letter-spacing:-.03em;
          margin-bottom:1.2rem; flex-shrink:0;
        }
        .c-cur {
          display:inline-block; width:2.5px; height:.82em;
          background:var(--accent); margin-left:4px; vertical-align:middle;
          animation:blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .c-field { flex:1; min-height:0; display:flex; flex-direction:column; gap:.65rem; }

        /* ── Inputs ── */
        .c-in {
          width:100%;
          background:rgba(255,255,255,.05);
          border:1px solid var(--border);
          border-radius:.65rem;
          padding:1rem 1.3rem;
          color:var(--text);
          font-size:clamp(1rem,1.6vw,1.12rem);
          font-family:var(--sans); font-weight:400;
          outline:none; -webkit-appearance:none;
          transition:border-color .15s,box-shadow .15s,background .15s;
          flex-shrink:0;
        }
        .c-in:focus {
          border-color:var(--accent);
          box-shadow:0 0 0 3px rgba(0,229,255,.1),0 0 18px rgba(0,229,255,.06);
          background:rgba(255,255,255,.07);
        }
        .c-in::placeholder { color:rgba(255,255,255,.22); }

        .c-ta {
          width:100%;
          background:rgba(255,255,255,.05);
          border:1px solid var(--border);
          border-radius:.65rem;
          padding:.9rem 1.3rem;
          color:var(--text);
          font-size:clamp(.97rem,1.5vw,1.08rem);
          font-family:var(--sans); font-weight:400;
          outline:none; -webkit-appearance:none; resize:none;
          transition:border-color .15s,box-shadow .15s,background .15s;
          flex:1; min-height:0; line-height:1.65;
        }
        .c-ta:focus {
          border-color:var(--accent);
          box-shadow:0 0 0 3px rgba(0,229,255,.1),0 0 18px rgba(0,229,255,.06);
          background:rgba(255,255,255,.07);
        }
        .c-ta::placeholder { color:rgba(255,255,255,.22); }

        .c-hint {
          font-family:var(--mono); font-size:.7rem;
          color:rgba(255,255,255,.24); flex-shrink:0;
        }

        /* ── Nav footer ── */
        .c-nav {
          display:flex; justify-content:space-between; align-items:center;
          margin-top:1.1rem; padding-top:1rem;
          border-top:1px solid var(--border); flex-shrink:0;
        }

        .c-bk {
          display:inline-flex; align-items:center; gap:.42rem;
          background:transparent; border:1px solid var(--border);
          color:var(--muted); padding:.62rem 1.2rem;
          border-radius:.6rem; font-size:.88rem; font-family:var(--sans); font-weight:500;
          cursor:pointer; transition:all .15s;
        }
        .c-bk:hover { border-color:rgba(255,255,255,.2); color:var(--text); background:rgba(255,255,255,.04); }

        /* Next / Send — bigger, more presence */
        .c-nx, .c-sd {
          display:inline-flex; align-items:center; gap:.52rem;
          border:1px solid rgba(0,229,255,.35);
          background:linear-gradient(135deg,rgba(0,229,255,.12),rgba(167,139,250,.12));
          color:var(--accent);
          padding:.75rem 2rem;
          border-radius:.6rem; font-size:1rem; font-family:var(--sans); font-weight:700;
          cursor:pointer; transition:all .18s; letter-spacing:.01em;
        }
        .c-nx:hover {
          background:linear-gradient(135deg,rgba(0,229,255,.2),rgba(167,139,250,.2));
          border-color:var(--accent); box-shadow:0 0 20px rgba(0,229,255,.16);
          transform:translateY(-1px);
        }
        .c-sd {
          background:linear-gradient(135deg,var(--accent),#06b6d4);
          border-color:transparent; color:var(--bg); font-weight:800;
        }
        .c-sd:hover { box-shadow:0 0 26px rgba(0,229,255,.35); transform:translateY(-1px); border-color:transparent; }

        /* ══ SUCCESS ═════════════════════════════════════════════ */
        .c-ok {
          flex:1; min-height:0; display:flex; flex-direction:column;
          align-items:center; justify-content:center; text-align:center; gap:.9rem;
          animation:sfwd .4s var(--ease) both;
        }
        .c-ok-ico { animation:pop .45s var(--ease); }
        @keyframes pop { from{transform:scale(.5);opacity:0} 70%{transform:scale(1.1)} to{transform:scale(1);opacity:1} }

        .c-ok-ttl {
          font-size:clamp(1.5rem,2.2vw,2rem); font-weight:800; letter-spacing:-.03em;
          background:linear-gradient(110deg,var(--accent),var(--ac2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .c-ok-txt { font-size:.9rem; color:var(--muted); max-width:320px; line-height:1.7; font-weight:300; }
        .c-ok-meta {
          display:flex; flex-direction:column; gap:.28rem;
          background:rgba(0,229,255,.035); border:1px solid rgba(0,229,255,.1);
          border-radius:.6rem; padding:.75rem 1.4rem; text-align:left; width:100%; max-width:320px;
        }
        .c-ok-row { display:flex; gap:.5rem; font-size:.72rem; font-family:var(--mono); color:var(--muted); }
        .c-ok-row span:first-child { color:var(--accent); min-width:52px; }

        .c-rs {
          display:inline-flex; align-items:center; gap:.38rem;
          background:transparent; border:1px solid var(--border);
          color:var(--muted); padding:.52rem 1.2rem;
          border-radius:.55rem; font-size:.82rem; font-family:var(--sans);
          cursor:pointer; transition:all .15s;
        }
        .c-rs:hover { border-color:rgba(255,255,255,.22); color:var(--text); }

        /* ══ FOOTER STRIP ════════════════════════════════════════ */
        .c-strip {
          flex-shrink:0; display:flex; justify-content:center; gap:2rem; flex-wrap:wrap;
          opacity:0; transform:translateY(8px);
          transition:opacity .55s var(--ease) .28s,transform .55s var(--ease) .28s;
        }
        .c-strip.v { opacity:1; transform:none; }
        .c-strip-item {
          display:flex; align-items:center; gap:.4rem;
          font-family:var(--mono); font-size:.6rem;
          color:rgba(255,255,255,.2); letter-spacing:.03em;
        }
        .c-strip-dot { width:4px; height:4px; border-radius:50%; background:var(--accent); opacity:.4; }
      `}</style>

      <section className="c">
        <div className="c-ga"/><div className="c-gb"/>

        <div className="c-box">

          {/* ── HEADER ── */}
          <div className={`c-hd${vis?" v":""}`}>
            <p className="c-eyebrow">Contact</p>
            <h2 className="c-title">Let's Start a <span>Project Together</span></h2>
            <p className="c-sub">Full infrastructure or security consultation — I'm here to help.</p>
          </div>

          {/* ── GRID ── */}
          <div className={`c-grid${vis?" v":""}`} style={{"--step":step} as React.CSSProperties}>

            {/* SIDEBAR */}
            <aside className="c-sb">
              {STEPS.map(s => {
                const done = step > s.id, active = step === s.id;
                return (
                  <div key={s.id} className={`c-si${active?" act":""}${done?" done":""}`}>
                    <div className={`c-dot${done?" done":""}${active?" act":""}`}>{done?"✓":s.code}</div>
                    <div className="c-si-info">
                      <span className="c-si-code">STEP {s.code}</span>
                      <span className="c-si-lbl">{s.label}</span>
                      {done && data[s.field] && <span className="c-si-val">{data[s.field]}</span>}
                    </div>
                  </div>
                );
              })}
            </aside>

            {/* CARD */}
            <div className="c-card">
              <form className="c-form" onSubmit={submit}>

                {/* progress */}
                <div className="c-bar">
                  <div className="c-bar-tr"><div className="c-bar-fi" style={{width:`${(step/5)*100}%`}}/></div>
                  <span className="c-bar-pc">{Math.round((step/5)*100)}%</span>
                </div>

                {!sent ? (
                  <>
                    <div className={`c-step ${dir}`} key={`s${step}`}>
                      <span className="c-tag">// {cur.code} — {cur.label}</span>
                      <p className="c-q">{cur.q}<span className="c-cur"/></p>
                      <div className="c-field">
                        {cur.tag === "textarea"
                          ? <textarea name={cur.field} className="c-ta" placeholder={cur.ph} value={data[cur.field]} onChange={onChange} autoFocus required/>
                          : <input type={cur.type} name={cur.field} className="c-in" placeholder={cur.ph} value={data[cur.field]} onChange={onChange} autoFocus autoComplete="off" required/>
                        }
                        <span className="c-hint">→ {cur.hint}</span>
                      </div>
                    </div>

                    <div className="c-nav">
                      {step > 1
                        ? <button type="button" className="c-bk" onClick={back}><IcoL/> Back</button>
                        : <span/>
                      }
                      {step < 5
                        ? <button type="button" className="c-nx" onClick={next}>Next <IcoR/></button>
                        : <button type="submit" className="c-sd"><IcoS/> Send Message</button>
                      }
                    </div>
                  </>
                ) : (
                  <div className="c-ok">
                    <div className="c-ok-ico"><IcoOk/></div>
                    <p className="c-ok-ttl">Message Sent!</p>
                    <p className="c-ok-txt">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <div className="c-ok-meta">
                      {data.name    && <div className="c-ok-row"><span>name</span><span>{data.name}</span></div>}
                      {data.email   && <div className="c-ok-row"><span>email</span><span>{data.email}</span></div>}
                      {data.project && <div className="c-ok-row"><span>project</span><span>{data.project}</span></div>}
                    </div>
                    <button className="c-rs" onClick={reset}>↩ Send another</button>
                  </div>
                )}

              </form>
            </div>
          </div>

          {/* STRIP */}
          <div className={`c-strip${vis?" v":""}`}>
            {["Reply within 24h","100% confidential","Available remotely"].map(t => (
              <div key={t} className="c-strip-item"><div className="c-strip-dot"/>{t}</div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    num: "001",
    title: "Automotive Photography Website",
    desc: "Designed and built a custom React web application to showcase Alex Sczudlo's automotive photography portfolio. Features a clean gallery layout, responsive design, and component-driven architecture built with Create React App. Deployed live on GitHub Pages.",
    tags: ["React", "JavaScript", "HTML", "CSS", "GitHub Pages"],
    accent: "#c94c1e",
    link: "https://github.com/joannembl/alex-sczudlo",
    liveUrl: "https://joannembl.github.io/alex-sczudlo/#/",
    badge: "Client Project",
  },
  {
    num: "002",
    title: "Kazoku Nightz — WordPress Site",
    desc: "Helping rebuild and improve the official website for Kazoku Nightz, a Japanese-inspired nightlife event brand. Work includes WordPress customisation, shop and events integration, gallery management, and overall site polish.",
    tags: ["WordPress", "WooCommerce", "CSS", "Events", "E-commerce"],
    accent: "#7c1e3a",
    link: "https://kazokunightz.com/",
    liveUrl: "https://kazokunightz.com/",
    badge: "In Progress",
  },
  {
    num: "003",
    title: "Multiverse Apprenticeship Portfolio",
    desc: "A curated compilation of technical projects and durable skills built during my 2022–2023 apprenticeship at American Express, sponsored by Multiverse. Covers React dashboards, state management, and Agile delivery.",
    tags: ["React", "Redux", "JavaScript", "Agile"],
    accent: "#3d6b4f",
    link: "https://github.com/joannembl/multiverse-portfolio",
  },
  {
    num: "004",
    title: "Single-Page Application",
    desc: "Fully-functional client-side SPA with multiple routes, global state management, accessibility standards, and a styled component library — built as part of Multiverse Workshop Project 1.",
    tags: ["JavaScript", "React", "State Management", "Accessibility"],
    accent: "#7c6fa0",
    link: "https://github.com/joannembl/multiverse-workshop-project-1",
  },
  {
    num: "005",
    title: "RESTful JWT API",
    desc: "A RESTful API for a cars resource secured via JWT authentication and bcrypt password hashing. Demonstrates secure backend API design and best practices.",
    tags: ["JavaScript", "Node.js", "JWT", "bcrypt"],
    accent: "#d4a832",
    link: "https://github.com/joannembl/multiverse-workshop-project-2",
  },
  {
    num: "006",
    title: "Java Self-Study API",
    desc: "Backend API built with Java and the Vert.x framework as a self-directed second-language study project. Explores asynchronous programming and reactive API design.",
    tags: ["Java", "Vert.x", "REST API", "Maven"],
    accent: "#2a6b7c",
    link: "https://github.com/joannembl/self-study-project",
  },
];

const experience = [
  {
    date: "March 2024 — Present",
    role: "Software Engineer I",
    company: "American Express · Phoenix, AZ",
    bullets: [
      "Own and enhance front-end features for digital banking and payments platforms.",
      "Build data-driven dashboards and visualization components for operational insights.",
      "Apply TypeScript to enforce type safety and reduce UI defects in production.",
      "Implement automated UI tests using Jest to ensure production reliability.",
      "Collaborate cross-functionally in Agile / SCRUM delivery cycles.",
    ],
  },
  {
    date: "May 2022 — March 2024",
    role: "Junior Software Engineer",
    company: "American Express · Phoenix, AZ",
    bullets: [
      "Developed and maintained React-based UI components for internal tools.",
      "Used TypeScript and JavaScript to build predictable, maintainable UI behavior.",
      "Supported testing, debugging, and incremental feature enhancements.",
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    color: "#c94c1e",
    skills: [
      { name: "JavaScript (ES6+)", pct: 92 },
      { name: "TypeScript", pct: 88 },
      { name: "HTML5 & CSS3", pct: 90 },
      { name: "Java", pct: 65 },
    ],
  },
  {
    label: "Frontend",
    color: "#3d6b4f",
    skills: [
      { name: "React.js", pct: 92 },
      { name: "Redux", pct: 82 },
      { name: "Component Architecture", pct: 90 },
      { name: "Responsive Web Design", pct: 88 },
    ],
  },
  {
    label: "Quality & Testing",
    color: "#7c6fa0",
    skills: [
      { name: "Jest", pct: 82 },
      { name: "Test-Aware UI Dev", pct: 85 },
      { name: "Debugging & Code Review", pct: 88 },
      { name: "UI Reliability", pct: 90 },
    ],
  },
  {
    label: "Engineering Practices",
    color: "#d4a832",
    skills: [
      { name: "Git & GitHub", pct: 92 },
      { name: "CI/CD Pipelines", pct: 78 },
      { name: "Agile / SCRUM", pct: 88 },
      { name: "WordPress / WooCommerce", pct: 75 },
    ],
  },
];

const certificates = [
  {
    icon: "◈",
    name: "Applied Full Stack Software Engineering",
    issuer: "Multiverse Certificate",
    date: "2022 – 2023",
  },
  {
    icon: "🏛",
    name: "Registered Apprenticeship Completion",
    issuer: "U.S. Department of Labor · Software Engineer",
    date: "2023",
  },
];

// ─── HOOK ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #faf7f2;
    --ink: #1a1208;
    --cream: #f3ede3;
    --rust: #c94c1e;
    --rust2: #e8623a;
    --sage: #3d6b4f;
    --gold: #d4a832;
    --lavender: #7c6fa0;
    --border: #e0d8cc;
    --card: #ffffff;
    --muted: #5a4e3e;
    --faint: #9a8a7a;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.6;
  }

  a { text-decoration: none; color: inherit; }

  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .cursor-blink {
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: var(--rust);
    vertical-align: middle;
    margin-left: 5px;
    animation: cursorBlink 1s infinite;
  }

  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-right-panel { display: none !important; }
    .nav-links { gap: 1.25rem !important; }
    nav { padding: 1rem 1.5rem !important; }
  }
`;

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────

const mono = { fontFamily: "'DM Mono', monospace" };
const serif = { fontFamily: "'Playfair Display', serif" };

function SectionTag({ children }) {
  return (
    <p style={{ ...mono, fontSize: "0.68rem", color: "var(--rust)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ ...serif, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  );
}

function Stripe() {
  return (
    <div style={{
      height: "4px",
      backgroundImage: "repeating-linear-gradient(90deg,var(--rust) 0,var(--rust) 12px,transparent 12px,transparent 20px)",
      opacity: 0.18,
    }} />
  );
}

function SkillBar({ name, pct, color, animate }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.87rem", marginBottom: "0.4rem" }}>
        <span>{name}</span>
        <span style={{ ...mono, fontSize: "0.68rem", color: "var(--faint)" }}>{pct}%</span>
      </div>
      <div style={{ height: "3px", background: "#e8e0d5", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: animate ? `${pct}%` : "0%",
          background: color,
          transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.1rem 3rem",
      background: scrolled ? "rgba(250,247,242,0.93)" : "var(--bg)",
      borderBottom: "1.5px solid var(--border)",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "background 0.3s",
    }}>
      <span style={{ ...serif, fontSize: "1.05rem", fontStyle: "italic", color: "var(--rust)" }}>
        Jo-anne Liberato
      </span>
      <ul className="nav-links" style={{ display: "flex", gap: "2.25rem", listStyle: "none" }}>
        {[["#projects","Projects"],["#experience","Experience"],["#skills","Skills"],["#certificates","Certs"]].map(([href, label]) => (
          <li key={label}>
            <a href={href}
              style={{ ...mono, fontSize: "0.68rem", color: "var(--ink)", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55, transition: "opacity 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = "var(--rust)"; }}
              onMouseLeave={e => { e.target.style.opacity = 0.55; e.target.style.color = "var(--ink)"; }}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "5rem" }} className="hero-grid">
      <div style={{ padding: "5rem 3rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...fade(0.1), display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ display: "block", width: "28px", height: "1.5px", background: "var(--rust)" }} />
          <span style={{ ...mono, fontSize: "0.72rem", color: "var(--rust)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Front-End Software Engineer · Fintech
          </span>
        </div>

        <h1 style={{ ...fade(0.25), ...serif, fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "0.3em" }}>
          <span style={{ display: "block" }}>Jo-anne</span>
          <span style={{ display: "block", WebkitTextStroke: "2px var(--ink)", color: "transparent" }}>
            Liberato
            <span className="cursor-blink" />
          </span>
        </h1>

        <p style={{ ...fade(0.4), ...serif, fontSize: "clamp(1rem,1.8vw,1.25rem)", fontStyle: "italic", color: "var(--lavender)", marginBottom: "2rem" }}>
          Building reliable, data-driven UIs for enterprise finance.
        </p>

        <p style={{ ...fade(0.5), fontSize: "0.97rem", lineHeight: 1.85, color: "var(--muted)", maxWidth: "440px", marginBottom: "2.5rem" }}>
          Front-end Software Engineer at American Express — crafting production-grade digital banking interfaces with React, TypeScript, and a relentless focus on UI correctness and user trust.
        </p>

        <div style={{ ...fade(0.6), display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          {[
            { label: "See My Work", href: "#projects", primary: true },
            { label: "GitHub", href: "https://github.com/joannembl", primary: false },
          ].map(({ label, href, primary }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                ...mono, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.8rem 1.8rem",
                background: primary ? "var(--rust)" : "transparent",
                color: primary ? "#fff" : "var(--ink)",
                border: primary ? "none" : "1.5px solid var(--ink)",
                transition: "all 0.22s", cursor: "pointer",
              }}
              onMouseEnter={e => {
                if (primary) e.currentTarget.style.background = "var(--ink)";
                else { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; }
              }}
              onMouseLeave={e => {
                if (primary) e.currentTarget.style.background = "var(--rust)";
                else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }
              }}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ ...fade(0.75), display: "flex", gap: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          {[["3+", "Years at Amex"], ["6+", "Projects"], ["2", "Credentials"]].map(([num, label]) => (
            <div key={label}>
              <span style={{ ...serif, fontSize: "2rem", fontWeight: 700, color: "var(--rust)", display: "block" }}>{num}</span>
              <span style={{ ...mono, fontSize: "0.65rem", color: "var(--faint)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="hero-right-panel" style={{ background: "var(--cream)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[420, 310, 200].map(size => (
          <div key={size} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: "1px solid var(--border)" }} />
        ))}
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "var(--rust)", opacity: 0.1, top: "22%", left: "30%" }} />
        <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "var(--lavender)", opacity: 0.15, top: "30%", left: "20%" }} />
        <span style={{ position: "relative", zIndex: 2, ...serif, fontSize: "5.5rem", fontWeight: 900, fontStyle: "italic", color: "var(--rust)" }}>JL</span>
        {[
          { text: "React", top: "18%", left: "12%" },
          { text: "TypeScript", top: "72%", left: "55%" },
          { text: "Fintech", top: "55%", left: "8%" },
          { text: "Amex", top: "20%", right: "10%" },
          { text: "WordPress", bottom: "22%", left: "12%" },
          { text: "Jest", bottom: "32%", right: "12%" },
        ].map(({ text, ...pos }) => (
          <span key={text} style={{ position: "absolute", ...mono, fontSize: "0.62rem", color: "var(--rust)", letterSpacing: "0.12em", opacity: 0.45, ...pos }}>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const [ref, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(null);

  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="projects" style={{ background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: "1120px", margin: "0 auto", padding: "6rem 3rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag>01 — Projects</SectionTag>
          <SectionTitle>Selected <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Work</em></SectionTitle>
        </div>

        {/* Featured projects — full-width cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {featured.map((p, i) => (
            <div key={p.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--card)", border: "1.5px solid var(--border)",
                padding: "2.25rem 2rem", position: "relative", overflow: "hidden",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === i ? `0 14px 48px ${p.accent}25` : "none",
                opacity: inView ? 1 : 0,
                transition: "transform 0.25s, box-shadow 0.25s, opacity 0.6s",
                transitionDelay: `${i * 0.1}s`,
              }}>
              {/* Color accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: p.accent }} />

              {/* Badge */}
              {p.badge && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  marginBottom: "1rem",
                  padding: "0.28rem 0.75rem",
                  background: p.badge === "In Progress" ? "rgba(124,30,58,0.08)" : "rgba(201,76,30,0.08)",
                  border: `1px solid ${p.badge === "In Progress" ? "rgba(124,30,58,0.25)" : "rgba(201,76,30,0.25)"}`,
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.accent, display: "block",
                    ...(p.badge === "In Progress" ? { animation: "cursorBlink 1.4s infinite" } : {}) }} />
                  <span style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent }}>{p.badge}</span>
                </div>
              )}

              <div style={{ ...mono, fontSize: "0.62rem", color: "var(--faint)", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>{p.num}</div>
              <div style={{ ...serif, fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.7rem" }}>{p.title}</div>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.5rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ ...mono, fontSize: "0.62rem", letterSpacing: "0.07em", padding: "0.3rem 0.65rem", border: "1px solid var(--border)", color: "#7a6a5a" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...mono, fontSize: "0.68rem", color: p.accent, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    Visit Live Site ↗
                  </a>
                )}
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ ...mono, fontSize: "0.68rem", color: p.liveUrl ? "var(--faint)" : p.accent, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  {p.link.includes("github") ? "View on GitHub →" : "View Project →"}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Rest of projects — standard grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {rest.map((p, i) => (
            <div key={p.num}
              onMouseEnter={() => setHovered(i + 2)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--card)", border: "1.5px solid var(--border)",
                padding: "1.75rem", position: "relative", overflow: "hidden",
                transform: hovered === i + 2 ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hovered === i + 2 ? `0 10px 32px ${p.accent}1a` : "none",
                opacity: inView ? 1 : 0,
                transition: "transform 0.25s, box-shadow 0.25s, opacity 0.6s",
                transitionDelay: `${(i + 2) * 0.08}s`,
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: p.accent }} />
              <div style={{ ...mono, fontSize: "0.62rem", color: "var(--faint)", letterSpacing: "0.15em", marginBottom: "1rem" }}>{p.num}</div>
              <div style={{ ...serif, fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.title}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.25rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.07em", padding: "0.25rem 0.55rem", border: "1px solid var(--border)", color: "#8a7a6a" }}>{t}</span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                style={{ ...mono, fontSize: "0.65rem", color: "var(--rust)", letterSpacing: "0.08em" }}>
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="experience" style={{ background: "var(--bg)" }}>
      <div ref={ref} style={{ maxWidth: "1120px", margin: "0 auto", padding: "6rem 3rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag>02 — Experience</SectionTag>
          <SectionTitle>Work <em style={{ fontStyle: "italic", color: "var(--rust)" }}>History</em></SectionTitle>
        </div>
        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          <div style={{ position: "absolute", left: 0, top: 10, bottom: 0, width: "1.5px", background: "linear-gradient(to bottom, var(--rust), transparent)" }} />
          {experience.map((e, i) => (
            <div key={i} style={{
              position: "relative", paddingBottom: "3.5rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ease ${i * 0.18}s, transform 0.6s ease ${i * 0.18}s`,
            }}>
              <div style={{ position: "absolute", left: "-2.85rem", top: "8px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--rust)", border: "2px solid var(--bg)", boxShadow: "0 0 0 3px rgba(201,76,30,0.2)" }} />
              <div style={{ ...mono, fontSize: "0.68rem", color: "var(--rust)", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>{e.date}</div>
              <div style={{ ...serif, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>{e.role}</div>
              <div style={{ ...mono, fontSize: "0.75rem", color: "var(--lavender)", marginBottom: "0.9rem" }}>{e.company}</div>
              <ul style={{ paddingLeft: "1.1rem" }}>
                {e.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "0.3rem", maxWidth: "640px" }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" style={{ background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: "1120px", margin: "0 auto", padding: "6rem 3rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag>03 — Skills</SectionTag>
          <SectionTitle>Tech <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Stack</em></SectionTitle>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {skillGroups.map((group, gi) => (
            <div key={group.label} style={{
              background: "var(--card)", border: "1.5px solid var(--border)", padding: "2rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s ease ${gi * 0.1}s, transform 0.6s ease ${gi * 0.1}s`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: group.color, flexShrink: 0 }} />
                <span style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{group.label}</span>
              </div>
              {group.skills.map(s => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} color={group.color} animate={inView} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────

function Certificates() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="certificates" style={{ background: "var(--bg)" }}>
      <div ref={ref} style={{ maxWidth: "1120px", margin: "0 auto", padding: "6rem 3rem" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionTag>04 — Certificates</SectionTag>
          <SectionTitle>Credentials & <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Achievements</em></SectionTitle>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
          {certificates.map((c, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--card)",
                border: `1.5px solid ${hovered === i ? "var(--rust)" : "var(--border)"}`,
                padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `border-color 0.25s, opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}>
              <div style={{ width: "52px", height: "52px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", border: "1.5px solid var(--border)" }}>
                {c.icon}
              </div>
              <div>
                <div style={{ ...serif, fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.35rem" }}>{c.name}</div>
                <div style={{ ...mono, fontSize: "0.68rem", color: "var(--lavender)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>{c.issuer}</div>
                <div style={{ ...mono, fontSize: "0.63rem", color: "var(--faint)" }}>{c.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "var(--cream)", border: "1.5px solid var(--border)",
          borderLeft: "4px solid var(--rust)", padding: "2rem 2.5rem",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.7s ease 0.3s",
        }}>
          <div style={{ ...mono, fontSize: "0.68rem", color: "var(--rust)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Apprenticeship Highlight
          </div>
          <p style={{ fontSize: "0.93rem", color: "var(--muted)", lineHeight: 1.85, maxWidth: "680px" }}>
            Part of the <strong style={{ color: "var(--ink)" }}>first cohort of apprentices at American Express</strong>, paving the way for non-traditional engineers entering the industry. Earned a U.S. Department of Labor Registered Apprenticeship — a nationally recognised credential — while building production software full-time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--bg)", padding: "3.5rem 3rem", textAlign: "center" }}>
      <div style={{ ...serif, fontSize: "1.7rem", fontStyle: "italic", color: "#e8623a", marginBottom: "0.5rem" }}>
        Jo-anne Mae Liberato
      </div>
      <div style={{ ...mono, fontSize: "0.68rem", color: "#7a6a5a", letterSpacing: "0.12em", marginBottom: "2rem" }}>
        Phoenix, AZ · jmbliberato@gmail.com · (206) 397-2656
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {[
          ["GitHub", "https://github.com/joannembl"],
          ["LinkedIn", "https://www.linkedin.com/in/jo-anne-mae-liberato-84920123b/"],
          ["Email", "mailto:jmbliberato@gmail.com"],
        ].map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ ...mono, fontSize: "0.68rem", color: "#a0907e", letterSpacing: "0.1em", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#e8623a"}
            onMouseLeave={e => e.target.style.color = "#a0907e"}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ ...mono, fontSize: "0.6rem", color: "#4a3f30", letterSpacing: "0.1em" }}>
        © 2026 · Jo-anne Mae Liberato · Software Engineer I at American Express
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  useEffect(() => {
    if (document.getElementById("jl-portfolio-styles")) return;
    const style = document.createElement("style");
    style.id = "jl-portfolio-styles";
    style.textContent = globalCss;
    document.head.appendChild(style);
    return () => { document.getElementById("jl-portfolio-styles")?.remove(); };
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Stripe />
      <Projects />
      <Stripe />
      <Experience />
      <Stripe />
      <Skills />
      <Stripe />
      <Certificates />
      <Footer />
    </div>
  );
}

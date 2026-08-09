import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const experience = [
  {
    date: "Mar 2024 — Present",
    role: "Software Engineer I",
    company: "American Express",
    location: "Phoenix, AZ",
    current: true,
    bullets: [
      "Deliver production-ready features and shared platform improvements across a multi-repository ecosystem of internal applications used by operations, servicing, support, product, and engineering teams.",
      "Build reusable React and TypeScript components and custom hooks for data tables, filters, modals, URL state, form submission, responsive navigation, loading states, and error handling.",
      "Integrate front-end modules with versioned APIs, translating complex workflows into validated payloads, predictable state transitions, resilient response handling, and clear user feedback.",
      "Modernize legacy applications through JavaScript-to-TypeScript migration, shared design patterns, internationalization, and accessibility improvements.",
      "Strengthen delivery with Jest, Vitest, React Testing Library, realistic API mocks, schema and type validation, and CI/CD workflows using GitHub Actions and Jenkins.",
    ],
    tags: ["React", "TypeScript", "Redux", "Jest", "GitHub Actions"],
  },
  {
    date: "May 2022 — Mar 2024",
    role: "Junior Software Engineer",
    company: "American Express",
    location: "Phoenix, AZ",
    current: false,
    bullets: [
      "Built and enhanced responsive React and Redux applications supporting internal transaction search, data review, platform monitoring, and form-driven workflows.",
      "Developed advanced search experiences with dynamic filters, pagination, date-range controls, expandable results, status indicators, and detail views.",
      "Connected user interfaces to enterprise APIs and Redux state, supporting consistent request handling, data transformation, and access-aware experiences.",
      "Improved usability through reusable components, responsive layouts, accessible interactions, role-aware navigation, and design-system integration.",
    ],
    tags: ["React", "Redux", "JavaScript", "Accessibility"],
  },
];

const projects = [
  {
    title: "Crafted Digital Mini OS",
    period: "2025 — Present",
    featured: true,
    desc: "An agency workflow platform for managing prospects, proposals, activities, demo websites, and team workspaces end to end.",
    highlights: [
      "Supabase authentication with role-aware workspaces and Row Level Security",
      "Google Places import plus deterministic and AI-assisted demo site generation",
      "Protected Deno Edge Functions and a preview-to-publish pipeline that deploys generated sites to GitHub Pages",
    ],
    tags: ["React", "Vite", "Supabase", "PostgreSQL", "Edge Functions", "GitHub Actions"],
    link: "https://github.com/joannembl/crafted-digital-mini-os",
    liveUrl: "https://joannembl.github.io/crafted-digital-mini-os/",
  },
  {
    title: "GarageBook",
    period: "2025",
    featured: true,
    desc: "A mobile-first digital vehicle logbook for tracking maintenance, modifications, expenses, photos, and ownership history.",
    highlights: [
      "Next.js and TypeScript with Supabase SSR authentication",
      "PostgreSQL-backed data model with server actions",
      "CSV/XLSX import and downloadable vehicle reports",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "SSR Auth"],
    link: "https://github.com/joannembl/garage-book",
  },
  {
    title: "Film Militia Storefront",
    period: "2024",
    desc: "A TypeScript storefront for automotive window film, including vehicle fitment flows and admin tooling.",
    highlights: [
      "Vehicle selection and fitment flows across products and guides",
      "Cart state, customer garage, and order areas",
      "Shopify data integrated with Supabase-backed auth and services",
    ],
    tags: ["React", "TypeScript", "TanStack", "Supabase", "Shopify API"],
    link: "https://github.com/joannembl/film-militia",
    liveUrl: "https://film-militia.lovable.app/",
  },
  {
    title: "Kazoku Nightz",
    period: "Ongoing",
    desc: "A Japanese-inspired nightlife and automotive event website with an ongoing WordPress build-out.",
    highlights: [
      "WooCommerce shop and event integration",
      "Gallery management and responsive styling",
      "Ongoing content and site improvements",
    ],
    tags: ["WordPress", "WooCommerce", "CSS", "E-commerce"],
    link: "https://kazokunightz.com/",
    liveUrl: "https://kazokunightz.com/",
  },
  {
    title: "Multiverse Apprenticeship Portfolio",
    period: "2022 — 2023",
    desc: "A record of technical projects and durable skills built during a software engineering apprenticeship at American Express, sponsored by Multiverse.",
    highlights: [
      "React dashboards with state management",
      "API integration and Agile delivery practice",
    ],
    tags: ["React", "Redux", "JavaScript", "Agile"],
    link: "https://github.com/joannembl/multiverse-portfolio",
  },
  {
    title: "Single-Page Application",
    period: "2022",
    desc: "A fully client-side SPA with multiple routes, global state, and a styled component library, built for Multiverse Workshop Project 1.",
    highlights: [
      "Client-side routing and global state management",
      "Accessibility standards applied throughout",
    ],
    tags: ["JavaScript", "React", "Accessibility"],
    link: "https://github.com/joannembl/multiverse-workshop-project-1",
  },
];

const skillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Java"],
  },
  {
    label: "Frontend",
    skills: ["React", "Redux", "Component Architecture", "Responsive & Accessible UI", "Next.js"],
  },
  {
    label: "Testing & Quality",
    skills: ["Jest", "React Testing Library", "Vitest", "WebdriverIO", "Code Review"],
  },
  {
    label: "Data & Delivery",
    skills: ["Supabase", "PostgreSQL", "REST APIs", "Authentication & RLS", "Edge Functions", "GitHub Actions", "Jenkins"],
  },
];

const credentials = [
  {
    name: "Applied Full Stack Software Engineering",
    issuer: "Multiverse Certificate",
    date: "2022 – 2023",
  },
  {
    name: "Registered Apprenticeship Completion, Software Engineer",
    issuer: "U.S. Department of Labor",
    date: "2023",
  },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
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

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0c11;
    --bg-alt: #0d1017;
    --card: #10141c;
    --card-hover: #141924;
    --border: #212636;
    --border-hover: #2c3348;
    --text: #e8eaf1;
    --text-body: #a9afc2;
    --text-muted: #767d92;
    --text-faint: #4c5266;
    --accent: #8b93ff;
    --accent-bright: #a7adff;
    --accent-soft: rgba(139,147,255,0.1);
    --amber: #f2b25c;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text-body);
    line-height: 1.6;
  }

  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

  ::selection { background: var(--accent); color: #08090d; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }

  .skip-link {
    position: absolute; left: -999px; top: 0; z-index: 999;
    background: var(--accent); color: #08090d; padding: 0.75rem 1.25rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
  }
  .skip-link:focus { left: 1rem; top: 1rem; }

  @media (max-width: 900px) {
    .sidebar { position: static !important; height: auto !important; width: 100% !important;
      padding: 2.25rem 1.5rem 1.5rem !important; border-right: none !important;
      border-bottom: 1px solid var(--border) !important; }
    .sidebar-nav { display: none !important; }
    .sidebar-desc { max-width: none !important; }
    .content { width: 100% !important; padding: 0 1.5rem !important; }
    .layout { flex-direction: column !important; }
    .hero-name { font-size: clamp(2rem,8vw,2.6rem) !important; }
    section { padding: 3.5rem 0 !important; }
    .exp-grid, .proj-featured-grid, .proj-grid, .skills-grid { grid-template-columns: 1fr !important; }
    .exp-row { grid-template-columns: 1fr !important; gap: 0.4rem !important; }
  }
`;

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────

const mono = { fontFamily: "'JetBrains Mono', monospace" };

function Eyebrow({ children }) {
  return (
    <p style={{ ...mono, fontSize: "0.72rem", color: "var(--accent)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: "clamp(1.5rem,3vw,1.9rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: "2.25rem" }}>
      {children}
    </h2>
  );
}

function Tag({ children, tone = "default" }) {
  return (
    <span style={{
      ...mono, fontSize: "0.68rem", letterSpacing: "0.03em",
      padding: "0.3rem 0.65rem",
      background: tone === "accent" ? "var(--accent-soft)" : "transparent",
      border: `1px solid ${tone === "accent" ? "transparent" : "var(--border)"}`,
      color: tone === "accent" ? "var(--accent-bright)" : "var(--text-muted)",
      borderRadius: "4px",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  );
}

function LinkRow({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ ...mono, fontSize: "0.78rem", color: "var(--accent)", display: "inline-flex", alignItems: "center", fontWeight: 500 }}>
      {label}<ExternalIcon />
    </a>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.66.8.55A10.52 10.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2"/>
      <path d="M3 6l9 7 9-7"/>
    </svg>
  );
}

const socials = [
  { Icon: GitHubIcon, label: "GitHub", href: "https://github.com/joannembl" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/jmbliberato/" },
  { Icon: MailIcon, label: "Email", href: "mailto:jmbliberato@gmail.com" },
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const active = useActiveSection(nav.map((n) => n.id));

  return (
    <aside className="sidebar" style={{
      width: "40%", maxWidth: "460px", position: "sticky", top: 0, height: "100vh",
      padding: "4.5rem 3.5rem 3rem 3.5rem", display: "flex", flexDirection: "column",
      justifyContent: "space-between", borderRight: "1px solid var(--border)",
    }}>
      <div>
        <h1 className="hero-name" style={{ fontSize: "clamp(1.9rem,2.6vw,2.4rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.6rem" }}>
          Jo-anne Mae Liberato
        </h1>
        <p style={{ ...mono, fontSize: "0.92rem", color: "var(--accent)", marginBottom: "1.5rem" }}>
          Software Engineer
        </p>
        <p className="sidebar-desc" style={{ fontSize: "0.94rem", color: "var(--text-body)", lineHeight: 1.75, maxWidth: "320px", marginBottom: "2.5rem" }}>
          I build reliable, production-grade interfaces for enterprise FinTech applications, and ship full-stack products end to end in my own time. Based in Phoenix, AZ.
        </p>

        <nav className="sidebar-nav" aria-label="Section navigation">
          <ul>
            {nav.map((n) => (
              <li key={n.id} style={{ marginBottom: "1rem" }}>
                <a href={`#${n.id}`}
                  style={{
                    ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase",
                    color: active === n.id ? "var(--text)" : "var(--text-faint)",
                    display: "flex", alignItems: "center", gap: "0.85rem",
                    transition: "color 0.2s",
                  }}>
                  <span style={{
                    display: "block", height: "1.5px",
                    width: active === n.id ? "2.25rem" : "1.25rem",
                    background: active === n.id ? "var(--accent)" : "var(--text-faint)",
                    transition: "width 0.25s, background 0.25s",
                  }} />
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div style={{ display: "flex", gap: "1.35rem" }}>
        {socials.map(({ Icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
            <Icon />
          </a>
        ))}
      </div>
    </aside>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  const [ref, inView] = useInView();
  const stats = [
    { num: "4+", label: "Years in production FinTech" },
    { num: "6", label: "Shipped projects" },
    { num: "2", label: "Credentials earned" },
  ];

  return (
    <section id="about" ref={ref} style={{
      padding: "5.5rem 0 4rem", opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <Eyebrow>About</Eyebrow>
      <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9, maxWidth: "620px", marginBottom: "1.2rem" }}>
        I'm a front-end software engineer with four-plus years building reliable, data-intensive internal applications used daily by operations, servicing, support, product, and engineering teams at American Express.
      </p>
      <p style={{ fontSize: "0.97rem", color: "var(--text-body)", lineHeight: 1.9, maxWidth: "620px", marginBottom: "2.75rem" }}>
        My work spans complex search, monitoring, and workflow interfaces; legacy application modernization; accessibility improvements; and automated testing and CI/CD. Outside of enterprise work, I design and ship full-stack products — combining React front ends with authentication, relational data, APIs, serverless functions, and automated deployments — end to end, on my own.
      </p>
      <div style={{ display: "flex", gap: "2.75rem", flexWrap: "wrap" }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text)" }}>{s.num}</div>
            <div style={{ ...mono, fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em", maxWidth: "120px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function ExperienceItem({ e, i }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} className="exp-row" style={{
      display: "grid", gridTemplateColumns: "150px 1fr", gap: "1.5rem",
      padding: "1.75rem 0", borderTop: i === 0 ? "1px solid var(--border)" : "none",
      borderBottom: "1px solid var(--border)",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
    }}>
      <div>
        <div style={{ ...mono, fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{e.date}</div>
        {e.current && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--amber)", animation: "pulse 1.8s infinite" }} />
            <span style={{ ...mono, fontSize: "0.62rem", color: "var(--amber)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Current</span>
          </div>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.15rem" }}>{e.role}</h3>
        <div style={{ ...mono, fontSize: "0.78rem", color: "var(--accent)", marginBottom: "1.1rem" }}>{e.company} · {e.location}</div>
        <ul style={{ marginBottom: "1.25rem" }}>
          {e.bullets.map((b, bi) => (
            <li key={bi} style={{ display: "flex", gap: "0.65rem", fontSize: "0.89rem", color: "var(--text-body)", lineHeight: 1.75, marginBottom: "0.55rem", maxWidth: "600px" }}>
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>{b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {e.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "4rem 0" }}>
      <Eyebrow>Experience</Eyebrow>
      <SectionTitle>Where I've built</SectionTitle>
      <div>
        {experience.map((e, i) => <ExperienceItem key={e.role} e={e} i={i} />)}
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function ProjectCard({ p, i, featured }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--card-hover)" : "var(--card)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
        borderRadius: "10px",
        padding: featured ? "2rem" : "1.6rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.2s, background 0.2s`,
        display: "flex", flexDirection: "column", height: "100%",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <h3 style={{ fontSize: featured ? "1.15rem" : "1.02rem", fontWeight: 700, color: "var(--text)" }}>{p.title}</h3>
        <span style={{ ...mono, fontSize: "0.66rem", color: "var(--text-faint)", flexShrink: 0, marginLeft: "0.75rem" }}>{p.period}</span>
      </div>
      <p style={{ fontSize: "0.87rem", color: "var(--text-body)", lineHeight: 1.75, marginBottom: featured ? "1.1rem" : "0.9rem" }}>{p.desc}</p>

      {featured && (
        <ul style={{ marginBottom: "1.35rem" }}>
          {p.highlights.map((h, hi) => (
            <li key={hi} style={{ display: "flex", gap: "0.6rem", fontSize: "0.84rem", color: "var(--text-body)", lineHeight: 1.7, marginBottom: "0.4rem" }}>
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>{h}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.35rem", marginTop: featured ? 0 : "auto" }}>
        {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <div style={{ display: "flex", gap: "1.35rem", marginTop: "auto" }}>
        {p.liveUrl && <LinkRow href={p.liveUrl} label="Live site" />}
        <LinkRow href={p.link} label={p.link.includes("github") ? "Source" : "Repo"} />
      </div>
    </div>
  );
}

function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={{ padding: "4rem 0" }}>
      <Eyebrow>Projects</Eyebrow>
      <SectionTitle>What I've shipped</SectionTitle>

      <div className="proj-featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {featured.map((p, i) => <ProjectCard key={p.title} p={p} i={i} featured />)}
      </div>
      <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {rest.map((p, i) => <ProjectCard key={p.title} p={p} i={i + 2} />)}
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" ref={ref} style={{
      padding: "4rem 0", opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <Eyebrow>Skills</Eyebrow>
      <SectionTitle>Tools I reach for</SectionTitle>

      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.75rem 2.5rem", marginBottom: "3rem" }}>
        {skillGroups.map((g) => (
          <div key={g.label}>
            <div style={{ ...mono, fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
              {g.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {g.skills.map((s) => <Tag key={s} tone="accent">{s}</Tag>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...mono, fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
        Credentials
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {credentials.map((c) => (
          <div key={c.name} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", padding: "0.9rem 0", borderBottom: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.2rem" }}>{c.name}</div>
              <div style={{ ...mono, fontSize: "0.72rem", color: "var(--accent)" }}>{c.issuer}</div>
            </div>
            <div style={{ ...mono, fontSize: "0.72rem", color: "var(--text-faint)", alignSelf: "center" }}>{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT / FOOTER ─────────────────────────────────────────────────────────

function Contact() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" ref={ref} style={{
      padding: "5rem 0 3rem", opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>
      <Eyebrow>Contact</Eyebrow>
      <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.1rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: "1.1rem", maxWidth: "540px" }}>
        Open to Software Engineer II opportunities.
      </h2>
      <p style={{ fontSize: "0.95rem", color: "var(--text-body)", lineHeight: 1.8, maxWidth: "480px", marginBottom: "2rem" }}>
        I'm always glad to talk about front-end architecture, FinTech-scale reliability, or a role where I can take on more ownership. The fastest way to reach me is email.
      </p>
      <a href="mailto:jmbliberato@gmail.com"
        style={{
          ...mono, fontSize: "0.8rem", letterSpacing: "0.04em",
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          padding: "0.9rem 1.75rem", background: "var(--accent)", color: "#08090d",
          borderRadius: "6px", fontWeight: 600, transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-bright)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}>
        <MailIcon /> jmbliberato@gmail.com
      </a>

      <footer style={{ marginTop: "5.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ ...mono, fontSize: "0.68rem", color: "var(--text-faint)" }}>
          © 2026 Jo-anne Mae Liberato
        </span>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {socials.map(({ Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-bright)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
              <Icon />
            </a>
          ))}
        </div>
      </footer>
    </section>
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
    <div className="layout" style={{ display: "flex", minHeight: "100vh", maxWidth: "1400px", margin: "0 auto" }}>
      <a href="#about" className="skip-link">Skip to content</a>
      <Sidebar />
      <main className="content" style={{ width: "60%", padding: "0 4rem 0 4rem", maxWidth: "760px" }}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

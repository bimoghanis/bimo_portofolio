import React, { useState, useRef, useCallback } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  FiCode,
  FiDatabase,
  FiCpu,
  FiTool,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPytorch,
  SiHuggingface,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiFigma,
  SiDbeaver,
  SiFastapi,
} from "react-icons/si";

const categories = [
  { id: "all", label: "All Arsenal", icon: <FiLayers /> },
  { id: "frontend", label: "Frontend & Web", icon: <FiCode /> },
  { id: "data", label: "Data & Databases", icon: <FiDatabase /> },
  { id: "ml", label: "Machine Learning & AI", icon: <FiCpu /> },
  { id: "tools", label: "Tools & Workflow", icon: <FiTool /> },
];

const arsenalItems = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiReact className="text-[#61DAFB]" />,
    desc: "Component architecture, custom hooks, state management, & modern UI designs.",
    tags: ["Hooks", "Context API", "SPA"],
  },
  {
    name: "Next.js",
    category: "frontend",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiNextdotjs className="text-[var(--text-main)]" />,
    desc: "App router, SSR/SSG rendering, SEO optimization, and hybrid architectures.",
    tags: ["SSR", "Routing", "Fullstack"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiTailwindcss className="text-[#38BDF8]" />,
    desc: "Claymorphism, responsive systems, design tokens, and smooth micro-animations.",
    tags: ["Claymorphism", "Responsive", "Tokens"],
  },
  {
    name: "TypeScript / JS",
    category: "frontend",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiTypescript className="text-[#3178C6]" />,
    desc: "Type safety, async programming, ES6+ standards, and REST API integration.",
    tags: ["Type Safety", "ES6+", "Async"],
  },
  {
    name: "Vite",
    category: "frontend",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiVite className="text-[#646CFF]" />,
    desc: "Lightning fast frontend bundling, HMR, and optimized production builds.",
    tags: ["Build Tool", "HMR", "Performance"],
  },

  // Data & Databases
  {
    name: "Python",
    category: "data",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiPython className="text-[#3776AB]" />,
    desc: "Core language for data manipulation, ETL scripts, machine learning, and automation.",
    tags: ["Scripting", "Automation", "ETL"],
  },
  {
    name: "SQL / PostgreSQL",
    category: "data",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiPostgresql className="text-[#4169E1]" />,
    desc: "Complex joins, indexing, query optimization, view creation, and schema design.",
    tags: ["Queries", "Aggregation", "Indexing"],
  },
  {
    name: "Pentaho PDI (ETL)",
    category: "data",
    level: "Experienced",
    levelColor: "var(--accent-secondary)",
    icon: <FiDatabase className="text-[#2ba8a0]" />,
    desc: "Used in Telkom National Campus (TUNC) project for enterprise-scale data migration.",
    tags: ["Data Flow", "Transformation", "Migration"],
  },
  {
    name: "Pandas & NumPy",
    category: "data",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiPandas className="text-[#150458]" />,
    desc: "Data cleaning, feature engineering, statistical analysis, and matrix computation.",
    tags: ["Dataframes", "Cleaning", "Stats"],
  },
  {
    name: "DBeaver & Database Admin",
    category: "data",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiDbeaver className="text-[#382923]" />,
    desc: "Multi-branch database administration, data extraction, and relational mapping.",
    tags: ["DB Admin", "ERD", "Schema Mapping"],
  },

  // Machine Learning & AI
  {
    name: "PyTorch",
    category: "ml",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiPytorch className="text-[#EE4C2C]" />,
    desc: "Deep learning model building, tensor operations, neural network training & tuning.",
    tags: ["Deep Learning", "Tensors", "GPU"],
  },
  {
    name: "Hugging Face & Transformers",
    category: "ml",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiHuggingface className="text-[#FFD21E]" />,
    desc: "NLP pipelines, DistilBERT fine-tuning, sentiment analysis, and tokenization.",
    tags: ["DistilBERT", "NLP", "Fine-Tuning"],
  },
  {
    name: "Scikit-Learn",
    category: "ml",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiScikitlearn className="text-[#F7931E]" />,
    desc: "Classification, regression, clustering, genetic algorithm feature selection, and metrics.",
    tags: ["Regression", "Optimization", "Pipelines"],
  },

  // Tools & Workflow
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Advanced",
    levelColor: "var(--accent-main)",
    icon: <SiGit className="text-[#F05032]" />,
    desc: "Version control, branch management, collaborative code review, and CI/CD basics.",
    tags: ["Version Control", "Collaboration", "CI/CD"],
  },
  {
    name: "REST API & Backend Integration",
    category: "tools",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <FiTool className="text-[#2ba8a0]" />,
    desc: "API contract understanding, async data fetching, error handling, and webhooks.",
    tags: ["JSON", "Endpoints", "Integration"],
  },
  {
    name: "Figma UI/UX",
    category: "tools",
    level: "Proficient",
    levelColor: "var(--accent-secondary)",
    icon: <SiFigma className="text-[#F24E1E]" />,
    desc: "Wireframing, prototyping, component library creation, and design handoff.",
    tags: ["Wireframing", "Prototypes", "UI Design"],
  },
];

function TiltArsenalCard({ item }) {
  const cardRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  return (
    <div
      ref={cardRef}
      className="clay-card group flex flex-col justify-between p-6 transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="clay-icon-box flex h-13 w-13 shrink-0 items-center justify-center bg-[var(--bg-soft)] text-2xl transition-transform duration-300 group-hover:scale-110">
            {item.icon}
          </div>

          <span
            className="clay-pill px-3 py-1 text-xs font-bold"
            style={{
              background: "var(--accent-soft)",
              color: item.levelColor,
            }}
          >
            {item.level}
          </span>
        </div>

        <h4 className="text-lg font-bold text-[var(--text-main)] transition-colors duration-300 group-hover:text-[var(--accent-main)]">
          {item.name}
        </h4>

        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
          {item.desc}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-soft)]">
        {item.tags.map((tag, idx) => (
          <span
            key={idx}
            className="clay-pill skill-glow bg-[var(--bg-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const TechArsenal = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const revealRef = useScrollReveal();

  const filteredItems =
    activeCategory === "all"
      ? arsenalItems
      : arsenalItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="skills"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background Shapes */}
      <div
        className="floating-shape morph-blob"
        style={{
          width: 280,
          height: 280,
          top: "10%",
          right: "-5%",
          background: "var(--accent-main)",
          opacity: 0.06,
          animationDelay: "-3s",
        }}
      />
      <div
        className="floating-shape"
        style={{
          width: 200,
          height: 200,
          bottom: "8%",
          left: "-3%",
          background: "var(--accent-secondary)",
          opacity: 0.05,
          animationDelay: "-6s",
        }}
      />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
              Tech Arsenal
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
              Tools & Technologies <br />
              <span className="gradient-text-animated">I Build & Optimize With.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
              An interactive breakdown of my technical stack across fullstack web development, enterprise data engineering, machine learning pipelines, and system utilities.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="clay-card-static px-6 py-4 text-center">
            <p className="gradient-text-animated text-3xl font-extrabold">
              {arsenalItems.length}+
            </p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              Core Technologies
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="reveal mb-10 flex flex-wrap gap-3" data-delay="150">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`clay-pill inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[var(--accent-main)] text-white"
                  : "bg-[var(--bg-card)] text-[var(--text-soft)] hover:text-[var(--accent-main)]"
              }`}
              style={
                activeCategory === cat.id
                  ? {
                      boxShadow:
                        "4px 4px 10px rgba(140,160,185,0.35), -3px -3px 8px rgba(255,255,255,0.3), inset 1px 1px 3px rgba(255,255,255,0.25)",
                    }
                  : {}
              }
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Arsenal Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <TiltArsenalCard key={`${item.name}-${activeCategory}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechArsenal;

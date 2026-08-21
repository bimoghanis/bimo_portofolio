import React, { useState } from "react";
import confetti from "canvas-confetti";
import useScrollReveal from "../hooks/useScrollReveal";
import { FiRefreshCw, FiZap, FiCheck, FiArrowRight, FiAward } from "react-icons/fi";

const frontendOptions = [
  { name: "React.js", icon: "⚛️", role: "Dynamic Frontend UI" },
  { name: "Next.js", icon: "▲", role: "SSR & Web Architecture" },
  { name: "Tailwind CSS", icon: "🎨", role: "Claymorphism Design" },
  { name: "TypeScript", icon: "📘", role: "Type-Safe Systems" },
  { name: "Vite", icon: "⚡", role: "Ultra-Fast Bundling" },
];

const dataOptions = [
  { name: "Python", icon: "🐍", role: "Data Transformation" },
  { name: "SQL / PostgreSQL", icon: "🐘", role: "Relational Architecture" },
  { name: "Pentaho ETL", icon: "🔄", role: "Enterprise Migration" },
  { name: "Pandas & NumPy", icon: "🐼", role: "Statistical Crunching" },
  { name: "DBeaver", icon: "🗄️", role: "Multi-DB Administration" },
];

const aiOptions = [
  { name: "PyTorch", icon: "🔥", role: "Deep Neural Networks" },
  { name: "DistilBERT", icon: "🤖", role: "NLP Sentiment Models" },
  { name: "Scikit-Learn", icon: "🧠", role: "Predictive Analytics" },
  { name: "Genetic Algorithm", icon: "🧬", role: "Metaheuristic Tuning" },
  { name: "Hugging Face", icon: "🤗", role: "Transformer Pipelines" },
];

const synergyMatches = [
  {
    condition: (f, d, a) => d.includes("Pentaho") || d.includes("SQL"),
    title: "Enterprise Data Migration Maestro 🏆",
    matchedProject: "Telkom University National Campus (TUNC) Data Migration",
    desc: "Seamlessly extracting, harmonizing, and migrating branch campus academic databases.",
  },
  {
    condition: (f, d, a) => a.includes("DistilBERT") || a.includes("PyTorch") || a.includes("Hugging"),
    title: "NLP & Deep Learning Alchemist 🤖",
    matchedProject: "NLP Sentiment Analysis on Amazon Reviews",
    desc: "Fine-tuning transformer architectures for deep semantic text classification.",
  },
  {
    condition: (f, d, a) => a.includes("Genetic") || a.includes("Scikit"),
    title: "Predictive AI & Optimization Master 🧬",
    matchedProject: "House Price Prediction with Genetic Algorithm",
    desc: "Optimizing multidimensional feature spaces to achieve peak regression accuracy.",
  },
  {
    condition: (f, d, a) => f.includes("React") || f.includes("Tailwind") || f.includes("Vite"),
    title: "Modern Interactive UI Engineer ✨",
    matchedProject: "Aldiora Clinic Responsive Web Application",
    desc: "Crafting modern, accessible, high-performance web experiences with smooth animations.",
  },
];

const StackSlotMachine = () => {
  const [frontend, setFrontend] = useState(frontendOptions[0]);
  const [data, setData] = useState(dataOptions[0]);
  const [ai, setAi] = useState(aiOptions[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const revealRef = useScrollReveal();

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    let counter = 0;
    const interval = setInterval(() => {
      setFrontend(frontendOptions[Math.floor(Math.random() * frontendOptions.length)]);
      setData(dataOptions[Math.floor(Math.random() * dataOptions.length)]);
      setAi(aiOptions[Math.floor(Math.random() * aiOptions.length)]);
      counter++;

      if (counter > 16) {
        clearInterval(interval);
        const finalF = frontendOptions[Math.floor(Math.random() * frontendOptions.length)];
        const finalD = dataOptions[Math.floor(Math.random() * dataOptions.length)];
        const finalA = aiOptions[Math.floor(Math.random() * aiOptions.length)];

        setFrontend(finalF);
        setData(finalD);
        setAi(finalA);
        setIsSpinning(false);
        setSpinCount((prev) => prev + 1);

        // Confetti celebration on spin finish
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#2563eb", "#06b6d4", "#10b981", "#fae882"],
        });
      }
    }, 80);
  };

  // Find match
  const match =
    synergyMatches.find((m) => m.condition(frontend.name, data.name, ai.name)) ||
    synergyMatches[0];

  return (
    <section
      id="slot-machine"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 text-center max-w-2xl mx-auto">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
            Interactive Mini Game 🎰
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-4xl">
            Roll Bimo&apos;s <span className="text-[var(--accent-main)]">Tech Stack</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            Spin the reels to generate random technology synergies and discover which of my real projects power that exact combination!
          </p>
        </div>

        {/* Slot Machine Clay Console */}
        <div className="reveal clay-card-static mx-auto max-w-3xl p-6 sm:p-9" data-delay="100">
          {/* 3 Reels Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Reel 1: Frontend */}
            <div className="clay-inset flex flex-col items-center justify-center p-5 text-center bg-[var(--bg-soft)] transition-all">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-main)] mb-2">
                1. Interface
              </span>
              <div
                className={`text-4xl sm:text-5xl mb-2 transition-transform duration-100 ${
                  isSpinning ? "scale-110 blur-[1px]" : "scale-100"
                }`}
              >
                {frontend.icon}
              </div>
              <h3 className="font-extrabold text-base text-[var(--text-main)]">
                {frontend.name}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {frontend.role}
              </p>
            </div>

            {/* Reel 2: Data */}
            <div className="clay-inset flex flex-col items-center justify-center p-5 text-center bg-[var(--bg-soft)] transition-all">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-secondary)] mb-2">
                2. Data / Core
              </span>
              <div
                className={`text-4xl sm:text-5xl mb-2 transition-transform duration-100 ${
                  isSpinning ? "scale-110 blur-[1px]" : "scale-100"
                }`}
              >
                {data.icon}
              </div>
              <h3 className="font-extrabold text-base text-[var(--text-main)]">
                {data.name}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {data.role}
              </p>
            </div>

            {/* Reel 3: AI / Machine Learning */}
            <div className="clay-inset flex flex-col items-center justify-center p-5 text-center bg-[var(--bg-soft)] transition-all">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--success-main)] mb-2">
                3. AI & ML
              </span>
              <div
                className={`text-4xl sm:text-5xl mb-2 transition-transform duration-100 ${
                  isSpinning ? "scale-110 blur-[1px]" : "scale-100"
                }`}
              >
                {ai.icon}
              </div>
              <h3 className="font-extrabold text-base text-[var(--text-main)]">
                {ai.name}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {ai.role}
              </p>
            </div>
          </div>

          {/* Spin Trigger Lever / Button */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`clay-button-primary inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-extrabold shadow-lg transition-transform active:scale-95 ${
                isSpinning ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
              style={{ borderRadius: "20px" }}
            >
              <FiRefreshCw className={`text-lg ${isSpinning ? "animate-spin" : ""}`} />
              {isSpinning ? "Rolling Synergy..." : "🎰 Spin Tech Stack"}
            </button>

            <span className="text-xs text-[var(--text-muted)] font-semibold">
              Spins: <span className="font-mono text-[var(--accent-main)] font-bold">{spinCount}</span> • Click to explore real engineering pairings!
            </span>
          </div>

          {/* Matched Project Showcase Result */}
          <div className="mt-8 border-t border-[var(--border-soft)] pt-6">
            <div className="clay-card p-5 sm:p-6 bg-[var(--bg-card)]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="clay-pill bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-extrabold text-[var(--accent-main)]">
                    Generated Synergy Match
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-[var(--text-main)] mt-2">
                    {match.title}
                  </h4>
                </div>
                <div className="clay-icon-box flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--bg-soft)] text-lg text-[var(--accent-main)]">
                  <FiAward />
                </div>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                {match.desc}
              </p>

              <div className="clay-inset p-3 bg-[var(--bg-soft)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Matched Real Portfolio Project:
                  </p>
                  <p className="font-bold text-[var(--accent-main)] text-sm mt-0.5">
                    {match.matchedProject}
                  </p>
                </div>

                <a
                  href="#projects"
                  className="clay-button inline-flex items-center justify-center gap-1.5 bg-[var(--bg-card)] px-4 py-2 font-bold text-xs text-[var(--text-soft)] hover:text-[var(--accent-main)] shrink-0"
                >
                  View in Projects <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSlotMachine;

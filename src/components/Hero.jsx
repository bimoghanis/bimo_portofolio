import React, { useState, useEffect, useRef } from "react";
import Fotodiri from "../assets/fotodiri.jpg";
import useScrollReveal from "../hooks/useScrollReveal";
import useCountUp from "../hooks/useCountUp";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiRotateCw,
  FiRepeat,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";

const Hero = () => {
  const githubPath = "https://github.com/bimoghanis";
  const linkedinPath =
    "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217";

  const revealRef = useScrollReveal();

  const { count: yearsCount, countRef: yearsRef } = useCountUp(1, 1200);
  const { count: projectsCount, countRef: projectsRef } = useCountUp(12, 1400);

  // 3D Card Interactive Display States
  const [rotationY, setRotationY] = useState(0);
  const [autoSpin, setAutoSpin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentRotRef = useRef(0);
  const animFrameRef = useRef(null);

  // Auto-spin animation loop
  useEffect(() => {
    if (!autoSpin) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const spin = () => {
      setRotationY((prev) => (prev >= 180 ? -180 : prev + 0.75));
      animFrameRef.current = requestAnimationFrame(spin);
    };

    animFrameRef.current = requestAnimationFrame(spin);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoSpin]);

  const handleSliderChange = (e) => {
    setAutoSpin(false);
    setRotationY(parseFloat(e.target.value));
  };

  const handleToggleFlip = () => {
    setAutoSpin(false);
    setRotationY((prev) => (Math.abs(prev) > 90 ? 0 : 180));
  };

  const handleReset = () => {
    setAutoSpin(false);
    setRotationY(0);
  };

  // Direct Mouse / Touch Drag Handlers
  const touchStartDataRef = useRef({ x: 0, y: 0, time: 0, moved: false });

  const handlePointerDown = (e) => {
    setAutoSpin(false);
    setIsDragging(true);
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    startXRef.current = clientX;
    currentRotRef.current = rotationY;
    touchStartDataRef.current = { x: clientX, y: clientY, time: Date.now(), moved: false };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const deltaX = clientX - startXRef.current;
    if (Math.abs(deltaX) > 5) {
      touchStartDataRef.current.moved = true;
    }
    let newRot = currentRotRef.current + deltaX * 0.8;
    while (newRot > 180) newRot -= 360;
    while (newRot < -180) newRot += 360;
    setRotationY(newRot);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      const elapsed = Date.now() - touchStartDataRef.current.time;
      if (!touchStartDataRef.current.moved && elapsed < 300) {
        // Quick tap on card -> toggle 3D Flip
        setRotationY((prev) => (Math.abs(prev) > 90 ? 0 : 180));
      }
    }
    setIsDragging(false);
  };

  const stats = [
    {
      number: yearsCount,
      suffix: "+",
      title: "Years of Experience",
      desc: "Hands-on in software & data migration",
      icon: "▣",
      color: "var(--clay-sky)",
      ref: yearsRef,
    },
    {
      number: projectsCount,
      suffix: "+",
      title: "Completed Projects",
      desc: "Web applications, analytics & ML models",
      icon: "▤",
      color: "var(--clay-mint)",
      ref: projectsRef,
    },
    {
      number: "Graduated",
      suffix: " 🎓",
      title: "S.Kom. (Informatics)",
      desc: "Yudisium Passed • Telkom University",
      icon: "◎",
      color: "var(--clay-lavender)",
      ref: null,
      isText: true,
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-main)] pb-16 pt-32 text-[var(--text-main)] transition-colors duration-200"
    >
      {/* Background Blobs */}
      <div
        className="floating-shape"
        style={{
          width: 300,
          height: 300,
          top: "10%",
          left: "-5%",
          background: "linear-gradient(135deg, var(--accent-main), var(--accent-secondary))",
          opacity: 0.08,
          animationDelay: "0s",
        }}
      />
      <div
        className="floating-shape"
        style={{
          width: 240,
          height: 240,
          top: "48%",
          right: "-3%",
          background: "linear-gradient(135deg, var(--accent-secondary), var(--clay-lavender))",
          opacity: 0.06,
          animationDelay: "-3.5s",
        }}
      />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        {/* Status Tag */}
        <div className="reveal mb-5 flex items-center" data-delay="50">
          <div className="clay-pill inline-flex items-center gap-2 bg-[var(--bg-card)] px-4 py-1.5 text-xs font-semibold text-[var(--text-soft)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success-main)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success-main)]" />
            </span>
            <span className="font-bold text-[var(--success-main)]">Yudisium Passed</span>
            <span className="text-[var(--text-muted)]">• Ready for Full-Time Roles</span>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Content */}
          <div>
            <p
              className="reveal clay-pill mb-4 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]"
              data-delay="100"
            >
              Fresh Informatics Graduate • S.Kom.
            </p>

            <h1
              className="reveal max-w-4xl text-4xl font-extrabold tracking-tight leading-[1.18] text-[var(--text-main)] md:text-5xl lg:text-6xl"
              data-delay="180"
            >
              Data-Driven Builder for{" "}
              <span className="text-[var(--accent-main)]">Modern Web</span> &{" "}
              <span className="text-[var(--accent-secondary)]">Analytics.</span>
            </h1>

            <p
              className="reveal mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg"
              data-delay="300"
            >
              Informatics Graduate (S.Kom.) from <span className="font-semibold text-[var(--text-main)]">Telkom University</span>. Experienced in enterprise data migration, fullstack web applications, and applied machine learning systems.
            </p>

            {/* CTAs */}
            <div className="reveal mt-8 flex flex-wrap items-center gap-3.5" data-delay="400">
              <a
                href="#contact"
                className="clay-button-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-md"
                style={{ borderRadius: "18px" }}
              >
                <FiMail className="text-base" />
                Get in Touch
              </a>

              <a
                href="#dev-gacha"
                className="clay-button inline-flex items-center gap-2 bg-[var(--bg-card)] px-5 py-3 text-sm font-bold text-[var(--accent-main)] transition-all duration-200 hover:scale-105"
              >
                <span>🎴</span> Dev-Mon Gacha
              </a>

              <a
                href={githubPath}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button inline-flex items-center gap-2 bg-[var(--bg-card)] px-5 py-3 text-sm font-bold text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
              >
                <FiGithub className="text-base" />
                GitHub
                <FiArrowUpRight className="text-xs opacity-60" />
              </a>

              <a
                href={linkedinPath}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button inline-flex items-center gap-2 bg-[var(--bg-card)] px-5 py-3 text-sm font-bold text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-secondary)]"
              >
                <FiLinkedin className="text-base" />
                LinkedIn
                <FiArrowUpRight className="text-xs opacity-60" />
              </a>
            </div>
          </div>

          {/* Right: 3D Interactive Card Showcase + Minimal Floating Capsule Controller */}
          <div className="reveal-right flex flex-col items-center lg:items-end select-none" data-delay="250">
            {/* 3D Perspective Scene */}
            <div
              className="card-3d-scene w-full max-w-md cursor-grab active:cursor-grabbing touch-pan-y select-none"
              style={{ touchAction: "pan-y" }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              title="Ketuk atau geser kartu untuk memutar secara 3D!"
            >
              <div
                className="card-3d-wrapper"
                style={{
                  transform: `rotateY(${rotationY}deg)`,
                  transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* ─── FRONT FACE: Profile Info Card ─── */}
                <div className="card-3d-front bg-[var(--bg-card)] p-7">
                  <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                    <div className="relative mb-5 sm:mb-0 sm:mr-5">
                      <div
                        className="absolute inset-0 rounded-full opacity-35 blur-lg"
                        style={{ background: "var(--accent-main)" }}
                      />

                      <div
                        className="relative h-24 w-24 overflow-hidden rounded-full p-1"
                        style={{
                          boxShadow: "var(--shadow-clay-icon)",
                          background: "var(--bg-soft)",
                        }}
                      >
                        <img
                          src={Fotodiri}
                          alt="Bimo Ghanis"
                          className="h-full w-full rounded-full object-cover object-[center_22%] pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-extrabold text-[var(--text-main)]">
                        Bimo Ghanis
                      </h2>
                      <p className="mt-1 text-sm font-bold text-[var(--accent-main)]">
                        B.Sc. in Informatics (S.Kom.)
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      { label: "Status", value: "Fresh Graduate (S.Kom.)", highlight: true },
                      { label: "Location", value: "Depok / Jakarta, Indonesia" },
                      { label: "Degree", value: "Bachelor of Computer Science" },
                      { label: "Specialization", value: "Data Engineering • ML • Web Dev" },
                    ].map((item, i) => (
                      <div key={i} className="clay-inset grid gap-1 p-3 sm:grid-cols-[105px_1fr] sm:gap-3 text-xs">
                        <p className="font-semibold text-[var(--text-soft)]">{item.label}</p>
                        <p className={item.highlight ? "font-bold text-[var(--accent-main)]" : "text-[var(--text-muted)]"}>
                          {item.value}
                        </p>
                      </div>
                    ))}

                    <div className="clay-inset grid gap-1 p-3 sm:grid-cols-[105px_1fr] sm:gap-3 text-xs">
                      <p className="font-semibold text-[var(--text-soft)]">Availability</p>
                      <div>
                        <p className="font-bold text-[var(--success-main)]">Ready for Immediate Hire</p>
                        <p className="text-[11px] text-[var(--text-muted)]">Full-time roles, contracts & projects</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── BACK FACE: Developer Badge Backplate ─── */}
                <div className="card-3d-back bg-[var(--bg-card)] p-7 flex flex-col justify-between">
                  <div>
                    {/* Header Pass */}
                    <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-4">
                      <div>
                        <p className="text-[10px] font-extrabold tracking-widest text-[var(--accent-main)] uppercase">
                          Telkom University Alumni
                        </p>
                        <h3 className="text-base font-black text-[var(--text-main)]">
                          Digital Engineering Pass
                        </h3>
                      </div>
                      <div className="clay-icon-box flex h-10 w-10 items-center justify-center bg-[var(--accent-soft)] text-[var(--accent-main)] font-black text-xs">
                        S.Kom
                      </div>
                    </div>

                    {/* Badge Core Attributes */}
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="clay-inset p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Candidate Code</p>
                        <p className="font-mono font-bold text-[var(--accent-main)] text-sm">BG-INFORMATICS-2026</p>
                      </div>

                      <div className="clay-inset p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Core Technical Stack</p>
                        <div className="flex flex-wrap gap-1">
                          {["Python", "React", "SQL", "Pentaho ETL", "PyTorch", "Tailwind"].map((tech, idx) => (
                            <span key={idx} className="clay-pill bg-[var(--bg-card)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-soft)]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="clay-inset p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Engineering Mindset</p>
                        <p className="text-[11px] italic leading-relaxed text-[var(--text-soft)]">
                          &ldquo;Transforming complex data structures into scalable, high-impact digital systems.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Badge Status */}
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border-soft)] pt-3 text-[11px]">
                    <span className="flex items-center gap-1.5 font-bold text-[var(--success-main)]">
                      <FiCheckCircle /> Verified Graduate
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      ID: #967667217
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── MINIMAL FLOATING CAPSULE CONTROLLER (Friendly & Soft) ─── */}
            <div className="clay-pill mt-4 flex w-full max-w-md items-center gap-2 bg-[var(--bg-card)] p-2.5 shadow-md">
              {/* Flip Button */}
              <button
                type="button"
                onClick={handleToggleFlip}
                className="clay-button inline-flex shrink-0 items-center gap-1.5 bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-bold text-[var(--accent-main)] hover:bg-[var(--accent-main)] hover:text-white"
                title="Flip between Front & Back"
              >
                <FiRepeat className="text-xs" />
                <span>{Math.abs(rotationY) > 90 ? "Front" : "Flip 3D"}</span>
              </button>

              {/* Slider Track with Integrated Dot */}
              <div className="relative flex-1 flex items-center px-1">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotationY}
                  onChange={handleSliderChange}
                  className="clay-slider w-full"
                  aria-label="3D Card Rotation Slider"
                />
              </div>

              {/* Auto Spin Toggle Pill */}
              <button
                type="button"
                onClick={() => setAutoSpin(!autoSpin)}
                className={`clay-button inline-flex shrink-0 items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all ${
                  autoSpin
                    ? "bg-[var(--accent-secondary)] text-white shadow-sm"
                    : "bg-[var(--bg-soft)] text-[var(--text-soft)] hover:text-[var(--accent-secondary)]"
                }`}
                title="Toggle continuous 360 auto spin"
              >
                <FiRotateCw className={`text-xs ${autoSpin ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">{autoSpin ? "Spinning" : "Auto"}</span>
              </button>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="clay-button flex h-7 w-7 shrink-0 items-center justify-center bg-[var(--bg-soft)] text-xs text-[var(--text-muted)] hover:text-[var(--danger-main)]"
                title="Reset to 0 deg"
              >
                <FiRefreshCw className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="reveal clay-card-static mt-12 grid overflow-hidden md:grid-cols-3" data-delay="450">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-4.5 p-6 ${
                index !== stats.length - 1
                  ? "border-b border-[var(--border-soft)] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div
                className="clay-icon-box flex h-13 w-13 shrink-0 items-center justify-center text-2xl text-[var(--accent-main)]"
                style={{ background: stat.color }}
              >
                {stat.icon}
              </div>

              <div>
                <h3
                  ref={stat.ref}
                  className="text-3xl font-extrabold text-[var(--text-main)]"
                >
                  {stat.isText ? stat.number : stat.number}
                  {stat.suffix}
                </h3>
                <p className="mt-0.5 font-bold text-xs text-[var(--text-soft)]">
                  {stat.title}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const About = () => {
  const revealRef = useScrollReveal();

  const skillGroups = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "Vite", "Tailwind CSS", "JavaScript", "TypeScript"],
    },
    {
      title: "Data & Machine Learning",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "PyTorch", "SQL", "PostgreSQL"],
    },
    {
      title: "Tools & Workflow",
      skills: ["Pentaho PDI", "Git", "REST API", "Figma", "DBeaver", "Hugging Face"],
    },
  ];

  const softSkills = [
    { title: "Problem Solving", desc: "Able to break down complex business problems into clear technical solutions.", color: "var(--clay-sky)" },
    { title: "Data-Driven Thinking", desc: "Comfortable using quantitative data and metrics to guide engineering decisions.", color: "var(--clay-mint)" },
    { title: "Cross-Functional Collaboration", desc: "Experienced working with multidisciplinary teams, stakeholders, and practicum students.", color: "var(--clay-lavender)" },
    { title: "Fast Learner & Adaptable", desc: "Quick to master modern tech stacks, libraries, and enterprise database ecosystems.", color: "var(--clay-rose)" },
  ];

  const education = [
    {
      title: "Telkom University",
      degree: "Bachelor of Computer Science in Informatics (S.Kom.)",
      duration: "2024 - 2025",
      location: "Bandung, West Java",
      badge: "🎓 Yudisium Passed (Awaiting Graduation)",
      badgeColor: "var(--success-main)",
      detail: "Completed Bachelor's degree in Informatics with a strong emphasis on Software Engineering, Data Analytics, ETL pipelines, and Machine Learning systems.",
    },
    {
      title: "Telkom University",
      degree: "Diploma in Software Engineering (A.Md.Kom.)",
      duration: "2021 - 2024",
      location: "Bandung, West Java",
      badge: "🌟 Cum Laude (GPA 3.87 / 4.00)",
      badgeColor: "var(--accent-main)",
      detail: "Graduated with Cum Laude distinction. Focused on database systems, fullstack web development, and mobile application architectures.",
    },
  ];

  const highlights = [
    { icon: "🎓", label: "Academic Degree", value: "S.Kom. (Informatics)" },
    { icon: "📍", label: "Location", value: "Depok / Jakarta, Indonesia" },
    { icon: "💼", label: "Current Status", value: "Ready for Full-Time Roles" },
  ];

  const stats = [
    { number: "1+", label: "Years Experience", desc: "Data migration, web dev & academic lab teaching" },
    { number: "12+", label: "Portfolio Projects", desc: "Data engineering, AI/ML models & responsive web" },
    { number: "S.Kom.", label: "Degree Level", desc: "Bachelor of Computer Science graduate" },
  ];

  return (
    <section
      id="about"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background blobs */}
      <div className="floating-shape morph-blob" style={{ width: 240, height: 240, top: "5%", left: "-4%", background: "var(--accent-main)", opacity: 0.06, animationDelay: "-3s" }} />
      <div className="floating-shape" style={{ width: 180, height: 180, bottom: "10%", right: "-2%", background: "var(--accent-secondary)", opacity: 0.05, animationDelay: "-6s" }} />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="reveal mb-12 max-w-4xl">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            About Me
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Passionate software & data specialist with a strong foundation in{" "}
            <span className="text-[var(--accent-main)]">web systems, data pipelines, and applied AI.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            I am a Fresh Informatics Graduate (S.Kom.) from Telkom University who thrives at the intersection of data engineering, software development, and machine learning. Having passed yudisium and currently awaiting graduation, I am eager to apply my technical foundation to solve real-world challenges.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* About Card — spans 1 col, 2 rows */}
          <div className="reveal clay-card-static p-8 transition-colors duration-300 lg:row-span-2" data-delay="100">
            <h3 className="text-2xl font-bold text-[var(--text-main)]">Background & Focus</h3>

            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
              My technical journey spans enterprise data migration (TUNC Telkom University project), web development with modern React/Next.js stacks, and natural language processing models using PyTorch & Hugging Face.
            </p>

            <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)]">
              I love building scalable pipelines, optimizing database workflows, and designing sleek user interfaces that offer high usability and reliable performance.
            </p>

            <div className="mt-8 grid gap-4 border-t border-[var(--border-soft)] pt-6">
              {highlights.map((item, index) => (
                <div key={index} className="clay-inset flex items-center gap-4 bg-[var(--bg-soft)] p-4">
                  <span className="clay-icon-box flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--accent-soft)] text-lg text-[var(--accent-main)]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                    <p className="font-semibold text-[var(--text-soft)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Card — spans 2 cols, 1 row */}
          <div className="reveal clay-card-static bg-[var(--bg-card-soft)] p-8 transition-colors duration-300 lg:col-span-2" data-delay="200">
            <h3 className="mb-6 text-2xl font-bold text-[var(--text-main)]">Skills & Tools</h3>

            <div className="space-y-7">
              {skillGroups.map((group, index) => (
                <div key={index}>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-main)]">{group.title}</p>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="clay-pill skill-glow bg-[var(--bg-soft)] px-4 py-2 text-sm font-medium text-[var(--text-soft)] transition-all duration-300 hover:bg-[var(--bg-card)] hover:text-[var(--accent-main)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats — spans 2 cols, 1 row */}
          <div className="reveal clay-card-static grid overflow-hidden transition-colors duration-300 sm:grid-cols-3 lg:col-span-2" data-delay="300">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 ${
                  index !== stats.length - 1
                    ? "border-b border-[var(--border-soft)] sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <h3 className="text-3xl font-extrabold text-[var(--accent-main)]">{stat.number}</h3>
                <p className="mt-2 font-semibold text-[var(--text-main)]">{stat.label}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mt-14">
          <div className="reveal mb-6 flex items-center gap-4">
            <span className="h-2 w-10 rounded-full" style={{ background: "var(--accent-main)" }} />
            <h3 className="text-2xl font-bold text-[var(--text-main)]">Soft Skills & Methodologies</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((skill, index) => (
              <div key={index} className="reveal clay-card p-6" data-delay={index * 100}>
                <div className="mb-4 h-2 w-12 rounded-full" style={{ background: skill.color }} />
                <h4 className="font-bold text-[var(--text-main)]">{skill.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-14">
          <div className="reveal mb-6 flex items-center gap-4">
            <span className="h-2 w-10 rounded-full" style={{ background: "var(--accent-secondary)" }} />
            <h3 className="text-2xl font-bold text-[var(--text-main)]">Education & Degrees</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {education.map((edu, index) => (
              <article key={index} className="reveal clay-card group relative p-7" data-delay={index * 150}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="clay-pill bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-main)]">
                    {edu.duration}
                  </span>
                  <span className="clay-pill px-3.5 py-1 text-xs font-bold text-[var(--text-main)]" style={{ background: "var(--bg-soft)", borderLeft: `3px solid ${edu.badgeColor}` }}>
                    {edu.badge}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-[var(--text-main)] transition-colors duration-300 group-hover:text-[var(--accent-main)]">
                  {edu.title}
                </h4>
                <p className="mt-2 font-semibold text-[var(--text-soft)]">{edu.degree}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{edu.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{edu.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
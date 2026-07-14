import React from "react";

const About = () => {
  const skillGroups = [
    {
      title: "Frontend Development",
      skills: [
        "React",
        "Next.js",
        "Vite",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
      ],
    },
    {
      title: "Data & Machine Learning",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "SQL",
        "PostgreSQL",
      ],
    },
    {
      title: "Tools & Workflow",
      skills: ["Pentaho PDI", "Git", "REST API", "Figma", "DBeaver"],
    },
  ];

  const softSkills = [
    {
      title: "Problem Solving",
      desc: "Able to break down problems into clear technical solutions.",
    },
    {
      title: "Data-Driven Thinking",
      desc: "Comfortable using data to support decisions and improvements.",
    },
    {
      title: "Collaboration",
      desc: "Enjoy working with teams, stakeholders, and project contributors.",
    },
    {
      title: "Adaptability",
      desc: "Quick to learn new tools, workflows, and project requirements.",
    },
  ];

  const education = [
    {
      title: "Telkom University",
      degree: "Bachelor's Degree in Informatics",
      duration: "2024 - Present",
      location: "Bandung, West Java",
      detail:
        "Continuing an Informatics degree with a focus on software development, data analytics, and modern technology implementation.",
    },
    {
      title: "Telkom University",
      degree: "Diploma in Software Engineering",
      duration: "2021 - 2024",
      location: "Bandung, West Java",
      detail: "Graduated Cum Laude with GPA 3.87/4.00.",
    },
  ];

  const highlights = [
    {
      icon: "📍",
      label: "Location",
      value: "Indonesia",
    },
    {
      icon: "🎓",
      label: "Background",
      value: "Informatics Student",
    },
    {
      icon: "💼",
      label: "Status",
      value: "Open to Opportunities",
    },
  ];

  const stats = [
    {
      number: "1+",
      label: "Years of Experience",
      desc: "Hands-on in software and data projects",
    },
    {
      number: "12+",
      label: "Total Projects",
      desc: "Web apps, analytics, and machine learning projects",
    },
    {
      number: "Data + Web",
      label: "Core Focus",
      desc: "Development, analytics, automation, and ML",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-12 max-w-4xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            About Me
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Curious problem-solver with a strong interest in web, data, and
            intelligent systems.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            I enjoy building digital products, analyzing data, and turning
            ideas into practical solutions. My work combines software
            development, data processing, and machine learning to solve
            real-world problems.
          </p>
        </div>

        {/* Main About + Skills */}
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.35fr]">
          {/* About Card */}
          <div className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 backdrop-blur-md transition-colors duration-300 [box-shadow:0_25px_50px_-12px_var(--shadow-main)]">
            <h3 className="text-2xl font-bold text-[var(--text-main)]">
              What I Do
            </h3>

            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
              I have experience working on web development, mobile application
              development, data migration, and data-driven projects. I am used
              to working with modern frontend tools, database systems, ETL
              workflows, and analytical programming.
            </p>

            <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)]">
              I am especially interested in roles related to software
              engineering, data analytics, data engineering, and machine
              learning engineering.
            </p>

            <div className="mt-8 grid gap-4 border-t border-[var(--border-main)] pt-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-soft)] p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-lg text-[var(--accent-main)]">
                    {item.icon}
                  </span>

                  <div>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[var(--text-soft)]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Card */}
          <div className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card-soft)] p-8 backdrop-blur-md transition-colors duration-300 [box-shadow:0_25px_50px_-12px_var(--shadow-main)]">
            <h3 className="mb-6 text-2xl font-bold text-[var(--text-main)]">
              Skills & Tools
            </h3>

            <div className="space-y-7">
              {skillGroups.map((group, index) => (
                <div key={index}>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-main)]">
                    {group.title}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-soft)] px-4 py-2 text-sm font-medium text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-main)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-main)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-1 w-10 rounded-full bg-[var(--accent-main)]" />
            <h3 className="text-2xl font-bold text-[var(--text-main)]">
              Soft Skills
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 transition-all duration-300 [box-shadow:0_20px_25px_-5px_var(--shadow-main)] hover:-translate-y-1 hover:border-[var(--accent-main)]"
              >
                <h4 className="font-bold text-[var(--text-main)]">
                  {skill.title}
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-1 w-10 rounded-full bg-[var(--accent-main)]" />
            <h3 className="text-2xl font-bold text-[var(--text-main)]">
              Education
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {education.map((edu, index) => (
              <article
                key={index}
                className="group relative rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-7 transition-all duration-300 [box-shadow:0_20px_25px_-5px_var(--shadow-main)] hover:-translate-y-1 hover:border-[var(--accent-main)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[var(--border-main)] bg-[var(--bg-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-main)]">
                    {edu.duration}
                  </span>

                  <span className="text-sm text-[var(--text-muted)]">
                    {edu.location}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-[var(--text-main)] transition-colors duration-300 group-hover:text-[var(--accent-main)]">
                  {edu.title}
                </h4>

                <p className="mt-2 font-semibold text-[var(--text-soft)]">
                  {edu.degree}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {edu.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] backdrop-blur-md transition-colors duration-300 [box-shadow:0_25px_50px_-12px_var(--shadow-main)] md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-7 ${
                index !== stats.length - 1
                  ? "border-b border-[var(--border-main)] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <h3 className="bg-[linear-gradient(135deg,var(--accent-main),var(--accent-secondary))] bg-clip-text text-4xl font-extrabold text-transparent">
                {stat.number}
              </h3>

              <p className="mt-2 font-semibold text-[var(--text-main)]">
                {stat.label}
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
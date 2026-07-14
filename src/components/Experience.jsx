import React from "react";

const experiences = [
  {
    title: "Freelance Data Management",
    company: "Direktorat PuTI Telkom University",
    duration: "Jul 2024 - Sep 2024",
    location: "Bandung, West Java",
    icon: "▥",
    accent: "blue",
    description: [
      "Handled data migration for Telkom University Surabaya, Purwokerto, and Bandung campuses in the Telkom University National Campus (TUNC) project.",
      "Analyzed database structures from multiple branch campuses to support data integration and migration planning.",
      "Created data flow documentation and operated migration tools such as DBeaver and Pentaho PDI.",
    ],
  },
  {
    title: "Data Management Division Internship",
    company: "Direktorat PuTI Telkom University",
    duration: "Jul 2023 - Jul 2024",
    location: "Bandung, West Java",
    icon: "</>",
    accent: "purple",
    description: [
      "Supported data migration activities for Telkom University Surabaya campus as part of the TUNC integration project.",
      "Analyzed branch campus database structures and prepared data flow mapping for migration requirements.",
      "Used DBeaver and Pentaho PDI to support database operations, data extraction, transformation, and migration processes.",
    ],
  },
  {
    title: "Course Practicum Assistant",
    company: "Faculty of Applied Sciences, Telkom University",
    duration: "2022 - 2024",
    location: "Bandung, West Java",
    icon: "♟",
    accent: "emerald",
    description: [
      "Assisted lecturers in preparing and delivering learning materials for programming, database, networking, and object-oriented programming courses.",
      "Managed exams, assignments, and student projects while providing assessment, feedback, and technical guidance.",
      "Guided students during practicum sessions and helped them understand both theoretical and hands-on programming concepts.",
    ],
  },
];

const accentStyles = {
  blue: {
    iconBox:
      "border-[var(--accent-main)] bg-[var(--accent-soft)] text-[var(--accent-main)]",
    tag: "border-[var(--accent-main)]/20 bg-[var(--accent-soft)] text-[var(--accent-main)]",
    bullet: "bg-[var(--accent-main)]",
    hover:
      "hover:border-[var(--accent-main)] hover:shadow-[var(--shadow-accent)]",
  },
  purple: {
    iconBox:
      "border-purple-500/30 bg-purple-500/10 text-purple-500 dark:text-purple-400",
    tag: "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-300",
    bullet: "bg-purple-500 dark:bg-purple-400",
    hover: "hover:border-purple-400/50 hover:shadow-purple-500/20",
  },
  emerald: {
    iconBox:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    tag: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    bullet: "bg-emerald-500 dark:bg-emerald-400",
    hover: "hover:border-emerald-400/50 hover:shadow-emerald-500/20",
  },
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="absolute right-0 bottom-24 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            Experience
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Professional Experience
          </h2>

          <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
            A summary of my hands-on experience in data management, data
            migration, and academic practicum support.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {experiences.map((exp, index) => {
            const style = accentStyles[exp.accent];

            return (
              <article
                key={index}
                className={`group flex h-full flex-col rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-7 shadow-2xl shadow-[var(--shadow-main)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${style.hover}`}
              >
                {/* Top */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-xl font-bold ${style.iconBox}`}
                  >
                    {exp.icon}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${style.tag}`}
                  >
                    {exp.duration}
                  </span>
                </div>

                {/* Main Info */}
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors duration-300 group-hover:text-[var(--accent-main)]">
                    {exp.title}
                  </h3>

                  <p className="mt-2 font-medium text-[var(--accent-main)]">
                    {exp.company}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span>📍</span>
                    {exp.location}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-[var(--border-main)]" />

                {/* Description */}
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-soft)]">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.bullet}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
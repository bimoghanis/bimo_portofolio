import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const experiences = [
  {
    title: "Freelance Data Management",
    company: "Direktorat PuTI Telkom University",
    duration: "Jul 2024 - Sep 2024",
    location: "Bandung, West Java",
    icon: "▥",
    accent: "sky",
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
    accent: "lavender",
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
    accent: "mint",
    description: [
      "Assisted lecturers in preparing and delivering learning materials for programming, database, networking, and object-oriented programming courses.",
      "Managed exams, assignments, and student projects while providing assessment, feedback, and technical guidance.",
      "Guided students during practicum sessions and helped them understand both theoretical and hands-on programming concepts.",
    ],
  },
];

const accentStyles = {
  sky: { iconBg: "var(--clay-sky)", bullet: "bg-[var(--accent-main)]" },
  lavender: { iconBg: "var(--clay-lavender)", bullet: "bg-[var(--clay-lavender)]" },
  mint: { iconBg: "var(--clay-mint)", bullet: "bg-[var(--clay-mint)]" },
};

const Experience = () => {
  const revealRef = useScrollReveal();

  return (
    <section
      id="experience"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        <div className="reveal mb-10">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
            Experience
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Professional Experience
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
            A summary of my hands-on experience in enterprise data migration, ETL operations, and academic practicum instruction.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {experiences.map((exp, index) => {
            const style = accentStyles[exp.accent];

            return (
              <article
                key={index}
                className="reveal clay-card group flex h-full flex-col p-7"
                data-delay={index * 120}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div
                    className="clay-icon-box flex h-13 w-13 shrink-0 items-center justify-center text-xl font-bold text-[var(--text-main)]"
                    style={{ background: style.iconBg }}
                  >
                    {exp.icon}
                  </div>
                  <span className="clay-pill bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-main)]">
                    {exp.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors duration-200 group-hover:text-[var(--accent-main)]">
                    {exp.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--accent-main)]">{exp.company}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <span>📍</span>{exp.location}
                  </p>
                </div>

                <div className="my-6 h-px w-full bg-[var(--border-soft)]" />

                <ul className="space-y-3 text-xs leading-relaxed text-[var(--text-soft)]">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.bullet}`} />
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
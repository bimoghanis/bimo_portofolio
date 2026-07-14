import React from "react";
import Fotodiri from "../assets/fotodiri.jpg";

const Hero = () => {
  const cvPath =
    "https://drive.google.com/file/d/1EnHlzYVj56m8yxe0_H3X0zy5YzqItBZQ/view?usp=sharing";

  const githubPath = "https://github.com/bimoghanis";
  const linkedinPath =
    "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217";

  const stats = [
    {
      number: "1+",
      title: "Years of Experience",
      desc: "Hands-on in software & data projects",
      icon: "▣",
    },
    {
      number: "12+",
      title: "Total Projects",
      desc: "Web apps, analytics & ML projects",
      icon: "▤",
    },
    {
      number: "Core Focus",
      title: "Data + Web",
      desc: "Web Development, Data Analytics, ML, and Automation",
      icon: "◎",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[var(--bg-main)] pb-16 pt-28 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="absolute left-[-120px] top-24 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="absolute right-[-120px] top-40 h-96 w-96 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      {/* Dotted wave accent */}
      <div className="absolute inset-x-0 top-[360px] h-40 opacity-25">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,var(--accent-main)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
              Informatics Student
            </p>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-[var(--text-main)] md:text-6xl lg:text-7xl">
              Data-Driven Builder <br />
              for{" "}
              <span className="bg-[linear-gradient(135deg,var(--accent-main),var(--accent-secondary))] bg-clip-text text-transparent">
                Web & Analytics
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              I build clean, scalable web applications and turn data into
              insights. I work with{" "}
              <span className="font-semibold text-[var(--accent-main)]">
                React
              </span>
              ,{" "}
              <span className="font-semibold text-[var(--accent-main)]">
                Python
              </span>
              ,{" "}
              <span className="font-semibold text-[var(--accent-main)]">
                SQL
              </span>
              , machine learning, and data-driven applications to solve
              real-world problems.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-main)] px-6 py-3 font-bold text-white shadow-lg shadow-[var(--shadow-accent)] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
              >
                Resume
              </a>

              <a
                href={githubPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-3 font-bold text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
              >
                GitHub
              </a>

              <a
                href={linkedinPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-6 py-3 font-bold text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-7 shadow-2xl shadow-[var(--shadow-main)] backdrop-blur-md transition-colors duration-300">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                <div className="relative mb-5 sm:mb-0 sm:mr-6">
                  <div className="absolute inset-0 rounded-full bg-[var(--accent-glow)] blur-xl" />

                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-[var(--accent-main)] bg-[var(--bg-soft)] p-1 shadow-lg shadow-[var(--shadow-accent)]">
                    <img
                      src={Fotodiri}
                      alt="Bimo Ghanis"
                      className="h-full w-full rounded-full object-cover object-[center_22%]"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--text-main)]">
                    Bimo Ghanis
                  </h2>

                  <p className="mt-1 text-lg font-semibold text-[var(--accent-main)]">
                    Informatics Student
                  </p>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
                    Focused on web development, data analytics, machine
                    learning, and data-driven applications.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="grid gap-2 border-b border-[var(--border-main)] pb-4 sm:grid-cols-[145px_1fr] sm:gap-4">
                  <p className="font-semibold text-[var(--text-soft)]">
                    Location
                  </p>
                  <p className="text-[var(--text-muted)]">
                    Jakarta, Indonesia
                  </p>
                </div>

                <div className="grid gap-2 border-b border-[var(--border-main)] pb-4 sm:grid-cols-[145px_1fr] sm:gap-4">
                  <p className="font-semibold text-[var(--text-soft)]">
                    Degree
                  </p>
                  <p className="text-[var(--text-muted)]">
                    B.Sc. Informatics
                  </p>
                </div>

                <div className="grid gap-2 border-b border-[var(--border-main)] pb-4 sm:grid-cols-[145px_1fr] sm:gap-4">
                  <p className="font-semibold text-[var(--text-soft)]">
                    Career Focus
                  </p>
                  <p className="text-[var(--text-muted)]">
                    Software Engineering • Data Analyst • Machine Learning
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-[145px_1fr] sm:gap-4">
                  <p className="font-semibold text-[var(--text-soft)]">
                    Availability
                  </p>
                  <div>
                    <p className="font-bold text-[var(--success-main)]">
                      Open to Opportunities
                    </p>
                    <p className="text-[var(--text-muted)]">
                      Internship, freelance, and collaborative projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-2xl shadow-[var(--shadow-main)] backdrop-blur-md transition-colors duration-300 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-7 ${
                index !== stats.length - 1
                  ? "border-b border-[var(--border-main)] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--accent-main)] bg-[var(--accent-soft)] text-3xl text-[var(--accent-main)]">
                {stat.icon}
              </div>

              <div>
                <h3 className="text-4xl font-extrabold text-[var(--text-main)]">
                  {stat.number}
                </h3>
                <p className="mt-1 font-semibold text-[var(--text-soft)]">
                  {stat.title}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
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
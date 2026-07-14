import React, { useState } from "react";

import Logotunc from "../assets/tunc.png";
import Webpemilihankel from "../assets/webpemilihankelompok.png";
import Leg5appandro from "../assets/leg5andro.png";
import ClinicImage from "../assets/website aldiora.png";
import serviceopertation from "../assets/serviceoperation.png";
import HousePriceThumb from "../assets/decisiontree.png";
import sentimentAnalysisThumb from "../assets/sentimenanalisis.png";

const projects = [
  {
    title: "Service Operations Data Analysis",
    category: "Data",
    date: "October 2025",
    description:
      "Analyzed service operation data to identify response-time bottlenecks, user satisfaction trends, and resource allocation opportunities.",
    image: serviceopertation,
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    demo: "https://drive.google.com/drive/folders/1IK5_sZJ-BDbkCw4QGl1sIJMVCeU668jI?usp=sharing",
    actionLabel: "View Report",
  },
  {
    title: "NLP Sentiment Analysis",
    category: "Machine Learning",
    date: "December 2025",
    description:
      "Built an NLP sentiment classification model for Amazon reviews using DistilBERT, Hugging Face, and PyTorch.",
    image: sentimentAnalysisThumb,
    tech: ["Python", "PyTorch", "Hugging Face", "DistilBERT"],
    demo: "https://drive.google.com/drive/folders/1Mh2_dArpN_00IomhnAjxPRTPjJxbVvJ9?usp=sharing",
    actionLabel: "Case Study",
  },
  {
    title: "House Price Prediction",
    category: "Machine Learning",
    date: "December 2025",
    description:
      "Developed a regression model to predict house prices and optimized feature selection using Genetic Algorithm.",
    image: HousePriceThumb,
    tech: ["Python", "Scikit-learn", "Genetic Algorithm", "Colab"],
    demo: "https://colab.research.google.com/drive/1pBTbqCIYa_5IEkxqSsqtML9iGEYg6lMZ?usp=sharing",
    actionLabel: "Open Notebook",
  },
  {
    title: "Aldiora Clinic Website",
    category: "Web",
    date: "December 2025 - March 2026",
    description:
      "Developed a responsive beauty clinic website with modern UI, service pages, and smooth user experience using React and Tailwind CSS.",
    image: ClinicImage,
    tech: ["React", "Vite", "Tailwind CSS"],
    demo: "https://bimoghanis.github.io/proyekwebbeautyclinic/#/",
    actionLabel: "Live Demo",
  },
  {
    title: "Sistem Pemilihan Kelompok",
    category: "Web",
    date: "December 2024",
    description:
      "Built a web-based application to assist group member selection using combination and permutation algorithms.",
    image: Webpemilihankel,
    tech: ["Next.js", "Algorithm", "Web App"],
    github: "https://github.com/bimoghanis/tubes_aka.git",
    demo: "#",
    actionLabel: "Live Demo",
  },
  {
    title: "Telkom University National Campus",
    category: "Data",
    date: "July 2023 - September 2024",
    description:
      "Supported data migration for Telkom University branch campuses by analyzing database structures and preparing data flow documentation.",
    image: Logotunc,
    tech: ["DBeaver", "Pentaho PDI", "ETL", "Database"],
    demo: "#",
    actionLabel: "Case Study",
  },
  {
    title: "Leg5 Mobile App",
    category: "Mobile",
    date: "January - March 2023",
    description:
      "Developed a mobile application for street food forums, connecting users with local vendors using Kotlin and Firebase.",
    image: Leg5appandro,
    tech: ["Kotlin", "Firebase", "Android"],
    github: "https://github.com/bimoghanis/leg5appmobile.git",
    demo: "#",
    actionLabel: "View Project",
  },
];

const filters = ["All", "Web", "Data", "Machine Learning", "Mobile"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            Featured Projects
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
                Selected works that show my technical focus.
              </h2>

              <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
                A collection of projects across web development, data analysis,
                machine learning, mobile development, and data engineering.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? "border-[var(--accent-main)] bg-[var(--accent-main)] text-white shadow-lg [box-shadow:0_10px_15px_-3px_var(--shadow-accent)]"
                      : "border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-soft)] shadow-sm hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] backdrop-blur-md transition-all duration-300 [box-shadow:0_25px_50px_-12px_var(--shadow-main)] hover:-translate-y-2 hover:border-[var(--accent-main)] hover:[box-shadow:0_25px_50px_-12px_var(--shadow-accent)]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-[var(--bg-soft)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
                    No Image Provided
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-[var(--accent-main)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-3 text-sm font-semibold text-[var(--accent-main)]">
                  {project.date}
                </p>

                <h3 className="text-xl font-bold text-[var(--text-main)] transition-colors duration-300 group-hover:text-[var(--accent-main)]">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[var(--border-main)] bg-[var(--bg-soft)] px-3 py-1 text-xs font-medium text-[var(--text-soft)] transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[var(--accent-main)] px-4 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
                    >
                      {project.actionLabel}
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-2.5 text-center text-sm font-bold text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
                    >
                      GitHub
                    </a>
                  )}

                  {!project.github && (!project.demo || project.demo === "#") && (
                    <span className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-soft)] px-4 py-2.5 text-sm font-semibold text-[var(--text-muted)]">
                      Private Project
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
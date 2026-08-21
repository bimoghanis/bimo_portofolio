import React, { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

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
    description: "Analyzed service operation data to identify response-time bottlenecks, user satisfaction trends, and resource allocation opportunities.",
    image: serviceopertation,
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    demo: "https://drive.google.com/drive/folders/1IK5_sZJ-BDbkCw4QGl1sIJMVCeU668jI?usp=sharing",
    actionLabel: "View Report",
  },
  {
    title: "NLP Sentiment Analysis",
    category: "Machine Learning",
    date: "December 2025",
    description: "Built an NLP sentiment classification model for Amazon reviews using DistilBERT, Hugging Face, and PyTorch.",
    image: sentimentAnalysisThumb,
    tech: ["Python", "PyTorch", "Hugging Face", "DistilBERT"],
    demo: "https://drive.google.com/drive/folders/1Mh2_dArpN_00IomhnAjxPRTPjJxbVvJ9?usp=sharing",
    actionLabel: "Case Study",
  },
  {
    title: "House Price Prediction",
    category: "Machine Learning",
    date: "December 2025",
    description: "Developed a regression model to predict house prices and optimized feature selection using Genetic Algorithm.",
    image: HousePriceThumb,
    tech: ["Python", "Scikit-learn", "Genetic Algorithm", "Colab"],
    demo: "https://colab.research.google.com/drive/1pBTbqCIYa_5IEkxqSsqtML9iGEYg6lMZ?usp=sharing",
    actionLabel: "Open Notebook",
  },
  {
    title: "Aldiora Clinic Website",
    category: "Web",
    date: "December 2025 - March 2026",
    description: "Developed a responsive beauty clinic website with modern UI, service pages, and smooth user experience using React and Tailwind CSS.",
    image: ClinicImage,
    tech: ["React", "Vite", "Tailwind CSS"],
    demo: "https://bimoghanis.github.io/proyekwebbeautyclinic/#/",
    actionLabel: "Live Demo",
  },
  {
    title: "Sistem Pemilihan Kelompok",
    category: "Web",
    date: "December 2024",
    description: "Built a web-based application to assist group member selection using combination and permutation algorithms.",
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
    description: "Supported data migration for Telkom University branch campuses by analyzing database structures and preparing data flow documentation.",
    image: Logotunc,
    tech: ["DBeaver", "Pentaho PDI", "ETL", "Database"],
    demo: "#",
    actionLabel: "Case Study",
  },
  {
    title: "Leg5 Mobile App",
    category: "Mobile",
    date: "January - March 2023",
    description: "Developed a mobile application for street food forums, connecting users with local vendors using Kotlin and Firebase.",
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
  const revealRef = useScrollReveal();

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
            Featured Projects
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
                Selected Engineering Works.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                A collection of projects across web development, data analysis, machine learning, and data engineering.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2.5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`clay-pill px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[var(--accent-main)] text-white shadow-md"
                      : "bg-[var(--bg-card)] text-[var(--text-soft)] hover:text-[var(--accent-main)]"
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
              key={`${project.title}-${activeFilter}-${index}`}
              className="reveal clay-card group flex h-full flex-col overflow-hidden"
              data-delay={(index % 6) * 80}
            >
              {/* Image */}
              <div className="relative h-50 overflow-hidden bg-[var(--bg-soft)]" style={{ borderRadius: "26px 26px 0 0" }}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-muted)]">
                    No Image Provided
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/50 via-transparent to-transparent" />
                <span className="clay-pill absolute left-4 top-4 bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-bold text-[var(--accent-main)]" style={{ backdropFilter: "blur(6px)" }}>
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 text-xs font-bold text-[var(--accent-main)]">{project.date}</p>
                <h3 className="text-lg font-bold text-[var(--text-main)] transition-colors duration-200 group-hover:text-[var(--accent-main)]">
                  {project.title}
                </h3>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-[var(--text-muted)]">{project.description}</p>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((item, idx) => (
                    <span key={idx} className="clay-pill skill-glow bg-[var(--bg-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-soft)]">
                      {item}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-2.5">
                  {project.demo && project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="clay-button-primary flex-1 px-4 py-2 text-center text-xs font-bold" style={{ borderRadius: "14px" }}>
                      {project.actionLabel}
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="clay-button flex-1 bg-[var(--bg-card)] px-4 py-2 text-center text-xs font-bold text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]">
                      GitHub
                    </a>
                  )}
                  {!project.github && (!project.demo || project.demo === "#") && (
                    <span className="clay-pill bg-[var(--bg-soft)] px-4 py-2 text-center text-xs font-semibold text-[var(--text-muted)] w-full">Private Project</span>
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
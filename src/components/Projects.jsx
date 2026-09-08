import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FiArrowUpRight, FiX } from "react-icons/fi";

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
    description: "Analyzed 2,666 service-operation records, cleaned missing AI fields to 1,986 usable rows, and identified a 15% night-session satisfaction drop to inform staffing and response monitoring.",
    image: serviceopertation,
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    demo: "https://drive.google.com/drive/folders/1IK5_sZJ-BDbkCw4QGl1sIJMVCeU668jI?usp=sharing",
    actionLabel: "View Report",
    caseStudy: {
      problem: "The service-operation dataset contained missing AI response and accuracy fields, making it difficult to compare satisfaction across sessions.",
      role: "I profiled and cleaned the dataset, then explored satisfaction patterns by session timing and AI interaction.",
      process: "Reviewed 2,666 rows, isolated 1,986 usable records after cleaning, and compared response and satisfaction trends with Python, Pandas, Matplotlib, and Seaborn.",
      result: "Night-session satisfaction was 15% lower, with the clearest drop in AI sessions. This creates a practical direction for staffing and response monitoring.",
      insightViews: {
        quality: [
          { label: "Usable rows", value: "1,986", percent: 74.5 },
          { label: "Rows needing cleaning", value: "680", percent: 25.5 },
        ],
        satisfaction: [
          { label: "Day session baseline", value: "100 index", percent: 100 },
          { label: "Night session", value: "85 index", percent: 85 },
        ],
      },
    },
  },
  {
    title: "NLP Sentiment Analysis",
    category: "Machine Learning",
    date: "December 2025",
    description: "Built and evaluated a DistilBERT sentiment classifier for Amazon reviews, documenting preprocessing, training, and error analysis with Hugging Face and PyTorch.",
    image: sentimentAnalysisThumb,
    tech: ["Python", "PyTorch", "Hugging Face", "DistilBERT"],
    demo: "https://drive.google.com/drive/folders/1Mh2_dArpN_00IomhnAjxPRTPjJxbVvJ9?usp=sharing",
    actionLabel: "Case Study",
    caseStudy: {
      problem: "Classify the sentiment of Amazon reviews while keeping the workflow reproducible and inspectable.",
      role: "I prepared the text data, fine-tuned a DistilBERT model, and documented evaluation and error analysis.",
      process: "Built the preprocessing and training workflow with Hugging Face and PyTorch, then reviewed misclassified examples to understand model limitations.",
      result: "The project demonstrates an end-to-end transformer workflow, from dataset preparation through evaluation and error analysis.",
    },
  },
  {
    title: "House Price Prediction",
    category: "Machine Learning",
    date: "December 2025",
    description: "Trained a house-price regression model and used a Genetic Algorithm to compare feature subsets in a reproducible Google Colab workflow.",
    image: HousePriceThumb,
    tech: ["Python", "Scikit-learn", "Genetic Algorithm", "Colab"],
    demo: "https://colab.research.google.com/drive/1pBTbqCIYa_5IEkxqSsqtML9iGEYg6lMZ?usp=sharing",
    actionLabel: "Open Notebook",
    caseStudy: {
      problem: "Estimate house prices while testing whether a smaller feature set can keep the regression workflow useful.",
      role: "I trained the regression model and compared feature subsets selected with a Genetic Algorithm.",
      process: "Built a reproducible Google Colab workflow with Python and Scikit-learn, then evaluated feature-selection alternatives.",
      result: "The notebook shows how a metaheuristic feature-selection step can be compared alongside a standard regression workflow.",
    },
  },
  {
    title: "Aldiora Clinic Website",
    category: "Web",
    date: "December 2025 - March 2026",
    description: "Built and shipped a responsive clinic website with service pages, mobile-first layouts, and reusable React/Tailwind components.",
    image: ClinicImage,
    tech: ["React", "Vite", "Tailwind CSS"],
    demo: "https://bimoghanis.github.io/proyekwebbeautyclinic/#/",
    actionLabel: "Live Demo",
  },
  {
    title: "Sistem Pemilihan Kelompok",
    category: "Web",
    date: "December 2024",
    description: "Built a Next.js web app that automates group selection with combination and permutation logic in a browser-ready interface.",
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
    description: "Mapped database structures across Telkom University branch campuses and documented ETL flows for the TUNC migration project using DBeaver and Pentaho PDI.",
    image: Logotunc,
    tech: ["DBeaver", "Pentaho PDI", "ETL", "Database"],
    demo: "#",
    actionLabel: "Case Study",
  },
  {
    title: "Leg5 Mobile App",
    category: "Mobile",
    date: "January - March 2023",
    description: "Built an Android street-food forum connecting users with local vendors through Kotlin and Firebase.",
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
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeInsight, setActiveInsight] = useState("quality");
  const revealRef = useScrollReveal();

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-14 md:py-16 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-2 md:px-12 lg:px-24">
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
                Case studies, shipped interfaces, and data workflows across analytics, machine learning, and software engineering.
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
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>

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
                  {project.caseStudy && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCaseStudy(project);
                        setActiveInsight("quality");
                      }}
                      className="clay-button flex-1 bg-[var(--bg-card)] px-4 py-2 text-center text-xs font-bold text-[var(--accent-main)] transition-colors duration-200 hover:text-[var(--accent-secondary)]"
                      style={{ borderRadius: "14px" }}
                    >
                      Case Study
                    </button>
                  )}
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

        {activeCaseStudy && (
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/60 px-5 py-8 backdrop-blur-sm"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveCaseStudy(null);
            }}
          >
            <article
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-[var(--border-soft)] bg-[var(--bg-main)] p-6 text-[var(--text-main)] shadow-2xl md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-main)]">Case Study</p>
                  <h3 id="case-study-title" className="text-2xl font-extrabold md:text-3xl">{activeCaseStudy.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  aria-label="Close case study"
                  className="clay-button flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--bg-card)] text-lg text-[var(--text-soft)] hover:text-[var(--accent-main)]"
                >
                  <FiX />
                </button>
              </div>

              <img src={activeCaseStudy.image} alt="" className="mt-6 h-48 w-full rounded-2xl object-cover md:h-60" />

              <div className="mt-7 grid gap-5">
                {[
                  ["Problem", activeCaseStudy.caseStudy.problem],
                  ["My role", activeCaseStudy.caseStudy.role],
                  ["Process", activeCaseStudy.caseStudy.process],
                  ["Result", activeCaseStudy.caseStudy.result],
                ].map(([label, copy]) => (
                  <div key={label}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-main)]">{label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{copy}</p>
                  </div>
                ))}
              </div>

              {activeCaseStudy.caseStudy.insightViews && (
                <div className="mt-8 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card-soft)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-main)]">Data snapshot</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">Switch the view to inspect the key finding.</p>
                    </div>
                    <div className="flex gap-2">
                      {[["quality", "Data quality"], ["satisfaction", "Sessions"]].map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveInsight(key)}
                          className={`clay-pill px-3 py-1.5 text-xs font-bold ${activeInsight === key ? "bg-[var(--accent-main)] text-white" : "bg-[var(--bg-card)] text-[var(--text-soft)]"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 space-y-4">
                    {activeCaseStudy.caseStudy.insightViews[activeInsight].map((insight) => (
                      <div key={insight.label}>
                        <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                          <span className="text-[var(--text-soft)]">{insight.label}</span>
                          <strong className="text-[var(--accent-main)]">{insight.value}</strong>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-[var(--bg-soft)]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-main)] to-[var(--accent-secondary)]" style={{ width: `${insight.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {activeCaseStudy.tech.map((item) => (
                  <span key={item} className="clay-pill bg-[var(--bg-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">{item}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {activeCaseStudy.demo && activeCaseStudy.demo !== "#" && (
                  <a href={activeCaseStudy.demo} target="_blank" rel="noopener noreferrer" className="clay-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold" style={{ borderRadius: "14px" }}>
                    Open source material <FiArrowUpRight />
                  </a>
                )}
                {activeCaseStudy.github && (
                  <a href={activeCaseStudy.github} target="_blank" rel="noopener noreferrer" className="clay-button inline-flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 text-sm font-bold text-[var(--text-soft)]" style={{ borderRadius: "14px" }}>
                    View GitHub <FiArrowUpRight />
                  </a>
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

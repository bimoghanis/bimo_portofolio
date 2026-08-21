import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

import Dibimbingdata from "../assets/dibimbing.png";
import Dicodingpython from "../assets/dicodingpython.png";
import Dicodingsql from "../assets/dicodingsql.png";
import Dicodingdatascience from "../assets/dicodingdatascience.png";
import Dicodingdasarai from "../assets/dicodingdasarai.png";
import Hsk11Image from "../assets/hsk11.png";
import Hsk12Image from "../assets/hsk12.png";
import Hsk13Image from "../assets/hsk13.png";
import Hsk14Image from "../assets/hsk14.png";
import MyskillImage from "../assets/basicdata.png";

/* IBM SkillsBuild Certificate Assets */
import IbmClassifyingGraniteImage from "../assets/certificates/ibm_classifying_data_using_granite.png";
import IbmClassifyingGranitePdf from "../assets/certificates/ibm_classifying_data_using_granite.pdf";

import IbmEarnAcceptShareImage from "../assets/certificates/ibm_earn_accept_share.png";
import IbmEarnAcceptSharePdf from "../assets/certificates/ibm_earn_accept_share.pdf";

import IbmUnleashingAiAgentsImage from "../assets/certificates/ibm_unleashing_ai_agents.png";
import IbmUnleashingAiAgentsPdf from "../assets/certificates/ibm_unleashing_ai_agents.pdf";

import IbmIntelligentAiAgentImage from "../assets/certificates/ibm_intelligent_by_design_ai_agent.png";
import IbmIntelligentAiAgentPdf from "../assets/certificates/ibm_intelligent_by_design_ai_agent.pdf";

import IbmIntroLlmImage from "../assets/certificates/ibm_intro_large_language_models.png";
import IbmIntroLlmPdf from "../assets/certificates/ibm_intro_large_language_models.pdf";

import IbmAiLiteracyImage from "../assets/certificates/ibm_ai_literacy.png";
import IbmAiLiteracyPdf from "../assets/certificates/ibm_ai_literacy.pdf";

import IbmExploringAiImage from "../assets/certificates/ibm_exploring_ai.png";
import IbmExploringAiPdf from "../assets/certificates/ibm_exploring_ai.pdf";

import IbmInteractingAiImage from "../assets/certificates/ibm_interacting_with_ai.png";
import IbmInteractingAiPdf from "../assets/certificates/ibm_interacting_with_ai.pdf";

import IbmDataScienceLandscapeImage from "../assets/certificates/ibm_data_science_landscape.png";
import IbmDataScienceLandscapePdf from "../assets/certificates/ibm_data_science_landscape.pdf";

import IbmGettingStartedDataImage from "../assets/certificates/ibm_getting_started_with_data.png";
import IbmGettingStartedDataPdf from "../assets/certificates/ibm_getting_started_with_data.pdf";

import IbmIntroDataConceptsImage from "../assets/certificates/ibm_intro_data_concepts.png";
import IbmIntroDataConceptsPdf from "../assets/certificates/ibm_intro_data_concepts.pdf";

import IbmIntroTableauImage from "../assets/certificates/ibm_intro_tableau_desktop.png";
import IbmIntroTableauPdf from "../assets/certificates/ibm_intro_tableau_desktop.pdf";

import IbmGettingStartedAiImage from "../assets/certificates/ibm_getting_started_ai.png";
import IbmGettingStartedAiPdf from "../assets/certificates/ibm_getting_started_ai.pdf";

import IbmIntroAiImage from "../assets/certificates/ibm_intro_ai.png";
import IbmIntroAiPdf from "../assets/certificates/ibm_intro_ai.pdf";

import IbmLlmBasicsImage from "../assets/certificates/ibm_llm_basics.png";
import IbmLlmBasicsPdf from "../assets/certificates/ibm_llm_basics.pdf";

import IbmMasteringPromptingImage from "../assets/certificates/ibm_mastering_prompting.png";
import IbmMasteringPromptingPdf from "../assets/certificates/ibm_mastering_prompting.pdf";

/* Coursera IBM Certificate Assets */
import CourseraDataAnalysisPythonImage from "../assets/certificates/coursera_data_analysis_with_python.png";
import CourseraDataVizCognosImage from "../assets/certificates/coursera_data_visualization_dashboards_excel_cognos.png";
import CourseraDatabasesSqlPythonImage from "../assets/certificates/coursera_databases_sql_data_science_python.png";
import CourseraExcelBasicsImage from "../assets/certificates/coursera_excel_basics_data_analysis.png";
import CourseraIntroDataAnalyticsImage from "../assets/certificates/coursera_introduction_data_analytics.png";
import CourseraPythonDataScienceImage from "../assets/certificates/coursera_python_data_science_ai_development.png";
import CourseraPythonProjectImage from "../assets/certificates/coursera_python_project_data_science.png";

const courseraCertificates = [
  {
    title: "Data Analysis with Python",
    organizer: "IBM / Coursera",
    date: "25 Jun 2026",
    category: "Data Analysis",
    image: CourseraDataAnalysisPythonImage,
    link: "https://coursera.org/verify/T6CZQF5DYG4C",
  },
  {
    title: "Databases and SQL for Data Science with Python",
    organizer: "IBM / Coursera",
    date: "24 Jun 2026",
    category: "Database",
    image: CourseraDatabasesSqlPythonImage,
    link: "https://coursera.org/verify/VO5NQNYK64V3",
  },
  {
    title: "Python Project for Data Science",
    organizer: "IBM / Coursera",
    date: "24 Jun 2026",
    category: "Data Science",
    image: CourseraPythonProjectImage,
    link: "https://coursera.org/verify/RJLG5LGYXJ83",
  },
  {
    title: "Python for Data Science, AI & Development",
    organizer: "IBM / Coursera",
    date: "10 Jun 2026",
    category: "Python",
    image: CourseraPythonDataScienceImage,
    link: "https://coursera.org/verify/IHC1RU2DVUF1",
  },
  {
    title: "Data Visualization and Dashboards with Excel and Cognos",
    organizer: "IBM / Coursera",
    date: "10 Jun 2026",
    category: "Data Visualization",
    image: CourseraDataVizCognosImage,
    link: "https://coursera.org/verify/RSZFIQEWBPLE",
  },
  {
    title: "Excel Basics for Data Analysis",
    organizer: "IBM / Coursera",
    date: "08 Jun 2026",
    category: "Excel",
    image: CourseraExcelBasicsImage,
    link: "https://coursera.org/verify/ZRRUWV7WRC8R",
  },
  {
    title: "Introduction to Data Analytics",
    organizer: "IBM / Coursera",
    date: "08 Jun 2026",
    category: "Data Analytics",
    image: CourseraIntroDataAnalyticsImage,
    link: "https://coursera.org/verify/8OC5KQGT108U",
  },
];

const ibmCertificates = [
  {
    title: "Intelligent by Design: Build an AI Agent",
    organizer: "IBM SkillsBuild",
    date: "16 Jun 2026",
    category: "AI Agents",
    image: IbmIntelligentAiAgentImage,
    link: IbmIntelligentAiAgentPdf,
  },
  {
    title: "Introduction to Large Language Models",
    organizer: "IBM SkillsBuild",
    date: "15 Jun 2026",
    category: "LLM",
    image: IbmIntroLlmImage,
    link: IbmIntroLlmPdf,
  },
  {
    title: "Unleashing the Power of AI Agents",
    organizer: "IBM SkillsBuild",
    date: "03 Jun 2026",
    category: "AI Agents",
    image: IbmUnleashingAiAgentsImage,
    link: IbmUnleashingAiAgentsPdf,
  },
  {
    title: "Classifying Data Using IBM Granite",
    organizer: "IBM SkillsBuild",
    date: "02 Jun 2026",
    category: "AI / Data",
    image: IbmClassifyingGraniteImage,
    link: IbmClassifyingGranitePdf,
  },
  {
    title: "Large Language Model Basics",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "LLM",
    image: IbmLlmBasicsImage,
    link: IbmLlmBasicsPdf,
  },
  {
    title: "Mastering the Art of Prompting",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Prompt Engineering",
    image: IbmMasteringPromptingImage,
    link: IbmMasteringPromptingPdf,
  },
  {
    title: "AI Literacy",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Artificial Intelligence",
    image: IbmAiLiteracyImage,
    link: IbmAiLiteracyPdf,
  },
  {
    title: "Exploring Artificial Intelligence",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Artificial Intelligence",
    image: IbmExploringAiImage,
    link: IbmExploringAiPdf,
  },
  {
    title: "Interacting with AI",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Artificial Intelligence",
    image: IbmInteractingAiImage,
    link: IbmInteractingAiPdf,
  },
  {
    title: "Getting Started with Artificial Intelligence",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Artificial Intelligence",
    image: IbmGettingStartedAiImage,
    link: IbmGettingStartedAiPdf,
  },
  {
    title: "Introduction to Artificial Intelligence",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Artificial Intelligence",
    image: IbmIntroAiImage,
    link: IbmIntroAiPdf,
  },
  {
    title: "Data Science Landscape",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Data Science",
    image: IbmDataScienceLandscapeImage,
    link: IbmDataScienceLandscapePdf,
  },
  {
    title: "Getting Started with Data",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Data",
    image: IbmGettingStartedDataImage,
    link: IbmGettingStartedDataPdf,
  },
  {
    title: "Introduction to Data Concepts",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Data",
    image: IbmIntroDataConceptsImage,
    link: IbmIntroDataConceptsPdf,
  },
  {
    title: "Introduction to Tableau Desktop",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "Data Visualization",
    image: IbmIntroTableauImage,
    link: IbmIntroTableauPdf,
  },
  {
    title: "Earn it! Accept it! Share it! | IBM SkillsBuild",
    organizer: "IBM SkillsBuild",
    date: "01 Jun 2026",
    category: "IBM SkillsBuild",
    image: IbmEarnAcceptShareImage,
    link: IbmEarnAcceptSharePdf,
  },
];

const certificates = [
  ...courseraCertificates,

  {
    title: "Data Science & Data Analysis Specialization",
    organizer: "MySkill",
    date: "July 2025",
    category: "Data Analytics",
    image: MyskillImage,
    link: "https://drive.google.com/drive/folders/1M65gfTOgRRHrrj6FeNNlnJ2cNa9kesD2?usp=sharing",
  },
  {
    title: "Data Series Fair 17.0 - Data Engineering",
    organizer: "Dibimbing",
    date: "February 2025",
    category: "Data Engineering",
    image: Dibimbingdata,
    link: "https://drive.google.com/file/d/1oWxOL_vAWmWACn9QrEzkttbtgeJkevot/view?usp=sharing",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    organizer: "Dicoding",
    date: "December 2024",
    category: "Programming",
    image: Dicodingpython,
    link: "https://drive.google.com/file/d/1wi6T4eQYjs_ytRkRAHszugdBpYe-bWQe/view?usp=sharing",
  },
  {
    title: "Belajar Dasar Structured Query Language SQL",
    organizer: "Dicoding",
    date: "December 2024",
    category: "Database",
    image: Dicodingsql,
    link: "https://drive.google.com/file/d/1FS_JZumkT2EOVoAvv7tJgmVSYQi9yaP9/view?usp=sharing",
  },
  {
    title: "Belajar Dasar Data Science",
    organizer: "Dicoding",
    date: "December 2024",
    category: "Data Science",
    image: Dicodingdatascience,
    link: "https://drive.google.com/file/d/1W5OOdoVEAKYZ4G8usTV5yoNl9Vw45e4U/view?usp=sharing",
  },
  {
    title: "Belajar Dasar AI",
    organizer: "Dicoding",
    date: "December 2024",
    category: "Artificial Intelligence",
    image: Dicodingdasarai,
    link: "https://drive.google.com/file/d/1RhIqry-cPFrDqchr5_GUBisjuhntm1HJ/view?usp=sharing",
  },

  ...ibmCertificates,

  {
    title: "Chinese Proficiency 1.4 HSK 2",
    organizer: "One Third Consulting & Abroad OTCA",
    date: "July 2025",
    category: "Language",
    image: Hsk14Image,
    link: "https://drive.google.com/file/d/16b_6gtUvXZYa0sGcVCbvhhOoL3UnDqRQ/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.3 HSK 1",
    organizer: "One Third Consulting & Abroad OTCA",
    date: "March 2025",
    category: "Language",
    image: Hsk13Image,
    link: "https://drive.google.com/file/d/14UOHKcxRq2TZgL7l_inlM0KH04m5tLcO/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.2 HSK 1",
    organizer: "One Third Consulting & Abroad OTCA",
    date: "March 2025",
    category: "Language",
    image: Hsk12Image,
    link: "https://drive.google.com/file/d/1Ytz3rKK94pLq-tYr2xTrNUY-uxqkdW1H/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.1 HSK 1",
    organizer: "One Third Consulting & Abroad OTCA",
    date: "January 2025",
    category: "Language",
    image: Hsk11Image,
    link: "https://drive.google.com/file/d/13aOwqAj8wZspkjTuhtswZUh0Uqck8l8A/view?usp=drive_link",
  },
];

/* Sort Helper */
const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const getCertificateTime = (dateText) => {
  const cleanDate = dateText.trim();

  const fullDateMatch = cleanDate.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (fullDateMatch) {
    const [, day, month, year] = fullDateMatch;
    return new Date(
      Number(year),
      monthMap[month] ?? 0,
      Number(day),
    ).getTime();
  }

  const monthYearMatch = cleanDate.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const [, month, year] = monthYearMatch;
    return new Date(Number(year), monthMap[month] ?? 0, 1).getTime();
  }

  return 0;
};

const Certificate = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const revealRef = useScrollReveal();

  const sortedCertificates = [...certificates].sort(
    (a, b) => getCertificateTime(b.date) - getCertificateTime(a.date),
  );

  const visibleCertificates = showAll
    ? sortedCertificates
    : sortedCertificates.slice(0, 6);

  return (
    <section
      id="certificates"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-200"
    >
      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-main)]">
              Certificates
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
              Licenses & <span className="text-[var(--accent-main)]">Certifications</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              A collection of industry certifications that validate my skills across data science, database architectures, and artificial intelligence.
            </p>
          </div>

          <div className="clay-card-static px-6 py-4 text-center">
            <p className="text-3xl font-extrabold text-[var(--accent-main)]">
              {sortedCertificates.length}+
            </p>
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              Total Certificates
            </p>
          </div>
        </div>

        {/* Certificate Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCertificates.map((cert, index) => (
            <article
              key={`${cert.title}-${index}`}
              className="reveal clay-card group overflow-hidden"
              data-delay={(index % 6) * 70}
            >
              {/* Image */}
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="relative block h-44 w-full overflow-hidden bg-[var(--bg-soft)] text-left"
                style={{ borderRadius: "26px 26px 0 0" }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/50 via-transparent to-transparent" />

                <span
                  className="clay-pill absolute left-4 top-4 bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-bold text-[var(--accent-main)]"
                  style={{ backdropFilter: "blur(6px)" }}
                >
                  {cert.category}
                </span>

                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-main)]/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="clay-pill bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-main)] shadow-md">
                    Click to Preview
                  </span>
                </div>
              </button>

              {/* Content */}
              <div className="p-6">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--text-main)] transition-colors duration-200 group-hover:text-[var(--accent-main)]">
                  {cert.title}
                </h3>

                <p className="mt-2 text-xs font-bold text-[var(--accent-main)]">
                  {cert.organizer}
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  {cert.date}
                </p>

                <div className="mt-5 flex gap-2.5 border-t border-[var(--border-soft)] pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="clay-button flex-1 bg-[var(--bg-card)] px-4 py-2 text-center text-xs font-bold text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
                  >
                    Preview
                  </button>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-button-primary flex-1 px-4 py-2 text-center text-xs font-bold"
                    style={{ borderRadius: "14px" }}
                  >
                    Verify ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More Button */}
        <div className="reveal mt-10 flex justify-center" data-delay="150">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="clay-button bg-[var(--bg-card)] px-6 py-3 text-xs font-bold text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
          >
            {showAll ? "Show Less Certificates" : "View All Certificates"}
          </button>
        </div>
      </div>

      {/* Modal View Image */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--bg-overlay)] p-4"
          style={{ backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="clay-card-static relative max-h-[90vh] w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-soft)] px-5 py-3.5">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {selectedCert.organizer} • {selectedCert.date}
                </p>
              </div>

              <button
                type="button"
                className="clay-button flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--bg-soft)] text-xs text-[var(--text-soft)] transition-colors duration-200 hover:text-[var(--accent-main)]"
                style={{ borderRadius: "50%" }}
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>
            </div>

            <div className="clay-inset mx-4 my-4 max-h-[62vh] overflow-auto bg-[var(--bg-soft)] p-3">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="mx-auto w-full max-w-3xl rounded-xl object-contain"
              />
            </div>

            <div className="border-t border-[var(--border-soft)] px-5 py-3.5 text-right">
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-button-primary inline-flex px-4 py-2 text-xs font-bold"
                style={{ borderRadius: "14px" }}
              >
                Open Certificate ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
import React from "react";
import Logotunc from "../assets/tunc.png";
import Webpemilihankel from "../assets/webpemilihankelompok.png";
import Leg5appandro from "../assets/leg5andro.png";
import ClinicImage from "../assets/website aldiora.png";
import serviceopertation from "../assets/serviceoperation.png";
import HousePriceThumb from "../assets/decisiontree.png";
import sentimentAnalysisThumb from "../assets/sentimenanalisis.png";

const projects = [
  {
    title: "Aldiora Clinic Website",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">
          December 2025 - March 2026
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          A professional and elegant beauty clinic website. Developed using{" "}
          <strong>React JSX</strong> powered by <strong>Vite</strong> for
          blazing-fast performance, and fully styled with{" "}
          <strong>Tailwind CSS</strong> to deliver a seamless UI/UX, responsive
          layout, and highly engaging user experience.
        </p>
      </>
    ),
    image: ClinicImage,
    demo: "https://bimoghanis.github.io/proyekwebbeautyclinic/#/",
  },
  {
    title: "House Price Prediction (Genetic Algorithm Optimization)",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">December 2025</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          An Artificial Intelligence project focusing on complex regression to
          predict house prices, overcoming high-dimensionality issues.
        </p>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 text-left">
          <li>
            Implemented <strong>Decision Tree Regressor</strong> to predict real
            estate prices based on 80 initial features.
          </li>
          <li>
            Integrated <strong>Genetic Algorithm (GA)</strong> for automated
            feature selection, significantly reducing overfitting and
            computational weight.
          </li>
          <li>
            Processed Kaggle's 'Advanced Regression Techniques' dataset using
            Python on Google Colab.
          </li>
        </ul>
      </>
    ),
    image: HousePriceThumb,
    demo: "https://colab.research.google.com/drive/1pBTbqCIYa_5IEkxqSsqtML9iGEYg6lMZ?usp=sharing",
  },
  // --- PROJECT BARU: NLP SENTIMENT ANALYSIS ---
  {
    title: "NLP Sentiment Analysis: Amazon Reviews",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">December 2025</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          A Big Data NLP project classifying Amazon customer reviews into
          positive and negative sentiments using a pre-trained Transformer
          model.
        </p>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 text-left">
          <li>
            Implemented <strong>DistilBERT</strong> via Hugging Face and PyTorch
            for highly efficient sentiment classification.
          </li>
          <li>
            Executed comprehensive data processing (cleaning, normalization,
            tokenization) on a balanced dataset of ~100,000 reviews.
          </li>
          <li>
            Achieved <strong>93% test accuracy</strong> and robust F1-scores
            (0.93) after fine-tuning, demonstrating excellent model
            generalization.
          </li>
        </ul>
      </>
    ),
    image: sentimentAnalysisThumb,
    // Link folder Google Drive yang diberikan
    demo: "https://drive.google.com/drive/folders/1Mh2_dArpN_00IomhnAjxPRTPjJxbVvJ9?usp=sharing",
  },
  {
    title: "Service Operations Data Analysis",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">October 2025</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          An in-depth data analysis to identify bottlenecks in AI response times
          and counselor resource allocation.
        </p>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 text-left">
          <li>
            Utilized <strong>Python (Pandas, Matplotlib, Seaborn)</strong> to
            process and analyze user session logs.
          </li>
          <li>
            Identified a critical drop in user satisfaction during night shifts
            correlated with increased AI response times.
          </li>
          <li>
            Provided data-driven strategic recommendations for resource
            reallocation to mitigate user churn.
          </li>
        </ul>
      </>
    ),
    image: serviceopertation,
    demo: "https://drive.google.com/drive/folders/1IK5_sZJ-BDbkCw4QGl1sIJMVCeU668jI?usp=sharing",
  },
  {
    title: "Sistem Pemilihan Kelompok",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">December 2024</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          A web-based application using Next.js to assist in group member
          selection with combination and permutation algorithms.
        </p>
      </>
    ),
    image: Webpemilihankel,
    github: "https://github.com/bimoghanis/tubes_aka.git",
    demo: "#",
  },
  {
    title: "Telkom University National Campus (TUNC)",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">
          July 2023 - September 2024
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">
          Led data migration for Telkom University branch campuses in Surabaya,
          Purwokerto, and Bandung.
        </p>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 text-left">
          <li>Analyzed database structures of branch campuses.</li>
          <li>Designed data flow documentation.</li>
          <li>Utilized DBeaver and Pentaho for migration.</li>
        </ul>
      </>
    ),
    image: Logotunc,
    demo: "#",
  },
  {
    title: "Leg5 Mobile App",
    description: (
      <>
        <p className="text-sm text-teal-400 mb-2 font-medium">
          January - March 2023
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          A mobile application built with Kotlin and Firebase. This app serves
          as a street food forum, connecting users with various local food
          vendors.
        </p>
      </>
    ),
    image: Leg5appandro,
    github: "https://github.com/bimoghanis/leg5appmobile.git",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-slate-900 text-slate-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Featured Projects
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Some of the works I'm most proud of, showcasing my skills in web
          development and data engineering.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-teal-900/20 transition-all duration-300 border border-slate-700 hover:border-teal-500/50 flex flex-col">
              <div className="w-full h-52 bg-slate-700 overflow-hidden relative">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-500 font-medium">
                    No Image Provided
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-100 mb-3">
                  {project.title}
                </h3>
                <div className="flex-grow">{project.description}</div>

                {(project.github || project.demo !== "#") && (
                  <div className="mt-6 flex space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-4 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white text-sm font-semibold transition-colors duration-300">
                        Code / GitHub
                      </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-4 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-slate-900 text-sm font-semibold transition-colors duration-300">
                        {/* Menyesuaikan tulisan tombol agar dinamis */}
                        {project.title.includes("Analysis")
                          ? "View Report"
                          : project.title.includes("Prediction")
                            ? "Open Notebook"
                            : "Live Demo"}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

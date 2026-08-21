import React, { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  FiDatabase,
  FiCpu,
  FiArrowRight,
  FiCheckCircle,
  FiLayers,
  FiServer,
  FiTrendingUp,
  FiFileText,
} from "react-icons/fi";

const pipelines = [
  {
    id: "tunc",
    title: "TUNC Multi-Campus Data Migration Pipeline",
    subtitle: "Enterprise ETL Architecture at Direktorat PuTI Telkom University",
    icon: <FiDatabase />,
    color: "var(--accent-main)",
    badge: "Enterprise ETL",
    summary:
      "Engineered automated data migration flows consolidating heterogeneous databases from Surabaya, Purwokerto, and Bandung into a unified Telkom University National Campus schema.",
    stages: [
      {
        step: "01",
        title: "Multi-Source Extraction",
        tech: "PostgreSQL • MySQL • DBeaver",
        desc: "Extracted branch campus student, academic, and faculty records with schema anomaly detection and format standardization.",
      },
      {
        step: "02",
        title: "ETL Transformation Engine",
        tech: "Pentaho PDI • SQL Queries",
        desc: "Applied mapping rules, foreign key reconciliation, duplicate resolution, and data cleansing transformations.",
      },
      {
        step: "03",
        title: "Validation & Staging",
        tech: "DBeaver • Data Flow Docs",
        desc: "Executed constraint verification, referential integrity checks, and validation logging before final merge.",
      },
      {
        step: "04",
        title: "Unified Production DB",
        tech: "National Campus DB Schema",
        desc: "Seamless load into central academic databases ensuring zero downtime and complete audit trails.",
      },
    ],
    highlights: [
      "3 Branch campuses successfully consolidated",
      "Comprehensive ERD & Data Flow Mapping documentation",
      "High data integrity verified through automated validation scripts",
    ],
  },
  {
    id: "nlp",
    title: "NLP Sentiment Classification Pipeline",
    subtitle: "End-to-End Deep Learning Architecture with DistilBERT & PyTorch",
    icon: <FiCpu />,
    color: "var(--accent-secondary)",
    badge: "Machine Learning / AI",
    summary:
      "Trained a transformer-based sentiment classifier on Amazon review benchmarks using DistilBERT, Hugging Face Tokenizers, and GPU-accelerated PyTorch workflows.",
    stages: [
      {
        step: "01",
        title: "Dataset Ingestion & Clean",
        tech: "Pandas • Regex • Python",
        desc: "Ingested massive review corpora, stripped HTML tags/emojis, normalized casing, and split stratified train/test folds.",
      },
      {
        step: "02",
        title: "Subword Tokenization",
        tech: "Hugging Face Tokenizer",
        desc: "Generated attention masks and token IDs with dynamic padding using DistilBERT tokenizer architecture.",
      },
      {
        step: "03",
        title: "Transformer Fine-Tuning",
        tech: "PyTorch • AdamW • GPU",
        desc: "Fine-tuned transformer weights with learning rate warmup, cross-entropy loss, and gradient clipping.",
      },
      {
        step: "04",
        title: "Inference & Metrics Eval",
        tech: "F1-Score • Confusion Matrix",
        desc: "Evaluated macro F1-score, accuracy, precision-recall curves, and packaged model for low-latency batch inference.",
      },
    ],
    highlights: [
      "DistilBERT model fine-tuned for high accuracy sentiment inference",
      "Dynamic batching and tensor optimization on GPU",
      "Comprehensive classification reports and confusion matrix analytics",
    ],
  },
  {
    id: "ga-ml",
    title: "Genetic Algorithm Feature Selection & Regression",
    subtitle: "Metaheuristic Optimization for House Price Prediction",
    icon: <FiTrendingUp />,
    color: "var(--clay-mint)",
    badge: "Metaheuristic ML",
    summary:
      "Developed a predictive regression model enhanced with Genetic Algorithm (GA) to automatically select optimal feature subsets, reducing dimensionality while maximizing R² accuracy.",
    stages: [
      {
        step: "01",
        title: "Feature Engineering",
        tech: "Scikit-Learn • Pandas",
        desc: "Handled missing values, encoded categorical attributes, and scaled continuous variables using RobustScaler.",
      },
      {
        step: "02",
        title: "GA Population Initialization",
        tech: "Binary Chromosomes • Python",
        desc: "Initialized binary candidate solutions representing active/inactive feature subsets across multiple generations.",
      },
      {
        step: "03",
        title: "Selection, Crossover & Mutation",
        tech: "Fitness Function (RMSE / R²)",
        desc: "Iteratively evolved chromosome populations using tournament selection, uniform crossover, and adaptive bit-flip mutation.",
      },
      {
        step: "04",
        title: "Optimized Model Output",
        tech: "Random Forest / Gradient Boost",
        desc: "Trained final regression models on optimal feature subset with reduced training time and minimized overfitting.",
      },
    ],
    highlights: [
      "Significant dimensionality reduction with zero accuracy degradation",
      "Evolutionary search avoiding local minima trap",
      "Tested and verified in Google Colab environment with visualization",
    ],
  },
];

const ArchitectureDeepDive = () => {
  const [activePipeline, setActivePipeline] = useState(pipelines[0]);
  const revealRef = useScrollReveal();

  return (
    <section
      id="architecture"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Floating Shapes */}
      <div
        className="floating-shape morph-blob"
        style={{
          width: 300,
          height: 300,
          top: "15%",
          left: "-6%",
          background: "var(--accent-main)",
          opacity: 0.05,
          animationDelay: "-2s",
        }}
      />
      <div
        className="floating-shape"
        style={{
          width: 220,
          height: 220,
          bottom: "10%",
          right: "-4%",
          background: "var(--accent-secondary)",
          opacity: 0.05,
          animationDelay: "-5s",
        }}
      />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 max-w-3xl">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            System Architecture
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Under the Hood: <br />
            <span className="gradient-text-animated">Data & AI Pipeline Deep-Dives.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
            Explore how I design and execute technical pipelines — from enterprise-grade database migration workflows to transformer fine-tuning and metaheuristic optimizations.
          </p>
        </div>

        {/* Pipeline Selector Tabs */}
        <div className="reveal mb-10 flex flex-wrap gap-3" data-delay="100">
          {pipelines.map((pipeline) => (
            <button
              key={pipeline.id}
              type="button"
              onClick={() => setActivePipeline(pipeline)}
              className={`clay-pill inline-flex items-center gap-3 px-5 py-3 text-sm font-bold transition-all duration-300 ${
                activePipeline.id === pipeline.id
                  ? "bg-[var(--accent-main)] text-white"
                  : "bg-[var(--bg-card)] text-[var(--text-soft)] hover:text-[var(--accent-main)]"
              }`}
              style={
                activePipeline.id === pipeline.id
                  ? {
                      boxShadow:
                        "4px 4px 10px rgba(140,160,185,0.35), -3px -3px 8px rgba(255,255,255,0.3), inset 1px 1px 3px rgba(255,255,255,0.25)",
                    }
                  : {}
              }
            >
              <span className="text-lg">{pipeline.icon}</span>
              <span>{pipeline.title.split("Pipeline")[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Pipeline Display Card */}
        <div className="reveal clay-card-static p-8 transition-colors duration-300 lg:p-10" data-delay="200">
          {/* Top Banner */}
          <div className="flex flex-col gap-4 border-b border-[var(--border-soft)] pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="clay-pill mb-2 inline-block bg-[var(--accent-soft)] px-3.5 py-1 text-xs font-bold text-[var(--accent-main)]">
                {activePipeline.badge}
              </span>
              <h3 className="text-2xl font-extrabold text-[var(--text-main)] md:text-3xl">
                {activePipeline.title}
              </h3>
              <p className="mt-1 font-medium text-[var(--accent-main)]">
                {activePipeline.subtitle}
              </p>
            </div>

            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {activePipeline.summary}
              </p>
            </div>
          </div>

          {/* Workflow Stage Steps Grid */}
          <div className="mt-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-main)]">
              Workflow Execution Stages
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {activePipeline.stages.map((stage, idx) => (
                <div
                  key={idx}
                  className="clay-card relative flex flex-col justify-between p-6 transition-all duration-300"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="clay-icon-box flex h-10 w-10 items-center justify-center bg-[var(--accent-soft)] text-sm font-extrabold text-[var(--accent-main)]">
                        {stage.step}
                      </span>
                      {idx < activePipeline.stages.length - 1 && (
                        <FiArrowRight className="hidden text-lg text-[var(--accent-main)] lg:block opacity-40" />
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-[var(--text-main)]">
                      {stage.title}
                    </h4>

                    <p className="mt-1 text-xs font-semibold text-[var(--accent-main)]">
                      {stage.tech}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables & Outcomes */}
          <div className="mt-10 rounded-2xl bg-[var(--bg-soft)] p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-soft)]">
              Key Engineering Highlights & Impact
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {activePipeline.highlights.map((highlight, index) => (
                <div key={index} className="clay-card-static flex items-center gap-3 bg-[var(--bg-card)] p-4">
                  <FiCheckCircle className="shrink-0 text-lg text-[var(--success-main)]" />
                  <p className="text-xs font-semibold text-[var(--text-main)]">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDeepDive;

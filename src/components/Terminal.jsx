import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import useScrollReveal from "../hooks/useScrollReveal";
import { FiTerminal, FiCornerDownLeft, FiZap, FiTrash2 } from "react-icons/fi";

const INITIAL_LOGS = [
  {
    type: "system",
    content: "Welcome to Bimo Ghanis' Interactive Portfolio CLI v2.4.0 (Fresh Graduate Edition)",
  },
  {
    type: "system",
    content: "Type 'help' to see available commands or click quick action buttons below.",
  },
];

const QUICK_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "sudo hire-me",
  "contact",
  "clear",
];

const Terminal = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#1e6bb8", "#2ba8a0", "#3d9be9", "#40c9b8", "#f59e0b"],
    });
  };

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add user command to log
    const newLogs = [...logs, { type: "user", content: `bimo@portfolio:~$ ${rawCmd}` }];
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
      case "commands":
        newLogs.push({
          type: "output",
          content: `Available Commands:
  • about         - View Bimo's summary, degree, and graduation status
  • skills        - Display core technologies across Data, ML, & Web
  • projects      - List featured projects and live case studies
  • architecture  - View enterprise ETL & ML data pipelines
  • contact       - Get direct contact info (Email, WA, LinkedIn)
  • sudo hire-me  - Execute recruiter fast-track offer (✨ Confetti!)
  • clear         - Clear the terminal console
  • exit / reboot - Reset terminal to initial state`,
        });
        break;

      case "about":
      case "bio":
        newLogs.push({
          type: "output",
          content: `👤 Bimo Ghanis Surya Putra Wibowo, S.Kom.
🎓 Bachelor of Computer Science in Informatics, Telkom University
🌟 Status: Yudisium Passed (Awaiting Graduation Ceremony)
💼 Focus: Data Engineering, Fullstack Web Development & Machine Learning
📍 Location: Depok / Bandung, Indonesia`,
        });
        break;

      case "skills":
        newLogs.push({
          type: "output",
          content: `🛠️ Technical Skill Matrix:
  [Data & DB]    : Python, SQL, PostgreSQL, Pentaho PDI (ETL), Pandas, DBeaver
  [Web Frontend] : React.js, Next.js, Vite, Tailwind CSS, TypeScript, JavaScript
  [Machine Learn]: PyTorch, DistilBERT, Hugging Face, Scikit-Learn, GenAI
  [Workflow]     : Git, GitHub, REST APIs, Figma UI/UX`,
        });
        break;

      case "projects":
        newLogs.push({
          type: "output",
          content: `🚀 Featured Projects:
  1. Service Operations Data Analysis (Python, Pandas, Seaborn)
  2. NLP Sentiment Analysis (DistilBERT, PyTorch, Hugging Face)
  3. House Price Prediction with Genetic Algorithm (Scikit-Learn, GA)
  4. Aldiora Clinic Website (React, Vite, Tailwind CSS)
  5. Telkom University National Campus - TUNC Data Migration (Pentaho, DBeaver)
  6. Leg5 Mobile App (Kotlin, Firebase, Android)`,
        });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          content: `📫 Reach out to Bimo:
  • Email    : bimoghanis@gmail.com
  • WhatsApp : +62 877-8137-9800
  • LinkedIn : linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217
  • GitHub   : github.com/bimoghanis`,
        });
        break;

      case "sudo hire-me":
      case "hire":
      case "hire-me":
        triggerConfetti();
        newLogs.push({
          type: "special",
          content: `🎉 [ACCESS GRANTED] You're making a fantastic decision!
Candidate: Bimo Ghanis, S.Kom. (Informatics Graduate)
Ready to deliver high-impact Data Engineering, Web Development, & ML solutions.
Let's talk immediately: bimoghanis@gmail.com or WhatsApp +62 877-8137-9800`,
        });
        break;

      case "clear":
      case "cls":
        setLogs([]);
        setInputVal("");
        return;

      case "reboot":
      case "exit":
        setLogs(INITIAL_LOGS);
        setInputVal("");
        return;

      case "date":
        newLogs.push({
          type: "output",
          content: `📅 Current Session: ${new Date().toLocaleString()}`,
        });
        break;

      default:
        newLogs.push({
          type: "error",
          content: `command not found: '${rawCmd}'. Type 'help' to see list of valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex] || "");
        }
      }
    }
  };

  const executeQuickCommand = (cmd) => {
    if (cmd === "clear") {
      setLogs([]);
    } else {
      handleCommand(cmd);
    }
    inputRef.current?.focus();
  };

  return (
    <section
      id="terminal"
      className="wave-divider relative overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--text-main)] transition-colors duration-300"
    >
      {/* Background shape */}
      <div
        className="floating-shape morph-blob"
        style={{
          width: 320,
          height: 320,
          top: "10%",
          right: "-5%",
          background: "var(--accent-main)",
          opacity: 0.06,
          animationDelay: "-3s",
        }}
      />

      <div ref={revealRef} className="container relative z-10 mx-auto px-6 pt-10 md:px-12 lg:px-24">
        {/* Header */}
        <div className="reveal mb-10 max-w-3xl">
          <p className="clay-pill mb-3 inline-block bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent-main)]">
            Developer CLI
          </p>

          <h2 className="text-3xl font-extrabold leading-tight text-[var(--text-main)] md:text-5xl">
            Interactive <span className="gradient-text-animated">Terminal Experience.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
            Explore my profile like an engineer. Type custom bash commands or click the shortcut buttons below to inspect skills, run queries, or execute the recruiter Easter egg!
          </p>
        </div>

        {/* Quick Command Buttons */}
        <div className="reveal mb-6 flex flex-wrap items-center gap-2" data-delay="100">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2 flex items-center gap-1.5">
            <FiZap className="text-[var(--accent-main)]" /> Quick Run:
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeQuickCommand(cmd)}
              className="clay-pill bg-[var(--bg-card)] px-3 py-1.5 text-xs font-mono font-bold text-[var(--text-soft)] transition-all duration-300 hover:bg-[var(--accent-main)] hover:text-white"
            >
              $ {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div
          className="reveal clay-card-static overflow-hidden border border-[var(--border-main)] font-mono text-sm shadow-2xl transition-colors duration-300"
          data-delay="200"
          style={{ background: "var(--bg-card)" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--bg-soft)] px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#27C93F] inline-block shadow-sm" />
              <span className="ml-3 hidden text-xs font-bold text-[var(--text-muted)] sm:inline-block">
                bimo@portfolio:~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLogs([]);
                }}
                className="clay-button inline-flex items-center gap-1 bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--danger-main)]"
                title="Clear console"
              >
                <FiTrash2 /> Clear
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="max-h-[380px] min-h-[260px] overflow-y-auto p-6 space-y-3">
            {logs.map((log, index) => {
              if (log.type === "user") {
                return (
                  <p key={index} className="font-bold text-[var(--accent-main)]">
                    {log.content}
                  </p>
                );
              }
              if (log.type === "special") {
                return (
                  <pre
                    key={index}
                    className="whitespace-pre-wrap rounded-xl bg-[var(--accent-soft)] p-4 font-bold text-[var(--success-main)] border border-[var(--success-main)]/30"
                  >
                    {log.content}
                  </pre>
                );
              }
              if (log.type === "error") {
                return (
                  <p key={index} className="text-[var(--danger-main)] font-semibold">
                    {log.content}
                  </p>
                );
              }
              return (
                <pre
                  key={index}
                  className="whitespace-pre-wrap leading-relaxed text-[var(--text-soft)]"
                >
                  {log.content}
                </pre>
              );
            })}

            {/* Input Line */}
            <div className="flex items-center gap-2 pt-2">
              <span className="font-bold text-[var(--success-main)]">
                bimo@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'help', 'sudo hire-me')..."
                className="flex-1 bg-transparent text-[var(--text-main)] outline-none placeholder:text-[var(--text-muted)] placeholder:text-xs"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleCommand(inputVal)}
                className="clay-icon-box flex h-7 w-7 items-center justify-center bg-[var(--accent-soft)] text-xs text-[var(--accent-main)] hover:bg-[var(--accent-main)] hover:text-white transition-colors"
                title="Execute"
              >
                <FiCornerDownLeft />
              </button>
            </div>

            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;

import { lazy, Suspense, useState } from "react";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificate from "./components/Certificate";
import Footer from "./components/Footer";
import "./components/studio/studio.css";

const Studio = lazy(() => import("./components/studio/Studio"));
const TechmonGacha = lazy(() => import("./components/TechmonGacha"));

function App() {
  useTheme();
  // The recruiter-facing portfolio is the default. The 3D studio remains available
  // through the switcher and via the explicit #studio URL.
  const [classic, setClassic] = useState(() => window.location.hash !== "#studio");
  const [recruiterMode, setRecruiterMode] = useState(true);
  if (!classic) {
    return (
      <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[var(--bg-main)] text-[var(--text-main)]">Opening the studio…</div>}>
        <Studio onClassic={() => {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
          setClassic(true);
        }} />
      </Suspense>
    );
  }
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased transition-colors duration-200">
      <Navbar recruiterMode={recruiterMode} onToggleRecruiter={() => setRecruiterMode((current) => !current)} />
      <main>
        <Hero recruiterMode={recruiterMode} />
        <Experience />
        <Projects />
        <About />
        <Certificate />
        {!recruiterMode && (
          <Suspense fallback={<div className="py-12 text-center text-sm text-[var(--text-muted)]">Opening the interactive lab…</div>}>
            <TechmonGacha />
          </Suspense>
        )}
      </main>
      <Footer />
      <button className="classic-studio-switch" onClick={() => {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#studio`);
        setClassic(false);
      }}>Enter 3D studio ↗</button>
    </div>
  );
}

export default App;

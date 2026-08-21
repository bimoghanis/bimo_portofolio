import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificate from "./components/Certificate";
import TechmonGacha from "./components/TechmonGacha";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased transition-colors duration-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificate />
        <TechmonGacha />
      </main>
      <Footer />
    </div>
  );
}

export default App;
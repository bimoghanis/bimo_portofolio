import { useState, useEffect } from "react";
import { FiMenu, FiX, FiDownload, FiSun, FiMoon, FiBriefcase } from "react-icons/fi";
import PropTypes from "prop-types";
import cvFile from "../assets/CV_Bimo Ghanis.pdf";

import useTheme from "../hooks/useTheme";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ recruiterMode, onToggleRecruiter }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { theme, toggleTheme } = useTheme();

  const cvPath = cvFile;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        aria-label="Primary navigation"
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "clay-nav border-b border-[var(--border-soft)] bg-[var(--nav-bg)] py-3"
            : "border-b border-transparent bg-[var(--nav-bg-soft)] py-5"
        }`}
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12 lg:px-24">
          {/* Brand - Logo only */}
          <a
            href="#home"
            className="group flex items-center"
            aria-label="Back to home"
          >
            <div className="clay-icon-box flex h-11 w-11 items-center justify-center bg-[var(--accent-soft)] transition-transform duration-300 group-hover:scale-105">
              <span className="text-base font-extrabold text-[var(--accent-main)]">
                BG
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm font-semibold text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent-main)]"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[var(--accent-main)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Right Action - Clean & minimal */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={onToggleRecruiter}
              aria-pressed={recruiterMode}
              className={`clay-button inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-colors duration-200 ${
                recruiterMode
                  ? "bg-[var(--accent-soft)] text-[var(--accent-main)]"
                  : "bg-[var(--bg-card)] text-[var(--text-soft)]"
              }`}
              style={{ borderRadius: "14px" }}
              title="Toggle recruiter-focused portfolio view"
            >
              <FiBriefcase />
              {recruiterMode ? "Recruiter View" : "Full Portfolio"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="clay-button flex h-10 w-10 items-center justify-center bg-[var(--bg-card)] text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent-main)]"
            >
              {theme === "dark" ? (
                <FiSun className="text-lg" />
              ) : (
                <FiMoon className="text-lg" />
              )}
            </button>

            <a
              href={cvPath}
              download="CV-Bimo-Ghanis.pdf"
              className="clay-button-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
              style={{ borderRadius: "14px" }}
            >
              <FiDownload />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="clay-button flex h-10 w-10 items-center justify-center bg-[var(--bg-card)] text-xl text-[var(--accent-main)] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden bg-[var(--nav-mobile-bg)] transition-all duration-500 ease-in-out lg:hidden ${
            menuOpen
              ? "mt-3 max-h-[480px] border-t border-[var(--border-soft)] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-6 py-5 md:px-12">
            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="clay-button bg-[var(--bg-card-soft)] px-4 py-2.5 font-semibold text-[var(--text-soft)] transition-all duration-300 hover:text-[var(--accent-main)]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-[var(--border-soft)] pt-4">
              <button
                type="button"
                onClick={() => {
                  onToggleRecruiter();
                  setMenuOpen(false);
                }}
                aria-pressed={recruiterMode}
                className="clay-button flex-1 inline-flex items-center justify-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 text-xs font-bold text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent-main)]"
              >
                <FiBriefcase />
                {recruiterMode ? "Recruiter" : "Full View"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="clay-button flex-1 inline-flex items-center justify-center gap-2 bg-[var(--bg-card)] px-4 py-2.5 font-bold text-xs text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent-main)]"
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              <a
                href={cvPath}
                download="CV-Bimo-Ghanis.pdf"
                className="clay-button-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold"
                style={{ borderRadius: "14px" }}
              >
                <FiDownload />
                Resume
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  recruiterMode: PropTypes.bool.isRequired,
  onToggleRecruiter: PropTypes.func.isRequired,
};

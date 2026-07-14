import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const cvPath =
    "https://drive.google.com/file/d/1EnHlzYVj56m8yxe0_H3X0zy5YzqItBZQ/view?usp=sharing";

  const githubPath = "https://github.com/bimoghanis";
  const linkedinPath =
    "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-[var(--border-main)] bg-[var(--nav-bg)] py-2 shadow-2xl shadow-[var(--shadow-main)]"
          : "border-transparent bg-[var(--nav-bg-soft)] py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12 lg:px-24">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--accent-main)]/30 bg-[var(--accent-soft)] shadow-lg shadow-[var(--shadow-accent)]">
            <span className="bg-[linear-gradient(135deg,var(--accent-main),var(--accent-secondary))] bg-clip-text text-lg font-extrabold text-transparent">
              BG
            </span>
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-extrabold tracking-wide text-[var(--text-main)]">
              Bimo Ghanis
            </h1>
            <p className="hidden text-xs font-medium text-[var(--text-muted)] sm:block">
              Portfolio
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-semibold text-[var(--text-soft)] transition-colors duration-300 hover:text-[var(--accent-main)]"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[linear-gradient(90deg,var(--accent-main),var(--accent-secondary))] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Right Action */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
          >
            {theme === "dark" ? (
              <FiSun className="text-xl" />
            ) : (
              <FiMoon className="text-xl" />
            )}
          </button>

          <a
            href={githubPath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
          >
            <FiGithub className="text-xl" />
          </a>

          <a
            href={linkedinPath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-soft)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]"
          >
            <FiLinkedin className="text-xl" />
          </a>

          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-main)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--shadow-accent)] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
          >
            <FiDownload />
            Download Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-2xl text-[var(--accent-main)] shadow-sm transition-all duration-300 hover:border-[var(--accent-main)] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-[var(--border-main)] bg-[var(--nav-mobile-bg)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "mt-4 max-h-[620px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-6 md:px-12">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-soft)] px-4 py-3 font-semibold text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-3 font-bold text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={githubPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-3 font-bold text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
            >
              <FiGithub />
              GitHub
            </a>

            <a
              href={linkedinPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-3 font-bold text-[var(--text-soft)] transition-all duration-300 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]"
            >
              <FiLinkedin />
              LinkedIn
            </a>
          </div>

          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-main)] px-5 py-3 font-bold text-white shadow-lg shadow-[var(--shadow-accent)] transition-all duration-300 hover:opacity-90"
          >
            <FiDownload />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
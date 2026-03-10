import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import iconLinkedin from "../assets/iconlinkedin.png";
import icongithub from "../assets/icongithub.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-slate-950 border-slate-800 shadow-lg text-slate-100 py-0" // Border muncul dengan warna slate-800
          : "bg-transparent border-transparent shadow-none text-slate-200 py-2" // Border tetap ada tapi transparan
      }`}>
      <div className="container mx-auto py-4 flex justify-between items-center px-6 md:px-16 lg:px-24">
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-3xl transition-all duration-300 text-teal-400"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Links di Desktop */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm uppercase tracking-wider font-semibold">
          {["About", "Experience", "Projects", "Certificates"].map(
            (item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="relative text-slate-300 hover:text-teal-400 transition-colors duration-300 group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ),
          )}
        </div>

        {/* Social Media Icons di Desktop */}
        <div className="hidden md:flex space-x-4">
          {[
            {
              href: "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217",
              src: iconLinkedin,
              alt: "LinkedIn",
            },
            {
              href: "https://github.com/bimoghanis",
              src: icongithub,
              alt: "GitHub",
            },
          ].map((icon, index) => (
            <a
              key={index}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-10 h-10 rounded-full border border-slate-600 p-1 transition-all duration-300 hover:scale-110 hover:border-teal-400 bg-slate-800"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 text-slate-200 py-6 shadow-xl">
          <div className="flex flex-col items-center space-y-6 text-lg font-medium">
            {["About", "Experience", "Projects", "Certificates"].map(
              (item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="hover:text-teal-400 transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ),
            )}

            <div className="flex space-x-6 pt-4 border-t border-slate-800 w-1/2 justify-center">
              {[
                {
                  href: "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217",
                  src: iconLinkedin,
                  alt: "LinkedIn",
                },
                {
                  href: "https://github.com/bimoghanis",
                  src: icongithub,
                  alt: "GitHub",
                },
              ].map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-10 h-10 rounded-full border border-slate-600 p-1 hover:scale-110 hover:border-teal-400 bg-slate-800"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

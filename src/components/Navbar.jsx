import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Ikon menu dan close
import iconLinkedin from '../assets/iconlinkedin.png';
import icongithub from '../assets/icongithub.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md 
      ${scrolled 
        ? 'bg-white/20 backdrop-blur-lg text-black' 
        : 'bg-gradient-to-r from-[#1a0128] to-[#0a0211] text-white'}`}>

      <div className="container mx-auto py-4 flex justify-between items-center px-6 md:px-16 lg:px-24">

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-3xl transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Links di Desktop */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-semibold">
          {["About", "Experience", "Projects"].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className={`relative transition-all duration-300
                ${scrolled ? 'text-black hover:text-[#A020F0]' : 'text-white hover:text-[#A020F0]'}`}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A020F0] transition-all duration-300 hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Social Media Icons di Desktop */}
        <div className="hidden md:flex space-x-4">
          {[{ href: "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217", src: iconLinkedin, alt: "LinkedIn" },
            { href: "https://github.com/bimoghanis", src: icongithub, alt: "GitHub" }].map((icon, index) => (
            <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
              <img
                src={icon.src}
                alt={icon.alt}
                className={`w-11 h-11 rounded-full border-2 p-1 transition-all duration-300 hover:scale-110
                  ${scrolled ? 'border-black hover:border-[#A020F0]' : 'border-[#A020F0] hover:border-white'}`}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a0128] text-white py-4 shadow-lg">
          <div className="flex flex-col items-center space-y-6 text-lg font-semibold">
            {["About", "Experience", "Projects"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-[#A020F0] transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            {/* Social Media Icons di Mobile */}
            <div className="flex space-x-6 pt-4">
              {[{ href: "https://www.linkedin.com/in/bimo-ghanis-surya-putra-wibowo-967667217", src: iconLinkedin, alt: "LinkedIn" },
                { href: "https://github.com/bimoghanis", src: icongithub, alt: "GitHub" }].map((icon, index) => (
                <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-10 h-10 rounded-full border-2 p-1 transition-all duration-300 hover:scale-110 border-[#A020F0] hover:border-white"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

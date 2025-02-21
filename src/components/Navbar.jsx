import { useState, useEffect } from 'react';
import iconLinkedin from '../assets/iconlinkedin.png';
import icongithub from '../assets/icongithub.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md 
      ${scrolled 
        ? 'bg-white/20 backdrop-blur-lg text-black' 
        : 'bg-gradient-to-r from-[#1a0128] to-[#0a0211] text-white'}`}>

      <div className="container mx-auto py-4 flex justify-between items-center px-8 md:px-16 lg:px-24">
        
        
        <div className="flex-1 flex justify-center md:justify-start space-x-8 text-lg font-semibold">
          {["Home", "About Me", "Experience", "Projects"].map((item, index) => (
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
    </nav>
  );
}

export default Navbar;

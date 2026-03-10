import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 space-y-8 md:space-y-0">
          <div className="text-center md:text-left md:w-1/3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              Bimo Ghanis
            </h3>
            <p className="text-slate-400 mt-2 font-medium">
              Front-End Web Developer <br className="hidden md:block" /> & Data
              Engineer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2 text-sm text-slate-400">
            <p className="flex items-center hover:text-teal-400 transition-colors cursor-default">
              <span className="mr-2">📍</span> Bandung, Jawa Barat
            </p>
            <a
              href="mailto:bimoghanis@gmail.com"
              className="flex items-center hover:text-teal-400 transition-colors">
              <span className="mr-2">📧</span> bimoghanis@gmail.com
            </a>
            <a
              href="https://wa.me/6287781379800"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-teal-400 transition-colors">
              <span className="mr-2">📞</span> +62 877-8137-9800
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800/50 my-6"></div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Bimo Ghanis Surya Putra Wibowo.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

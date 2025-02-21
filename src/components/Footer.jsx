import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Bagian Atas Footer */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
          {/* Info Profil */}
          <div className="text-center md:text-left md:w-1/3">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Bimo's Portfolio
            </h3>
            <p className="text-gray-400 mt-2 leading-relaxed">
              Front-end Web Developer | Data Engineer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-3 mt-6 md:mt-0">
            <p className="text-gray-400">📍 Bandung, Jawa Barat</p>
            <p className="text-gray-400">📧 bimoghanis@gmail.com</p>
            <p className="text-gray-400">📞 +62 877-8137-9800</p>
          </div>
        </div>

        
        <div className="border-t border-gray-700 opacity-50 my-6"></div>

        
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bimo's Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

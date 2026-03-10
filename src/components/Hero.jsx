import React from "react";
import Fotodiri from "../assets/fotodiri2.jpg"; // Pastikan ektensinya sesuai dengan filemu ya

const Hero = () => {
  const cvPath =
    "https://drive.google.com/file/d/1EnHlzYVj56m8yxe0_H3X0zy5YzqItBZQ/view?usp=sharing";

  return (
    // Mengubah padding horizontal (px) agar konten lebih ke tengah pada layar besar
    <div className="min-h-screen py-32 px-8 md:px-28 lg:px-60 flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center md:space-x-16">
        <div className="md:w-2/3 text-center md:text-left mt-10 md:mt-0">
          <p className="text-teal-400 font-semibold tracking-wide text-lg mb-2">
            Hello, Welcome to my portfolio
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-sm">
            I'm Bimo Ghanis <br /> Surya Putra Wibowo
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mt-4">
            Front-End Web Developer | Data Engineer
          </h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
            I specialize in building beautiful, responsive web applications and
            optimizing data pipelines to handle massive datasets. I enjoy
            blending seamless user experiences with powerful data
            transformations to create impactful digital solutions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start sm:space-x-6 space-y-4 sm:space-y-0">
            <a
              href="https://wa.me/6287781379800"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-3.5 text-lg rounded-full font-bold shadow-lg shadow-teal-500/30 transition-all duration-300 hover:-translate-y-1 text-center">
              Contact Me
            </a>

            <a
              href={cvPath}
              download="Bimo_Ghanis_CV.pdf"
              className="bg-transparent border-2 border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 px-8 py-3.5 text-lg rounded-full font-bold transition-all duration-300 hover:-translate-y-1 text-center">
              Download Resume
            </a>
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center md:justify-end">
          <div className="w-64 h-80 md:w-80 md:h-[26rem] border-4 border-slate-700 hover:border-teal-400 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-teal-500/20 relative group">
            {/* Overlay sedikit teal saat hover tetap dipertahankan untuk estetika */}
            <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src={Fotodiri}
              alt="Bimo Ghanis"
              // Menghapus class grayscale agar gambar berwarna
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

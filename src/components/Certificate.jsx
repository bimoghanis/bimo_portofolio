import { useState } from "react";
import Dibimbingdata from "../assets/dibimbing.png";
import Dicodingpython from "../assets/dicodingpython.png";
import Dicodingsql from "../assets/dicodingsql.png";
import Dicodingdatascience from "../assets/dicodingdatascience.png";
import Dicodingdasarai from "../assets/dicodingdasarai.png";
import Hsk11Image from "../assets/hsk11.png";
import Hsk12Image from "../assets/hsk12.png";
import Hsk13Image from "../assets/hsk13.png";
import Hsk14Image from "../assets/hsk14.png";
import MyskillImage from "../assets/basicdata.png";

const certificates = [
  {
    title: "Data Science & Data Analysis Specialization",
    organizer: "MySkill",
    date: "July 2025", // Silakan sesuaikan dengan bulan & tahun di sertifikatmu
    image: MyskillImage, // Screenshot sertifikat "BASIC DATA" yang paling kiri atas
    link: "https://drive.google.com/drive/folders/1M65gfTOgRRHrrj6FeNNlnJ2cNa9kesD2?usp=sharing", // Link menuju folder yang berisi 11+ PDF tadi
  },
  {
    title: "Chinese Proficiency 1.4 (HSK 2)",
    organizer: "One Third Consulting & Abroad (OTCA)",
    date: "July 2025",
    image: Hsk14Image,
    link: "https://drive.google.com/file/d/16b_6gtUvXZYa0sGcVCbvhhOoL3UnDqRQ/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.3 (HSK 1)",
    organizer: "One Third Consulting & Abroad (OTCA)",
    date: "March 2025",
    image: Hsk13Image,
    link: "https://drive.google.com/file/d/14UOHKcxRq2TZgL7l_inlM0KH04m5tLcO/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.2 (HSK 1)",
    organizer: "One Third Consulting & Abroad (OTCA)",
    date: "March 2025",
    image: Hsk12Image,
    link: "https://drive.google.com/file/d/1Ytz3rKK94pLq-tYr2xTrNUY-uxqkdW1H/view?usp=sharing",
  },
  {
    title: "Chinese Proficiency 1.1 (HSK 1)",
    organizer: "One Third Consulting & Abroad (OTCA)",
    date: "January 2025",
    image: Hsk11Image,
    link: "https://drive.google.com/file/d/13aOwqAj8wZspkjTuhtswZUh0Uqck8l8A/view?usp=drive_link",
  },
  {
    title: "Data Series Fair 17.0 - Data Engineering",
    organizer: "Dibimbing",
    date: "February 2025",
    image: Dibimbingdata,
    link: "https://drive.google.com/file/d/1oWxOL_vAWmWACn9QrEzkttbtgeJkevot/view?usp=sharing",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    organizer: "Dicoding",
    date: "December 2024",
    image: Dicodingpython,
    link: "https://drive.google.com/file/d/1wi6T4eQYjs_ytRkRAHszugdBpYe-bWQe/view?usp=sharing",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    organizer: "Dicoding",
    date: "December 2024",
    image: Dicodingsql,
    link: "https://drive.google.com/file/d/1FS_JZumkT2EOVoAvv7tJgmVSYQi9yaP9/view?usp=sharing",
  },
  {
    title: "Belajar Dasar Data Science",
    organizer: "Dicoding",
    date: "December 2024",
    image: Dicodingdatascience,
    link: "https://drive.google.com/file/d/1W5OOdoVEAKYZ4G8usTV5yoNl9Vw45e4U/view?usp=sharing",
  },
  {
    title: "Belajar Dasar AI",
    organizer: "Dicoding",
    date: "December 2024",
    image: Dicodingdasarai,
    link: "https://drive.google.com/file/d/1RhIqry-cPFrDqchr5_GUBisjuhntm1HJ/view?usp=sharing",
  },
];

const Certificate = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="certificates" className="py-20 bg-slate-900 text-slate-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-12">
          Licenses & Certifications
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-teal-500 flex flex-col group">
              <div
                className="w-full h-48 bg-slate-700 cursor-pointer overflow-hidden relative"
                onClick={() => setSelectedImage(cert.image)}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="bg-slate-900/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Click to view
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-100 leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-400">{cert.organizer}</p>
                <p className="text-sm text-teal-400 font-medium mt-1 mb-4">
                  {cert.date}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-700/50 text-center">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-teal-400 text-sm font-semibold transition duration-300 inline-flex items-center">
                    Verify Credential <span className="ml-1">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60] opacity-100 transition-opacity"
          onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full rounded-xl shadow-2xl transform scale-100 transition-transform">
            <img
              src={selectedImage}
              alt="Certificate Full View"
              className="w-full rounded-xl border border-slate-700 shadow-2xl"
            />
            <button
              className="absolute -top-4 -right-4 bg-slate-800 text-slate-200 border border-slate-600 hover:border-teal-400 hover:text-teal-400 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;

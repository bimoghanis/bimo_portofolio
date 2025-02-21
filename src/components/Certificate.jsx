import { useState } from "react";
import Dibimbingdata from "../assets/dibimbing.png";
import Dicodingpython from "../assets/dicodingpython.png";
import Dicodingsql from "../assets/dicodingsql.png";
import Dicodingdatascience from "../assets/dicodingdatascience.png";
import Dicodingdasarai from "../assets/dicodingdasarai.png";

const certificates = [
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
  {
    title: "More Certificates Coming Soon!",
    organizer: "Stay Tuned",
    date: "",
    image: null,
    link: "#",
  },
];

const Certificate = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="certificates" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 mb-12">
          My Certificates
        </h2>

        {/* Grid Certificates */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-purple-500 duration-300 border border-gray-800 hover:border-purple-500">
              {/* Certificate Image */}
              {cert.image ? (
                <div
                  className="w-full h-52 flex items-center justify-center bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedImage(cert.image)}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover rounded-t-2xl transition-opacity duration-300 hover:opacity-80"
                  />
                </div>
              ) : (
                <div className="w-full h-52 flex items-center justify-center bg-gray-800 text-gray-400 text-lg font-semibold">
                  {cert.title === "More Certificates Coming Soon!" ? "Coming Soon..." : "Upload Certificate"}
                </div>
              )}
              {/* Certificate Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{cert.organizer}</p>
                <p className="text-sm text-purple-400 italic">{cert.date}</p>
                {/* Certificate Link */}
                {cert.link !== "#" && (
                  <div className="mt-4">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-500 font-medium transition duration-300">
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Full Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl border border-purple-500 rounded-lg shadow-xl">
            <img
              src={selectedImage}
              alt="Certificate"
              className="w-full rounded-lg shadow-lg"
            />
            <button
              className="absolute top-3 right-3 bg-purple-700 text-white px-3 py-1 rounded-full text-lg hover:bg-purple-500 transition duration-300"
              onClick={() => setSelectedImage(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;

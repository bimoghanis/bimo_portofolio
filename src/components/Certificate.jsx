import { useState } from "react";
import Dibimbingdata from "../assets/dibimbing.png";
import Dicodingpython from "../assets/dicodingpython.png";

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
    title: "Cloud Computing Fundamentals",
    organizer: "Google Cloud",
    date: "June 2023",
    image: "/images/certificate3.jpg",
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
              {cert.image && (
                <div
                  className="w-full h-52 flex items-center justify-center bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedImage(cert.image)}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover rounded-t-2xl transition-opacity duration-300 hover:opacity-80"
                  />
                </div>
              )}
              {/* Certificate Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{cert.organizer}</p>
                <p className="text-sm text-purple-400 italic">{cert.date}</p>
                {/* Certificate Link */}
                <div className="mt-4">
                  {cert.link !== "#" ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-500 font-medium transition duration-300">
                      View Certificate
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">
                      No Link Available
                    </span>
                  )}
                </div>
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

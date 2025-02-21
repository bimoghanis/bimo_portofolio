import "react";
import Logotunc from "../assets/tunc.png";
import Webpemilihankel from "../assets/webpemilihankelompok.png";

const projects = [
  {
    title: "Sistem Pemilihan Kelompok",
    description: (
      <>
        <p className="text-sm text-gray-300 italic">December 2024</p>
        <p className="mt-2">
          A web-based application using Next.js to assist in group member selection with combination and permutation algorithms.
        </p>
      </>
    ),
    image: Webpemilihankel,
    github: "https://github.com/bimoghanis/tubes_aka.git",
    demo: "#",
  },
  {
    title: "Telkom University National Campus (TUNC)",
    description: (
      <>
        <p className="text-sm text-gray-300 italic">July 2023 - September 2024</p>
        <p className="mt-2">
          Led data migration for Telkom University branch campuses in Surabaya, 
          Purwokerto, and Bandung as part of the TUNC project.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
          <li>Analyzed database structures of branch campuses.</li>
          <li>Designed data flow documentation for campus databases.</li>
          <li>Utilized DBeaver and Pentaho for seamless data migration.</li>
        </ul>
      </>
    ),
    image: Logotunc,
    demo: "#",
  },
  {
    title: "E-Library Management System",
    description:
      "A web-based library management platform with book search, borrowing, and collection management features.",
    image: "",
    github: "https://github.com/bimoghanis/e-library",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 mb-12">
          My Projects
        </h2>

        {/* Grid Project */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-purple-500 duration-300 border border-gray-800 hover:border-purple-500"
            >
              {/* Gambar Project */}
              {project.image && (
                <div className="w-full h-56 flex items-center justify-center bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-t-2xl transition-opacity duration-300 hover:opacity-80"
                  />
                </div>
              )}
              {/* Konten Project */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <div className="text-gray-400 mt-2 text-sm leading-relaxed">
                  {project.description}
                </div>
                {/* Link GitHub & Demo */}
                <div className="mt-4 flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-500 font-medium transition duration-300"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 font-medium transition duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

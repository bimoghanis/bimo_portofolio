import React from "react";

const experiences = [
  {
    title: "Freelance Data Management",
    company: "Direktorat PuTI Telkom University",
    duration: "July 2024 - September 2024",
    location: "Bandung, Jawa Barat",
  },
  {
    title: "Internship - Data Management Division",
    company: "Direktorat PuTI Telkom University",
    duration: "July 2023 - July 2024",
    location: "Bandung, Jawa Barat",
  },
  {
    title: "Practicum Assistant",
    company: "Faculty of Applied Science, Telkom University",
    duration: "2022 - 2024",
    location: "Bandung, Jawa Barat",
  },
];

const Experience = () => {
  return (
    <div className="bg-gradient-to-b from-[#16012E] to-[#0A0211] text-white py-20" id="experience">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text 
        bg-gradient-to-r from-[#A020F0] to-[#FF00FF] drop-shadow-lg">
          Professional Experience
        </h2>

        {/* Experience List */}
        <div className="space-y-8 max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="bg-white/10 p-6 rounded-lg shadow-lg border-l-4 border-[#A020F0] hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-[#A020F0]">{exp.title}</h3>
              <p className="text-gray-300">{exp.company}</p>
              <p className="text-gray-400">{exp.duration} | {exp.location}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Experience;

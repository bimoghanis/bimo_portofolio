import "react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#16012E] to-[#0A0211] text-white py-20" id="about">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text 
        bg-gradient-to-r from-[#A020F0] to-[#FF00FF] animate-gradient drop-shadow-lg">
          About Me
        </h2>
        
        <div className="flex flex-col items-center space-y-12">
          
          {/* Background Description */}
          <div className="max-w-3xl bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-xl border border-white/20 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <p className="text-lg leading-relaxed text-justify">
              I am an Informatics student at Telkom University, currently pursuing a bachelor's degree in the field.  
              Passionate about mobile application development, web development, and data engineering, I strive to expand my knowledge and skills in the tech industry.  
              <br /><br />
              My experience includes working with Laravel for web development, Android Studio for mobile applications, and Pentaho PDI for data migration.  
              Additionally, I have completed an internship in the Data Management division, where I handled data migration using Pentaho PDI and DBeaver.
            </p>
          </div>

          {/* Skills List */}
          <div className="w-full max-w-3xl">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#A020F0] to-[#FF00FF] mb-6">
              Skills & Technologies
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-200">
              {[
                "Laravel – Web Development",
                "Android Studio | Firebase | Kotlin – Mobile App Development",
                "Pentaho PDI – Data Integration & ETL",
                "PostgreSQL & DBeaver – Database Management",
                "React & Next.js – Frontend Development",
              ].map((skill, index) => (
                <li key={index} className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg shadow-md 
                transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education Section */}
          <div className="w-full max-w-3xl">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#A020F0] to-[#FF00FF] mb-6">
              Education
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "Telkom University",
                  degree: "Bachelor's Degree in Informatics",
                  duration: "2024 - Present | Bandung, West Java",
                  color: "from-[#A020F0] to-[#FF00FF]",
                },
                {
                  title: "Telkom University",
                  degree: "Diploma in Software Engineering",
                  duration: "2021 - 2024 | Bandung, West Java",
                  gpa: "GPA: 3.87/4.00 | Cum Laude",
                  color: "from-[#FF00FF] to-[#A020F0]",
                },
              ].map((edu, index) => (
                <div key={index} className={`bg-white/10 p-6 rounded-lg shadow-lg border-l-4 border-white/30 
                transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <h4 className={`font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r ${edu.color}`}>
                    {edu.title}
                  </h4>
                  <p className="text-gray-300">{edu.degree}</p>
                  <p className="text-gray-400">{edu.duration}</p>
                  {edu.gpa && <p className="text-gray-400">{edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Stats */}
          <div className="mt-12 flex justify-center space-x-10 text-center w-full max-w-3xl">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg shadow-lg transition-all duration-300 
              hover:scale-110 hover:shadow-xl">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-[#A020F0] to-[#FF00FF]">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;

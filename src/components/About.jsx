import React from "react";

const About = () => {
  return (
    <div className="bg-slate-900 text-slate-200 py-20" id="about">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Title */}
        <h2
          className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text 
        bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-md tracking-tight">
          About Me
        </h2>

        <div className="flex flex-col items-center space-y-16">
          {/* Deskripsi Profile */}
          <div
            className="max-w-3xl bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/50 
          transition-all duration-300 hover:shadow-2xl hover:border-teal-500/30">
            <p className="text-lg leading-relaxed text-slate-300 text-justify">
              I am an Informatics student at Telkom University, currently
              pursuing a bachelor's degree in the field. Passionate about mobile
              application development, web development, and data engineering, I
              strive to expand my knowledge and skills in the tech industry.
              <br />
              <br />
              My experience includes working with Laravel for web development,
              Android Studio for mobile applications, and Pentaho PDI for data
              migration. Additionally, I have completed an internship in the
              Data Management division, where I handled data migration using
              Pentaho PDI and DBeaver.
            </p>
          </div>

          {/* Skills & Technologies - Diubah menjadi bentuk Badges/Tags */}
          <div className="w-full max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <span className="w-8 h-1 bg-teal-500 mr-4 rounded-full"></span>
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Python | PyTorch | NLP – AI & Machine Learning",
                "Pandas | Matplotlib | Seaborn – Data Analysis",
                "React | Vite | Tailwind CSS – Frontend Development",
                "Pentaho PDI | PostgreSQL | ETL – Data Engineering",
                "Next.js | Laravel – Web Development",
                "Android Studio | Kotlin | Firebase – Mobile Apps",
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-full text-sm font-medium text-teal-300 shadow-sm
                transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:border-teal-400 hover:text-teal-200 cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="w-full max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
              <span className="w-8 h-1 bg-blue-500 mr-4 rounded-full"></span>
              Education
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "Telkom University",
                  degree: "Bachelor's Degree in Informatics",
                  duration: "2024 - Present | Bandung, West Java",
                  color: "from-teal-400 to-blue-500",
                },
                {
                  title: "Telkom University",
                  degree: "Diploma in Software Engineering",
                  duration: "2021 - 2024 | Bandung, West Java",
                  gpa: "GPA: 3.87/4.00 | Cum Laude",
                  color: "from-blue-400 to-teal-500",
                },
              ].map((edu, index) => (
                <div
                  key={index}
                  className="bg-slate-800/40 p-6 rounded-xl shadow-md border-l-4 border-teal-500 
                transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/60 hover:shadow-xl">
                  <h4
                    className={`font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r ${edu.color}`}>
                    {edu.title}
                  </h4>
                  <p className="text-slate-200 font-medium mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">{edu.duration}</p>
                  {edu.gpa && (
                    <p className="text-teal-400 text-sm font-semibold mt-2">
                      {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 flex justify-center space-x-6 md:space-x-12 text-center w-full max-w-3xl">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50 min-w-[160px]
              transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-900/20">
                <h3
                  className="text-4xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-br from-teal-400 to-blue-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

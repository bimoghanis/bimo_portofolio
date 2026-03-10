import React from "react";

const experiences = [
  {
    title: "Freelance Data Management",
    company: "Direktorat PuTI Telkom University",
    duration: "July 2024 - September 2024",
    location: "Bandung, West Java",
    description: [
      "Handled the data migration of Telkom University Surabaya branch campus, Telkom University Purwokerto and Telkom University Bandung Campus in Telkom University National Campus (TUNC) project.",
      "Analysed the database structure of Telkom University branch campuses.",
      "Create data flow from the branch campus database.",
      "Operate tools for data migration such as DBeaver, and Pentaho.",
    ],
  },
  {
    title: "Data Management Division Internship",
    company: "Direktorat PuTI Telkom University",
    duration: "July 2023 - July 2024",
    location: "Bandung, West Java",
    description: [
      "Handled the data migration of Telkom University Surabaya campus in Telkom University National Campus (TUNC) project.",
      "Analysed the database structure of Telkom University branch campuses.",
      "Creating data flow from the branch campus database.",
      "Operate tools for data migration such as DBeaver, and Pentaho.",
    ],
  },
  {
    title: "Course Practicum Assistant",
    company: "Faculty of Applied Sciences, Telkom University",
    duration: "2022 - 2024",
    location: "Bandung, West Java",
    description: [
      "Assist lecturers in compiling and presenting relevant materials to support learning.",
      "Manage exams, assignments, and projects relevant to the course, and provide assessment and feedback to students.",
      "Assist for website programming, database system, network structure installation, and object-based programming courses.",
    ],
  },
];

const Experience = () => {
  return (
    <div className="bg-slate-900 text-slate-200 py-20" id="experience">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2
          className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text 
        bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-md">
          Professional Experience
        </h2>

        <div className="space-y-6 max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-blue-500 before:to-slate-900">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 group-hover:bg-teal-400 group-hover:border-teal-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10"></div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 gap-2">
                  <h3 className="text-xl font-bold text-slate-100">
                    {exp.title}
                  </h3>
                  <span className="text-teal-400 text-sm font-medium bg-teal-400/10 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-blue-400 font-medium mb-1">{exp.company}</p>

                <p className="text-slate-400 text-sm flex items-center mb-4">
                  <span className="mr-2">📍</span> {exp.location}
                </p>

                {/* Bagian Deskripsi / Bullet Points */}
                <ul className="list-disc list-outside ml-4 space-y-2 text-slate-300 text-sm leading-relaxed border-t border-slate-700/50 pt-4 mt-auto">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="pl-1 marker:text-teal-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;

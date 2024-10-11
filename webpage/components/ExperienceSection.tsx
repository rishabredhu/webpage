import React, { useState } from "react";
import {
  FaUserSecret,
  FaLaptopCode,
  FaRobot,
  FaMicrochip,
  FaUniversity,
  FaUser,
  FaLightbulb,
  FaBook,
  FaGlobe,
  FaLeaf,
} from "react-icons/fa";

export default function ExperienceSection() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const experiences = [
    {
      title: "Lead Engineer",
      company: "Stealth Startup (Pre-Seed)",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-31"),
      description:
        "Developing scalable APIs and optimizing server-side performance to handle dynamic content generation based on AI models. Working on data pipelines for AI training, enabling efficient data collection, preprocessing, and model deployment.",
      icon: "FaUserSecret",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Software Engineer Fellow",
      company: "HeadStarter AI",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-09-31"),
      description:
        "Implemented projects integrating OpenAI API and Gemini API with Firebase backend and Next.js frontend.",
      icon: "FaLaptopCode",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "AI Engineer Intern",
      company: "Radical AI",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-10-31"),
      description:
        "Optimized data collection and ELT processes with GCP Dataflow, reducing processing time by 45% and increasing throughput. Integrated AI features using React, Next.js, TypeScript, and LangChain, improving API response times and user engagement.",
      icon: "FaRobot",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Software Engineer Intern",
      company: "Intel Corporation",
      startDate: new Date("2023-01-21"),
      endDate: new Date("2023-05-31"),
      description:
        "Engineered a high-throughput data pipeline for real-time iGPU performance analysis. Developed an interactive analytical dashboard for rapid visualization of key performance metrics.",
      icon: "FaMicrochip",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research Assistant",
      company: "NYU",
      startDate: new Date("2022-06-01"),
      endDate: new Date("2022-12-31"),
      description:
        "Developed scalable ETL pipelines and optimized data storage solutions on AWS. Created interactive dashboards and automated data pipelines for sentiment analysis and topic modeling.",
      icon: "FaUniversity",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Data Analyst",
      company: "Maa Shaarda",
      startDate: new Date("2021-03-01"),
      endDate: new Date("2021-05-31"),
      description:
        "Engaged in NGO work aimed to provide free education to underprivileged children.",
      icon: "FaUser",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research to Startup Conversion",
      company: "VIT Vellore",
      startDate: new Date("2020-04-01"),
      endDate: new Date("2020-12-31"),
      description:
        "Developed a product based on published research, gaining 15 active users in 3 months. Conducted market research, refined the MVP through user testing. Pitched to investors but pivoted after identifying product-market misalignment, establishing thought leadership with a research publication in IEEE Conference.",
      icon: "FaLightbulb",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research Work",
      company: "VIT Vellore",
      startDate: new Date("2019-06-01"),
      endDate: new Date("2020-03-31"),
      description:
        "Published a research paper and presented it at a conference. Published multiple other review papers in international Scopus indexed journals.",
      icon: "FaBook",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Web Developer",
      company: "Astegic",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2018-08-31"),
      description: "Developed a website for a client.",
      icon: "FaGlobe",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Founder",
      company: "Clean India Green India - NGO Effort",
      startDate: new Date("2016-06-01"),
      endDate: new Date("2016-08-31"),
      description: "Built a student community surrounding Clean India Drive.",
      icon: "FaLeaf",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const visibleExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 5);

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
      <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden text-center">
            <span className="relative z-10 glitch" data-text="Experience">
              Experience
            </span>
          </h2>
        <div className="space-y-8">
          {visibleExperiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center">
                {exp.icon && <div className="mr-2">{React.createElement(require("react-icons/fa")[exp.icon])}</div>}
                <h3 className="text-xl font-semibold">{exp.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {exp.company && `${exp.company} | `}
                {exp.startDate.toLocaleString('default', { month: 'short', year: 'numeric' })} - {exp.endDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="bg-purple-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
          >
            <span className="text-xs pixelated">
              {showAllExperiences ? "Show Less" : "Show All Experiences"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

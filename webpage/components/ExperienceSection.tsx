import React, { useState } from 'react';
import { FaUserSecret, FaLaptopCode, FaRobot, FaMicrochip, FaUniversity } from 'react-icons/fa';

export default function ExperienceSection() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const experiences = [
    {
      title: "Lead Engineer",
      company: "Stealth Startup",
      period: "Fall 2024",
      description: "Developing scalable APIs and optimizing server-side performance to handle dynamic content generation based on AI models. Working on data pipelines for AI training, enabling efficient data collection, preprocessing, and model deployment.",
      icon: <FaUserSecret />,
    },
    {
      title: "Software Engineer Fellow",
      company: "HeadStarter AI",
      period: "Summer 2024",
      description: "Implemented projects integrating OpenAI API and Gemini API with Firebase backend and Next.js frontend.",
      icon: <FaLaptopCode />,
    },
    {
      title: "AI Engineer Intern",
      company: "Radical AI",
      period: "Spring 2024",
      description: "Optimized data collection and ELT processes with GCP Dataflow, reducing processing time by 45% and increasing throughput. Integrated AI features using React, Next.js, TypeScript, and LangChain, improving API response times and user engagement.",
      icon: <FaRobot />,
    },
    {
      title: "Software Engineer Intern",
      company: "Intel Corporation",
      period: "Spring 2023",
      description: "Engineered a high-throughput data pipeline for real-time iGPU performance analysis. Developed an interactive analytical dashboard for rapid visualization of key performance metrics.",
      icon: <FaMicrochip />,
    },
    {
      title: "Research Assistant",
      company: "NYU",
      period: "Summer + Fall 2022",
      description: "Developed scalable ETL pipelines and optimized data storage solutions on AWS. Created interactive dashboards and automated data pipelines for sentiment analysis and topic modeling.",
      icon: <FaUniversity />,
    },
    {
      title: "Data Analyst",
      company: "Maa Shaarda ",
      period: "Spring 2021",
      description: "Engaged in NGO work aimed to provide free education to underprivileged children.",
      icon: null,
    },
    {
      title: "Research to Startup Conversion",
      company: "VIT Vellore",
      period: "Summer + Fall2020",
      description: "Developed a product based on published research, gaining 15 active users in 3 months. Conducted market research, refined the MVP through user testing. Pitched to investors but pivoted after identifying product-market misalignment, establishing thought leadership with a research publication in IEEE Conference.",
      icon: null,
    },
    {
      title: "Research Work",
      company: "VIT Vellore",
      period: "Summer 2019",
      description: "Published a research paper and presented it at a conference. Published mutliple other review papers in international Scopus indexed journals.",
      icon: null,
    },
   
    {
      title: "Web Developer",
      company: "Astegic",
      period: "Summer 2018",
      description: "Developed a website for a client.",
      icon: null,
    },
    {
      title: "Founder",
      company: "Clean India Green India - NGO Effort",
      period: "Summer 2016",
      description: "Built a studetn community surrounding Clean India Drive.",
      icon: null,
    },
  ];

  const visibleExperiences = showAllExperiences ? experiences : experiences.slice(0, 5);

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          {visibleExperiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center">
                {exp.icon && <div className="mr-2">{exp.icon}</div>}
                <h3 className="text-xl font-semibold">{exp.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {exp.company && `${exp.company} | `}{exp.period}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
          >
            <span className="text-xs pixelated">
              {showAllExperiences ? 'Show Less' : 'Show All Experiences'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ExperienceSection() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const experiences: Experience[] = [
    {
      title: "Lead Engineer",
      company: "Stealth Startup (Pre-Seed)",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2025-03-15"), // Current date
      description:
        "Developing scalable APIs and optimizing server-side performance to handle dynamic content generation based on AI models. Working on data pipelines for AI training, enabling efficient data collection, preprocessing, and model deployment.",
      image: "/images/stealth.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Software Engineer Fellow",
      company: "HeadStarter AI",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-09-31"),
      description:
        "Implemented projects integrating OpenAI API and Gemini API with Firebase backend and Next.js frontend.",
      image: "/images/headstarter.jpeg",
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
      image: "/images/radical.jpeg",
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
      image: "/images/intel.webp",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research Assistant",
      company: "Center of Urban Science and Progress, NYU",
      startDate: new Date("2022-06-01"),
      endDate: new Date("2022-12-31"),
      description:
        "Developed scalable ETL pipelines and optimized data storage solutions on AWS. Created interactive dashboards and automated data pipelines for sentiment analysis and topic modeling.",
      image: "/images/nyu.png",
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
      image: "/images/data-analyst.png",
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
      image: "/images/research-to-startup.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research Work",
      company: "VIT Vellore",
      startDate: new Date("2019-06-01"),
      endDate: new Date("2020-03-31"),
      description:
        "Published a research paper and presented it at 2020 IEEE Conference of Emerging Technologies. Published multiple other review papers in international Scopus indexed journals.",
      image: "/images/research-work.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Web Developer",
      company: "Astegic",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2018-08-31"),
      description: "Developed a website for a client.",
      image: "/images/web-developer.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Founder",
      company: "Clean India Green India - NGO Effort",
      startDate: new Date("2016-06-01"),
      endDate: new Date("2016-08-31"),
      description: "Built a student community surrounding Clean India Drive.",
      image: "/images/founder.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const visibleExperiences = showAllExperiences
    ? experiences
    : experiences.slice(0, 5);

  return (
    <section id="experience" className="py-16 bg-white text-black font-[Courier_New]">
      <div className="container mx-auto px-4">
        <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden text-center mb-8 break-reconstruct">
          Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleExperiences.map((exp, index) => (
            <Card key={index} className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="p-4 relative">
                <CardTitle className="text-lg flex items-center">
                  {exp.image && <img src={exp.image} alt={exp.title} className="mr-2 w-8 h-8" />}
                  {exp.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {exp.company && `${exp.company} | `}
                  {exp.startDate.toLocaleString('default', { month: 'short', year: 'numeric' })} - {exp.endDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
                </p>
                <p className="text-sm">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="bg-purple-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-2 border-black font-['Press_Start_2P'] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
          >
            <span className="text-xs pixelated">
              {showAllExperiences ? "Show Less" : "CTRL + H"}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

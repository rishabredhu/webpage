"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { connectToDatabase } from "@/lib/mongodbClient";

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  technologies: { name: string; description: string }[];
  github_url: string | null;
  research_url: string | null;
  team_size: string;
  highlight: string | null;
  detailed_interview_description: string;
  detailed_story_description: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  github_url,
  research_url,
  team_size,
  highlight,
  detailed_interview_description,
  detailed_story_description,
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <Card className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="p-0"></CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-['Press_Start_2P'] text-lg mb-2">
          {title}
        </CardTitle>
        <p className="font-['Courier_New'] text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="inline-block px-2 py-1 text-xs bg-black text-white relative"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {tech.name}
              {hoveredTech === tech.name && (
                <span className="absolute top-full left-1/2 transform -translate-x-1 mt-1 px-2 py-1 bg-purple-200 text-black text-xs border-2 border-black z-10 font-['Press_Start_2P']">
                  {tech.description}
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="font-['Courier_New'] text-sm mb-4">{highlight}</p>
        <p className="font-['Courier_New'] text-sm mb-4">
          Team Size: {team_size}
        </p>
        <div className="flex justify-between w-full mt-auto">
          <Button
            variant="outline"
            size="md"
            className="text-xs border-2 border-black hover:bg-black hover:text-white transition-colors"
            asChild
          >
            <a href={github_url ?? '#'} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Github
            </a>
          </Button>
          {research_url && (
            <Button
              variant="outline"
              size="md"
              className="text-xs border-2 border-black hover:bg-black hover:text-white transition-colors"
              asChild
            >
              <a href={research_url ?? '#'} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Research
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/storage');
      if (!response.ok) {
        throw new Error('Failed to fetch projects from Storage');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <section className="bg-white-200 py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-50 bg-transparent mb-6">
          <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden">
            <span className="relative z-10 glitch" data-text="My Projects">
              PROJECT DASHBOARD
            </span>
          </h2>
        </div>
        {error && (
          <div
            className="bg-red-200 border-4 border-red-500 text-red-700 px-4 py-3 mb-6"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

interface ProjectProps {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url: string
  demo_url: string
  image_url: string
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  github_url,
  demo_url,  // Add this
}) => {
  return (
    <Card className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="p-0">
       
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-['Press_Start_2P'] text-lg mb-2">{title}</CardTitle>
        <p className="font-['Courier_New'] text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="inline-block px-2 py-1 text-xs  bg-black text-white">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between w-full mt-auto">
          <Button
            variant="outline"
            size="md"
            className="text-xs border-2 border-black hover:bg-black hover:text-white transition-colors"
            asChild
          >
            <a href={github_url} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Github Link
            </a>
          </Button>
         
        </div>
      </CardContent>
    </Card>
  )
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, technologies, github_url")

      if (error) {
        setError(error.message)
      } else {
        setProjects(data as ProjectProps[])
      }
    }

    fetchProjects()
  }, [])

  return (
    <section className="bg-white-200 py-20 ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-50 bg-transparent mb-6">
          <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden">
            <span className="relative z-10 glitch" data-text="My Projects">My Projects</span>
          </h2>
        </div>
        {error && (
          <div className="bg-red-200 border-4 border-red-500 text-red-700 px-4 py-3 mb-6" role="alert">
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
  )
}

export default ProjectsSection
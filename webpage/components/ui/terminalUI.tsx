"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

// Define the structure for skills and projects
type Skill = {
  name: string
  level: string
  projects: string[]
}

type Project = {
  name: string
  description: string
  technologies: string[]
}

// Sample data
const skills: Skill[] = [
  { name: 'React', level: 'Expert', projects: ['Portfolio Website', 'E-commerce Platform'] },
  { name: 'TensorFlow', level: 'Intermediate', projects: ['Image Classification Model', 'Natural Language Processing Tool'] },
  { name: 'Python', level: 'Expert', projects: ['Data Analysis Pipeline', 'Web Scraping Tool'] },
]

const projects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'A responsive personal portfolio showcasing my projects and skills.',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Image Classification Model',
    description: 'An AI model that classifies images into predefined categories.',
    technologies: ['TensorFlow', 'Python', 'Keras'],
  },
]

// Custom hook for handling commands
const useTerminal = () => {
  const [output, setOutput] = useState<string[]>(['Welcome! Type "help" for a list of commands.'])

  const executeCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ')

    switch (cmd) {
      case 'help':
        return [
          'Available commands:',
          '  skills --list : List all skills',
          '  skills <skill name> : Show details for a specific skill',
          '  projects --list : List all projects',
          '  projects <project name> : Show details for a specific project',
          '  clear : Clear the terminal',
        ]
      case 'skills':
        if (args[0] === '--list') {
          return ['Skills:', ...skills.map(skill => `  ${skill.name}`)]
        } else if (args[0]) {
          const skill = skills.find(s => s.name.toLowerCase() === args[0])
          return skill
            ? [`Skill: ${skill.name}`, `Level: ${skill.level}`, 'Projects:', ...skill.projects.map(p => `  ${p}`)]
            : [`Skill "${args[0]}" not found.`]
        }
        return ['Usage: skills --list or skills <skill name>']
      case 'projects':
        if (args[0] === '--list') {
          return ['Projects:', ...projects.map(project => `  ${project.name}`)]
        } else if (args[0]) {
          const project = projects.find(p => p.name.toLowerCase().includes(args.join(' ')))
          return project
            ? [
                `Project: ${project.name}`,
                `Description: ${project.description}`,
                'Technologies:',
                ...project.technologies.map(t => `  ${t}`),
              ]
            : [`Project "${args.join(' ')}" not found.`]
        }
        return ['Usage: projects --list or projects <project name>']
      case 'clear':
        setOutput([])
        return []
      default:
        return [`Command not found: ${cmd}. Type "help" for a list of commands.`]
    }
  }

  const runCommand = (command: string) => {
    setOutput(prev => [...prev, `$ ${command}`, ...executeCommand(command)])
  }

  return { output, runCommand }
}

export default function SkillsSection() {
  const [input, setInput] = useState('')
  const { output, runCommand } = useTerminal()
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      runCommand(input.trim())
      setInput('')
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <div className="flex items-center">
            <TerminalIcon className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-white font-semibold">Terminal</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm text-green-500 bg-black"
        >
          {output.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 bg-gray-800">
          <span className="text-green-500 mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent text-white font-mono text-sm focus:outline-none"
            placeholder="Type a command..."
          />
        </form>
      </div>
    </div>
  )
}
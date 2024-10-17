'use client'

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutSection from "../components/AboutSection"
import ProjectsSection from "../components/ProjectSection"
import SkillsSection from "../components/SkillsSection"
import ExperienceSection from "../components/ExperienceSection"
import TestimonialsSection from "../components/TestimonialsSection"
import LiquidBorder from "@/components/ui/LiquidBorder"
import Cube from "@/components/ui/3D-UI/cube"

const DynamicBackground = dynamic(() => import("@/components/ui/DynamicBackground"), { ssr: false })
const AnimatedBackground = dynamic(() => import("@/components/Background"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            },
          }
        )
      }
    })
  }, [])

  return (
    <div className="relative">
      <AnimatedBackground />
      <LiquidBorder />
      {[AboutSection, ExperienceSection, ProjectsSection, SkillsSection, TestimonialsSection].map((Section, index) => (
        <div key={index} ref={(el) => { sectionRefs.current[index] = el }} className="relative">
          <Section />
        </div>
      ))}
      <Cube />
    </div>
  )
}
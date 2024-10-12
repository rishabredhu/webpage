"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Chatbot from "../components/ui/retro-chatbot";
import { Canvas } from "@react-three/fiber";
import KinectPointCloud from "@/components/ui/KineticPointCloud";
import LiquidBorder from "@/components/ui/LiquidBorder";
import Faces2 from "@/components/ui/face";
const DynamicBackground = dynamic(() => import("@/components/ui/DynamicBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        );
      }
    });
  }, []);

  return (
    <>
      {/* <DynamicBackground /> */}
      
      <Faces2 />
      
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row mb-16 space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2 hidden md:block">
            <div className="border-8 border-black p-4 bg-black shadow-[5px_5px_0px_0px_rgba(149,1,255,0.8)]">
              <Canvas style={{ width: "100%", height: "600px" }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                {/* <KinectPointCloud /> */}

              </Canvas>
            </div>
          </div>
          <div className="md:w-1/2" ref={(el) => { sectionRefs.current[0] = el; }}>
            <AboutSection />
          </div>
        </div>
      </section>

      <LiquidBorder />
     
      <Chatbot />

      {[ExperienceSection, ProjectsSection, SkillsSection, TestimonialsSection].map((Section, index) => (
        <div key={index} ref={(el) => { sectionRefs.current[index + 1] = el; }}>
          <Section />
        </div>
      ))}
    </>
  );
}
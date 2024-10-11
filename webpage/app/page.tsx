"use client";
import dynamic from "next/dynamic";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import BlogSection from "../components/BlogSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Chatbot from "../components/ui/retro-chatbot";
import { Canvas } from "@react-three/fiber";
import KinectPointCloud from "@/components/ui/KineticPointCloud";
import InstancedTriangles from "@/components/ui/InstancedTriangles";
import LiquidBorder from "@/components/ui/LiquidBorder";
export default function HomePage() {
  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row mb-16 space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2 hidden md:block">
            <div className="border-8 border-black p-4 bg-black shadow-[16px_16px_0px_0px_rgba(140, 20, 252, 1)]">
              <Canvas style={{ width: "100%", height: "600px" }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <KinectPointCloud />
                {/* <InstancedTriangles /> */}
              </Canvas>
            </div>
          </div>
          <div className="md:w-1/2">
            <AboutSection />
          </div>
        </div>
      </section>
      <LiquidBorder />
     
      <Chatbot />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      
      {/* <BlogSection /> */}
      <TestimonialsSection />
      
    </>
  );
}

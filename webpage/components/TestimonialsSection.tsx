"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaQuoteLeft } from "react-icons/fa";
import { Building2, GraduationCap, Briefcase } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import FloatingGLB from "@/components/ui/3dHome";
import KinectPointCloud from "@/components/ui/KineticPointCloud"; // Add this import statement

interface Testimonial {
  name: string;
  feedback: string;
  position: string;
  company: string;
  photoUrl?: string;
  school?: string;
  linkedinUrl?: string;
  country: string;
}

export default function RetroTestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Vishwa Shah",
      feedback:
        "Working with Rishab since our undergrad days has been a wild ride. Between coding marathons, last-minute hackathon chaos, and our shared love for memes, we’ve pulled off some epic projects. If you're looking for someone who can write clean code while also cracking the best one-liners, Rishab is your guy!",
      position: "Product Manager",
      company: "Autodesk",
      school: "Cornell University",
      photoUrl: "/images/vishwa.png",
      linkedinUrl: "https://www.linkedin.com/in/vishwa-h-shah",
      country: "United States",
    },
    {
      name: "Yash Bhojwani",
      feedback:
        "Rishab and I published three research papers in one year—let that sink in. His perseverance is something even Marvel heroes would envy. Every time we hit a roadblock, Rishab found a way to break through it with his 'never say die' attitude. Future research partners, buckle up—you’re in for a ride!",
      position: "Data Scientist",
      company: "Nucleix",
      school: "Northeastern University",
      photoUrl: "/images/yash.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/yashbhojwani/",
      country: "United States",
    },
    {
      name: "Rachana DeReddy",
      feedback:
        "Between setting up sensor networks and crunching data, Rishab somehow managed to make data engineering fun (yes, fun!). Our project involved so much debugging that by the end, we were practically speaking in code. Rishab has an uncanny ability to turn complex problems into smooth solutions—and make you laugh in the process.",
      position: "AI/ML Engineer",
      company: "Apple",
      school: "Columbia University",
      photoUrl: "/images/rachana.png",
      linkedinUrl: "https://www.linkedin.com/in/rachana-dereddy/",
      country: "United States",
    },
    {
      name: "Eashan Kaushik",
      feedback:
        "Balancing NYU coursework, internships, personal projects, and research? Easy, if you’re Rishab. His time management skills are next-level—he once finished a paper, a full project, and aced finals all in the same week. If you need someone who can juggle it all and still make it to brunch on time, look no further.",
      position: "Solution Architect",
      company: "Amazon",
      school: "New York University",
      photoUrl: "/images/eashan.webp",
      linkedinUrl: "https://www.linkedin.com/in/eashan-kaushik",
      country: "United States",
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [displayedFeedback, setDisplayedFeedback] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % testimonials.length,
      );
    }, 12000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const feedback = testimonials[currentTestimonialIndex].feedback;
    setDisplayedFeedback(feedback);
  }, [currentTestimonialIndex, testimonials]);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="py-20 bg-white text-white font-mono rounded-lg">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .retro-text {
          font-family: "Press Start 2P", cursive;
          color: white;
        }

        .retro-button {
          background: white;
          color: #000;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          position: relative;
          cursor: pointer;
          transition: all 0.1s ease;
          box-shadow: 4px 4px 0px #000000;
        }

        .retro-button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #000000;
          bg: purple;
        }

        .retro-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000000;
          color: white;
        }

        .retro-card {
          background: #000000;
          box-shadow: 8px 8px 0px orange;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center retro-text"
        >
          &lt;Testimonials&gt;
        </motion.h2>
        <div className="flex justify-center items-start space-x-8">
          <Card className="retro-card rounded-none overflow-hidden w-full max-w-2xl">
            <CardContent className="p-8">
              <div className="bg-black p-2">
                <FaQuoteLeft className="text-white text-4xl mb-6" />
                <motion.p
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-white-500 mb-6 text-sm retro-text leading-relaxed"
                >
                  {displayedFeedback}
                </motion.p>
              </div>
              <div className="flex items-center mb-4 bg-black p-2">
                <Avatar className="w-14 h-14 mr-4 rounded-none">
                  {currentTestimonial.photoUrl ? (
                    <AvatarImage
                      src={currentTestimonial.photoUrl}
                      alt={currentTestimonial.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-white text-black retro-text">
                      {currentTestimonial.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold retro-text text-md">
                    {currentTestimonial.name}
                  </h3>

                  <h3 className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 retro-text-white" />
                    <span>{currentTestimonial.position}</span>
                  </h3>
                  <h3 className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 retro-text-white" />
                    <span>{currentTestimonial.company}</span>
                  </h3>
                  {currentTestimonial.school && (
                    <h3 className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 retro-text-white" />
                      <span>{currentTestimonial.school}</span>
                    </h3>
                  )}
                  {currentTestimonial.linkedinUrl && (
                    <h3 className="flex items-center">
                      <FiLinkedin className="w-4 h-4 mr-2 retro-text-white" />
                      <a
                        href={currentTestimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Linkedin
                      </a>
                    </h3>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  className="retro-button retro-text text-xs"
                  onClick={() =>
                    setCurrentTestimonialIndex(
                      (prevIndex) =>
                        (prevIndex - 1 + testimonials.length) %
                        testimonials.length,
                    )
                  }
                >
                  Previous
                </button>
                <button
                  className="retro-button retro-text text-xs"
                  onClick={() =>
                    setCurrentTestimonialIndex(
                      (prevIndex) => (prevIndex + 1) % testimonials.length,
                    )
                  }
                >
                  Next
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaQuoteLeft } from "react-icons/fa";
import { Building2, GraduationCap, Briefcase } from "lucide-react";

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
        "Rishab's entrepreneurial spirit is truly inspiring. His dedication to research and his innovative approach in our startup endeavors have been pivotal in driving our projects forward. He's not only a brilliant engineer but also a visionary leader.",
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
        "Collaborating with Rishab on our research projects has been a remarkable experience. His analytical skills and problem-solving abilities greatly contributed to the success of our work. Rishab is a reliable and insightful research partner.",
      position: "Data Scientist",
      company: "Nucleix",
      school: "NorthEastern University",
      photoUrl: "/images/yash.png",
      linkedinUrl: "https://www.linkedin.com/in/yashbhojwani/",
      country: "United States",
    },
    {
      name: "Rachana DeReddy",
      feedback:
        "Working alongside Rishab on our research initiatives has been highly productive. His technical expertise and collaborative nature make him an exceptional research partner. Rishab consistently brings innovative ideas to the table.",
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
        "Rishab has been an invaluable partner across multiple projects. His versatility and commitment ensure that every project we undertake is executed flawlessly. Whether it's a small task or a large initiative, Rishab always delivers exceptional results.",
      position: "Solution Architect",
      company: "Amazon",
      school: "New York University",
      photoUrl: "/images/eashan.webp",
      linkedinUrl: "https://www.linkedin.com/in/eashan-kaushik",
      country: "United States",
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="py-20 bg-[#e6e6fa] text-[#9370DB] font-mono">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .retro-text {
          font-family: 'Press Start 2P', cursive;
        }
        
        .retro-button {
          background: #9370DB;
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
        }
        
        .retro-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000000;
        }

        .retro-card {
          background: #D8BFD8;
          box-shadow: 8px 8px 0px #000000;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center retro-text"
        >
          &lt;What Others Say&gt;
        </motion.h2>
        <div className="flex justify-center">
          <Card className="retro-card rounded-none overflow-hidden w-full max-w-2xl">
            <CardContent className="p-8">
              <FaQuoteLeft className="text-[#9370DB] text-4xl mb-6" />
              <motion.p 
                key={currentTestimonialIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[#9370DB] mb-6 text-sm retro-text leading-relaxed"
              >
                {currentTestimonial.feedback}
              </motion.p>
              <div className="flex items-center mb-4">
                <Avatar className="w-14 h-14 mr-4 rounded-none">
                  {currentTestimonial.photoUrl ? (
                    <AvatarImage
                      src={currentTestimonial.photoUrl}
                      alt={currentTestimonial.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-[#9370DB] text-black retro-text">
                      {currentTestimonial.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#9370DB] retro-text text-sm">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-xs text-[#9370DB] retro-text mt-1">
                    {currentTestimonial.country}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#9370DB] retro-text">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-[#9370DB]" />
                  <span>{currentTestimonial.position}</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-[#9370DB]" />
                  <span>{currentTestimonial.company}</span>
                </div>
                {currentTestimonial.school && (
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-[#9370DB]" />
                    <span>{currentTestimonial.school}</span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button 
                  className="retro-button retro-text text-xs"
                  onClick={() => setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
                >
                  Previous
                </button>
                <button 
                  className="retro-button retro-text text-xs"
                  onClick={() => setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
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
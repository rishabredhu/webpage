"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FaQuoteLeft } from "react-icons/fa"
import { Building2, GraduationCap, Briefcase } from "lucide-react"

interface Testimonial {
  name: string
  feedback: string
  position: string
  company: string
  photoUrl?: string
  school?: string
  linkedinUrl?: string
  country: string
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Yash Bhojwani",
      feedback:
        "Rishab is a fantastic developer with a keen eye for detail. His ability to transform complex ideas into elegant, user-friendly solutions is truly impressive.",
      position: "Data Scientist",
      company: "Nucleix",
      school: "NorthEastern University",
      photoUrl: "/images/yash.jpg",
      linkedinUrl: "https://www.linkedin.com/in/yashbhojwani/",
      country: "United States",
    },
    
    {
      name: "Vishwa Shah",
      feedback:
        "Rishab is a fantastic developer with a keen eye for detail. His ability to transform complex ideas into elegant, user-friendly solutions is truly impressive.",
      position: "Product Manager",
      company: "Autodesk",
      school: "Cornell University",
      photoUrl: "/images/vishwa.webp",
      linkedinUrl: "https://www.linkedin.com/in/vishwa-h-shah",
      country: "United States",
    },
    {
      name: "Eashan Kaushik",
      feedback:
        "Working with Rishab was a pleasure. His technical expertise, combined with excellent communication skills, made our project a success. Highly recommend!",
      position: "Solution Architect",
      company: "Amazon",
      photoUrl: "/images/eashan.webp",
      school: "New York University",
      linkedinUrl: "https://www.linkedin.com/in/eashan-kaushik",
      country: "United States",
    },
    {
      name: "Rachana DeReddy",
      feedback:
        "Working with Rishab was a pleasure. His technical expertise, combined with excellent communication skills, made our project a success. Highly recommend!",
      position: "AI/ML Engineer",
      school: "Columbia University",
      company: "Apple",
      photoUrl: "/images/rachana.png",
      linkedinUrl: "https://www.linkedin.com/in/rachana-dereddy/",
      country: "United States",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-gray-800"
        >
          What Others Say
        </motion.h2>
        <Carousel className="w-full max-w-7xl mx-auto">
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white shadow-lg rounded-2xl overflow-hidden h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <FaQuoteLeft className="text-gray-300 text-4xl mb-4" />
                      <p className="text-gray-600 mb-6 flex-grow">{testimonial.feedback}</p>
                      <div className="flex items-center mb-4">
                        <Avatar className="w-14 h-14 mr-4">
                          {testimonial.photoUrl ? (
                            <AvatarImage src={testimonial.photoUrl} alt={testimonial.name} />
                          ) : (
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">{testimonial.country}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{testimonial.position}</span>
                        </div>
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{testimonial.company}</span>
                        </div>
                        {testimonial.school && (
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{testimonial.school}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  )
}

export default TestimonialsSection
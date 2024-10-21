// Start of Selection
// components/AboutSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Ensure lucide-react is installed
import Link from "next/link"; // For better client-side routing
import ReactTypingEffect from "react-typing-effect"; // Ensure you have this import
import { Linkedin, Mail, FileText, Github } from "lucide-react";

const AboutSection: React.FC = () => {
  const links = [
    {
      href: "https://www.linkedin.com/in/rishabredhuu/",
      icon: Linkedin,
      text: "LinkedIn",
      color: "blue",
    },
    {
      href: "mailto:rishabredhu@gmail.com",
      icon: Mail,
      text: "Email",
      color: "orange",
    },
    {
      href: "https://www.dropbox.com/scl/fo/iko96pxudlvp8c29fpo05/AGjXfqX7G-2tcEueUdDYxo0?rlkey=n2235n22qjttam8kzzcpo7k16&st=wbmdi2nt&dl=0",
      icon: FileText,
      text: "Resume",
      color: "orange",
    },
  ];

  // Recent Activity State
  const activities = [
    "AI Meetup @ Microsoft SF Office  [This week]",
    "Exploring 3D-Gaussian Splatting/AI  [This month]",
    "Participated in the AGI House Meetup in San Francisco  [Last month]",
    "Engaged in the AI Agent Hack event in NYC  [Summer 2024]",
    "Networked at the Tech Networking Mixer in San Francisco  [Summer 2024]",
    "Joined the Generative AI Bay Area Meetup in Sunnyvale  [Fall 2024]",
    "Learning Calisthenics  [SOON]",
  ];
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // New state to control animation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000); // Change activity every 3 seconds

    return () => clearInterval(interval);
  }, [activities.length]);

  const interestsText = [
    "I am passionate about — development, design, and sports.",
    "Early on, I realized I'm a visual thinker, which naturally led me to creativity and CS became a means to bring ideas to life.",
    "I'm particularly strong in spatial reasoning, allowing me to see how different pieces fit together.",
    "This helps me simplify complex problems—whether I'm  designing systems, coding algorithms, or working with neural networks.",
  ];

  return (
    <section
      className="bg-white py-10 relative px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-section-title"
    >
      {/* Glitch Effect Styles */}

      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: none;
          }
          20% {
            transform: skew(-0.5deg);
          }
          40% {
            transform: skew(0.5deg);
          }
          60% {
            transform: skew(-0.5deg);
          }
          80% {
            transform: skew(0.5deg);
          }
          100% {
            transform: none;
          }
        }

        @keyframes glitch-anim {
          0% {
            clip: rect(42px, 9999px, 44px, 0);
            transform: translate(0);
          }
          10% {
            clip: rect(12px, 9999px, 56px, 0);
            transform: translate(-5px, -5px);
          }
          20% {
            clip: rect(85px, 9999px, 140px, 0);
            transform: translate(-5px, 5px);
          }
          30% {
            clip: rect(10px, 9999px, 80px, 0);
            transform: translate(5px, 5px);
          }
          40% {
            clip: rect(42px, 9999px, 44px, 0);
            transform: translate(0);
          }
          100% {
            clip: rect(42px, 9999px, 44px, 0);
            transform: translate(0);
          }
        }

        .glitch {
          position: relative;
          color: black;
          animation: glitch 1s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          overflow: hidden;
        }

        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }

        /* Bouncing Arrow Animation */
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(10px);
          }
          60% {
            transform: translateY(5px);
          }
        }

        .bouncing-arrow {
          animation: bounce 2s infinite;
          color: black;
        }

        /* Activity Transition */
        .activity-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        .activity-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.5s ease-in-out,
            transform 0.5s ease-in-out;
        }
        .activity-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .activity-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition:
            opacity 0.5s ease-in-out,
            transform 0.5s ease-in-out;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header with Glitch Effect */}
        <header className="flex items-center  mb-8">
          <h2
            className="text-5xl font-['Press_Start_2P'] text-black glitch"
            data-text="Hi, it's Rishab here!"
          >
            Hi, it's Rishab here!
          </h2>
        </header>

        {/* Main Content Blocks */}
        <main className="space-y-6">
          {/* Introduction Block */}
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <p className="text-sm leading-relaxed font-['Press_Start_2P']">
              <strong>Master of Science's in Computer Science with a specialization in AI</strong> from{" "}
              <strong>
                <span className="text-violet-500">New York University</span>
              </strong>{" "}
              and over 6 years of experience in Software Engineering, Data
              Engineering, and AI, I specialize in building high-throughput data
              pipelines, web apps, and ML systems that drive impact. I blend
              technical expertise with creative problem-solving to deliver
              products that make a real difference. 
            </p>
          </div>

          {/* Personal Interests Block */}
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="h-28">
              {" "}
              {/* Fixed height to maintain structure */}
              <ReactTypingEffect
                text={interestsText}
                speed={50}
                eraseSpeed={1}
                eraseDelay={10}
                typingDelay={1}
                className="text-sm leading-relaxed font-['Press_Start_2P'] text-justify"
                cursorRenderer={(cursor) => (
                  <span className="text-red-500">{cursor}</span>
                )}
                displayTextRenderer={(text, i) => {
                  return (
                    <p className="text-justify">
                      {text.split(" ").map((word, i) => {
                        const key = `${i}`;
                        if (
                          word === "development," ||
                          word === "design," ||
                          word === "sports."
                        ) {
                          return (
                            <strong key={key} className="text-red-500">
                              {word}{" "}
                            </strong>
                          );
                        }
                        return <span key={key}>{word} </span>;
                      })}
                    </p>
                  );
                }}
              />
            </div>
          </div>

          {/* Hobbies and Contact Block */}
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <p className="text-sm leading-relaxed font-['Press_Start_2P'] text-">
              When I'm not coding, you'll find me tuning into the{" "}
              <a
                href="https://www.morningbrew.com/daily"
                className="text-red-500 hover:underline"
              >
                [Morning Brew Podcast]
              </a>
              , listening to some{" "}
              <a
                href="https://en.wikipedia.org/wiki/House_music"
                className="text-orange-500 hover:underline"
              >
                [House music]
              </a>
              , or exploring the city with my dog,{" "}
              <span className="text-brown-500">Mylo</span>, in search for some
              good Coffee. Currently, I'm channeling my passion into building a
              startup and am always keen to connect with like-minded
              individuals. Feel free to{" "}
              <a
                href="mailto:your.email@example.com"
                className="text-blue-500 hover:underline"
              >
                [reach out]
              </a>{" "}
              if you'd like to collaborate or just chat about innovative ideas!
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity Section */}
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-['Press_Start_2P'] mb-4 text-center">
                Recent Activity
              </h3>
              <div className="relative h-[150px] overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center  transition-opacity duration-500 font-['Press_Start_2P'] text-center bg-purple-200 p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  {activities[currentActivity]}
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <a
                  // Start of Selection
                  href="https://calendly.com/your-scheduling-link" // Replace with your actual scheduling link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] font-['Press_Start_2P'] text-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:bg-purple-200 transition duration-300"
                >
                  Click to Book a Call
                </a>
              </div>
            </div>

            {/* Portfolio Links Section */}
            <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-lg">
              <h3 className="text-3xl font-['Press_Start_2P'] mb-6 text-center">
                Connect With Me
              </h3>
              <div className="flex flex-col space-y-4">
                {[
                  ...links,
                  {
                    href: "https://github.com/rishabredhu",
                    icon: Github,
                    text: "GitHub",
                    color: "purple",
                  },
                ].map((link, index) => {
                  const colors = ["blue", "green", "red", "purple"];
                  const color = colors[index % colors.length];
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={` flex items-center  space-x-3 py-3 px-2 text-${color}-600 rounded-md transition-all duration-300 hover:bg-${color}-200 hover:shadow-md font-['Press_Start_2P'] text-sm`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.text}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AboutSection;

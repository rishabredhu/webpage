// components/AboutSection.tsx
'use client';
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Ensure lucide-react is installed
import Link from "next/link"; // For better client-side routing
import ReactTypingEffect from 'react-typing-effect'; // Ensure you have this import




const AboutSection: React.FC = () => {
  // Recent Activity State
  const activities = [
    
    "Attended an intensive workshop on advanced React techniques",
    "Learning how to make Music with AI",
    "Participated in the AGI Hack House Meetup in San Francisco",
    "Engaged in the AI Agent Hack event in NYC",
    "Networked at the Tech Networking Mixer in San Francisco",
    "Joined the Generative AI Bay Area Meetup in Sunnyvale",
    "Pitched at the Startup Pitch Night in Palo Alto",
  ];
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000); // Change activity every 3 seconds

    return () => clearInterval(interval);
  }, [activities.length]);

  const interestsText = [
    "I am passionate about — development, design, and sports.",
    "Early on, I realized I'm a visual thinker, which naturally led me to CS as a means to bring ideas to life.",
    "I'm particularly strong in spatial reasoning, allowing me to see how different pieces fit together.",
    "This helps me simplify complex problems—whether I'm coding algorithms, working with neural networks, or designing systems."
  ];

  return (
    <section
      className="bg-white py-10 relative px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-section-title">
        
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
          0%, 20%, 50%, 80%, 100% {
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
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .activity-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .activity-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header with Glitch Effect */}
        <header className="flex items-center justify-center mb-8">
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
              With a <strong>MS CS with specialization in AI</strong> from{" "}
              <strong>
                <span className="text-violet-500">New York University</span>
              </strong>{" "}
              and over 6 years of experience in Software Engineering, Data Engineering, and AI, I specialize in building high-throughput data pipelines, web apps, and ML systems that drive impact. I blend technical expertise with creative problem-solving to deliver products that make a real difference. :)
            </p>
          </div>

          
            {/* Personal Interests Block */}
            {/* <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <p className="text-sm leading-relaxed font-['Press_Start_2P']">
                I am passionate about — <strong><span className="text-red-500">development</span></strong>, <strong><span className="text-red-500">design</span></strong>, and <strong><span className="text-red-500">sports</span></strong>. Early on, I realized I'm a visual thinker, which naturally led me to CS as a means to  bring ideas to life. I'm particularly strong in spatial reasoning, allowing me to see how different pieces fit together. This helps me simplify complex problems—whether I'm coding algorithms, working with neural networks, or designing systems.
              </p>
            </div> */}
             <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <ReactTypingEffect
        text={interestsText}
        speed={50}
        eraseSpeed={1}
        eraseDelay={10}
        typingDelay={1}
        className="text-sm leading-relaxed font-['Press_Start_2P']"
        cursorRenderer={cursor => <span className="text-red-500">{cursor}</span>}
        displayTextRenderer={(text, i) => {
          return (
            <p>
              {text.split('').map((char, i) => {
                const key = `${i}`;
                if (char === 'development' || char === 'design' || char === 'sports') {
                  return <strong key={key} className="text-red-500">{char}</strong>;
                }
                return <span key={key}>{char}</span>;
              })}
            </p>
          );
        }}
      />
    </div>
          

          
          {/* Hobbies and Contact Block */}
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <p className="text-sm leading-relaxed font-['Press_Start_2P']">
              When I'm not coding, you'll find me tuning into the{" "}
              <a
                href="https://www.morningbrew.com/daily"
                className="text-blue-500 hover:underline"
              >
                Morning Brew Podcast
              </a>
              , listening to some{" "}
              <a
                href="https://en.wikipedia.org/wiki/House_music"
                className="text-orange-500 hover:underline"
              >
                House music
              </a>
              , or exploring the city with my dog,{" "}
              <span className="text-brown-500">Mylo Singh</span>, in search of good Coffee. Currently, I'm channeling my passion into building a startup and am always keen to connect with like-minded individuals. Feel free to{" "}
              <a
                href="mailto:your.email@example.com"
                className="text-blue-500 hover:underline"
              >
                reach out
              </a>{" "}
              if you'd like to collaborate or just chat about innovative ideas!
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity Section */}
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-['Press_Start_2P'] mb-4">Recent Activity</h3>
                <div className="relative h-auto overflow-hidden mb-4">
                <div className="relative w-full transition-opacity duration-500 font-['Press_Start_2P'] text-center bg-purple-200 p-6 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  {activities[currentActivity]}
                </div>
                </div>
          
            </div>


          </div> 

          

          
        </main>
        

      </div>
  </section>
);
};

export default AboutSection;

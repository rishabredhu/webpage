import React, { useState, useRef, useEffect } from "react"; // Importing necessary hooks from React
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Importing UI components for Card
import { Button } from "./ui/button"; // Importing Button component
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons for navigation buttons
import {
  Card as ProjectCard,
  CardContent as ProjectCardContent,
  CardHeader as ProjectCardHeader,
  CardTitle as ProjectCardTitle,
} from "@/components/ui/card"; // Importing UI components for Card from ProjectSection

// Defining the structure of a Skill object
interface Skill {
  name: string; // Name of the skill
  description?: string; // Description of the skill
  skills?: Skill[]; // Array of skills in the category
}

// Defining the structure of a SkillCategory object
interface SkillCategory {
  title: string; // Title of the skill category
  skills: Skill[]; // Array of skills in the category
}

// Component to display a category of skills
const SkillCategory = ({ title, skills }: SkillCategory) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null); // State to track which skill is expanded
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null); // State to track which skill is hovered

  const isTechnicalSkills = title === "Technical Skills";

  const CardComponent = isTechnicalSkills ? ProjectCard : Card;
  const CardContentComponent = isTechnicalSkills
    ? ProjectCardContent
    : CardContent;
  const CardHeaderComponent = isTechnicalSkills
    ? ProjectCardHeader
    : CardHeader;
  const CardTitleComponent = isTechnicalSkills ? ProjectCardTitle : CardTitle;

  return (
    <CardComponent className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
      <CardHeaderComponent className="p-0"></CardHeaderComponent>{" "}
      {/* Empty CardHeader */}
      <CardContentComponent className="p-4">
        <CardTitleComponent className="text-lg mb-2">
          {title}
        </CardTitleComponent>{" "}
        {/* Displaying the title of the skill category */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="relative"
              onMouseEnter={() => setHoveredSkill(skill.name)} // Set hovered skill on mouse enter
              onMouseLeave={() => setHoveredSkill(null)} // Reset hovered skill on mouse leave
            >
              <span
                className={`inline-block px-2 py-1 text-xs cursor-pointer ${hoveredSkill === skill.name ? "bg-purple-500 text-white" : "bg-black text-white"}`}
                onClick={() =>
                  setExpandedSkill(
                    expandedSkill === skill.name ? null : skill.name,
                  )
                } // Toggle expanded skill on click
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  setExpandedSkill(
                    expandedSkill === skill.name ? null : skill.name,
                  )
                } // Toggle expanded skill on Enter key press
                tabIndex={0} // Make the span focusable
                role="button" // Define the role as button for accessibility
                aria-expanded={expandedSkill === skill.name} // ARIA attribute to indicate if the skill is expanded
                aria-controls={`desc-${skill.name}`} // ARIA attribute to link the span with the description div
              >
                {skill.name} {/* Displaying the name of the skill */}
              </span>
              {expandedSkill === skill.name && (
                <div
                  id={`desc-${skill.name}`}
                  className="absolute z-10 mt-1 p-2 bg-white border border-black text-xs font-['Courier_New'] max-w-xs"
                >
                  {skill.description}{" "}
                  {/* Displaying the description of the skill */}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContentComponent>
    </CardComponent>
  );
};

// Defining the structure of a Category object
interface Category {
  name: string;
  skills: { name: string; skills?: string[] }[];
}

// Defining the structure of ScrollableCategoriesProps
interface ScrollableCategoriesProps {
  categories: Category[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

// Component to display scrollable categories of skills
export function ScrollableCategories({
  categories,
  currentIndex,
  setCurrentIndex,
}: ScrollableCategoriesProps) {
  if (!categories || !Array.isArray(categories)) {
    return null;
  }

  return (
    <div className="overflow-x-auto whitespace-nowrap mb-8 py-4">
      <div className="inline-flex space-x-4">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => setCurrentIndex(index)}
            className={`
              relative px-6 py-3 text-sm font-semibold rounded-lg overflow-hidden group 
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75
              transition-all duration-300 ease-in-out
              ${
                currentIndex === index
                  ? "text-white bg-purple-600"
                  : "text-purple-600 bg-transparent hover:text-white hover:bg-purple-600"
              }
            `}
          >
            <span className="relative z-10">{category.name}</span>
            <span className="absolute inset-0 border-2 border-dotted border-current rounded-lg"></span>
            <span className="absolute inset-0 flex">
              <span className="w-1/4 h-full bg-gradient-to-t from-transparent via-current to-transparent opacity-20 animate-revolve"></span>
            </span>
          </button>
        ))}
      </div>
      <style jsx>{`
        @keyframes revolve {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-revolve {
          animation: revolve 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Main component to display the skills section
export default function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(4); // State to track the current index of the selected category, default to Technical Skills
  const [showAllSkills, setShowAllSkills] = useState(false); // New state for showing all skills

  // Array of skill categories
  const categories: SkillCategory[] = [
    {
      title: "ENTREPRENEURIAL SKILLS",
      skills: [
        {
          name: "Startup Development",
          description: "MVP development, user validation, iteration cycles",
        },
        {
          name: "Fundraising & Pitching",
          description: "Experience in pre-seed startups, pitching to investors",
        },
        {
          name: "Product Market Fit",
          description:
            "Conducting feasibility studies, validating product with initial users",
        },
        {
          name: "Project Management",
          description: "Leading teams, roadmap planning, agile methodologies",
        },
      ],
    },
    {
      title: "RESEARCH SKILLS",
      skills: [
        {
          name: "Literature Review",
          description:
            "Conducting comprehensive reviews of existing AI/ML and HCI research and literature.",
        },
        {
          name: "Data Collection",
          description:
            "Designing and implementing data collection methods for AI/ML models and HCI studies.",
        },
        {
          name: "Qualitative Analysis",
          description:
            "Analyzing non-numerical data to identify patterns and insights in HCI research.",
        },
        {
          name: "Quantitative Analysis",
          description:
            "Applying statistical methods to analyze numerical data for AI/ML models.",
        },
        {
          name: "Model Development",
          description:
            "Developing and training machine learning models for various applications.",
        },
        {
          name: "User-Centered Design",
          description:
            "Applying HCI principles to design user-friendly AI/ML systems.",
        },
      ],
    },
    {
      title: "PRODUCT MANAGEMENT",
      skills: [
        {
          name: "Feature Prioritization",
          description:
            "Decision making based on user feedback, data-driven insights",
        },
        {
          name: "Roadmap Development",
          description: "Long-term planning, backlog grooming, sprint planning",
        },
        {
          name: "User Research",
          description:
            "Understanding user needs, working with cross-functional teams",
        },
        {
          name: "Metrics & KPIs",
          description: "A/B testing, user engagement, conversion optimization",
        },
      ],
    },
    {
      title: "UI/UX DESIGN",
      skills: [
        {
          name: "Wireframing",
          description:
            "Creating low-fidelity wireframes to outline the structure of web pages.",
        },
        {
          name: "Prototyping",
          description:
            "Developing interactive prototypes to visualize user interactions.",
        },
        {
          name: "User Testing",
          description:
            "Conducting usability tests to gather feedback and improve designs.",
        },
        {
          name: "Visual Design",
          description:
            "Designing visually appealing interfaces with a focus on user experience.",
        },
        {
          name: "Interaction Design",
          description:
            "Designing interactive elements to enhance user engagement.",
        },
        {
          name: "Information Architecture",
          description:
            "Organizing and structuring content for optimal user navigation.",
        },
      ],
    },
    {
      title: "Technical Skills",
      skills: [
        {
          name: "SOFTWARE ENGINEERING",
          skills: [
            {
              name: "Python",
              description:
                "Primary language for backend development and data processing.",
            },
            {
              name: "C++",
              description: "Used for performance-critical applications.",
            },
            {
              name: "Go",
              description:
                "Used for building scalable and concurrent applications.",
            },
            { name: "Flask", description: "Micro web framework for Python." },
            {
              name: "REST APIs",
              description:
                "Designed and implemented RESTful APIs for various projects.",
            },
            {
              name: "Docker",
              description:
                "Containerized applications for consistent development and deployment.",
            },
            {
              name: "CI/CD",
              description:
                "Implemented continuous integration and deployment pipelines.",
            },
            {
              name: "Git",
              description:
                "Version control system for collaborative development.",
            },
            {
              name: "PostgreSQL",
              description: "Relational database for storing and managing data.",
            },
            {
              name: "MySQL",
              description: "Relational database for storing and managing data.",
            },
            {
              name: "NoSQL",
              description:
                "Non-relational database for handling large amounts of unstructured data.",
            },
          ],
        },
        {
          name: "FULL-STACK",
          skills: [
            {
              name: "React.js",
              description: "Library for building user interfaces.",
            },
            {
              name: "TypeScript",
              description:
                "Typed superset of JavaScript for large-scale applications.",
            },
            {
              name: "JavaScript",
              description: "Primary language for frontend development.",
            },
            {
              name: "Node.js",
              description:
                "Runtime environment for executing JavaScript on the server.",
            },
            {
              name: "HTML5",
              description: "Markup language for structuring web content.",
            },
            {
              name: "CSS3",
              description: "Stylesheet language for designing web pages.",
            },
            {
              name: "Next.js",
              description:
                "React framework for building server-rendered applications.",
            },
            {
              name: "Vercel",
              description:
                "Cloud platform for deploying and hosting web applications.",
            },
          ],
        },
        {
          name: "DATA ENGINEERING",
          skills: [
            {
              name: "AWS (S3, Lambda, Kinesis, Redshift)",
              description: "Cloud services for data processing and storage.",
            },
            {
              name: "Apache Kafka",
              description: "Distributed event streaming platform.",
            },
            {
              name: "Apache Spark",
              description:
                "Utilized for large-scale data processing and analytics.",
            },
            {
              name: "ETL",
              description:
                "Designed and maintained ETL processes for data warehousing.",
            },
            {
              name: "Data Warehousing",
              description:
                "Built and optimized data warehouses for efficient querying.",
            },
            {
              name: "Airflow",
              description: "Managed complex workflows and data pipelines.",
            },
            {
              name: "Docker",
              description:
                "Containerized applications for consistent development and deployment.",
            },
          ],
        },
        {
          name: "DATA SCIENCE",
          skills: [
            {
              name: "PySpark",
              description:
                "Used for distributed data processing and machine learning.",
            },
            {
              name: "Pandas",
              description: "Performed data manipulation and analysis.",
            },
            {
              name: "R",
              description: "Conducted statistical analysis and visualization.",
            },
            {
              name: "Statistical Analysis",
              description: "Applied statistical methods to interpret data.",
            },
            {
              name: "Predictive Modeling",
              description: "Developed models to predict future outcomes.",
            },
            {
              name: "Data Visualization (Tableau, Matplotlib)",
              description: "Created visual representations of data insights.",
            },
          ],
        },
        {
          name: "COMPUTER VISION",
          skills: [
            {
              name: "PyTorch",
              description:
                "Implemented deep learning models for image recognition.",
            },
            {
              name: "OpenCV",
              description:
                "Performed real-time image processing and computer vision tasks.",
            },
            {
              name: "Milvus",
              description:
                "Used for similarity search in large-scale image datasets.",
            },
            {
              name: "Similarity Search",
              description: "Developed systems to find similar images.",
            },
            {
              name: "Transfer Learning",
              description: "Applied pre-trained models to new tasks.",
            },
            {
              name: "Real-Time Image Processing",
              description:
                "Processed images in real-time for various applications.",
            },
          ],
        },
        {
          name: "NLP",
          skills: [
            {
              name: "LangChain",
              description: "Built language models for various NLP tasks.",
            },
            {
              name: "NLP Libraries (spaCy, NLTK)",
              description: "Used for text processing and analysis.",
            },
            {
              name: "Sentiment Analysis",
              description: "Analyzed text to determine sentiment.",
            },
            {
              name: "Topic Modeling",
              description: "Identified topics in large text corpora.",
            },
            {
              name: "Text Preprocessing",
              description: "Cleaned and prepared text data for analysis.",
            },
            {
              name: "FAISS",
              description: "Implemented fast similarity search for text data.",
            },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-16 bg-white text-black font-['Courier_New']">
      
      
    
      <div className="container mx-auto px-4">
        {/* <h2 className="font-['Press_Start_2P'] text-2xl mb-8 text-center">SKILLS</h2> Section title */}
        
        <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-black bg-transparent overflow-hidden">
            <span className="relative z-10 glitch block text-center" data-text="My Projects">
              Runtime Capabilities 
            </span>
          </h2>
        
        
        <div className="flex justify-center">
          <ScrollableCategories
            categories={categories.map((cat) => ({
              name: cat.title,
              skills: cat.skills.map((skill) => ({ name: skill.name })),
            }))}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
        {currentIndex === categories.length - 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
              {categories[currentIndex].skills
                .slice(0, 2)
                .map((category, index) => (
                  <SkillCategory
                    key={index}
                    title={category.name}
                    skills={category.skills!}
                  />
                ))}
              {showAllSkills &&
                categories[currentIndex].skills
                  .slice(2)
                  .map((category, index) => (
                    <SkillCategory
                      key={index + 2}
                      title={category.name}
                      skills={category.skills!}
                    />
                  ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="bg-purple-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all duration-150 ease-in-out"
              >
                <span className="text-xs pixelated">
                  {showAllSkills ? "Hide Additional Skills" : "Show All Skills"}
                </span>
              </Button>
            </div>
          </>
        ) : (
          <SkillCategory {...categories[currentIndex]} />
        )}
      </div>
    </section>
  );
}

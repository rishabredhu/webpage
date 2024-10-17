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
              bg-purple-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
              border-2 border-black 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
              active:shadow-none 
              transition-all duration-150 ease-in-out
              ${currentIndex === index ? 'bg-blue-600' : ''}
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );}

// Main component to display the skills section
export default function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(4); // State to track the current index of the selected category, default to Technical Skills
  const [showAllSkills, setShowAllSkills] = useState(false); // New state for showing all skills

  // Array of skill categories
  const categories: SkillCategory[] =  [
    {
      title: "ENTREPRENEURIAL ",
      skills: [
        {
          name: "Startup Development",
          description:
            "Converted precision agriculture research into a startup by developing an MVP, conducting user validation, and iterating based on feedback.",
        },
        {
          name: "Fundraising & Pitching",
          description:
            "Attempted to secure pre-seed funding by pitching precision agriculture solutions to investors, refining the business model and value proposition.",
        },
        {
          name: "Product Market Fit",
          description:
            "Conducted feasibility studies and validated product-market fit for precision agriculture tools through user testing and feedback loops.",
        },
        {
          name: "Project Management",
          description:
            "Led a team to develop and launch an MVP, planned roadmaps, and utilized agile methodologies to manage iterative development cycles.",
        },
      ],
    },
    {
      title: "RESEARCH ",
      skills: [
        {
          name: "Literature Review",
          description:
            "Conducted comprehensive reviews of AI/ML research for precision agriculture and computer vision applications.",
        },
        {
          name: "Data Collection",
          description:
            "Designed and implemented data collection methods for urban data aggregation and precision agriculture IoT networks.",
        },
        {
          name: "Qualitative Analysis",
          description:
            "Analyzed qualitative data from user interactions in Guard Vision and AI Hawk projects to improve system features.",
        },
        {
          name: "Quantitative Analysis",
          description:
            "Applied statistical methods to analyze GPU performance logs and optimize data pipelines, achieving efficiency improvements.",
        },
        {
          name: "Model Development",
          description:
            "Developed machine learning models for GPU performance optimization and precision agriculture predictive analytics.",
        },
        {
          name: "User-Centered Design",
          description:
            "Applied HCI principles in developing user-friendly dashboards and interactive interfaces for real-time data visualization.",
        },
      ],
    },
    {
      title: "PRODUCT MANAGEMENT",
      skills: [
        {
          name: "Feature Prioritization",
          description:
            "Prioritized features for MVP development in HeadStarter AI based on user feedback and data-driven insights.",
        },
        {
          name: "Roadmap Development",
          description:
            "Planned long-term product roadmaps for AI projects, managing backlog grooming and sprint planning in agile teams.",
        },
        {
          name: "User Research",
          description:
            "Conducted user research in Social Group Lab and HeadStarter AI to understand user needs and inform feature development.",
        },
        {
          name: "Metrics & KPIs",
          description:
            "Defined and tracked KPIs for AI systems, performed A/B testing to optimize user engagement and conversion rates.",
        },
      ],
    },
    {
      title: "UI/UX DESIGN",
      skills: [
        {
          name: "Wireframing",
          description:
            "Created low-fidelity wireframes to outline the structure of interactive dashboards and user interfaces.",
        },
        {
          name: "Prototyping",
          description:
            "Developed interactive prototypes using React to visualize user interactions and validate design concepts.",
        },
        {
          name: "User Testing",
          description:
            "Conducted usability tests on dashboards and AI features to gather feedback and iterate on designs.",
        },
        {
          name: "Visual Design",
          description:
            "Designed visually appealing and intuitive interfaces for real-time data dashboards, enhancing user experience.",
        },
        {
          name: "Interaction Design",
          description:
            "Designed interactive elements in dashboards and notification systems to improve user engagement and responsiveness.",
        },
        {
          name: "Information Architecture",
          description:
            "Organizing and structuring content for optimal user navigation.",
        },
      ],
    },
    {
      title: "Technical ",
      skills: [
        {
          name: "SOFTWARE ENGINEERING",
          skills: [
            {
              name: "Python",
              description:
                "Developed backend systems and data processing pipelines for AI projects, utilizing Python’s extensive libraries for data manipulation and machine learning.",
            },
            {
              name: "C++",
              description:
                "Engineered performance-critical components for data processing pipelines, optimizing algorithms for efficiency in real-time ETL systems.",
            },
            {
              name: "Go",
              description:
                "Built scalable and concurrent microservices for precision agriculture IoT networks, implementing fault-tolerant architectures with Go routines.",
            },
            {
              name: "Flask",
              description:
                "Created backend APIs for real-time data streaming and dashboard integration using Flask micro web framework.",
            },
            {
              name: "REST APIs",
              description:
                "Designed and implemented RESTful APIs for seamless communication between frontend interfaces and backend services.",
            },
            {
              name: "Docker",
              description:
                "Containerized applications to ensure consistent development and deployment environments, facilitating scalable microservices architectures.",
            },
            {
              name: "CI/CD",
              description:
                "Implemented continuous integration and deployment pipelines using tools like GitHub Actions and Docker to automate testing and deployment.",
            },
            {
              name: "Git",
              description:
                "Managed version control for collaborative projects, ensuring code integrity and facilitating seamless integration of contributions from team members.",
            },
            {
              name: "PostgreSQL",
              description:
                "Designed and managed PostgreSQL databases for storing and managing large datasets, optimizing queries for performance.",
            },
            {
              name: "MySQL",
              description:
                "Utilized MySQL for relational data storage in various projects, ensuring efficient data retrieval and management.",
            },
            {
              name: "NoSQL",
              description:
                "Implemented NoSQL databases like MongoDB for handling large amounts of unstructured data in AI and data engineering projects.",
            },
          ],
        },
        {
          name: "FULL-STACK",
          skills: [
            {
              name: "React.js",
              description:
                "Built interactive and responsive user interfaces for dashboards and AI applications using React.js, enhancing user experience and data visualization.",
            },
            {
              name: "TypeScript",
              description:
                "Developed type-safe frontend applications with TypeScript, improving code reliability and maintainability in large-scale React projects.",
            },
            {
              name: "JavaScript",
              description:
                "Used JavaScript for frontend development, creating dynamic and interactive web features in projects like Guard Vision and AI Hawk.",
            },
            {
              name: "Node.js",
              description:
                "Developed server-side functionalities and APIs with Node.js, enabling efficient data processing and real-time interactions in AI applications.",
            },
            {
              name: "HTML5",
              description:
                "Structured web content using HTML5 to ensure semantic and accessible web interfaces in various projects.",
            },
            {
              name: "CSS3",
              description:
                "Styled web applications with CSS3, creating visually appealing and responsive designs for user interfaces.",
            },
            {
              name: "Next.js",
              description:
                "Built server-rendered React applications with Next.js, improving performance and SEO for web-based AI tools.",
            },
            {
              name: "Vercel",
              description:
                "Deployed and hosted web applications on Vercel, ensuring optimized performance and scalability for frontend projects.",
            },
          ],
        },
        {
          name: "DATA ENGINEERING",
          skills: [
            {
              name: "AWS (S3, Lambda, Kinesis, Redshift)",
              description:
                "Utilized AWS services like S3 for data storage, Lambda for serverless computing, Kinesis for real-time data streaming, and Redshift for data warehousing in data engineering projects.",
            },
            {
              name: "Apache Kafka",
              description:
                "Implemented Apache Kafka for distributed event streaming and real-time data pipeline processing, handling thousands of records per second.",
            },
            {
              name: "Apache Spark",
              description:
                "Used Apache Spark for large-scale data processing and analytics, enabling efficient handling of big data in projects like Precision Agriculture.",
            },
            {
              name: "ETL",
              description:
                "Designed and maintained ETL processes using tools like Apache Airflow and PySpark, ensuring efficient data transformation and loading in data warehouses.",
            },
            {
              name: "Data Warehousing",
              description:
                "Built and optimized data warehouses using AWS Redshift and Amazon S3, aggregating large datasets for analysis and research.",
            },
            {
              name: "Airflow",
              description:
                "Managed complex workflows and data pipelines with Apache Airflow, automating ETL processes and ensuring reliable data processing.",
            },
            {
              name: "Docker",
              description:
                "Utilized Docker for containerizing data engineering applications, facilitating consistent environments and scalable deployments.",
            },
          ],
        },
        {
          name: "DATA SCIENCE",
          skills: [
            {
              name: "PySpark",
              description:
                "Used PySpark for distributed data processing and machine learning tasks in large-scale data engineering projects.",
            },
            {
              name: "Pandas",
              description:
                "Performed data manipulation and analysis with Pandas, handling large datasets for data engineering and machine learning projects.",
            },
            {
              name: "R",
              description:
                "Conducted statistical analysis and developed predictive models in R for precision agriculture, optimizing resource allocation and yield.",
            },
            {
              name: "Statistical Analysis",
              description:
                "Applied statistical methods to interpret data from GPU performance logs and precision agriculture studies, driving data-driven optimizations.",
            },
            {
              name: "Predictive Modeling",
              description:
                "Developed predictive models for GPU performance optimization and precision agriculture, utilizing machine learning algorithms to forecast outcomes.",
            },
            {
              name: "Data Visualization (Tableau, Matplotlib)",
              description:
                "Created data visualizations and dashboards using Tableau and Matplotlib to present key insights and analytical results.",
            },
          ],
        },
        {
          name: "COMPUTER VISION",
          skills: [
            {
              name: "PyTorch",
              description:
                "Implemented deep learning models for image recognition and anomaly detection using PyTorch, enhancing the Guard Vision security system.",
            },
            {
              name: "OpenCV",
              description:
                "Performed real-time image processing and computer vision tasks with OpenCV, improving the accuracy of face detection models.",
            },
            {
              name: "Milvus",
              description:
                "Used Milvus for similarity search in large-scale image datasets, enabling efficient image retrieval in Guard Vision.",
            },
            {
              name: "Similarity Search",
              description:
                "Developed systems to find similar images using Milvus and other similarity search technologies, enhancing image-based security features.",
            },
            {
              name: "Transfer Learning",
              description:
                "Applied transfer learning techniques with pre-trained models to new computer vision tasks, improving model performance with limited data.",
            },
            {
              name: "Real-Time Image Processing",
              description:
                "Processed images in real-time for security applications, enabling prompt anomaly detection and response in Guard Vision.",
            },
          ],
        },
        {
          name: "NLP",
          skills: [
            {
              name: "LangChain",
              description:
                "Built language models and intelligent notification systems using LangChain, enabling context-aware messaging and personalized content generation.",
            },
            {
              name: "NLP Libraries (spaCy, NLTK)",
              description:
                "Used spaCy and NLTK for text processing and analysis in projects like AI Hawk, enhancing resume tailoring and automation.",
            },
            {
              name: "Sentiment Analysis",
              description:
                "Analyzed user feedback and engagement metrics using sentiment analysis techniques to improve AI-driven features.",
            },
            {
              name: "Topic Modeling",
              description:
                "Identified topics in large text datasets to inform feature development and user experience improvements.",
            },
            {
              name: "Text Preprocessing",
              description:
                "Cleaned and prepared text data for analysis and model training, ensuring high-quality inputs for NLP tasks.",
            },
            {
              name: "FAISS",
              description:
                "Implemented FAISS for fast similarity search in text data, enhancing the performance of NLP-driven applications.",
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
            <span className="relative z-10 glitch block text-center" data-text="Skills">
              Skills 
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

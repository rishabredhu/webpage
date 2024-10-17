// components/ProjectsSection.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'; // Added Chevron imports
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion, // Added Accordion imports
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Added Accordion imports
import { connectToDatabase } from '@/lib/mongodbClient';
import { ErrorBoundary } from 'react-error-boundary';

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  technologies: { name: string; description: string }[];
  github_url: string | null;
  research_url: string | null;
  team_size: string;
  highlight: string | null;
  detailed_interview_description: string | null;
  detailed_story_description: string | null;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  github_url,
  research_url,
  team_size,
  highlight,
  detailed_interview_description,
  detailed_story_description,
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <Card className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="p-4">
        <CardTitle className="font-['Press_Start_2P'] text-lg mb-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
      <div className="my-4 w-full h-px border-t-2 border-black border-dotted" />
        <p className="font-['Courier_New'] text-md mb-4">{description}</p>

        {/* <div className="my-4 w-full h-px border-t-2 border-black border-dotted" /> */}
        {highlight && (
          <p className="font-['Courier_New'] text-md font-bold mb-4">Highlight: {highlight}</p>
        )}
            
            <p className="font-['Courier_New'] text-md font-bold mb-4 ">
              Team Size: {team_size}
            </p>
            
              <div className="my-4 w-full h-px border-t-2 border-black border-dotted" />
        <Accordion type="single" collapsible className="w-full mb-4">
          <AccordionItem value="technologies">
            <AccordionTrigger className="font-['Press_Start_2P'] text-sm bg-gradient-to-r from-purple-800 to-orange-800 text-transparent bg-clip-text">
              Technologies Used
            </AccordionTrigger>
            <AccordionContent>
              {technologies.map((tech) => (
                <div key={tech.name} className="mb-2">
                  <h4 className="font-['Courier_New'] font-bold">{tech.name}</h4>
                  <p className="font-['Courier_New'] text-sm">{tech.description}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col sm:flex-row justify-between w-full mt-4 gap-4">
          {github_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
              asChild
            >
              <a href={github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Github className="mr-2 h-4 w-4" />
                <span>Github</span>
              </a>
            </Button>
          )}
          {research_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
              asChild
            >
              <a href={research_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Research</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="bg-red-200 border-4 border-red-500 text-red-700 px-4 py-3 mb-6" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{error.message}</span>
  </div>
);

const FallbackProjects: ProjectProps[] = [
  {
    id: 'ai-hawk',
    title: "AI Hawk (Open-Source Contributor)",
    description: "Built a CLI with Python to automate and streamline the job application process, and utilized OpenAI's GPT-4 API to develop a tool that automatically tailors resumes to match specific job descriptions.",
    technologies: [
    {
      "name": "LLM (Large Language Models)",
      "description": "Integrated OpenAI's GPT-4 API to power the core functionality of dynamically analyzing job descriptions and customizing resumes. Implemented prompt engineering techniques to optimize the model's output for accurate and relevant resume tailoring."
    },
    {
      "name": "LangChain",
      "description": "Utilized LangChain framework to streamline the integration of GPT-4 with our application. Leveraged LangChain's memory components for maintaining context in conversations, and used its prompt templates for consistent interactions with the LLM."
    },
    {
      "name": "Python",
      "description": "Developed the entire backend using Python 3.8+. Utilized asyncio for handling concurrent API requests, implemented type hinting for improved code readability and maintenance, and leveraged Python's rich ecosystem of libraries for tasks such as data processing and file handling."
    },
    {
      "name": "CLI (Command-Line Interface)",
      "description": "Designed and implemented a robust CLI using Python's argparse library. Created intuitive command structures for various operations like uploading resumes, specifying job descriptions, and customizing output preferences. Implemented error handling and helpful documentation within the CLI for improved user experience."
    },
    {
      "name": "Automation",
      "description": "Developed automation scripts using Python to streamline the entire job application process. This included automatic parsing of uploaded resumes using libraries like PyPDF2 for PDF handling, implementing regex patterns for extracting key information, and creating a queueing system for batch processing of multiple job applications."
    },
    {
      "name": "API Integration",
      "description": "Implemented secure API integrations, primarily with OpenAI's GPT-4. Utilized Python's requests library for HTTP communications, implemented proper error handling and rate limiting to comply with API usage guidelines. Also integrated with cloud storage services for storing and retrieving user data securely."
    },
    {
      "name": "Natural Language Processing (NLP)",
      "description": "Applied advanced NLP techniques beyond basic LLM usage. This included implementing custom tokenization for technical terms and job-specific jargon, using libraries like NLTK for text preprocessing, and developing a custom named entity recognition (NER) system for identifying key skills and experiences in resumes."
    },
    {
      "name": "Data Structures and Algorithms",
      "description": "Implemented efficient data structures for storing and retrieving user profiles and job descriptions. Utilized tries for fast keyword matching, and developed a custom ranking algorithm to match resume content with job requirements, considering factors like keyword relevance and experience level."
    },
    {
      "name": "Version Control",
      "description": "Managed the project using Git for version control. Implemented a branching strategy for feature development, utilized pull requests for code reviews, and maintained comprehensive documentation for contributor guidelines and project roadmap on GitHub.",
      
    },
    {
      "name": "Testing and QA",
      "description": "Developed a comprehensive testing suite using pytest for unit and integration tests. Implemented continuous integration using GitHub Actions to automatically run tests on each push. Created mock objects to simulate API responses for consistent testing of the LLM integration."
    }
  ],
  "highlight": "7k+ Stars on GitHub",
  "github_url": "https://github.com/feder-cr/Auto_Jobs_Applier_AIHawk",
  "research_url": null,
  "team_size": "open-source",
  "detailed_interview_description": "",
  "detailed_story_description": ""
  },
  {
    id: 'gaurd-vision',
    "title": "Guard Vision (Team Lead)",
  "description": "Designed and deployed an end-to-end pipeline that processes video streams in real-time, performs anomaly detection, and triggers alerts for potential security breaches, ensuring timely response and mitigation. Implemented a custom face detection model to enhance the system's ability to identify and authenticate individuals, reducing false positives and improving overall security measures.",
  "technologies": [
    {
      "name": "Python",
      "description": "Used as the primary backend language for developing the video processing pipeline, implementing machine learning models, and integrating various AWS services. Leveraged Python's extensive libraries for data manipulation, image processing, and API development."
    },
    {
      "name": "JavaScript",
      "description": "Employed for frontend development to create an interactive and responsive user interface. Utilized modern JavaScript frameworks and libraries to handle real-time updates and dynamic content rendering for the security monitoring dashboard."
    },
    {
      "name": "Flask",
      "description": "Implemented as the web framework for building RESTful APIs, facilitating communication between the frontend and backend components. Leveraged Flask's simplicity and flexibility to create efficient routes for handling video data and security alerts."
    },
    {
      "name": "PyTorch",
      "description": "Utilized for developing and fine-tuning the custom face detection model and similarity search functionality. Leveraged PyTorch's dynamic computational graph and extensive neural network modules to create efficient and accurate deep learning models for real-time video analysis."
    },
    {
      "name": "Milvus",
      "description": "Integrated as a vector database for efficient similarity search in large-scale image datasets. Utilized Milvus's high-performance indexing and querying capabilities to enable rapid face matching and identification in real-time video streams."
    },
    {
      "name": "AWS",
      "description": "Leveraged multiple AWS services to build a scalable and robust backend infrastructure:\n- S3 for secure storage of video data and processed results\n- SQS for reliable message queuing between components\n- Step Functions to orchestrate complex workflows in the video processing pipeline\n- Lambda for serverless computing, enabling efficient scaling of processing tasks\n- Kinesis for real-time video stream ingestion and processing\n- ElasticSearch for indexing and quick retrieval of processed video data and security events"
    },
    {
      "name": "Real-Time Processing",
      "description": "Implemented real-time processing techniques throughout the pipeline, including stream processing with AWS Kinesis, low-latency API communications, and optimized algorithms for quick anomaly detection and alert generation, ensuring minimal delay between event occurrence and system response."
    },
    {
      "name": "HTML5",
      "description": "Used for structuring the frontend content, creating a semantic and accessible layout for the security monitoring interface. Leveraged HTML5 features for native video playback and real-time notifications."
    },
    {
      "name": "CSS",
      "description": "Employed for styling the frontend, ensuring a visually appealing and responsive design across different devices and screen sizes. Utilized modern CSS techniques for layout management and animations to enhance the user experience."
    },
    {
      "name": "Pinecone",
      "description": "Integrated as an alternative vector database alongside Milvus, providing additional options for similarity search and vector indexing. Utilized Pinecone's cloud-native architecture for scalable and efficient vector operations in the face recognition system."
    }
  ],
  "highlight": "12+ users",
  "github_url": "https://github.com/rishabredhu/Gaurd-Dog",
  "research_url": null,
  "team_size": "2",
 "detailed_interview_description": "",
    "detailed_story_description": "",
  },
  {
    id: "precision-agriculture",
    title: "Precision Agriculture (Co-Author)",
    description: "Implemented a WebRPC service in Go using gRPC for real-time sensor data transmission, improving crop yield by 15% and reducing water usage by 20%. Developed predictive models and statistical analysis in R for irrigation and fertilization schedules, achieving 20% resource optimization.",
    technologies: [
      {
        "name": "Python",
        "description": "Utilized for backend development, data processing, and machine learning tasks. Implemented data preprocessing pipelines, feature engineering, and model integration using libraries such as Pandas, NumPy, and scikit-learn. Developed RESTful APIs using Flask for communication between the frontend and backend components."
      },
      {
        "name": "Go",
        "description": "Implemented a high-performance WebRPC service using Go and gRPC for efficient real-time sensor data transmission. Leveraged Go's concurrency features to handle multiple sensor connections simultaneously, ensuring low-latency data ingestion and processing. Utilized Protocol Buffers for defining service contracts and data structures."
      },
      {
        "name": "R",
        "description": "Developed predictive models and conducted statistical analysis for irrigation and fertilization schedules. Utilized time-series forecasting models (ARIMA, Prophet), regression models (Random Forest), and classification algorithms for soil nutrient assessment. Implemented advanced statistical techniques such as multivariate analysis and hypothesis testing to validate factors influencing crop yield."
      },
      {
        "name": "Machine Learning",
        "description": "Applied various machine learning techniques across the project. This included developing predictive models for irrigation and fertilization needs, implementing anomaly detection algorithms for identifying unusual sensor readings, and creating clustering models for field segmentation based on soil characteristics. Utilized both supervised (regression, classification) and unsupervised (clustering) learning approaches."
      },
      {
        "name": "Data Visualization",
        "description": "Integrated data visualization tools and libraries such as D3.js, Plotly, and Grafana to create interactive and informative dashboards. Developed real-time visualization of sensor data, trend analysis charts, and predictive model outputs. Implemented customizable visualizations allowing users to explore data and insights effectively."
      },
      {
        "name": "Dashboard",
        "description": "Designed and implemented a comprehensive web-based dashboard using React.js for the frontend. The dashboard provided real-time updates on sensor data, predictive analytics results, and actionable insights for farm management. Incorporated responsive design principles to ensure accessibility across various devices and screen sizes."
      },
      {
        "name": "AWS",
        "description": "Leveraged various AWS services to build a scalable and robust infrastructure. Utilized EC2 for hosting compute instances, S3 for data storage, RDS for relational database management, and Lambda for serverless computing tasks. Implemented AWS IAM for secure access control and CloudWatch for monitoring and logging."
      },
      {
        "name": "Docker",
        "description": "Containerized microservices and application components using Docker, ensuring consistency across development, testing, and production environments. Created optimized Docker images for each service, facilitating easy deployment and scaling of the application."
      },
      {
        "name": "gRPC",
        "description": "Utilized gRPC framework in conjunction with Go for implementing efficient, low-latency communication between sensors and backend services. Leveraged gRPC's binary serialization for optimized data transmission and its support for bi-directional streaming to handle real-time sensor data effectively."
      },
      {
        "name": "PostgreSQL",
        "description": "Employed PostgreSQL as the primary relational database for storing structured data such as user information, system configurations, and historical analytics. Optimized database schema and queries for efficient data retrieval and management of time-series data from sensors."
      }
    ],
    "highlight": "15+ users",
    "github_url": null,
    "team_size": "3",
    "detailed_interview_description": "",
    "detailed_story_description": "",
    "research_url": "https://ieeexplore.ieee.org/document/9077713",
  },
  {
    id:"resume-indexing",
    "title": "Efficient Resume Indexing Using Deep Learning",
  "description": "Built a system to index resumes based on visual features using ResNet, a custom Transformer, and Vision Transformer models. Implemented FAISS for efficient similarity-based retrieval. Experimented with ResNet and Transformer architectures to fine-tune feature extraction and evaluated retrieval performance using cosine similarity.",
  "technologies": [
    {
      "name": "ResNet",
      "description": "Utilized ResNet-50, a deep residual learning framework, for extracting high-level visual features from resume images. Modified the final layers to capture domain-specific features relevant to resume analysis. Fine-tuned the model on a specialized dataset of resume images to improve feature extraction capabilities specific to resume structures."
    },
    {
      "name": "Transformers",
      "description": "Developed a custom Transformer architecture tailored to process and interpret sequential and contextual information in resume layouts. Integrated attention mechanisms with CNN-extracted features to enhance understanding of complex visual patterns and relationships within resumes. Implemented multiple attention heads and layers to effectively capture contextual relationships."
    },
    {
      "name": "Vision Transformer",
      "description": "Incorporated Vision Transformer (ViT) models to apply Transformer architectures directly to sequences of image patches from resumes. Fine-tuned pre-trained ViT models on a specialized dataset of resume images to improve their ability to discern and encode nuanced visual features specific to resume structures. Implemented patch embedding to divide resume images into non-overlapping patches for effective processing."
    },
    {
      "name": "FAISS",
      "description": "Implemented Facebook AI Similarity Search (FAISS) to handle high-dimensional feature vectors generated by the deep learning models. Created efficient FAISS indexes supporting rapid similarity searches across large datasets of resumes. Configured FAISS parameters to balance retrieval speed and accuracy, enabling quick and scalable similarity-based retrieval of resumes matching given queries."
    },
    {
      "name": "Python",
      "description": "Used as the primary programming language for implementing the entire system. Leveraged Python's rich ecosystem of libraries and frameworks for deep learning (PyTorch, TensorFlow), data processing (NumPy, Pandas), and machine learning (scikit-learn). Developed the Command-Line Interface (CLI) using Python's argparse library for user interaction and system control."
    },
    {
      "name": "PyTorch",
      "description": "Utilized PyTorch as the primary deep learning framework for implementing and training the ResNet, custom Transformer, and Vision Transformer models. Leveraged PyTorch's dynamic computational graph and extensive neural network modules for efficient model development and training."
    },
    {
      "name": "TensorFlow",
      "description": "Employed TensorFlow alongside PyTorch for certain model implementations and comparisons. Used TensorFlow's high-level APIs for rapid prototyping and its efficient serving capabilities for model deployment in production environments."
    },
    {
      "name": "NumPy",
      "description": "Extensively used NumPy for numerical computing, particularly in data preprocessing, feature vector manipulation, and efficient array operations. Leveraged NumPy's vectorized operations for performance optimization in data processing pipelines."
    },
    {
      "name": "Pandas",
      "description": "Utilized Pandas for data manipulation and analysis, particularly in handling structured data related to resume metadata, annotations, and evaluation metrics. Employed Pandas DataFrames for efficient data organization and processing throughout the project pipeline."
    },
    {
      "name": "scikit-learn",
      "description": "Leveraged scikit-learn for various machine learning tasks, including dimensionality reduction (PCA), model evaluation metrics, and preprocessing techniques. Utilized scikit-learn's implementations of algorithms like cosine similarity for feature vector comparisons and evaluations."
    }
  ],
  "highlight": null,
  "github_url": "https://github.com/rishabredhu/resnet-transformer-indexer-scratch",
  "research_url": null,
    "team_size": "1",
    "detailed_interview_description": "",
    "detailed_story_description": ""
  }
];

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>(FallbackProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProjects(FallbackProjects);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="bg-white-200 py-20 text-justify">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-50 bg-transparent mb-6">
            <h2 className="relative px-8 py-3 text-5xl font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient bg-transparent overflow-hidden text-center mb-8 break-reconstruct">
              PROJECT BOARD
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FallbackProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default ProjectsSection;

# Updated Product Requirements Document (PRD)

## Personal Portfolio Website 
**Version**: 2.0  
**Date**: October 7, 2024  
**Author**: Rishab Singh

## 1. Objective

The purpose of this project is to create a personal portfolio website that highlights **Rishab Singh's** skills, experience, and accomplishments. The website aims to effectively engage recruiters, hiring managers, and peers by showcasing strengths and increasing opportunities for interviews, job offers, and collaborations. It will also include interactive elements like 3D visualizations and a chatbot to enhance user engagement.

## 2. Target Audience

- **Recruiters**: Require an easy-to-digest, high-level overview of skills and qualifications.
- **Hiring Managers**: Seek detailed technical explanations of projects, tools used, and problem-solving approaches.
- **Peers/Collaborators**: Interested in collaborations or projects in similar technical domains.
- **Industry Professionals**: Looking for thought leadership and insights through blog content.

## 3. Core Functionalities

### 3.1 Hero Section

- **Introduction**: Concise summary with a tagline highlighting professional strengths and goals.
- **Call-to-Action Buttons**:
  - "Download Resume"
  - "Contact Me"

### 3.2 About Section

- **Personal Introduction**: Brief bio and summary of qualifications.
- **Resume Link**: Downloadable detailed resume.

### 3.3 Projects Section

- **Interactive Project Cards**:
  - Descriptions, technologies used, and links to demos or GitHub.
  - Notable achievements and metrics (e.g., "Improved system performance by 20%").
- **3D Visualization Projects**:
  - **Kinect 3D Point Cloud Visualization**: Renders a 3D point cloud using depth data from a video texture.
  - **Instancing Triangle Visualization**: Displays 50,000 dynamically animated triangles using Three.js instancing features.
- **Integration of React Components for 3D Visualizations**:
  - Components are reusable and scalable within the React application.

### 3.4 Skills Section

- **Categorized Technical Skills**: Tools and languages listed by category.
- **Interactive Elements**: Animations or hover effects to enhance engagement.

### 3.5 Experience Section

- **Professional Experience**: Job titles, companies, and brief descriptions of key responsibilities.
- **Achievements and Technologies Used**: Specific accomplishments and tools leveraged.

### 3.6 Blog Section

- **Content Strategy**:
  - **Thought Leadership**: Posts covering tech tutorials, industry insights, or personal reflections on projects.
  - **SEO Improvement**: Regular updates to improve search engine rankings and demonstrate ongoing engagement with industry trends.

### 3.7 Testimonials and Endorsements

- **Credibility Building**: Featuring testimonials from colleagues or clients to add a personal touch and enhance trustworthiness.

### 3.8 Chatbot Integration

- **Conversational AI Assistant**:
  - Tailored to both recruiters and hiring managers.
  - **Initial Screening Questions**:
    - "Who am I speaking with today?"
    - "What is your email?"
    - "What is your phone number?"
  - Different conversational paths based on user input (casual for recruiters, technical for hiring managers).

### 3.9 Responsive Design

- **Device Compatibility**: Ensuring seamless user experience across desktop, tablet, and mobile devices.

## 4. Additional Features

### 4.1 Dark Mode

- **Theme Toggle**: Option to switch between light and dark themes.

### 4.2 Contact Form

- **Direct Inquiries**: A form for visitors to submit messages directly.

### 4.3 Social Media Integration

- **Professional Profiles**: Links to LinkedIn, GitHub, and other relevant platforms.

### 4.4 User Flow

- **Recruiters' Journey**:
  - Homepage → Hero Section → Skills → Projects/Experience → Chatbot → Download Resume/Contact.
- **Hiring Managers' Journey**:
  - Homepage → Projects → Detailed Technical Write-ups → Chatbot → About Section → Resume Download.
- **Peers/Collaborators' Journey**:
  - Homepage → Blog Section → Projects → Contact Form.

## 5. Technical Details

### 5.1 Frontend

- **Framework**: Next.js with TypeScript for robust type checking and efficient development.
- **Styling**: Tailwind CSS with shadcn/ui components for rapid UI development.
- **Animations**: Framer Motion for smooth and interactive animations.
- **3D Visualization**: Three.js with React Three Fiber for rendering 3D content.
- **Chatbot**: Integration with OpenAI's GPT-4 model via secure API routes.
- **Email Handling**: EmailJS or alternative for sending emails from the contact form.
- **State Management**: React Hooks and Context API.

### 5.2 Backend

- **API Routes**: Next.js API routes for handling form submissions and chatbot interactions.
- **Server-Side Rendering (SSR)**: For improved SEO and initial page load performance.

### 5.3 Analytics

- **Google Analytics**:
  - Tracking user behavior, popular pages, and features.
  - Analyzing bounce rate and user engagement.
- **Hotjar**:
  - Collecting user feedback through surveys and heatmaps.

### 5.4 SEO Strategy

- **Meta Tags and Descriptions**: Unique meta titles and descriptions for each page.
- **Keyword Optimization**: Incorporate relevant keywords throughout the content.
- **Sitemap and Robots.txt**:
  - Generate a sitemap.xml file for search engines.
  - Configure robots.txt to guide crawlers effectively.

### 5.5 Performance Optimization

- **Image Optimization**:
  - Use next-gen formats like WebP.
  - Implement lazy loading for images.
- **Code Splitting and Minification**:
  - Utilize Next.js features for code splitting.
  - Ensure CSS and JavaScript files are minified.
- **Caching Strategies**:
  - Implement caching headers.
  - Use a Content Delivery Network (CDN) for faster content delivery globally.

### 5.6 Security Enhancements

- **Secure API Communication**:
  - Use HTTPS for all API interactions.
  - Implement appropriate authentication for API calls.
- **Input Validation and Sanitization**:
  - Validate and sanitize all user inputs on both client and server sides.
- **Content Security Policy (CSP)**:
  - Implement CSP headers to mitigate Cross-Site Scripting (XSS) attacks.

### 5.7 Accessibility Improvements

- **Contrast Ratios**:
  - Ensure text and background colors meet WCAG guidelines.
- **Keyboard Navigation**:
  - All interactive components are operable via keyboard.
- **Screen Reader Compatibility**:
  - Use semantic HTML and ARIA roles for better screen reader support.

## 6. File Structure

The file structure is designed to be minimal and organized, facilitating ease of development and scalability.

```
.
├── README.md
├── app
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── carousel.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── progress.tsx
│       ├── scroll-area.tsx
│       ├── skeleton.tsx
│       └── toggle.tsx
├── components.json
├── instructions
│   └── instructions.md
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Explanation of Key Files and Directories

- **README.md**: Documentation and setup instructions.
- **app/**:
  - **favicon.ico**: Website icon.
  - **fonts/**: Custom fonts used in the website.
  - **globals.css**: Global CSS styles, including Tailwind CSS imports.
  - **layout.tsx**: Root layout component wrapping all pages.
  - **page.tsx**: Main entry point for the homepage.
- **components/**:
  - **ui/**: Reusable UI components.
    - **alert-dialog.tsx**: For alert dialogs.
    - **avatar.tsx**: User avatars and logos.
    - **button.tsx**: Reusable button component.
    - **carousel.tsx**: For image or content sliders.
    - **hover-card.tsx**: Cards with hover effects.
    - **input.tsx**: Form input fields.
    - **progress.tsx**: Progress bars for skill levels.
    - **scroll-area.tsx**: Scrollable content areas.
    - **skeleton.tsx**: Placeholder loading components.
    - **toggle.tsx**: Toggle switches (e.g., for dark mode).
- **components.json**: Configuration for component imports if using automatic imports.
- **instructions/**:
  - **instructions.md**: Additional documentation or guidelines.
- **lib/**:
  - **utils.ts**: Utility functions used across the project.
- **next-env.d.ts**: TypeScript definitions for Next.js.
- **next.config.mjs**: Next.js configuration file.
- **package.json**: Project metadata and dependencies.
- **postcss.config.mjs**: PostCSS configuration with Tailwind CSS.
- **tailwind.config.ts**: Tailwind CSS customization.
- **tsconfig.json**: TypeScript compiler configuration.

## 7. Implementation Plan

### 7.1 Setting Up the Project

- **Initialize Next.js with TypeScript**.
- **Install Dependencies**:
  - `tailwindcss`, `postcss`, `autoprefixer` for styling.
  - `@tailwindcss/forms` for better form styling.
  - `@headlessui/react` and `@heroicons/react` for accessible UI components.
  - `three`, `@react-three/fiber`, `@react-three/drei` for 3D visualizations.
  - `framer-motion` for animations.
  - `emailjs-com` for email handling.
  - `openai` for chatbot integration.
  - `react-ga4` and `hotjar-react` for analytics.
- **Configure Tailwind CSS**:
  - Set up the `tailwind.config.ts` with custom themes and plugins.

### 7.2 Developing Core Components

- **Layout and Pages**:
  - **layout.tsx**: Include `Navbar`, `Footer`, and `DarkModeToggle`.
  - **page.tsx**: Compose `HeroSection`, `AboutSection`, `ProjectsSection`, `SkillsSection`, `ExperienceSection`.
- **Reusable UI Components**:
  - Build components in `components/ui/` directory for consistency and reusability.
- **Hero Section**:
  - Use `avatar.tsx` for profile picture.
  - Include tagline and CTA buttons using `button.tsx`.
- **About Section**:
  - Brief bio with a link to download the resume.
- **Projects Section**:
  - Display projects using `hover-card.tsx` and `carousel.tsx`.
  - **3D Visualization Components**:
    - **KinectPointCloud.tsx** and **InstancedTriangles.tsx** in `components/ui/`.
    - Utilize custom shaders and React Three Fiber.

### 7.3 Integrating Additional Features

- **Blog Section**:
  - Create `BlogSection.tsx` to list blog posts.
  - Use Markdown or a headless CMS for content management.
- **Testimonials Section**:
  - Create `Testimonials.tsx` to showcase endorsements.
- **Chatbot Integration**:
  - **Frontend**: `Chatbot.tsx` component with initial screening questions.
  - **Backend**: `pages/api/chatbot.ts` to handle API requests securely.
- **Contact Form**:
  - Use `input.tsx` for form fields.
  - Validate inputs with `react-hook-form` and `yup`.
  - Submit data to `pages/api/sendEmail.ts`.

### 7.4 Implementing SEO Strategies

- **Meta Tags and Descriptions**:
  - Use Next.js Head component to set meta tags per page.
- **Keyword Optimization**:
  - Research and incorporate relevant keywords in content.
- **Sitemap and Robots.txt**:
  - Generate using `next-sitemap` package.
  - Configure `robots.txt` to allow/disallow crawling as needed.

### 7.5 Enhancing Performance

- **Image Optimization**:
  - Use Next.js Image component for automatic optimization.
  - Convert images to WebP format.
- **Code Splitting and Minification**:
  - Leverage Next.js automatic code splitting.
  - Enable minification in production builds.
- **Caching Strategies**:
  - Implement caching headers in `next.config.mjs`.
  - Use a CDN like Vercel's Edge Network.

### 7.6 Security Measures

- **Secure API Communication**:
  - Use HTTPS for all API interactions.
  - Store API keys securely using environment variables.
- **Input Validation and Sanitization**:
  - Validate on both client and server sides.
  - Sanitize inputs to prevent injection attacks.
- **Content Security Policy (CSP)**:
  - Set CSP headers in `next.config.mjs` or using middleware.

### 7.7 Accessibility Compliance

- **Contrast Ratios**:
  - Test with tools like Lighthouse or aXe.
- **Keyboard Navigation**:
  - Ensure all interactive elements are focusable.
- **Screen Reader Compatibility**:
  - Use semantic HTML elements.
  - Add ARIA attributes where necessary.

## 8. React Components for 3D Visualizations

### 8.1 Kinect 3D Point Cloud Visualization

- **Component**: `KinectPointCloud.tsx`
- **Description**: Renders a 3D point cloud using depth data from a video texture.
- **Features**:
  - Custom vertex and fragment shaders.
  - GUI controls for adjusting parameters.
  - Responsive layout adjustments.

#### Implementation Details

- **Shaders**:
  - **Vertex Shader**: Maps video texture into 3D space using depth data.
  - **Fragment Shader**: Applies translucency to the points.
- **GUI Controls**:
  - Implemented using `dat.gui` or `leva` for adjusting near/far clipping planes, point size, and Z-offset.
- **Integration**:
  - The component can be imported and used within `ProjectsSection.tsx`.

### 8.2 Instancing Triangle Visualization

- **Component**: `InstancedTriangles.tsx`
- **Description**: Displays 50,000 dynamically animated triangles.
- **Features**:
  - Uses instanced buffer geometry for performance.
  - Shader-based real-time animations.
  - GUI controls for instance count and animation parameters.

#### Implementation Details

- **Shaders**:
  - **Vertex Shader**: Handles position and orientation changes.
  - **Fragment Shader**: Changes color based on position and time.
- **Performance Optimization**:
  - Instancing allows rendering large numbers of objects efficiently.
- **Integration**:
  - Can be showcased as a separate project or interactive background element.

## 9. Non-Functional Requirements

### 9.1 Performance
* **Rendering Efficiency**:
   * 3D components should maintain at least 30 FPS.
* **Page Load Times**:
   * Aim for initial load times under 3 seconds.
* **Responsive Design**:
   * Ensure usability across various devices and screen sizes.

### 9.2 Compatibility
* **Browser Support**:
   * Latest versions of Chrome, Firefox, Safari, and Edge.
* **Platform Support**:
   * Desktop and mobile browsers.

### 9.3 Security
* **Data Protection**:
   * Secure handling of personal information from contact forms.
* **API Security**:
   * Protect API keys and endpoints.
* **Vulnerability Prevention**:
   * Regularly update dependencies to patch known vulnerabilities.

### 9.4 Accessibility
* **Compliance Standards**:
   * Meet WCAG 2.1 Level AA guidelines.
* **User-Friendly Interface**:
   * Intuitive navigation and clear labeling.

## 10. Examples and Implementation Guidelines

### 10.1 Utilizing UI Components
* **Button Component** (`button.tsx`):
   * Props include `text`, `onClick`, and `variant`.
   * Variants for primary and secondary styles.
* **Toggle Component** (`toggle.tsx`):
   * Manages theme switching between light and dark modes.
   * Uses a custom hook `useTheme`.

### 10.2 Integrating 3D Visualizations
* **KinectPointCloud Component**:
   * Set up the Three.js scene using React Three Fiber.
   * Load the depth video as a texture.
   * Apply custom shaders for rendering.
* **InstancedTriangles Component**:
   * Use instanced buffer geometry.
   * Animate using uniforms and shaders.

### 10.3 Form Handling with Validation
* **Contact Form**:
   * Use `react-hook-form` for form state management.
   * Validate inputs with `yup` or `zod`.
   * Sanitize inputs before submission.

### 10.4 Secure API Routes
* **Chatbot API** (`chatbot.ts`):
   * Handle requests server-side.
   * Use OpenAI SDK securely with API keys from environment variables.
* **Email Sending API** (`sendEmail.ts`):
   * Use a server-side function to interact with EmailJS or alternative service.

## 11. Next Steps
1. **Finalize Design Mockups**:
   * Create visual designs for all pages and components.
2. **Set Up Development Environment**:
   * Clone repository and install dependencies.
3. **Implement Core Structure**:
   * Build out the main layout and pages.
4. **Develop UI Components**:
   * Create reusable components in `components/ui/`.
5. **Integrate 3D Visualizations**:
   * Develop and test `KinectPointCloud` and `InstancedTriangles` components.
6. **Add Content**:
   * Populate sections with real content, images, and testimonials.
7. **Optimize for SEO and Performance**:
   * Apply best practices as outlined.
8. **Conduct Testing**:
   * Perform usability, performance, and security testing.
9. **Deploy**:
   * Host on a platform like Vercel.
   * Monitor using analytics tools.

## 12. Conclusion
This PRD outlines the comprehensive plan to develop an engaging and professional portfolio website for **Rishab Singh**, incorporating advanced features like 3D visualizations and a chatbot. By focusing on performance, security, SEO, and accessibility, the website aims to provide an exceptional user experience and effectively showcase Rishab's skills and projects.
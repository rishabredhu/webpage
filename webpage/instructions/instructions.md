# Updated Product Requirements Document (PRD)

---

# Personal Portfolio Website for Rishab Singh

**Version**: 2.2  
**Date**: October 7, 2024  
**Author**: Rishab Singh

---

# Updated Project Requirements Document

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Structure Overview](#2-project-structure-overview)
3. [Supabase Integration Requirements](#3-supabase-integration-requirements)
   - [3.1 Content Management](#31-content-management)
   - [3.2 User Authentication](#32-user-authentication)
   - [3.3 Analytics](#33-analytics)
   - [3.4 File Storage](#34-file-storage)
4. [Backend Architecture](#4-backend-architecture)
   - [4.1 API Routes](#41-api-routes)
   - [4.2 Supabase Client](#42-supabase-client)
   - [4.3 Data Fetching](#43-data-fetching)
   - [4.4 Real-time Updates](#44-real-time-updates)
5. [Security Considerations](#5-security-considerations)
6. [Performance Optimization](#6-performance-optimization)
7. [Integration Steps](#7-integration-steps)
8. [Testing and Deployment](#8-testing-and-deployment)
9. [Documentation](#9-documentation)
10. [Future Considerations](#10-future-considerations)
11. [Accessibility and Internationalization](#11-accessibility-and-internationalization)
12. [Monitoring and Error Handling](#12-monitoring-and-error-handling)
13. [User Experience (UX) Considerations](#13-user-experience-ux-considerations)
14. [Compliance and Data Protection](#14-compliance-and-data-protection)

## 1. Introduction

This document provides a detailed overview of the project structure and the requirements for integrating Supabase into the existing web portfolio. The goal is to assist the backend developer in understanding the project's architecture and to outline the core components needed for seamless Supabase integration, including content management, user authentication, analytics, and file storage.

### Objective

The purpose of this project is to create a personal portfolio website that highlights **Rishab Singh's** skills, experience, and accomplishments. The website aims to effectively engage recruiters, hiring managers, and peers by showcasing strengths and increasing opportunities for interviews, job offers, and collaborations. It will include interactive elements like 3D visualizations and a chatbot to enhance user engagement.

**Project Objectives:**

- Enhance the existing web portfolio with dynamic content management capabilities
- Implement secure user authentication for content administrators
- Integrate analytics to track user interactions and page views
- Optimize file storage and retrieval for media assets

**Success Criteria:**

- Successful implementation of all Supabase integrations
- Improved content management workflow for administrators
- Enhanced security measures for user data and authentication
- Measurable improvement in site performance and load times

---

## 2. Target Audience

- **Recruiters**: Require an easy-to-digest, high-level overview of skills and qualifications.
- **Hiring Managers**: Seek detailed technical explanations of projects, tools used, and problem-solving approaches.
- **Peers/Collaborators**: Interested in collaborations or projects in similar technical domains.
- **Industry Professionals**: Looking for thought leadership and insights through blog content.

---

## 3. Core Functionalities

### 3.1 Hero Section

#### Description

The Hero Section is the first point of contact for visitors. It should make a strong impression, introducing Rishab Singh and highlighting his professional strengths and goals.

#### Elements

- **Profile Image**: A professional photo or avatar.
- **Tagline/Slogan**: A concise statement summarizing professional identity or mission.
- **Brief Introduction**: One or two sentences introducing yourself.
- **Call-to-Action Buttons**:
  - **"Download Resume"**: Allows users to download your resume directly.
  - **"Contact Me"**: Scrolls down to the contact section or opens a contact form/modal.
- **Background**: An engaging background image or subtle animation (optional).

#### Implementation Details

- **Component**: `HeroSection.tsx`
- **UI Components Used**:
  - `Avatar` from `components/ui/avatar.tsx` for the profile image.
  - `Button` from `components/ui/button.tsx` for CTAs.
- **Styling**:
  - Use Tailwind CSS for responsive design.
  - Apply animations using Framer Motion for elements like the tagline appearing on load.
- **Accessibility**:
  - Ensure buttons are accessible via keyboard navigation.
  - Use semantic HTML (`<section>`, `<h1>`, etc.).

### 3.2 About Section

#### Description

Provides a deeper introduction, highlighting qualifications, background, and what sets you apart professionally.

#### Elements

- **Headline**: "About Me" or similar.
- **Detailed Bio**: A few paragraphs covering education, experience, and passions.
- **Skills Highlights**: Briefly mention key skills (detailed skills in Skills Section).
- **Download Resume Button**: Another opportunity to download the resume.
- **Profile Image**: Optional larger image.

#### Implementation Details

- **Component**: `AboutSection.tsx`
- **UI Components Used**:
  - `Button` for "Download Resume".
- **Styling**:
  - Arrange text and images responsively.
  - Use Tailwind CSS grid or flex utilities.
- **Content Strategy**:
  - Write in first person to create a personal connection.
  - Highlight unique selling points.

### 3.3 Projects Section

#### Description

Showcases your most significant projects, demonstrating your skills and experience through real-world examples.

#### Elements

- **Section Title**: "Projects" or "My Work".
- **Project Cards**:
  - **Image/Thumbnail**: Screenshot or graphic representing the project.
  - **Title**: Project name.
  - **Description**: Brief summary of the project.
  - **Technologies Used**: Icons or tags representing the technologies.
  - **Links**:
    - **Demo**: Link to a live version if available.
    - **GitHub**: Link to the repository.
- **3D Visualization Projects**:
  - **Kinect 3D Point Cloud Visualization**: Interactive demo or video showcasing the project.
  - **Instancing Triangle Visualization**: Similar interactive element.

#### Implementation Details

- **Component**: `ProjectsSection.tsx`
- **UI Components Used**:
  - `HoverCard` for project cards.
  - `Carousel` for sliding through projects (if many).
- **3D Visualizations**:
  - **Components**:
    - `KinectPointCloud.tsx`
    - `InstancedTriangles.tsx`
  - **Integration**:
    - Import and embed these components within the project cards or as separate highlighted projects.
- **Styling**:
  - Use grid layout for desktop and switch to carousel or vertical stacking on mobile.
  - Apply hover effects to cards using Tailwind CSS and Framer Motion.
- **Interactivity**:
  - Allow users to filter projects by technology or type (optional).
- **Accessibility**:
  - Ensure images have `alt` text.
  - Links should be descriptive.

### 3.4 Skills Section

#### Description

Displays your technical and professional skills, organized by categories.

#### Elements

- **Section Title**: "Skills" or "What I Do".
- **Skill Categories**:
  - **Frontend Development**: List of skills (e.g., React, TypeScript).
  - **Backend Development**: Skills like Node.js, Express.
  - **Data Visualization**: Three.js, D3.js, etc.
  - **Other**: Soft skills, tools, or languages.
- **Skill Bars or Charts**:
  - Visual representation of proficiency levels.

#### Implementation Details

- **Component**: `SkillsSection.tsx`
- **UI Components Used**:
  - `Progress` bars to indicate proficiency.
  - `HoverCard` to display more information on hover.
- **Styling**:
  - Use icons for each skill (e.g., logos of programming languages).
  - Organize skills in responsive grids.
- **Interactivity**:
  - On hover, display additional details or recent projects using that skill.
- **Accessibility**:
  - Ensure that proficiency indicators are not solely based on color.

### 3.5 Experience Section

#### Description

Outlines your professional history, including roles, responsibilities, and achievements.

#### Elements

- **Section Title**: "Experience" or "Work History".
- **Timeline or List of Positions**:
  - **Job Title**: Your position.
  - **Company Name and Logo**: Visual branding.
  - **Dates of Employment**: Start and end dates.
  - **Responsibilities**: Brief bullet points.
  - **Achievements**: Notable accomplishments or metrics.
- **Technologies Used**: Tags or icons.

#### Implementation Details

- **Component**: `ExperienceSection.tsx`
- **UI Components Used**:
  - `Avatar` for company logos.
  - Custom `Timeline` component (create if needed) to visually represent the career path.
- **Styling**:
  - Use vertical timeline on desktop and a simplified list on mobile.
- **Content Strategy**:
  - Focus on achievements and impact rather than just duties.
- **Accessibility**:
  - Ensure timeline is navigable via keyboard.

### 3.6 Blog Section

#### Description

A platform to share knowledge, thoughts, and industry insights, demonstrating expertise and engagement with current trends.

#### Elements

- **Section Title**: "Blog" or "Latest Posts".
- **List of Recent Posts**:
  - **Title**: Catchy headline.
  - **Date Published**.
  - **Excerpt**: Brief summary or introduction.
  - **Read More Link**: Navigates to the full post.
- **Categories or Tags**: To organize content.

#### Implementation Details

- **Component**: `BlogSection.tsx`
- **Data Handling**:
  - Use Markdown files, a headless CMS (like Contentful), or static data for posts.
  - For dynamic content, set up Next.js dynamic routes (e.g., `[slug].tsx`).
- **UI Components Used**:
  - `Card` component for each post.
- **Styling**:
  - Consistent formatting for titles and excerpts.
  - Responsive design to adjust the number of posts per row.
- **SEO Considerations**:
  - Use meta tags and structured data for posts.
- **Accessibility**:
  - Ensure links are descriptive.

### 3.7 Testimonials and Endorsements

#### Description

Showcases positive feedback from colleagues, clients, or supervisors, adding credibility and a personal touch.

#### Elements

- **Section Title**: "Testimonials" or "What Others Say".
- **Testimonials**:
  - **Quote**: The testimonial text.
  - **Name**: Person who gave the testimonial.
  - **Title and Company**: Their professional details.
  - **Photo**: Optional headshot.
- **Carousel or Grid Layout**: Depending on the number of testimonials.

#### Implementation Details

- **Component**: `TestimonialsSection.tsx`
- **UI Components Used**:
  - `Carousel` for sliding through testimonials.
  - `Card` or `HoverCard` for individual testimonials.
- **Styling**:
  - Emphasize the quote using typography.
  - Use consistent photo sizes and shapes.
- **Content Strategy**:
  - Select testimonials that highlight different strengths or aspects of your work.
- **Accessibility**:
  - Ensure text is readable and high-contrast.

### 3.8 Contact Section

#### Description

Provides a way for visitors to get in touch, whether for job opportunities, collaborations, or general inquiries.

#### Elements

- **Section Title**: "Contact Me" or "Get in Touch".
- **Contact Form**:
  - **Name**: Input field.
  - **Email**: Input field.
  - **Subject**: Input field (optional).
  - **Message**: Textarea for detailed messages.
  - **Submit Button**: To send the message.
- **Contact Information**:
  - **Email Address**: Clickable to open mail client.
  - **Phone Number**: Optional.
  - **Social Media Links**: Icons linking to profiles.
- **Map**: Optional, if location is relevant.

#### Implementation Details

- **Component**: `ContactSection.tsx`
- **UI Components Used**:
  - `Input` fields.
  - `Button` for submission.
- **Form Handling**:
  - Use `react-hook-form` for form state management.
  - Validate inputs with `yup` or `zod`.
  - On submit, send data to `pages/api/sendEmail.ts`.
- **Email Service**:
  - Implement email sending via `emailService.ts` using EmailJS or another service.
- **Styling**:
  - Arrange form fields clearly.
  - Indicate required fields.
- **Accessibility**:
  - Associate labels with inputs.
  - Provide error messages for validation.

### 3.9 Chatbot Integration

#### Description

An interactive assistant to engage visitors, answer questions, and provide information tailored to their interests. The chatbot will be implemented using a Python backend for secure API key management and efficient processing.

#### Elements

- **Chatbot Icon/Button**: Floating action button to open the chatbot interface.
- **Chat Interface**:
  - **Conversation Flow**:
    - Different paths based on user type (recruiter, hiring manager, peer).
    - Ability to ask questions about projects, skills, or availability.
- **Message Input**: Field to type responses.
- **Message Display**: Shows conversation history.

#### Implementation Details

- **Frontend Component**: `Chatbot.tsx`
- **UI Components Used**:
  - `Input` for message input.
  - `ScrollArea` for conversation history.
  - `Button` for sending messages and toggling the chatbot.
- **State Management**:
  - Use `useState` for managing local state (isOpen, messages, userInput).
  - Implement session management using `localStorage` or cookies.
- **Backend Integration**:
  - Python backend using FastAPI to handle chatbot interactions.
  - API endpoint: `/api/chatbot` (POST method).
  - Secure handling of OpenAI API keys on the server-side.
- **Styling**:
  - Keep the interface minimal and unobtrusive.
  - Use animations for opening/closing the chatbot interface.
- **Accessibility**:
  - Ensure focus management when the chatbot is opened.
  - Provide ARIA labels and roles for screen reader compatibility.

#### Additional Considerations

- **Security**: Implement rate limiting and input sanitization.
- **Performance**: Use asynchronous processing in the backend.
- **Testing**: Conduct unit tests for both frontend and backend components.

For detailed implementation guidelines, security considerations, and the full technical architecture, please refer to the comprehensive Chatbot PRD in `chatbot-instructions.md`.

### 3.10 Responsive Design

#### Description

Ensuring the website is usable and visually appealing on all devices and screen sizes.

#### Implementation Details

- **Mobile First Approach**:
  - Design layouts for small screens first, then enhance for larger screens.
- **Breakpoints**:
  - Use Tailwind CSS default breakpoints or customize as needed.
- **Testing**:
  - Regularly test the site on devices of various sizes or use browser developer tools to simulate.
- **Navigation**:
  - Implement a hamburger menu for mobile navigation if necessary.
- **Touch Interactions**:
  - Ensure interactive elements are appropriately sized for touch inputs.

---

## 4. Additional Features

### 4.1 Dark Mode

#### Implementation Details

- **Component**: `Toggle.tsx` in `components/ui/`
- **State Management**:
  - Use a custom hook `useTheme` to manage theme state.
  - Store the user's preference in `localStorage` or cookies.
- **Styling**:
  - Utilize Tailwind CSS's dark mode classes.
  - Define color schemes for both light and dark themes in `tailwind.config.ts`.

### 4.2 Social Media Integration

#### Implementation Details

- **Components**:
  - Use `IconButton` components (create if necessary) with icons from `@heroicons/react`.
- **Links**:
  - Include links to LinkedIn, GitHub, Twitter, etc.
- **Placement**:
  - Include in the footer or a dedicated section.

### 4.3 SEO Optimization

#### Implementation Details

- **Meta Tags**:
  - Use Next.js `Head` component to set `title`, `description`, and `keywords`.
- **Open Graph Tags**:
  - Include `og:title`, `og:description`, `og:image`, etc., for better social media sharing.
- **Sitemap and robots.txt**:
  - Generate a sitemap using `next-sitemap`.
  - Configure `robots.txt` to guide search engine crawlers.
- **Content Strategy**:
  - Incorporate relevant keywords naturally in content.
  - Regularly update the blog section.

### 4.4 Performance Optimization

#### Implementation Details

- **Image Optimization**:
  - Use Next.js `Image` component for responsive images and automatic optimization.
  - Serve images in WebP format when supported.
- **Code Splitting**:
  - Use dynamic imports with `next/dynamic` for components like the chatbot or 3D visualizations.
- **Caching**:
  - Utilize HTTP caching headers.
  - Implement `getStaticProps` and `getStaticPaths` for static generation where appropriate.
- **Minification**:
  - Ensure production builds minify CSS and JavaScript.

### 4.5 Security Enhancements

#### Implementation Details

- **HTTPS**:
  - Ensure SSL certificates are properly configured.
- **Content Security Policy**:
  - Set CSP headers to prevent XSS attacks.
- **Input Validation**:
  - Validate and sanitize all inputs on both client and server sides.
- **Secure API Communication**:
  - Use HTTPS for all API requests.
  - Store API keys securely using environment variables.

### 4.6 Accessibility Improvements

#### Implementation Details

- **Contrast Ratios**:
  - Use tools to check color contrast ratios meet WCAG guidelines.
- **Keyboard Navigation**:
  - Ensure all interactive elements can be accessed via keyboard.
- **Screen Reader Compatibility**:
  - Use semantic HTML elements.
  - Provide `aria-labels` and `role` attributes where necessary.
- **Focus Indicators**:
  - Ensure focus states are visible when navigating via keyboard.

---

## 5. Technical Details

### 5.1 Frontend

- **Framework**: Next.js with TypeScript.
- **Styling**: Tailwind CSS, shadcn/ui components.
- **Animations**: Framer Motion.
- **3D Visualization**: Three.js with React Three Fiber.
- **Chatbot**: Integration with OpenAI's GPT-4 via secure API routes.
- **Form Handling**: `react-hook-form` with validation via `yup` or `zod`.
- **State Management**: React Hooks and Context API.

### 5.2 Backend

- **API Routes**:
  - `pages/api/sendEmail.ts`: Handles contact form submissions.
  - `pages/api/chatbot.ts`: Processes chatbot interactions.
- **Email Service**: EmailJS or alternative.
- **Data Fetching**: Use Next.js data fetching methods (`getStaticProps`, `getServerSideProps`) where needed.

## 8. Conclusion

This updated PRD provides specific and detailed descriptions on creating various sections and their elements, ensuring that each component and feature is clearly defined and actionable. By following this guide, you can structure your code effectively, maintain a clean and organized codebase, and build a comprehensive portfolio website that showcases your skills and projects.

---

**Note**: Remember to:

- **Avoid Code Duplication**: Reuse components and utilities wherever possible.
- **Maintain Consistent Styling**: Stick to a design system or style guide.
- **Document Your Code**: Comment complex logic and maintain clear naming conventions.
- **Test Thoroughly**: Ensure each component works in isolation and within the full application.

---

## 11. Accessibility and Internationalization

### 11.1 Accessibility (A11y)

- **WCAG Compliance**: Ensure the website meets WCAG 2.1 Level AA standards.
- **Semantic HTML**: Use appropriate HTML elements and ARIA attributes where necessary.
- **Keyboard Navigation**: Implement full keyboard navigation support.
- **Screen Reader Compatibility**: Test and optimize for popular screen readers.
- **Color Contrast**: Maintain proper color contrast ratios for text and interactive elements.

### 11.2 Internationalization (i18n)

- **Language Support**: Implement multi-language support using a library like `next-i18next`.
- **Content Translation**: Create a system for managing translated content in Supabase.
- **RTL Support**: Ensure layout supports right-to-left languages.
- **Date and Number Formatting**: Use locale-aware date and number formatting.
- **Currency Handling**: If applicable, implement proper currency conversion and display.

---

## 12. Monitoring and Error Handling

### 12.1 Application Monitoring

- **Error Tracking**: Integrate an error tracking service (e.g., Sentry, LogRocket).
- **Performance Monitoring**: Implement Real User Monitoring (RUM) to track frontend performance.
- **Server Monitoring**: Set up monitoring for API routes and serverless functions.
- **Database Monitoring**: Utilize Supabase's built-in monitoring tools and set up alerts.

### 12.2 Error Handling

- **Global Error Boundary**: Implement a React Error Boundary for graceful error handling.
- **API Error Responses**: Standardize error responses from API routes.
- **User-Friendly Error Messages**: Create a system for displaying user-friendly error messages.
- **Logging**: Implement comprehensive error logging for debugging purposes.

---

## 13. User Experience (UX) Considerations

### 13.1 Loading States

- **Skeleton Loaders**: Implement skeleton loaders for content that requires API calls.
- **Progressive Loading**: Use techniques like lazy loading for images and components.

### 13.2 Offline Support

- **Service Workers**: Implement service workers for basic offline functionality.
- **Offline-First Approach**: Consider implementing offline-first data management where applicable.

### 13.3 Responsive Design

- **Mobile-First Approach**: Ensure all features are fully functional on mobile devices.
- **Adaptive Components**: Design components that adapt to different screen sizes and orientations.

### 13.4 Performance

- **Code Splitting**: Utilize Next.js's built-in code splitting features.
- **Image Optimization**: Use Next.js Image component and Supabase storage transformations for optimized images.
- **Bundle Analysis**: Regularly analyze and optimize the JavaScript bundle size.

---

## 14. Compliance and Data Protection

### 14.1 GDPR Compliance

- **Data Collection Consent**: Implement a system for obtaining and managing user consent for data collection.
- **Data Access and Deletion**: Create processes for users to request access to or deletion of their data.
- **Privacy Policy**: Update the privacy policy to reflect data handling practices with Supabase integration.

### 14.2 Data Retention and Backup

- **Retention Policies**: Define and implement data retention policies for different types of data.
- **Backup Strategy**: Set up regular backups of Supabase data and develop a restoration process.

### 14.3 Third-Party Integrations

- **API Security**: Ensure secure handling of API keys and tokens for any third-party services.
- **Data Sharing**: Clearly document any data sharing with third-party services and obtain necessary consents.

---

## Appendix

[The Appendix section remains largely unchanged]

---

## Contact

For further questions or clarifications, please reach out to the project maintainer:

- **Name**: Rishab Singh
- **Email**: [rishabredhu@gmail.com](mailto:rishabredhu@gmail.com)
- **GitHub**: [github.com/rishabredhu](https://github.com/rishabredhu)

#Project Structure
..
├── pages
└── webpage
├── README.md
├── app
├── backend
├── components
├── components.json
├── instructions
├── lib
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pages
├── postcss.config.mjs
├── public
├── tailwind.config.ts
└── tsconfig.json

10 directories, 9 files
(.venv) rishabsingh@Rishabs-MacBook-Pro agent-portfolio % tree -L 4 -I 'node_modules|.git'
.
├── pages
└── webpage
├── README.md
├── app
│ ├── components
│ │ ├── AboutSection.tsx
│ │ └── Layout.tsx
│ ├── favicon.ico
│ ├── fonts
│ │ ├── GeistMonoVF.woff
│ │ └── GeistVF.woff
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── backend
│ ├── conversation_manager.py
│ ├── main.py
│ ├── requirements.txt
│ └── virtual
│ ├── bin
│ ├── include
│ ├── lib
│ └── pyvenv.cfg
├── components
│ ├── AboutSection.tsx
│ ├── BlogSection.tsx
│ ├── Chatbot.tsx
│ ├── ContactForm.tsx
│ ├── ExperienceSection.tsx
│ ├── Footer.tsx
│ ├── NavBar.tsx
│ ├── ProjectSection.tsx
│ ├── SkillsSection.tsx
│ ├── TestimonialsSection.tsx
│ └── ui
│ ├── InstancedTriangles.tsx
│ ├── KineticPointCloud.tsx
│ ├── alert-dialog.tsx
│ ├── avatar.tsx
│ ├── button.tsx
│ ├── card.tsx
│ ├── carousel.tsx
│ ├── hover-card.tsx
│ ├── input.tsx
│ ├── navigation-menu.tsx
│ ├── progress.tsx
│ ├── scroll-area.tsx
│ ├── skeleton.tsx
│ └── toggle.tsx
├── components.json
├── instructions
│ ├── chatbot-instructions.md
│ └── instructions.md
├── lib
│ ├── emailService.ts
│ └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pages
│ └── api
│ ├── chatbot.ts
│ └── sendEmail.ts
├── postcss.config.mjs
├── public
│ ├── 3d-assets
│ ├── images
│ │ ├── avatar.png
│ │ ├── project1.png
│ │ └── project2.png
│ └── videos
├── tailwind.config.ts
└── tsconfig.json

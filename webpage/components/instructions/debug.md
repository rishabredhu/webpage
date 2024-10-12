# Project Overview

This project is a personal website designed to showcase your portfolio, blog, and contact information. It leverages modern web technologies, including Next.js for the frontend, Python for backend services, and various UI components to enhance user experience.

## Directory Structure

Understanding the project structure is crucial for effective debugging. Below is an overview of the key directories and files:

```
webpage/
├── README.md
├── app/
│   ├── favicon.ico
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── chatbot_service.py
│   ├── conversation_manager.py
│   ├── main.py
│   ├── requirements.txt
│   └── virtual/
│       ├── bin/
│       ├── include/
│       ├── lib/
│       └── pyvenv.cfg
├── components/
│   ├── AboutSection.tsx
│   ├── BlogSection.tsx
│   ├── Chatbot.tsx
│   ├── ContactForm.tsx
│   ├── ErrorBoundary.tsx
│   ├── ExperienceSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── NavBar.tsx
│   ├── ProjectSection.tsx
│   ├── RecentActivity.tsx
│   ├── SkillsSection.tsx
│   ├── TestimonialsSection.tsx
│   └── ui/
│       ├── 3dtext.tsx
│       ├── DynamicBackground.tsx
│       ├── InstancedTriangles.tsx
│       ├── KineticPointCloud.tsx
│       ├── LiquidBorder.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── birds.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── face.tsx
│       ├── faces2.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       ├── retro-chatbot.tsx
│       ├── scroll-area.tsx
│       ├── skeleton.tsx
│       └── terminalUI.tsx
├── components.json
├── lib/
│   ├── emailService.ts
│   ├── mongodbClient.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pages/
│   └── api/
│       ├── chatbot.ts
│       ├── checkDbConnection.ts
│       ├── fetchBlogPosts.ts
│       ├── sendEmail.ts
│       └── storage.ts
├── postcss.config.mjs
├── public/
│   ├── 3d-assets/
│   ├── images/
│   │   ├── avatar.png
│   │   ├── eashan.webp
│   │   ├── profile1-depth.png
│   │   ├── profile1.jpeg
│   │   ├── rachana.png
│   │   ├── vishwa.png
│   │   ├── yash.jpg
│   │   └── yash.png
│   ├── json/
│   │   └── WaltHeadLo_buffergeometry.json
│   └── videos/
│       ├── kinect.mp4
│       ├── kinect.nfo
│       ├── kinect.webm
│       └── profile-photo.mp4
├── tailwind.config.ts
└── tsconfig.json
```

## General Debugging Guidelines

1. **Reproduce the Issue**: Ensure you can consistently reproduce the problem.
2. **Check Logs**: Review console logs, server logs, and browser developer tools for error messages.
3. **Isolate the Problem**: Narrow down the components or modules involved.
4. **Review Recent Changes**: Identify any recent code changes that might have introduced the issue.
5. **Use Version Control**: Utilize Git to track changes and revert to previous stable states if necessary.
6. **Consult Documentation**: Refer to official documentation for frameworks and libraries used.
7. **Seek Help**: If stuck, consult team members or seek assistance from developer communities.

## Frontend Debugging

### App Directory

Files of Interest:
- `layout.tsx`
- `page.tsx`
- `globals.css`

Common Issues:
- Layout Problems: Misalignment or styling issues.
- Routing Errors: Pages not rendering as expected.
- CSS Conflicts: Styles not applying correctly.

Debugging Steps:

1. Layout.tsx & Page.tsx:
   - Verify component hierarchy.
   - Ensure all necessary props are passed correctly.
   - Check for any conditional rendering that might prevent components from displaying.

2. Globals.css:
   - Inspect for CSS syntax errors.
   - Ensure that global styles do not unintentionally override component-specific styles.
   - Use browser developer tools to see applied styles and identify conflicts.

### Components

Directory: `components/`

Common Issues:
- Component Rendering: Components not displaying or updating correctly.
- State Management: Incorrect state leading to unexpected behavior.
- Prop Types: Mismatched or missing props causing errors.

Debugging Steps:

1. Identify Faulty Component:
   - Use console logs or breakpoints to trace component lifecycle.
   - Isolate the component to test independently.

2. Check Props and State:
   - Ensure all required props are provided.
   - Validate state initialization and updates.

3. Error Boundaries:
   - Utilize ErrorBoundary.tsx to catch and display component-specific errors.
   - Review error messages for insights.

4. UI Components:
   - For components under `components/ui/`, ensure that dependencies like Three.js (if used) are correctly configured.
   - Verify that interactive elements (e.g., buttons, inputs) respond as expected.

### Public Assets

Directory: `public/`

Common Issues:
- Missing Assets: Images, videos, or 3D assets not loading.
- Incorrect Paths: Broken links due to incorrect asset paths.
- Performance: Large assets causing slow load times.

Debugging Steps:

1. Verify Asset Paths:
   - Ensure that all asset URLs are correct relative to the public directory.
   - Use browser developer tools to check network requests for assets.

2. Check File Formats:
   - Confirm that the correct file formats are used and supported by browsers.
   - Replace or convert unsupported formats if necessary.

3. Optimize Assets:
   - Compress images and videos to reduce load times.
   - Utilize lazy loading for non-critical assets.

## Backend Debugging

### Backend Directory

Directory: `backend/`

Files of Interest:
- `main.py`
- `chatbot_service.py`
- `conversation_manager.py`
- `requirements.txt`

Common Issues:
- Server Errors: Application crashes or fails to start.
- Dependency Issues: Missing or incompatible packages.
- Logic Errors: Incorrect backend logic affecting frontend functionality.

Debugging Steps:

1. Check Server Logs:
   - Review logs generated by main.py and other backend scripts for error messages.

2. Verify Dependencies:
   - Ensure all packages listed in requirements.txt are installed in the virtual environment.
   - Run `pip install -r requirements.txt` to install missing dependencies.
   - Check for version compatibility issues.

3. Test Backend Services:
   - Isolate and test individual backend modules (chatbot_service.py, conversation_manager.py) to ensure they function correctly.
   - Use unit tests to validate functionality.

4. Virtual Environment:
   - Ensure the virtual environment is activated when running backend scripts.
   - Verify the pyvenv.cfg for correct Python version and paths.

### API Endpoints

Directory: `pages/api/`

Endpoints:
- `chatbot.ts`
- `checkDbConnection.ts`
- `fetchBlogPosts.ts`
- `sendEmail.ts`
- `storage.ts`

Common Issues:
- Endpoint Failures: APIs returning errors or not responding.
- Authentication Issues: Secure endpoints failing due to authentication problems.
- Data Handling: Incorrect data processing or database interactions.

Debugging Steps:

1. Test API Endpoints:
   - Use tools like Postman or cURL to send requests to each API endpoint.
   - Verify response codes and payloads.

2. Check Database Connections:
   - For checkDbConnection.ts and related endpoints, ensure that the database is reachable and credentials are correct.
   - Review lib/mongodbClient.ts for connection logic.

3. Email Services:
   - For sendEmail.ts, ensure that email service configurations (e.g., SMTP settings) are correct.
   - Test email sending functionality with sample data.

4. Chatbot Functionality:
   - For chatbot.ts, verify that chatbot_service.py and conversation_manager.py are operating as expected.
   - Check for any runtime errors in backend scripts.

## Configuration and Dependencies

### Package Management

Files:
- `package.json`
- `package-lock.json`

Common Issues:
- Dependency Conflicts: Incompatible package versions causing build failures.
- Missing Packages: Required packages not installed.

Debugging Steps:

1. Install Dependencies:
   - Run `npm install` to ensure all dependencies are installed as per package.json.

2. Check for Version Conflicts:
   - Review package.json and package-lock.json for conflicting versions.
   - Update or downgrade packages to resolve conflicts.

3. Audit for Vulnerabilities:
   - Use `npm audit` to identify and fix security vulnerabilities.

### Configuration Files

Files:
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `tsconfig.json`

Common Issues:
- Misconfigurations: Incorrect settings leading to build or runtime errors.
- Syntax Errors: Typographical mistakes in configuration files.

Debugging Steps:

1. Review Configuration Settings:
   - Ensure that all settings in next.config.mjs align with project requirements.
   - Verify Tailwind CSS configurations in tailwind.config.ts for correct theming and plugins.

2. Validate Syntax:
   - Use linters or code editors with syntax highlighting to identify errors.
   - Correct any identified syntax issues.

3. TypeScript Configuration:
   - Check tsconfig.json for proper TypeScript settings.
   - Ensure that paths and compiler options are correctly set to prevent type errors.

## Common Issues and Solutions

### 1. Build Failures

Symptoms:
- Errors during `npm run build`.
- Missing modules or syntax errors.

Solutions:
- Check console logs for specific error messages.
- Ensure all dependencies are installed and compatible.
- Validate configuration files for syntax errors.

### 2. Styling Issues

Symptoms:
- CSS not applying as expected.
- Layout breaks on different screen sizes.

Solutions:
- Inspect elements using browser developer tools to identify missing or overridden styles.
- Verify Tailwind CSS configuration for correct utility classes.
- Ensure responsive design principles are correctly implemented.

### 3. API Endpoint Errors

Symptoms:
- 500 Internal Server Errors.
- Unexpected responses from APIs.

Solutions:
- Review server logs for detailed error messages.
- Test endpoints individually to isolate issues.
- Validate input data and ensure proper error handling in backend scripts.

### 4. Performance Bottlenecks

Symptoms:
- Slow page load times.
- Unresponsive UI elements.

Solutions:
- Optimize images and media assets for faster loading.
- Implement code splitting and lazy loading where appropriate.
- Use performance profiling tools to identify and address bottlenecks.
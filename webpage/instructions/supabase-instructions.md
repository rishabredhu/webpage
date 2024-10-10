Certainly. I'll convert the document to markdown format for you.

````markdown
# Product Requirements Document (PRD): Personal Portfolio Website with Supabase

**Version**: 2.4  
**Date**: October 8, 2024  
**Author**: Rishab Singh

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Structure Overview](#2-project-structure-overview)
3. [Supabase Integration Requirements](#3-supabase-integration-requirements)
   - 3.1 Content Management
   - 3.2 User Authentication
   - 3.3 Analytics
   - 3.4 File Storage
4. [Backend Architecture](#4-backend-architecture)
   - 4.1 API Routes
   - 4.2 Supabase Client
   - 4.3 Real-time Updates
5. [Security Considerations](#5-security-considerations)
6. [Performance Optimization](#6-performance-optimization)
7. [Error Handling and Logging](#7-error-handling-and-logging)
8. [Scalability and Load Handling](#8-scalability-and-load-handling)
9. [Testing and Deployment](#9-testing-and-deployment)
10. [Documentation](#10-documentation)
11. [SEO and Metadata Management](#11-seo-and-metadata-management)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction

This document provides a detailed guide for the development of **Rishab Singh's** personal portfolio website, focusing on the **Supabase integration**. Supabase will handle content management, user authentication, analytics, and file storage, all while ensuring scalability and security.

---

## 2. Project Structure Overview

The current web portfolio is built using **Next.js** with **TypeScript**. It includes blog posts, project showcases, testimonials, and a chatbot.

---

## 3. Supabase Integration Requirements

### Overview

Supabase will manage:

- **Content Management** for blog posts, projects, and testimonials.
- **Analytics** for tracking user interactions.
- **File Storage** for images and videos.

### 3.1 Content Management

#### Step-by-Step Implementation

**Create Database Tables**:

1. Log into the **Supabase** dashboard and create a new project.
2. Navigate to the **SQL Editor** and create the following tables:

create table
users (
id uuid primary key default uuid_generate_v4 (),
username text not null unique,
email text not null unique,
created_at TIMESTAMPTZ default now()
);

create table
blog_posts (
id uuid primary key default uuid_generate_v4 (),
title text not null,
content text not null,
author_id uuid references users (id),
published_at TIMESTAMPTZ default now(),
tags text[],
slug text unique not null,
excerpt text,
featured_image_url text
);

create table
projects (
id uuid primary key default uuid_generate_v4 (),
title text not null,
description text not null,
technologies text[],
github_url text,
demo_url text,
image_url text,
created_at TIMESTAMPTZ default now(),
updated_at TIMESTAMPTZ default now()
);

-- Testimonials table
create table
testimonials (
id uuid primary key default uuid_generate_v4 (),
quote text not null,
author_name text not null,
author_title text,
company text,
author_image_url text,
created_at TIMESTAMPTZ default now()
);

**API Routes**:

- **Blog Posts**:

  - `GET /api/blog`: Fetch a list of published blog posts.
  - `GET /api/blog/[slug]`: Fetch a specific post by its slug.
  - `POST /api/blog`: Create a new blog post (authenticated users).
  - `PUT /api/blog/[id]`: Update an existing blog post (authenticated users).
  - `DELETE /api/blog/[id]`: Delete a blog post (authenticated users).

- **Projects**:
  - `GET /api/projects`: Fetch all projects.
  - `GET /api/projects/[id]`: Fetch a specific project.
  - `POST /api/projects`: Add a new project (authenticated users).
  - `PUT /api/projects/[id]`: Update a project (authenticated users).
  - `DELETE /api/projects/[id]`: Delete a project (authenticated users).

**Frontend Integration**:

- Create **React components** for listing and displaying individual blog posts, projects, and testimonials.
- Fetch data from Supabase using **Supabase Client**.

```typescript
// Example of fetching blog posts
import { supabaseClient } from "../lib/supabaseClient";

export async function getBlogPosts() {
  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
```
````

### 3.2 User Authentication

#### Step-by-Step Implementation

1. **Enable Authentication**:  
   In the Supabase dashboard, enable **email/password authentication**. You can also add third-party OAuth providers (like Google or GitHub) if needed.
2. **Create Roles**:
   Supabase offers **Row-Level Security (RLS)** to enforce role-based access control. Enable RLS and create policies that grant the appropriate permissions for **admin** and **public** users.

```sql
-- Enable RLS on tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can modify blog posts"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (true);
```

**Authentication API Routes**:

- `POST /api/auth/login`: Log in a user.
- `POST /api/auth/logout`: Log out a user.
- `GET /api/auth/user`: Get the current authenticated user.

**Frontend Integration**:

- Use **Supabase Auth** to handle login, logout, and user sessions.

```typescript
// Example of logging in a user
import { supabaseClient } from "../lib/supabaseClient";

export async function signInWithEmail(email: string, password: string) {
  const { user, error } = await supabaseClient.auth.signIn({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
```

## TODO

### 3.3 Analytics

#### Step-by-Step Implementation

1. **Create Analytics Tables**:
   Set up tables to track user page views and interactions.

```sql
-- Page views table
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- User interactions table
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  element TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);
```

2. **API Routes**:
   - `POST /api/analytics/page-view`: Log page views.
   - `POST /api/analytics/interaction`: Log user interactions.

**Frontend Integration**:

- Capture page views and interactions, then send the data to the backend.

```typescript
// Example of logging a page view
export async function logPageView(url: string) {
  const { error } = await supabaseClient
    .from("page_views")
    .insert([
      { url, user_agent: navigator.userAgent, ip_address: "123.45.67.89" },
    ]);

  if (error) {
    throw new Error(error.message);
  }
}
```

### 3.4 File Storage

#### Step-by-Step Implementation

1. **Create Storage Buckets**:  
   In the Supabase dashboard, create storage buckets for **images** and **videos**.

2. **API Routes**:
   - `POST /api/storage/upload`: Upload files to Supabase Storage.
   - `GET /api/storage/file`: Retrieve file URLs for images or videos.

**Frontend Integration**:

- Use Supabase's file upload API to handle file storage.

```typescript
// Example of uploading an image
export async function uploadFile(file: File) {
  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(`public/${file.name}`, file);

  if (error) {
    throw new Error(error.message);
  }

  return data.Key;
}
```

---

## 4. Backend Architecture

### 4.1 API Routes

All backend routes are implemented in **Next.js API routes** under the `pages/api` directory.

### 4.2 Supabase Client

The Supabase client is configured for both client-side and server-side interactions.

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

### 4.3 Real-time Updates

Leverage Supabase's real-time capabilities for content updates like blog posts or testimonials.

```typescript
// Subscribe to real-time changes in blog posts
useEffect(() => {
  const subscription = supabaseClient
    .from("blog_posts")
    .on("*", (payload) => updateBlogPosts(payload.new))
    .subscribe();

  return () => supabaseClient.removeSubscription(subscription);
}, []);
```

---

## 5. Security Considerations

1. **Row Level Security (RLS)**:  
   Ensure RLS policies are in place to enforce role-based access control for content and file uploads.
2. **Input Validation**:  
   All API inputs should be validated to prevent SQL injection or XSS attacks.

3. **Environment Variables**:  
   Store sensitive information like API keys in environment variables.

---

## 6. Performance Optimization

1. **Database Indexing**:  
   Add indexes on frequently queried columns, such as `slug` in blog posts.

2. **Caching**:  
   Use **getStaticProps** with **ISR** to cache pages that don't change frequently.

3. **Real-Time Subscriptions**:  
   Use Supabase real-time features to subscribe to changes in blog posts and other content.

---

## 7. Error Handling and Logging

1. **Standard Error Responses**:  
   Define clear error responses for API endpoints, such as **400**, **401**, **403**, and **500** errors.
2. **Logging**:  
   Implement logging for both successful transactions and errors to aid in debugging and monitoring.

---

## 8. Scalability and Load Handling

1. **Scaling Supabase**:  
   Supabase scales automatically, but consider optimizing query performance and adding connection pooling.
2. **Containerization**:  
   Use **Docker** for easier deployment and scalability of the backend services.

---

## 9. Testing and Deployment

1. **Unit Testing**:  
   Write tests for API routes using **Jest** or **Mocha**.
2. **Continuous Deployment**:  
   Set up CI/CD pipelines using **GitHub Actions** or **CircleCI** for automated testing and deployment.

---

## 10. Documentation

1. **API Documentation**:  
   Use tools like **Swagger** or **Postman** to document API routes.

2. **Developer Setup**:  
   Provide a developer guide for setting up the project and Supabase locally.

---

## 11. SEO and Metadata Management

1. **Meta Tags**:  
   Implement dynamic meta tags for blog posts to improve SEO.

2. **Sitemap and Robots.txt**:  
   Generate a sitemap and configure **robots.txt** for better search engine indexing.

---

## 12. Conclusion

This PRD provides a comprehensive guide for integrating **Supabase** into the personal portfolio website. It covers the core functionalities required for content management, authentication, analytics, and file storage, ensuring the website is scalable, secure, and easy to manage.

```

```

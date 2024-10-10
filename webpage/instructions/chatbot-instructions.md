# Product Requirements Document (PRD): Chatbot Integration Using Python

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Objectives](#2-objectives)
3. [Scope](#3-scope)
4. [Functional Requirements](#4-functional-requirements)
   - [4.1 User Interface](#41-user-interface)
   - [4.2 Conversation Flow](#42-conversation-flow)
   - [4.3 Backend Integration](#43-backend-integration)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Technical Architecture](#6-technical-architecture)
   - [6.1 Frontend Components](#61-frontend-components)
   - [6.2 Backend Components](#62-backend-components)
7. [Implementation Plan](#7-implementation-plan)
   - [7.1 Setting Up the Python Backend](#71-setting-up-the-python-backend)
   - [7.2 Implementing the API](#72-implementing-the-api)
   - [7.3 Frontend Integration](#73-frontend-integration)
8. [Security Considerations](#8-security-considerations)
9. [Performance Optimization](#9-performance-optimization)
10. [Testing and Quality Assurance](#10-testing-and-quality-assurance)
11. [Deployment](#11-deployment)
12. [Maintenance and Support](#12-maintenance-and-support)
13. [Conclusion](#13-conclusion)

---

## 1. Introduction

This document outlines the requirements and implementation plan for integrating a chatbot into the personal portfolio website. The chatbot aims to engage visitors by answering questions and providing tailored information based on user interests. The backend will be developed using Python to handle interactions with the OpenAI GPT-4 model securely and efficiently.

---

## 2. Objectives

- **Enhance User Engagement**: Provide an interactive assistant to improve visitor experience.
- **Tailored Conversations**: Offer different conversational paths based on user types (recruiter, hiring manager, peer).
- **Secure Integration**: Ensure secure handling of API keys and user data.
- **Maintainability**: Build a modular and scalable backend system that can be easily maintained and extended.

---

## 3. Scope

- Develop a Python backend to handle chatbot interactions.
- Integrate the backend with the existing frontend built with Next.js and React.
- Ensure the chatbot interface is accessible and user-friendly.
- Implement necessary security measures to protect user data and API keys.

---

## 4. Functional Requirements

### 4.1 User Interface

- **Chatbot Icon/Button**: A floating action button (FAB) that is always visible on the website, allowing users to open the chatbot interface.
- **Chat Interface**:
  - **Conversation Window**: A modal or sidebar that displays the conversation history.
  - **Message Input Field**: Allows users to type and send messages.
  - **Send Button**: To submit the message (optional if using "Enter" key for submission).
- **Animations**: Smooth animations for opening and closing the chatbot interface.

### 4.2 Conversation Flow

- **User Identification**: Optionally, the chatbot may ask for the user's name to personalize the conversation.
- **User Type Determination**:
  - The chatbot should identify if the user is a recruiter, hiring manager, or peer based on the conversation.
- **Dynamic Responses**:
  - Provide different responses and information based on the user type.
  - Answer questions about projects, skills, availability, etc.
- **Conversation History**: Display past messages so users can refer back during the conversation.

### 4.3 Backend Integration

- **API Endpoint**:
  - A secure API endpoint to handle incoming messages and return responses from the GPT-4 model.
- **Message Processing**:
  - Receive user messages from the frontend.
  - Send the messages to the GPT-4 model with appropriate context.
  - Return the generated response to the frontend.
- **State Management**:
  - Maintain conversation state to provide context in ongoing conversations.
  - Use session IDs or tokens to track individual user conversations.

---

## 5. Non-Functional Requirements

- **Performance**:
  - Minimize latency between user input and chatbot response.
  - Ensure the backend can handle multiple concurrent users.
- **Security**:
  - Protect API keys and sensitive data.
  - Implement rate limiting to prevent abuse.
- **Scalability**:
  - Design the backend to allow for future enhancements.
- **Accessibility**:
  - Ensure the chatbot interface is operable via keyboard and screen readers.
  - Provide ARIA labels and roles where necessary.

---

## 6. Technical Architecture

### 6.1 Frontend Components

- **Chatbot.tsx**: Main component handling the chatbot UI.
  - **States**:
    - `isOpen`: Boolean indicating if the chatbot interface is open.
    - `messages`: Array of message objects containing sender and content.
    - `userInput`: String holding the current input from the user.
  - **Functions**:
    - `toggleChatbot()`: Opens or closes the chatbot interface.
    - `handleSendMessage()`: Sends the user's message to the backend API.
    - `handleUserInputChange()`: Updates `userInput` as the user types.
  - **UI Elements**:
    - **Chatbot Icon/Button**: Triggers `toggleChatbot()`.
    - **Chat Window**:
      - **Message Display Area**: Uses `ScrollArea` to show conversation history.
      - **Message Input**: Uses `Input` component for user text input.
      - **Send Button**: Uses `Button` component to submit the message.

### 6.2 Backend Components

- **Python Web Framework**: Use **FastAPI** for building the API endpoint due to its performance and ease of integration with async IO.
- **API Endpoint**:
  - **Endpoint**: `/api/chatbot`
  - **Methods**: `POST`
  - **Request Body**:
    - `session_id`: String (to track conversation context).
    - `message`: String (user's input).
  - **Response**:
    - `reply`: String (chatbot's response).
- **Session Management**:
  - Use in-memory storage (e.g., a dictionary) or a database (e.g., Redis) to store conversation history per `session_id`.
- **OpenAI Integration**:
  - Use the `openai` Python library to interact with the GPT-4 model.
  - Ensure API keys are stored securely using environment variables or a secrets manager.

---

## 7. Implementation Plan

### 7.1 Setting Up the Python Backend

1. **Initialize the Python Environment**:

   - Create a new directory for the backend, e.g., `backend/`.
   - Set up a virtual environment using `venv` or `conda`.
   - Install necessary dependencies:
     ```bash
     pip install fastapi uvicorn openai python-multipart
     ```

2. **Project Structure**:

   ```
   backend/
   ├── main.py
   ├── requirements.txt
   ├── utils.py
   └── conversation_manager.py
   ```

3. **Configure Environment Variables**:
   - Store the OpenAI API key in an environment variable, e.g., `OPENAI_API_KEY`.
   - Use a `.env` file or a secrets manager.

### 7.2 Implementing the API

1. **main.py**:

   - Import FastAPI and create an instance.
   - Define the `/api/chatbot` endpoint with `POST` method.
   - Parse incoming requests to extract `session_id` and `message`.
   - Use the `conversation_manager` to handle conversation state.

2. **Conversation Management**:

   - **conversation_manager.py**:
     - Implement functions to store and retrieve conversation history based on `session_id`.
     - If using in-memory storage, be aware that it will not persist across server restarts.
     - Consider using a lightweight database like Redis for production.

3. **Interacting with OpenAI API**:

   - In `utils.py` or within `conversation_manager.py`, create a function to send messages to the GPT-4 model.
   - Pass the conversation history to provide context.
   - Handle errors and exceptions gracefully.

4. **Response Handling**:

   - Receive the GPT-4 response.
   - Update the conversation history.
   - Return the response to the frontend in JSON format.

5. **Running the Server**:

   - Use Uvicorn to run the FastAPI app.
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 8000
     ```

6. **CORS Configuration**:
   - If the backend and frontend are on different domains or ports, configure CORS to allow requests from the frontend.

### 7.3 Frontend Integration

1. **Update API Endpoint**:

   - In `Chatbot.tsx`, change the API endpoint to point to the Python backend, e.g., `http://localhost:8000/api/chatbot`.

2. **Modify `handleSendMessage()` Function**:

   - Send a POST request to the Python API endpoint.
   - Include `session_id` and `message` in the request body.
   - Update the conversation state based on the API response.

3. **Session Management on Frontend**:

   - Generate a unique `session_id` for each user when they first interact with the chatbot.
   - Store `session_id` in the browser's `localStorage` or a cookie.

4. **Error Handling**:
   - Handle cases where the backend is unreachable.
   - Display appropriate messages to the user in case of errors.

---

#TODO

## 8. Security Considerations

- **API Key Protection**:

  - Do not expose the OpenAI API key in the frontend or client-side code.
  - Ensure the key is only used on the server side.

- **Input Validation**:

  - Sanitize user inputs to prevent injection attacks.
  - Limit the length of messages to prevent abuse.

- **Rate Limiting**:

  - Implement rate limiting on the API endpoint to prevent spam and excessive usage.

- **HTTPS**:

  - Use HTTPS for all communications between the frontend and backend, especially in production.

- **Session Security**:
  - Ensure that `session_id`s are sufficiently random and not guessable.
  - Consider using UUIDs for session identifiers.

---

## 9. Performance Optimization

- **Asynchronous Processing**:
  - Use async functions in FastAPI to handle requests without blocking.
- **Connection Pooling**:

  - Reuse connections to the OpenAI API if possible.

- **Response Caching**:

  - If appropriate, cache responses for repeated questions to reduce API calls (be cautious with dynamic content).

- **Load Balancing**:
  - For high traffic, consider running multiple instances of the backend behind a load balancer.

---

## 10. Testing and Quality Assurance

- **Unit Testing**:

  - Write tests for API endpoints using frameworks like `pytest`.
  - Mock the OpenAI API responses for consistent testing.

- **Integration Testing**:

  - Test the end-to-end flow between the frontend and backend.

- **Usability Testing**:

  - Ensure the chatbot is intuitive and responds appropriately.

- **Accessibility Testing**:
  - Verify that the chatbot interface meets accessibility standards (e.g., WCAG).

---

## 11. Deployment

- **Containerization**:

  - Use Docker to containerize the Python backend for consistent deployment environments.

- **Cloud Hosting**:

  - Deploy the backend on a cloud service provider (e.g., AWS EC2, Heroku, Google Cloud Run).

- **Environment Variables in Production**:

  - Securely manage environment variables using the hosting platform's secret management.

- **CI/CD Pipeline**:
  - Set up a continuous integration and deployment pipeline for automatic testing and deployment upon code changes.

---

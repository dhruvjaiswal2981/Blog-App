# Blog Application

## Description
This project is a simple blog application with a backend API built using Express and SQLite, and a frontend built using React. The application allows users to create, read, update, and delete blog posts. The backend handles data persistence and API endpoints, while the frontend provides a user interface for interacting with the blog.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [Frontend Details](#frontend-details)
6. [License](#license)

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
Install the required dependencies:

bash

npm install

# Create the SQLite database file and Posts table: The backend code will automatically create a database.sqlite file and the posts table when you run the server if they do not already exist.

Start the backend server:

bash

npm start

- The server will be running on http://localhost:5000.

# Frontend Setup
Navigate to the frontend directory:

bash

cd frontend
Install the required dependencies:

bash

npm install
Start the React application:

bash

npm start
- The React application will be running on http://localhost:3000.

Running the Application
Start the Backend Server: Ensure the backend server is running on port 5000. This server provides the API endpoints for managing blog posts.

Start the Frontend Application: Ensure the React application is running on port 3000. This application interfaces with the backend to display and manage blog posts.

Access the Application: Open your web browser and navigate to http://localhost:3000 to use the application.

How It Works

# Backend

Express Server: Manages API routes and connects to the SQLite database.
SQLite Database: Stores blog posts with fields for id, title, and content.

- API Endpoints:

GET /posts: Retrieves all blog posts.
GET /posts/:id: Retrieves a specific blog post by ID.
POST /posts: Creates a new blog post.
PUT /posts/:id: Updates an existing blog post by ID.
DELETE /posts/:id: Deletes a blog post by ID.

# Frontend

React Application: Provides a user interface for interacting with blog posts.

Pages:

Home Page (/): Displays a list of all blog posts with options to edit or delete.
Create Blog Page (/create): Provides a form to create a new blog post.

State Management:

Posts: Loaded from the backend and displayed on the home page.

Form Inputs: Used to create or edit blog posts.
User Interaction

View Blogs: The home page lists all blog posts. Users can view the title and content, and can edit or delete posts.

Create Blog: Users can navigate to the /create page to enter a title and content for a new blog post. Submitting the form creates a new post in the backend.

Edit Blog: On the home page, users can click "Edit" to update an existing blog post. Changes are sent to the backend and reflected in the UI.

Delete Blog: Users can delete a blog post, which removes it from both the frontend and the backend.
API Endpoints

# GET /posts
Description: Retrieves all posts from the database.
Response: Array of blog post objects.

# GET /posts/
Description: Retrieves a single post by its ID.
Parameters:
id: ID of the post to retrieve.
Response: Single blog post object.

# POST /posts
Description: Creates a new blog post.
Request Body:
title: Title of the blog post.
content: Content of the blog post.
Response: Created blog post object with assigned ID.

# PUT /posts/
Description: Updates an existing blog post by its ID.
Parameters:
id: ID of the post to update.
Request Body:
title: Updated title of the blog post.
content: Updated content of the blog post.
Response: Updated blog post object.

# DELETE /posts/
Description: Deletes a blog post by its ID.
Parameters:
id: ID of the post to delete.
Response: Success message.
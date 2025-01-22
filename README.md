------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The COM3102-Project is a full-stack web application that allows students to efficiently manage academic resources such as assignments, chat with peers, share references, and receive friend suggestions. Below is a meticulous breakdown of its key components, technologies, and file purposes:

Concepts and Features:
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Authentication (JWT):
Purpose: Securely authenticate users by issuing a JSON Web Token (JWT) upon login. Tokens are stored in the client (browser’s local storage) and verified on the server for protected routes.
Files Involved:
Backend: auth.php handles login, verifying credentials against the database, and generating JWT.
Frontend: Login.tsx captures user credentials and communicates with the backend to receive the token.
Frameworks and Tools: PHP (for backend logic), JWT (for token generation), and React (for client-side token storage).
RESTful APIs:

Purpose: Enable communication between the frontend and backend for operations like user registration, fetching data, and updating resources.
Files Involved:
Backend:
getMessages.php, sendMessage.php (Chat operations).
getAssignments.php, addAssignment.php (Assignment management).
register.php, getUserProfile.php, updateUserProfile.php (User operations).
Frontend:
api.ts abstracts API calls for modular and reusable communication.
Languages: PHP (server-side scripting), TypeScript (frontend requests).
Frontend Development:

Purpose: Create an intuitive and responsive user interface for user interactions.
Files Involved:
Core: App.tsx defines application routes for components like Home, Login, and Profile.
Components:
Navbar.tsx: Handles navigation links and authentication state.
AssignmentForm.tsx, References.tsx: Enable assignment and reference management.
Chat.tsx: Displays user-to-user chat functionality.
Frameworks and Tools: React (for component-based architecture), TailwindCSS (for styling), TypeScript (for type safety).
Database (MySQL):

Purpose: Store user data, assignments, messages, and references persistently.
Files Involved:
schema.sql: Defines the database schema, including tables for users, assignments, messages, and references.
connect.php: Establishes a database connection.
Tools: MySQL (database engine), XAMPP (local server for MySQL and Apache).
File Uploads:

Purpose: Allow users to upload and retrieve academic references.
Files Involved:
UploadReference.tsx: Implements the frontend form for file uploads.
uploadReference.php: Processes and stores files on the backend.
Tools: PHP (handles file uploads), MySQL (stores file metadata).
Testing (Postman):

Purpose: Validate API endpoints for reliability and correctness during development.
Process:
Used Postman to send requests to backend endpoints like addAssignment.php and getUserProfile.php and check the responses.
Styling (TailwindCSS):

Purpose: Ensure a visually appealing and consistent UI.
Files Involved:
globals.css, components.css: Define global and component-specific styles using Tailwind utility classes.
Configured via tailwind.config.js."

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
##Important Links and Instructions

1) Place the extracted project zip file in XAMPP  htdocs folder - C:\xampp\htdocs

2) Run Apache and MySql in Xampp 

3) Checking the database and the tables: http://localhost/phpmyadmin/index.php

4) Please create a database com3102_project and then import our file “schema.sql” to get our entire database and the tables in it.

5) Place the extracted zip file in Xampp htdocs-  C:\xampp\htdocs

6) Running the app path:  cd   C:\xampp\htdocs\COM3102-Project\frontend\app

7) Now Command to run the app: npm start

8) To check the uploaded file, the uploads path: C:\xampp\htdocs\COM3102-Project\public\uploads

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Versions

XAMPP - 8.2.12 / PHP 8.2.12

Download XAMPP


Technologies Used
Backend: PHP, MySQL (via XAMPP for local hosting), JWT (for secure authentication), Dotenv (for environment management).
Frontend: React, TypeScript, Tailwind CSS (for UI styling).
API Testing: Postman.
Database: MySQL, with schema defined in schema.sql.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

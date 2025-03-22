# DebugZilla

DebugZilla is a comprehensive code review tool designed to streamline the process of identifying, analyzing, and resolving issues in software projects. It combines real-time debugging capabilities with advanced AI-powered code analysis to help developers write better, more efficient, and error-free code.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

DebugZilla offers a wide range of features to enhance the debugging and development experience:

### Core Features
- **AI-Powered Code Review**: Leverage AI to analyze your code for potential issues, security vulnerabilities, and optimization opportunities.
- **Grade System**: Get a grade for your code based on various metrics like performance, readability, and complexity.
- **Complexity Analysis**: Get Time Complexity and Space Complexity analysis for your code.

### Additional Features
- **User Authentication**: Secure user registration, login, and profile management.
- **Submission Management**: Submit, view, and manage code submissions for review.
- **Cross-Platform Support**: Works seamlessly across different operating systems and environments.

---

## Project Structure

The project is organized into the following directories:

```
debugzilla/
├── backend/          # Backend server code
│   ├── controllers/  # API controllers
│   ├── db/           # Database connection
│   ├── middlewares/  # Middleware functions
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── app.js        # Express app setup
├── frontend/         # Frontend client code
│   ├── src/          # React application source
│   ├── public/       # Static assets
│   ├── index.html    # HTML entry point
│   └── vite.config.js # Vite configuration
├── .gitignore        # Git ignore file
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

---

## Installation

To set up DebugZilla on your local machine, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend database)
- Google Gemini API Key (for AI-powered code analysis)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/debugzilla.git
   cd debugzilla
   ```

2. **Install dependencies**:
   ```bash
   npm run ia
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend/` directory with the following variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     GEMINI_API_KEY=<your-gemini-api-key>
     CORS_ORIGIN=http://localhost:5173
     NODE_ENV=development
     ```
   - Create a `.env` file in the `frontend/` directory with the following variable:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. **Start the application**:
   ```bash
   npm run dev
   ```
    This will start both the frontend and backend servers concurrently.

5. **Access the application**:
   Open your browser and navigate to `http://localhost:5173` to start using DebugZilla.

---

## Scripts

The following scripts are available in the project:

- `npm run ia`: Installs dependencies for both the frontend and backend.
- `npm run dev`: Starts both the frontend and backend servers concurrently.
- `npm run frontend`: Starts the frontend development server.
- `npm run backend`: Starts the backend server.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **TailwindCSS**: For styling.
- **Vite**: For fast development and build tooling.
- **Axios**: For making HTTP requests.
- **React Router**: For client-side routing.

### Backend
- **Node.js**: For server-side JavaScript.
- **Express.js**: For building the REST API.
- **MongoDB**: For database storage.
- **Mongoose**: For object data modeling (ODM).
- **JWT**: For secure authentication.
- **Google Gemini API**: For AI-powered code analysis.

---

## Contributing

We welcome contributions from the community! To contribute:

1. Create a personal fork of the project on Github.
2. Clone the fork on your local machine.
3. Add a new remote to the original repository.
4. Create a new branch for your feature or bug fix.
5. Make changes to the codebase.
6. Commit your changes to the new branch.
7. Push your changes to the remote repository.
8. Create a new pull request on Github.
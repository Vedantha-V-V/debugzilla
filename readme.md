# DebugZilla

DebugZilla is a comprehensive debugging and code review tool designed to streamline the process of identifying, analyzing, and resolving issues in software projects. It combines real-time debugging capabilities with advanced AI-powered code analysis to help developers write better, more efficient, and error-free code.

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
- **Real-Time Debugging**: Monitor and debug your application in real-time with live updates.
- **AI-Powered Code Review**: Leverage AI to analyze your code for potential issues, security vulnerabilities, and optimization opportunities.
- **Customizable Filters**: Focus on specific logs, errors, or warnings using advanced filtering options.
- **Error Tracking**: Automatically detect and track errors across your application.
- **Performance Monitoring**: Identify bottlenecks and optimize your application for better performance.

### Additional Features
- **User Authentication**: Secure user registration, login, and profile management.
- **Code Execution**: Execute code snippets directly within the application and view the results.
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
│   └── config/       # Configuration files
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

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/debugzilla.git
   cd debugzilla
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend/` directory with the following variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```
   - Create a `.env` file in the `frontend/` directory with the following variable:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

---

## Usage

### Running the Application
1. Start the backend server:
   ```bash
   npm run backend
   ```
   The backend will run on `http://localhost:5000`.

2. Start the frontend development server:
   ```bash
   npm run frontend
   ```
   The frontend will be accessible at `http://localhost:5173`.

3. Open your browser and navigate to the frontend URL to start using DebugZilla.

---

## Scripts

The following scripts are available in the project:

- `npm run dev`: Starts both the frontend and backend servers concurrently.
- `npm run frontend`: Starts the frontend development server.
- `npm run backend`: Starts the backend server.
- `npm run build`: Builds the frontend for production.
- `npm run test`: Runs the test suite.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **TailwindCSS**: For styling.
- **Vite**: For fast development and build tooling.

### Backend
- **Node.js**: For server-side JavaScript.
- **Express.js**: For building the REST API.
- **MongoDB**: For database storage.
- **Mongoose**: For object data modeling (ODM).
- **JWT**: For secure authentication.

### Additional Tools
- **Google Generative AI SDK**: For AI-powered code analysis.
- **ESLint & Prettier**: For code linting and formatting.

---

## Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository**:
   Click the "Fork" button on the repository page.

2. **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```

3. **Make your changes**:
   Implement your feature or fix the bug.

4. **Commit your changes**:
   ```bash
   git commit -m "Add feature-name"
   ```

5. **Push to your branch**:
   ```bash
   git push origin feature-name
   ```

6. **Open a pull request**:
   Submit your pull request for review.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact 

<!-- For questions, feedback, or support, please contact us at [support@debugzilla.com](mailto:support@debugzilla.com). -->

You can also visit our [GitHub repository](https://github.com/hemanthcodecrit50/debugzilla) for more information.
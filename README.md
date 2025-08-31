# CI/CD Node.js Demo Application

A simple Node.js Express application demonstrating a complete CI/CD pipeline using GitHub Actions.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## 🎯 Project Overview

This project demonstrates:
- A simple Express.js web server
- Automated testing with custom test suite
- Complete CI/CD pipeline using GitHub Actions
- Best practices for Node.js development and deployment

## ✨ Features

- **Express.js Server**: Simple web server with multiple endpoints
- **Health Checks**: Built-in health monitoring endpoint
- **JSON API**: RESTful API endpoints for user management
- **Error Handling**: Comprehensive error handling middleware
- **Testing**: Custom test suite with multiple test cases
- **CI/CD Pipeline**: Automated build, test, and deployment workflow

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ci_cid_node
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

The server will start on `http://localhost:3000`

## 🔗 API Endpoints

### GET /
**Welcome endpoint**
- Returns basic app information and welcome message
- Response includes version, environment, and timestamp

### GET /health
**Health check endpoint**
- Used for monitoring and load balancer health checks
- Returns server status, uptime, and memory usage

### GET /api/users
**Get all users**
- Returns a list of mock users
- Demonstrates data retrieval endpoint

### POST /api/users
**Create a new user**
- Creates a new user with name and email
- Includes validation and error handling

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that runs on every push to the `main` branch and on pull requests.

### Pipeline Stages

#### 1. **Build Stage**
- Checks out the code from repository
- Sets up Node.js environment (version 20)
- Installs dependencies using `npm ci` (clean install)
- Runs the build script

#### 2. **Test Stage**
- Depends on successful build completion
- Sets up identical Node.js environment
- Installs dependencies
- Runs the complete test suite
- Ensures all tests pass before proceeding

#### 3. **Deploy Stage**
- Only runs on pushes to `main` branch
- Depends on successful test completion
- Includes placeholder for actual deployment commands
- In real scenarios, this would deploy to production servers

### Workflow Configuration

The pipeline is defined in `.github/workflows/ci-cd.yml` and includes:

- **Triggers**: Runs on push and pull requests to main branch
- **Environment**: Uses Ubuntu latest runner
- **Node.js Version**: Configured for Node.js 20
- **Dependencies**: Uses `npm ci` for faster, reliable installs
- **Sequential Jobs**: Build → Test → Deploy workflow

### Pipeline Benefits

- **Automated Quality Assurance**: Every code change is automatically tested
- **Consistent Environment**: Same Node.js version across all stages
- **Fast Feedback**: Developers get immediate feedback on code changes
- **Safe Deployments**: Only tested code reaches production
- **Visibility**: Full pipeline status visible in GitHub Actions tab

## 📁 Project Structure

```
ci_cid_node/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
├── test/
│   └── app.test.js           # Test suite
├── index.js                  # Main application file
├── package.json              # Project configuration and dependencies
└── README.md                 # This file
```

### File Descriptions

- **`index.js`**: Main Express.js application with all routes and middleware
- **`test/app.test.js`**: Custom test suite covering all endpoints
- **`package.json`**: Node.js project configuration with scripts and dependencies
- **`.github/workflows/ci-cd.yml`**: GitHub Actions workflow definition
- **`README.md`**: Comprehensive project documentation

## 🧪 Testing

The project includes a custom test suite that covers:

- ✅ Root endpoint functionality
- ✅ Health check endpoint
- ✅ User API endpoints (GET and POST)
- ✅ Error handling (404, validation errors)
- ✅ Response format validation

### Running Tests Locally

```bash
# Run the test suite
npm test

# Start the app for manual testing
npm start
```

### Test Coverage

The tests verify:
- HTTP status codes
- Response body structure
- Data validation
- Error handling
- API functionality

## 🔧 Development Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server (same as start in this demo)
- `npm run build` - Run build process (placeholder in this demo)
- `npm test` - Run the test suite
- `npm run test:coverage` - Run tests with coverage (placeholder)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

The CI/CD pipeline will automatically run on your Pull Request to ensure code quality.

## 📝 License

This project is licensed under the MIT License - see the package.json file for details.

## 🚀 Next Steps

To see the CI/CD pipeline in action:

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit with CI/CD pipeline"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **View the pipeline**: Go to your GitHub repository → Actions tab to see the pipeline running

The pipeline will automatically trigger and you'll see the build, test, and deploy stages executing in sequence.

---

**Happy coding!** 🎉

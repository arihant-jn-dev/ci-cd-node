# CI/CD Node.js Demo Application

A simple Node.js Express application demonstrating a complete CI/CD pipeline using GitHub Actions.

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Development Scripts](#-development-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Next Steps](#-next-steps)
- [Testing Pipeline Failures](#-testing-pipeline-failures)

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
│       ├── ci-cd.yml              # Main CI/CD pipeline (passing tests)
│       └── ci-cd-fail.yml         # Demo pipeline (failing tests) 🆕
├── test/
│   ├── app.test.js               # Passing test suite
│   └── fail.test.js              # Failing test suite 🆕
├── index.js                      # Main application file
├── package.json                  # Project configuration and dependencies
├── demo-controller.sh            # Interactive demo controller 🆕
├── demo.sh                       # Simple demo script
└── README.md                     # This file
```

### File Descriptions

- **`index.js`**: Main Express.js application with all routes and middleware
- **`test/app.test.js`**: Passing test suite covering all endpoints
- **`test/fail.test.js`**: 🆕 Failing test suite for CI/CD failure demonstration
- **`package.json`**: Node.js project configuration with scripts and dependencies
- **`.github/workflows/ci-cd.yml`**: Main GitHub Actions workflow (passing tests)
- **`.github/workflows/ci-cd-fail.yml`**: 🆕 Demo workflow for testing failures
- **`demo-controller.sh`**: 🆕 Interactive script to switch between scenarios
- **`README.md`**: Comprehensive project documentation

## 🧪 Testing

The project includes two test suites to demonstrate different CI/CD scenarios:

### ✅ Passing Tests (`test/app.test.js`)
- Root endpoint functionality
- Health check endpoint
- User API endpoints (GET and POST)
- Error handling (404, validation errors)
- Response format validation

### ❌ Failing Tests (`test/fail.test.js`)
- API contract breaking changes
- Status code validation failures
- Data structure validation failures
- Business logic failures
- Security test failures

### Running Tests Locally

```bash
# Run the passing test suite
npm test

# Run the failing test suite (to see pipeline failures)
npm run test:fail

# Start the app for manual testing
npm start

# Use the demo controller for easy switching
./demo-controller.sh
```

### Test Coverage

The tests verify:
- HTTP status codes
- Response body structure
- Data validation
- Error handling
- API functionality
- **Pipeline failure scenarios** 🆕

## 🔧 Development Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server (same as start in this demo)
- `npm run build` - Run build process (placeholder in this demo)
- `npm test` - Run the passing test suite
- `npm run test:fail` - Run the failing test suite (for CI/CD failure demo) 🆕
- `npm run test:coverage` - Run tests with coverage (placeholder)
- `./demo-controller.sh` - Interactive demo controller for switching between scenarios 🆕

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

## 💥 Testing Pipeline Failures

This project includes special failing tests to demonstrate how CI/CD pipelines handle failures and prevent broken deployments.

### 🎯 Why Test Failures?

Testing failure scenarios helps you understand:
- How pipelines prevent broken code from reaching production
- What happens when tests fail in different stages
- How to debug and fix pipeline issues
- The importance of comprehensive testing

### 🚀 Quick Demo: See Pipeline Failure in Action

1. **Use the demo controller:**
   ```bash
   ./demo-controller.sh
   ```
   Choose option 2 for "FAILING Pipeline"

2. **Or manually switch to failing tests:**
   ```bash
   # Backup current workflow
   cp .github/workflows/ci-cd.yml .github/workflows/ci-cd-backup.yml
   
   # Use failing workflow
   cp .github/workflows/ci-cd-fail.yml .github/workflows/ci-cd.yml
   
   # Commit and push
   git add .
   git commit -m "Test pipeline failure scenarios"
   git push origin main
   ```

3. **Watch the pipeline fail:**
   - Go to GitHub → Actions tab
   - See: ✅ Build → ❌ Test → 🚫 Deploy (skipped)
   - The deploy stage will be completely skipped

4. **Restore passing pipeline:**
   ```bash
   cp .github/workflows/ci-cd-backup.yml .github/workflows/ci-cd.yml
   git add .
   git commit -m "Restore passing pipeline"
   git push origin main
   ```

### 🔍 Failure Scenarios Included

The failing tests simulate real-world issues:

1. **API Contract Changes** - When API responses change unexpectedly
2. **Status Code Issues** - Wrong HTTP status codes
3. **Data Structure Problems** - Changed response formats
4. **Business Logic Errors** - Incorrect application behavior
5. **Security Vulnerabilities** - Missing input validation

### 📊 Understanding Pipeline Behavior

**Passing Pipeline Flow:**
```
Push to main → ✅ Build → ✅ Test → ✅ Deploy → 🎉 Success
```

**Failing Pipeline Flow:**
```
Push to main → ✅ Build → ❌ Test → 🚫 Deploy Skipped → 🛡️ Protected
```

This demonstrates the **safety net** that CI/CD provides!

---

**Happy coding!** 🎉

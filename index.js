/**
 * Simple Express.js Application
 * This is a basic web server that demonstrates CI/CD pipeline integration
 * 
 * Features:
 * - Basic HTTP server using Express.js
 * - Health check endpoint
 * - JSON API endpoint
 * - Error handling middleware
 */

const express = require('express');
const app = express();

// Configuration - Use environment variable or default to 3000
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for logging requests (simple custom logger)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Root endpoint
 * Returns a welcome message and basic app info
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CI/CD Node.js Demo App!',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

/**
 * Health check endpoint
 * Used by monitoring systems and load balancers to check if app is running
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

/**
 * API endpoint for demonstration
 * Shows how to handle different HTTP methods
 */
app.get('/api/users', (req, res) => {
  // Mock data - in real app, this would come from a database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

/**
 * POST endpoint example
 */
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }
  
  // Mock response - in real app, save to database
  const newUser = {
    id: Date.now(), // Simple ID generation
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

/**
 * Error handling middleware
 * Catches any unhandled errors and returns a proper response
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

/**
 * 404 handler for unknown routes
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

/**
 * Start the server
 * Only start if this file is run directly (not imported as module)
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${NODE_ENV}`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);
  });
}

// Export the app for testing purposes
module.exports = app;

//test comment
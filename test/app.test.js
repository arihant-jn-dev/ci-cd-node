/**
 * Simple Test Suite for the Express App
 * 
 * This is a basic test implementation without external testing frameworks
 * In production, you would use Jest, Mocha, or similar testing libraries
 */

const http = require('http');
const app = require('../index.js');

// Test configuration
const TEST_PORT = 3001;
let server;

/**
 * Simple assertion helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(`❌ Test failed: ${message}`);
  }
  console.log(`✅ ${message}`);
}

/**
 * Make HTTP request helper
 */
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, body: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Test: Root endpoint
 */
async function testRootEndpoint() {
  console.log('\n🧪 Testing root endpoint...');
  const response = await makeRequest('/');
  
  assert(response.status === 200, 'Root endpoint returns 200 status');
  assert(response.body.message, 'Root endpoint returns welcome message');
  assert(response.body.version === '1.0.0', 'Root endpoint returns correct version');
}

/**
 * Test: Health check endpoint
 */
async function testHealthEndpoint() {
  console.log('\n🧪 Testing health endpoint...');
  const response = await makeRequest('/health');
  
  assert(response.status === 200, 'Health endpoint returns 200 status');
  assert(response.body.status === 'healthy', 'Health endpoint returns healthy status');
  assert(typeof response.body.uptime === 'number', 'Health endpoint returns uptime');
}

/**
 * Test: Users API endpoint
 */
async function testUsersEndpoint() {
  console.log('\n🧪 Testing users API endpoint...');
  const response = await makeRequest('/api/users');
  
  assert(response.status === 200, 'Users endpoint returns 200 status');
  assert(response.body.success === true, 'Users endpoint returns success');
  assert(Array.isArray(response.body.data), 'Users endpoint returns array of users');
  assert(response.body.data.length === 2, 'Users endpoint returns correct number of users');
}

/**
 * Test: Create user endpoint
 */
async function testCreateUserEndpoint() {
  console.log('\n🧪 Testing create user endpoint...');
  const userData = { name: 'Test User', email: 'test@example.com' };
  const response = await makeRequest('/api/users', 'POST', userData);
  
  assert(response.status === 201, 'Create user endpoint returns 201 status');
  assert(response.body.success === true, 'Create user endpoint returns success');
  assert(response.body.data.name === userData.name, 'Create user endpoint returns correct name');
  assert(response.body.data.email === userData.email, 'Create user endpoint returns correct email');
}

/**
 * Test: 404 endpoint
 */
async function testNotFoundEndpoint() {
  console.log('\n🧪 Testing 404 endpoint...');
  const response = await makeRequest('/nonexistent');
  
  assert(response.status === 404, '404 endpoint returns 404 status');
  assert(response.body.success === false, '404 endpoint returns failure');
  assert(response.body.error === 'Route not found', '404 endpoint returns correct error message');
}

/**
 * Test: Invalid user creation
 */
async function testInvalidUserCreation() {
  console.log('\n🧪 Testing invalid user creation...');
  const invalidData = { name: 'Test User' }; // Missing email
  const response = await makeRequest('/api/users', 'POST', invalidData);
  
  assert(response.status === 400, 'Invalid user creation returns 400 status');
  assert(response.body.success === false, 'Invalid user creation returns failure');
  assert(response.body.error === 'Name and email are required', 'Invalid user creation returns correct error');
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🚀 Starting test suite...\n');
  
  try {
    // Start test server
    server = app.listen(TEST_PORT, () => {
      console.log(`Test server running on port ${TEST_PORT}`);
    });

    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 100));

    // Run all tests
    await testRootEndpoint();
    await testHealthEndpoint();
    await testUsersEndpoint();
    await testCreateUserEndpoint();
    await testNotFoundEndpoint();
    await testInvalidUserCreation();

    console.log('\n🎉 All tests passed!');
    process.exit(0);

  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up
    if (server) {
      server.close();
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

/**
 * Failing Test Cases for CI/CD Pipeline Demonstration
 * 
 * This file contains intentional failing tests to demonstrate how the CI/CD pipeline
 * handles failures and prevents broken code from being deployed.
 * 
 * Usage:
 * 1. To see passing pipeline: run `npm test` (uses app.test.js)
 * 2. To see failing pipeline: run `npm run test:fail` (uses this file)
 * 3. To simulate different failure scenarios, uncomment specific test groups below
 */

const http = require('http');
const app = require('../index.js');

// Test configuration
const TEST_PORT = 3002; // Different port to avoid conflicts
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
 * SCENARIO 1: API Contract Breaking Changes
 * These tests simulate what happens when API responses change unexpectedly
 */
async function testApiContractFailures() {
  console.log('\n💥 Testing API contract failures...');
  
  const response = await makeRequest('/');
  
  // This will fail - expecting wrong version number
  assert(response.body.version === '2.0.0', 'FAIL: Root endpoint returns version 2.0.0 (expected failure)');
  
  // This will fail - expecting different message structure
  assert(response.body.welcomeMessage, 'FAIL: Root endpoint returns welcomeMessage property (expected failure)');
}

/**
 * SCENARIO 2: Status Code Validation Failures
 * These tests simulate incorrect status code expectations
 */
async function testStatusCodeFailures() {
  console.log('\n💥 Testing status code failures...');
  
  const response = await makeRequest('/health');
  
  // This will fail - expecting wrong status code
  assert(response.status === 201, 'FAIL: Health endpoint returns 201 status (expected failure)');
}

/**
 * SCENARIO 3: Data Validation Failures
 * These tests simulate incorrect data structure expectations
 */
async function testDataValidationFailures() {
  console.log('\n💥 Testing data validation failures...');
  
  const response = await makeRequest('/api/users');
  
  // This will fail - expecting wrong number of users
  assert(response.body.data.length === 5, 'FAIL: Users endpoint returns 5 users (expected failure)');
  
  // This will fail - expecting different data structure
  assert(response.body.users, 'FAIL: Response has users property instead of data (expected failure)');
}

/**
 * SCENARIO 4: Network/Connection Simulation Failures
 * These tests simulate network issues or server problems
 */
async function testNetworkFailures() {
  console.log('\n💥 Testing network failures...');
  
  try {
    // This will fail - trying to connect to non-existent endpoint
    const response = await makeRequest('/this-endpoint-does-not-exist');
    assert(response.status === 200, 'FAIL: Non-existent endpoint returns 200 (expected failure)');
  } catch (error) {
    // This simulates a network error
    throw new Error('FAIL: Network connection failed (simulated failure)');
  }
}

/**
 * SCENARIO 5: Business Logic Failures
 * These tests simulate incorrect business rule implementations
 */
async function testBusinessLogicFailures() {
  console.log('\n💥 Testing business logic failures...');
  
  const userData = { name: 'Test User', email: 'test@example.com' };
  const response = await makeRequest('/api/users', 'POST', userData);
  
  // This will fail - expecting different response structure
  assert(response.body.user, 'FAIL: Create user returns user property instead of data (expected failure)');
  
  // This will fail - expecting different status for successful creation
  assert(response.status === 200, 'FAIL: User creation returns 200 instead of 201 (expected failure)');
}

/**
 * SCENARIO 6: Security Test Failures
 * These tests simulate security-related test failures
 */
async function testSecurityFailures() {
  console.log('\n💥 Testing security failures...');
  
  // Test for XSS vulnerability (simulated failure)
  const maliciousData = { 
    name: '<script>alert("xss")</script>', 
    email: 'test@example.com' 
  };
  
  const response = await makeRequest('/api/users', 'POST', maliciousData);
  
  // This will fail - expecting the app to sanitize input (but it doesn't in our simple demo)
  assert(!response.body.data.name.includes('<script>'), 'FAIL: XSS vulnerability detected (expected failure)');
}

/**
 * Main test runner with different failure scenarios
 */
async function runFailingTests() {
  console.log('💥 Starting FAILING test suite for CI/CD demonstration...\n');
  console.log('⚠️  These tests are designed to FAIL to show pipeline behavior\n');
  
  try {
    // Start test server
    server = app.listen(TEST_PORT, () => {
      console.log(`Test server running on port ${TEST_PORT}`);
    });

    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 100));

    // Choose which failure scenario to run
    // Uncomment ONE of the following lines to test different failure types:
    
    await testApiContractFailures();        // API breaking changes
    // await testStatusCodeFailures();         // Wrong status codes
    // await testDataValidationFailures();     // Wrong data structure
    // await testNetworkFailures();            // Network issues
    // await testBusinessLogicFailures();      // Business logic errors
    // await testSecurityFailures();           // Security vulnerabilities

    // This line should never be reached due to failing tests above
    console.log('\n🎉 All tests passed! (This should not happen)');
    process.exit(0);

  } catch (error) {
    console.error('\n💥 Test failed as expected:', error.message);
    console.log('\n📋 This demonstrates how CI/CD pipeline prevents broken deployments!');
    console.log('🔄 The pipeline will stop here and NOT deploy to production.');
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
  runFailingTests();
}

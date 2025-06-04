// Import necessary modules for testing
import request from 'supertest'; // For making HTTP requests to your Express app
import bcrypt from 'bcrypt'; // For hashing and comparing passwords

// Import app, sequelize, and the syncDatabase helper from your main application file
// This ensures that the database instance and the synchronization logic are consistent
// across your application and tests.
import { app, sequelize, syncDatabase } from '../app.js';

// Import the User model directly, as you'll need to create a test user
// before running the login tests.
import User from '../models/signUpUser.js';

/**
 * beforeAll Hook:
 * This hook runs once before all tests in this test suite.
 * It's used to set up the testing environment, specifically:
 * 1. Synchronizing the database: `syncDatabase({ force: true })` will drop existing tables
 * and recreate them based on your Sequelize model definitions. This ensures a clean
 * slate for each test run.
 * 2. Creating a test user: A known user is created in the database, which can then be
 * used by the login tests to verify authentication logic.
 */
beforeAll(async () => {
  try {
    // Call the syncDatabase helper from app.js.
    // The { force: true } option ensures that existing tables are dropped and recreated.
    // This is crucial for maintaining a clean and predictable test environment.
    await syncDatabase({ force: true });
    console.log('✅ Database synchronized successfully for login.test.js');

    // Hash a test password before creating the user.
    // This mimics how your application would store user passwords securely.
    const hashedPassword = await bcrypt.hash('testpassword', 10);

    // Create a new test user in the database.
    // This user will be used in the login tests to simulate a valid login attempt.
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      // Add other required fields if your User model has them with allowNull: false
      // For example: isPremiumUser: false, totalExpense: 0, totalIncome: 0
      isPremiumUser: false,
      totalExpense: 0,
      totalIncome: 0
    });
    console.log('✅ Test user "test@example.com" created successfully.');
  } catch (error) {
    // If any error occurs during setup (e.g., database connection failure, table creation issue),
    // log the error and re-throw it. Re-throwing ensures that Jest marks the 'beforeAll' hook
    // as failed, preventing subsequent tests from running against an improperly set up environment.
    console.error('❌ Error during database setup in login.test.js beforeAll:', error);
    throw error; // Essential to fail the test suite if setup fails
  }
});

/**
 * afterAll Hook:
 * This hook runs once after all tests in this test suite have completed.
 * It's used for cleanup, specifically:
 * 1. Closing the database connection: `sequelize.close()` releases the database connection,
 * which is good practice to prevent resource leaks and ensure a clean exit.
 */
afterAll(async () => {
  try {
    // Close the Sequelize database connection to free up resources.
    await sequelize.close();
    console.log('✅ Database connection closed after login.test.js');
  } catch (error) {
    console.error('❌ Error closing database connection after login.test.js:', error);
    // While less critical than beforeAll failure, logging is still useful.
  }
});

/**
 * Test Suite: POST /login/validiation
 * This block contains tests for the login validation endpoint.
 */
describe('POST /login/validiation', () => {

  /**
   * Test Case: Successful Login
   * Verifies that a valid email and password return a 200 status code
   * and include a success message and a token in the response body.
   */
  it('✅ return 200 if login is successful', async () => {
    // Send a POST request to the login endpoint with valid credentials.
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });

    // Assertions:
    // Expect a 200 OK status code.
    expect(res.statusCode).toBe(200);
    // Expect the 'success' property in the response body to be true.
    expect(res.body.success).toBe(true);
    // Expect the response body to contain a 'token' property.
    expect(res.body).toHaveProperty('token');
    console.log('✅ Login successful test passed.');
  });

  /**
   * Test Case: User Not Found
   * Verifies that an invalid email address returns a 404 status code
   * and an appropriate error message.
   */
  it('❌ return 404 if user not found', async () => {
    // Send a POST request with an email that does not exist in the database.
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'notfound@example.com',
        password: 'whatever' // Password doesn't matter here as user won't be found
      });

    // Assertions:
    // Expect a 404 Not Found status code.
    expect(res.statusCode).toBe(404);
    // Expect the response body message to indicate 'User not found'.
    expect(res.body.message).toBe('User not found');
    console.log('✅ User not found test passed.');
  });

  /**
   * Test Case: Wrong Password
   * Verifies that a correct email but incorrect password returns a 401 status code
   * and an appropriate error message.
   */
  it('❌ return 401 if password is wrong', async () => {
    // Send a POST request with a valid email but an incorrect password.
    const res = await request(app)
      .post('/login/validiation')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword' // Incorrect password for the test user
      });

    // Assertions:
    // Expect a 401 Unauthorized status code.
    expect(res.statusCode).toBe(401);
    // Expect the response body message to indicate 'Wrong password'.
    expect(res.body.message).toBe('Wrong password');
    console.log('✅ Wrong password test passed.');
  });
});
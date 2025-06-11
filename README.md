# FullstackExpense

FullstackExpense is a web application designed to help users manage their personal finances by tracking income and expenses. This project emphasizes a full-stack approach, utilizing a Node.js backend to serve a simple HTML, CSS, and JavaScript frontend, and integrating Firebase for authentication and database management. It also incorporates a robust DevOps pipeline for continuous integration and continuous deployment.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [CI/CD](#ci/cd)
  - [Continuous Integration (CI)](#continuous-integration-ci)
  - [Continuous Deployment (CD)](#continuous-deployment-cd)
- [SonarCloud Analysis](#sonarcloud-analysis)
- [License](#license)

## Features

* **User Authentication**: Secure sign-up and login using Firebase Authentication.
* **Expense Tracking**: Add, edit, and view income and expense transactions.
* **Balance Calculation**: Automatically calculates and displays current balance, total income, and total expenses.
* **Categorization**: Organize transactions by predefined categories (e.g., Food, Transport, Salary).
* **Filtering**: Filter transactions by type (income, expense, or all).
* **Responsive Design**: User interface adapted for various screen sizes.

## Installation

To get a local copy of the project up and running, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/yourusername/fullstackexpense.git](https://github.com/yourusername/fullstackexpense.git)
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd fullstackexpense
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up Firebase Environment Variables**:
    Create a `.env` file in the root directory and add your Firebase configuration details. You can find these in your Firebase project settings. An example structure would be:
    ```
    API_KEY="your-firebase-api-key"
    AUTH_DOMAIN="your-firebase-auth-domain"
    PROJECT_ID="your-firebase-project-id"
    STORAGE_BUCKET="your-firebase-storage-bucket"
    MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
    APP_ID="your-firebase-app-id"
    MEASUREMENT_ID="your-firebase-measurement-id"
    ```
    *Note: The `firebase-config.js` file already contains placeholder values, but it's recommended to use environment variables for sensitive information.*

5.  **Start the application**:
    ```bash
    npm start
    ```
    The server will start at `http://localhost:3000`. You will see a message like "🚀 Server running at http://localhost:3000" in your console.

6.  **Open in your browser**:
    Navigate to `http://localhost:3000` in your web browser.

## Usage

* **Sign Up**: Create a new account on the `signUp.html` page.
* **Log In**: Use your credentials to log in on the `login.html` page. Successful login redirects you to `expense.html`.
* **Expense Tracking**: Add new transactions, view a list of existing transactions, and see your updated balance on the `expense.html` page. You can also edit and delete entries.
* **Logout**: Click the "Logout" button to clear your session and return to the login page.

## Project Structure

The project is structured as follows:

* `app.js`: Configures the Express server to serve static files and the main landing page.
* `server.js`: The entry point for the Node.js backend, starting the Express server.
* `public/`: Contains all frontend assets:
    * `css/index.css`: Main stylesheet for the application.
    * `js/`: JavaScript files for frontend logic:
        * `expense.js`: Handles expense tracking functionality, including adding, fetching, updating, and deleting entries, and managing categories based on transaction type.
        * `firebase-config.js`: Initializes Firebase with your project's configuration.
        * `login.js`: Manages user login functionality.
        * `signup.js`: Manages user registration and stores user data in Firestore.
        * `utils.js`: Contains helper functions, such as `formatRupiah` for currency formatting.
    * `html/`: HTML pages:
        * `expense.html`: The main expense tracking dashboard.
        * `landing.html`: The initial landing page.
        * `login.html`: The user login page.
        * `signUp.html`: The user registration page.
* `__tests__/`: Contains unit and integration tests for various parts of the application:
    * `expense.test.js`: Tests Firebase `addDoc` calls for expense entries.
    * `formatRupiah.test.js`: Tests the `formatRupiah` utility function.
    * `login.test.js`: Tests Firebase `signInWithEmailAndPassword` calls for user login.
    * `logout.test.js`: Tests Firebase `signOut` and `localStorage` clearing on logout.
    * `server.test.js`: Tests the Express server routes.
    * `signup.test.js`: Tests Firebase `createUserWithEmailAndPassword` and `setDoc` for user registration.
* `.github/workflows/`: Contains GitHub Actions workflows for CI/CD.

## Testing

The project uses Jest for unit and integration testing.

To run the tests, use the following command:
```bash
npm test

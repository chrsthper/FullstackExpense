# FullstackExpense

FullstackExpense is a web application for managing personal expenses. It allows users to track their income and expenses, calculate balance, and categorize transactions. The application uses Firebase for authentication and database management, with a Node.js backend and a simple frontend built with HTML, CSS, and JavaScript.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [CI/CD](#cicd)
- [License](#license)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fullstackexpense.git
    ```
2. Navigate to the project directory:
    ```bash
    cd fullstackexpense
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables (if any):
    - Create a `.env` file in the root directory and add your Firebase credentials.

5. Start the application:
    ```bash
    npm start
    ```

6. Open `http://localhost:3000` in your browser to view the app.

## Usage
- **Sign Up**: Create a new account.
- **Log In**: Use your credentials to log in.
- **Expense Tracking**: Add, edit, and view your expenses.

## Project Structure
- `index.css`: Main stylesheet.
- `expense.js`, `login.js`, `signup.js`: JavaScript files for frontend logic.
- `expense.html`, `landing.html`, `login.html`, `signUp.html`: HTML pages.

## License
MIT License

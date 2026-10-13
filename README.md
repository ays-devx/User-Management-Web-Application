# User Management Web Application

A simple user management web application built with **Node.js, Express.js, EJS, and MySQL**. The project demonstrates how a web server can connect to a relational database, retrieve user records, display them in dynamic pages, and update a username after verifying the user's password.

## Features

- **Home page:** Displays the total number of user records.
- **View users:** Retrieves user records from MySQL and displays them in a table.
- **Edit username:** Opens an edit form for a selected user.
- **Password verification:** Checks the submitted password before allowing a username update.
- **Dynamic pages:** Uses EJS templates to render database information.
- **SQL database:** Stores user details in a MySQL table.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the server |
| Express.js | Handles HTTP routes and requests |
| EJS | Renders dynamic HTML pages |
| MySQL | Stores user records |
| `mysql2` | Connects the Node.js application to MySQL |
| `method-override` | Allows HTML forms to submit PATCH-style requests |
| `@faker-js/faker` | Can generate sample user data |
| Nodemon | Optional development tool for restarting the server |

## Project Structure

```text
dev-practise/
├── index.js              # Express server, routes, and database queries
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Locked dependency versions
├── schema.sql            # SQL table definition
└── views/
    ├── home.ejs          # Home page and user count
    ├── show.ejs          # User listing page
    └── edit.ejs          # Username editing form
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Getting Started

### 1. Download or clone the repository

```bash
git clone <your-repository-url>
cd dev-practise
```

If you downloaded the project as a ZIP, extract it and open the project folder in your terminal.

### 2. Install dependencies

```bash
npm install
```

### 3. Create the database and table

Open MySQL and run the following SQL. This creates the database and the `temp` table expected by the application.

```sql
CREATE DATABASE IF NOT EXISTS delta_app;
USE delta_app;

CREATE TABLE IF NOT EXISTS temp (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```



### 4. Configure the database connection

Do not publish your real database password in source code. Update `index.js` to read connection settings from environment variables. For example:

```js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "delta_app",
  password: process.env.DB_PASSWORD
});
```

Set the environment variables in your terminal before starting the app. Example for macOS/Linux:

```bash
export DB_HOST=localhost
export DB_USER=root
export DB_NAME=delta_app
export DB_PASSWORD='your-local-mysql-password'
```

For Windows PowerShell:

```powershell
$env:DB_HOST="localhost"
$env:DB_USER="root"
$env:DB_NAME="delta_app"
$env:DB_PASSWORD="your-local-mysql-password"
```

If you use a `.env` file, install `dotenv`, load it at the start of `index.js` with `require("dotenv").config()`, and add `.env` to `.gitignore`.

### 5. Start the application

The project currently listens on port `3000`. Run:

```bash
node index.js
```

For development, Nodemon can be used:

```bash
npx nodemon index.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Displays the total number of records |
| GET | `/users` | Displays the user list |
| GET | `/users/:id/edit` | Opens the edit form for a selected user |
| PATCH | `/user/:id` | Verifies the submitted password and updates the username |

The edit form uses `method-override` to send a PATCH request through an HTML form.

## How It Works

1. The browser sends a request to the Express server.
2. Express matches the URL to a route in `index.js`.
3. The route executes a SQL query through `mysql2`.
4. MySQL returns the requested data.
5. Express passes the result to an EJS template.
6. EJS renders HTML, which the server sends back to the browser.
7. When a username edit is submitted, the server checks the password and updates the database if the check succeeds.

## Sample Data

The project includes commented-out code using `@faker-js/faker` to generate sample users. You can adapt that code to insert test records into the `temp` table. Do not use generated or plain-text passwords as a production authentication system.

## Security Notes

This is a learning project and should be improved before production use:

- **Never commit database credentials.** Use environment variables and rotate any credential that has already been published.
- **Use parameterized SQL queries.** Avoid inserting request values directly into SQL strings, as this can lead to SQL injection.
- **Do not display passwords.** The current user listing renders password values; remove that column and never return password hashes to ordinary pages.
- **Hash passwords.** Use a password-hashing library such as `bcrypt` or `argon2`; compare submitted passwords against hashes rather than storing plain-text passwords.
- **Validate and handle errors.** Validate user input and return appropriate HTTP status codes without exposing internal error details.
- **Use proper authentication and authorization.** Verifying a user's password alone does not establish that the requester is authorized to edit that account.

## Current Scope

This project is intended for learning basic backend development concepts, including routing, database connectivity, SQL queries, server-side rendering, and form submission. It is not yet a production-ready authentication or account-management system.

## Future Improvements

- Add user creation and deletion features.
- Add input validation and clear success/error messages.
- Use parameterized queries throughout.
- Add secure password hashing and authentication.
- Add automated tests and a documented configuration process.
- Improve the UI with responsive styling.

## License

No open-source license has been specified yet. Add a `LICENSE` file if you intend to distribute this project under a particular license.

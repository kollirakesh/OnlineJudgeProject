# Algo Auth Online Compiler Project

## Project Overview

This project is a full-stack web application that provides:
- **User Authentication** (Register/Login) using JWT tokens
- **Online Code Compiler** supporting C, C++, Java, and Python
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB

Users can register, log in, and access an online compiler interface to write and execute code in multiple languages. Authentication is enforced for protected routes.

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)
- Python, GCC, G++, and Java (JDK) installed on the server for code execution

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd algo_auth
```

### 2. Server Setup

```sh
cd server
npm install
```

- Create a `.env` file in the `server` directory with the following content:
  ```
  MONGODB_URI=<your-mongodb-uri>
  SECRET_KEY=<your-secret-key>
  ```

- Start the server:
  ```sh
  npm run dev
  ```
  The server runs on `http://localhost:8000`.

### 3. Client Setup

```sh
cd ../client
npm install
```

- Start the client:
  ```sh
  npm run dev
  ```
  The client runs on `http://localhost:5173`.

---

## Usage

1. Open `http://localhost:5173` in your browser.
2. Register a new account or log in with existing credentials.
3. After login, access the Online Compiler.
4. Select a language, write code, and run it. Output will be displayed below the editor.

---

## Project Structure


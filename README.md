# Project Workflow

This document describes the backend development workflow for the project.

---

## 1. Create the Server

- Initialize the Node.js project.

```bash
npm init -y
```

- Install the required dependencies.

```bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cookie-parser
```

- Install development dependency.

```bash
npm install --save-dev nodemon
```

- Create the entry file.

```
backend/
│
├── index.js
```

- Set up the Express server.

```javascript
import express from "express";

const app = express();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
```

---

## 2. Connect the Database

- Create a configuration folder.

```
backend/
│
├── config/
│   └── db.js
```

- Create a MongoDB connection using Mongoose.

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
```

- Call the database connection function in `index.js`.

```javascript
import connectDB from "./config/db.js";

connectDB();
```

---

## 3. Create Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Add the following to `.gitignore`.

```gitignore
backend/.env
backend/node_modules/
```

---

## 4. Create Models

- Create the models folder.

```
backend/
│
├── models/
│   └── user.model.js
```

- Define the MongoDB schema.

Example:

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
```

---

## 5. Create Controllers

- Create the controller folder.

```
backend/
│
├── controller/
│   └── auth.controller.js
```

- Controllers handle the business logic.

Example:

```javascript
export const register = async (req, res) => {
    // registration logic
};

export const login = async (req, res) => {
    // login logic
};
```

Responsibilities:

- User Registration
- User Login
- Password Hashing
- Authentication Logic
- Error Handling

---

## 6. Generate JWT Token

- Create a utility folder.

```
backend/
│
├── utils/
│   └── token.js
```

Example:

```javascript
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export default generateToken;
```

The token is used for:

- User Authentication
- Protected Routes
- Session Management

---

## 7. Project Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controller/
│   └── auth.controller.js
│
├── middleware/
│
├── models/
│   └── user.model.js
│
├── routes/
│
├── utils/
│   └── token.js
│
├── .env
├── index.js
├── package.json
└── package-lock.json
```

---

## Backend Workflow

```
Create Server
      ↓
Connect Database
      ↓
Create Environment Variables
      ↓
Create Models
      ↓
Create Controllers
      ↓
Generate JWT Token
      ↓
Create Routes
      ↓
Add Middleware (Authentication)
      ↓
Test APIs
      ↓
Frontend Integration
```

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cookie-parser
- Nodemon

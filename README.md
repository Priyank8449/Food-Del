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





# Current User Authentication Flow

The application uses JWT-based authentication with cookies to fetch the currently logged-in user's details.

## Backend Flow

### 1. `isAuth` Middleware

* Collects the JWT token from `req.cookies.token`.
* Verifies the token using `jwt.verify()` and `JWT_SECRET`.
* Extracts the `userId` from the decoded token.
* Stores the `userId` in `req.userId`.
* Calls `next()` to continue the request lifecycle.

```js
req.userId = decodedToken.userId;
next();
```

---

### 2. `getCurrentUser` Controller

* Receives the `userId` from `req.userId`.
* Checks whether the `userId` exists.
* Uses `User.findById(userId)` to fetch the user's details from MongoDB.
* Returns the user object as a JSON response.

```js
const user = await User.findById(userId);

return res.status(200).json(user);
```

---

### 3. User Routes

The `/current` route is protected using the `isAuth` middleware.

```js
userRouter.get("/current", isAuth, getCurrentUser);
```

#### Request Flow

```text
Frontend
   ↓
GET /api/user/current
   ↓
isAuth Middleware
   ↓
Extract Token from Cookie
   ↓
Verify JWT
   ↓
Get userId
   ↓
getCurrentUser Controller
   ↓
User.findById(userId)
   ↓
Return User Details (JSON)
```

---

## Frontend Flow

### 1. Custom Hook (`useGetCurrentUser`)

* Executes when the application loads.
* Sends a GET request to `/api/user/current`.
* Includes cookies using `withCredentials: true`.
* Receives the logged-in user's details.
* Stores or logs the response for further use.

```js
const result = await axios.get(
    `${serverUrl}/api/user/current`,
    {
        withCredentials: true,
    }
);
```

---

### 2. Hook Usage

The custom hook is called inside `App.jsx`:

```js
const App = () => {
    useGetCurrentUser();

    return (
        <Routes>
            {/* Routes */}
        </Routes>
    );
};
```

---

## Complete Flow Diagram

```text
User Logs In
     ↓
JWT Token Generated
     ↓
Token Stored in Cookie
     ↓
Frontend Calls useGetCurrentUser()
     ↓
GET /api/user/current
     ↓
isAuth Middleware
     ↓
Read Token from Cookie
     ↓
Verify Token
     ↓
Extract userId
     ↓
getCurrentUser Controller
     ↓
User.findById(userId)
     ↓
Return User Data
     ↓
Frontend Receives User Details
     ↓
Store/Display User Information
```

This flow ensures that every authenticated request can securely identify the currently logged-in user and provide their information throughout the application.


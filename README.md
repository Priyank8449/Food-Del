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



# Authentication Workflow

## 1. Sign Up Workflow

### Backend Flow

1. User enters:

   * Full Name
   * Email
   * Password
   * Mobile Number
   * Role (User / Owner / Delivery Boy)

2. Frontend sends a `POST` request to:

```bash
/api/auth/signup
```

3. Backend (`signUp` controller):

   * Checks if the user already exists.
   * Validates:

     * Password length (minimum 6 characters).
     * Mobile number length (10 digits).
   * Hashes the password using `bcryptjs`.
   * Creates a new user in MongoDB.
   * Generates a JWT token using `genToken()`.
   * Stores the token inside an HTTP-only cookie.
   * Returns the created user.

### Route

```javascript
POST /api/auth/signup
```

---

## 2. Sign In Workflow

### Backend Flow

1. User enters:

   * Email
   * Password

2. Frontend sends:

```bash
POST /api/auth/signin
```

3. Backend (`signIn` controller):

   * Finds the user by email.
   * Compares the entered password with the hashed password using `bcrypt.compare()`.
   * Generates a JWT token.
   * Stores the token in cookies.
   * Returns the user data.

### Route

```javascript
POST /api/auth/signin
```

---

## 3. Google Authentication Workflow

### Frontend Flow

1. User clicks **Sign in with Google**.

2. Firebase's `signInWithPopup()` opens a Google authentication popup.

3. Firebase returns:

   * User Email
   * User Name

4. Frontend sends:

```bash
POST /api/auth/google-auth
```

with:

```javascript
{
    fullName,
    email,
    mobile,
    role
}
```

### Backend Flow

1. Check whether the user exists in MongoDB.
2. If the user does not exist:

   * Create a new user.
3. Generate a JWT token.
4. Store the token inside cookies.
5. Return the authenticated user.

### Route

```javascript
POST /api/auth/google-auth
```

---

## 4. Sign Out Workflow

### Backend Flow

1. User clicks Sign Out.
2. Frontend calls:

```bash
GET /api/auth/signout
```

3. Backend:

   * Clears the JWT cookie using `clearCookie()`.
   * Returns a success message.

### Route

```javascript
GET /api/auth/signout
```

---

## 5. Forgot Password Workflow

This feature uses **Nodemailer** for sending OTP emails.

### Step 1: Send OTP

#### Frontend

User enters their email and clicks **Send OTP**.

```bash
POST /api/auth/send-otp
```

#### Backend

1. Check if the user exists.
2. Generate a random 4-digit OTP.
3. Store:

   * `resetOtp`
   * `OtpExpires`
   * `isOtpVerified = false`
4. Send the OTP using Nodemailer.
5. Return success.

---

### Step 2: Verify OTP

#### Frontend

User enters the OTP.

```bash
POST /api/auth/verify-otp
```

#### Backend

1. Find the user.
2. Verify:

   * OTP matches.
   * OTP has not expired.
3. Update:

```javascript
isOtpVerified = true;
resetOtp = undefined;
OtpExpires = undefined;
```

4. Return success.

---

### Step 3: Reset Password

#### Frontend

User enters:

* New Password
* Confirm Password

```bash
POST /api/auth/reset-password
```

#### Backend

1. Verify that `isOtpVerified` is `true`.
2. Hash the new password using `bcryptjs`.
3. Update the user's password.
4. Reset:

```javascript
isOtpVerified = false;
```

5. Save changes.
6. Redirect the user to the Sign In page.

---

## 6. Current User Workflow

### Middleware (`isAuth`)

1. Extract JWT token from cookies.

```javascript
const token = req.cookies.token;
```

2. Verify the token.

```javascript
jwt.verify(token, process.env.JWT_SECRET);
```

3. Extract `userId`.

```javascript
req.userId = decodeToken.userId;
```

4. Call `next()`.

---

### Controller (`getCurrentUser`)

1. Get the user ID from `req.userId`.
2. Find the user in MongoDB.

```javascript
User.findById(userId);
```

3. Return user details.

---

### Route

```javascript
GET /api/user/current
```

---

### Frontend Custom Hook

A custom hook (`useGetCurrentUser`) runs when the application loads.

```javascript
useEffect(() => {
    axios.get(
        `${serverUrl}/api/user/current`,
        { withCredentials: true }
    );
}, []);
```

#### Flow

```text
App.jsx
   ↓
useGetCurrentUser()
   ↓
GET /api/user/current
   ↓
isAuth Middleware
   ↓
JWT Verification
   ↓
Extract userId
   ↓
getCurrentUser Controller
   ↓
User.findById()
   ↓
Return User Data
   ↓
Store/Display User Details
```

---

## Complete Authentication Architecture

```text
Frontend
   |
   |---- Sign Up
   |---- Sign In
   |---- Google Authentication
   |---- Forgot Password
   |---- Get Current User
   |
Backend (Express)
   |
   |---- Routes
   |       |---- /signup
   |       |---- /signin
   |       |---- /signout
   |       |---- /google-auth
   |       |---- /send-otp
   |       |---- /verify-otp
   |       |---- /reset-password
   |       |---- /current
   |
Controllers
   |
   |---- signUp()
   |---- signIn()
   |---- signOut()
   |---- googleAuth()
   |---- SendOtp()
   |---- verifyOtp()
   |---- resetPassword()
   |---- getCurrentUser()
   |
Middleware
   |
   |---- isAuth()
   |
Utilities
   |
   |---- genToken()
   |---- sendOtp()
   |
Database
   |
   |---- MongoDB (User Model)
```


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












# Redux State Management Workflow

Redux Toolkit is used in this project to manage global user state across the application. It allows us to store authenticated user information and access it from any component without prop drilling.

## 1. Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 2. Create User Slice

A slice is created to manage user-related data.

```javascript
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
```

### Responsibilities:

* Stores the current authenticated user.
* Updates user data after Sign Up, Sign In, and Google Authentication.
* Makes user information accessible throughout the application.

---

## 3. Configure the Redux Store

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});
```

### Responsibilities:

* Combines all reducers.
* Creates a centralized store for the application.
* Provides a single source of truth for state management.

---

## 4. Wrap the Application with Provider

The entire application is wrapped inside the `Provider` component so all child components can access the Redux store.

```javascript
import { Provider } from "react-redux";
import { store } from "./redux/store";

<Provider store={store}>
    <App />
</Provider>
```

### Flow:

```text
Store
   ↓
Provider
   ↓
App
   ↓
All Components
```

---

## 5. Dispatch Actions

After successful authentication, user data is stored in Redux.

```javascript
dispatch(setUserData(result.data));
```

This is used in:

* Sign Up
* Sign In
* Google Authentication
* Get Current User Hook

---

## 6. Access Redux State

Components can access user data using `useSelector`.

```javascript
import { useSelector } from "react-redux";

const user = useSelector(
    (state) => state.user.userData
);

console.log(user);
```

---

## 7. Current User Workflow

```text
User Signs In
      ↓
Backend Generates JWT Token
      ↓
Token Stored in Cookie
      ↓
Frontend Calls /api/user/current
      ↓
isAuth Middleware Verifies Token
      ↓
getCurrentUser Fetches User Details
      ↓
Custom Hook Receives User Data
      ↓
dispatch(setUserData(user))
      ↓
Redux Store Updated
      ↓
Accessible Throughout Application
```

---

## 8. Benefits of Using Redux

* Centralized state management.
* Eliminates prop drilling.
* Maintains user session across pages.
* Easy debugging with Redux DevTools.
* Scalable for larger applications.
* Improves code organization and maintainability.

---

## 9. Redux DevTools

Install the Redux DevTools browser extension to monitor state changes in real time.

Features:

* View current Redux state.
* Inspect dispatched actions.
* Track user authentication flow.
* Debug state updates efficiently.

Example:

```text
Action: setUserData
Payload:
{
    _id: "123",
    fullName: "Priyank Chaudhary",
    email: "priyank@gmail.com",
    role: "user"
}
```

---

## Complete Redux Flow

```text
User Action
    ↓
dispatch()
    ↓
Redux Action
    ↓
Reducer (userSlice)
    ↓
Store Updated
    ↓
useSelector()
    ↓
Component Re-renders
```

This implementation uses Redux Toolkit and React Redux to provide efficient, scalable, and maintainable state management for user authentication and profile handling across the application.


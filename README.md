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





## Location Management Workflow

The application uses the browser's Geolocation API along with the Geoapify Reverse Geocoding API to determine the user's current city and make it available throughout the application using Redux.

### 1. Get User Coordinates

The `useGetCity` custom hook uses:

```js
navigator.geolocation.getCurrentPosition()
```

to fetch the user's:

* Latitude
* Longitude

Example:

```js
navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
});
```

---

### 2. Reverse Geocoding

The coordinates are sent to the Geoapify API to retrieve the corresponding city name.

```js
axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
);
```

---

### 3. Store City in Redux

Once the city is obtained, it is stored in Redux using:

```js
dispatch(setCity(result.data.results[0].city));
```

The Redux state is updated as follows:

```js
{
    userData: null,
    city: ""
}
```

---

### 4. Access City Throughout the Application

Components can access the city using `useSelector`.

```js
const { city } = useSelector((state) => state.user);
```

This allows the Navbar and other components to display the user's current location without passing props between components.

---

### 5. Location Workflow

```text
Browser Geolocation
        ↓
Get Latitude & Longitude
        ↓
Geoapify Reverse Geocoding API
        ↓
Retrieve City Name
        ↓
dispatch(setCity(city))
        ↓
Redux Store Updated
        ↓
Navbar Displays Current City
```

---

### 6. Benefits

* Automatic location detection.
* Centralized location state management.
* No prop drilling.
* Reusable across multiple components.
* Improves user experience by showing location-specific information.

This implementation ensures that the user's current city is fetched once, stored globally in Redux, and remains accessible throughout the application.



## Sign Out Workflow

The application uses JWT-based authentication with HTTP-only cookies. When a user logs out, the authentication token is removed from the browser, and the Redux state is cleared to end the user's session.

### 1. User Clicks Logout

The user clicks the **Log Out** button from the Navbar.

```js
<div onClick={handleLogOut}>
    Log Out
</div>
```

---

### 2. Frontend Sends Request

The frontend sends a request to the backend sign-out route.

```js
await axios.get(
    `${serverUrl}/api/auth/signout`,
    {
        withCredentials: true
    }
);
```

---

### 3. Backend Clears Cookie

The backend clears the JWT token stored in the browser.

```js
export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Sign out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: `Sign out error: ${error}`
        });
    }
};
```

---

### 4. Clear Redux State

After a successful response, the frontend removes the user information from Redux.

```js
dispatch(setUserData(null));
```

---

### 5. User Session Ends

Since the token has been removed:

* `isAuth` middleware cannot verify the user.
* Requests to protected routes fail.
* `/api/user/current` returns an unauthorized response.
* The application updates the UI accordingly.

---

### Sign Out Flow

```text
User Clicks "Log Out"
            ↓
Frontend Calls /api/auth/signout
            ↓
Backend Executes res.clearCookie("token")
            ↓
JWT Token Removed
            ↓
dispatch(setUserData(null))
            ↓
Redux Store Updated
            ↓
User Session Ends
            ↓
Protected Routes Become Inaccessible
```

### Benefits

* Securely removes the authentication token.
* Clears global user state.
* Prevents unauthorized access to protected resources.
* Keeps frontend and backend authentication states synchronized.






## Image Upload Workflow (Multer + Cloudinary)

The application uses **Multer** and **Cloudinary** to handle image uploads. Multer stores uploaded files temporarily on the server, and Cloudinary is used for permanent cloud storage.

### 1. Install Dependencies

```bash
npm install multer cloudinary
```

---

### 2. Configure Multer

Multer is responsible for handling multipart/form-data and temporarily storing uploaded files.

```js
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
```

#### Responsibilities

* Accept file uploads from the frontend.
* Store files temporarily in the `public` folder.
* Preserve the original filename.

---

### 3. Configure Cloudinary

Cloudinary credentials are stored in environment variables.

```env
CLOUDINARY_CLOUDNAME=your_cloud_name
CLOUDINARY_APIKEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Cloudinary is configured using:

```js
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
```

---

### 4. Upload File to Cloudinary

The `uploadOnCloudinary()` utility uploads the file to Cloudinary and returns the hosted image URL.

```js
const result = await cloudinary.uploader.upload(file);
```

After a successful upload:

```js
fs.unlinkSync(file);
```

This removes the temporary file from the local machine.

---

### 5. Return Image URL

The utility returns:

```js
result.secure_url
```

Example:

```text
https://res.cloudinary.com/demo/image/upload/v123456/product.jpg
```

This URL is stored in MongoDB and can be used directly in the frontend.

---

### 6. Upload Flow

```text
User Selects Image
        ↓
Frontend Sends FormData
        ↓
Multer Receives File
        ↓
Temporarily Stores File
        ↓
uploadOnCloudinary()
        ↓
Cloudinary Upload
        ↓
Returns secure_url
        ↓
Delete Local File
        ↓
Store URL in Database
        ↓
Display Image in Frontend
```

---

### 7. Benefits

* Secure cloud-based image storage.
* Reduces server storage usage.
* Fast image delivery through Cloudinary CDN.
* Automatic cleanup of temporary files.
* Scalable for large numbers of uploads.

### Example Use Case

This workflow is used for:

* Product Images
* Restaurant Images
* User Profile Pictures
* Banner Images
* Category Images

The combination of Multer and Cloudinary provides an efficient and scalable solution for handling media uploads within the application.











# Shop & Item Management Workflow

This module allows restaurant owners to create and manage their shops and food items. It also supports image uploads using Multer and Cloudinary.

## Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* Multer
* Cloudinary
* JWT Authentication

---

## 1. Shop Model

The `Shop` model stores information about a restaurant/shop.

### Fields:

* `name`
* `city`
* `state`
* `address`
* `image`
* `owner` (Reference to User)

### Responsibilities:

* Stores shop details.
* Associates a shop with its owner.
* Maintains restaurant information.

---

## 2. Item Model

The `Item` model stores all food items belonging to a shop.

### Fields:

* `name`
* `category`
* `foodType` (Veg/Non-Veg)
* `price`
* `image`
* `shop` (Reference to Shop)

### Responsibilities:

* Stores menu items.
* Maintains the relationship between items and shops.
* Supports item editing and management.

---

## 3. Image Upload Workflow

Images are uploaded using Multer and stored permanently on Cloudinary.

### Multer Configuration

```javascript
export const upload = multer({ storage });
```

### Cloudinary Workflow

```javascript
uploadOnCloudinary(req.file.path);
```

### Flow

User Uploads Image
↓
Multer Stores File Temporarily
↓
Cloudinary Uploads Image
↓
Cloudinary Returns Secure URL
↓
Temporary File Deleted
↓
URL Stored in MongoDB

### Benefits

* Fast image delivery.
* Reduced server storage usage.
* CDN support via Cloudinary.
* Secure image URLs.

---

## 4. Create/Edit Shop Workflow

Owners can create a new shop or edit existing shop details.

### Endpoint

```bash
POST /api/shop/create-edit
```

### Workflow

Owner Sends Shop Details
↓
isAuth Middleware Verifies User
↓
Check if Shop Exists
↓
If Not Exists → Create Shop
↓
Else → Update Existing Shop
↓
Upload Shop Image to Cloudinary
↓
Populate Owner Details
↓
Return Shop Response

### Example Response

```json
{
    "_id": "shop123",
    "name": "Anytime Craving",
    "city": "Hathras",
    "state": "Uttar Pradesh",
    "address": "Near Bus Stand",
    "image": "https://cloudinary.com/xyz.jpg"
}
```

---

## 5. Add Item Workflow

Restaurant owners can add food items to their menu.

### Endpoint

```bash
POST /api/item/add
```

### Workflow

Owner Adds Item Details
↓
isAuth Middleware Verifies User
↓
Find Shop Using req.userId
↓
Upload Item Image
↓
Create Item in Database
↓
Return Created Item

### Example

```json
{
    "name": "Paneer Pizza",
    "category": "Pizza",
    "foodType": "Veg",
    "price": 299
}
```

---

## 6. Edit Item Workflow

Owners can modify existing menu items.

### Endpoint

```bash
PUT /api/item/edit/:itemId
```

### Workflow

Owner Selects Item
↓
Send Updated Details
↓
Upload New Image (Optional)
↓
Find Item by ID
↓
Update Item Details
↓
Return Updated Item

---

## 7. Routes

### Shop Routes

```javascript
router.post(
    "/create-edit",
    isAuth,
    upload.single("image"),
    createEditShop
);
```

### Item Routes

```javascript
router.post(
    "/add",
    isAuth,
    upload.single("image"),
    addItem
);

router.put(
    "/edit/:itemId",
    isAuth,
    upload.single("image"),
    editItem
);
```

---

## 8. Authentication Flow

All shop and item routes are protected using JWT authentication.

```text
Request
   ↓
isAuth Middleware
   ↓
Extract Token from Cookie
   ↓
Verify JWT
   ↓
Get User ID
   ↓
Proceed to Controller
```

---

## 9. Complete System Workflow

```text
Owner Login
    ↓
JWT Token Generated
    ↓
Create/Edit Shop
    ↓
Upload Shop Image
    ↓
Add Food Items
    ↓
Upload Item Images
    ↓
Store Data in MongoDB
    ↓
Display Menu to Users
```

---

## 10. Key Features

* Role-based access for restaurant owners.
* Shop creation and editing.
* Food item management.
* Cloudinary image uploads.
* JWT authentication.
* MongoDB relationships using references.
* Scalable and maintainable architecture.

This implementation provides a complete restaurant management system where owners can manage their shops and menu items efficiently while ensuring secure authentication and optimized image handling.




# Shop Management Workflow

The Shop Management module enables restaurant owners to create, edit, and manage their shops on the platform. Redux Toolkit is used to maintain shop data globally, ensuring seamless access across the application.

## 1. Shop Redux Slice

A dedicated `ownerSlice` is created to manage the current owner's shop information.

```js
const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShopData: null,
    },
    reducers: {
        setMyShopData: (state, action) => {
            state.myShopData = action.payload;
        },
    },
});
```

### Responsibilities

* Stores the current owner's shop details.
* Updates shop information after creating or editing a shop.
* Makes shop data accessible throughout the owner dashboard.

---

## 2. Shop Routes

The following API routes are implemented for shop management:

| Method | Route                   | Description                      |
| ------ | ----------------------- | -------------------------------- |
| POST   | `/api/shop/create-edit` | Create or update a shop          |
| GET    | `/api/shop/get-my`      | Fetch the logged-in owner's shop |

### Route Configuration

```js
shopRouter.post(
    "/create-edit",
    isAuth,
    upload.single("image"),
    createEditShop
);

shopRouter.get(
    "/get-my",
    isAuth,
    getMyShop
);
```

---

## 3. Create/Edit Shop Workflow

### Flow

```text
Owner Opens Dashboard
        ↓
Clicks "Get Started"
        ↓
Navigates to Create Shop Page
        ↓
Fills Shop Details
        ↓
Uploads Shop Image
        ↓
Image Uploaded to Cloudinary
        ↓
POST /api/shop/create-edit
        ↓
Shop Stored in MongoDB
        ↓
Redux Updated
        ↓
Owner Dashboard Displays Shop
```

### Features

* Create a new restaurant/shop.
* Edit existing shop information.
* Upload shop images using Cloudinary.
* Associate shops with authenticated owners.

---

## 4. Fetch Current Shop

A custom hook, `useGetMyShop`, is used to fetch the current owner's shop data.

```js
const useGetMyShop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            const result = await axios.get(
                `${serverUrl}/api/shop/get-my`,
                { withCredentials: true }
            );

            dispatch(setMyShopData(result.data));
        };

        fetchShop();
    }, []);
};
```

### Responsibilities

* Fetches shop data on component mount.
* Dispatches `setMyShopData`.
* Keeps Redux synchronized with backend data.

---

## 5. Get My Shop Controller

```js
export const getMyShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            owner: req.userId,
        }).populate("owner items");

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found",
            });
        }

        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({
            message: `Get My Shop Error: ${error}`,
        });
    }
};
```

### Responsibilities

* Verifies authenticated owner.
* Fetches shop using `req.userId`.
* Populates owner and item information.
* Returns shop details to the frontend.

---

## 6. Owner Dashboard Workflow

```text
Owner Logs In
      ↓
JWT Token Stored in Cookie
      ↓
OwnerDashboard Loads
      ↓
useGetMyShop() Executes
      ↓
GET /api/shop/get-my
      ↓
Backend Verifies Token
      ↓
Shop Data Returned
      ↓
dispatch(setMyShopData())
      ↓
Redux Store Updated
      ↓
Dashboard Re-renders
```

---

## 7. Cloudinary Integration

Shop images are uploaded using Cloudinary.

### Workflow

```text
Owner Selects Image
        ↓
Multer Stores File Temporarily
        ↓
uploadOnCloudinary()
        ↓
Cloudinary Generates URL
        ↓
Temporary File Deleted
        ↓
Image URL Saved in MongoDB
```

---

## 8. Benefits

* Centralized shop state management.
* Persistent owner dashboard experience.
* Easy image handling using Cloudinary.
* Secure authentication using JWT.
* Scalable architecture for adding menus, orders, and analytics.
* Improved maintainability and code organization.

---

## 9. Complete Shop Management Flow

```text
Owner Authentication
        ↓
Create/Edit Shop
        ↓
Upload Image
        ↓
Save Shop in MongoDB
        ↓
Fetch Shop Data
        ↓
Update Redux Store
        ↓
Render Owner Dashboard
        ↓
Manage Items and Orders
```

This implementation provides a scalable and maintainable shop management system for restaurant owners, enabling efficient handling of shop information, image uploads, and dashboard integration.






# Interview Questions Based on the Project

The following are some common interview questions that can be asked based on the **Anytime Craving** project, which is built using React, Redux Toolkit, Node.js, Express.js, MongoDB, JWT, Firebase Authentication, Cloudinary, Multer, and Nodemailer.

## Project Overview

1. Tell me about your project "Anytime Craving."
2. What problem does your application solve?
3. Why did you choose the MERN stack for this project?
4. What are the major features of your application?
5. What challenges did you face during development?

## Authentication

6. Explain the complete Sign Up workflow.
7. Explain the Sign In workflow.
8. How are you implementing JWT authentication?
9. Why are you storing JWT tokens in cookies instead of localStorage?
10. What is the purpose of `httpOnly` cookies?
11. How does your `isAuth` middleware work?
12. How do you fetch the currently logged-in user?
13. What happens if the token is expired?
14. How does Google Authentication work in your application?
15. What is the difference between normal Sign In and Google Sign In?

## Password Reset & OTP

16. Explain the Forgot Password workflow.
17. How are OTPs generated?
18. Where do you store OTPs and their expiration time?
19. Why did you use Nodemailer?
20. How do you ensure OTP security?
21. What happens if a user enters an expired OTP?

## Redux Toolkit

22. Why did you use Redux Toolkit?
23. What is a slice in Redux?
24. Explain your `userSlice`.
25. What is the difference between `useSelector` and `useDispatch`?
26. What is stored in your Redux store?
27. How does Redux prevent prop drilling?
28. Explain the Redux flow in your application.
29. How would you persist Redux state after a page refresh?

## React

30. What are React Hooks?
31. Explain `useState`, `useEffect`, and `useContext`.
32. Why did you create custom hooks like `useGetCurrentUser`?
33. What is the purpose of `useNavigate`?
34. What are controlled components?
35. Why did you use React Router?

## Backend

36. Explain your backend folder structure.
37. Why did you separate routes, controllers, middleware, and models?
38. What is the purpose of Express middleware?
39. What is the difference between middleware and controllers?
40. What HTTP methods are used in your project?

## MongoDB & Mongoose

41. Why did you choose MongoDB?
42. What fields are present in your User model?
43. Explain `findOne()` and `findById()`.
44. What happens if MongoDB Atlas is down?
45. What is Mongoose?
46. How do you connect MongoDB Atlas to your application?

## File Upload (Multer + Cloudinary)

47. Why are you using Multer?
48. How does Multer store files?
49. Why are you using Cloudinary?
50. Explain the image upload workflow.

### Image Upload Workflow

```text
Frontend
   ↓
Multer Middleware
   ↓
Temporary File Storage
   ↓
Cloudinary Upload
   ↓
Receive Secure URL
   ↓
Delete Local File
   ↓
Store URL in Database
```

## APIs

51. What APIs are used in your project?
52. Explain the Geoapify API integration.
53. How do you fetch the user's current city?
54. What is CORS, and why is it needed?
55. What is the difference between GET, POST, PUT, and DELETE requests?

## Security

56. What security measures have you implemented?
57. Why are environment variables important?
58. What information is stored in `.env`?
59. How do you secure API keys?
60. Why should `.env` not be pushed to GitHub?

## Deployment

61. How would you deploy this project?
62. Where would you host the frontend and backend?
63. What changes are required before production deployment?
64. What changes would you make to the cookie configuration in production?

## Debugging & Problem Solving

65. You received an `Invalid Hook Call` error. How did you fix it?
66. How did you solve the `react-redux context value` error?
67. What caused the `ERR_CONNECTION_REFUSED` error?
68. How did you fix the MongoDB Atlas connection issue?
69. Why was `User is not defined` appearing in `getCurrentUser`?
70. What debugging techniques do you use?

## Advanced Questions

71. How would you implement role-based authentication (Admin/User/Owner)?
72. How would you add payment integration?
73. How would you optimize performance?
74. How would you implement caching?
75. How would you scale this application for one million users?

## Frequently Asked Questions (Most Important)

1. Explain your project architecture.
2. Explain JWT authentication.
3. Explain Redux Toolkit.
4. Explain the Forgot Password workflow.
5. Explain Google Authentication.
6. Explain the `isAuth` middleware.
7. Explain Cloudinary and Multer integration.
8. Explain how Redux updates state.
9. Explain the Sign Out workflow.
10. What were the biggest challenges while building this project?

> Preparing answers to these questions will help demonstrate a strong understanding of the project's architecture, authentication flow, state management, backend implementation, security practices, and deployment strategies during technical interviews.

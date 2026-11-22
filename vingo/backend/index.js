
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";

import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-del-2nqd.vercel.app",
  "https://food-del-2nqd-git-main-priyank8449s-projects.vercel.app"
];

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vingo Backend is running successfully"
  });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// Socket events
socketHandler(io);

// Start server
server.listen(port, "0.0.0.0", () => {
  connectDb();
  console.log(`Server started at ${port}`);
});

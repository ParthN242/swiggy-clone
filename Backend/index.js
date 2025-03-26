const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const dbConnection = require("./Utils/database.js");
const userRouter = require("./User/Router/user.router.js");
const adminRouter = require("./Admin/Router/admin.router.js");
const socketIo = require("socket.io");
const http = require("http");
const { userSocketId } = require("./store/socketStore.js");

dotenv.config();
const app = express();

const server = http.createServer(app);

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = [
  "https://swiggy-clone-user.vercel.app",
  "https://swiggy-clone-admin.vercel.app",
];

const io = socketIo(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("login-user", (userId) => {
    userSocketId.set(userId, socket.id);
    console.log("userSocketId: ", userSocketId);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Database Connection
dbConnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRouter);

app.use("*", (req, res) => {
  res.json("Bad request");
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "internal server error" });
});

server.listen(4000, () => {
  console.log("Server Ported on 4000");
});

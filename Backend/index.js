import express from "express";
import connectDB from "./db/dbConnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
// dotenv.config({path:"./config/config.env"});
//this is used when .env file name is config.env in config folder

const PORT = process.env.PORT || 10000;
const DATABASE_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME;

// Middleware setup
app.use(cookieParser()); // To parse cookies
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" })); // To handle file uploads and temporary file storage

// app.use(cors()); // for all url applicable
const corsOptions = {
  //!  cross origin with specific domain
  origin: [process.env.FRONTED_URL, process.env.DASHBORAD_URL],
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true, // To allow cookies and other credentials
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/v1/message", messageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/appointment", appointmentRoute);

// connect data base
connectDB(DATABASE_URL, DB_NAME);

//! Image Storage Engine

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server listioning at http://localhost:${PORT}`);
});

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
import multer from "multer";

const app = express();
dotenv.config();
// dotenv.config({path:"./config/config.env"});this is used when .env file name is config.env in config folder

const PORT = process.env.PORT || 10000;
const DATABASE_URL = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// app.use(cors());// for all url applicable
app.use(
  cors({
    origin: [process.env.FRONTED_URL, process.env.DASHBORAD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/message", messageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/appointment", appointmentRoute);

connectDB(DATABASE_URL, DB_NAME);

//! Image Storage Engine
//! multer-----------
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  console.log(
    `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  );
  res.json({
    success: true,
    imageUrl: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

//! multer-----------

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server listioning at http://localhost:${PORT}`);
});

//HOSPITAL_MANAGEMENT_SYSTEM

//pass=rajseervi
//username=ugamraj
//mongodb+srv://ugamraj:rajseervi@cluster0.pk73hb7.mongodb.net/

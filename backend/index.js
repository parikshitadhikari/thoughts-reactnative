import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import thoughtRoutes from "./routes/thoughtRoutes.js";

import connectDB from "./config/db.js";
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// to parse the data that is sent i.e .body
app.use(express.json()); // allows us to parse json
app.use(express.urlencoded({ extended: true })); // allows us to send form data as well

app.use(cookieParser()); // for protected route- authMiddleware.js

app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.get("/", (req, res) => {
  res.send("running");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`running at ${port}`);
});

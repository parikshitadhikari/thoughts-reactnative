import asyncHandler from "express-async-handler";
import Thought from "../models/thoughtModel.js";

const addThought = asyncHandler(async (req, res) => {
  res.json({ message: "added thought" });
});

export { addThought };

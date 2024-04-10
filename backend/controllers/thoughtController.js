import asyncHandler from "express-async-handler";
import Thought from "../models/thoughtModel.js";

const getAllThought = asyncHandler(async (req, res) => {
  res.json({ message: "get all thought" });
});
const addThought = asyncHandler(async (req, res) => {
  res.json({ message: "added thought" });
});
const deleteThought = asyncHandler(async (req, res) => {
  res.json({ message: "deleted thought" });
});
const editThought = asyncHandler(async (req, res) => {
  res.json({ message: "edited thought" });
});

export { getAllThought, addThought, deleteThought, editThought };

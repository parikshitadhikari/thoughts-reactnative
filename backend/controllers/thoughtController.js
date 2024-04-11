import asyncHandler from "express-async-handler";
import Thought from "../models/thoughtModel.js";
import mongoose from "mongoose";

const getAllThought = asyncHandler(async (req, res) => {
  res.json({ message: "get all thought" });
});
const addThought = asyncHandler(async (req, res) => {
  // res.json({ message: "added thought" });
  const { userId } = req.params;
  const { text } = req.body;
  // res.json({ userId, text });
  const objectUserId = new mongoose.Types.ObjectId(userId);

  const thought = await Thought.create({
    userId: objectUserId,
    text,
  });
  if (thought) {
    res.status(201).json(thought);
  } else {
    res.status(400);
    throw new Error("Error creating thought");
  }
});

const deleteThought = asyncHandler(async (req, res) => {
  // res.json({ message: "deleted thought" });
  const { thoughtId } = req.params;
  const deletedThought = await Thought.findByIdAndDelete(thoughtId);
  if (deletedThought) {
    res.json(deletedThought);
  } else {
    res.status(500).json({ message: "Thought not found" });
  }
});
const editThought = asyncHandler(async (req, res) => {
  res.json({ message: "edited thought" });
});

export { getAllThought, addThought, deleteThought, editThought };

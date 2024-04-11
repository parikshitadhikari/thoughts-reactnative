import asyncHandler from "express-async-handler";
import Thought from "../models/thoughtModel.js";
import mongoose from "mongoose";

const getAllThought = asyncHandler(async (req, res) => {
  res.json({ message: "get all thought" });
});
const addThought = asyncHandler(async (req, res) => {
  const { userId } = req.params; // get user id from parameter
  const { text } = req.body; // get thought text from body
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
  const userId = req.user._id; // req.user -> currently logged in user
  const { thoughtId } = req.params;

  const thought = await Thought.findById(thoughtId);
  if (!thought) {
    res.status(404).json({ message: "Thought not found" });
  } else {
    if (thought.userId.toString() === userId.toString()) {
      // console.log(typeof thought.userId, thought.userId,",", typeof thoughtId, thoughtId,",", typeof userId, userId)

      await thought.deleteOne();
      res.status(200).json({
        message: "Successfully deleted thought",
        deletedThought: thought,
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  }
});

const editThought = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { thoughtId } = req.params;
  const thought = await Thought.findById(thoughtId);
  if (!thought) {
    res.status(404).json({ message: "Thought not found" });
  } else {
    if (thought.userId.toString() === userId.toString()) {
      thought.text = req.body.text;
      await thought.save();
      res.status(200).json({
        message: "Successfully modified thought",
        updatedThought: thought,
      });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  }
});

export { getAllThought, addThought, deleteThought, editThought };

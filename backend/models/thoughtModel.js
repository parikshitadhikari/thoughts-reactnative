import mongoose from "mongoose";

const thoughtSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
  },
  {
    timestamps: true,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema);

export default Thought;

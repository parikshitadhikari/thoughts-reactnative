import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// pre means before, so before we save , run a function
userSchema.pre("save", async function (next) {
  // if pw isnt changed in any way then simply move on
  if (!this.isModified("password")) {
    // this means user that we are creating
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // hashing the pw of currently creating user
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // returns true if both pw matches
};

const User = mongoose.model("User", userSchema); // User model-> creates users collection

export default User;

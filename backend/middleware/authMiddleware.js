import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  console.log("token: ", token);

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
    //if there is a token, we need to verify it
    try {
      //decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded is a object, that now has a userId field
      req.user = await User.findById(decoded.userId).select("-password"); //find the user with the id in the decoded object, as we don't want to return the password we do -password
      // doing req.user allows us to access the current user in the protected routes by simply using req.user
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }
});

export { protect };

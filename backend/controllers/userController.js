import asyncHandler from "express-async-handler"; // allows us to use custom error handler instead of try-catches
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Authenticate user - post /api/users/auth - public
const authUser = asyncHandler(async (req, res) => {
  const {email, password}= req.body
  // get the user:
  const user=await User.findOne({email}) // email:email
  if (user && (await user.matchPassword(password))) { // if user exists and pw matches (matchpw is in userModel)
    generateToken(res, user._id) // generating token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Register new user - post /api/users - public
const registerUser = asyncHandler(async (req, res) => {
  // body is the data that is sent (by user) i.e name, email, pw
  const { name, email, password } = req.body; // destructuring

  // checking if user exist
  const userExists = await User.findOne({ email: email }); // find a single user using email
  if (userExists) {
    res.status(400);
    throw new Error("User already exists"); // this will use our error handler (errorMiddleware)
  }
  const user = await User.create({ // create a new user if the user doesnt exist
    name,
    email,
    password,
  });

  // check if user is created
  if (user) {
    generateToken(res, user._id) // generating token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Logout user - post /api/users/logout - public
const logoutUser = asyncHandler(async (req, res) => {
  // for logout we destroy the cookie
  res.cookie('jwt','',{ // name of the cookie, empty token, options
    httpOnly:true,
    expires: new Date(0) // expire right now
  })
  res.status(200).json({message: 'User logged out'})
});

// get user profile - get /api/users/profile - private
const getUserProfile = asyncHandler(async (req, res) => {
    // console.log(req.user) // provides currently loggedin user
    const user = {
        _id:req.user._id, // id of currently logged in user
        name:req.user.name,
        email:req.user.email,
    }
  res.status(200).json(user);
});

// update user profile - put /api/users/profile - private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) // get the user, req.user here is currently logged in user
  if (user) { // check for user
    // if the new name isnt added (i.e if name isnt included in body), then stay as it is
    user.name = req.body.name || user.name 
    user.email = req.body.email || user.email
    if (req.body.password) {
        user.password = req.body.password
    }
    const updatedUser = await user.save() // save the user with the new data
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

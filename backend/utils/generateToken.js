import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // token consists of userid, which can be used to validate a user
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  // saving the token in a cookie
  // name of the cookie, token, some options
  res.cookie("jwt", token, { // saving the jwt as a http only cookie
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict", // prevents csrf attack
    maxAge: 30 * 24 * 60 * 60 * 1000, // when the cookie expires, takes milliseconds
  });
};

export default generateToken;

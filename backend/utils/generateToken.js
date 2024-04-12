import jwt from "jsonwebtoken";

const generateToken = (userId) => {
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
  return token
};

export default generateToken;

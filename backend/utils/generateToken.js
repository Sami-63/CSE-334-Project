import jwt from "jsonwebtoken";

const generateToken = ({ name, email, userType }) => {
  return jwt.sign({ name, email, userType }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;

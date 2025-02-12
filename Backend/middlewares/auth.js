import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: error || "No token, authorization denied" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    let user = await User.findById(decodedToken?.id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error || "Token is not verified" });
  }
};

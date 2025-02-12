import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      name,
      password,
    });

    return res
      .status(201)
      .json({ user, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });

    const { password, ...otherDetails } = user._doc;

    res
      .status(200)
      .json({
        token,
        details: { ...otherDetails },
        message: "User login successfully",
      });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

export { registerUser, loginUser };

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {};

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      succes: false,
      message: "User dooesn't exist with this email",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      succes: false,
      message: "Wrong Password",
    });
  }
  sendCookie(user, res, `Welcom Back, ${user.name}`, 200);
};

// register
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      succes: false,
      message: "User already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  sendCookie(user, "Registered Succesfully", 201);
};

// get users profile
export const getMyProfile = (req, res) => {
  res.status(200).json({
    succes: true,
    user: req.user,
  });
};

// logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expire: new Date(Date.now()) })
    .json({
      succes: true,
      user: req.user,
    });
};

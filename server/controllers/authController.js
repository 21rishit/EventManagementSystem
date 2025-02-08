// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel.js";

// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(400).json({ message: "Error registering user" });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token, userId: user._id, name: user.name });
//   } catch (err) {
//     res.status(400).json({ message: "Error logging in" });
//   }
// };

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const user = await User.create({ name, email, password });
      res.json(user);
   } catch (e) {
      res.status(422).json(e);
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (!user) return res.status(404).json({ error: "User not found" });

   const isValidPassword = bcrypt.compareSync(password, user.password);
   if (!isValidPassword) return res.status(401).json({ error: "Invalid password" });

   jwt.sign({ id: user._id, email: user.email }, jwtSecret, {}, (err, token) => {
      if (err) return res.status(500).json({ error: "Failed to generate token" });
      res.cookie("token", token).json(user);
   });
};

export const logout = (req, res) => {
   res.cookie("token", "").json({ message: "Logged out" });
};

export const profile = (req, res) => {
   res.json(req.user);
};

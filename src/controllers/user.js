import { createSessionModel } from '../models/session.js';
import { createUserModel } from '../models/index.js'; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const User = createUserModel(); 

export const register = async (req, res) => {
  const { firstName, lastName, phone, password, profileImage, location, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      firstName, 
      lastName, 
      phone, 
      password: hashedPassword,
      profileImage, 
      location,
      role: role || 'user' 
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
 
    const Session = createSessionModel();
    await Session.create({
      token,
      expiresAt: new Date(Date.now() + 3600000) 
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }
    const token = authHeader.split(' ')[1];
    const Session = createSessionModel();

    const existingSession = await Session.findOne({ where: { token } });
    if (!existingSession) {
      return res.status(404).json({ message: "Token not found in sessions" });
    }
    await Session.destroy({ where: { token } });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
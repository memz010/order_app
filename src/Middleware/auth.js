import jwt from 'jsonwebtoken';
import { createSessionModel } from '../models/session.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const Session = createSessionModel();
    const isTokenBlacklisted = await Session.findOne({ where: { token } });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "connected with this token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
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
    const existingSession = await Session.findOne({ where: { token } });
    if (!existingSession) {
      return res.status(401).json({ message: "Token has been blacklisted" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
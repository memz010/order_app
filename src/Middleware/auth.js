import jwt from 'jsonwebtoken';
import { createSessionModel } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }
    const token = authHeader.split(' ')[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const Session = createSessionModel();
    const session = await Session.findOne({ where: { token } });
    if (session) {
      return res.status(401).json({ message: "Token revoked" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};
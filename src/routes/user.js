import { Router } from "express";
import { register, login, logout } from "../controllers/user.js";
import { authenticate } from "../Middleware/auth.js"; 

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', authenticate, logout);

export default router;
import { Router } from "express";
import { register, login, logout } from "../controllers/user.js";
import { authenticate } from "../Middleware/auth.js"; 
import { authorize } from "../Middleware/auth.js"; 

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', authenticate, logout);

router.get('/admin-route', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: "Welcome Admin!" });
  });
export default router;
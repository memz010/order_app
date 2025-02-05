import { Router } from "express";
import { createStore, getStores, updateStore, deleteStore , searchStoresByName  } from "../controllers/store.js";
import { authenticate, authorize } from "../Middleware/auth.js"; 

const router = Router();

router.get("/", getStores); 
router.post("/", authenticate, authorize(['admin']), createStore);
router.put("/:id", authenticate, authorize(['admin']), updateStore); 
router.delete("/:id", authenticate, authorize(['admin']), deleteStore); 
router.get("/search", searchStoresByName);

export default router; 
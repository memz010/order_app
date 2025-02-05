import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProductsByName } from "../controllers/product.js"; // <-- أضف searchProductsByName
import { authenticate, authorize } from "../Middleware/auth.js";

const router = Router();

router.get("/search", searchProductsByName);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, authorize(['admin']), createProduct);
router.put("/:id", authenticate, authorize(['admin']), updateProduct);
router.delete("/:id", authenticate, authorize(['admin']), deleteProduct);

export default router;
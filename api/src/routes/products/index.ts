import { createInsertSchema } from "drizzle-zod";
import { Router } from "express";
import { productsTable } from "../../db/productsSchema";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";

const router = Router();

const createProductSchema = createInsertSchema(productsTable).omit({});

// Products enpoints
router.get("/", listProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;

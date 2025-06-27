import { createInsertSchema } from "drizzle-zod";
import { Router } from "express";
import { productsTable } from "../../db/productsSchema";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productsController";

const router = Router();

export const createProductSchema = createInsertSchema(productsTable).pick({
  name: true,
  description: true,
  image: true,
  price: true,
});

// Products enpoints
router.get("/", listProducts);

router.get("/:id", getProductById);

router.post("/", validateData(createProductSchema), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;

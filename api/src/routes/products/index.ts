import { Router } from "express";

const router = Router();

// Products enpoints
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ]);
});

router.get("/:id", (req, res) => {
  res.send(`Product details for ID: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Product added with data: ${JSON.stringify(req.body)}`);
});

export default router;

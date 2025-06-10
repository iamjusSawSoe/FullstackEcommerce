import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.json([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ]);
}

export function getProductById(req: Request, res: Response) {
  const productId = req.params.id;
  res.json({ id: productId, name: `Product ${productId}` });
}

export function createProduct(req: Request, res: Response) {
  const newProduct = req.body;
  res.status(201).json({ message: "Product added", product: newProduct });
}

export function updateProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.json({
    message: `Product ${productId} updated`,
    product: updatedProduct,
  });
}

export function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;
  res.json({ message: `Product ${productId} deleted` });
}

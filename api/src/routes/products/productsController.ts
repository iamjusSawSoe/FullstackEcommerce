import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import _ from "lodash";
import { createProductSchema } from ".";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [products] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!products) res.status(404).send({ message: "Product not found" });

    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
  const productId = req.params.id;
  res.json({ id: productId, name: `Product ${productId}` });
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(Object.keys(createProductSchema.shape));

    const data = _.pick(req.body, Object.keys(createProductSchema.shape));
    const [product] = await db.insert(productsTable).values(data).returning();

    res.status(201).json({ message: "Product added", product: product });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = Number(req.params.id);

    const updatedProductFields = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatedProductFields)
      .where(eq(productsTable.id, productId))
      .returning();

    if (!product) res.status(404).send({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product: product });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, productId))
      .returning();

    console.log("Deleted Product:", deletedProduct);

    if (!deletedProduct) res.status(404).send({ message: "Product not found" });

    res.status(204).json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

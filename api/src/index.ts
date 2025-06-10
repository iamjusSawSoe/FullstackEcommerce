import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  console.log(`Received request from ${req.ip}`);

  res.send("Hello, World!");
});

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

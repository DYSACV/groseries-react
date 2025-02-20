// // backend/routes/products.js
// const express = require("express");
// const router = express.Router();

// // 🔹 Obtener todos los productos
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Crear un nuevo producto
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save(); // 💡 Aquí usas await, por eso la función debe ser async
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 🔹 Editar un producto
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // 🔹 Eliminar un producto
// router.delete("/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Producto eliminado" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;



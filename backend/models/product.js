const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
  marca: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  expired_date: { type: Date, required: true },
  stock: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

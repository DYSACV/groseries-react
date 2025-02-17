const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("🚀 Servidor corriendo en http://localhost:5000"));
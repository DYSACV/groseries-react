const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes"); // Este archivo ya contiene todas las rutas necesarias
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Usar las rutas definidas en routes.js
app.use(routes);

mongoose.connect(process.env.MONGO_DUL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});

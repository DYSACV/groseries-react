const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes"); // Este archivo ya contiene todas las rutas necesarias
require("dotenv").config();

const app = express();
app.use(express.json());
//app.use(cors());
//permite accesodesde cualquier dispositivo
app.use(cors({ origin: '*' }));
// para produccion
//app.use(cors({ origin: 'http://192.168.1.72:5000' }));


// Usar las rutas definidas en routes.js
app.use(routes);

mongoose.connect(process.env.MONGO_DUL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Conectado a la base de datos de MongoDB"))
  .catch(err => console.error(" Error al conectar MongoDB:", err));

// app.listen(5000, () => {
//   console.log("Servidor en puerto 5000");
// });

app.listen(5000, '0.0.0.0', () => {
  console.log('Servidor corriendo en:');
});

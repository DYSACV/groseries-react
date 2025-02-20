const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const Product = require("../models/Product");
const Employes = require("../models/Employee");

// Rutas para Clientes
router.get("/api/clients", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// router.post("/api/clients", async (req, res) => {
//   const newClient = new Client(req.body);
//   await newClient.save();
//   res.json(newClient);
// });

router.post("/api/clients", async (req, res) => {
  try {
    const existingClient = await Client.findOne({ id_client: req.body.id_client });

    if (existingClient) {
      return res.status(400).json({ message: "El ID del cliente ya existe." });
    }

    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);

  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
});


router.put("/api/clients/:id", async (req, res) => {
  const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedClient);
});

router.delete("/api/clients/:id", async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
});

// Rutas para Productos
router.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// router.post("/api/products", async (req, res) => {
//   const newProduct = new Product(req.body);
//   await newProduct.save();
//   res.json(newProduct);
// });
router.post("/api/products", async (req, res) => {
  try {
    const existingProduct = await Client.findOne({ barcode: req.body.barcode });

    if (existingProduct) {
      return res.status(400).json({ message: "El ID de producto ya existe." });
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(500).json({ message: "Error al guardar este producto", error });
  }
});

router.put("/api/products/:id", async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

router.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// Rutas para Empleados
router.get("/api/employees", async (req, res) => {
  const employees = await Employes.find();
  res.json(employees);
});

// router.post("/api/employees", async (req, res) => {
//   const newEmployee = new Employes(req.body);
//   await newEmployee.save();
//   res.json(newEmployee);
// });
router.post("/api/employees", async (req, res) => {
  try {
    const existingEmployee = await Employes.findOne({ employe_number: req.body.employe_number });

    if (existingEmployee) {
      return res.status(400).json({ message: "El ID de empleado ya existe." });
    }
    const newEmployee = new Employes(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);

  } catch (error) {
    res.status(500).json({ message: "Error al crear un nuevo empleado ", error });
  }
});

router.put("/api/employees/:id", async (req, res) => {
  const updatedEmployee = await Employes.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEmployee);
});

router.delete("/api/employees/:id", async (req, res) => {
  await Employes.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;
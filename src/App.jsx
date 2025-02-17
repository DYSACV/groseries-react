import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    barcode: "",
    descripcion: "",
    marca: "",
    price: "",
    cost: "",
    expired_date: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);

  // 🔹 Cargar productos al inicio
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Editar producto
      await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
      setEditingId(null);
    } else {
      // Crear nuevo producto
      await axios.post("http://localhost:5000/api/products", formData);
    }

    // Recargar productos
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
    setFormData({
      barcode: "",
      descripcion: "",
      marca: "",
      price: "",
      cost: "",
      expired_date: "",
      stock: "",
    });
  };

  // 🔹 Editar producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>Groseries App</h1>
          <nav>
            <ul>
              <li><Link to="/">Productos</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <h2>Registro de Productos</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input type="text" name="barcode" placeholder="Código de barras" value={formData.barcode} onChange={handleChange} required />
            <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
            <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
            <input type="number" name="cost" placeholder="Costo" value={formData.cost} onChange={handleChange} required />
            <input type="date" name="expired_date" value={formData.expired_date} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
            <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
          </form>

          <h2>Lista de Productos</h2>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product._id} className="product-card">
                <h3>{product.descripcion}</h3>
                <p><strong>Código:</strong> {product.barcode}</p>
                <p><strong>Marca:</strong> {product.marca}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <button className="edit-btn" onClick={() => handleEdit(product)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
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

  //  Cargar productos al inicio
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Guardar o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (editingId) {
        // Editar producto
        await axios.put(`http://192.168.1.72:5000/api/products/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Crear nuevo producto
        await axios.post("http://192.168.1.72:5000/api/products", formData);
      }
      
      const res = await axios.get("http://192.168.1.72:5000/api/products");
      setProducts(res.data);
      setFormData({
        barcode: "",
        descripcion: "",
        marca: "",
        price: "",
        cost: "",
        expired_date: "",
        stock: "",
      });
      alert ("Producto guardado correctamente")
      }catch(error){
        if (error.response && error.response.status === 400) {
          alert("Error: El ID de este producto ya existe.");
        } else {
          console.error(error);
          alert("No se puede guardar el producto.");
      }
    }
  }

  //  Editar producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  //  Eliminar producto
  const handleDelete = async (id) => {
    await axios.delete(`http://192.168.1.72:5000/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={handleSubmit} className="form">

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
    <ul className="list">
      {products.map((product) => (
        <li key={product._id} className="card">
          <h3>{product.descripcion}</h3>
          <p><strong>Código:</strong> {product.barcode}</p>
          <p><strong>Marca:</strong> {product.marca}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Costo:</strong> ${product.cost}</p>
          <p><strong>Fecha Caducidad </strong>{product.expired_date}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <button className="edit-btn" onClick={() => handleEdit(product)}>Editar</button>
          <button className="delete-btn" onClick={() => handleDelete(product._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
  );
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import App from "./App";
import "./Edit.css";

const Edit = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState({
    barcode: "",
    descripcion: "",
    marca: "",
    price: "",
    cost: "",
    expired_date: "",
    stock: "",
  });

  useEffect(() => {
    // Aquí puedes hacer una petición para obtener los datos del producto
    setProduct({
      barcode: barcode,
      descripcion: "Ejemplo Producto",
      marca: "Marca X",
      price: "100",
      cost: "80",
      expired_date: "2025-12-31",
      stock: "50",
    });
  }, [barcode]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto actualizado:", product);
    // Aquí puedes hacer una petición para actualizar el producto en la BD
  };

  return (
    <div className="edit-container">
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>Código de barras</label>
        <input type="text" name="barcode" value={product.barcode} onChange={handleChange} disabled />

        <label>Descripción</label>
        <input type="text" name="descripcion" value={product.descripcion} onChange={handleChange} />

        <label>Marca</label>
        <input type="text" name="marca" value={product.marca} onChange={handleChange} />

        <label>Precio</label>
        <input type="text" name="price" value={product.price} onChange={handleChange} />

        <label>Costo</label>
        <input type="text" name="cost" value={product.cost} onChange={handleChange} />

        <label>Fecha de caducidad</label>
        <input type="date" name="expired_date" value={product.expired_date} onChange={handleChange} />

        <label>Stock</label>
        <input type="text" name="stock" value={product.stock} onChange={handleChange} />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default Edit;

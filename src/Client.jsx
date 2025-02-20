import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    id_client: "",
    name: "",
    lastname: "",
    tel: "",
    buy_day_date: "",
    total_articles: "",
    total_cost: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://192.168.1.72:5000/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);
 // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //  Guardar o editar un cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (editingId) {
        // Editar cliente
        await axios.put(`http://192.168.1.72:5000/api/clients/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Crear nuevo cliente
        await axios.post("http://192.168.1.72:5000/api/clients", formData);
      }
  
      const res = await axios.get("http://192.168.1.72:5000/api/clients");
      setClients(res.data);
  
      setFormData({
        id_client: "",
        name: "",
        lastname: "",
        tel: "",
        buy_day_date: "",
        total_articles: "",
        total_cost: ""
      });
  
      alert("Cliente guardado correctamente");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Error: El ID del cliente ya existe.");
      } else {
        console.error(error);
        alert("No se puede guardar el cliente.");
      }
    }
  };
  //editar
  const handleEdit = (client) => {
    setFormData(client);
    setEditingId(client._id);
  };
//eliminar
  const handleDelete = async (id) => {
    await axios.delete(`http://192.168.1.72:5000/api/clients/${id}`);
    setClients(clients.filter((client) => client._id !== id));
  };

  return (
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="id_client" placeholder="ID Cliente" value={formData.id_client} onChange={handleChange} required />

        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />

        <input type="text" name="lastname" placeholder="Apellido" value={formData.lastname} onChange={handleChange} required />

        <input type="text" name="tel" placeholder="Teléfono" value={formData.tel} onChange={handleChange} required />

        <input type="date" name="buy_day_date" placeholder="Fecha de compra" value={formData.buy_day_date} onChange={handleChange} required />

        <input type="number" name="total_articles" placeholder="Total Artículos" value={formData.total_articles} onChange={handleChange} required />

        <input type="number" name="total_cost" placeholder="Costo Total" value={formData.total_cost} onChange={handleChange} required />

        <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h3>Lista de Clientes</h3>

      <ul className="list">
        {clients.map((client) => (
          <li key={client._id} className="card">
            <h3>{client.name} {client.lastname}</h3>
            <p><strong>ID Cliente:</strong> {client.id_client}</p>
            <p><strong>Teléfono:</strong> {client.tel}</p>
            <p><strong>Fecha de Compra:</strong> {client.buy_day_date}</p>
            <p><strong>Total Artículos:</strong> {client.total_articles}</p>
            <p><strong>Costo Total:</strong> ${client.total_cost}</p>
            <button onClick={() => handleEdit(client)}>Editar</button>
            <button onClick={() => handleDelete(client._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

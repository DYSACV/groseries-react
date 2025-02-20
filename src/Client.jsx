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
    total_articles: 0,
    total_cost: 0
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`http://localhost:5000/api/clients/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/clients", formData);
    }

    axios.get("http://localhost:5000/api/clients").then((res) => setClients(res.data));
    setFormData({
      id_client: "",
      name: "",
      lastname: "",
      tel: "",
      buy_day_date: "",
      total_articles: 0,
      total_cost: 0
    });
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/clients/${id}`);
    setClients(clients.filter((client) => client._id !== id));
  };

  return (
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="id_client" placeholder="ID Cliente" value={formData.id_client} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Apellido" value={formData.lastname} onChange={handleChange} required />
        <input type="tel" name="tel" placeholder="Teléfono" value={formData.tel} onChange={handleChange} required />
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
            <p><strong>Costo Total:</strong> {client.total_cost}</p>
            <button onClick={() => handleEdit(client)}>Editar</button>
            <button onClick={() => handleDelete(client._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

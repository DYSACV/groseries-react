import { useState, useEffect } from "react";
import axios from "axios";


export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employe_number: "",
    name: "",
    lastname: "",
    aye: "",
    email: "",
    salary: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://192.168.1.72:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 //  Guardar o editar un empleado
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (editingId) {
        // editar empleado
        await axios.put(`http://192.168.1.72:5000/api/employees/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Crear nuevo Empleado
        await axios.post("http://192.168.1.72:5000/api/employees", formData);
      }
  
      const res = await axios.get("http://192.168.1.72:5000/api/employees");
      setEmployees(res.data);
      setFormData({ 
        employe_number: "",
        name: "", 
        lastname: "",
        aye: "", 
        email: "",
        salary: "" 
      });
      alert ("Empleado guardado correctamente")
      }catch(error){
        if (error.response && error.response.status === 400) {
        alert("Error: El ID de éste empleado ya existe.");
      } else {
        console.error(error);
        alert("No se puede guardar empleado.");
      }
    }
  }
 //  Editar
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee._id);
  };
  //  Eliminar
  const handleDelete = async (id) => {
    await axios.delete(`http://192.168.1.72:5000/api/employees/${id}`);
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  return (
    <div>
      <h2>Empleados</h2>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="employe_number" placeholder="Número de empleado" value={formData.employe_number} onChange={handleChange} required />

        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />

        <input type="text" name="lastname" placeholder="Apellidos" value={formData.lastname} onChange={handleChange} required />

        <input type="number" name="aye" placeholder="Edad" value={formData.aye} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />

        <input type="number" name="salary" placeholder="Salario" value={formData.salary} onChange={handleChange} required />

        <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
      </form>
      <h3>Lista de Empleados</h3>

      <ul className="list">
        {employees.map((employee) => (
          <li key={employee._id} className="card">
            <h3>{employee.name} {employee.lastname}</h3>
            <p><strong>Número de empleado:</strong> {employee.employe_number}</p>
            <p><strong>Edad:</strong> {employee.aye}</p>
            <p><strong>Correo:</strong> {employee.email}</p>
            <p><strong>Salario:</strong> ${employee.salary}</p>
            <button onClick={() => handleEdit(employee)}>Editar</button>
            <button onClick={() => handleDelete(employee._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

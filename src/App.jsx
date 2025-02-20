import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Client from "./Client.jsx"; // Ajusta la ruta según corresponda
import Product from "./Product.jsx"; // Ajusta la ruta según corresponda
import Employees from "./Employee.jsx";
import './App.css'; // Se importa el archivo CSS

function App() {
  return (
    <Router>
      <div>
        <h1>Gestión de Sistema de Dulce</h1>
        <nav>
          <ul>
            <li><a href="/client">Clientes</a></li>
            <li><a href="/product">Productos</a></li>
            <li><a href="/employees">Empleados</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/client" element={<Client />} />
          <Route path="product" element={<Product />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
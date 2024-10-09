import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import ClientesPage from "../components/usuarios/clientes/ClientesPage";

const Clientes = () => {
  return (
    <div className="sections-wrapper">
      <Dashboard />
      <ClientesPage />
    </div>
  );
};

export default Clientes;

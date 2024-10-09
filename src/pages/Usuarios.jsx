import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import UsuariosPage from "../components/usuarios/personal/UsuariosPage";

const Usuarios = () => {
  return (
    <div className="sections-wrapper">
      <Dashboard />
      <UsuariosPage />
    </div>
  );
};

export default Usuarios;

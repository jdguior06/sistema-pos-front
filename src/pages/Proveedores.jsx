import React from "react";
import Dashboard from "../components/dashboard/Dashboard";
import ProveedoresPage from "../components/usuarios/proveedor/ProveedoresPage"

const Proveedores = () => {
  return (
    <div className="sections-wrapper">
      <Dashboard />
      <ProveedoresPage/>
    </div>
  );
};

export default Proveedores;

import React from "react";
import "../../../styles/usuarios/clientes/proveedoritem.css";

const ProveedorItem = ({
  // id,
  nombre,
  telefono,
  email,
  direccion,
  activo,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`proveedores-grid cliente-item ${
        !activo ? "proveedor-inactivo" : ""
      }`}
    >
      {/* <span>{id}</span> */}
      <span>{nombre}</span>
      <span>{email}</span>
      <span>{telefono}</span>
      <span>{direccion}</span>
      <div>
        <button className="edit-button" onClick={() => onEdit(id)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProveedorItem;

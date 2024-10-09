import React from "react";
import "../../../styles/usuarios/clientes/clienteitem.css";

const ClienteItem = ({
  id,
  nombre,
  apellido,
  email,
  nit,
  activo,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`clientes-grid cliente-item ${
        !activo ? "cliente-inactivo" : ""
      }`}
    >
      <span>{id}</span>
      <span>{`${nombre || ""} ${apellido || ""}`}</span>
      <span>{email || "No disponible"}</span>
      <span>{nit || "No disponible"}</span>
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

export default ClienteItem;

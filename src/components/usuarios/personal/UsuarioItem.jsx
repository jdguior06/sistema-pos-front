const UsuarioItem = ({ id, nombre, apellido, email, rol, estado, onEdit, onDelete }) => {
  return (
    <div className="personal-grid cliente-item">
      <span>{id}</span>
      <span>{`${nombre || ""} ${apellido || ""}`}</span>
      <span>{email || "No disponible"}</span>
      <span>{rol[0]?.nombre || "Sin rol"}</span> {/* Maneja el caso de no tener rol */}
      <span>{estado}</span>
      <div>
        <button className="edit-button" onClick={onEdit}>
          Editar
        </button>
        <button className="delete-button" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default UsuarioItem;
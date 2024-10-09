import React from "react";
import { connect } from "react-redux";
import { deleteProveedor } from "../../../actions/proveedores"; // Cambiamos la acción a deleteProveedor
import PropTypes from "prop-types";
import "../../../styles/usuarios/modales/clientemodal.css"; // Reutilizamos la misma hoja de estilos

const ProveedorDeleteModal = ({ open, onClose, selectedProveedor, deleteProveedor, onSave }) => {
  const handleDelete = async () => {
    const result = await deleteProveedor(selectedProveedor.id); // Llamamos a deleteProveedor
    console.log("Proveedor desactivado", result);
    if (result && result.statusCode === 200) {
      onSave(result.data);
      onClose();
    } else {
      console.error("Error al eliminar proveedor:", result.message || "Error desconocido");
    }
  };

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="gameModalClose" onClick={onClose}>
          X
        </p>
        <div className="modal-content" style={{ marginBottom: "30px" }}>
          <h3>
            ¿Está seguro de eliminar al proveedor {selectedProveedor.nombre}?
          </h3>

          <button className="delete-button" style={{ marginTop: "20px" }} onClick={handleDelete}>
            Eliminar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

ProveedorDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProveedor: PropTypes.object, // Cambiamos a selectedProveedor
  onSave: PropTypes.func.isRequired,
  deleteProveedor: PropTypes.func.isRequired, // Cambiamos a deleteProveedor
};

export default connect(null, { deleteProveedor })(ProveedorDeleteModal);

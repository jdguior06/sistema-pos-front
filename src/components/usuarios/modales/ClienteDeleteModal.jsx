import React from "react";
import { connect } from "react-redux"
import { deleteCliente } from "../../../actions/clientes";
import PropTypes from "prop-types";
import "../../../styles/usuarios/modales/clientemodal.css";

const ClienteDeleteModal = ({ open, onClose, selectedClient, deleteCliente, onSave }) => {
  const handleDelete = async () => {
    const result = await deleteCliente(selectedClient.id);
    console.log("Cliente desacctivado", result)
    if (result && result.statusCode === 200) {
      onSave(result.data);
      onClose();
    } else {
      console.error("Error updating cliente:", result.message || "Error desconocido");
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
          <h3>Esta Seguro de Eliminar al Cliente {selectedClient.nombre} {selectedClient.apellido}?</h3>

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

ClienteDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedClient: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  deleteCliente: PropTypes.func.isRequired,
};

export default connect(null, { deleteCliente })(ClienteDeleteModal);

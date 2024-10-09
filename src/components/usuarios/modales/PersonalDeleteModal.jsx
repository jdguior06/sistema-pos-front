import React, { useState } from "react";

import "../../../styles/usuarios/modales/clientemodal.css";

const PersonalDeleteModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="gameModalClose" onClick={onClose}>
          X
        </p>
        <div className="modal-content" style={{ marginBottom: "30px" }}>
          <h3>Esta Seguro de Eliminar al Personal?</h3>

          <button className="delete-button" style={{ marginTop: "20px" }}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDeleteModal;

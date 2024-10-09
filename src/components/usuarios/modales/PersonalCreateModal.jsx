import React, { useState } from "react";

import "../../../styles/usuarios/modales/clientemodal.css";

const PersonalCreateModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="gameModalClose" onClick={onClose}>
          X
        </p>
        <div className="modal-content">
          <h3>Crear Personal</h3>
          <form className="modal-form">
            <div className="modal-input">
              <input placeholder="Nombre Personal" />
              <input placeholder="Nit" />
            </div>
            <button className="create-button">Crear</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalCreateModal;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../styles/usuarios/modales/clientemodal.css";
import { patchCliente } from "../../../actions/clientes";

const ClienteEditModal = ({ open, onClose, selectedClient, onSave, patchCliente }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nit: "",
  });
  const { nombre, apellido, email, nit } = formData;

  useEffect(() => {
    if (selectedClient) {
      setFormData({
        nombre: selectedClient.nombre,
        apellido: selectedClient.apellido,
        email: selectedClient.email,
        nit: selectedClient.nit,
      });
    }
  }, [selectedClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCliente = { ...formData };
    const result = await patchCliente(selectedClient.id, updatedCliente);

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
        <div className="modal-content">
          <h3>Editar Cliente</h3>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-input">
            <input
                name="nombre"
                value={nombre}
                onChange={handleChange}
                placeholder="Nombre Cliente"
                required
              />
              <input
                name="apellido"
                value={apellido}
                onChange={handleChange}
                placeholder="Apellido del cliente"
                required
              />
              <input
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email del cliente"
                type="email"
                required
              />
              <input
                name="nit"
                value={nit}
                onChange={handleChange}
                placeholder="Nit del cliente"
                required
              />
            </div>
            <button type="submit" className="edit-button">Editar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

ClienteEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedClient: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  patchCliente: PropTypes.func.isRequired,
};

export default connect(null, { patchCliente })(ClienteEditModal);

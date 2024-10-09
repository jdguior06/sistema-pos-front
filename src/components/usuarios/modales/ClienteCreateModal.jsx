import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCliente } from "../../../actions/clientes";
import "../../../styles/usuarios/modales/clientemodal.css";

const ClienteCreateModal = ({ open, onClose, addCliente, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    nit: "",
  });

  const { nombre, apellido, email, nit} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await addCliente(formData);
    console.log("Resultado de agregar cliente:", result);
    if (result && result.success) {
      onSave(result.data, true);
      onClose();
    } else {
      console.error("Error al crear el cliente:", result.error || "Unknown error");
    }
  };

  useEffect(() => {
    if (open) {
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        nit: "",
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="gameModalClose" onClick={onClose}>
          X
        </p>
        <div className="modal-content">
          <h3>Crear Cliente</h3>
          <form className="modal-form" onSubmit={onSubmit}>
            <div className="modal-input">
              <input
                name="nombre"
                value={nombre}
                onChange={onChange}
                placeholder="Nombre"
                required
              />
              <input
                name="apellido"
                value={apellido}
                onChange={onChange}
                placeholder="Apellido"
                required
              />
              <input
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                type="email"
                required
              />
              <input
                name="nit"
                value={nit}
                onChange={onChange}
                placeholder="Nit"
                required
              />
            </div>
            <button type="submit" className="create-button">
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

ClienteCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addCliente: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default connect(null, { addCliente })(ClienteCreateModal);

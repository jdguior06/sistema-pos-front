import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../styles/usuarios/modales/clientemodal.css";
import { patchProveedor } from "../../../actions/proveedores";

const ProveedorEditModal = ({ open, onClose, selectedProveedor, onSave, patchProveedor }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
  });
  const { nombre, contacto, email, telefono } = formData;

  useEffect(() => {
    if (selectedProveedor) {
      setFormData({
        nombre: selectedProveedor.nombre,
        contacto: selectedProveedor.contacto,
        email: selectedProveedor.email,
        telefono: selectedProveedor.telefono,
      });
    }
  }, [selectedProveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProveedor = { ...formData };
    const result = await patchProveedor(selectedProveedor.id, updatedProveedor);

    if (result && result.statusCode === 200) {
      onSave(result.data);
      onClose();
    } else {
      console.error("Error updating proveedor:", result.message || "Error desconocido");
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
          <h3>Editar Proveedor</h3>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-input">
              <input
                name="nombre"
                value={nombre}
                onChange={handleChange}
                placeholder="Nombre del proveedor"
                required
              />
              <input
                name="contacto"
                value={contacto}
                onChange={handleChange}
                placeholder="Nombre del contacto"
                required
              />
              <input
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email del proveedor"
                type="email"
                required
              />
              <input
                name="telefono"
                value={telefono}
                onChange={handleChange}
                placeholder="Teléfono del proveedor"
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

ProveedorEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProveedor: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  patchProveedor: PropTypes.func.isRequired,
};

export default connect(null, { patchProveedor })(ProveedorEditModal);

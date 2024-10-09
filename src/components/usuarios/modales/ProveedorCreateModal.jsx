import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProveedor } from "../../../actions/proveedores"; // Cambiamos la acción a proveedores
import "../../../styles/usuarios/modales/clientemodal.css"; // Asegúrate de tener los estilos correctos

const ProveedorCreateModal = ({ open, onClose, addProveedor, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const { nombre, telefono, direccion, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await addProveedor(formData); // Llamamos a la acción addProveedor
    console.log("Resultado de agregar proveedor:", result);
    if (result && result.success) {
      onSave(result.data, true); // Guardamos el nuevo proveedor
      onClose(); // Cerramos el modal después de agregar el proveedor
    } else {
      console.error("Error al crear el proveedor:", result.error || "Error desconocido");
    }
  };

  useEffect(() => {
    if (open) {
      setFormData({
        nombre: "",
        telefono: "",
        direccion: "",
        email: "",
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
          <h3>Crear Proveedor</h3>
          <form className="modal-form" onSubmit={onSubmit}>
            <div className="modal-input">
              <input
                name="nombre"
                value={nombre}
                onChange={onChange}
                placeholder="Nombre del proveedor"
                required
              />
              <input
                name="telefono"
                value={telefono}
                onChange={onChange}
                placeholder="Teléfono"
                required
              />
              <input
                name="direccion"
                value={direccion}
                onChange={onChange}
                placeholder="Dirección"
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

ProveedorCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addProveedor: PropTypes.func.isRequired, // Asegúrate de que la acción está definida en actions/proveedores
  onSave: PropTypes.func.isRequired,
};

export default connect(null, { addProveedor })(ProveedorCreateModal);

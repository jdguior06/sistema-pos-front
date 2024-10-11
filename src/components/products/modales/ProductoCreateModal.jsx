import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProducto } from "../../../actions/producto";
import { getCategorias } from "../../../actions/categoria";
import "../../../styles/products/modales/productmodal.css";

const ProductoCreateModal = ({ open, onClose, addProducto, onSave, getCategorias, categorias }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    foto: "",
    id_categoria: "",
  });

  const { nombre, precio, descripcion, foto, id_categoria } = formData;

  useEffect(() => {
    getCategorias(); // Cargar categorías al abrir el modal
  }, [getCategorias]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await addProducto(formData);
    if (result && result.success) {
      onSave(result.data, true);
      /* onClose(); */
      /* navigate("/productos"); // Redirigir a la lista de productos */
      window.location.reload(); // Recargar la página
    } else {
      console.error("Error al crear el producto:", result.error || "Unknown error");
    }
  };

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p className="modalClose" onClick={onClose}>
          X
        </p>
        <div className="modal-content">
          <h3>Crear Producto</h3>
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
                name="precio"
                value={precio}
                onChange={onChange}
                placeholder="Precio"
                type="number"
                step="0.01"
                required
              />
              <textarea
                name="descripcion"
                value={descripcion}
                onChange={onChange}
                placeholder="Descripción"
                required
              />
              <input
                name="foto"
                value={foto}
                onChange={onChange}
                placeholder="URL de la foto"
                required
              />
              <select
                name="id_categoria"
                value={id_categoria}
                onChange={onChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
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

ProductoCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addProducto: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  getCategorias: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  categorias: state.categoria.categorias, // Asumiendo que tienes las categorías en tu estado
});

export default connect(mapStateToProps, { addProducto, getCategorias })(ProductoCreateModal);

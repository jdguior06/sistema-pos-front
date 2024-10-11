import React, { useEffect, useState } from "react";
import "../../styles/products/productpage.css"; // Asegúrate de crear un archivo de estilo similar
import ProductoCreateModal from "../../components/products/modales/ProductoCreateModal"; // Modal para crear productos
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductos } from "../../actions/producto"; // Acción para obtener productos

const ProductosPage = ({ getProductos, producto: { productos, loading } }) => {
  const [openCreateModal, setCreateOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditModal, setEditOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);

  useEffect(() => {
    getProductos();
  }, [getProductos]);

  const handleCreateModal = () => setCreateOpenModal(!openCreateModal);

  const handleEditModal = (id) => {
    if (productos && productos.length > 0) {
      const productToEdit = productos.find((producto) => producto.id === id);
      setSelectedProduct(productToEdit);
      setEditOpenModal(!openEditModal);
    }
  };

  const handleDeleteModal = (id) => {
    if (productos && productos.length > 0) {
      const productToDelete = productos.find((producto) => producto.id === id);
      setSelectedProduct(productToDelete);
      setDeleteOpenModal(!openDeleteModal);
    }
  };

  const handleSave = (producto, isNew = false) => {
    if (isNew) {
      console.log("Producto creado:", producto);
    } else {
      console.log("Producto actualizado:", producto);
    }
    getProductos();
  };

  // URL de imagen por defecto cuando no hay una imagen disponible
  const defaultImageUrl = "https://via.placeholder.com/100?text=No+Image";

  const filteredProductos = productos
    ? productos.filter((producto) =>
        (producto.nombre ? producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
        (producto.descripcion ? producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) : false)
      )
    : [];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <ProductoCreateModal
        open={openCreateModal}
        onSave={handleSave}
        onClose={() => setCreateOpenModal(false)}
      />

      <div className="productos-page">
        <h2 className="productos-page-h2">Productos Disponibles</h2>
        <div className="productos-page-control-buttons">
          <input
            placeholder="Buscar Producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="create-button" onClick={handleCreateModal}>
            Crear Producto
          </button>
        </div>

        <table className="productos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre || 'Sin nombre'}</td> {/* Previene lectura indefinida */}
                <td>
                  <img
                    src={producto.foto || defaultImageUrl} // Usa defaultImageUrl si no hay imagen
                    alt={producto.nombre}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditModal(producto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteModal(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

ProductosPage.propTypes = {
  getProductos: PropTypes.func.isRequired,
  producto: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  producto: state.producto,
});

export default connect(mapStateToProps, { getProductos })(ProductosPage);

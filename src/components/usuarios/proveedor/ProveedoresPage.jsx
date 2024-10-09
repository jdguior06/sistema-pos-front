import React, { useEffect, useState } from "react";
import ProveedorItem from "./ProveedorItem"; // Cambiamos a ProveedorItem
import "../../../styles/usuarios/clientes/proveedorpage.css"; // Reutilizamos la misma hoja de estilo
import ProveedorCreateModal from "../modales/ProveedorCreateModal"; // Cambiamos a los modales de proveedor
import ProveedorEditModal from "../modales/ProveedorEditModal";
import ProveedorDeleteModal from "../modales/ProveedorDeleteModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProveedores, getProveedor } from "../../../actions/proveedores"; // Acciones para proveedores

const ProveedoresPage = ({ getProveedores, proveedor: { proveedores, loading } }) => {
  const [openCreateModal, setCreateOpenModal] = useState(false);
  const [openEditModal, setEditOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProveedorId, setSelectedProveedorId] = useState(null);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [showInactive, setShowInactive] = useState(true);

  useEffect(() => {
    getProveedores(); 
  }, [getProveedores]);

  const handleCreateModal = () => setCreateOpenModal(!openCreateModal);
  const handleEditModal = (id) => {
    const proveedorToEdit = proveedores.data.find(proveedor => proveedor.id === id);
    setSelectedProveedor(proveedorToEdit);
    setEditOpenModal(!openEditModal);
  };

  const handleDeleteModal = (id) => {
    const proveedorToChangeStatus = proveedores.data.find(proveedor => proveedor.id === id);
    setSelectedProveedor(proveedorToChangeStatus);
    setDeleteOpenModal(!openDeleteModal);
  };

  const handleSave = (proveedor, isNew = false) => {
    if (isNew) {
      console.log("Proveedor creado:", proveedor);
    } else {
      console.log("Proveedor actualizado:", proveedor);
    }
    getProveedores();
  };

  const filteredProveedores = proveedores && proveedores.data
    ? proveedores.data.filter((proveedor) => showInactive || proveedor.activo)
      .filter((proveedor) =>
        `${proveedor.nombre}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proveedor.telefono.toString().includes(searchTerm)
      ) : [];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <ProveedorCreateModal
        open={openCreateModal}
        onSave={handleSave}
        onClose={() => setCreateOpenModal(false)}
      />
      <ProveedorEditModal
        open={openEditModal}
        onClose={() => setEditOpenModal(false)}
        selectedProveedor={selectedProveedor}
        onSave={handleSave}
      />
      <ProveedorDeleteModal
        open={openDeleteModal}
        onClose={() => setDeleteOpenModal(false)}
        selectedProveedor={selectedProveedor}
        onSave={handleSave}
      />

      <div className="proveedores-page">
        <h2 className="proveedores-page-h2">Nuestros Proveedores</h2> 
        <div className="proveedores-page-control-buttons">
          <input
            placeholder="Buscar Proveedor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="create-button" onClick={handleCreateModal}>
            Crear
          </button>
          <div className="show-inactive-checkbox">
            <input
              type="checkbox"
              id="showInactive"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive">Mostrar inactivos</label>
          </div>
        </div>
        <div className="proveedores-list">
          <div className="proveedores-grid proveedores-header">
            {/* <span>Id</span> */}
            <span>Nombre</span>
            <span>Email</span>
            <span>Teléfono</span>
            <span>Dirección</span>
            <span>Acciones</span>
          </div>

          <div className="proveedores-items">
            {filteredProveedores.map((proveedor) => (
              <ProveedorItem
                key={proveedor.id}
                // id={proveedor.id}
                nombre={proveedor.nombre}
                email={proveedor.email}
                telefono={proveedor.telefono}
                direccion={proveedor.direccion}
                activo={proveedor.activo}
                onEdit={handleEditModal}
                onDelete={handleDeleteModal}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ProveedoresPage.propTypes = {
  getProveedores: PropTypes.func.isRequired,
  proveedor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  proveedor: state.proveedor,
});

export default connect(mapStateToProps, { getProveedores })(ProveedoresPage);

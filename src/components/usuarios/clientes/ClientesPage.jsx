import React, { useEffect, useState } from "react";
import ClienteItem from "./ClienteItem";
import "../../../styles/usuarios/clientes/clientespage.css";
import ClienteCreateModal from "../modales/ClienteCreateModal";
import ClienteEditModal from "../modales/ClienteEditModal";
import ClienteDeleteModal from "../modales/ClienteDeleteModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getClientes, getCliente } from "../../../actions/clientes";

const ClientesPage = ({ getClientes, cliente: { clientes, loading } }) => {
  const [openCreateModal, setCreateOpenModal] = useState(false);
  const [openEditModal, setEditOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showInactive, setShowInactive] = useState(true);

  useEffect(() => {
    getClientes();
  }, [getClientes]);

  const handleCreateModal = () => setCreateOpenModal(!openCreateModal);
  const handleEditModal = (id) => {
    const clientToEdit = clientes.data.find(cliente => cliente.id === id);
    console.log(clientToEdit);
    setSelectedClient(clientToEdit);
    setEditOpenModal(!openEditModal);
  };

  const handleDeleteModal = (id) => {
    const clientToChangeStatus = clientes.data.find(cliente => cliente.id === id);
    setSelectedClient(clientToChangeStatus);
    setDeleteOpenModal(!openDeleteModal);
  };

  const handleSave = (cliente, isNew = false) => {
    if (isNew) {
      console.log("Cliente creado:", cliente);
    } else {
      console.log("Cliente actualizado:", cliente);
    }
    getClientes();
  };

  const filteredClientes = clientes && clientes.data
    ? clientes.data.filter((cliente) => showInactive || cliente.activo)
      .filter((cliente) =>
        `${cliente.nombre} ${cliente.apellido}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.nit.toString().includes(searchTerm)
      ) : [];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <ClienteCreateModal
        open={openCreateModal}
        onSave={handleSave}
        onClose={() => setCreateOpenModal(false)}
      />
      <ClienteEditModal
        open={openEditModal}
        onClose={() => setEditOpenModal(false)}
        selectedClient={selectedClient}
        onSave={handleSave}
      />
      <ClienteDeleteModal
        open={openDeleteModal}
        onClose={() => setDeleteOpenModal(false)}
        selectedClient={selectedClient}
        onSave={handleSave}
      />

      <div className="clientes-page">
        <h2 className="clientes-page-h2">Nuestros Clientes</h2>
        <div className="clientes-page-control-buttons">
          <input
            placeholder="Buscar Cliente"
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
        <div className="clientes-list">
          <div className="clientes-grid clientes-header">
            <span>Id</span>
            <span>Nombre</span>
            <span>Email</span>
            <span>Nit</span>
            <span>Acciones</span>
          </div>

          <div className="clientes-items">
            {filteredClientes.map((cliente) => (
              <ClienteItem
                key={cliente.id}
                id={cliente.id}
                nombre={cliente.nombre}
                apellido={cliente.apellido}
                email={cliente.email}
                nit={cliente.nit}
                activo={cliente.activo}
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

ClientesPage.propTypes = {
  getClientes: PropTypes.func.isRequired,
  cliente: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cliente: state.cliente,
});

export default connect(mapStateToProps, { getClientes })(ClientesPage);


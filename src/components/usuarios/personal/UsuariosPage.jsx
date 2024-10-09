import React, { useState , useEffect} from "react";
import UsuarioItem from "./UsuarioItem";
import PersonalCreateModal from "../modales/PersonalCreateModal";
import PersonalEditModal from "../modales/PersonalEditModal";
import PersonalDeleteModal from "../modales/PersonalDeleteModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../styles/usuarios/personal/personalpage.css";

import { getUsuarios } from "../../../actions/usuarios";

const UsuariosPage = ({ getUsuarios, usuario: { usuarios, loading } }) => {
  const [openCreateModal, setCreateOpenModal] = useState(false);
  const [openEditModal, setEditOpenModal] = useState(false);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleCreateModal = () => setCreateOpenModal(!openCreateModal);
  const handleEditModal = (id) => {
    const usuario = usuarios.find((c) => c.id === id);
    setSelectedUsuario(usuario);
    setEditOpenModal(true);
  };
  const handleDeleteModal = (id) => {
    setSelectedUsuarioId(id);
    setDeleteOpenModal(!openDeleteModal);
  };

  const handleSave = (updatedUsuario) => {
    console.log("Usuario actualizado:", updatedUsuario);
  };

  const filteredUsuarios = usuarios && usuarios.data 
  ? usuarios.data.filter(
    (usuario) =>
      `${usuario.nombre || ""} ${usuario.apellido || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (usuario.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  ):[];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <PersonalCreateModal
        open={openCreateModal}
        onClose={() => setCreateOpenModal(false)}
      />

      <PersonalEditModal
        open={openEditModal}
        onClose={() => setEditOpenModal(false)}
        usuarioId={selectedUsuarioId}
        onSave={handleSave}
      />
      <PersonalDeleteModal
        open={openDeleteModal}
        onClose={() => setDeleteOpenModal(false)}
        usuarioId={selectedUsuarioId}
      />

      <div className="personal-page">
        <h2 className="personal-page-h2">Nuestro Personal</h2>
        <div className="personal-page-control-buttons">
        <input
            placeholder="Buscar Usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="create-button" onClick={handleCreateModal}>
            Crear
          </button>
        </div>
        <div className="personal-list">
          <div className="personal-grid personal-header">
            <span>Id</span>
            <span>Nombre</span>
            {/* <span>Codigo</span>
            <span>Area</span> */}
            <span>Rol</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          <div className="personal-items">
          {filteredUsuarios.map((usuario) => (
              <UsuarioItem
              key={usuario.id}
              id={usuario.id}
              nombre={usuario.nombre}
              apellido={usuario.apellido}
              email={usuario.email} // Asegúrate de que estás pasando email aquí
              rol={usuario.rol}
              estado={usuario.activo ? "Activo" : "Inactivo"} // Ajusta según tu lógica
              onEdit={() => handleEditModal(usuario.id)} // Pasa el ID al callback
              onDelete={() => handleDeleteModal(usuario.id)} // Pasa el ID al callback
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

UsuariosPage.propTypes = {
  getUsuarios: PropTypes.func.isRequired,
  usuario: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  usuario: state.usuario,
});

export default connect(mapStateToProps, { getUsuarios })(UsuariosPage);


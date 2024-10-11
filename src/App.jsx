import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cajas from "./pages/Cajas";
import Producto from "./pages/Producto";
import Proveedores from "./pages/Proveedores";
import Clientes from "./pages/Clientes";
import Roles from "./pages/Roles";
import Ventas from "./pages/Ventas";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
import ProtectedRoute from "./security/ProtectedRoute";
import Usuarios from "./pages/Usuarios";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("cargando usuario");
  }, []);

  // useEffect(() => {
  //   
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       localStorage.removeItem("token"); // Elimina el token solo si la pestaña se oculta
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cajas" element={<Cajas />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cajas"
          element={
            <ProtectedRoute>
              <Cajas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <Ventas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal"
          element={
            <ProtectedRoute>
              <Personal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute>
              <Proveedores />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

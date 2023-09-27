import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import CadastroUsuario from "./cadastro/CadastroUsuario";
import AdminLayout from "layouts/Admin.js";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
};

export default App;


import React, { useState } from "react";
import { CNavbar, CNavItem, CNavLink, CNavbarBrand, CContainer, CNavbarToggler, CCollapse } from "@coreui/react";
import { motion } from "framer-motion";
import { FaBook, FaTasks, FaUserGraduate, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación

const RetractingSideBarStudent = ({ setComponent }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth(); // Obtenemos la función de logout

  return (
    <div>
      {/* Barra de Navegación Horizontal - Ocupa Todo el Ancho */}
      <CNavbar
        expand="lg"
        colorScheme="dark"
        className="bg-dark px-4 w-100 fixed-top"
        style={{ zIndex: 1060 }} // Asegurar que esté por encima del contenido pero debajo de la barra lateral
      >
        <CContainer fluid>
          {/* Logo e Identidad */}
          <CNavbarBrand className="text-white fw-bold">📚 E-Learning | Área Personal</CNavbarBrand>

          {/* Botón de Colapso en móviles */}
          <CNavbarToggler onClick={() => setMenuVisible(!menuVisible)} />

          {/* Menú Principal */}
          <CCollapse className="navbar-collapse" visible={menuVisible}>
            <div className="d-flex align-items-center w-100 justify-content-center">
              <CNavItem>
                <CNavLink href="#" className="text-white mx-3" onClick={() => setComponent("Mis Cursos")}>
                  📖 Mis Cursos
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" className="text-white mx-3" onClick={() => setComponent("Mis Tareas")}>
                  📝 Mis Tareas
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" className="text-white mx-3" onClick={() => setComponent("Mis Evaluaciones")}>
                  🏆 Mis Evaluaciones
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" className="text-white mx-3" onClick={() => setComponent("Perfil")}>
                  👤 Mi Perfil
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" className="text-danger mx-3" onClick={logout}>
                  🚪 Cerrar Sesión
                </CNavLink>
              </CNavItem>
            </div>
          </CCollapse>
        </CContainer>
      </CNavbar>

      {/* Barra Lateral Vertical Comprimida */}
      <motion.div
        className={`fixed left-0 top-0 h-full bg-dark shadow-lg pt-5 ${sidebarOpen ? "w-48" : "w-16"} transition-all`}
        style={{ zIndex: 1050 }} // Asegurar que esté por encima de la barra horizontal y el contenido
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="flex flex-col items-center py-4">
          <motion.button
            className="text-white text-2xl mb-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </motion.button>

          <NavButton Icon={FaBook} title="Cursos" onClick={() => setComponent("Mis Cursos")} sidebarOpen={sidebarOpen} />
          <NavButton Icon={FaTasks} title="Tareas" onClick={() => setComponent("Mis Tareas")} sidebarOpen={sidebarOpen} />
          <NavButton Icon={FaUserGraduate} title="Evaluaciones" onClick={() => setComponent("Mis Evaluaciones")} sidebarOpen={sidebarOpen} />
          <NavButton Icon={FaUserCircle} title="Perfil" onClick={() => setComponent("Mi Perfil")} sidebarOpen={sidebarOpen} />
          <NavButton Icon={FaSignOutAlt} title="Salir" onClick={logout} sidebarOpen={sidebarOpen} />
        </div>
      </motion.div>
    </div>
  );
};

const NavButton = ({ Icon, title, onClick, sidebarOpen }) => {
  return (
    <motion.div
      className="flex items-center text-white my-2 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <Icon className="text-2xl mx-2" />
      {sidebarOpen && <span className="text-sm">{title}</span>}
    </motion.div>
  );
};

export default RetractingSideBarStudent;

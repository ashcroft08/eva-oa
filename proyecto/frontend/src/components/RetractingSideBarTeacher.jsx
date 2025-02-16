import React, { useState } from "react";
import { FiChevronsRight, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoIosCreate } from "react-icons/io"; // Icono para asignar tareas
import { CiCircleCheck } from "react-icons/ci";
import { BsCaretDownFill } from "react-icons/bs"; 
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";



const RetractingSideBarTeacher = ({ setComponent }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Mis Cursos");

  const { user, logout } = useAuth();

  const handleComponentChange = (component) => {
    setSelected(component);
    setComponent(component);
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 overflow-visible"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection
        open={open}
        user={user}
        logout={logout}
        setSelected={handleComponentChange}
      />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Mis Cursos"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={PiStudent}
          title="Estudiantes Matriculados"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
         <Option
          Icon={IoIosCreate}
          title="Asignar Tareas"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
         <Option
          Icon={CiCircleCheck}
          title="Calificar Actividades"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
         <Option
          Icon={IoIosCreate}
          title="Asignar Foro"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={CiCircleCheck}
          title="Calificar Foros"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
         <Option
          Icon={MdOutlinePlayLesson}
          title="Gestionar Evaluaciones"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
         <Option
          Icon={FaCheckCircle}
          title="Calificar Pruebas"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={CgProfile}
          title="Perfil"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(); // Ejecuta lógica adicional como logout
    setSelected(title); // Marca como seleccionado
  };

  const content = (
    <>
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
    </>
  );

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {content}
    </motion.button>
  );
};

const TitleSection = ({ open, user, logout, setSelected }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const handleProfileClick = () => {
    setSelected("Perfil"); 
    setDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); 
  };

  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div
        className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                {user ? user.nombres : "Cargando..."}
              </span>

              <span className="block text-xs text-slate-500">Docente</span>
            </motion.div>
          )}
        </div>
        {open && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-slate-500 hover:text-slate-700"
            >
              <BsCaretDownFill className="text-sm" />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border border-slate-200 z-50"
              >
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <CgProfile className="inline-block mr-2" /> Perfil
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <IoIosLogOut className="inline-block mr-2" /> Cerrar Sesión
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Ocultar
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default RetractingSideBarTeacher;

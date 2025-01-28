import React, { useState } from "react";
import { FiChevronsRight, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { RiAdminLine } from "react-icons/ri";
import { PiGraduationCap } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";

const RetractingSideBar = ({ setComponent }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  const { user, logout } = useAuth(); // Moved inside the component
  //console.log(isAuthenticated, user);

  const handleComponentChange = (component) => {
    setSelected(component);
    setComponent(component);
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} user={user} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={BiSolidInstitution}
          title="Institución"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={RiAdminLine}
          title="Administradores"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={PiStudent}
          title="Estudiantes"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={FaChalkboardTeacher}
          title="Docentes"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={SiGoogleclassroom}
          title="Cursos"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={FaBookOpen}
          title="Asignar materias"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={GiTeacher}
          title="Asignar docentes"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={PiGraduationCap}
          title="Matricular estudiantes"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
        <Option
          Icon={MdOutlineGeneratingTokens}
          title="Expiración token"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />
      </div>

      {/* Aquí es donde añades un espacio entre las opciones */}
      <div className="mt-12">
        <Option
          Icon={CgProfile}
          title="Perfil"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
        />

        <Option
          Icon={IoIosLogOut}
          title="Cerrar Sesión"
          selected={selected}
          setSelected={handleComponentChange}
          open={open}
          to="/"
          onClick={() => logout()}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  to,
  onClick,
}) => {
  const isLogout = title === "Cerrar Sesión"; // Detecta si es la opción de logout
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
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </>
  );

  return isLogout ? (
    <Link
      to={to || "/"}
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {content}
    </Link>
  ) : (
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

const TitleSection = ({ open, user }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
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

              <span className="block text-xs text-slate-500">
                Administrador
              </span>
            </motion.div>
          )}
        </div>
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

export default RetractingSideBar;

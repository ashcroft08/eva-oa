import React, { useState } from "react";
import RetractingSideBar from "../components/RetractingSideBar";
import Dashboard from "../components/Dashboard";
import { RegisterAdmin } from "../components/RegisterAdmin";
import { RegisterStudent } from "../components/RegisterStudent";
import { RegisterTeacher } from "../components/RegisterTeacher";

const componentMap = {
  Dashboard: () => <Dashboard />,
  Administradores: () => <RegisterAdmin />,
  Estudiantes: () => <RegisterStudent />,
  Docentes: () => <RegisterTeacher />, // Receive setErrors as a prop
  Cursos: () => <div>Cursos Content</div>,
  Materias: () => <div>Materias Content</div>,
  Perfil: () => <div>Perfil Content</div>,
  "/": () => <div>Logout</div>,
};

function AdminPage() {
  const [component, setComponent] = useState("Dashboard");

  const renderComponent = () => {
    const ComponentToRender =
      componentMap[component] || (() => <div>Not Found</div>);
    // Pass setErrors as a prop if the component needs it
    return <ComponentToRender />;
  };

  return (
    <div className="flex">
      <RetractingSideBar setComponent={setComponent} />
      <div className="flex-grow p-4">{renderComponent()}</div>
    </div>
  );
}

export default AdminPage;

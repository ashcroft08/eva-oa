import React, { useState } from "react";
import RetractingSideBar from "../components/RetractingSideBar";
import Dashboard from "../components/Dashboard";
import { RegisterAdmin } from "../components/RegisterAdmin";
import { RegisterStudent } from "../components/RegisterStudent";
import { RegisterTeacher } from "../components/RegisterTeacher";
import { RegisterCurso } from "../components/RegisterCurso";
import { RegisterInstitucion } from "../components/RegisterInstitucion";
import { RegisterMateria } from "../components/RegisterMateria";
import {AsignarMateria} from "../components/AsignarMateria";
import { RegisterPeriodo } from "../components/RegisterPeriodo";
import EditPerfil from "../components/EditPerfil";
import {MatricularEstudiante} from "../components/MatricularEstudiante";
import DocenteMateria from "../components/DocenteMateria";

const componentMap = {
  Dashboard: () => <Dashboard />,
  Institución: () => <RegisterInstitucion />,
  Administradores: () => <RegisterAdmin />,
  Estudiantes: () => <RegisterStudent />,
  Docentes: () => <RegisterTeacher />, // Receive setErrors as a prop
  Cursos: () => <RegisterCurso />,
  "Asignar materias": () => <RegisterMateria />,
  "Asignar docentes": () => <DocenteMateria/>,
  //"Asignar materias": () => <AsignarMateria />,
  Periodos: () => <RegisterPeriodo />,
  "Matricular estudiantes": () => <MatricularEstudiante/>,
  Perfil: () => <EditPerfil />,
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
      <div className="flex-grow p-4 bg-gray-100 min-h-screen">{renderComponent()}</div>
    </div>
  );
}

export default AdminPage;

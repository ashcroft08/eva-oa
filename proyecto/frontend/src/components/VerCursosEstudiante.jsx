import { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { FaSearch } from "react-icons/fa";

const VerCursosEstudiante = ({ setCursoSeleccionado }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Nombre");

  // Cursos simulados con progreso y colores
  const cursos = [
    { id: 1, nombre: "Aplicaciones Informáticas II", progreso: 37, color: "#FF5733", descripcion: "Curso sobre desarrollo de software basado en objetos." },
    { id: 2, nombre: "Desarrollo y Operaciones de Software", progreso: 0, color: "#17A2B8", descripcion: "Gestión del ciclo de vida del software." },
    { id: 3, nombre: "Metodología para el Trabajo de Titulación", progreso: 0, color: "#6C757D", descripcion: "Metodología para la investigación en software." },
    { id: 4, nombre: "Prácticas de Servicio Comunitario", progreso: 9, color: "#007BFF", descripcion: "Aplicación de conocimientos en proyectos sociales." },
  ];

  // Filtrar cursos por búsqueda y ordenación
  const cursosFiltrados = cursos
    .filter((curso) => curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sort === "Nombre" ? a.nombre.localeCompare(b.nombre) : b.progreso - a.progreso));

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px", margin: "auto", paddingTop: "70px" }}>
      {/* Título Principal */}
      <div className="mb-3">
        <h3 className="fw-bold" style={{ textAlign: "left", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
          Vista General de Cursos
        </h3>
      </div>

      {/* Controles de Búsqueda y Ordenación */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <CFormInput
          type="text"
          placeholder="Buscar curso..."
          className="me-2"
          style={{ width: "400px", height: "40px", fontSize: "0.9rem" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CFormSelect value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "220px", height: "40px", fontSize: "0.9rem" }}>
          <option value="Nombre">Ordenar por nombre</option>
          <option value="Progreso">Ordenar por progreso</option>
        </CFormSelect>
      </div>

      {/* Tarjetas de Cursos */}
      <CRow className="justify-content-center">
        {cursosFiltrados.map((curso) => (
          <CCol md="3" className="mb-3" key={curso.id}>
            <CCard 
              className="shadow-lg border-0 text-center p-3"
              style={{ backgroundColor: curso.color, color: "white", borderRadius: "10px", minHeight: "140px", cursor: "pointer" }}
              onClick={() => setCursoSeleccionado(curso)} // Envía los datos al estado de StudentPage.jsx
            >
              <CCardHeader className="fw-bold" style={{ fontSize: "1rem" }}>{curso.nombre}</CCardHeader>
              <CCardBody>
                <p className="mt-2" style={{ fontSize: "0.9rem" }}>{curso.progreso}% completado</p>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default VerCursosEstudiante;

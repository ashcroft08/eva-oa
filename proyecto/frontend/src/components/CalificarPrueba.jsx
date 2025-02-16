import { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalificarPrueba = () => {
  const [calificarVisible, setCalificarVisible] = useState(false);
  const [calificacion, setCalificacion] = useState("");
  const [pruebaSeleccionada, setPruebaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda por estudiante
  const [filtroCurso, setFiltroCurso] = useState(""); // Estado para filtro por curso
  const [filtroMateria, setFiltroMateria] = useState(""); // Estado para filtro por materia

  // Datos de ejemplo de pruebas realizadas
  const [pruebas, setPruebas] = useState([
    { id: 1, estudiante: "Juan Pérez", curso: "Curso 1", materia: "Materia A", calificacion: null, fechaInicio: "2025-02-10 08:00", fechaFin: "2025-02-10 09:30", duracionMinutos: 90 },
    { id: 2, estudiante: "Ana López", curso: "Curso 1", materia: "Materia B", calificacion: null, fechaInicio: "2025-02-11 10:00", fechaFin: "2025-02-11 11:15", duracionMinutos: 75 },
    { id: 3, estudiante: "Carlos García", curso: "Curso 2", materia: "Materia C", calificacion: null, fechaInicio: "2025-02-12 14:00", fechaFin: "2025-02-12 15:45", duracionMinutos: 105 },
  ]);

  // Cursos y Materias disponibles
  const cursos = ["Curso 1", "Curso 2"];
  const materias = {
    "Curso 1": ["Materia A", "Materia B"],
    "Curso 2": ["Materia C"],
  };

  // Filtrar pruebas según el curso, materia y término de búsqueda (estudiante)
  const pruebasFiltradas = pruebas.filter(
    (prueba) =>
      (!filtroCurso || prueba.curso === filtroCurso) &&
      (!filtroMateria || prueba.materia === filtroMateria) &&
      (!searchTerm || prueba.estudiante.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const abrirCalificar = (prueba) => {
    setPruebaSeleccionada(prueba);
    setCalificacion(prueba.calificacion || "");
    setCalificarVisible(true);
  };

  const handleCalificar = () => {
    if (calificacion === "" || isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
      toast.error("Ingrese una calificación válida (0-100)");
      return;
    }

    setPruebas((prevPruebas) =>
      prevPruebas.map((p) =>
        p.id === pruebaSeleccionada.id
          ? { ...p, calificacion }
          : p
      )
    );

    toast.success("¡Prueba calificada correctamente!");
    setCalificarVisible(false);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Calificar Pruebas</h5>
            {/* Barra de Búsqueda */}
            <div className="d-flex align-items-center">
              <CFormInput
                type="text"
                placeholder="Buscar por estudiante..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch />
            </div>
          </div>
          {/* Filtros por Curso y Materia */}
          <div className="mt-3 d-flex gap-3">
            <CFormSelect value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)}>
              <option value="">Filtrar por Curso</option>
              {cursos.map((curso, index) => (
                <option key={index} value={curso}>{curso}</option>
              ))}
            </CFormSelect>
            <CFormSelect value={filtroMateria} onChange={(e) => setFiltroMateria(e.target.value)} disabled={!filtroCurso}>
              <option value="">Filtrar por Materia</option>
              {filtroCurso &&
                materias[filtroCurso]?.map((materia, index) => (
                  <option key={index} value={materia}>{materia}</option>
                ))}
            </CFormSelect>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Estudiante</CTableHeaderCell>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
                <CTableHeaderCell>Duración (min)</CTableHeaderCell>
                <CTableHeaderCell>Calificación</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pruebasFiltradas.map((prueba) => (
                <CTableRow key={prueba.id}>
                  <CTableDataCell>{prueba.estudiante}</CTableDataCell>
                  <CTableDataCell>{prueba.curso}</CTableDataCell>
                  <CTableDataCell>{prueba.materia}</CTableDataCell>
                  <CTableDataCell>{prueba.fechaInicio}</CTableDataCell>
                  <CTableDataCell>{prueba.fechaFin}</CTableDataCell>
                  <CTableDataCell>{prueba.duracionMinutos}</CTableDataCell>
                  <CTableDataCell>{prueba.calificacion !== null ? prueba.calificacion : "Sin calificar"}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => abrirCalificar(prueba)}>
                      <FaCheck /> Calificar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Calificar Prueba */}
      <CModal visible={calificarVisible} onClose={() => setCalificarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Calificar Prueba</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput type="number" placeholder="Calificación (0-100)" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCalificarVisible(false)}>Cerrar</CButton>
          <CButton color="primary" onClick={handleCalificar}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default CalificarPrueba;

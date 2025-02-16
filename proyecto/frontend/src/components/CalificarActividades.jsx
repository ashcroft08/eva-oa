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

const CalificarActividades = () => {
  const [calificarVisible, setCalificarVisible] = useState(false);
  const [calificacion, setCalificacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [filtroCurso, setFiltroCurso] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Tarea 1", estudiante: "Juan Pérez", archivo: "tarea1_juan.pdf", curso: "Curso 1", materia: "Materia A", fechaEntrega: "15/02/2025", calificacion: null, observaciones: "" },
    { id: 2, titulo: "Tarea 2", estudiante: "María López", archivo: "tarea2_maria.docx", curso: "Curso 1", materia: "Materia B", fechaEntrega: "20/02/2025", calificacion: null, observaciones: "" },
    { id: 3, titulo: "Tarea 3", estudiante: "Carlos García", archivo: "tarea3_carlos.pdf", curso: "Curso 2", materia: "Materia C", fechaEntrega: "18/02/2025", calificacion: null, observaciones: "" },
  ]);

  const cursos = ["Curso 1", "Curso 2"];
  const materias = {
    "Curso 1": ["Materia A", "Materia B"],
    "Curso 2": ["Materia C"],
  };

  const abrirCalificar = (tarea) => {
    setTareaSeleccionada(tarea);
    setCalificacion(tarea.calificacion || "");
    setObservaciones(tarea.observaciones || "");
    setCalificarVisible(true);
  };

  const handleCalificar = () => {
    if (calificacion === "" || isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
      toast.error("Ingrese una calificación válida (0-100)");
      return;
    }

    setTareas((prevTareas) =>
      prevTareas.map((t) =>
        t.id === tareaSeleccionada.id
          ? { ...t, calificacion, observaciones }
          : t
      )
    );

    toast.success("¡Tarea calificada correctamente!");
    setCalificarVisible(false);
  };

  // Filtrar tareas en base al curso, materia y término de búsqueda (estudiante)
  const tareasFiltradas = tareas.filter(
    (t) =>
      (!filtroCurso || t.curso === filtroCurso) &&
      (!filtroMateria || t.materia === filtroMateria) &&
      (!searchTerm || t.estudiante.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Calificar Actividades</h5>
            {/* Barra de Búsqueda */}
            <div className="d-flex align-items-center">
              <CFormInput
                type="text"
                placeholder="Buscar estudiante..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch />
            </div>
          </div>
          <div className="d-flex gap-3 mt-3">
            <CFormSelect value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)}>
              <option value="">Seleccionar Curso</option>
              {cursos.map((curso, index) => (
                <option key={index} value={curso}>{curso}</option>
              ))}
            </CFormSelect>

            <CFormSelect value={filtroMateria} onChange={(e) => setFiltroMateria(e.target.value)} disabled={!filtroCurso}>
              <option value="">Seleccionar Materia</option>
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
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Estudiante</CTableHeaderCell>
                <CTableHeaderCell>Archivo Entregado</CTableHeaderCell>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
                <CTableHeaderCell>Calificación</CTableHeaderCell>
                <CTableHeaderCell>Observaciones</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tareasFiltradas.map((tarea) => (
                <CTableRow key={tarea.id}>
                  <CTableDataCell>{tarea.titulo}</CTableDataCell>
                  <CTableDataCell>{tarea.estudiante}</CTableDataCell>
                  <CTableDataCell>
                    <a href={`#${tarea.archivo}`} download>{tarea.archivo}</a>
                  </CTableDataCell>
                  <CTableDataCell>{tarea.curso}</CTableDataCell>
                  <CTableDataCell>{tarea.materia}</CTableDataCell>
                  <CTableDataCell>{tarea.fechaEntrega}</CTableDataCell>
                  <CTableDataCell>{tarea.calificacion !== null ? tarea.calificacion : "Sin calificar"}</CTableDataCell>
                  <CTableDataCell>{tarea.observaciones || "Sin observaciones"}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => abrirCalificar(tarea)}>
                      <FaCheck /> Calificar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Calificar */}
      <CModal visible={calificarVisible} onClose={() => setCalificarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Calificar Tarea</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Estudiante</label>
              <CFormInput type="text" value={tareaSeleccionada?.estudiante} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Calificación (0-100)</label>
              <CFormInput type="number" min="0" max="100" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <CFormInput type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
            </div>
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

export default CalificarActividades;

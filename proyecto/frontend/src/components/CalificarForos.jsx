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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
} from "@coreui/react";
import { FaCheck, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalificarForos = () => {
  const [calificarVisible, setCalificarVisible] = useState(false);
  const [calificacion, setCalificacion] = useState("");
  const [foroSeleccionado, setForoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [filtroCurso, setFiltroCurso] = useState(""); // Estado para filtrar por curso

  const [foros, setForos] = useState([
    { id: 1, estudiante: "Juan Pérez", curso: "Curso 1", materia: "Materia A", titulo: "Impacto del cambio climático", contenido: "Debemos reducir la huella de carbono.", fechaPublicacion: "10/02/2025", puntaje: null },
    { id: 2, estudiante: "Ana López", curso: "Curso 1", materia: "Materia B", titulo: "Avances en inteligencia artificial", contenido: "La IA está revolucionando la industria.", fechaPublicacion: "15/02/2025", puntaje: null },
    { id: 3, estudiante: "Carlos García", curso: "Curso 2", materia: "Materia C", titulo: "Ética en la tecnología", contenido: "Debemos regular el uso de la IA.", fechaPublicacion: "18/02/2025", puntaje: null },
  ]);

  const cursos = ["Curso 1", "Curso 2"]; // Cursos disponibles

  // Filtrar foros por término de búsqueda (estudiante/título) y curso seleccionado
  const forosFiltrados = foros.filter(
    (foro) =>
      (!searchTerm || foro.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) || foro.titulo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filtroCurso || foro.curso === filtroCurso)
  );

  const abrirCalificar = (foro) => {
    setForoSeleccionado(foro);
    setCalificacion(foro.puntaje || "");
    setCalificarVisible(true);
  };

  const handleCalificar = () => {
    if (calificacion === "" || isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
      toast.error("Ingrese un puntaje válido (0-100)");
      return;
    }

    setForos((prevForos) =>
      prevForos.map((f) =>
        f.id === foroSeleccionado.id
          ? { ...f, puntaje: calificacion }
          : f
      )
    );

    toast.success("¡Foro calificado correctamente!");
    setCalificarVisible(false);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Calificar Foros</h5>
            {/* Barra de Búsqueda */}
            <div className="d-flex align-items-center">
              <CFormInput
                type="text"
                placeholder="Buscar por estudiante o título..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch />
            </div>
          </div>
          {/* Filtro por Curso */}
          <div className="mt-3">
            <CFormSelect value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)}>
              <option value="">Filtrar por Curso</option>
              {cursos.map((curso, index) => (
                <option key={index} value={curso}>
                  {curso}
                </option>
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
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Contenido</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Publicación</CTableHeaderCell>
                <CTableHeaderCell>Puntaje</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {forosFiltrados.map((foro) => (
                <CTableRow key={foro.id}>
                  <CTableDataCell>{foro.estudiante}</CTableDataCell>
                  <CTableDataCell>{foro.curso}</CTableDataCell>
                  <CTableDataCell>{foro.materia}</CTableDataCell>
                  <CTableDataCell>{foro.titulo}</CTableDataCell>
                  <CTableDataCell>{foro.contenido}</CTableDataCell>
                  <CTableDataCell>{foro.fechaPublicacion}</CTableDataCell>
                  <CTableDataCell>{foro.puntaje !== null ? foro.puntaje : "Sin calificar"}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="me-2" onClick={() => abrirCalificar(foro)}>
                      <FaCheck /> Calificar
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Calificar Foro */}
      <CModal visible={calificarVisible} onClose={() => setCalificarVisible(false)}>
        <CModalHeader>
          <CModalTitle>Calificar Foro</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Estudiante</label>
              <CFormInput type="text" value={foroSeleccionado?.estudiante} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Curso</label>
              <CFormInput type="text" value={foroSeleccionado?.curso} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Materia</label>
              <CFormInput type="text" value={foroSeleccionado?.materia} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Puntaje (0-100)</label>
              <CFormInput type="number" min="0" max="100" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
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

export default CalificarForos;

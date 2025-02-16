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
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AsignarEvaluacion = () => {
  const [visible, setVisible] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaApertura, setFechaApertura] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState("");
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda

  // Cursos y Materias disponibles
  const cursos = ["Curso 1", "Curso 2", "Curso 3"];
  const materias = {
    "Curso 1": ["Materia A", "Materia B"],
    "Curso 2": ["Materia C", "Materia D"],
    "Curso 3": ["Materia E", "Materia F"],
  };

  const handleGuardarEvaluacion = () => {
    if (!titulo || !descripcion || !fechaApertura || !fechaCierre || !duracionMinutos || !cursoSeleccionado || !materiaSeleccionada) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const nuevaEvaluacion = {
      id: evaluaciones.length + 1,
      curso: cursoSeleccionado,
      materia: materiaSeleccionada,
      titulo,
      descripcion,
      fechaApertura,
      fechaCierre,
      duracionMinutos,
    };

    setEvaluaciones([...evaluaciones, nuevaEvaluacion]);
    toast.success("¡Evaluación asignada correctamente!");
    setVisible(false);

    // Limpiar formulario
    setTitulo("");
    setDescripcion("");
    setFechaApertura("");
    setFechaCierre("");
    setDuracionMinutos("");
  };

  const handleEliminarEvaluacion = (id) => {
    setEvaluaciones(evaluaciones.filter((evaluacion) => evaluacion.id !== id));
    toast.success("¡Evaluación eliminada correctamente!");
  };

  // Filtrar evaluaciones por curso o título de estudiante
  const evaluacionesFiltradas = evaluaciones.filter(
    (evaluacion) =>
      (!searchTerm ||
        evaluacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluacion.curso.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5>Gestionar Evaluaciones</h5>
          <div className="d-flex align-items-center">
            <CFormInput
              type="text"
              placeholder="Buscar por curso o estudiante..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </div>
          <CButton color="success" onClick={() => setVisible(true)}>
            <FaPlus className="me-2" />
            Asignar Evaluación
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Fecha Apertura</CTableHeaderCell>
                <CTableHeaderCell>Fecha Cierre</CTableHeaderCell>
                <CTableHeaderCell>Duración (min)</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {evaluacionesFiltradas.map((evaluacion) => (
                <CTableRow key={evaluacion.id}>
                  <CTableDataCell>{evaluacion.curso}</CTableDataCell>
                  <CTableDataCell>{evaluacion.materia}</CTableDataCell>
                  <CTableDataCell>{evaluacion.titulo}</CTableDataCell>
                  <CTableDataCell>{evaluacion.descripcion}</CTableDataCell>
                  <CTableDataCell>{evaluacion.fechaApertura}</CTableDataCell>
                  <CTableDataCell>{evaluacion.fechaCierre}</CTableDataCell>
                  <CTableDataCell>{evaluacion.duracionMinutos}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="danger" onClick={() => handleEliminarEvaluacion(evaluacion.id)}>
                      <FaTrash />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Asignar Evaluación */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Asignar Nueva Evaluación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="mb-3" />
            <CFormInput type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="mb-3" />

            <CFormSelect value={cursoSeleccionado} onChange={(e) => setCursoSeleccionado(e.target.value)} className="mb-3">
              <option value="">Seleccione un curso</option>
              {cursos.map((curso, index) => (
                <option key={index} value={curso}>
                  {curso}
                </option>
              ))}
            </CFormSelect>

            <CFormSelect value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)} className="mb-3">
              <option value="">Seleccione una materia</option>
              {cursoSeleccionado &&
                materias[cursoSeleccionado]?.map((materia, index) => (
                  <option key={index} value={materia}>
                    {materia}
                  </option>
                ))}
            </CFormSelect>

            <CFormInput type="datetime-local" placeholder="Fecha de Apertura" value={fechaApertura} onChange={(e) => setFechaApertura(e.target.value)} className="mb-3" />
            <CFormInput type="datetime-local" placeholder="Fecha de Cierre" value={fechaCierre} onChange={(e) => setFechaCierre(e.target.value)} className="mb-3" />
            <CFormInput type="number" placeholder="Duración en minutos" value={duracionMinutos} onChange={(e) => setDuracionMinutos(e.target.value)} className="mb-3" />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cerrar</CButton>
          <CButton color="primary" onClick={handleGuardarEvaluacion}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default AsignarEvaluacion;

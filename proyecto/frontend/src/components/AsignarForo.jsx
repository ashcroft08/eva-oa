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

const AsignarForo = () => {
  const [foroVisible, setForoVisible] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [foros, setForos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda
  const [bloquearSeleccion, setBloquearSeleccion] = useState(false);

  // Datos de ejemplo
  const cursos = ["Curso 1", "Curso 2", "Curso 3"];
  const materias = {
    "Curso 1": ["Materia A", "Materia B"],
    "Curso 2": ["Materia C", "Materia D"],
    "Curso 3": ["Materia E", "Materia F"],
  };

  const handleGuardarForo = () => {
    if (!titulo || !contenido || !fechaPublicacion || !cursoSeleccionado || !materiaSeleccionada) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const nuevoForo = {
      id: foros.length + 1,
      curso: cursoSeleccionado,
      materia: materiaSeleccionada,
      titulo,
      contenido,
      fechaPublicacion,
    };

    setForos([...foros, nuevoForo]);
    toast.success("¡Foro asignado correctamente!");
    setForoVisible(false);

    // Limpiar solo los valores del foro, sin borrar la selección de curso/materia si está bloqueada
    setTitulo("");
    setContenido("");
    setFechaPublicacion("");
  };

  const handleEliminarForo = (id) => {
    setForos(foros.filter((foro) => foro.id !== id));
    toast.success("¡Foro eliminado correctamente!");
  };

  // Filtrar foros según el término de búsqueda (curso o título)
  const forosFiltrados = foros.filter(
    (foro) =>
      (!searchTerm || foro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || foro.curso.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5>Asignar Foro</h5>
          <div className="d-flex align-items-center">
            <CFormInput
              type="text"
              placeholder="Buscar por título o curso..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </div>
          <CButton color="success" onClick={() => setForoVisible(true)}>
            <FaPlus className="me-2" />
            Asignar Foro
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Contenido</CTableHeaderCell>
                <CTableHeaderCell>Fecha Publicación</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {forosFiltrados.map((foro) => (
                <CTableRow key={foro.id}>
                  <CTableDataCell>{foro.curso}</CTableDataCell>
                  <CTableDataCell>{foro.materia}</CTableDataCell>
                  <CTableDataCell>{foro.titulo}</CTableDataCell>
                  <CTableDataCell>{foro.contenido}</CTableDataCell>
                  <CTableDataCell>{foro.fechaPublicacion}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="danger" onClick={() => handleEliminarForo(foro.id)}>
                      <FaTrash />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Asignar Foro */}
      <CModal visible={foroVisible} onClose={() => setForoVisible(false)}>
        <CModalHeader>
          <CModalTitle>Asignar Nuevo Foro</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <CFormInput type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contenido</label>
              <CFormInput type="text" value={contenido} onChange={(e) => setContenido(e.target.value)} />
            </div>

            {/* Bloquear selección del curso/materia si ya se eligió antes */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h6>Usar misma selección para próximos foros</h6>
              <input type="checkbox" checked={bloquearSeleccion} onChange={(e) => setBloquearSeleccion(e.target.checked)} />
            </div>

            {!bloquearSeleccion && (
              <>
                <div className="mb-3">
                  <label className="form-label">Seleccionar Curso</label>
                  <CFormSelect value={cursoSeleccionado} onChange={(e) => setCursoSeleccionado(e.target.value)}>
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso, index) => (
                      <option key={index} value={curso}>
                        {curso}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
                {cursoSeleccionado && (
                  <div className="mb-3">
                    <label className="form-label">Seleccionar Materia</label>
                    <CFormSelect value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)}>
                      <option value="">Seleccione una materia</option>
                      {materias[cursoSeleccionado]?.map((materia, index) => (
                        <option key={index} value={materia}>
                          {materia}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                )}
              </>
            )}

            <div className="mb-3">
              <label className="form-label">Fecha de Publicación</label>
              <CFormInput type="date" value={fechaPublicacion} onChange={(e) => setFechaPublicacion(e.target.value)} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setForoVisible(false)}>Cerrar</CButton>
          <CButton color="primary" onClick={handleGuardarForo}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default AsignarForo;

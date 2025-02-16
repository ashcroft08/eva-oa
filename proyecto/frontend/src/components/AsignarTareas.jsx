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
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AsignarTarea = () => {
  const [visible, setVisible] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaApertura, setFechaApertura] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [tareas, setTareas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [bloquearSeleccion, setBloquearSeleccion] = useState(false);

  // Datos de ejemplo
  const cursos = ["Curso 1", "Curso 2", "Curso 3"];
  const materias = {
    "Curso 1": ["Materia A", "Materia B"],
    "Curso 2": ["Materia C", "Materia D"],
    "Curso 3": ["Materia E", "Materia F"],
  };

  const handleGuardarTarea = () => {
    if (titulo && cursoSeleccionado && materiaSeleccionada && fechaEntrega) {
      const nuevaTarea = {
        id: tareas.length + 1,
        titulo,
        curso: cursoSeleccionado,
        materia: materiaSeleccionada,
        fechaEntrega,
      };

      setTareas([...tareas, nuevaTarea]);
      setVisible(false);
      toast.success("¡Tarea asignada correctamente!");

      // Limpiar solo los campos de la tarea, sin resetear el curso/materia si está bloqueado
      setTitulo("");
      setDescripcion("");
      setFechaApertura("");
      setFechaEntrega("");
    } else {
      toast.error("Por favor, complete todos los campos.");
    }
  };

  const handleEliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    toast.success("¡Tarea eliminada correctamente!");
  };

  // Filtrar tareas según el término de búsqueda
  const tareasFiltradas = tareas.filter(
    (tarea) =>
      (!searchTerm || tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || tarea.curso.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h5>Asignar Tareas</h5>
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
          <CButton color="success" onClick={() => setVisible(true)}>
            <FaPlus className="me-2" />
            Asignar Tarea
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tareasFiltradas.map((tarea) => (
                <CTableRow key={tarea.id}>
                  <CTableDataCell>{tarea.titulo}</CTableDataCell>
                  <CTableDataCell>{tarea.curso}</CTableDataCell>
                  <CTableDataCell>{tarea.materia}</CTableDataCell>
                  <CTableDataCell>{tarea.fechaEntrega}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="danger" onClick={() => handleEliminarTarea(tarea.id)}>
                      <FaTrash />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal para Asignar Tarea */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Asignar Nueva Tarea</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <CFormInput type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <CFormInput type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>

            {/* Bloquear selección del curso/materia si ya se eligió antes */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h6>Usar misma selección para próximas tareas</h6>
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
              <label className="form-label">Fecha de Apertura</label>
              <CFormInput type="date" value={fechaApertura} onChange={(e) => setFechaApertura(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de Entrega</label>
              <CFormInput type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cerrar</CButton>
          <CButton color="primary" onClick={handleGuardarTarea}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      <ToastContainer />
    </>
  );
};

export default AsignarTarea;

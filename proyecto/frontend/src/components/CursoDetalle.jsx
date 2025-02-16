import { CContainer, CRow, CCol, CNav, CNavItem, CNavLink, CButton, CCard, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from "@coreui/react";
import { useState } from "react";

const CursoDetalle = ({ curso, setCursoSeleccionado }) => {
  const [activeTab, setActiveTab] = useState("inicio");

  // Datos de ejemplo de Tareas, Foros y Evaluaciones
  const tareas = [
    { titulo: "Ejercicio de Álgebra", fechaEntrega: "2025-03-15" },
    { titulo: "Ensayo sobre Revolución Francesa", fechaEntrega: "2025-03-18" },
  ];

  const foros = [
    { titulo: "Discusión sobre Métodos Numéricos", fecha: "2025-02-20" },
    { titulo: "Importancia de la Inteligencia Artificial", fecha: "2025-02-22" },
  ];

  const evaluaciones = [
    { titulo: "Examen de Álgebra", fecha: "2025-03-10" },
    { titulo: "Evaluación de Historia", fecha: "2025-03-25" },
  ];

  return (
    <CContainer className="mt-5">
      {/* Botón para volver */}
      <CButton color="secondary" className="mb-3" onClick={() => setCursoSeleccionado(null)}>
        🔙 Volver a Cursos
      </CButton>

      {/* Desplazar contenido a la derecha */}
      <div style={{ marginLeft: "50px" }}>
        <CRow>
          {/* Contenido Principal */}
          <CCol md="12">
            <h2 className="fw-bold">{curso.nombre}</h2>

            {/* Menú de Navegación */}
            <CNav variant="tabs" className="mt-3">
              <CNavItem>
                <CNavLink active={activeTab === "inicio"} onClick={() => setActiveTab("inicio")}>
                  Inicio
                </CNavLink>
              </CNavItem>
            </CNav>

            {/* Contenido */}
            <CRow className="mt-4">
              <CCol md="12">{activeTab === "inicio" && <p>{curso.descripcion}</p>}</CCol>
            </CRow>
          </CCol>
        </CRow>

        {/* Sección de Tareas, Foros y Evaluaciones */}
        <CRow className="mt-5">
          <CCol md="4">
            <CCard className="shadow-sm">
              <CCardHeader className="fw-bold bg-light">📝 Tareas Asignadas</CCardHeader>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Título</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tareas.length > 0 ? (
                    tareas.map((tarea, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{tarea.titulo}</CTableDataCell>
                        <CTableDataCell>{tarea.fechaEntrega}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="2" className="text-center">
                        No hay tareas asignadas
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCard>
          </CCol>

          <CCol md="4">
            <CCard className="shadow-sm">
              <CCardHeader className="fw-bold bg-light">💬 Foros Asignados</CCardHeader>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Título</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {foros.length > 0 ? (
                    foros.map((foro, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{foro.titulo}</CTableDataCell>
                        <CTableDataCell>{foro.fecha}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="2" className="text-center">
                        No hay foros asignados
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCard>
          </CCol>

          <CCol md="4">
            <CCard className="shadow-sm">
              <CCardHeader className="fw-bold bg-light">📅 Evaluaciones Asignadas</CCardHeader>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Título</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {evaluaciones.length > 0 ? (
                    evaluaciones.map((evaluacion, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{evaluacion.titulo}</CTableDataCell>
                        <CTableDataCell>{evaluacion.fecha}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="2" className="text-center">
                        No hay evaluaciones asignadas
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
};

export default CursoDetalle;

import { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormSelect,
} from "@coreui/react";
import { FaClock, FaFilter } from "react-icons/fa";

const VerTareasEstudiante = () => {
  const [orden, setOrden] = useState("fecha"); // Estado para ordenación
  const [filtroTiempo, setFiltroTiempo] = useState("Todas"); // Estado para filtrar por tiempo

  // Tareas simuladas
  const tareas = [
    { titulo: "Ejercicio de Álgebra", curso: "Matemáticas", fechaEntrega: "2025-03-15" },
    { titulo: "Ensayo sobre la Revolución Francesa", curso: "Historia", fechaEntrega: "2025-03-18" },
    { titulo: "Informe de Física", curso: "Física", fechaEntrega: "2025-04-05" },
    { titulo: "Trabajo de Biología", curso: "Biología", fechaEntrega: "2025-06-01" },
    { titulo: "Exposición de Química", curso: "Química", fechaEntrega: "2025-06-25" },
  ];

  // Función para calcular la diferencia en días entre la fecha actual y la fecha de entrega
  const calcularDiasRestantes = (fecha) => {
    const fechaEntrega = new Date(fecha);
    const hoy = new Date();
    const diferenciaTiempo = fechaEntrega - hoy;
    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  };

  // Aplicar filtro por tiempo
  const filtrarPorTiempo = (tareas) => {
    if (filtroTiempo === "6_dias") return tareas.filter((tarea) => calcularDiasRestantes(tarea.fechaEntrega) <= 6);
    if (filtroTiempo === "30_dias") return tareas.filter((tarea) => calcularDiasRestantes(tarea.fechaEntrega) <= 30);
    if (filtroTiempo === "3_meses") return tareas.filter((tarea) => calcularDiasRestantes(tarea.fechaEntrega) <= 90);
    return tareas; // Si es "Todas", no aplicar filtro
  };

  // Aplicar ordenación
  const tareasFiltradas = filtrarPorTiempo([...tareas]).sort((a, b) => {
    if (orden === "fecha") return new Date(a.fechaEntrega) - new Date(b.fechaEntrega);
    if (orden === "curso") return a.curso.localeCompare(b.curso);
    return 0;
  });

  return (
    <CCard className="shadow-sm border-0 p-4 mt-3" style={{ maxWidth: "1000px", margin: "auto" }}>
      {/* Título y Filtros */}
      <CCardHeader className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <h5 className="fw-bold">Línea de tiempo</h5>
        <div className="d-flex gap-2">
          <CFormSelect value={orden} onChange={(e) => setOrden(e.target.value)} className="me-2">
            <option value="fecha">Ordenar por fecha</option>
            <option value="curso">Ordenar por curso</option>
          </CFormSelect>
          <CFormSelect value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)} className="me-2">
            <option value="Todas">Todas las tareas</option>
            <option value="6_dias">Próximas en 6 días</option>
            <option value="30_dias">Próximas en 30 días</option>
            <option value="3_meses">Próximas en 3 meses</option>
          </CFormSelect>
          <CButton color="light">
            <FaFilter className="me-1" />
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody>
        {/* Tabla de Tareas */}
        {tareasFiltradas.length > 0 ? (
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Curso</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tareasFiltradas.map((tarea, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{tarea.titulo}</CTableDataCell>
                  <CTableDataCell>{tarea.curso}</CTableDataCell>
                  <CTableDataCell>{tarea.fechaEntrega}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <div className="text-center py-4">
            <img src="https://via.placeholder.com/50" alt="Sin tareas" className="mb-3" />
            <p className="text-muted">No hay actividades que requieran acciones</p>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default VerTareasEstudiante;

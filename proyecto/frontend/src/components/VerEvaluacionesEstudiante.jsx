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

const VerEvaluacionesEstudiante = () => {
  const [orden, setOrden] = useState("fecha"); // Estado para ordenación
  const [filtroTiempo, setFiltroTiempo] = useState("Todas"); // Estado para filtrar por tiempo

  // Evaluaciones simuladas
  const evaluaciones = [
    { titulo: "Examen de Álgebra", materia: "Matemáticas", fecha: "2025-03-15", duracion: 60 },
    { titulo: "Prueba de Historia Moderna", materia: "Historia", fecha: "2025-03-18", duracion: 90 },
    { titulo: "Evaluación de Física", materia: "Física", fecha: "2025-04-05", duracion: 75 },
    { titulo: "Test de Biología", materia: "Biología", fecha: "2025-06-01", duracion: 120 },
    { titulo: "Examen de Química", materia: "Química", fecha: "2025-06-25", duracion: 80 },
  ];

  // Función para calcular la diferencia en días entre la fecha actual y la fecha de evaluación
  const calcularDiasRestantes = (fecha) => {
    const fechaEvaluacion = new Date(fecha);
    const hoy = new Date();
    const diferenciaTiempo = fechaEvaluacion - hoy;
    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  };

  // Aplicar filtro por tiempo
  const filtrarPorTiempo = (evaluaciones) => {
    if (filtroTiempo === "6_dias") return evaluaciones.filter((ev) => calcularDiasRestantes(ev.fecha) <= 6);
    if (filtroTiempo === "30_dias") return evaluaciones.filter((ev) => calcularDiasRestantes(ev.fecha) <= 30);
    if (filtroTiempo === "3_meses") return evaluaciones.filter((ev) => calcularDiasRestantes(ev.fecha) <= 90);
    return evaluaciones; // Si es "Todas", no aplicar filtro
  };

  // Aplicar ordenación
  const evaluacionesFiltradas = filtrarPorTiempo([...evaluaciones]).sort((a, b) => {
    if (orden === "fecha") return new Date(a.fecha) - new Date(b.fecha);
    if (orden === "materia") return a.materia.localeCompare(b.materia);
    return 0;
  });

  return (
    <CCard className="shadow-sm border-0 p-4 mt-3" style={{ maxWidth: "1000px", margin: "auto" }}>
      {/* Título y Filtros */}
      <CCardHeader className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <h5 className="fw-bold">📅 Mis Evaluaciones</h5>
        <div className="d-flex gap-2">
          <CFormSelect value={orden} onChange={(e) => setOrden(e.target.value)} className="me-2">
            <option value="fecha">Ordenar por fecha</option>
            <option value="materia">Ordenar por materia</option>
          </CFormSelect>
          <CFormSelect value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)} className="me-2">
            <option value="Todas">Todas las evaluaciones</option>
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
        {/* Tabla de Evaluaciones */}
        {evaluacionesFiltradas.length > 0 ? (
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Título</CTableHeaderCell>
                <CTableHeaderCell>Materia</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Duración (min)</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {evaluacionesFiltradas.map((evaluacion, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{evaluacion.titulo}</CTableDataCell>
                  <CTableDataCell>{evaluacion.materia}</CTableDataCell>
                  <CTableDataCell>{evaluacion.fecha}</CTableDataCell>
                  <CTableDataCell>{evaluacion.duracion}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <div className="text-center py-4">
            {/* <img src="/uploads/logo_institucion.jpeg" alt="Sin evaluaciones" className="mb-3" /> */}
            <p className="text-muted">No hay evaluaciones disponibles</p>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default VerEvaluacionesEstudiante;

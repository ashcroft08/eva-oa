import { useContext, useEffect } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
} from "@coreui/react";
import { DashboardContext } from "../context/DashboardContext"; // Asegúrate de que la ruta sea correcta

export function Dashboard() {
  const { dashboardData, loading, error, fetchDashboardData } =
    useContext(DashboardContext);

  // Llama a fetchDashboardData cada vez que el componente se monta
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner o un mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar el mensaje de error
  }

  return (
    <CContainer fluid className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <CRow className="mb-6">
        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-user-shield text-2xl mr-2"></i>
                <span>Administradores</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">Total de administradores:</p>
              <p className="text-3xl font-bold text-indigo-600">
                {dashboardData.totalAdministradores}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Último registro:{" "}
                {dashboardData.ultimoAdministrador
                  ? new Date(
                      dashboardData.ultimoAdministrador
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-chalkboard-teacher text-2xl mr-2"></i>
                <span>Docentes</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">Total de docentes:</p>
              <p className="text-3xl font-bold text-teal-600">
                {dashboardData.totalDocentes}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Último registro:{" "}
                {dashboardData.ultimoDocente
                  ? new Date(dashboardData.ultimoDocente).toLocaleDateString()
                  : "N/A"}
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-user-graduate text-2xl mr-2"></i>
                <span>Estudiantes</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">Total de estudiantes:</p>
              <p className="text-3xl font-bold text-pink-600">
                {dashboardData.totalEstudiantes}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Último registro:{" "}
                {dashboardData.ultimoEstudiante
                  ? new Date(
                      dashboardData.ultimoEstudiante
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mb-6">
        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-book text-2xl mr-2"></i>
                <span>Cursos</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">
                Total de cursos disponibles:
              </p>
              <p className="text-3xl font-bold text-green-600">
                {dashboardData.totalCursos}
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-book-open text-2xl mr-2"></i>
                <span>Materias</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">
                Total de materias registradas:
              </p>
              <p className="text-3xl font-bold text-yellow-600">
                {dashboardData.totalMaterias}
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="shadow-lg transform transition-transform duration-300 hover:scale-105">
            <CCardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-tasks text-2xl mr-2"></i>
                <span>Periodo</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">Periodo Actual:</p>
              <p className="text-3xl font-bold text-red-600">
                {dashboardData.periodoActual}
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mb-6">
        {/* Gráfico de Actividad */}
        <CCol>
          <CCard className="shadow-lg">
            <CCardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-chart-line text-2xl mr-2"></i>
                <span>Gráfico de Actividad</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">
                Actividad reciente de usuarios:
              </p>
              {/* Aquí puedes integrar un gráfico (por ejemplo, Chart.js o cualquier otra librería) */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Ejemplo de gráfico:</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-center text-gray-600">
                    Gráfico de actividad (simulado)
                  </p>
                  <div className="h-48 flex items-center justify-center">
                    <span className="text-gray-400">(Gráfico aquí)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Última actualización: 12/10/2023
              </p>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Últimas Notificaciones */}
        {/*<CCol md={4}>
          <CCard className="shadow-lg">
            <CCardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-4">
              <div className="flex items-center">
                <i className="fas fa-bell text-2xl mr-2"></i>
                <span>Últimas Notificaciones</span>
              </div>
            </CCardHeader>
            <CCardBody className="p-6">
              <p className="text-gray-700 text-lg">Notificaciones recientes:</p>
              <ul className="mt-4 space-y-3">
                <li className="text-sm text-gray-600">
                  <i className="fas fa-circle text-green-500 mr-2"></i>
                  Nueva asignación creada.
                </li>
                <li className="text-sm text-gray-600">
                  <i className="fas fa-circle text-blue-500 mr-2"></i>
                  Usuario registrado: Juan Pérez.
                </li>
                <li className="text-sm text-gray-600">
                  <i className="fas fa-circle text-yellow-500 mr-2"></i>
                  Curso actualizado: Matemáticas.
                </li>
                <li className="text-sm text-gray-600">
                  <i className="fas fa-circle text-red-500 mr-2"></i>
                  Asignación eliminada: Física.
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Ver todas las notificaciones →
              </p>
            </CCardBody>
          </CCard>
        </CCol>*/}
      </CRow>
    </CContainer>
  );
}

export default Dashboard;

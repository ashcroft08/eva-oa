// context/DashboardContext.js
import { createContext, useState, useEffect, useCallback } from "react";
import { getDashboardRequest } from "../api/dashboard";
import { useAuth } from "../context/AuthContext";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    totalAdministradores: 0,
    totalDocentes: 0,
    totalEstudiantes: 0,
    ultimoAdministrador: null,
    ultimoDocente: null,
    ultimoEstudiante: null,
    totalCursos: 0,
    totalMaterias: 0,
    periodoActual: null,
  });

  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return; // No hagas la solicitud si el usuario no está autenticado
    }

    try {
      const response = await getDashboardRequest();
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Error al cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // Dependencia para reaccionar a cambios en la autenticación

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  return (
    <DashboardContext.Provider
      value={{ dashboardData, loading, error, fetchDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// context/DashboardContext.js
import { createContext, useState, useEffect, useCallback } from 'react';
import { getDashboardRequest } from '../api/dashboard';

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
        periodoActual: null
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Usa useCallback para memorizar fetchDashboardData
    const fetchDashboardData = useCallback(async () => {
        try {
            const response = await getDashboardRequest();
            setDashboardData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Error al cargar los datos del dashboard');
        } finally {
            setLoading(false);
        }
    }, []); // No hay dependencias, por lo que la función no se recreará

    useEffect(() => {
        fetchDashboardData(); // Llama a la función al montar el componente
    }, [fetchDashboardData]); // Dependencia establecida correctamente

    return (
        <DashboardContext.Provider value={{ dashboardData, loading, error, fetchDashboardData }}>
            {children}
        </DashboardContext.Provider>
    );
};
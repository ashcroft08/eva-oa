import { createContext, useContext, useState, useEffect } from "react";
import {
  registerPeriodoRequest,
  getPeriodoRequest,
  getPeriodosRequest,
  updatePeriodoRequest,
  deletePeriodoRequest,
} from "../api/periodo";

const PeriodoContext = createContext();

export const usePeriodo = () => {
  const context = useContext(PeriodoContext);
  if (!context)
    throw new Error("usePeriodo  must be used within a PeriodoProvider");
  return context;
};

export function PeriodoProvider({ children }) {
  const [periodos, setPeriodos] = useState([]);
  const [errors, setErrors] = useState([]);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const registerPeriodo = async (periodo) => {
    try {
      const res = await registerPeriodoRequest(periodo);
      if (res.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      // Ensure errors are always an array
      const errorMessages = Array.isArray(error.response?.data)
        ? error.response.data
        : [error.response?.data?.message || "Error al registrar el periodo"];

      setErrors(errorMessages);
      return false;
    }
  };

  const getPeriodos = async () => {
    try {
      const res = await getPeriodosRequest();
      setPeriodos(res.data);
    } catch (error) {
      console.error("Error fetching periodos:", error);
    }
  };

  // PeriodoContext.jsx
  const getPeriodo = async (cod_periodo) => {
    try {
      const res = await getPeriodoRequest(cod_periodo);
      return res.data; // Devuelve solo el Periodo solicitado
    } catch (error) {
      console.error("Error fetching periodo:", error.response?.data || error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  const deletePeriodo = async (cod_periodo) => {
    try {
      const res = await deletePeriodoRequest(cod_periodo);
      if (res.status === 204) {
        setPeriodos(
          periodos.filter((periodo) => periodo.cod_periodo != cod_periodo)
        );
        return true; // Indicar éxito
      }
      return false; // Indicar fallo si no se cumple la condición
    } catch (error) {
      console.error(error);
    }
  };

  const updatePeriodo = async (cod_periodo, periodo) => {
    try {
      const res = await updatePeriodoRequest(cod_periodo, periodo);
      if (res.status === 200) {
        // Actualiza el estado local sin recargar toda la lista
        setPeriodos(
          periodos.map((c) => (c.cod_periodo === cod_periodo ? res.data : c))
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al actualizar el periodo"]);
      return false;
    }
  };

  return (
    <PeriodoContext.Provider
      value={{
        periodos,
        registerPeriodo,
        getPeriodo,
        getPeriodos,
        deletePeriodo,
        updatePeriodo,
        errors,
      }}
    >
      {children}
    </PeriodoContext.Provider>
  );
}

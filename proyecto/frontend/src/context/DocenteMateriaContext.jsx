import { createContext, useContext, useState, useEffect } from "react";
import {
  registerdocenteMateriaRequest,
  getdocenteMateriaRequest,
  getdocenteMateriasRequest,
  updatedocenteMateriaRequest,
  deletedocenteMateriaRequest,
} from "../api/docenteMateria";

const DocenteMateriaContext = createContext();

export const useDocenteMateria = () => {
  const context = useContext(DocenteMateriaContext);
  if (!context)
    throw new Error(
      "useDocenteMateria  must be used within a DocenteMateriaProvider"
    );
  return context;
};

export function DocenteMateriaProvider({ children }) {
  const [docenteMaterias, setdocenteMaterias] = useState([]);
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

  const registerdocenteMateria = async (docente_materia) => {
    try {
      console.log(docente_materia);
      const res = await registerdocenteMateriaRequest(docente_materia);
      if (res.status === 201) {
        console.log(res);
        //console.log("Usuario registrado exitosamente");
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      setErrors(error.response.data.errors || ["Error desconocido"]);
      return false;
    }
  };

  const getdocenteMaterias = async () => {
    try {
      const res = await getdocenteMateriasRequest();
      setdocenteMaterias(res.data);
    } catch (error) {
      console.error("Error fetching docente_materias:", error);
    }
  };

  const getdocenteMateria = async (cod_asignacion) => {
    try {
      const res = await getdocenteMateriaRequest(cod_asignacion);
      return res.data; // Devuelve solo el docente_materia solicitado
    } catch (error) {
      console.error(
        "Error fetching docente_materia:",
        error.response?.data || error
      );
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  const deletedocenteMateria = async (cod_asignacion) => {
    try {
      const res = await deletedocenteMateriaRequest(cod_asignacion);
      if (res.status === 204) {
        setdocenteMaterias(
          docenteMaterias.filter(
            (docente_materia) =>
              docente_materia.cod_asignacion != cod_asignacion
          )
        );
        return true; // Indicar éxito
      }
      return false; // Indicar fallo si no se cumple la condición
    } catch (error) {
      console.error(error);
    }
  };

  const updatedocenteMateria = async (cod_asignacion, docenteMateria) => {
    try {
      const res = await updatedocenteMateriaRequest(
        cod_asignacion,
        docenteMateria
      );
      if (res.status === 200) {
        // Actualiza el estado local sin recargar toda la lista
        setdocenteMaterias(
          docenteMaterias.map((c) =>
            c.cod_asignacion === cod_asignacion ? res.data : c
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      setErrors(
        error.response?.data || ["Error al actualizar la docenteMateria"]
      );
      return false;
    }
  };

  return (
    <DocenteMateriaContext.Provider
      value={{
        docenteMaterias,
        registerdocenteMateria,
        getdocenteMateria,
        getdocenteMaterias,
        updatedocenteMateria,
        deletedocenteMateria,
        errors,
      }}
    >
      {children}
    </DocenteMateriaContext.Provider>
  );
}

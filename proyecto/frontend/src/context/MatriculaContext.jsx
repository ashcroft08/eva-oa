import { createContext, useContext, useState, useEffect } from "react";
import {
  registerMatriculaRequest,
  getMatriculaRequest,
  getMatriculasRequest,
  updateMatriculaRequest,
  deleteMatriculaRequest,
} from "../api/matricula";

const MatriculaContext = createContext();

export const useMatricula = () => {
  const context = useContext(MatriculaContext);
  if (!context)
    throw new Error("useMatricula  must be used within a MatriculaProvider");
  return context;
};

export function MatriculaProvider({ children }) {
  const [matriculas, setMatriculas] = useState([]);
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

  const registerMatricula = async (matricula) => {
    try {
      console.log(matricula);
      const res = await registerMatriculaRequest(matricula);
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

  const getMatriculas = async () => {
    try {
      const res = await getMatriculasRequest();
      setMatriculas(res.data);
    } catch (error) {
      console.error("Error fetching matriculas:", error);
    }
  };

  const getMatricula = async (cod_matricula) => {
    try {
      const res = await getMatriculaRequest(cod_matricula);
      return res.data; // Devuelve solo el matricula solicitado
    } catch (error) {
      console.error("Error fetching matricula:", error.response?.data || error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  const deleteMatricula = async (cod_matricula) => {
      try {
        const res = await deleteMatriculaRequest(cod_matricula);
        if (res.status === 204) {
          setMatriculas(
            matriculas.filter((matricula) => matricula.cod_matricula != cod_matricula)
          );
          return true; // Indicar éxito
        }
        return false; // Indicar fallo si no se cumple la condición
      } catch (error) {
        console.error(error);
      }
    };
  
    const updateMatricula = async (cod_matricula, matricula) => {
      try {
        const res = await updateMatriculaRequest(cod_matricula, matricula);
        if (res.status === 200) {
          // Actualiza el estado local sin recargar toda la lista
          setMatriculas(
            matriculas.map((c) => (c.cod_matricula === cod_matricula ? res.data : c))
          );
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        setErrors(error.response?.data || ["Error al actualizar la matricula"]);
        return false;
      }
    };

  return (
    <MatriculaContext.Provider
      value={{
        matriculas,
        registerMatricula,
        getMatricula,
        getMatriculas,
        deleteMatricula,
        updateMatricula,
        errors,
      }}
    >
      {children}
    </MatriculaContext.Provider>
  );
}

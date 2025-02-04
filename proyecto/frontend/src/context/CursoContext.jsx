import { createContext, useContext, useState, useEffect } from "react";
import {
  registerCursoRequest,
  getCursoRequest,
  getCursosRequest,
  updateCursoRequest,
  deleteCursoRequest,
} from "../api/curso";

const CursoContext = createContext();

export const useCurso = () => {
  const context = useContext(CursoContext);
  if (!context)
    throw new Error("useCurso  must be used within a CursoProvider");
  return context;
};

export function CursoProvider({ children }) {
  const [cursos, setCursos] = useState([]);
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

  const registerCurso = async (curso) => {
    try {
      const res = await registerCursoRequest(curso);
      if (res.status === 201) {
        //console.log("Usuario registrado exitosamente");
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data); // Cambia esto para que sea un array
      return false; // Indicar fallo
    }
  };

  const getCursos = async () => {
    try {
      const res = await getCursosRequest();
      setCursos(res.data);
    } catch (error) {
      console.error("Error fetching cursos:", error);
    }
  };

  // CursoContext.jsx
  const getCurso = async (cod_curso) => {
    try {
      const res = await getCursoRequest(cod_curso);
      return res.data; // Devuelve solo el curso solicitado
    } catch (error) {
      console.error("Error fetching curso:", error.response?.data || error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  const deleteCurso = async (cod_curso) => {
    try {
      const res = await deleteCursoRequest(cod_curso);
      if (res.status === 204) {
        setCursos(cursos.filter((curso) => curso.cod_curso != cod_curso));
        return true; // Indicar éxito
      }
      return false; // Indicar fallo si no se cumple la condición
    } catch (error) {
      console.error(error);
    }
  };

  const updateCurso = async (cod_curso, curso) => {
    try {
      const res = await updateCursoRequest(cod_curso, curso);
      if (res.status === 200) {
        // Actualiza el estado local sin recargar toda la lista
        setCursos(
          cursos.map((c) => (c.cod_curso === cod_curso ? res.data : c))
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al actualizar el curso"]);
      return false;
    }
  };

  return (
    <CursoContext.Provider
      value={{
        cursos,
        registerCurso,
        getCurso,
        getCursos,
        deleteCurso,
        updateCurso,
        errors,
      }}
    >
      {children}
    </CursoContext.Provider>
  );
}

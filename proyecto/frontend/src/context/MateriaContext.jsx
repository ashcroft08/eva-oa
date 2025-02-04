import { createContext, useContext, useState, useEffect } from "react";
import {
  getCursosMateriasRequest,
  registerMateriaRequest,
  getMateriaRequest,
  getMateriasRequest,
  updateMateriaRequest,
  deleteMateriaRequest,
} from "../api/materia";

const MateriaContext = createContext();

export const useMateria = () => {
  const context = useContext(MateriaContext);
  if (!context)
    throw new Error("useMateria  must be used within a MateriaProvider");
  return context;
};

export function MateriaProvider({ children }) {
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
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

  const getCursosMaterias = async () => {
    try {
      const res = await getCursosMateriasRequest();
      setCursos(res.data); // Almacenar en cursos
    } catch (error) {
      console.error("Error fetching cursos:", error);
    }
  };

  const registerMateria = async (materia) => {
    try {
      const res = await registerMateriaRequest(materia);
      if (res.status === 201) {
        //console.log("Usuario registrado exitosamente");
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      setErrors(error.response.data.errors || ["Error desconocido"]);
      return false;
    }
  };

  const getMaterias = async () => {
    try {
      const res = await getMateriasRequest();
      setMaterias(res.data);
    } catch (error) {
      console.error("Error fetching materias:", error);
    }
  };

  const getMateria = async (cod_materia) => {
    try {
      const res = await getMateriaRequest(cod_materia);
      return res.data; // Devuelve solo el materia solicitado
    } catch (error) {
      console.error("Error fetching materia:", error.response?.data || error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  };

  const deleteMateria = async (cod_materia) => {
    try {
      const res = await deleteMateriaRequest(cod_materia);
      if (res.status === 204) {
        setMaterias(
          materias.filter((materia) => materia.cod_materia != cod_materia)
        );
        return true; // Indicar éxito
      }
      return false; // Indicar fallo si no se cumple la condición
    } catch (error) {
      console.error(error);
    }
  };

  const updateMateria = async (cod_materia, materia) => {
    try {
      const res = await updateMateriaRequest(cod_materia, materia);
      if (res.status === 200) {
        // Actualiza el estado local sin recargar toda la lista
        setMaterias(
          materias.map((c) => (c.cod_materia === cod_materia ? res.data : c))
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data || ["Error al actualizar la materia"]);
      return false;
    }
  };

  return (
    <MateriaContext.Provider
      value={{
        materias,
        getCursosMaterias,
        registerMateria,
        getMaterias,
        getMateria,
        updateMateria,
        deleteMateria,
        errors,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
}

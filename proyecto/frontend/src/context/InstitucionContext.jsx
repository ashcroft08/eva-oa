// InstitucionContext.js
import { createContext, useContext, useState } from "react";
import {
  registerIntitucionRequest,
  updateIntitucionRequest,
  deleteIntitucionRequest,
  getIntitucionRequest,
} from "../api/institucion"; // Asegúrate de que la ruta sea correcta

const InstitucionContext = createContext();

export const useInstitucion = () => {
  const context = useContext(InstitucionContext);
  if (!context)
    throw new Error(
      "useInstitucion must be used within a Institucion Provider"
    );
  return context;
};

// InstitucionContext.js
export const InstitucionProvider = ({ children }) => {
  const [institucion, setInstitucion] = useState(null);
  const [errors, setErrors] = useState([]);

  // Función para crear institución
  const createInstitucion = async (institucionData) => {
    try {
      const response = await registerIntitucionRequest(institucionData);
      setInstitucion(response.data); // Actualiza a la única institución
      return response.data;
    } catch (error) {
      setErrors(
        error.response?.data?.message || ["Error al crear institución"]
      );
      throw error;
    }
  };

  // Función para obtener la institución
  const fetchInstitucion = async () => {
    try {
      const response = await getIntitucionRequest();
      setInstitucion(response.data); // Establece la única institución
    } catch (error) {
      setErrors(
        error.response?.data?.message || ["Error al obtener institución"]
      );
    }
  };

  // Función para actualizar la institución
  const updateInstitucion = async (institucionData) => {
    try {
      const response = await updateIntitucionRequest(institucionData);
      setInstitucion(response.data); // Actualiza la única institución
      return response.data;
    } catch (error) {
      setErrors(
        error.response?.data?.message || ["Error al actualizar institución"]
      );
      throw error;
    }
  };

  // Función para eliminar la institución
  const deleteInstitucion = async () => {
    try {
      await deleteIntitucionRequest();
      setInstitucion(null); // Resetea la institución a null
    } catch (error) {
      setErrors(
        error.response?.data?.message || ["Error al eliminar institución"]
      );
      throw error;
    }
  };

  return (
    <InstitucionContext.Provider
      value={{
        institucion,
        createInstitucion,
        fetchInstitucion,
        updateInstitucion,
        deleteInstitucion,
        errors,
      }}
    >
      {children}
    </InstitucionContext.Provider>
  );
};

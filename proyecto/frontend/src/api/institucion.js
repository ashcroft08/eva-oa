import axios from "./axios";

// Función para registrar una nueva institución
export const registerIntitucionRequest = institucion => axios.post("/institucion", institucion);

// Función para obtener la institución
export const getIntitucionRequest = () => axios.get("/institucion"); // Sin cod_institucion

// Función para actualizar la institución
export const updateIntitucionRequest = institucion => axios.put("/institucion", institucion); // Sin cod_institucion

// Función para eliminar la institución
export const deleteIntitucionRequest = () => axios.delete("/institucion"); // Sin cod_institucion
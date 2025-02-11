import axios from "./axios";

export const getMateriasCursoRequest = (cod_curso) => axios.get(`/materias/${cod_curso}`);

export const getCursosMateriasRequest = () => axios.get("/cursos/materias");

export const registerMateriaRequest = materia => axios.post("/register-materia", materia)

export const getMateriasRequest = () => axios.get("/materias");

export const getMateriaRequest = (cod_materia) => axios.get(`/materia/${cod_materia}`);

export const updateMateriaRequest = (cod_materia, materia) => axios.put(`/materia/${cod_materia}`, materia);

export const deleteMateriaRequest = (cod_materia) => axios.delete(`/materia/${cod_materia}`);
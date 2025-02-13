import axios from "./axios";

export const getCursosPorDocenteRequest = (cod_docente) => axios.get(`/docente/cursos/${cod_docente}`)

export const getEstudiantesPorDocenteRequest = (cod_docente) => axios.get(`/docente/estudiantes/${cod_docente}`)

export const registerCursoRequest = curso => axios.post("/register-curso", curso)

export const getCursosRequest = () => axios.get("/cursos");

export const getCursoRequest = (cod_curso) => axios.get(`/curso/${cod_curso}`);

export const updateCursoRequest = (cod_curso, curso) => axios.put(`/curso/${cod_curso}`, curso);

export const deleteCursoRequest = (cod_curso) => axios.delete(`/curso/${cod_curso}`);
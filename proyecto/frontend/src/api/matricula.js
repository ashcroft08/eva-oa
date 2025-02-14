import axios from "./axios";

export const registerMatriculaRequest = matricula => axios.post("/register-matricula", matricula)

export const getMatriculasRequest = () => axios.get("/matriculas");

export const getMatriculaRequest = (cod_matricula) => axios.get(`/matricula/${cod_matricula}`);

export const updateMatriculaRequest = (cod_matricula, matricula) => axios.put(`/matricula/${cod_matricula}`, matricula);

export const deleteMatriculaRequest = (cod_matricula) => axios.delete(`/matricula/${cod_matricula}`);
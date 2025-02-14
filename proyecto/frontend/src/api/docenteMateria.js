import axios from "./axios";

export const registerdocenteMateriaRequest = docente_materia => axios.post("/asignar-docente", docente_materia)

export const getdocenteMateriasRequest = () => axios.get("/asignar-docente");

export const getdocenteMateriaRequest = (cod_asignacion) => axios.get(`/asignar-docente/${cod_asignacion}`);

export const updatedocenteMateriaRequest = (cod_asignacion, docente_materia) => axios.put(`/asignar-docente/${cod_asignacion}`, docente_materia);

export const deletedocenteMateriaRequest = (cod_asignacion) => axios.delete(`/asignar-docente/${cod_asignacion}`);
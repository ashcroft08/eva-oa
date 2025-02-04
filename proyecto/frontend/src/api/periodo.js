import axios from "./axios";

export const registerPeriodoRequest = periodo => axios.post("/register-periodo", periodo)

export const getPeriodosRequest = () => axios.get("/periodos");

export const getPeriodoRequest = (cod_periodo) => axios.get(`/periodo/${cod_periodo}`);

export const updatePeriodoRequest = (cod_periodo, periodo) => axios.put(`/periodo/${cod_periodo}`, periodo);

export const deletePeriodoRequest = (cod_periodo) => axios.delete(`/periodo/${cod_periodo}`);
import axios from "./axios";

export const getUsersAdminRequest = () => axios.get("/admins");

export const getUsersTeacherRequest = () => axios.get("/teachers");

export const getUsersStudentRequest = () => axios.get("/students");

export const getUserRequest = (cod_usuario) => axios.get(`/user/${cod_usuario}`);

export const updateUserRequest = (cod_usuario, user) => axios.put(`/user/${cod_usuario}`, user);

export const deleteUserRequest = (cod_usuario) => axios.delete(`/user/${cod_usuario}`);
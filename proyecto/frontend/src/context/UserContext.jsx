import { createContext, useContext, useState } from "react";
import {
  getEstudiantesMatriculadosRequest,
  getEstudiantesNoMatriculadosRequest,
  getUsersAdminRequest,
  getUsersTeacherRequest,
  getUsersStudentRequest,
  getUserRequest,
  updateUserRequest,
  deleteUserRequest,
  updatePasswordRequest,
} from "../api/user";
import CustomToast from "../components/ui/CustomToast";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser  must be used within a UserProvider");
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const getUsersAdmin = async () => {
    try {
      const res = await getUsersAdminRequest();
      //console.log("Usuarios obtenidos:", res.data); // Agrega este log
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const getUsersTeacher = async () => {
    try {
      const res = await getUsersTeacherRequest();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching teacher users:", error);
    }
  };

  const getUsersStudent = async () => {
    try {
      const res = await getUsersStudentRequest();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching student users:", error);
    }
  };

  const deleteUser = async (cod_usuario) => {
    try {
      const res = await deleteUserRequest(cod_usuario);
      if (res.status === 204) {
        setUsers(users.filter((user) => user.cod_usuario != cod_usuario));
        return true; // Indicar éxito
      }
      return false; // Indicar fallo si no se cumple la condición
    } catch (error) {
      if (error.response && error.response.status === 403) {
        CustomToast("No se puede eliminar al usuario logueado.", "error");
      } else {
        console.log(error);
      }
      return false; // Indicar fallo en caso de error
    }
  };

  const getUser = async (cod_usuario) => {
    try {
      const res = await getUserRequest(cod_usuario);
      //console.log("Usuarios obtenidos:", res.data); // Agrega este log
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (cod_usuario, user) => {
    try {
      //console.log(cod_usuario);
      const res = await updateUserRequest(cod_usuario, user);
      if (res.status === 201) {
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      console.error(error.response.data);
      setErrors(error.response.data); // Cambia esto para que sea un array
      return false; // Indicar fallo
    }
  };

  const updatePassword = async (cod_usuario, user) => {
    try {
      const res = await updatePasswordRequest(cod_usuario, user);
      if (res.status === 201) {
        return true; // Indicar éxito
      }
      return false; // Indicar fallo
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data); // Cambia esto para que sea un array
      return false; // Indicar fallo
    }
  };

  const getEstudiantesNoMatriculados = async () => {
    try {
      const res = await getEstudiantesNoMatriculadosRequest(); // Corregido
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching student users no matriculados:", error);
    }
  };

  const getEstudiantesMatriculados = async () => {
    try {
      const res = await getEstudiantesMatriculadosRequest();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching student users matriculados:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getEstudiantesNoMatriculados,
        getEstudiantesMatriculados,
        getUsersAdmin,
        getUsersTeacher,
        getUsersStudent,
        getUser,
        updateUser,
        deleteUser,
        updatePassword,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

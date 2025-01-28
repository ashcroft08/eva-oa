import { createContext, useContext, useState } from "react";
import {
  getUsersAdminRequest,
  getUsersTeacherRequest,
  getUsersStudentRequest,
  getUserRequest,
  updateUserRequest,
  deleteUserRequest,
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
      if (res.status === 204)
        setUsers(users.filter((user) => user.cod_usuario != cod_usuario));
      CustomToast("¡Administrador eliminado exitosamente!", "success");
    } catch (error) {
      // Si el error es de status 403, significa que no se puede eliminar al usuario logueado
    if (error.response && error.response.status === 403) {
      CustomToast("No se puede eliminar al usuario logueado.", "error");
      //alert("No se puede eliminar al usuario logueado.");
    } else {
      console.log(error);
      //toast.error("Hubo un error al intentar eliminar al administrador.");
    }
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
      console.log(cod_usuario)
      await updateUserRequest(cod_usuario, user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsersAdmin,
        getUsersTeacher,
        getUsersStudent,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

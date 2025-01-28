import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import DataTable from "react-data-table-component";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { FaPlus } from "react-icons/fa6";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";

export const RegisterStudent = () => {
  const { signup, errors: registerErrors } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }, // Renombrar para evitar confusión
    reset,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values) => {
    console.log("Datos enviados:", values);
    const success = await signup(values); // Llama a signup y espera la respuesta
    if (success) {
      alert("Usuario registrado exitosamente");
      setVisible(false); // Cierra el modal
      reset(); // Limpia el formulario después de un registro exitoso
    } else {
      console.log("Error al registrar usuario.");
    }
  };

  const columns = [
    {
      name: "Cédula",
      selector: (row) => row.cedula,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    /*{
      name: "Acciones",
      selector: (row) => row.acciones,
      sortable: true,
    },*/
  ];

  const data = [
    {
      id: 1,
      cedula: "2300227333",
      nombres: "Johan Joseph",
      apellidos: "Gracia Yugcha",
      correo: "johangracia40@gmail.com",
    },
    {
      id: 2,
      cedula: "1550042756",
      nombres: "Scarlet Brigith",
      apellidos: "Cayapa Alvear",
      correo: "scarletcayapa@gmail.com",
    },
  ];

  const [records, setRecods] = useState(data);
  const [visible, setVisible] = useState(false);

  function handleFilter(event) {
    const query = event.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.nombres.toLowerCase().includes(query) ||
        row.apellidos.toLowerCase().includes(query) ||
        row.correo.toLowerCase().includes(query)
      );
    });
    setRecods(newData);
  }

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-end mt-1">
          <CInputGroup>
            <CInputGroupText>
              <FaPlus />
            </CInputGroupText>
            <CButton
              color="success"
              style={{ color: "white" }}
              onClick={() => setVisible(true)}
            >
              Crear nuevo estudiante
            </CButton>
          </CInputGroup>
        </div>
      </CCardHeader>
      <CCardBody>
        <div className="text-end">
          <span>Buscar: </span>
          <input
            type="text"
            onChange={handleFilter}
            className="form-control"
            style={{ display: "inline-block", width: "auto" }}
          />
        </div>
        <br />
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </CCardBody>

      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader>
            <CModalTitle id="VerticallyCenteredExample">
              Crear Estudiante
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            {registerErrors.length > 0 &&
              registerErrors.map((error, i) => (
                <p
                  className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1"
                  key={i}
                >
                  {error}
                </p>
              ))}
            <div className="mt-2">
              <Label htmlFor="cedula">Cédula</Label>
              <input
                type="text"
                id="cedula"
                {...register("cedula", {
                  required: "La cédula es obligatoria",
                })}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                  errors.cedula ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.cedula ? "true" : "false"}
              />
              {errors.cedula && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cedula.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                name="nombres"
                type="text"
                register={register}
                validation={{ required: true }}
              />
              {errors.nombres && (
                <p className="text-red-500">Los nombres son obligatorios</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                type="text"
                register={register}
                validation={{ required: true }}
              />
              {errors.apellidos && (
                <p className="text-red-500">Los apellidos son obligatorios</p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{ required: true }}
              />
              {errors.email && (
                <p className="text-red-500">
                  El correo electrónico es obligatorio
                </p>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                register={register}
                validation={{ required: true }}
              />
              {errors.password && (
                <p className="text-red-500">La contraseña es obligatoria</p>
              )}
            </div>
            {/* Campo de Rol */}
            <div className="mt-2">
              {/* Campo oculto para cod_rol */}
              <input
                type="hidden"
                id="cod_rol"
                value="4"
                {...register("cod_rol", {
                  required: "El rol es obligatorio",
                })}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
            </CButton>
            <CButton type="submit" color="primary">
              Guardar
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </CCard>
  );
};

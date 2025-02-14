import { useEffect, useRef, useState } from "react";
import { usePeriodo } from "../context/PeriodoContext";
import { useForm } from "react-hook-form";
import { periodoSchema } from "../schemas/periodo";
import { zodResolver } from "@hookform/resolvers/zod";
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
  CFormFeedback,
} from "@coreui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Importa el idioma español
registerLocale("es", es); // Registra el idioma español

export function RegisterPeriodo() {
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentPeriodo, setcurrentPeriodo] = useState(null);
  const hasFetchedPeriodos = useRef(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editingPeriodos, setEditingPeriodos] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    periodos,
    registerPeriodo,
    getPeriodos,
    getPeriodo: fetchPeriodo,
    updatePeriodo,
    deletePeriodo,
    errors: registerErrors,
  } = usePeriodo(); // Obtén los errores

  // Cargar periodos inicialmente
  useEffect(() => {
    const fetchPeriodos = async () => {
      if (!hasFetchedPeriodos.current) {
        // Solo llama a la API si no se ha hecho antes
        await getPeriodos();
        hasFetchedPeriodos.current = true; // Marca que ya se han obtenido los periodos
      }
    };
    fetchPeriodos();
  }, [getPeriodos]); // Solo se ejecuta una vez al montar el componente

  // Actualiza los registros cuando 'periodos' cambie
  useEffect(() => {
    setRecords(periodos); // Inicializa los registros con los usuarios obtenidos
  }, [periodos]); // Solo se ejecuta cuando 'periodos' cambia

  const {
    register,
    handleSubmit,
    formState: { errors }, // Destructure errors from formState
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(periodoSchema),
    mode: "onSubmit", // Trigger validation on form submission
  });

  useEffect(() => {
    if (!editVisible && !visible) {
      reset(); // Limpia el formulario cuando se cierra el modal
      setEditingPeriodos(null);
      setStartDate(new Date()); // Reiniciar startDate
      setEndDate(new Date()); // Reiniciar endDate
    }
  }, [visible, editVisible, reset]);

  // Nuevo método para manejar la edición
  const handleEdit = async (periodo) => {
    try {
      const periodoData = await fetchPeriodo(periodo.cod_periodo);
      setEditingPeriodos(periodoData);
      setEditVisible(true);

      // Use Date.parse() with a specific format to avoid timezone issues
      const fechaInicio = new Date(
        Date.parse(periodoData.fecha_inicio + "T00:00:00")
      );
      const fechaFin = new Date(
        Date.parse(periodoData.fecha_fin + "T00:00:00")
      );

      // Ensure the time is set to midnight in the local timezone
      fechaInicio.setHours(0, 0, 0, 0);
      fechaFin.setHours(0, 0, 0, 0);

      // Update the states
      setStartDate(fechaInicio);
      setEndDate(fechaFin);

      // Rellena el formulario con los datos existentes
      reset({
        ...periodoData,
        fecha_inicio: fechaInicio.toISOString().split("T")[0], // Formato YYYY-MM-DD
        fecha_fin: fechaFin.toISOString().split("T")[0], // Formato YYYY-MM-DD
      });
    } catch (error) {
      CustomToast("Error al cargar el periodo", "error");
    }
  };

  // Modifica el onSubmit para manejar ambas operaciones
  const onSubmit = async (values, event) => {
    // Check if there are any form errors before proceeding
    if (Object.keys(errors).length > 0) {
      return; // Stop submission if there are validation errors
    }

    try {
      if (editingPeriodos) {
        const success = await updatePeriodo(
          editingPeriodos.cod_periodo,
          values
        );
        if (success) {
          CustomToast("¡Periodo actualizado exitosamente!", "success");
          setEditVisible(false);
          await getPeriodos();
          reset();
          setEditingPeriodos(null);
        }
      } else {
        const success = await registerPeriodo(values);
        if (success) {
          CustomToast("¡Periodo creado exitosamente!", "success");
          setVisible(false);
          await getPeriodos();
          reset();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDelete = (periodo) => {
    setcurrentPeriodo(periodo);
    setDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deletePeriodo(currentPeriodo.cod_periodo); // Esperar a que deletePeriodo se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Periodo eliminado exitosamente!", "success");
      setDeleteVisible(false);
      await getPeriodos();
    }
    setDeleteVisible(false);
  };

  const columns = [
    {
      name: "Año Lectivo",
      selector: (row) => row.anio_lectivo,
      sortable: true,
    },
    {
      name: "Fecha inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha fin",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <CButton
            color="warning"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </CButton>
          <CButton color="danger" onClick={() => handleDelete(row)}>
            <FaTrash />
          </CButton>
        </div>
      ),
    },
  ];

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const newData = periodos.filter((row) => {
      return (
        row.anio_lectivo.toLowerCase().includes(query) ||
        row.fecha_inicio.includes(query) ||
        row.fecha_fin.includes(query)
      );
    });
    setRecords(newData);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
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
                className="fw-bold"
              >
                Crear nuevo periodo
              </CButton>
            </CInputGroup>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="d-flex justify-content-end mb-2">
            <div className="input-group" style={{ width: "auto" }}>
              <span className="input-group-text">Buscar:</span>
              <input
                type="text"
                onChange={handleFilter}
                className="form-control"
                style={{ minWidth: "150px", maxWidth: "250px" }} // Aumenta el ancho aquí
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={records}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent="No hay registros para mostrar"
          />
        </CCardBody>

        {/* Modal de creación/edición */}
        <CModal
          backdrop="static"
          alignment="center"
          visible={visible || editVisible}
          onClose={() => {
            setVisible(false);
            setEditVisible(false);
            setEditingPeriodos(null);
            reset({
              nombre_curso: "",
              paralelo: "",
            }); // Se asegura de limpiar el formulario
          }}
          aria-labelledby="CursoPeriodo"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CModalHeader>
              <CModalTitle id="CursoPeriodo" className="fw-bold">
                {editingPeriodos ? "Editar Periodo" : "Crear Periodo"}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {registerErrors && registerErrors.length > 0 && (
                <div className="bg-red-500 p-2 text-white mb-4 rounded">
                  {registerErrors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <Label htmlFor="anio_lectivo">Año Lectivo</Label>
                <Input
                  id="anio_lectivo"
                  name="anio_lectivo"
                  type="text"
                  register={register}
                />
                {errors.anio_lectivo && (
                  <p className="text-red-500">{errors.anio_lectivo.message}</p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
                <DatePicker
                  id="fecha_inicio"
                  name="fecha_inicio"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setValue("fecha_inicio", date.toISOString().split("T")[0], {
                      shouldValidate: true,
                    });
                  }}
                  className="border rounded p-2 w-full"
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                />
                {errors.fecha_inicio && (
                  <p className="text-red-500">{errors.fecha_inicio.message}</p>
                )}
              </div>

              <div className="mt-2">
                <Label htmlFor="fecha_fin">Fecha de finalización</Label>
                <DatePicker
                  id="fecha_fin"
                  name="fecha_fin"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setValue("fecha_fin", date.toISOString().split("T")[0], {
                      shouldValidate: true,
                    });
                  }}
                  className="border rounded p-2 w-full"
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                />
                {errors.fecha_fin && (
                  <p className="text-red-500">{errors.fecha_fin.message}</p>
                )}
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => {
                  setVisible(false);
                  setEditVisible(false);
                  setEditingPeriodos(null);
                  reset({
                    nombre_curso: "",
                    paralelo: "",
                  });
                }}
              >
                Cerrar
              </CButton>
              <CButton type="submit" color="primary">
                {editingPeriodos ? "Actualizar" : "Guardar"}
              </CButton>
            </CModalFooter>
          </form>
        </CModal>

        {/* Modal para confirmar eliminación */}
        <CModal
          backdrop="static"
          alignment="center"
          visible={deleteVisible}
          onClose={() => setDeleteVisible(false)}
          aria-labelledby="DeletePeriodo Modal"
        >
          <CModalHeader>
            <CModalTitle id="DeletePeriodo Modal" className="fw-bold">
              Confirmar Eliminación
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar el{" "}
              {currentPeriodo?.anio_lectivo}?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="danger" onClick={handleConfirmDelete}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
      <ToastContainer />
    </>
  );
}

export default RegisterPeriodo;

import { useEffect, useRef, useState } from "react";
import { useCurso } from "../context/CursoContext";
import { useForm } from "react-hook-form";
import { cursoSchema } from "../schemas/curso";
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
} from "@coreui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

export function RegisterCurso() {
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentCurso, setcurrentCurso] = useState(null);
  const hasFetchedCursos = useRef(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);

  const {
    cursos,
    registerCurso,
    getCursos,
    getCurso: fetchCurso,
    updateCurso,
    deleteCurso,
    errors: registerErrors,
  } = useCurso(); // Obtén los errores

  // Cargar cursos inicialmente
  useEffect(() => {
    const fetchCursos = async () => {
      if (!hasFetchedCursos.current) {
        // Solo llama a la API si no se ha hecho antes
        await getCursos();
        hasFetchedCursos.current = true; // Marca que ya se han obtenido los cursos
      }
    };
    fetchCursos();
  }, [getCursos]); // Solo se ejecuta una vez al montar el componente

  // Actualiza los registros cuando 'cursos' cambie
  useEffect(() => {
    setRecords(cursos); // Inicializa los registros con los usuarios obtenidos
  }, [cursos]); // Solo se ejecuta cuando 'cursos' cambia

  const {
    register,
    handleSubmit,
    formState: { errors }, // Renombrar para evitar confusión
    reset,
  } = useForm({ resolver: zodResolver(cursoSchema) });

  useEffect(() => {
    if (!editVisible && !visible) {
      reset(); // Limpia el formulario cuando se cierra el modal
      setEditingCurso(null);
    }
  }, [visible, editVisible, reset]);

  // Nuevo método para manejar la edición
  const handleEdit = async (curso) => {
    try {
      const cursoData = await fetchCurso(curso.cod_curso);
      setEditingCurso(cursoData);
      setEditVisible(true);
      reset(cursoData); // Rellena el formulario con los datos existentes
    } catch (error) {
      CustomToast("Error al cargar el curso", "error");
    }
  };

  // Modifica el onSubmit para manejar ambas operaciones
  const onSubmit = async (values) => {
    if (editingCurso) {
      const success = await updateCurso(editingCurso.cod_curso, values);
      if (success) {
        CustomToast("¡Curso actualizado exitosamente!", "success");
        setEditVisible(false);
        await getCursos();
        reset();
        setEditingCurso(null);
      }
    } else {
      const success = await registerCurso(values);
      if (success) {
        CustomToast("¡Curso creado exitosamente!", "success");
        setVisible(false);
        await getCursos();
        reset();
      }
    }
  };

  const handleDelete = (curso) => {
    setcurrentCurso(curso);
    setDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteCurso(currentCurso.cod_curso); // Esperar a que DeteleCurso se complete
    if (success) {
      // Solo mostrar el mensaje de éxito si la eliminación fue exitosa
      CustomToast("¡Curso eliminado exitosamente!", "success");
      setDeleteVisible(false);
      await getCursos();
    }
    setDeleteVisible(false);
  };

  const columns = [
    {
      name: "Grado/Curso",
      selector: (row) => row.nombre_curso,
      sortable: true,
    },
    {
      name: "Paralelo",
      selector: (row) => row.paralelo,
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
    const newData = cursos.filter((row) => {
      return (
        row.nombre_curso.toLowerCase().includes(query) ||
        row.paralelo.toLowerCase().includes(query)
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
                Crear nuevo curso
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
            setEditingCurso(null);
            reset({
              nombre_curso: "",
              paralelo: "",
            }); // Se asegura de limpiar el formulario
          }}
          aria-labelledby="CursoModal"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CModalHeader>
              <CModalTitle id="CursoModal" className="fw-bold">
                {editingCurso ? "Editar Curso" : "Crear Curso"}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              {registerErrors.length > 0 && (
                <div className="bg-red-500 p-2 text-white mb-4 rounded">
                  {registerErrors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <Label htmlFor="nombre_curso">Nombre del Grado/Curso</Label>
                <Input
                  id="nombre_curso"
                  name="nombre_curso"
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.nombre_curso && (
                  <p className="text-red-500">
                    El nombre del curso es obligatorio
                  </p>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="paralelo">Paralelo</Label>
                <Input
                  id="paralelo"
                  name="paralelo"
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
                {errors.paralelo && (
                  <p className="text-red-500">El paralelo obligatorio</p>
                )}
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => {
                  setVisible(false);
                  setEditVisible(false);
                  setEditingCurso(null);
                  reset({
                    nombre_curso: "",
                    paralelo: "",
                  });
                }}
              >
                Cerrar
              </CButton>
              <CButton type="submit" color="primary">
                {editingCurso ? "Actualizar" : "Guardar"}
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
          aria-labelledby="DeteleCurso Modal"
        >
          <CModalHeader>
            <CModalTitle id="DeteleCurso Modal" className="fw-bold">
              Confirmar Eliminación
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar el Curso{" "}
              {currentCurso?.nombre_curso}?
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

export default RegisterCurso;

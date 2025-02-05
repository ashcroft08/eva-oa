import { useEffect, useState, useCallback, useMemo } from "react";
import {
  CCard,
  CCardHeader,
  CButton,
  CListGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Importar el resolver de zod
import { FaPlus } from "react-icons/fa";
import ListItem from "./ui/ListItem";
import Label from "./ui/Label";
import CustomToast from "./ui/CustomToast";
import { useMateria } from "../context/MateriaContext";
import { useCurso } from "../context/CursoContext";
import { materiaSchema } from "../schemas/materia"; // Importar el esquema de zod

export function RegisterMateria() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }, // Obtener los errores de validación
  } = useForm({
    resolver: zodResolver(materiaSchema), // Conectar zod con react-hook-form
  });

  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentMateria, setCurrentMateria] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");

  const {
    materias,
    getMaterias,
    registerMateria,
    updateMateria,
    deleteMateria,
    errors: registerErrors,
  } = useMateria();
  const { cursos, getCursos } = useCurso();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      await getCursos();
      await getMaterias();
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [getCursos, getMaterias]);

  const handleUpdateMateria = useCallback(
    async (data) => {
      try {
        const success = await updateMateria(currentMateria.cod_materia, data);
        if (success) {
          fetchData();
          setEditVisible(false);
          reset();
        }
      } catch (error) {
        console.error("Error al actualizar la materia:", error);
      }
    },
    [currentMateria, updateMateria, fetchData, reset]
  );

  const handleDeleteMateria = useCallback(async () => {
    try {
      const success = await deleteMateria(currentMateria.cod_materia);
      if (success) {
        CustomToast("Materia eliminada con éxito", "success");
        fetchData();
      }
    } catch (error) {
      console.error("Error al eliminar la materia:", error);
    }

    setDeleteVisible(false);
    setCurrentMateria(null);
  }, [currentMateria, deleteMateria, fetchData]);

  const confirmDeleteMateria = useCallback((materia) => {
    setCurrentMateria(materia);
    setDeleteVisible(true);
  }, []);

  const handleAddSubject = useCallback(async () => {
    if (newSubjectName.trim() && selectedCurso) {
      const newMateria = {
        nombre_materia: newSubjectName,
        cod_curso: selectedCurso,
      };
      const success = await registerMateria(newMateria);
      if (success) {
        CustomToast("Materia agregada con éxito", "success");
        fetchData();
        setNewSubjectName("");
        setSelectedCurso("");
        setVisible(false);
      }
    } else {
      CustomToast("Por favor, ingrese una materia", "error");
    }
  }, [newSubjectName, selectedCurso, registerMateria, fetchData]);

  const materiasPorCurso = useMemo(() => {
    return cursos.map((curso) => ({
      ...curso,
      materias: materias.filter(
        (materia) => materia.cod_curso === curso.cod_curso
      ),
    }));
  }, [cursos, materias]);

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {materiasPorCurso.length > 0 ? (
          materiasPorCurso.map((curso) => (
            <CCard key={curso.cod_curso} style={{ width: "18rem" }}>
              <CCardHeader className="fw-bold text-center d-flex justify-content-between align-items-center">
                {curso.nombre_curso} - {curso.paralelo}
                <CButton
                  color="light"
                  onClick={() => {
                    setSelectedCurso(curso.cod_curso);
                    setVisible(true);
                  }}
                >
                  <FaPlus style={{ color: "green" }} />
                </CButton>
              </CCardHeader>
              <CListGroup flush>
                {curso.materias.map((materia) => (
                  <ListItem
                    key={materia.cod_materia}
                    title={materia.nombre_materia}
                    onEdit={() => {
                      setCurrentMateria(materia);
                      setEditVisible(true);
                      setValue("nombre_materia", materia.nombre_materia);
                      setValue("cod_curso", materia.cod_curso);
                    }}
                    onDelete={() => confirmDeleteMateria(materia)}
                  />
                ))}
              </CListGroup>
            </CCard>
          ))
        ) : (
          <p>No hay cursos disponibles.</p>
        )}
      </div>

      {/* Modal para agregar materia */}
      <CustomModal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Agregar Nueva Materia"
        footer={
          <>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleAddSubject}>
              Guardar
            </CButton>
          </>
        }
      >
        {registerErrors.length > 0 && (
          <div className="bg-red-500 p-2 text-white mb-4 rounded">
            {registerErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
        <CFormInput
          placeholder="Nombre de la materia"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        {errors.nombre_materia && ( // Mostrar errores de validación
          <p className="text-danger">{errors.nombre_materia.message}</p>
        )}
      </CustomModal>

      {/* Modal para actualizar materia */}
      <CustomModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        title="Actualizar Materia"
        footer={
          <>
            <CButton color="secondary" onClick={() => setEditVisible(false)}>
              Cancelar
            </CButton>
            <CButton type="submit" color="primary">
              Actualizar
            </CButton>
          </>
        }
      >
        <form onSubmit={handleSubmit(handleUpdateMateria)}>
          <Label htmlFor="nombre_materia">Nombre de la materia</Label>
          <CFormInput
            {...register("nombre_materia")}
            isInvalid={!!errors.nombre_materia} // Marcar como inválido si hay errores
          />
          {errors.nombre_materia && ( // Mostrar errores de validación
            <p className="text-danger">{errors.nombre_materia.message}</p>
          )}
        </form>
      </CustomModal>

      {/* Modal de confirmación para eliminar materia */}
      <CustomModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        title="Confirmar Eliminación"
        footer={
          <>
            <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="danger" onClick={handleDeleteMateria}>
              Eliminar
            </CButton>
          </>
        }
      >
        ¿Estás seguro de que deseas eliminar la materia:{" "}
        {currentMateria?.nombre_materia}?
      </CustomModal>
    </>
  );
}

// Componente reutilizable para modales
const CustomModal = ({ visible, onClose, title, children, footer }) => (
  <CModal backdrop="static" visible={visible} onClose={onClose}>
    <CModalHeader>
      <CModalTitle>{title}</CModalTitle>
    </CModalHeader>
    <CModalBody>{children}</CModalBody>
    <CModalFooter>{footer}</CModalFooter>
  </CModal>
);

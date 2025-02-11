import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useUser } from "../context/UserContext";
import { useCurso } from "../context/CursoContext";
import { useMateria } from "../context/MateriaContext";
import { useDocenteMateria } from "../context/DocenteMateriaContext";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

function DocenteMateria() {
  // Estados para almacenar las selecciones
  const [docenteSeleccionado, setDocenteSeleccionado] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

  // Contextos para obtener datos
  const { users, getUsersTeacher } = useUser();
  const { cursos, getCursos } = useCurso();
  const { getMateriasCurso } = useMateria();
  const { registerdocenteMateria, errors } = useDocenteMateria(); // Usar el contexto

  // Mostrar errores en un Toast cuando cambien
  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        CustomToast(error, "error"); // Mostrar cada error en un Toast
      });
    }
  }, [errors]);

  // Estados para almacenar datos
  const [docentes, setDocentes] = useState([]);
  const [materias, setMaterias] = useState([]);

  // Obtener docentes (solo profesores) al cargar el componente
  useEffect(() => {
    getUsersTeacher();
  }, []);

  // Obtener cursos al cargar el componente
  useEffect(() => {
    getCursos();
  }, []);

  // Obtener materias cuando se selecciona un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      const fetchMaterias = async () => {
        const materiasData = await getMateriasCurso(cursoSeleccionado);
        setMaterias(materiasData);
      };
      fetchMaterias();
    }
  }, [cursoSeleccionado]);

  // Filtrar materias basadas en el curso seleccionado
  const materiasFiltradas = materias.filter(
    (materia) => materia.cod_curso === parseInt(cursoSeleccionado)
  );

  // Manejar la selección de materias
  const handleMateriaSeleccionada = (materiaId) => {
    if (materiasSeleccionadas.includes(materiaId)) {
      setMateriasSeleccionadas(
        materiasSeleccionadas.filter((id) => id !== materiaId)
      );
    } else {
      setMateriasSeleccionadas([...materiasSeleccionadas, materiaId]);
    }
  };

  // Seleccionar o deseleccionar todas las materias
  const handleSelectAll = () => {
    if (materiasSeleccionadas.length === materiasFiltradas.length) {
      setMateriasSeleccionadas([]);
    } else {
      setMateriasSeleccionadas(
        materiasFiltradas.map((materia) => materia.cod_materia)
      );
    }
  };

  // Manejar el envío del formulario
  const handleAsignarMaterias = async () => {
    if (!docenteSeleccionado) {
      CustomToast("Por favor, seleccione un docente.", "warning");
      return;
    }
    if (!cursoSeleccionado) {
      CustomToast("Por favor, seleccione un curso.", "warning");
      return;
    }
    if (materiasSeleccionadas.length === 0) {
      CustomToast("Por favor, seleccione al menos una materia.", "warning");
      return;
    }

    try {
      // Crear las asignaciones usando el contexto
      const response = await registerdocenteMateria({
        cod_docente: docenteSeleccionado,
        cod_materias: materiasSeleccionadas,
      });

      if (response) {
        CustomToast("Asignación realizada con éxito.", "success");
        // Limpiar selecciones
        setDocenteSeleccionado("");
        setCursoSeleccionado("");
        setMateriasSeleccionadas([]);
      } else {
        CustomToast("Hubo un error al realizar la asignación.", "warning");
      }
    } catch (error) {
      console.error("Error al asignar materias:", error);
      CustomToast("Hubo un error al realizar la asignación.", "warning");
    }
  };

  // Columnas del DataTable
  const columns = [
    {
      name: "Seleccionar",
      cell: (row) => (
        <input
          type="checkbox"
          checked={materiasSeleccionadas.includes(row.cod_materia)}
          onChange={() => handleMateriaSeleccionada(row.cod_materia)}
        />
      ),
      width: "100px",
    },
    {
      name: "Materia",
      selector: (row) => row.nombre_materia,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Asignar Docente a Materias
          </h2>

          {/* Selección de Docente */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Seleccionar Docente
            </h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={docenteSeleccionado}
              onChange={(e) => setDocenteSeleccionado(e.target.value)}
            >
              <option value="">-- Seleccione un docente --</option>
              {users.map((docente) => (
                <option key={docente.cod_usuario} value={docente.cod_usuario}>
                  {docente.nombres} {docente.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* Selección de Curso */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Seleccionar Curso
            </h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
            >
              <option value="">-- Seleccione un curso --</option>
              {cursos.map((curso) => (
                <option key={curso.cod_curso} value={curso.cod_curso}>
                  {curso.nombre_curso}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de Materias */}
          {cursoSeleccionado && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Materias del Curso Seleccionado
              </h3>
              <div className="mb-4">
                <button
                  onClick={handleSelectAll}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {materiasSeleccionadas.length === materiasFiltradas.length
                    ? "Deseleccionar todas"
                    : "Seleccionar todas"}
                </button>
              </div>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <DataTable
                  columns={columns}
                  data={materiasFiltradas}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 15]}
                  highlightOnHover
                  pointerOnHover
                  noDataComponent="No hay materias disponibles"
                  defaultSortField="nombre_materia"
                  defaultSortAsc
                  paginationComponentOptions={{
                    rowsPerPageText: "Filas por página:",
                    rangeSeparatorText: "de",
                  }}
                />
              </div>
            </div>
          )}

          {/* Botón de Asignación */}
          <button
            onClick={handleAsignarMaterias}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Asignar Materias
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DocenteMateria;

import { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { useCurso } from "../context/CursoContext";
import { useUser } from "../context/UserContext";
import { useMatricula } from "../context/MatriculaContext";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

export function MatricularEstudiante() {
  const { cursos, getCursos } = useCurso();
  const { getEstudiantesNoMatriculados, users } = useUser();
  const { registerMatricula } = useMatricula();
  const hasFetchedCursos = useRef(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Cargar cursos y estudiantes no matriculados inicialmente
  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetchedCursos.current) {
        await getCursos();
        await getEstudiantesNoMatriculados();
        hasFetchedCursos.current = true;
      }
    };
    fetchData();
  }, [getCursos, getEstudiantesNoMatriculados]);

  // Función para manejar la selección de un estudiante
  const handleStudentSelect = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // Función para seleccionar o deseleccionar todos los estudiantes
  const handleSelectAll = () => {
    if (selectedStudents.length === users.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(users.map((estudiante) => estudiante.cod_usuario));
    }
  };

  // Función para filtrar estudiantes
  const filteredStudents = users.filter(
    (estudiante) =>
      estudiante.nombres.toLowerCase().includes(filterText.toLowerCase()) ||
      estudiante.apellidos.toLowerCase().includes(filterText.toLowerCase())
  );

  // Función para manejar la matrícula
  const handleMatricula = async () => {
    if (selectedStudents.length === 0) {
      CustomToast("Por favor, selecciona al menos un estudiante.", "warning");
      return;
    }
    
    if (!selectedCourse) {
      CustomToast("Por favor, selecciona un curso.", "warning");
      return;
    }

    // Prepara los datos para enviar al backend
    const matriculaData = {
      cod_periodo: 1, // Ajusta según tu lógica
      cod_curso: Number(selectedCourse), // Asegúrate de que sea un número
      cod_estudiantes: selectedStudents, // Envía un arreglo de estudiantes
    };

    try {
      const success = await registerMatricula(matriculaData);
      if (success) {
        CustomToast("Matrícula realizada con éxito.", "success");
        setSelectedStudents([]);
        setSelectedCourse("");
        await getEstudiantesNoMatriculados(); // Actualiza la lista de estudiantes no matriculados
      } else {
        CustomToast("Hubo un error al realizar la matrícula.", "error");
      }
    } catch (error) {
      // Captura el mensaje de error del backend
      console.error("Error al registrar la matrícula:", error.response?.data);
      alert(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
  };

  // Columnas del DataTable
  const columns = [
    {
      name: "Seleccionar",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedStudents.includes(row.cod_usuario)}
          onChange={() => handleStudentSelect(row.cod_usuario)}
        />
      ),
      width: "100px",
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
  ];

  return (
    <>
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Matricular Estudiantes
          </h2>

          {/* Selección de estudiantes */}
          <div className="mb-6">
            <div className="d-flex justify-content-end mb-2">
              <div className="input-group" style={{ width: "auto" }}>
                <span className="input-group-text">Buscar:</span>
                <input
                  type="text"
                  className="form-control"
                  style={{ minWidth: "150px", maxWidth: "250px" }}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <button
                onClick={handleSelectAll}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {selectedStudents.length === users.length
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <DataTable
                columns={columns}
                data={filteredStudents}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                highlightOnHover
                pointerOnHover
                noDataComponent="No hay estudiantes disponibles"
                defaultSortField="nombres"
                defaultSortAsc
                paginationComponentOptions={{
                  rowsPerPageText: "Filas por página:", // Texto para la opción de filas por página
                  rangeSeparatorText: "de", // Texto que separa el rango de filas
                }}
              />
            </div>
          </div>

          {/* Selección de curso */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Seleccionar Curso
            </h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((curso) => (
                <option key={curso.cod_curso} value={curso.cod_curso}>
                  {curso.nombre_curso} - {curso.paralelo}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de matricular */}
          <button
            onClick={handleMatricula}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Matricular
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MatricularEstudiante;

import { useEffect, useState, useRef } from "react";
import { useCurso } from "../context/CursoContext"; // Obtener los cursos
import { useMateria } from "../context/MateriaContext"; // Obtener las materias
import DataTable from "react-data-table-component";

export function VerCursos() {
  const { cursos, getCursos } = useCurso(); // Obtener los cursos del contexto
  const { materias, getMaterias } = useMateria(); // Obtener las materias del contexto
  const [selectedCurso, setSelectedCurso] = useState(null); // Estado para almacenar el curso seleccionado
  const [filteredCursos, setFilteredCursos] = useState([]); // Estado para almacenar los cursos filtrados
  const hasFetchedCursos = useRef(false);

  // Cargar cursos y materias inicialmente
  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetchedCursos.current) {
        await getCursos(); // Llamada al contexto para obtener los cursos
        await getMaterias(); // Llamada al contexto para obtener las materias
        hasFetchedCursos.current = true;
      }
    };
    fetchData();
  }, [getCursos, getMaterias]);

  // Actualizar los cursos filtrados
  useEffect(() => {
    setFilteredCursos(cursos); // Inicializa la lista de cursos
  }, [cursos]);

  // Manejar el filtro de búsqueda de cursos
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const newData = cursos.filter((row) => {
      return (
        row.nombre_curso.toLowerCase().includes(query) ||
        row.paralelo.toLowerCase().includes(query)
      );
    });
    setFilteredCursos(newData);
  };

  // Filtrar las materias basadas en el curso seleccionado
  const materiasFiltradas = materias.filter(
    (materia) => materia.cod_curso === parseInt(selectedCurso)
  );

  // Manejar la selección de un curso
  const handleCursoClick = (cursoId) => {
    setSelectedCurso(cursoId); // Establece el curso seleccionado
  };

  // Columnas para la tabla de cursos
  const columns = [
    {
      name: "Nombre del Curso",
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
        <button
          className="text-blue-600"
          onClick={() => handleCursoClick(row.cod_curso)}
        >
          Ver Materias
        </button>
      ),
    },
  ];

  // Columnas para la tabla de materias
  const materiaColumns = [
    {
      name: "Nombre de la Materia",
      selector: (row) => row.nombre_materia,
      sortable: true,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Ver Cursos</h2>

        {/* Filtro de búsqueda */}
        <div className="d-flex justify-content-end mb-2">
          <div className="input-group" style={{ width: "auto" }}>
            <span className="input-group-text">Buscar:</span>
            <input
              type="text"
              onChange={handleFilter}
              className="form-control"
              style={{ minWidth: "150px", maxWidth: "250px" }}
            />
          </div>
        </div>

        {/* Tabla de cursos */}
        <DataTable
          columns={columns}
          data={filteredCursos}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent="No hay cursos disponibles"
        />

        {/* Si un curso está seleccionado, mostrar las materias */}
        {selectedCurso && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Materias del Curso</h3>
            
            <DataTable
              columns={materiaColumns}
              data={materiasFiltradas}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15]}
              paginationComponentOptions={paginationComponentOptions}
              noDataComponent="No hay materias disponibles"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VerCursos;

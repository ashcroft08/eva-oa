import { useState } from "react";
import DataTable from "react-data-table-component"; // Componente para tablas

export function VerEstudiantes() {
  const [selectedCurso, setSelectedCurso] = useState(""); // Estado para almacenar el curso seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda

  // Datos de ejemplo: Estudiantes y cursos (puedes adaptarlos a tu modelo real)
  const cursos = [
    { cod_curso: 1, nombre_curso: "Curso de Matemáticas" },
    { cod_curso: 2, nombre_curso: "Curso de Historia" },
  ];

  const estudiantes = [
    { cod_usuario: 1, nombres: "Juan", apellidos: "Pérez", cod_curso: 1, nombre_materia: "Álgebra" },
    { cod_usuario: 2, nombres: "Ana", apellidos: "López", cod_curso: 1, nombre_materia: "Geometría" },
    { cod_usuario: 3, nombres: "Carlos", apellidos: "García", cod_curso: 2, nombre_materia: "Historia Antigua" },
    { cod_usuario: 4, nombres: "Laura", apellidos: "Martínez", cod_curso: 2, nombre_materia: "Historia Moderna" },
  ];

  // Filtrar estudiantes por curso seleccionado
  const estudiantesFiltrados = estudiantes.filter(
    (estudiante) =>
      estudiante.cod_curso === parseInt(selectedCurso) &&
      (estudiante.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Columnas para la tabla de estudiantes
  const columns = [
    {
      name: "Nombre del Estudiante",
      selector: (row) => row.nombres + " " + row.apellidos,
      sortable: true,
    },
    {
      name: "Materia",
      selector: (row) => row.nombre_materia,
      sortable: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Ver Estudiantes</h2>

        {/* Selección de Curso */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Seleccionar Curso</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCurso}
            onChange={(e) => setSelectedCurso(e.target.value)}
          >
            <option value="">-- Selecciona un curso --</option>
            {cursos.map((curso) => (
              <option key={curso.cod_curso} value={curso.cod_curso}>
                {curso.nombre_curso}
              </option>
            ))}
          </select>
        </div>

        {/* Barra de Búsqueda */}
        {selectedCurso && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Buscar Estudiante</h3>
            <input
              type="text"
              placeholder="Escribe el nombre o apellido..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Tabla de Estudiantes Matriculados */}
        <DataTable
          columns={columns}
          data={estudiantesFiltrados}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página:",
            rangeSeparatorText: "de",
          }}
          noDataComponent="No hay estudiantes disponibles"
        />
      </div>
    </div>
  );
}

export default VerEstudiantes;

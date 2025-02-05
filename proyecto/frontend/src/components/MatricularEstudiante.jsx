import React, { useState } from "react";
import DataTable from "react-data-table-component";

export function MatricularEstudiante() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Datos de ejemplo para estudiantes y cursos
  const estudiantes = [
    { id: 1, nombre: "Scarlet Brigith Cayapa Alvear", cedula: "1550042756" },
    { id: 2, nombre: "Alan Alexis Navia Pinillo", cedula: "0804396083" },
    { id: 3, nombre: "Juan Pérez", cedula: "1234567890" },
    { id: 4, nombre: "María Gómez", cedula: "0987654321" },
    { id: 5, nombre: "Carlos López", cedula: "1122334455" },
    { id: 6, nombre: "Ana Martínez", cedula: "5566778899" },
    { id: 7, nombre: "Luis Rodríguez", cedula: "9988776655" },
    { id: 8, nombre: "Sofía García", cedula: "4433221100" },
    { id: 9, nombre: "Pedro Sánchez", cedula: "6677889900" },
    { id: 10, nombre: "Lucía Fernández", cedula: "0011223344" },
  ];

  const cursos = [
    { id: 1, nombre: "Matemáticas" },
    { id: 2, nombre: "Ciencias" },
    { id: 3, nombre: "Historia" },
  ];

  // Función para manejar la selección de un estudiante
  const handleStudentSelect = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // Función para seleccionar o deseleccionar todos los estudiantes
  const handleSelectAll = () => {
    if (selectedStudents.length === estudiantes.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(estudiantes.map((estudiante) => estudiante.id));
    }
  };

  // Función para filtrar estudiantes
  const filteredStudents = estudiantes.filter(
    (estudiante) =>
      estudiante.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      estudiante.cedula.includes(filterText)
  );

  // Columnas del DataTable
  const columns = [
    {
      name: "Seleccionar",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedStudents.includes(row.id)}
          onChange={() => handleStudentSelect(row.id)}
        />
      ),
      width: "100px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Cédula",
      selector: (row) => row.cedula,
      sortable: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Matricular Estudiantes
        </h2>

        {/* Selección de estudiantes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Seleccionar Estudiantes
          </h3>
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
              {selectedStudents.length === estudiantes.length ? "Deseleccionar todos" : "Seleccionar todos"}
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
              defaultSortField="nombre"
              defaultSortAsc
            />
          </div>
        </div>

        {/* Selección de curso */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Seleccionar Curso
          </h3>
          <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de matricular */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Matricular
        </button>
      </div>
    </div>
  );
}

export default MatricularEstudiante;
import React, { useState } from "react";
import DataTable from "react-data-table-component";

function DocenteMateria() {
  // Estado para almacenar los datos seleccionados
  const [docenteSeleccionado, setDocenteSeleccionado] = useState("");
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

  // Datos de ejemplo (pueden ser reemplazados por datos reales)
  const docentes = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María Gómez" },
    { id: 3, nombre: "Carlos López" },
  ];

  const cursos = [
    { id: 1, nombre: "Curso de Matemáticas" },
    { id: 2, nombre: "Curso de Ciencias" },
    { id: 3, nombre: "Curso de Historia" },
  ];

  const materias = [
    { id: 1, cursoId: 1, nombre: "Álgebra" },
    { id: 2, cursoId: 1, nombre: "Geometría" },
    { id: 3, cursoId: 2, nombre: "Biología" },
    { id: 4, cursoId: 2, nombre: "Química" },
    { id: 5, cursoId: 3, nombre: "Historia Antigua" },
    { id: 6, cursoId: 3, nombre: "Historia Moderna" },
  ];

  // Filtrar materias basadas en el curso seleccionado
  const materiasFiltradas = materias.filter(
    (materia) => materia.cursoId === parseInt(cursoSeleccionado)
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
      setMateriasSeleccionadas(materiasFiltradas.map((materia) => materia.id));
    }
  };

  // Columnas del DataTable
  const columns = [
    {
      name: "Seleccionar",
      cell: (row) => (
        <input
          type="checkbox"
          checked={materiasSeleccionadas.includes(row.id)}
          onChange={() => handleMateriaSeleccionada(row.id)}
        />
      ),
      width: "100px",
    },
    {
      name: "Materia",
      selector: (row) => row.nombre,
      sortable: true,
    },
  ];

  return (
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
            {docentes.map((docente) => (
              <option key={docente.id} value={docente.id}>
                {docente.nombre}
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
              <option key={curso.id} value={curso.id}>
                {curso.nombre}
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
                defaultSortField="nombre"
                defaultSortAsc
                paginationComponentOptions={{
                  rowsPerPageText: "Filas por página:",
                  rangeSeparatorText: "de",
                }}
              />
            </div>
          </div>
        )}

        {/* Botón de Asignación (sin funcionalidad) */}
        <button
          onClick={() => alert("Asignación realizada (sin funcionalidad)")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Asignar Materias
        </button>
      </div>
    </div>
  );
}

export default DocenteMateria;
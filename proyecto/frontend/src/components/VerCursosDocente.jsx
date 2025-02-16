import { useEffect, useState, useCallback } from "react";
import { useCurso } from "../context/CursoContext";
import { useAuth } from "../context/AuthContext";
import DataTable from "react-data-table-component";

export function VerCursosDocente() {
  const { getCursoPorDocente, cursosDocente } = useCurso();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]); // Datos para la tabla

  // Memoizar la función para evitar que se redefina en cada renderizado
  const getCursoPorDocenteMemoized = useCallback(
    async (cod_usuario) => {
      await getCursoPorDocente(cod_usuario);
    },
    [getCursoPorDocente]
  );

  // Cargar los cursos del docente logueado al montar el componente
  useEffect(() => {
    if (cursosDocente.length === 0) {
      const fetchCursos = async () => {
        try {
          await getCursoPorDocenteMemoized(user.cod_usuario); // Obtener cursos usando el cod_usuario
        } catch (error) {
          console.error("Error al obtener cursos:", error);
        } finally {
          setLoading(false); // Finalizar la carga
        }
      };

      fetchCursos();
    }
  }, [getCursoPorDocenteMemoized, user.cod_usuario, cursosDocente.length]);

  // Preparar los datos para la tabla
  useEffect(() => {
    if (cursosDocente.length > 0) {
      const datosTabla = cursosDocente.flatMap((curso) =>
        curso.materias.map((materia) => ({
          curso: curso.nombre_curso,
          materia: materia,
        }))
      );
      setDataTable(datosTabla);
    } else {
      setDataTable([]);
    }
  }, [cursosDocente]);

  // Columnas de la tabla
  const columns = [
    {
      name: "Curso",
      selector: (row) => row.curso,
      sortable: true,
    },
    {
      name: "Materia",
      selector: (row) => row.materia,
      sortable: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cursos y Materias Asignados</h2>

        {/* Tabla de Cursos y Materias */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando cursos y materias...</p>
        ) : (
          <>
            {dataTable.length > 0 ? (
              <DataTable
                columns={columns}
                data={dataTable}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                  rowsPerPageText: "Filas por página:",
                  rangeSeparatorText: "de",
                }}
                noDataComponent="No hay cursos o materias disponibles"
              />
            ) : (
              <p className="text-center text-gray-500">No hay cursos o materias asignados.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VerCursosDocente;
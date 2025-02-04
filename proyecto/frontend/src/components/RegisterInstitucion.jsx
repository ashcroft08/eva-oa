import { useInstitucion } from "../context/InstitucionContext";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { institucionSchema } from "../schemas/institucion"; // Asegúrate de importar tu schema
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormInput,
} from "@coreui/react";
import { ToastContainer } from "react-toastify";
import CustomToast from "./ui/CustomToast";

export function RegisterInstitucion() {
  const {
    createInstitucion,
    updateInstitucion,
    fetchInstitucion,
    institucion,
    errors,
  } = useInstitucion();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(institucionSchema),
  });

  useEffect(() => {
    const loadInstitucion = async () => {
      if (!institucion) {
        await fetchInstitucion();
      }
    };
    loadInstitucion();
  }, [institucion]);

  useEffect(() => {
    if (institucion) {
      setValue("nombre_institucion", institucion.nombre_institucion);
      // Asegúrate de que la URL sea accesible
      setPreviewUrl(`http://localhost:4000/${institucion.logo_institucion}`);
    } else {
      reset();
      setPreviewUrl(null);
    }
  }, [institucion, setValue, reset]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
      setFile(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nombre_institucion", data.nombre_institucion);

    // Validar si es un registro y si el logo es obligatorio
    if (!institucion && !file) {
      CustomToast(
        "El logo es obligatorio al registrar una institución.",
        "error"
      );
      return;
    }

    // Solo agregar el archivo si existe
    if (file) {
      formData.append("logo_institucion", file);
    }

    try {
      if (institucion) {
        await updateInstitucion(formData);
        CustomToast("¡Institución actualizada exitosamente!", "success");
      } else {
        await createInstitucion(formData);
        CustomToast("¡Institución registrada exitosamente!", "success");
      }
      reset();
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      CustomToast(
        error.response?.data?.message || "Error al procesar la institución",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CCard>
        <CCardHeader className="text-center fw-bold fs-5">
          DATOS DE LA INSTITUCIÓN
        </CCardHeader>
        <CCardBody>
          {/* Campo del logo */}
          <div className="mt-2 position-relative">
            <label htmlFor="logo_institucion" className="fw-bold fs-6">
              Logo de la Institución:
            </label>

            {previewUrl && (
              <div className="mb-2 text-center">
                <img
                  src={previewUrl}
                  alt="Vista previa del logo"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                  className="border rounded"
                />
              </div>
            )}

            <CFormInput
              id="logo_institucion"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* Campo del nombre */}
          <div className="mt-2">
            <label htmlFor="nombre_institucion" className="fw-bold fs-6">
              Nombre de la Institución:
            </label>
            <CFormInput
              {...register("nombre_institucion")}
              id="nombre_institucion"
              type="text"
              placeholder="Unidad Educativa Example"
              invalid={!!formErrors.nombre_institucion}
            />
            {formErrors.nombre_institucion && (
              <div className="text-danger mt-1">
                {formErrors.nombre_institucion.message}
              </div>
            )}
          </div>

          {/* Botón de submit */}
          <div className="mt-4 d-grid">
            <CButton type="submit" color="primary">
              {institucion ? "Actualizar Institución" : "Registrar Institución"}
            </CButton>
          </div>
        </CCardBody>
      </CCard>
      <ToastContainer />
    </form>
  );
}

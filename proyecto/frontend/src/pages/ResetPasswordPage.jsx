import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoverPassword } from "../context/RecoverPasswordContext";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnAccept from "../components/ui/BtnAccept";
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import CustomToast from "../components/ui/CustomToast";
import { useEffect, useRef } from "react";

function ResetPasswordPage() {
  const { register, handleSubmit } = useForm();
  const { resetPassword, recoveryStatus, errors } = useRecoverPassword();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Obtener el correo electrónico de la navegación
  const code = location.state?.code; // Obtener el codigo de la navegación
  const lastStatusRef = useRef(null); // Usar una referencia para controlar el último estado mostrado
  const onSubmit = async (data) => {
    try {
      const success = await resetPassword(email, code, data.newPassword);
      if (success) {
        // Redirigir al login después de restablecer la contraseña
        navigate("/login");
      } else {
        // Si hay un error, muestra el mensaje de error
        CustomToast(errors || "Error desconocido", "error");
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
    }
  };

  // Mostrar mensajes en toast solo una vez por cada valor único de `recoveryStatus`
  useEffect(() => {
    if (recoveryStatus && lastStatusRef.current !== recoveryStatus) {
      CustomToast(recoveryStatus, "success");
      lastStatusRef.current = recoveryStatus; // Registrar el estado ya mostrado
    }
  }, [recoveryStatus]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CCard style={{ width: "30rem" }}>
          <CCardBody>
            <CCardTitle className="text-body-secondary text-center">
              <h1>Restablecer Contraseña</h1>
            </CCardTitle>
            <CCardSubtitle className="mb-2 text-body-secondary">
              <Label htmlFor="newPassword">Nueva Contraseña:</Label>
            </CCardSubtitle>
            <CCardText>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                register={register}
                validation={{ required: "La nueva contraseña es obligatoria" }}
                placeholder="Ingresa tu nueva contraseña"
              />
            </CCardText>
            <BtnAccept type="submit" className="mt-4">
              Restablecer Contraseña
            </BtnAccept>
          </CCardBody>
        </CCard>
      </form>
    </div>
  );
}

export default ResetPasswordPage;

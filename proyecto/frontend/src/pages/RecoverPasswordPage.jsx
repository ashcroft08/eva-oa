import { useForm } from "react-hook-form";
import { useRecoverPassword } from "../context/RecoverPasswordContext";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnAccept from "../components/ui/BtnAccept";
import { useNavigate, Link } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import CustomToast from "../components/ui/CustomToast"; // Asegúrate de que la ruta sea correcta

function RecoverPasswordPage() {
  const { register, handleSubmit } = useForm();
  const { sendRecoveryCode, errors } = useRecoverPassword();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await sendRecoveryCode(data.email);
    if (success) {
      navigate("/validate-recovery-code", { state: { email: data.email } }); // Redirige a la página para validar el código
    } else {
      // Si hay un error, muestra el mensaje de error
      CustomToast(errors || "Error desconocido", "error");
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CCard style={{ width: "30rem" }}>
          <CCardBody>
            <CCardTitle className="text-body-secondary text-center">
              <h1>Recuperar Contraseña</h1>
            </CCardTitle>
            <CCardSubtitle className="mb-2 text-body-secondary">
              <Label htmlFor="email">Correo Electrónico:</Label>
            </CCardSubtitle>
            <CCardText>
              <Input
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{ required: "El correo es obligatorio" }}
                placeholder="Ingresa tu correo electrónico"
              />
            </CCardText>
            <BtnAccept type="submit" className="mt-4">
              Enviar Código
            </BtnAccept>
            <p className="mt-10 text-center text-sm text-gray-500">
              ¿Te acordaste la contraseña?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Iniciar sesión
              </Link>
            </p>
          </CCardBody>
        </CCard>
      </form>
    </div>
  );
}

export default RecoverPasswordPage;

import "tailwindcss/tailwind.css";
import EvaLogo from "../assets/EVA.png";
import BackgroundLogin from "../assets/BackgroundLogin.jpg";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import BtnSuccess from "../components/ui/BtnSuccess";
import ErrorMessages from "../components/ui/ErrorMessages";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  //Para visualizar contraseñas
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user?.cod_rol === 1) navigate("/admin");
      else if (user?.cod_rol === 2) navigate("/teacher");
      else if (user?.cod_rol === 3) navigate("/student");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${BackgroundLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img alt="Logo EVA" src={EvaLogo} className="flex w-full" />
        </div>
        {/* Utiliza el nuevo componente para mostrar los errores */}
        <ErrorMessages errors={signinErrors} />
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              register={register}
              validation={{ required: true }}
            />
            {errors.email && (
              <p className="text-red-500">
                El correo electrónico es obligatorio
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
                register={register}
                validation={{ required: true }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Cambia el ícono */}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">La contraseña es obligatoria</p>
            )}
          </div>

          <BtnSuccess type="submit">Iniciar sesión</BtnSuccess>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Has olvidado la contraseña?{" "}
          <Link
            to="/recoverpassword"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Recuperar contraseña
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

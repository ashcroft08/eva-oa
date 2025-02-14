import { useNavigate } from "react-router-dom";
import { CContainer, CRow } from "@coreui/react";
import HeroSection from "../components/ui/HeroSection";
import FeatureCard from "../components/ui/FeatureCard";
import Footer from "../components/ui/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <CContainer fluid className="vh-100 d-flex flex-column">
      {/* Sección Principal */}
      <HeroSection onLogin={() => navigate("/login")} />

      {/* Sección de Características */}
      <CRow className="mt-4 justify-content-center">
        <FeatureCard
          icon="📖"
          title="Gestión de Evaluaciones"
          description="Crea y gestiona evaluaciones de forma eficiente para tus estudiantes."
        />
        <FeatureCard
          icon="📝"
          title="Calificación Rápida"
          description="Revisa y califica pruebas y actividades con facilidad."
        />
        <FeatureCard
          icon="💬"
          title="Foros de Discusión"
          description="Fomenta la participación con espacios de discusión interactivos."
        />
      </CRow>

      {/* Pie de Página */}
      <Footer />
    </CContainer>
  );
};

export default HomePage;

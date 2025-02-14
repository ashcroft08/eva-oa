import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecoverPasswordProvider } from "./context/RecoverPasswordContext";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import OTPInputPage from "./pages/ValidateCodePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CursoProvider } from "./context/CursoContext";
import { InstitucionProvider } from "./context/InstitucionContext";
import { PeriodoProvider } from "./context/PeriodoContext";
import { MateriaProvider } from "./context/MateriaContext";
import { MatriculaProvider } from "./context/MatriculaContext";
import { DocenteMateriaProvider } from "./context/DocenteMateriaContext";
import { DashboardProvider } from "./context/DashboardContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <InstitucionProvider>
            <CursoProvider>
              <PeriodoProvider>
                <MateriaProvider>
                  <MatriculaProvider>
                    <DocenteMateriaProvider>
                      <DashboardProvider>
                        {" "}
                        <BrowserRouter>
                          <RecoverPasswordProvider>
                            <Routes>
                              {/* Rutas públicas */}
                              <Route
                                path="/"
                                element={
                                  <PublicRoute>
                                    <HomePage />
                                  </PublicRoute>
                                }
                              />
                              <Route
                                path="/login"
                                element={
                                  <PublicRoute>
                                    <LoginPage />
                                  </PublicRoute>
                                }
                              />
                              <Route
                                path="/recoverpassword"
                                element={
                                  <PublicRoute>
                                    <RecoverPasswordPage />
                                  </PublicRoute>
                                }
                              />
                              <Route
                                path="/validate-recovery-code"
                                element={
                                  <PublicRoute>
                                    <OTPInputPage />
                                  </PublicRoute>
                                }
                              />
                              <Route
                                path="/reset-password"
                                element={
                                  <PublicRoute>
                                    <ResetPasswordPage />
                                  </PublicRoute>
                                }
                              />

                              {/* Rutas protegidas */}
                              <Route
                                element={<ProtectedRoute roles={[1, 2]} />}
                              >
                                <Route path="/admin" element={<AdminPage />} />
                              </Route>

                              <Route element={<ProtectedRoute roles={[3]} />}>
                                <Route
                                  path="/teacher"
                                  element={<TeacherPage />}
                                />
                              </Route>

                              <Route element={<ProtectedRoute roles={[4]} />}>
                                <Route
                                  path="/student"
                                  element={<StudentPage />}
                                />
                              </Route>
                            </Routes>
                          </RecoverPasswordProvider>
                        </BrowserRouter>
                      </DashboardProvider>
                    </DocenteMateriaProvider>
                  </MatriculaProvider>
                </MateriaProvider>
              </PeriodoProvider>
            </CursoProvider>
          </InstitucionProvider>
        </UserProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;

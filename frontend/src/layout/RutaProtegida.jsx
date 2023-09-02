import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Footer, Header } from "../components";

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando...";
  return (
    <>
      <Header />

      {/* si no está autenticado, redireccionar al login */}
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  );
};

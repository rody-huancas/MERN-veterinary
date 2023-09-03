import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <>
      <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-indigo-100 text-center">
            Administrador de Pacientes de {""}
            <span className="text-white font-black">Veterinaria</span>
          </h1>

          <nav className="flex flex-col items-center lg:flex-row gap-5 mt-5 lg:mt-0">
            <Link
              to="/admin"
              className="text-white text-sm uppercase font-bold"
            >
              Pacientes
            </Link>
            <Link
              to="/admin/perfil"
              className="text-white text-sm uppercase font-bold"
            >
              Perfil
            </Link>

            <button
              onClick={cerrarSesion}
              className="text-white text-sm uppercase font-bold"
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

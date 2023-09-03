import { Link } from "react-router-dom";

export const AdminNav = () => {
  return (
    <>
      <nav className="flex gap-4">
        <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">
          Editar Perfil
        </Link>

        <Link
          to="/admin/cambiar-password"
          className="font-bold uppercase text-gray-500"
        >
          Actualizar Contraseña
        </Link>
      </nav>
    </>
  );
};

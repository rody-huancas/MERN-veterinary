import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos.", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales.", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña tiene menos de 6 caracteres.",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear el usuario de la api
    try {
      await clienteAxios.post("/veterinarios", {
        nombre,
        email,
        password,
      });
      setAlerta({
        msg: "Creado correctamente, revise su correo electrónico.",
        error: false,
      });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Ingrese su contraseña"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Registrarme"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 transition-colors hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

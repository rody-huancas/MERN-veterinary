import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import {
  AdministrarPacientes,
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Registrar,
} from "./pages/";
import { AuhtProvider } from "./context/AuthProvider";
import { RutaProtegida } from "./layout/RutaProtegida";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuhtProvider>
          <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/olvide-password" element={<OlvidePassword />} />
              <Route
                path="/olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* RUTAS PROTEGIDAS */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
            </Route>
          </Routes>
        </AuhtProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

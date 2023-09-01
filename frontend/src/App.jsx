import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import {
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Registrar,
} from "./pages/";
import { AuhtProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuhtProvider>
          <Routes>
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
          </Routes>
        </AuhtProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

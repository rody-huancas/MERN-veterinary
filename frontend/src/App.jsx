import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import {
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Registrar,
} from "./pages/";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/olvide-password" element={<OlvidePassword />} />
            <Route path="/olvide-password/:token" element={<NuevoPassword />} />
            <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

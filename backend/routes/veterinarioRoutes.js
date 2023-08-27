import express from 'express'
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/autrhMiddleware.js';

const router = express.Router();

// AREA PÚBLICA
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
// router.get("/olvide-password/:token", comprobarToken)
// router.post("/olvide-password/:token", nuevoPassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);


// AREA PRIVADA
// cuando vayamos a la ruta, primero entrará a la funcuón de checkAuth y luego a perfil
router.get("/perfil", checkAuth, perfil);

export default router;
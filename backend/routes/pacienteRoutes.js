import express from "express";
import {
    actualizarPaciente,
    agregarPaciente,
    eliminarPaciente,
    obtenerPaciente,
    obtenerPacientes,
} from "../controllers/pacienteController.js";
import checkAuth from "../middleware/autrhMiddleware.js";
const router = express.Router();

// cuando enviemos la peticion a la misma ruta
router
    .route("/")
    .post(checkAuth, agregarPaciente) // pasamos el checkAuth para saber si el usuario está autenticado
    .get(checkAuth, obtenerPacientes);

router
    .route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default router;

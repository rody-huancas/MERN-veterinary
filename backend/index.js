import express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js"
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import pacienteRoutes from "./routes/pacienteRoutes.js"

const app = express();
// enviar datos de tipo json
app.use(express.json());
// acceder a las variables de entorno
dotenv.config();
// Llamar la conexion a la bd
conectarDB();
// rutas para el veterinario
app.use("/api/veterinarios", veterinarioRoutes);
// rutas del paciente
app.use("/api/pacientes", pacienteRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutando en el puerto: ${PORT}`);
});
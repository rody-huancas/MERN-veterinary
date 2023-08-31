import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
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
// Configurar cors
const dominiosPermitidos = ["http://localhost:5173"]
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== 1) {
            // El origen es permitido
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}
// usar cors
app.use(cors(corsOptions))
// rutas para el veterinario
app.use("/api/veterinarios", veterinarioRoutes);
// rutas del paciente
app.use("/api/pacientes", pacienteRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutando en el puerto: ${PORT}`);
});
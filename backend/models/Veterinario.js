import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import generarId from "../helpers/generarId.js";


const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

// antes de guardar en la bd...
veterinarioSchema.pre("save", async function (next) {
    // Si ya está hasheado, que no lo vuelva a hashear
    if (!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    // modificar ese password para que se  hasheado
    this.password = await bcrypt.hash(this.password, salt);
});

// ver si el password ingresado es igual al que tenemos registrado
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    // retorna tru o false
    return await bcrypt.compare(passwordFormulario, this.password)
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;
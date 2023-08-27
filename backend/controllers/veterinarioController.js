import Veterinario from "../models/Veterinario.js";

// req -> mandar al servidor
// res -> respuesta del servidor

const registrar = async (req, res) => {

    const { nombre, email, password } = req.body;

    // Prevenir usuarios duplicados
    // findOne => buscar un usuario por los diferentes atributos que tenga
    const existeUsuario = await Veterinario.findOne({ email });
    if (existeUsuario) {
        const error = new Error("El usuario ya está registrado.");
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Guardar veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.send(veterinarioGuardado);
    } catch (error) {
        console.log(error);

    }
}

const perfil = (req, res) => {
    res.send({ mdg: "mostrar perfil" });
}

export {
    registrar, perfil
}
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
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
        return res.status(400).json({ msg: error.message });
    }

    try {
        // instancia de veterinario
        const veterinario = new Veterinario(req.body);
        // Guardar veterinario
        const veterinarioGuardado = await veterinario.save();
        // cuando se guarde, mostrar datos del registro
        res.send(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    // estraer veterinario que está guuardado en la sesion
    const { veterinario } = req;

    res.send({
        perfil: veterinario,
    });
};

const confirmar = async (req, res) => {
    // obterner el token de la url
    const { token } = req.params;
    // buscar el usuario que tenga ese token
    const usuarioConfirmar = await Veterinario.findOne({ token });
    // si no existe el usuario con ese token
    if (!usuarioConfirmar) {
        const error = new Error("Token no válido.");
        return res.status(404).json({ msg: error.message });
    }

    try {
        // quitar el token
        usuarioConfirmar.token = null;
        // pasar a confirmado ese usuarip
        usuarioConfirmar.confirmado = true;
        // guardar el usuario
        await usuarioConfirmar.save();

        res.send({ msg: "Usuario confirmado correctamente." });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });

    // si no existe el usuario
    if (!usuario) {
        const error = new Error("El usuario no existe.");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada.");
        return res.status(404).json({ msg: error.message });
    }

    // Autenticar al usuario, el comprobarPassword está definido en el model
    if (await usuario.comprobarPassword(password)) {
        // autenticar
        res.json({ token: generarJWT(usuario._id) });
    } else {
        const error = new Error("La contraseña es incorrecta.");
        return res.status(404).json({ msg: error.message });
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    // verificar si el email que enviamos existe en algun usuario registrado
    const existeVeterinario = await Veterinario.findOne({ email });
    // si no existe
    if (!existeVeterinario) {
        const error = new Error("El usuario no existe.");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // generar un nuevo token
        existeVeterinario.token = generarId();
        // guardar usuario con un nuevo token
        await existeVeterinario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones." });
    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    // verificar por token que usuario lo tiene
    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        // El token es valido, el usuario existe
        res.json({ msg: "Token válido, el usuario existe." })
    } else {
        const error = new Error("Token no válido.");
        return res.status(404).json({ msg: error.message });
    }
};
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // buscar usuario con el token
    const veterinario = await Veterinario.findOne({ token });
    if (!veterinario) {
        const error = new Error("Hubo un error.");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // pasar el token a null
        veterinario.token = null;
        // actualizar la contraseña
        veterinario.password = password;

        // guardar cambios
        await veterinario.save()

        res.json({ msg: "Contraseña actualizada correctamente." });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
};

import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

// verificar si el usuario está autenticado y que usuario es
const checkAuth = async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization);
    // si tiene un token y el bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // extrarer ek token, con el split separamos cuando haya un espacio, y el de la posicion 1 lo guardamos en token
            token = req.headers.authorization.split(' ')[1]

            // obtener los datos del usuario que se almacenaron en el jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // buscar ese usuario en la base de datos mediante el id que extraemos del jwt, traemos todo menos el password, token y confirmado
            // luego con req.veterinario se crea una sesión con esos datos
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next(); // pasará al siguiete middleware
        } catch (error) {
            const errorToken = new Error("Token no válido.");
            return res.status(403).json({ msg: errorToken.message });
        }

    }

    // si no existe el token
    if (!token) {
        const error = new Error("Token no válido o inexistente.");
        res.status(403).json({ msg: error.message });
    }
    next();
}

export default checkAuth;

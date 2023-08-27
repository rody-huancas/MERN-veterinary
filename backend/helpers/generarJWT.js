import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    // sign -> crea un nuevo jwt
    // el primer parametro {} => informacion que se agregará en el jwt, en este caso el id del usuario
    // segundo parametro => llave secreta
    // tercer parametro => opciones, como por ejemplo cuando va a aexprirar el jwt 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

export default generarJWT;
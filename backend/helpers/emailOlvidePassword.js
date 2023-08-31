import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos

    // enviar email
    const info = await transporter.sendMail({
        from: "APV - Administrador de pacientes de veterinaria",
        to: email,
        subject: "Reestablece tu contraseña.",
        text: "Reestablece tu contraseña.",
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu contraseña.</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña.</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log("enviado: %s", info.messageId);
}

export default emailOlvidePassword;
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { findByUsername } from "../../services/findByUsername.js";
import { verifyPassword } from "../../utils/security/verifyPassword.js";

dotenv.config();

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Credenciales requeridas",
      });
    }

    const user = await findByUsername(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const isValidPassword = await verifyPassword(password, user.contraseña);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      {
        id: user.id_usuario,
        username: user.usuario,
        correo: user.correo,
      },
      process.env.JWT_SECRET.trim(),
    );

    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id_usuario,
        username: user.usuario,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    return res.status(500).json({
      success: false,
      message: "Error del servidor al procesar el login",
    });
  }
};

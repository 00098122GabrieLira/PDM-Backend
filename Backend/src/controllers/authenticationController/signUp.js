// backend/src/controllers/authenticationController/signUp.js
import { generateHash } from "../../utils/security/generateHash.js";
import { createProfile } from "../../services/createprofile.js";
import { validateSignUp } from "../../validators/authValidator.js";
import { sanitizeInput } from "../../utils/helpers/sanitizer.js";

export const signUp = async (req, res) => {

  try {
    const sanitizedData = {
      username: sanitizeInput(req.body.username),
      correo: sanitizeInput(req.body.correo?.toLowerCase()),
      password: sanitizeInput(req.body.password),
    };

    const { error, value } = validateSignUp(sanitizedData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: error.details.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    const profile = await createProfile(sanitizedData);

    res.status(201).json({
      success: true,
      message: "Registrado exitosamente.",
      user: {
        id_usuario: profile.id_usuario,
        usuario: profile.usuario,
        correo: profile.correo,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      const constraint = error.constraint;
      if (constraint.includes("correo")) {
        return res.status(400).json({
          success: false,
          message: "El correo electrónico ya está registrado",
        });
      }
      if (constraint.includes("usuario")) {
        return res.status(400).json({
          success: false,
          message: "El nombre de usuario ya está en uso",
        });
      }
    }
    console.error("Error en registro:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

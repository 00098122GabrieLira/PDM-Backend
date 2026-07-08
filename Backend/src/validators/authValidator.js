import Joi from "joi";

export const validateSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.alphanum": "El usuario solo puede contener letras y números",
      "string.min": "El usuario debe tener al menos 3 caracteres",
      "string.max": "El usuario no puede exceder 30 caracteres",
    }),

    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
      )
      .required()
      .messages({
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.pattern.base":
          "La contraseña debe incluir mayúsculas, minúsculas, números y símbolos",
      }),
      
    correo: Joi.string().email().max(100).required().messages({
      "string.email": "Ingresa un correo válido",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

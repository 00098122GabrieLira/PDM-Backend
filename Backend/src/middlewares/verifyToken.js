import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 1. Middleware para verificar que existe un token válido (Autenticación)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Verificar que el header exista y tenga el formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. No se proporcionó un token válido"
    });
  }

  const token = authHeader?.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const message = err.name === "TokenExpiredError" ? "El token ha expirado" : "Token inválido";
      return res.status(403).json({ success: false, message }); // hacer una salida controlada porque el token no es válido
    }
    // continuar al flujo con normalidad
    req.user = decoded;
    next();
  });
};
import pool from "../database/connection.js";

export const findByUsername = async (username) => {
  try {
    const result = await pool.query(
      `SELECT id_usuario, usuario, correo, contraseña FROM usuarios WHERE usuario = $1`,
      [username],
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en findByUsername ->", error);
    throw error;
  }
};
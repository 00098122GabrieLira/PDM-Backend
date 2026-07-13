import pool from "../database/connection.js";

export const findByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT id_usuario, usuario, correo, contraseña FROM usuarios WHERE correo = $1`,
      [email],
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error en findByEmail ->", error);
    throw error;
  }
};
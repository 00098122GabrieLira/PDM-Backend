// backend/src/services/createProfile.js
import pool from "../database/connection.js";
import { generateHash } from "../utils/security/generateHash.js";

export const createProfile = async (userData) => {
  const client = await pool.connect();

  try {
    const hashedPassword = await generateHash(userData.password);

    const result = await client.query(
      `
      INSERT INTO Usuarios 
      (usuario, correo, contraseña)
      VALUES ($1, $2, $3)
      RETURNING id_usuario, usuario, correo
      `,
      [userData.username, userData.correo, hashedPassword],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

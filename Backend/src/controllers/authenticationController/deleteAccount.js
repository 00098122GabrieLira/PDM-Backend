import pool from "../../database/connection.js";

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Cuenta no encontrada",
      });
    }

    res.json({
      message: "Cuenta eliminada exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting account:", error);

    if (error.code === "23503") {
      return res.status(409).json({
        error: "No se puede eliminar la cuenta",
      });
    }

    res.status(500).json({
      error: "Error al eliminar la cuenta",
      details: error.message,
    });
  }
};

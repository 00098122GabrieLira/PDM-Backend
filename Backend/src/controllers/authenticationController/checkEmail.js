import { findByEmail } from "../../services/findByEmail.js";

export const checkEmail = async (req, res) => {
  try {
    const user = await findByEmail(req.params.email);
    res.json({ available: !user });
  } catch (error) {
    res.status(500).json({ error: "Error verificando correo" });
  }
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./database/connection.js";

dotenv.config();

// importación de rutas
import authenticationRoutes from "./routes/authenticationRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authenticationRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor backend corriendo en https://pdm-backend-1auj.onrender.com`,
  );
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Manejar cierre del listener y pool
const gracefulShutdown = async () => {
  console.log("Cerrando recursos...");
  await pool.end();
  process.exit(0);
};

// Configurar manejo de señales
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

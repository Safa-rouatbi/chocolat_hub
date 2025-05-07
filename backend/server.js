const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Pour autoriser les requêtes frontend

dotenv.config();
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Autoriser les requêtes cross-origin (frontend)
app.use(express.json()); // Permet de lire les données JSON (req.body)

// Routes
app.use("/api/chocolats", require("./routes/chocolatRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));

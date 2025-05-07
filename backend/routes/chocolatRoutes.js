const express = require("express");
const router = express.Router();
const {
  getAllChocolats,
  createChocolat,
  deleteChocolat,
  updateChocolat,
} = require("../controllers/chocolatController");

// ➡️ Routes CRUD
router.get("/", getAllChocolats); // GET /chocolats → Récupérer tous les chocolats
router.post("/", createChocolat); // POST /chocolats → Ajouter un chocolat
router.delete("/:id", deleteChocolat); // DELETE /chocolats/:id → Supprimer un chocolat
router.put("/:id", updateChocolat); // Ajoute cette ligne

module.exports = router;

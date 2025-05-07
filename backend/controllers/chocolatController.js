const Chocolat = require("../models/Chocolat");

// ➡️ Récupérer TOUS les chocolats
exports.getAllChocolats = async (req, res) => {
  try {
    const chocolats = await Chocolat.find();
    res.status(200).json(chocolats);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ➡️ Ajouter un nouveau chocolat
exports.createChocolat = async (req, res) => {
  try {
    const newChocolat = new Chocolat(req.body);
    await newChocolat.save();
    res.status(201).json(newChocolat);
  } catch (error) {
    res.status(400).json({ error: "Données invalides" });
  }
};

// ➡️ Supprimer un chocolat (par ID)
exports.deleteChocolat = async (req, res) => {
  try {
    await Chocolat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Chocolat supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.updateChocolat = async (req, res) => {
  try {
    const updatedChocolat = await Chocolat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retourne la version mise à jour
    );
    if (!updatedChocolat) {
      return res.status(404).json({ error: "Chocolat non trouvé" });
    }
    res.status(200).json(updatedChocolat);
  } catch (error) {
    res.status(500).json({ error: "Échec de la mise à jour" });
  }
};

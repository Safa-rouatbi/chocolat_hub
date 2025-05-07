const mongoose = require("mongoose");

const ChocolatSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true }, // ex: "Noir", "Lait", "Blanc"
  origine: { type: String, required: true }, // ex: "Belgique", "France"
  description: { type: String },
  prix: { type: Number, required: true },
});

module.exports = mongoose.model("Chocolat", ChocolatSchema);

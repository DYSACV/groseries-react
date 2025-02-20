const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  id_client: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  tel: { type: String, required: true },
  buy_day_date: { type: Date, required: true },
  total_articles: { type: Number, required: true },
  total_cost: { type: Number, required: true }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

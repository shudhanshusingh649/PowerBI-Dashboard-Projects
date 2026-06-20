const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  city: String,
  lat: Number,
  lng: Number,
  temperature: Number,
  risk: String,
});

module.exports =
  mongoose.model(
    "HeatZone",
    zoneSchema
  );
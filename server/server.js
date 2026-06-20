const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/stats", (req, res) => {
  res.json({
    avgTemp: 42,
    hotspots: 18,
    population: 125000,
    impact: "12%",
  });
});

app.get("/api/zones", (req, res) => {
  res.json([
    {
      lat: 25.5941,
      lng: 85.1376,
      risk: "High",
    },
    {
      lat: 25.61,
      lng: 85.15,
      risk: "Medium",
    },
  ]);
});

app.post("/api/predict", (req, res) => {
  res.json({
    temperature: 42.4,
    risk: "High",
    score: 91,
  });
});

app.listen(5000, () => {
  console.log("Server Running");
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/routesure")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

const vehicleSchema = new mongoose.Schema({
  vehicle_id: String,
  route: String,
  driver: String,
  speed: Number,
  status: String,
  lat: Number,
  lng: Number
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);


// ✅ GET all vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const data = await Vehicle.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});


// ✅ ADD vehicle
app.post("/vehicles", async (req, res) => {
  try {
    const v = new Vehicle(req.body);
    await v.save();
    res.json({ message: "Vehicle added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});


app.get("/", (req, res) => {
  res.send("RouteSure Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const { exec } = require("child_process");

app.get("/run-ml", (req, res) => {
  exec('python "C:/Users/shiks/OneDrive/Desktop/RouteSure/ML/model.py"', 
  (error, stdout, stderr) => {

    if (error) {
      console.log("❌ ERROR:", error);
      console.log("❌ STDERR:", stderr);
      return res.send(stderr); // 👈 SHOW REAL ERROR IN UI
    }

    console.log("✅ OUTPUT:", stdout);
    res.send(stdout);
  });
});
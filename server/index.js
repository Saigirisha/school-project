// server/index.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json());

// Create folder for images if it doesn't exist
const imageDir = path.join(__dirname, "schoolImages");
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);
app.use("/schoolImages", express.static(imageDir));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "schoolImages"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- Add school API ---
app.post("/api/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;
  const contactNumber = BigInt(contact);

  db.query("SELECT * FROM schools WHERE email_id = ?", [email_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) return res.status(400).send("Email already exists");

    const sql = "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, address, city, state, contactNumber, image, email_id], err => {
      if (err) return res.status(500).send(err);
      res.send("School added successfully");
    });
  });
});

// --- Get all schools API ---
app.get("/api/getSchools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Create folder for images if it doesn't exist
const imageDir = path.join(__dirname, "schoolImages");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}
app.use("/schoolImages", express.static(imageDir));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "Saigirisha@1234", // your MySQL password
  database: "schoolsdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "schoolImages"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add school API
app.post("/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql = "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("School added successfully");
  });
});

// Get all schools API
app.get("/getSchools", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));

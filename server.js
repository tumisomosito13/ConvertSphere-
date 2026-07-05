const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

// Create uploads folder automatically
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Upload folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Upload API
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded."
        });
    }

    res.json({
        success: true,
        message: "File uploaded successfully!",
        filename: req.file.filename
    });
});

// FFmpeg Test
app.get("/ffmpeg-test", (req, res) => {
    exec("ffmpeg -version", (error, stdout, stderr) => {
        if (error) {
            return res.json({
                installed: false,
                error: stderr || error.message
            });
        }

        res.json({
            installed: true,
            version: stdout
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`ConvertSphere running on port ${PORT}`);
});
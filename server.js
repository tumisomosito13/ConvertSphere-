const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Create folders if they don't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

if (!fs.existsSync("converted")) {
    fs.mkdirSync("converted");
}

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// MP4 → MP3 Conversion
app.post("/convert/mp4-to-mp3", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded."
        });
    }

    const input = req.file.path;
    const output = `converted/${Date.now()}.mp3`;

    ffmpeg(input)
        .toFormat("mp3")
        .on("end", () => {
            res.download(output);
        })
        .on("error", (err) => {
            res.status(500).json({
                success: false,
                error: err.message
            });
        })
        .save(output);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`ConvertSphere running on port ${PORT}`);
});
const HeroSliderModel = require("../models/HeroSliderModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const multer = require("multer");
const path = require("path");

const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
    },
});

// Create upload instance with limits and storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // Max file size of 1MB
});


module.exports = {
    upload,
};

const ProfileModel = require("../models/ProfileModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const multer = require("multer");
const path = require("path");

const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "uploads");
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

// ========================== Profile All Functionality ========================== //
// Profile CRUD Services
const ProfileAddService = async (req) => {
    try {
        const { cus_name, cus_address, cus_city, cus_state, cus_postcode, cus_country, userID } = req.body;

        const existingProfile = await ProfileModel.findOne({ userID });
        if (existingProfile) {
            return { status: "fail", message: "Profile already exists" };
        }

        // Include heroSliderImg in the model
        const newProfile = new ProfileModel({
            cus_name, cus_address, cus_city, cus_state, cus_postcode, cus_country, userID
        });
      await newProfile.save();

      return {
        status: "success",
        message: "Profile added successfully",
        data: newProfile,
      };
    } catch (error) {
        console.error("Error in ProfileAddService:", error.message);
        return {
            status: "fail",
            message: "Error adding profile. Please try again.",
        };
    }
};

module.exports = {
  ProfileAddService,
};

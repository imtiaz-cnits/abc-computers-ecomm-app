const ProfileModel = require("../models/ProfileModel");
const mongoose = require("mongoose");
const ObjectID = new mongoose.Types.ObjectId();

const multer = require("multer");
const path = require("path");

const fs = require("fs");
const UserModel = require("../models/UserModel");

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
const ProfileAddService = async (data) => {
  try {
    const { name: cus_name, _id: userID } = data;

    const existingProfile = await ProfileModel.findOne({ userID });
    if (existingProfile) {
      return { status: "fail", message: "Profile already exists" };
    }

    // Include heroSliderImg in the model
    const newProfile = new ProfileModel({ cus_name, userID });
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

const ProfileDetailsService = async (userID) => {
  const user = await UserModel.findOne({ _id: userID });
  const result = await ProfileModel.findOne({ userID });

  const email = user?.email;
  const mobile = user?.mobile;
  const img_url = user?.img_url;

  const profile = {
    ...result?._doc,
    cus_email: email,
    cus_phone: mobile,
    img_url,
  };

  return {
    status: "success",
    data: profile,
  };
};

const ProfileUpdateService = async (req) => {
  console.log(req.body);
};

module.exports = {
  ProfileAddService,
  ProfileDetailsService,
  ProfileUpdateService,
};

const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ReviewModel = require("../models/ReviewModel");
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


// Brand CRUD Services
const BrandAddService = async (req) => {
    try {
        console.log("Received brand data:", req.body);

        const { brandName, status } = req.body;
        const brandImg = req.file ? `/uploads/${req.file.filename}` : null;

        console.log("File uploaded:", req.file);
        console.log("Brand Name:", brandName);
        console.log("Status:", status);
        console.log("Brand Image Path:", brandImg);

        // Validate required fields
        if (!brandName) {
            return { status: "fail", message: "Brand name is required." };
        }

        // Check if the brand already exists
        const existingBrand = await BrandModel.findOne({ brandName });
        if (existingBrand) {
            console.log("Brand already exists");
            return { status: "fail", message: "Brand already exists" };
        }

        // Create and save new brand
        const newBrand = new BrandModel({ brandName, brandImg, status });
        await newBrand.save();

        console.log("New brand added:", newBrand);
        return { status: "success", message: "Brand added successfully", data: newBrand };
    } catch (error) {
        console.error("Error in BrandAddService:", error.message);
        return { status: "fail", message: "Error adding brand. Please try again." };
    }
};

const BrandListService = async () => {
    try {
        let data = await BrandModel.find();
        return { status: "success", data: data }; // Ensure JSON response
    } catch (e) {
        return { status: "Fail", data: e.toString() }; // Ensure JSON error response
    }
};

const BrandDeleteService = async (brandId) => {
    try {
        // Check if the brand exists
        const brand = await BrandModel.findById(brandId);
        if (!brand) {
            return { status: "fail", message: "Brand not found" };
        }

        // Delete the brand
        await BrandModel.findByIdAndDelete(brandId);
        return { status: "success", message: "Brand deleted successfully" };
    } catch (error) {
        console.error("Error in BrandDeleteService:", error.message);
        return { status: "fail", message: "Error deleting brand. Please try again." };
    }
};

const BrandUpdateService = async (req) => {
    try {
        const { brandName, status } = req.body;
        const brandImg = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if the brand exists
        const existingBrand = await BrandModel.findById(req.params.id);
        if (!existingBrand) {
            return { status: "fail", message: "Brand not found" };
        }

        // Update the brand fields
        existingBrand.brandName = brandName || existingBrand.brandName;
        existingBrand.status = status || existingBrand.status;
        if (brandImg) existingBrand.brandImg = brandImg;

        // Save updated brand
        await existingBrand.save();

        return { status: "success", message: "Brand updated successfully", data: existingBrand };
    } catch (error) {
        console.error("Error in BrandUpdateService:", error.message);
        return { status: "fail", message: "Error updating brand. Please try again." };
    }
};


// Sub Category CRUD Services
const SubCategoryAddService = async (req) => {
    try {
        console.log("Received brand data:", req.body);

        const { brandName, status } = req.body;
        const brandImg = req.file ? `/uploads/${req.file.filename}` : null;

        console.log("File uploaded:", req.file);
        console.log("Brand Name:", brandName);
        console.log("Status:", status);
        console.log("Brand Image Path:", brandImg);

        // Validate required fields
        if (!brandName) {
            return { status: "fail", message: "Brand name is required." };
        }

        // Check if the brand already exists
        const existingBrand = await BrandModel.findOne({ brandName });
        if (existingBrand) {
            console.log("Brand already exists");
            return { status: "fail", message: "Brand already exists" };
        }

        // Create and save new brand
        const newBrand = new BrandModel({ brandName, brandImg, status });
        await newBrand.save();

        console.log("New brand added:", newBrand);
        return { status: "success", message: "Brand added successfully", data: newBrand };
    } catch (error) {
        console.error("Error in BrandAddService:", error.message);
        return { status: "fail", message: "Error adding brand. Please try again." };
    }
};


module.exports = {
    upload,
    BrandAddService,
    BrandListService,
    BrandDeleteService,
    BrandUpdateService,
    SubCategoryAddService
};

const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SubCategoryModel = require("../models/SubCategoryModel");
const ProductModel = require("../models/ProductModel");
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

// ========================== Brand Page All Functionality ========================== //
// Brand CRUD Services
const BrandAddService = async (req) => {
  try {
    console.log("Received brand data:", req.body);

    const { brandName, brandStatus } = req.body;
    const brandImg = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("File uploaded:", req.file);
    console.log("Brand Name:", brandName);
    console.log("Status:", brandStatus);
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
    const newBrand = new BrandModel({ brandName, brandImg, brandStatus });
    await newBrand.save();

    console.log("New brand added:", newBrand);
    return {
      status: "success",
      message: "Brand added successfully",
      data: newBrand,
    };
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

    return {
      status: "success",
      message: "Brand updated successfully",
      data: existingBrand,
    };
  } catch (error) {
    console.error("Error in BrandUpdateService:", error.message);
    return {
      status: "fail",
      message: "Error updating brand. Please try again.",
    };
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
    return {
      status: "fail",
      message: "Error deleting brand. Please try again.",
    };
  }
};

// ========================== Category Page All Functionality ========================== //
// Category CRUD Services
const CategoryAddService = async (req) => {
  try {
    const { categoryName, status } = req.body;
    const categoryImg = req.file ? `/uploads/${req.file.filename}` : null;

    if (!categoryName || !status) {
      return {
        status: "fail",
        message: "Category name and status are required.",
      };
    }

    const existingCategory = await CategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return { status: "fail", message: "Category already exists" };
    }

    // Include categoryImg in the model
    const newCategory = new CategoryModel({
      categoryName,
      categoryImg,
      status,
    });
    await newCategory.save();

    return {
      status: "success",
      message: "Category added successfully",
      data: newCategory,
    };
  } catch (error) {
    console.error("Error in CategoryAddService:", error.message);
    return {
      status: "fail",
      message: "Error adding category. Please try again.",
    };
  }
};

const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find().populate("subCategories"); // Ensure subcategories are populated
    return { status: "success", data: data }; // Ensure JSON response
  } catch (e) {
    return { status: "Fail", data: e.toString() }; // Ensure JSON error response
  }
};

const CategoryUpdateService = async (req) => {
  try {
    const { categoryName, status } = req.body;
    const categoryImg = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the category exists
    const existingCategory = await CategoryModel.findById(req.params.id);
    if (!existingCategory) {
      return { status: "fail", message: "Category not found" };
    }

    // Update the category fields
    existingCategory.categoryName =
      categoryName || existingCategory.categoryName;
    existingCategory.status = status || existingCategory.status;
    if (categoryImg) existingCategory.categoryImg = categoryImg; // Update image if new one is uploaded

    // Save updated category
    await existingCategory.save();

    return {
      status: "success",
      message: "Category updated successfully",
      data: existingCategory,
    };
  } catch (error) {
    console.error("Error in CategoryUpdateService:", error.message);
    return {
      status: "fail",
      message: "Error updating category. Please try again.",
    };
  }
};

const CategoryDeleteService = async (categoryId) => {
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return { status: "fail", message: "Category not found" };
    }

    await CategoryModel.findByIdAndDelete(categoryId);
    return { status: "success", message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error in CategoryDeleteService:", error.message);
    return {
      status: "fail",
      message: "Error deleting Category. Please try again.",
    };
  }
};

// ========================== Sub Category Page All Functionality ========================== //
// Sub Category CRUD Services
const SubCategoryAddService = async (req) => {
  try {
    const { subCategoryName, subCategoryStatus, categoryId } = req.body;

    console.log(subCategoryName, subCategoryStatus, categoryId);

    if (!subCategoryName || !subCategoryStatus || !categoryId) {
      return {
        status: "fail",
        message: "Sub Category name, status, and category are required.",
      };
    }

    const categoryExists = await CategoryModel.findById(categoryId);
    if (!categoryExists) {
      return { status: "fail", message: "Category not found" };
    }

    const existingSubCategory = await SubCategoryModel.findOne({
      subCategoryName,
    });
    if (existingSubCategory) {
      return { status: "fail", message: "Sub Category already exists" };
    }

    const newSubCategory = new SubCategoryModel({
      subCategoryName,
      subCategoryStatus,
      categoryId,
    });
    await newSubCategory.save();

    return {
      status: "success",
      message: "Sub Category added successfully",
      data: newSubCategory,
    };
  } catch (error) {
    console.error("Error in SubCategoryAddService:", error.message);
    return {
      status: "fail",
      message: "Error adding sub-category. Please try again.",
    };
  }
};

const SubCategoryListService = async () => {
  try {
    let data = await SubCategoryModel.find().populate("categoryId"); // Ensure category is populated
    return { status: "success", data: data }; // Ensure JSON response
  } catch (e) {
    return { status: "Fail", data: e.toString() }; // Ensure JSON error response
  }
};

const SubCategoryUpdateService = async (req) => {
  try {
    const { subCategoryName, status, categoryId } = req.body;

    const existingSubCategory = await SubCategoryModel.findById(req.params.id);
    if (!existingSubCategory) {
      return { status: "fail", message: "Sub Category not found" };
    }

    // Ensure category exists
    if (categoryId) {
      const categoryExists = await CategoryModel.findById(categoryId);
      if (!categoryExists) {
        return { status: "fail", message: "Category not found" };
      }
    }

    existingSubCategory.subCategoryName =
      subCategoryName || existingSubCategory.subCategoryName;
    existingSubCategory.status = status || existingSubCategory.status;
    if (categoryId) existingSubCategory.categoryId = categoryId;

    await existingSubCategory.save();

    return {
      status: "success",
      message: "Sub Category updated successfully",
      data: existingSubCategory,
    };
  } catch (error) {
    console.error("Error in SubCategoryUpdateService:", error.message);
    return {
      status: "fail",
      message: "Error updating sub-category. Please try again.",
    };
  }
};

const SubCategoryDeleteService = async (subCategoryId) => {
  try {
    // Check if the sub category exists
    const subCategory = await SubCategoryModel.findById(subCategoryId);
    if (!subCategory) {
      return { status: "fail", message: "Sub Category not found" };
    }

    // Delete the sub category
    await SubCategoryModel.findByIdAndDelete(subCategoryId);
    return { status: "success", message: "Sub Category deleted successfully" };
  } catch (error) {
    console.error("Error in SubCategoryDeleteService:", error.message);
    return {
      status: "fail",
      message: "Error deleting Sub Category. Please try again.",
    };
  }
};

// ========================== Add Product Page All Functionality ========================== //
// Product CRUD Services
const ProductAddService = async (req) => {
  try {
    const {
      brandID,
      categoryID,
      subCategoryID,
      productCode,
      productName,
      productStatus,
      price,
      discountPrice,
      keyFeature,
      specification,
      description,
      stock,
      color,
    } = req.body;

    const productImg = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("Received product img:", req.file);

    // Validate required fields
    if (
      !productName ||
      !productStatus ||
      !brandID ||
      !categoryID ||
      !subCategoryID
    ) {
      return {
        status: "fail",
        message:
          "Product Name, Status, Brand ID, Category ID, and Sub Category ID are required!",
      };
    }

    // Check if brand, category, and subcategory exist
    const brandExists = await BrandModel.findById(brandID);
    if (!brandExists) {
      return { status: "fail", message: "Brand not found" };
    }

    const categoryExists = await CategoryModel.findById(categoryID);
    if (!categoryExists) {
      return { status: "fail", message: "Category not found" };
    }

    const subCategoryExists = await SubCategoryModel.findById(subCategoryID);
    if (!subCategoryExists) {
      return { status: "fail", message: "Sub Category not found" };
    }

    // Check if product already exists
    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return { status: "fail", message: "Product already exists" };
    }

    // Create new product
    const newProduct = new ProductModel({
      productCode,
      productName,
      productStatus,
      price,
      discountPrice,
      keyFeature,
      specification,
      description,
      stock,
      color,
      brandID,
      categoryID,
      subCategoryID,
      productImg,
    });

    await newProduct.save();

    return {
      status: "success",
      message: "Product added successfully",
      data: newProduct,
    };
  } catch (error) {
    console.error("Error in ProductAddService:", error);
    return {
      status: "fail",
      message: "Error adding product. Please try again.",
    };
  }
};

const ProductListService = async () => {
  try {
    let data = await ProductModel.find().populate(
      "brandID categoryID subCategoryID"
    );
    return { status: "success", data: data }; // Ensure JSON response
  } catch (e) {
    return { status: "Fail", data: e.toString() }; // Ensure JSON error response
  }
};

const ProductDetailsService = async (id) => {
  try {
    let data = await ProductModel.findById({ _id: id }).populate(
      "brandID categoryID subCategoryID"
    );
    return { status: "success", data: data }; // Ensure JSON response
  } catch (e) {
    return { status: "Fail", data: e.toString() }; // Ensure JSON error response
  }
};

const ProductUpdateService = async (req) => {
  try {
    // Destructure the necessary data from the request body
    const {
      productCode,
      productName,
      price,
      discountPrice,
      stock,
      keyFeature,
      specification,
      description,
      color,
      brandID,
      categoryID,
      subCategoryID,
    } = req.body;

    // Ensure all required fields are present
    if (!productCode || !productName || !price || !stock) {
      return {
        status: "fail",
        message:
          "Missing required fields (productCode, productName, price, stock).",
      };
    }

    // Handle image upload (if any)
    const productImg = req.file ? `/uploads/${req.file.filename}` : null;

    // Find the existing product by its ID (from req.params.id)
    const existingProduct = await ProductModel.findById(req.params.id);
    if (!existingProduct) {
      return { status: "fail", message: "Product not found" };
    }

    // Update the fields of the existing product with new data, falling back to existing values
    existingProduct.productCode = productCode || existingProduct.productCode;
    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.price = price || existingProduct.price;
    existingProduct.discountPrice =
      discountPrice || existingProduct.discountPrice;
    existingProduct.stock = stock || existingProduct.stock;
    existingProduct.keyFeature = keyFeature || existingProduct.keyFeature;
    existingProduct.specification =
      specification || existingProduct.specification;
    existingProduct.description = description || existingProduct.description;
    existingProduct.color = color;

    // Optional image update
    if (productImg) {
      existingProduct.productImg = productImg;
    }

    // Handle relationships (if any)
    existingProduct.brandID = brandID || existingProduct.brandID;
    existingProduct.categoryID = categoryID || existingProduct.categoryID;
    existingProduct.subCategoryID =
      subCategoryID || existingProduct.subCategoryID;

    // Save the updated product to the database
    await existingProduct.save();

    return {
      status: "success",
      message: "Product updated successfully",
      data: existingProduct,
    };
  } catch (error) {
    console.error("Error in ProductUpdateService:", error.message);
    return {
      status: "fail",
      message: "Error updating product. Please try again.",
    };
  }
};

const ProductDeleteService = async (id) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return { status: "fail", message: "Product not found" };
    }

    await ProductModel.findByIdAndDelete(id);
    return { status: "success", message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error in ProductDeleteService:", error.message);
    return {
      status: "fail",
      message: "Error deleting Product. Please try again.",
    };
  }
};

module.exports = {
  upload,
  BrandAddService,
  BrandListService,
  BrandDeleteService,
  BrandUpdateService,
  CategoryAddService,
  CategoryListService,
  CategoryUpdateService,
  CategoryDeleteService,
  SubCategoryAddService,
  SubCategoryListService,
  SubCategoryDeleteService,
  SubCategoryUpdateService,
  ProductAddService,
  ProductListService,
  ProductDetailsService,
  ProductUpdateService,
  ProductDeleteService,
};

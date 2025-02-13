const {
  BrandAddService,
  BrandListService,
  BrandDeleteService,
  BrandUpdateService,
  SubCategoryAddService,
} = require("../services/ProductServices");

// Brands Add Controller
exports.AddBrands = async (req, res) => {
  try {
    const result = await BrandAddService(req);  // Call the service to handle the logic
    return res.status(200).json(result);  // Send the response to the client
  } catch (error) {
    console.error("Error in AddBrands controller:", error);
    return res.status(500).json({ status: "fail", message: "Error adding brand." });
  }
};

exports.ProductBrandList = async (req, res) => {
  try {
    let result = await BrandListService();
    return res.status(200).json(result); // Ensure JSON response
  } catch (e) {
    return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
  }
};

exports.ProductBrandDelete = async (req, res) => {
  try {
    const brandId = req.params.id; // Get the brand ID from URL params
    const result = await BrandDeleteService(brandId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ status: "fail", message: e.toString() });
  }
};

exports.ProductBrandUpdate = async (req, res) => {
  try {
    const result = await BrandUpdateService(req);

    // Check if the update was successful and return the updated brand data
    if (result.status === "success") {
      return res.status(200).json(result.data); // Ensure updated brand data is sent back
    } else {
      return res.status(400).json({ status: "fail", message: result.message });
    }
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ status: "Fail", message: e.toString() });
  }
};


// Sub Category Add Controller
exports.AddSubCategory = async (req, res) => {
  try {
    const result = await SubCategoryAddService(req);  // Call the service to handle the logic
    return res.status(200).json(result);  // Send the response to the client
  } catch (error) {
    console.error("Error in AddBrands controller:", error);
    return res.status(500).json({ status: "fail", message: "Error adding brand." });
  }
};

exports.SubCategoryList = async (req, res) => {
  try {
    let result = await BrandListService();
    return res.status(200).json(result); // Ensure JSON response
  } catch (e) {
    return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
  }
};

exports.SubcategoryDelete = async (req, res) => {
  try {
    const brandId = req.params.id; // Get the brand ID from URL params
    const result = await BrandDeleteService(brandId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ status: "fail", message: e.toString() });
  }
};

exports.SubcategoryUpdate = async (req, res) => {
  try {
    const result = await BrandUpdateService(req);

    // Check if the update was successful and return the updated brand data
    if (result.status === "success") {
      return res.status(200).json(result.data); // Ensure updated brand data is sent back
    } else {
      return res.status(400).json({ status: "fail", message: result.message });
    }
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ status: "Fail", message: e.toString() });
  }
};
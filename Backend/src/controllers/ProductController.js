const {
  BrandAddService,
  BrandListService,
  BrandDeleteService,
  CategoryListService,
  SliderListService,
  ListByBrandService,
  ListByCategoryService,
  ListBySimilarService,
  ListByKeywordService,
  ListByRemarkService,
  DetailsService,
  ReviewListService,
  CreateReviewService,
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














exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryListService();
  return res.status(200).json(result);
};

exports.ProductSliderList = async (req, res) => {
  let result = await SliderListService();
  return res.status(200).json(result);
};

exports.ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService(req);
  return res.status(200).json(result);
};

exports.ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req);
  return res.status(200).json(result);
};

exports.ProductListBySimilar = async (req, res) => {
  let result = await ListBySimilarService(req);
  return res.status(200).json(result);
};

exports.ProductListByKeyword = async (req, res) => {
  let result = await ListByKeywordService(req);
  return res.status(200).json(result);
};

exports.ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkService(req);
  return res.status(200).json(result);
};

exports.ProductDetails = async (req, res) => {
  let result = await DetailsService(req);
  return res.status(200).json(result);
};

exports.ProductReviewList = async (req, res) => {
  let result = await ReviewListService(req);
  return res.status(200).json(result);
};

exports.CreateReview = async (req, res) => {
  let result = await CreateReviewService(req);
  return res.status(200).json(result);
};

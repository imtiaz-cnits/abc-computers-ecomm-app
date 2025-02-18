const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const SliderController = require("../controllers/SliderController");

const AuthVerification = require("../middlewares/AuthVerification");
const { FeaturesList } = require("../controllers/FeaturesController");
const { upload } = require("../services/ProductServices");
const path = require("path");

// Protected Routes
router.get("/dashboard", AuthVerification, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the dashboard",
  });
});

// User API
router.post("/SignUP", UserController.SignUP);
router.post("/Login", UserController.Login);
router.post("/Logout", UserController.UserLogout);

// Brand CRUD APIs
router.post("/brands", upload.single("brandImg"), ProductController.AddBrands);
router.get("/brands", ProductController.ProductBrandList);
router.put("/brands/:id", upload.single("brandImg"), ProductController.ProductBrandUpdate);
router.delete("/brands/:id", ProductController.ProductBrandDelete);

// Category CRUD APIs
router.post("/category", upload.single("categoryImg"), ProductController.AddCategory);
router.get("/category", ProductController.CategoryList);
router.put("/category/:id", upload.single("categoryImg"), ProductController.CategoryUpdate);
router.delete("/category/:id", ProductController.CategoryDelete);

// Sub Category CRUD APIs
router.post("/sub-category", ProductController.AddSubCategory);
router.get("/sub-category", ProductController.SubCategoryList);
router.put("/sub-category/:id", ProductController.SubCategoryUpdate);
router.delete("/sub-category/:id", ProductController.SubCategoryDelete);

// Product Add CRUD APIs
router.post("/add-product", ProductController.AddProduct);
router.get("/product-list", ProductController.ProductList);
router.put("/update-product/:id", ProductController.ProductUpdate);
router.delete("/remove-product/:id", ProductController.ProductDelete);

// Hero Slider CRUD APIs
router.post("/hero-slider", upload.single("slideImg"), SliderController.AddHeroSlider);
router.get("/hero-slider", SliderController.HeroSliderList);
router.put("/hero-slider/:id", upload.single("slideImg"), SliderController.HeroSliderUpdate);
router.delete("/hero-slider/:id", SliderController.HeroSliderDelete);

















// router.get("/UserOTP/:email", UserController.UserOTP);
// router.get("/VerifyOTP/:email/:otp", UserController.VerifyOTP);
// router.get("/UserLogout", AuthVerification, UserController.UserLogout);
//
// router.post("/CreateProfile", AuthVerification, UserController.CreateProfile);
// router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile);
// router.get("/ReadProfile", AuthVerification, UserController.ReadProfile);

// Products API
// router.get("/ProductBrandList", ProductController.ProductBrandList);
// router.get("/ProductCategoryList", ProductController.ProductCategoryList);
// router.get("/ProductSliderList", ProductController.ProductSliderList);
// router.get(
//   "/ProductListByBrand/:BrandID",
//   ProductController.ProductListByBrand
// );
// router.get(
//   "/ProductListByCategory/:CategoryID",
//   ProductController.ProductListByCategory
// );
// router.get(
//   "/ProductListBySimilar/:CategoryID",
//   ProductController.ProductListBySimilar
// );
// router.get(
//   "/ProductListByKeyword/:Keyword",
//   ProductController.ProductListByKeyword
// );
// router.get(
//   "/ProductListByRemark/:Remark",
//   ProductController.ProductListByRemark
// );
// router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
// router.get(
//   "/ProductReviewList/:ProductID",
//   ProductController.ProductReviewList
// );

// Wish List API
// router.get("/WishList", AuthVerification, WishListController.WishList);
// router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList);
// router.post(
//   "/RemoveWishList",
//   AuthVerification,
//   WishListController.RemoveWishList
// );

// Cart API
// router.get("/CartList", AuthVerification, CartListController.CartList);
// router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList);
// router.post(
//   "/UpdateCartList/:cartID",
//   AuthVerification,
//   CartListController.UpdateCartList
// );
// router.post(
//   "/RemoveCartList",
//   AuthVerification,
//   CartListController.RemoveCartList
// );

//Invoice APIs
// router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice);
//
// router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList);
// router.get(
//   "/InvoiceProductList/:invoice_id",
//   AuthVerification,
//   InvoiceController.InvoiceProductList
// );
//
// router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess);
// router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel);
// router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail);
// router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN);

//Features
// router.get("/FeaturesList", FeaturesController.FeaturesList);

//Create Review
// router.post("/CreateReview", AuthVerification, ProductController.CreateReview);

module.exports = router;

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddProduct.css";
import uploadImg from "@/assets/icons/upload-img.svg";
import ReactTags from "react-tag-autocomplete";
import Select from "react-select";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

import { Brands } from "@/Pages/DashboardPages/Brands/Brands";
import { FaXmark } from "react-icons/fa6";

import("froala-editor/js/plugins.pkgd.min.js");

const AddProduct = () => {
  const fileInputRef = useRef(null);

  // Set Brand Infos for Brand Selection
  const [brandName, setBrandName] = useState("");
  const [status, setStatus] = useState("");
  const [brandImg, setBrandImg] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Set Category Infos for Category Selection
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Set Sub Category Infos for Sub Category Selection
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    subCategoryName: "",
    status: "",
    subCategoryImg: null, // Handle file uploads separately
  });
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // Set Product Infos in Add Product Form
  const [product, setProduct] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");
  const [keyFeature, setKeyFeature] = useState("");
  const [specification, setSpecification] = useState("");
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [stock, setStock] = useState("");
  const [color, setColor] = useState([]);
  const reactColors = useRef();
  const onDeleteColors = useCallback((colorIndex) => {
      setColor(color.filter((_, i) => i !== colorIndex));}, [color]);
  const onAdditionColors = useCallback((newColor) => { setColor([...color, newColor]); }, [color]);


  // Fetch brands when the component mounts
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5070/api/v1/brands");
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands.");
      }
    };
    fetchBrands();
  }, []);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5070/api/v1/category");
        setCategories(response.data.data); // Assuming categories are returned in `data.data`
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch sub categories when the component mounts
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5070/api/v1/sub-category");
        setSubCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching sub categories:", error);
        toast.error("Failed to load sub categories.");
      }
    };
    fetchSubCategory();
  }, []);

  // Product Edit
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5070/api/v1/add-product");
  //       setProduct(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //       toast.error("Failed to load product.");
  //     }
  //   };
  //   fetchProduct();
  // }, []);



  // ======== Handle Submit for Brand, Category & Sub Category ======== //
  const handleSubmit = async (e, type) => {
    e.preventDefault();

    let formData = new FormData();
    let requestData = {}; // For JSON requests
    let url = "";
    let isFormData = true;
    let successMessage = "";
    let updateState = null; // Ensure it's initially null

    if (type === "brand") {
      if (!brandName || !status) {
        toast.error("Brand name and status are required!");
        return;
      }
      formData.append("brandName", brandName);
      formData.append("status", status);
      if (brandImg) formData.append("brandImg", brandImg);

      url = "http://localhost:5070/api/v1/brands";
      successMessage = "Brand added successfully!";
      updateState = setBrands;
    }

    else if (type === "category") {
      if (!categoryName || !status) {
        toast.error("Category name and status are required!");
        return;
      }
      formData.append("categoryName", categoryName);
      formData.append("status", status);
      if (categoryImg) formData.append("categoryImg", categoryImg);

      url = "http://localhost:5070/api/v1/category";
      successMessage = "Category added successfully!";
      updateState = setCategories;
    }

    else if (type === "subCategory") {
      const categoryId = selectedCategory?._id;
      if (!subCategoryName || !status || !categoryId) {
        toast.error("Sub Category name, status, and category are required!");
        return;
      }

      requestData = { subCategoryName, status, categoryId };
      isFormData = false; // Use JSON, not FormData

      url = "http://localhost:5070/api/v1/sub-category";
      successMessage = "Sub Category added successfully!";
      updateState = setSubCategories;
    }

    else if (type === "product") {
      const categoryID = selectedCategory?._id;
      const subCategoryID = selectedSubCategory?._id;
      const brandID = selectedBrand?._id;

      if (!productName || !status || !price || !categoryID || !subCategoryID || !brandID) {
        toast.error("Product name, status, price, brand, category, and subcategory are required!");
        return;
      }

      formData.append("productCode", productCode);
      formData.append("productName", productName);
      formData.append("status", status);
      formData.append("price", price);
      formData.append("discount", discount ? "true" : "false"); // Convert boolean to string
      formData.append("discountPrice", discountPrice);
      formData.append("keyFeature", keyFeature);
      formData.append("specification", specification);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("color", color);
      formData.append("badge", badge);
      formData.append("brandID", brandID);
      formData.append("categoryID", categoryID);
      formData.append("subCategoryID", subCategoryID);

      if (productImg) {
        formData.append("productImg", productImg);
      }

      url = "http://localhost:5070/api/v1/products";
      successMessage = "Product added successfully!";
      updateState = setProducts;
    }

    try {
      const response = isFormData
          ? await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
          : await axios.post(url, requestData);

      toast.success(successMessage);

      // ✅ Check if updateState exists before updating state
      if (updateState) {
        updateState((prevData) => [...prevData, response.data.data]);
      }

      // ✅ Reset Form Fields
      setProductCode("");
      setProductName("");
      setStatus("");
      setPrice("");
      setDiscount(false);
      setDiscountPrice("");
      setKeyFeature("");
      setSpecification("");
      setDescription("");
      setStock("");
      setColor("");
      setProductImg(null);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedBrand(null);

      // ✅ Close modal after successful submission
      document.querySelector(`#add${type.charAt(0).toUpperCase() + type.slice(1)} .close`)?.click();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || `Failed to add ${type}`);
    }
  };

  // ======== Handle Image Upload for Brand & Category ======== //
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (type === "brand") {
      setBrandImg(file);
    } else if (type === "category") {
      setCategoryImg(file);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption) {
      // Find the selected category
      const selectedCat = categories.find(cat => cat._id === selectedOption.value);

      console.log("Selected Category:", selectedCat); // Debugging

      // Filter subcategories that belong to the selected category
      const filteredSubCategories = subCategories.filter(sub =>
          sub.categoryId === selectedOption.value || sub.categoryId?._id === selectedOption.value
      );

      console.log("Filtered Subcategories:", filteredSubCategories); // Debugging

      // Update state
      setSelectedCategory(selectedCat);
      setFilteredSubCategories(filteredSubCategories); // Update dropdown options
      setSelectedSubCategory(null); // Reset subcategory selection
    } else {
      // Reset states if no category is selected
      setSelectedCategory(null);
      setFilteredSubCategories([]); // Ensure no subcategories are shown
      setSelectedSubCategory(null); // Reset subcategory selection
    }
  };


  // ======= Add Brand Handles ======= //
  const handleAddClick = () => {
    setSelectedBrand(null); // Clear selected brand

    // Reset form fields
    setBrandName("");
    setStatus("");
    setBrandImg(null);
  };
  const handleBrandNameChange = (e) => setBrandName(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  // ======= Add Brand Handles ======= //

  // ======= Add Category Handles ======= //
  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  // ======= Add Category Handles ======= //

  // ======= Add Sub Category Handles ======= //
  const handleSubCategoryNameChange = (e) => setSubCategoryName(e.target.value);
  // ======= Add Sub Category Handles ======= //


  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (!productCode || !productName || !status) {
      toast.error("Sub Category name, status, and category are required!");
      return;
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="col-10 m-auto">
            <div className="heading-wrap">
              <h2 className="heading">Add New Product</h2>
            </div>
            <form className="add-product-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-row select-input-box col-lg-6">
                  <label htmlFor="select-to">Brand *</label>
                  <div className="input-field">
                    <Select
                        className="select-search"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="brands"
                        options={brands?.map(brand => ({
                          label: brand.brandName,
                          value: brand._id,
                          ...brand
                        }))}
                        placeholder="Select Brands..."
                        // onChange={handleCategoryChange}
                        // value={selectedCategory ? {
                        //   label: selectedCategory.categoryName,
                        //   value: selectedCategory._id
                        // } : null} // Ensure this is correctly bound
                    />
                    <button
                      type="button"
                      className="add-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#addBrand"
                      onClick={handleAddClick}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 10.6667V21.3333M10.6667 16H21.3333M10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V10.4C28 8.15979 28 7.03969 27.564 6.18404C27.1805 5.43139 26.5686 4.81947 25.816 4.43597C24.9603 4 23.8402 4 21.6 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      ADD
                    </button>
                  </div>
                </div>
                <div className="form-row select-input-box col-lg-6">
                  <label htmlFor="select-to">Category *</label>
                  <div className="input-field">
                    <Select
                        className="select-search"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="categories"
                        options={categories?.map(category => ({
                          label: category.categoryName,
                          value: category._id,
                        }))}
                        placeholder="Select Category..."
                        onChange={handleCategoryChange}  // ✅ Ensure category selection updates state
                        value={selectedCategory ? {
                          label: selectedCategory.categoryName,
                          value: selectedCategory._id
                        } : null}  // ✅ Ensure selected category stays selected
                    />
                    <button
                      type="button"
                      className="add-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#addCategory"
                      onClick={handleAddClick}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 10.6667V21.3333M10.6667 16H21.3333M10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V10.4C28 8.15979 28 7.03969 27.564 6.18404C27.1805 5.43139 26.5686 4.81947 25.816 4.43597C24.9603 4 23.8402 4 21.6 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      ADD
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="form-row select-input-box col-lg-6">
                  <label htmlFor="select-to">Sub Category *</label>
                  <div className="input-field">
                    <Select
                        className="select-search"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="subCategories"
                        options={selectedCategory ? filteredSubCategories.map((subCat) => ({
                          label: subCat.subCategoryName,
                          value: subCat._id,
                        })) : []}  // Empty array when no category is selected
                        placeholder="Select Sub Category..."
                        value={selectedSubCategory ? {
                          label: selectedSubCategory.subCategoryName,
                          value: selectedSubCategory._id
                        } : null}  // `null` ensures the placeholder is displayed when no subcategory is selected
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            const subCat = filteredSubCategories.find(sub => sub._id === selectedOption.value);
                            setSelectedSubCategory(subCat);
                          } else {
                            setSelectedSubCategory(null); // Reset subcategory when nothing is selected
                          }
                        }}
                    />
                    <button
                      type="button"
                      className="add-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#addSubCategory"
                      onClick={handleAddClick}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 10.6667V21.3333M10.6667 16H21.3333M10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V10.4C28 8.15979 28 7.03969 27.564 6.18404C27.1805 5.43139 26.5686 4.81947 25.816 4.43597C24.9603 4 23.8402 4 21.6 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      ADD
                    </button>
                  </div>
                </div>

                <div className="form-row col-lg-6">
                  <label htmlFor="product-code">Product Code *</label>
                  <input type="text" placeholder="Product Code" required />
                </div>
              </div>

              <div className="row">
                <div className="form-row col-lg-6">
                  <label htmlFor="">Product Name *</label>
                  <input type="text" placeholder="Product Name" required />
                </div>
                <div className="form-row col-lg-6">
                  <label htmlFor="">Status</label>
                  <select>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="form-row col-lg-6">
                  <label htmlFor="">Product Price *</label>
                  <input
                    type="number"
                    placeholder="Product Price"
                    required
                    min={0}
                  />
                </div>
                <div className="form-row col-lg-6">
                  <label htmlFor="">Discount Price</label>
                  <input type="number" placeholder="Discount Price" min={0} />
                </div>
              </div>

              <div className="row">
                <div className="form-row">
                  <label htmlFor="">Key Features*</label>
                  <FroalaEditorComponent
                    tag="textarea"
                    onModelChange={(content) => setKeyFeatures(content)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-row">
                  <label htmlFor="">Specifications*</label>
                  <FroalaEditorComponent
                    tag="textarea"
                    onModelChange={(content) => setSpecifications(content)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-row">
                  <label htmlFor="">Description*</label>
                  <FroalaEditorComponent
                    tag="textarea"
                    onModelChange={(content) => setDescription(content)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-row col-lg-6">
                  <label htmlFor="photo">Product Photo</label>
                  <div className="upload-profile">
                    <div className="item">
                      <div className="img-box">
                        <img
                          src={uploadImg.src}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </div>

                      <div className="profile-wrapper">
                        <label className="custom-file-input-wrapper m-0">
                          <input
                            type="file"
                            className="custom-file-input"
                            aria-label="Upload Photo"
                          />
                        </label>
                        <p>PNG,JPEG or GIF (Upto 1 MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row col-lg-6">
                  <label htmlFor="">Stock*</label>
                  <input type="number" placeholder="Stock" min={0} />
                </div>
              </div>

              <div className="row">
                <div className="form-row col-lg-6">
                  <label htmlFor="">Colors*</label>
                  <ReactTags
                    ref={reactColors}
                    tags={color}
                    onDelete={onDeleteColors}
                    onAddition={onAdditionColors}
                    suggestions={[
                      { id: 3, name: "Bananas" },
                      { id: 4, name: "Mangos" },
                      { id: 5, name: "Lemons" },
                      { id: 6, name: "Apricots", disabled: true },
                    ]}
                    allowNew
                    removeButtonText="Click to remove color"
                    placeholderText="Add new color"
                  />
                </div>
              </div>

              <div className="row">
                <button type="submit" className="submit-btn">
                  ADD Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Brand Modal */}
      <section
        className="modal fade"
        id="addBrand"
        tabIndex="-1"
        aria-labelledby="addBrandLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="heading-wrap">
              <button
                type="button"
                className="close-btn close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <FaXmark />
              </button>
              <h2 className="heading">ADD NEW BRAND</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e, "brand")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">BRAND NAME</label>
                    <input
                        type="text"
                        placeholder="Type here.."
                        required
                        value={brandName}
                        onChange={handleBrandNameChange}
                    />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">BRAND STATUS</label>
                    <select
                      id="select-status"
                      className="select-status"
                      required
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor="photo">BRAND PHOTO</label>
                    <div className="upload-profile">
                      <div className="item">
                        <div className="img-box">
                          {selectedBrand?.brandImg && (
                              <img
                                  src={`http://localhost:5070/${selectedBrand.brandImg}`}
                                  alt="Brand"
                                  width="100"
                              />
                          )}
                        </div>

                        <div className="profile-wrapper">
                          <label className="custom-file-input-wrapper m-0">
                            <input
                              type="file"
                              className="custom-file-input"
                              aria-label="Upload Photo"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                          </label>
                          <p>PNG,JPEG or GIF (Upto 1 MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button type="submit" className="btn-save">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Modal */}
      <div
        className="modal fade"
        id="addCategory"
        tabIndex="-1"
        aria-labelledby="addCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="heading-wrap">
              <button
                type="button"
                className="close-btn close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <FaXmark />
              </button>
              <h2 className="heading">ADD NEW CATEGORY</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e, "category")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">CATEGORY NAME</label>
                    <input
                        type="text"
                        placeholder="Type here.."
                        required
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                    />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">STATUS</label>
                    <select
                      id="select-status"
                      className="select-status"
                      required
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor="photo">CATEGORY PHOTO</label>
                    <div className="upload-profile">
                      <div className="item">
                        <div className="img-box">
                          {selectedCategory?.categoryImg && (
                              <img
                                  src={`http://localhost:5070/${selectedCategory.categoryImg}`}
                                  alt="Category"
                                  width="100"
                              />
                          )}
                        </div>

                        <div className="profile-wrapper">
                          <label className="custom-file-input-wrapper m-0">
                            <input
                              type="file"
                              className="custom-file-input"
                              aria-label="Upload Photo"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                          </label>
                          <p>PNG,JPEG or GIF (Upto 1 MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button type="submit" className="btn-save">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sub  Category Modal */}

      <div
        className="modal fade"
        id="addSubCategory"
        tabIndex="-1"
        aria-labelledby="addSubCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="heading-wrap">
              <button
                type="button"
                className="close-btn close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <FaXmark />
              </button>
              <h2 className="heading">ADD SUB CATEGORY</h2>
            </div>

            <form onSubmit={(e) => handleSubmit(e, "subCategory")}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">SELECT CATEGORY</label>
                    <Select
                        className="select-search"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="categories"
                        options={categories?.map((category) => ({
                          label: category.categoryName,
                          value: category._id,
                          ...category,
                        }))}
                        placeholder="Select Categories"
                        onChange={handleCategoryChange}
                        value={
                          selectedCategory
                              ? {
                                label: selectedCategory.categoryName,
                                value: selectedCategory._id,
                              }
                              : null
                        } // Ensure this is correctly bound
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="">SUB CATEGORY NAME</label>
                    <input
                        type="text"
                        placeholder="Type here.."
                        required
                        value={subCategoryName}
                        onChange={handleSubCategoryNameChange}
                    />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">STATUS</label>
                    <select
                        id="select-status"
                        className="select-status"
                        required
                        value={status}
                        onChange={handleStatusChange}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <button type="submit" className="btn-save">
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
    </>
  );
};

export default AddProduct;

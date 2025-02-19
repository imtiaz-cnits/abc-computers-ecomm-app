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

import("froala-editor/js/plugins.pkgd.min.js");

const AddProduct = () => {
  const fileInputRef = useRef(null);

  // Set Brand Infos for Brand Selection
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Set Category Infos for Category Selection
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Set Sub Category Infos for Sub Category Selection
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    subCategoryName: "",
    status: "",
    subCategoryImg: null, // Handle file uploads separately
  });

  const [keyFeatures, setKeyFeatures] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([]);
  const reactColors = useRef();
  const onDeleteColors = useCallback((colorIndex) => {
      setColors(colors.filter((_, i) => i !== colorIndex));}, [colors]);
  const onAdditionColors = useCallback((newColor) => { setColors([...colors, newColor]); }, [colors]);


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


  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="col-10 m-auto">
            <div className="heading-wrap">
              <h2 className="heading">Add New Product</h2>
            </div>
            <form className="add-product-form" onSubmit={handleAddProduct}>
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
                          ...category
                        }))}
                        placeholder="Select Category..."
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
                      data-bs-target="#addCategory"
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
                        options={subCategories?.map(subCategory => ({
                          label: subCategory.subCategoryName,
                          value: subCategory._id,
                          ...subCategory
                        }))}
                        placeholder="Select Sub Category..."
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
                      data-bs-target="#addSubCategory"
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
                    tags={colors}
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
                <i className="fa-solid fa-xmark"></i>
              </button>
              <h2 className="heading">ADD NEW BRAND</h2>
            </div>
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">BRAND NAME</label>
                    <input type="text" placeholder="Type here.." required />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">BRAND STATUS</label>
                    <select
                      id="select-status"
                      className="select-status"
                      required
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
                <i className="fa-solid fa-xmark"></i>
              </button>
              <h2 className="heading">ADD NEW CATEGORY</h2>
            </div>

            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">CATEGORY NAME</label>
                    <input type="text" placeholder="Type here.." required />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">STATUS</label>
                    <select
                      id="select-status"
                      className="select-status"
                      required
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
                <i className="fa-solid fa-xmark"></i>
              </button>
              <h2 className="heading">ADD SUB CATEGORY</h2>
            </div>

            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-row">
                    <label htmlFor="">CATEGORY NAME</label>
                    <input type="text" placeholder="Type here.." required />
                  </div>

                  <div className="form-row select-input-box">
                    <label htmlFor="select-status">STATUS</label>
                    <select
                      id="select-status"
                      className="select-status"
                      required
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

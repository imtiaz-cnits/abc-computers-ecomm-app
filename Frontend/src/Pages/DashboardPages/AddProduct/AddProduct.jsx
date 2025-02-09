"use client";
import React, { useCallback, useRef, useState } from "react";
import "./AddProduct.css";
import uploadImg from "@/assets/icons/upload-img.svg";
import ReactTags from "react-tag-autocomplete";

const AddProduct = () => {
  const [colors, setColors] = useState([]);
  const reactColors = useRef();
  const onDeleteColors = useCallback(
    (colorIndex) => {
      setColors(colors.filter((_, i) => i !== colorIndex));
    },
    [colors]
  );

  const onAdditionColors = useCallback(
    (newColor) => {
      setColors([...colors, newColor]);
    },
    [colors]
  );

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="col-10 m-auto">
            <div className="heading-wrap">
              <h2 className="heading">Add New Product</h2>
            </div>
            <form className="add-product-form">
              <div className="row">
                <div className="form-row select-input-box col-lg-6">
                  <label htmlFor="select-to">Brand *</label>
                  <div className="input-field">
                    <div className="select-box-dropdown">
                      <div className="select-dropdown-selected">
                        <span>Select Brand</span>
                        <span className="icon">
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </div>
                      <div className="select-dropdown-items">
                        <input
                          type="text"
                          className="select-search-box"
                          placeholder="Search..."
                        />
                        <option className="option">Select-1</option>
                        <option className="option">Select-2</option>
                        <option className="option">Select-2</option>
                      </div>
                    </div>
                    <button type="button" className="add-btn">
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
                    <div className="select-box-dropdown">
                      <div className="select-dropdown-selected">
                        <span>Select Category</span>
                        <span className="icon">
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </div>
                      <div className="select-dropdown-items">
                        <input
                          type="text"
                          className="select-search-box"
                          placeholder="Search..."
                        />
                        <option className="option">Select-1</option>
                        <option className="option">Select-2</option>
                        <option className="option">Select-2</option>
                      </div>
                    </div>
                    <button type="button" className="add-btn">
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
                    <div className="select-box-dropdown">
                      <div className="select-dropdown-selected">
                        <span>Select Sub Category</span>
                        <span className="icon">
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </div>
                      <div className="select-dropdown-items">
                        <input
                          type="text"
                          className="select-search-box"
                          placeholder="Search..."
                        />
                        <option className="option">Select-1</option>
                        <option className="option">Select-2</option>
                        <option className="option">Select-2</option>
                      </div>
                    </div>
                    <button type="button" className="add-btn">
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
    </>
  );
};

export default AddProduct;

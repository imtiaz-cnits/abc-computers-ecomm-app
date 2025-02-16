"use client";

import React, { useEffect, useRef, useState } from "react";
import CategoryRow from "./CategoryRow/CategoryRow";
import DashboardPagination from "@/Components/Dashboard/DashboardPagination/DashboardPagination";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const Category = () => {
  const tableRef = useRef(null);

  const [brands, setBrands] = useState([]);
  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);
  const skip = limit * (page - 1);
  const [totalPages, setTotalPages] = useState(1);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const filteredBrands = brands.slice(skip, limit * page);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5070/api/v1/brands");

        // Log the response status code for debugging
        console.log("Response Status:", response.status);

        if (!response.ok) {
          // Log response details for further debugging
          const errorDetails = await response.text(); // Get the raw response text for further debugging
          throw new Error(
            `Failed to fetch brands. Status: ${response.status}, Error: ${errorDetails}`
          );
        }

        const result = await response.json();
        console.log("API Response:", result);

        setBrands(result.data || []);

      } catch (error) {
        // Log the full error message for better debugging
        console.error("Error fetching brands:", error.message);
      }
    };

    fetchBrands();
  }, [limit]);

  // useEffect(() => {
  //   setTotalPages(Math.ceil(subCategories.length / limit));
  // }, [subCategories, limit]);

  return (
    <div className="main-content">
      <div className="page-content">
        {/* <!-- Table --> */}
        <div className="data-table">
          <div className="invoice-btn">
            <h1>PRODUCT CATEGORY</h1>
            <div className="table-btn-item">
              <button
                type="submit"
                className="view-more-btn"
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
                  />
                </svg>
                ADD CATEGORY
              </button>
            </div>
          </div>

          {/* <!-- Action Buttons --> */}
          <div className="button-wrapper mb-3">
            {/* <!-- Search and Filter --> */}
            <div className="btn-group">
              <div className="input-group">
                <input
                  type="text"
                  id="searchInput"
                  className="form-control"
                  placeholder="Search Category..."
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              {/* <!-- Table --> */}
              <div className="table-wrapper">
                <table
                  id="printTable"
                  className="table table-hover"
                  ref={tableRef}
                >
                  <thead>
                    <tr>
                      <th>Serial No:</th>
                      <th>CATEGORY</th>
                      <th>SUB-CATEGORY</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands?.map((cate) => (
                      <CategoryRow key={cate._id} />
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <!-- Pagination and Display Info --> */}
              <DashboardPagination
                  limit={limit}
                  page={page}
                  setLimit={setLimit}
                  setPage={setPage}
                  pages={pages}
              />
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025. All Rights Reserved.</p>
        </div>
        {/* <!-- Table End --> */}

        {/* <!-- ADD Category Modal Start --> */}
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
                          <div className="img-box"></div>

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
        {/* <!-- UPDATE Category Modal Start --> */}
        <div
          className="modal fade"
          id="updateCategory"
          tabIndex="-1"
          aria-labelledby="updateCategoryLabel"
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
                <h2 className="heading">UPDATE CATEGORY</h2>
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
                          <div className="img-box"></div>

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
        {/* <!-- UPDATE Category Modal Start --> */}
      </div>
    </div>
  );
};

export default Category;
